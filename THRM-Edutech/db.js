const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'thrm_edutech.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database at:', DB_PATH);
    db.run('PRAGMA foreign_keys = ON;');
    db.run('PRAGMA journal_mode = WAL;');
    db.run('PRAGMA busy_timeout = 5000;');
  }
});

// Helper wrappers for Promise-based queries
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Initialize tables and seed initial data
async function initDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      category TEXT DEFAULT 'Marketing',
      duration TEXT DEFAULT 'Self-Paced',
      level TEXT DEFAULT 'All Levels',
      description TEXT,
      key_topics TEXT,
      cert_title TEXT,
      cert_code TEXT,
      banner_color TEXT DEFAULT 'bg-gradient-blue',
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_slug TEXT NOT NULL,
      module_num INTEGER NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      duration TEXT DEFAULT '45 mins',
      pdf_filename TEXT,
      slides_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(course_slug) REFERENCES courses(slug) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS assessment_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_slug TEXT NOT NULL,
      question_num INTEGER NOT NULL,
      question TEXT NOT NULL,
      options_json TEXT NOT NULL,
      answer_index INTEGER NOT NULL,
      category TEXT DEFAULT 'Core',
      explanation TEXT,
      FOREIGN KEY(course_slug) REFERENCES courses(slug) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_email TEXT NOT NULL,
      course_slug TEXT NOT NULL,
      completed_modules_json TEXT DEFAULT '[]',
      active_module_id INTEGER DEFAULT 1,
      exam_status TEXT DEFAULT 'not_started',
      exam_score INTEGER DEFAULT NULL,
      exam_passed INTEGER DEFAULT 0,
      cert_id TEXT,
      cert_issue_date TEXT,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_email, course_slug)
    )
  `);

  // Initial setup: seed admin account ONLY if no admin user exists
  const existingAdmin = await get(`SELECT id, password FROM users WHERE email = ?`, ['admin@thrmedutech.com']);
  const defaultAdminPass = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@THRM2026#Secure';
  if (!existingAdmin) {
    const hashedAdminPass = await bcrypt.hash(defaultAdminPass, 10);
    await run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      ['THRM Administrator', 'admin@thrmedutech.com', hashedAdminPass, 'admin']
    );
    console.log('Seeded default Admin account with secure bcrypt hash: admin@thrmedutech.com');
  } else if (!existingAdmin.password.startsWith('$2a$') && !existingAdmin.password.startsWith('$2b$')) {
    const hashedAdminPass = await bcrypt.hash(defaultAdminPass, 10);
    await run(`UPDATE users SET password = ? WHERE id = ?`, [hashedAdminPass, existingAdmin.id]);
    console.log('Upgraded Admin password to bcrypt hash.');
  }

  // Seed or upgrade primary admin: Sahil Bijlani (bijlanisahil511@gmail.com)
  const existingSahil = await get(`SELECT id, password FROM users WHERE email = ?`, ['bijlanisahil511@gmail.com']);
  if (!existingSahil) {
    const hashedSahilPass = await bcrypt.hash(defaultAdminPass, 10);
    await run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      ['Sahil Bijlani', 'bijlanisahil511@gmail.com', hashedSahilPass, 'admin']
    );
    console.log('Seeded primary admin: Sahil Bijlani (bijlanisahil511@gmail.com)');
  } else {
    // Ensure role is admin without resetting the password
    await run(`UPDATE users SET role = 'admin' WHERE id = ?`, [existingSahil.id]);
  }

  // Seed candidate progress for Sahil Bijlani (CSMMP certified)
  const existingSahilProgress = await get(`SELECT id FROM user_progress WHERE user_email = ? AND course_slug = ?`, ['bijlanisahil511@gmail.com', 'social-media-marketing']);
  if (!existingSahilProgress) {
    await run(
      `INSERT INTO user_progress (user_email, course_slug, completed_modules_json, active_module_id, exam_status, exam_score, exam_passed, cert_id, cert_issue_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'bijlanisahil511@gmail.com',
        'social-media-marketing',
        JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
        12,
        'passed',
        88,
        1,
        'THRM-CSMMP-2026-8841',
        new Date().toISOString().split('T')[0]
      ]
    );
    console.log('Seeded verified candidate certificate for Sahil Bijlani.');
  }

  // Auto-upgrade any unhashed student passwords to bcrypt
  const unhashedUsers = await all(`SELECT id, password FROM users WHERE password NOT LIKE '$2a$%' AND password NOT LIKE '$2b$%'`);
  for (const u of unhashedUsers) {
    const hashed = await bcrypt.hash(u.password, 10);
    await run(`UPDATE users SET password = ? WHERE id = ?`, [hashed, u.id]);
  }

  // Seed default Course: Social Media Marketing Professional
  const existingSMM = await get(`SELECT * FROM courses WHERE slug = ?`, ['social-media-marketing']);
  if (!existingSMM) {
    await run(
      `INSERT INTO courses (slug, title, subtitle, category, duration, level, description, key_topics, cert_title, cert_code, banner_color)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'social-media-marketing',
        'Social Media Marketing Professional',
        'Master audience growth, viral content architecture, and performance-driven Meta advertising.',
        'Marketing',
        'Self-Paced (12 Modules)',
        'All Levels',
        'Comprehensive agency-grade curriculum spanning organic distribution, algorithms, paid campaigns, and performance tracking.',
        JSON.stringify([
          'Algorithmic Reach & Instagram SEO',
          'High-Converting Meta Ads & Funnels',
          'Performance Analytics & Client Reporting'
        ]),
        'THRM Certified Social Media Marketing Professional (CSMMP)',
        'THRM-CSMMP-2026',
        'bg-gradient-blue'
      ]
    );

    // Seed SMM 12 Modules
    const smmModules = [
      { num: 1, title: '1. Introduction to Social Media Marketing', sub: 'Core principles, digital brand ecosystems & consumer landscape', pdf: 'Module-1-Introduction-to-Social-Media-Marketing.pdf' },
      { num: 2, title: '2. Understanding Your Audience', sub: 'Demographics, intent signals & behavioral segmentation', pdf: 'Module-2-Understanding-Your-Audience.pdf' },
      { num: 3, title: '3. Social Media Platforms & Ecosystems', sub: 'Platform algorithms, format strengths & user demographics', pdf: 'Module-3-Social-Media-Platforms.pdf' },
      { num: 4, title: '4. Content Strategy & Architecture', sub: 'Pillars, calendars, creative resonance & storytelling engines', pdf: 'Module-4-Content-Strategy.pdf' },
      { num: 5, title: '5. Instagram Marketing Mastery', sub: 'Reels distribution, visual branding, stories & algorithm triggers', pdf: 'Instagram-Marketing-Module-5.pdf' },
      { num: 6, title: '6. Creating Engaging Content', sub: 'Hooks, copywriting, visual aesthetics & psychology of shares', pdf: 'Module-6-Creating-Engaging-Content.pdf' },
      { num: 7, title: '7. Social Media SEO & Hashtag Architecture', sub: 'Search discovery, indexing, semantic keywords & tag tiers', pdf: 'Module-7-Hashtags-and-Social-Media-SEO.pdf' },
      { num: 8, title: '8. Growing a Social Media Account', sub: 'Community building, collaborations, organic velocity & retention', pdf: 'Growing-a-Social-Media-Account-Module-8.pdf' },
      { num: 9, title: '9. Social Media Analytics & Reporting', sub: 'KPI tracking, CAC/ROAS benchmarks & executive client reporting', pdf: 'Module-9-Social-Media-Analytics.pdf' },
      { num: 10, title: '10. Introduction to Paid Social Media (Meta Ads)', sub: 'Pixel tracking, lookalikes, retargeting & budget allocation', pdf: 'Module-10-Introduction-to-Paid-Social-Media.pdf' },
      { num: 11, title: '11. Social Media Strategy for Businesses', sub: 'Full-funnel integration, crisis communications & omnichannel synergy', pdf: 'Module-11-Social-Media-Strategy-for-a-Business.pdf' },
      { num: 12, title: '12. Becoming a Professional Social Media Marketer', sub: 'Portfolio curation, freelance pitching, capstone & client management', pdf: 'Module-12-Becoming-a-Social-Media-Marketer.pdf' }
    ];

    for (const m of smmModules) {
      await run(
        `INSERT INTO modules (course_slug, module_num, title, subtitle, duration, pdf_filename, slides_json)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'social-media-marketing',
          m.num,
          m.title,
          m.sub,
          '45 mins',
          m.pdf,
          JSON.stringify([
            { kicker: `Module 0${m.num}`, title: m.title, lead: m.sub, boxes: [{ title: 'Overview', text: m.sub, bullets: ['Comprehensive Industry Theory', 'Practical Real-World Agency Examples', 'Final Assessment Exam Readiness'] }] }
          ])
        ]
      );
    }

    console.log('Seeded course: Social Media Marketing Professional with 12 modules.');
  }

  // Seed all 60 questions for Social Media Marketing from certifications.js
  let smmExamQuestions = [];
  try {
    const certJsPath = path.join(__dirname, 'js', 'certifications.js');
    if (fs.existsSync(certJsPath)) {
      const certCode = fs.readFileSync(certJsPath, 'utf8');
      const qMatch = certCode.match(/const EXAM_QUESTIONS = (\[[\s\S]*?\n\];)/);
      if (qMatch) {
        smmExamQuestions = eval(qMatch[1]);
      }
    }
  } catch (err) {
    console.warn('Could not extract EXAM_QUESTIONS from certifications.js:', err);
  }

  const existingQCount = await get(
    `SELECT COUNT(*) as count FROM assessment_questions WHERE course_slug = ?`,
    ['social-media-marketing']
  );

  if (!existingQCount || existingQCount.count < 60) {
    await run(`DELETE FROM assessment_questions WHERE course_slug = ?`, ['social-media-marketing']);
    if (smmExamQuestions.length > 0) {
      for (let i = 0; i < smmExamQuestions.length; i++) {
        const q = smmExamQuestions[i];
        await run(
          `INSERT INTO assessment_questions (course_slug, question_num, question, options_json, answer_index, category, explanation)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            'social-media-marketing',
            q.id || (i + 1),
            q.question,
            JSON.stringify(q.options),
            q.answer !== undefined ? q.answer : 0,
            q.category || 'Core Strategy',
            q.explanation || ''
          ]
        );
      }
      console.log(`Seeded all ${smmExamQuestions.length} exam questions for Social Media Marketing Professional.`);
    }
  }

  // Cleanup demo tracks so only Social Media Marketing Professional exists initially
  await run(`DELETE FROM courses WHERE slug IN ('seo-web-development', 'performance-marketing')`);
  await run(`DELETE FROM modules WHERE course_slug IN ('seo-web-development', 'performance-marketing')`);
  await run(`DELETE FROM assessment_questions WHERE course_slug IN ('seo-web-development', 'performance-marketing')`);
}

module.exports = {
  db,
  run,
  get,
  all,
  initDatabase
};
