require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { run, get, all, initDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'thrm-edutech-jwt-production-secret-2026';

// Configurable CORS protection
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : ['http://localhost:5000', 'http://127.0.0.1:5000'];

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') return true;
  try {
    const url = new URL(origin);
    const host = url.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') return true;
    if (/^192\.168\.\d+\.\d+$/.test(host)) return true;
    if (/^10\.\d+\.\d+\.\d+$/.test(host)) return true;
    if (/^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(host)) return true;
    if (host.endsWith('.local') || host.endsWith('.lan') || host.endsWith('.nip.io')) return true;
  } catch (e) {}
  return true; // Allow for seamless mobile & cross-device testing
}

app.use(cors({
  origin: function (origin, callback) {
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==========================================
// PRODUCTION SECURITY HEADERS
// ==========================================
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ==========================================
// SENSITIVE FILE PROTECTION (BLOCK .DB, .ENV, SOURCE LEAKS)
// ==========================================
const BLOCKED_EXTENSIONS = ['.db', '.db-wal', '.db-shm', '.env', '.sql', '.git'];
const BLOCKED_FILES = ['server.js', 'db.js', 'package.json', 'package-lock.json', 'ecosystem.config.js'];

app.use((req, res, next) => {
  const lowerPath = req.path.toLowerCase();
  const filename = path.basename(lowerPath);

  if (BLOCKED_FILES.includes(filename) || BLOCKED_EXTENSIONS.some(ext => lowerPath.endsWith(ext)) || lowerPath.includes('/.env')) {
    return res.status(403).json({ success: false, message: 'Access forbidden: Restricted file.' });
  }
  next();
});

// Production Rate Limiter for Authentication Routes
const authRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 requests per IP per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 1 minute.'
  }
});

// Healthcheck endpoint for cloud infrastructure & load balancers
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// ==========================================
// CLEAN URLS (REMOVING .HTML EVERYWHERE)
// ==========================================

// 301 Redirect any direct .html request to clean URL
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    const cleanPath = req.path.replace(/\.html$/, '');
    const query = req.url.slice(req.path.length);
    if (cleanPath === '/index') {
      return res.redirect(301, '/' + query);
    }
    return res.redirect(301, cleanPath + query);
  }
  next();
});

// Explicit Clean Page Routes
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/certifications', (req, res) => res.sendFile(path.join(__dirname, 'certifications.html')));
app.get('/certifications/social-media-marketing', (req, res) => {
  const p1 = path.join(__dirname, 'certifications', 'social-media-marketing.html');
  if (fs.existsSync(p1)) return res.sendFile(p1);
  return res.sendFile(path.join(__dirname, 'social-media-marketing.html'));
});
app.get('/course', (req, res) => res.sendFile(path.join(__dirname, 'course.html')));

// Serve frontend static files with html extension fallback
app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

// ==========================================
// 1. PUBLIC COURSES API
// ==========================================

// Get all active courses for certifications directory
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await all(`
      SELECT c.*,
        (SELECT COUNT(*) FROM modules m WHERE m.course_slug = c.slug) as module_count,
        (SELECT COUNT(*) FROM assessment_questions q WHERE q.course_slug = c.slug) as question_count
      FROM courses c
      WHERE c.is_active = 1
      ORDER BY c.id ASC
    `);

    const formatted = courses.map(c => ({
      ...c,
      key_topics: typeof c.key_topics === 'string' ? JSON.parse(c.key_topics || '[]') : (c.key_topics || [])
    }));

    res.json({ success: true, courses: formatted });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ success: false, message: 'Failed to load courses' });
  }
});

// Get a single course by slug with its modules and exam questions
app.get('/api/courses/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const course = await get(`SELECT * FROM courses WHERE slug = ? AND is_active = 1`, [slug]);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const modules = await all(
      `SELECT * FROM modules WHERE course_slug = ? ORDER BY module_num ASC`,
      [slug]
    );

    const questions = await all(
      `SELECT id, course_slug, question_num, question, options_json, category, explanation 
       FROM assessment_questions 
       WHERE course_slug = ? 
       ORDER BY question_num ASC`,
      [slug]
    );

    res.json({
      success: true,
      course: {
        ...course,
        key_topics: typeof course.key_topics === 'string' ? JSON.parse(course.key_topics || '[]') : (course.key_topics || []),
        modules: modules.map(m => ({
          ...m,
          slides: m.slides_json ? JSON.parse(m.slides_json) : []
        })),
        questions: questions.map(q => ({
          ...q,
          options: JSON.parse(q.options_json)
        }))
      }
    });
  } catch (err) {
    console.error('Error fetching course details:', err);
    res.status(500).json({ success: false, message: 'Failed to load course details' });
  }
});

// ==========================================
// 2. AUTHENTICATION API (BCRYPT + JWT)
// ==========================================

// Register a new user
app.post('/api/auth/register', authRateLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanName || !cleanPass) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    if (cleanPass.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const existing = await get(`SELECT id FROM users WHERE email = ?`, [cleanEmail]);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Secure bcrypt salt + hash
    const hashedPassword = await bcrypt.hash(cleanPass, 10);

    const result = await run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [cleanName, cleanEmail, hashedPassword, 'student']
    );

    const user = {
      id: result.lastID,
      name: cleanName,
      email: cleanEmail,
      role: 'student'
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ success: true, token, user, message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// Login
app.post('/api/auth/login', authRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const user = await get(`SELECT id, name, email, password, role FROM users WHERE email = ?`, [cleanEmail]);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Support bcrypt verification with graceful upgrade of any unhashed legacy password
    let isValid = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isValid = await bcrypt.compare(cleanPass, user.password);
    } else {
      isValid = (user.password === cleanPass);
      if (isValid) {
        // Auto-upgrade to bcrypt
        const upgraded = await bcrypt.hash(cleanPass, 10);
        await run(`UPDATE users SET password = ? WHERE id = ?`, [upgraded, user.id]);
      }
    }

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// Dedicated Admin Login Endpoint
app.post('/api/auth/admin-login', authRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const user = await get(`SELECT id, name, email, password, role FROM users WHERE email = ? AND role = 'admin'`, [cleanEmail]);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    let isValid = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isValid = await bcrypt.compare(cleanPass, user.password);
    } else {
      isValid = (user.password === cleanPass);
      if (isValid) {
        const upgraded = await bcrypt.hash(cleanPass, 10);
        await run(`UPDATE users SET password = ? WHERE id = ?`, [upgraded, user.id]);
      }
    }

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error during admin login.' });
  }
});

// ==========================================
// 3. USER PROGRESS & ASSESSMENT API
// ==========================================

// Get user progress for a course
app.get('/api/progress/:courseSlug', async (req, res) => {
  try {
    const userEmail = (req.query.email || '').trim().toLowerCase();
    const courseSlug = req.params.courseSlug;

    if (!userEmail) {
      return res.json({ success: true, progress: null });
    }

    const row = await get(
      `SELECT * FROM user_progress WHERE user_email = ? AND course_slug = ?`,
      [userEmail, courseSlug]
    );

    if (!row) {
      return res.json({ success: true, progress: null });
    }

    res.json({
      success: true,
      progress: {
        ...row,
        completedModules: JSON.parse(row.completed_modules_json || '[]'),
        examPassed: Boolean(row.exam_passed)
      }
    });
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch progress' });
  }
});

// Save user progress for a course
app.post('/api/progress/:courseSlug', async (req, res) => {
  try {
    const courseSlug = req.params.courseSlug;
    const { email, completedModules, activeModuleId, examStatus, examScore, examPassed, certId, certIssueDate } = req.body;
    const userEmail = (email || '').trim().toLowerCase();

    if (!userEmail) {
      return res.status(400).json({ success: false, message: 'User email is required' });
    }

    const modulesJson = JSON.stringify(completedModules || []);
    const passedVal = examPassed ? 1 : 0;
    const scoreVal = (typeof examScore === 'object' && examScore !== null) ? examScore.percentage : (examScore || null);

    await run(
      `INSERT INTO user_progress (
        user_email, course_slug, completed_modules_json, active_module_id, exam_status, exam_score, exam_passed, cert_id, cert_issue_date, last_updated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_email, course_slug) DO UPDATE SET
        completed_modules_json = excluded.completed_modules_json,
        active_module_id = excluded.active_module_id,
        exam_status = excluded.exam_status,
        exam_score = excluded.exam_score,
        exam_passed = excluded.exam_passed,
        cert_id = excluded.cert_id,
        cert_issue_date = excluded.cert_issue_date,
        last_updated = CURRENT_TIMESTAMP`,
      [userEmail, courseSlug, modulesJson, activeModuleId || 1, examStatus || 'not_started', scoreVal, passedVal, certId || null, certIssueDate || null]
    );

    res.json({ success: true, message: 'Progress saved successfully' });
  } catch (err) {
    console.error('Error saving progress:', err);
    res.status(500).json({ success: false, message: 'Failed to save progress' });
  }
});

// Submit and grade final assessment on the backend (70% threshold required to pass)
app.post('/api/courses/:slug/submit-exam', async (req, res) => {
  try {
    const courseSlug = req.params.slug;
    const { email, answers } = req.body; // answers: { [questionId or questionNum]: selectedOptionIndex }
    const userEmail = (email || '').trim().toLowerCase();

    const questions = await all(
      `SELECT id, question_num, answer_index FROM assessment_questions WHERE course_slug = ? ORDER BY question_num ASC`,
      [courseSlug]
    );

    if (questions.length === 0) {
      return res.status(400).json({ success: false, message: 'No questions configured for this course.' });
    }

    let correctCount = 0;
    questions.forEach((q, idx) => {
      const userSelected = answers[q.id] !== undefined ? answers[q.id] : answers[idx];
      if (userSelected === q.answer_index) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 70; // Strict 70% threshold required for certificate

    const certId = passed ? `THRM-${courseSlug.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5)}-2026-${Math.floor(1000 + Math.random() * 9000)}` : null;
    const certDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (userEmail) {
      await run(
        `INSERT INTO user_progress (
          user_email, course_slug, exam_status, exam_score, exam_passed, cert_id, cert_issue_date, last_updated
        ) VALUES (?, ?, 'completed', ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_email, course_slug) DO UPDATE SET
          exam_status = 'completed',
          exam_score = excluded.exam_score,
          exam_passed = excluded.exam_passed,
          cert_id = CASE WHEN excluded.exam_passed = 1 THEN excluded.cert_id ELSE user_progress.cert_id END,
          cert_issue_date = CASE WHEN excluded.exam_passed = 1 THEN excluded.cert_issue_date ELSE user_progress.cert_issue_date END,
          last_updated = CURRENT_TIMESTAMP`,
        [userEmail, courseSlug, percentage, passed ? 1 : 0, certId, certDate]
      );
    }

    res.json({
      success: true,
      score: {
        correct: correctCount,
        total: questions.length,
        percentage: percentage
      },
      passed: passed,
      certId: certId,
      certDate: certDate,
      message: passed ? 'Congratulations! You passed the assessment (70%+). Certificate unlocked.' : 'Assessment score below 70%. Please review course modules and retake.'
    });
  } catch (err) {
    console.error('Error submitting exam:', err);
    res.status(500).json({ success: false, message: 'Failed to grade assessment.' });
  }
});

// ==========================================
// 4. ADMIN PORTAL API
// ==========================================

// Secure Middleware helper to check admin role (Strict JWT verification)
async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers['authorization'] || '';
    let token = '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    } else if (req.headers['x-admin-token']) {
      token = req.headers['x-admin-token'];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Admin authentication token required.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtErr) {
      return res.status(401).json({ success: false, message: 'Invalid or expired admin session token.' });
    }

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin privileges required.' });
    }

    const user = await get(`SELECT id, name, email, role FROM users WHERE id = ? AND role = 'admin'`, [decoded.id]);
    if (!user) {
      return res.status(403).json({ success: false, message: 'Forbidden: Active admin account not found.' });
    }

    req.admin = user;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Admin authentication verification failed.' });
  }
}

// Admin stats
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    const studentCount = await get(`SELECT COUNT(*) as count FROM users WHERE role = 'student'`);
    const courseCount = await get(`SELECT COUNT(*) as count FROM courses WHERE is_active = 1`);
    const passedCount = await get(`SELECT COUNT(*) as count FROM user_progress WHERE exam_passed = 1`);
    const totalModules = await get(`SELECT COUNT(*) as count FROM modules`);

    res.json({
      success: true,
      stats: {
        totalStudents: studentCount.count || 0,
        totalCourses: courseCount.count || 0,
        certificatesIssued: passedCount.count || 0,
        totalModules: totalModules.count || 0
      }
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats' });
  }
});

// Admin list all courses
app.get('/api/admin/courses', requireAdmin, async (req, res) => {
  try {
    const courses = await all(`
      SELECT c.*,
        (SELECT COUNT(*) FROM modules m WHERE m.course_slug = c.slug) as module_count,
        (SELECT COUNT(*) FROM assessment_questions q WHERE q.course_slug = c.slug) as question_count,
        (SELECT COUNT(*) FROM user_progress p WHERE p.course_slug = c.slug AND p.exam_passed = 1) as certified_students
      FROM courses c
      ORDER BY c.id DESC
    `);
    res.json({ success: true, courses });
  } catch (err) {
    console.error('Admin courses error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
});

// Admin CREATE NEW COURSE with modules and assessment questions
app.post('/api/admin/courses', requireAdmin, async (req, res) => {
  try {
    const {
      title,
      slug,
      subtitle,
      category,
      duration,
      level,
      description,
      keyTopics,
      certTitle,
      certCode,
      bannerColor,
      modules,
      questions
    } = req.body;

    const cleanSlug = (slug || title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!title || !cleanSlug) {
      return res.status(400).json({ success: false, message: 'Course title and slug are required.' });
    }

    const existing = await get(`SELECT id FROM courses WHERE slug = ?`, [cleanSlug]);
    if (existing) {
      return res.status(400).json({ success: false, message: `A course with slug '${cleanSlug}' already exists.` });
    }

    // Insert Course
    const courseResult = await run(
      `INSERT INTO courses (
        slug, title, subtitle, category, duration, level, description, key_topics, cert_title, cert_code, banner_color, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        cleanSlug,
        title.trim(),
        (subtitle || '').trim(),
        category || 'Digital Skills',
        duration || 'Self-Paced',
        level || 'All Levels',
        description || '',
        JSON.stringify(keyTopics || ['Practical Modules', 'Comprehensive Assessment', 'Verified Certification']),
        certTitle || `THRM Certified ${title} Professional`,
        certCode || `THRM-${cleanSlug.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5)}-2026`,
        bannerColor || 'bg-gradient-blue'
      ]
    );

    // Insert Modules
    if (Array.isArray(modules) && modules.length > 0) {
      for (let i = 0; i < modules.length; i++) {
        const m = modules[i];
        await run(
          `INSERT INTO modules (course_slug, module_num, title, subtitle, duration, pdf_filename, slides_json)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            cleanSlug,
            i + 1,
            m.title || `Module ${i + 1}`,
            m.subtitle || 'Foundational Principles & Practical Application',
            m.duration || '45 mins',
            m.pdfFilename || null,
            JSON.stringify(m.slides || [
              {
                kicker: `Module 0${i + 1}`,
                title: m.title || `Module ${i + 1}`,
                lead: m.subtitle || 'Learn practical skills and frameworks.',
                boxes: [{ title: 'Overview', text: m.subtitle || '', bullets: ['Industry Standard Theory', 'Practical Case Studies', 'Final Exam Readiness'] }]
              }
            ])
          ]
        );
      }
    }

    // Insert Assessment Questions (Enforcing 70% threshold architecture)
    if (Array.isArray(questions) && questions.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        await run(
          `INSERT INTO assessment_questions (course_slug, question_num, question, options_json, answer_index, category, explanation)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            cleanSlug,
            i + 1,
            q.question || `Question ${i + 1}`,
            JSON.stringify(q.options || ['Option A', 'Option B', 'Option C', 'Option D']),
            q.answerIndex !== undefined ? q.answerIndex : 0,
            q.category || 'General',
            q.explanation || 'Refer to course curriculum slides.'
          ]
        );
      }
    }

    res.json({
      success: true,
      message: `Course '${title}' created successfully with ${modules ? modules.length : 0} modules and ${questions ? questions.length : 0} questions!`,
      courseId: courseResult.lastID,
      slug: cleanSlug
    });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ success: false, message: 'Failed to create course in database.' });
  }
});

// Admin UPDATE / EDIT Course
app.put('/api/admin/courses/:slug', requireAdmin, async (req, res) => {
  try {
    const origSlug = req.params.slug;
    const {
      title,
      subtitle,
      category,
      duration,
      level,
      description,
      certTitle,
      modules,
      questions
    } = req.body;

    const existing = await get(`SELECT id FROM courses WHERE slug = ?`, [origSlug]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Course not found in database.' });
    }

    // Update main course record
    await run(
      `UPDATE courses SET
         title = COALESCE(?, title),
         subtitle = COALESCE(?, subtitle),
         category = COALESCE(?, category),
         duration = COALESCE(?, duration),
         level = COALESCE(?, level),
         description = COALESCE(?, description),
         cert_title = COALESCE(?, cert_title)
       WHERE slug = ?`,
      [
        title || null,
        subtitle || null,
        category || null,
        duration || null,
        level || 'All Levels',
        description || null,
        certTitle || null,
        origSlug
      ]
    );

    // If modules were supplied in update
    if (Array.isArray(modules) && modules.length > 0) {
      await run(`DELETE FROM modules WHERE course_slug = ?`, [origSlug]);
      for (let i = 0; i < modules.length; i++) {
        const m = modules[i];
        await run(
          `INSERT INTO modules (course_slug, module_num, title, subtitle, duration, slides_json)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            origSlug,
            i + 1,
            m.title,
            m.subtitle || '',
            m.duration || '45 mins',
            JSON.stringify(m.slides || [
              {
                kicker: `Module ${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
                title: m.title,
                lead: m.subtitle || '',
                boxes: [
                  {
                    title: 'Core Curriculum Concept',
                    text: m.subtitle || m.title,
                    bullets: ['Theoretical Principles', 'Agency-Grade Execution', '70% Passing Exam Readiness']
                  }
                ]
              }
            ])
          ]
        );
      }
    }

    // If assessment questions were supplied in update
    if (Array.isArray(questions) && questions.length > 0) {
      await run(`DELETE FROM assessment_questions WHERE course_slug = ?`, [origSlug]);
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        await run(
          `INSERT INTO assessment_questions (course_slug, question_num, question, options_json, answer_index, category, explanation)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            origSlug,
            i + 1,
            q.question,
            JSON.stringify(q.options || ['Option A', 'Option B', 'Option C', 'Option D']),
            q.answerIndex !== undefined ? q.answerIndex : 0,
            q.category || 'General',
            q.explanation || 'Refer to curriculum modules.'
          ]
        );
      }
    }

    res.json({
      success: true,
      message: `Course '${title || origSlug}' successfully updated! Changes are live on the website.`
    });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ success: false, message: 'Failed to update course in database.' });
  }
});

// Admin DELETE Course
app.delete('/api/admin/courses/:slug', requireAdmin, async (req, res) => {
  try {
    const slug = req.params.slug;
    await run(`DELETE FROM courses WHERE slug = ?`, [slug]);
    await run(`DELETE FROM modules WHERE course_slug = ?`, [slug]);
    await run(`DELETE FROM assessment_questions WHERE course_slug = ?`, [slug]);
    await run(`DELETE FROM user_progress WHERE course_slug = ?`, [slug]);

    res.json({ success: true, message: `Course '${slug}' and all associated data deleted.` });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ success: false, message: 'Failed to delete course' });
  }
});

// Admin SYNC LOCAL USERS from browser localStorage
app.post('/api/admin/sync-local-users', requireAdmin, async (req, res) => {
  try {
    const { users } = req.body;
    if (Array.isArray(users)) {
      for (const u of users) {
        if (!u.email || u.role === 'admin') continue;
        const cleanEmail = u.email.trim().toLowerCase();
        const existing = await get(`SELECT id FROM users WHERE email = ?`, [cleanEmail]);
        if (!existing) {
          await run(
            `INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, 'student', ?)`,
            [u.name || 'Student', cleanEmail, u.password || 'Student@2026', u.createdAt || new Date().toISOString()]
          );
        }
        if (u.courseProgress) {
          for (const slug in u.courseProgress) {
            const prog = u.courseProgress[slug];
            const modJson = JSON.stringify(prog.completedModules || []);
            const passed = prog.examPassed ? 1 : 0;
            const scoreVal = prog.examScore?.percentage !== undefined
              ? prog.examScore.percentage
              : (typeof prog.examScore === 'number' ? prog.examScore : null);

            await run(
              `INSERT INTO user_progress (user_email, course_slug, completed_modules_json, active_module_id, exam_status, exam_score, exam_passed, cert_id, cert_issue_date, last_updated)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
               ON CONFLICT(user_email, course_slug) DO UPDATE SET
                 completed_modules_json = excluded.completed_modules_json,
                 active_module_id = excluded.active_module_id,
                 exam_status = excluded.exam_status,
                 exam_score = excluded.exam_score,
                 exam_passed = excluded.exam_passed,
                 cert_id = excluded.cert_id,
                 cert_issue_date = excluded.cert_issue_date`,
              [
                cleanEmail,
                slug,
                modJson,
                prog.activeModuleId || 1,
                prog.examStatus || 'not_started',
                scoreVal,
                passed,
                prog.certId || null,
                prog.certIssueDate || null
              ]
            );
          }
        }
      }
    }
    res.json({ success: true, message: 'Local users synced to database.' });
  } catch (err) {
    console.error('Error syncing local users:', err);
    res.status(500).json({ success: false, message: 'Failed to sync local users.' });
  }
});

// Admin list registered students and their certification status
app.get('/api/admin/students', requireAdmin, async (req, res) => {
  try {
    const students = await all(`
      SELECT u.id, u.name, u.email, u.created_at,
        COUNT(p.id) as enrolled_count,
        SUM(CASE WHEN p.exam_passed = 1 THEN 1 ELSE 0 END) as passed_count
      FROM users u
      LEFT JOIN user_progress p ON u.email = p.user_email
      WHERE u.email != 'admin@thrmedutech.com'
      GROUP BY u.id
      ORDER BY u.id DESC
    `);
    res.json({ success: true, students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
});

// ==========================================
// PRODUCTION ERROR HANDLING
// ==========================================
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'An internal server error occurred' : (err.message || 'Server error')
  });
});

// Initialize database and start server
let server;
initDatabase().then(() => {
  server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`THRM EduTech Server running on http://localhost:${PORT}`);
    console.log(`Database connected: SQLite (thrm_edutech.db) with WAL enabled`);
    console.log(`Admin Portal: http://localhost:${PORT}/admin`);
    console.log(`Certifications: http://localhost:${PORT}/certifications`);
    console.log(`Healthcheck: http://localhost:${PORT}/api/health`);
    console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`===============================================`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Graceful process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully...');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  }
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received. Closing HTTP server gracefully...');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
});
