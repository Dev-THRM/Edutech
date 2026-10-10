/**
 * THRM EduTech — Universal Dynamic Course Runner
 * Implements the standard format for all courses:
 * Curriculum Modules -> Final Assessment -> Certificate Unlocked (strictly 70%+ score)
 */

let courseData = null;
let currentSlug = 'social-media-marketing';
let courseModules = [];
let courseQuestions = [];

let userProgress = {
  completedModules: [],
  activeModuleId: 1,
  examStatus: 'not_started',
  examScore: null,
  examPassed: false,
  certId: null,
  certIssueDate: null
};

// Exam State
let examAnswers = {};
let examFlagged = {};
let currentExamIndex = 0;
let examSubmitted = false;

// Slide Viewer State
let activeModuleSlides = [];
let activeSlideIndex = 0;
let activeModuleId = null;

// ==========================================
// 1. INITIALIZATION & DATA FETCHING
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentSlug = urlParams.get('slug') || 'social-media-marketing';

  // Listen to Auth state changes to sync progress
  if (window.AuthManager) {
    AuthManager.onAuthStateChange(() => {
      loadUserProgress();
      renderAll();
    });
  }

  await loadCourseData(currentSlug);
  loadUserProgress();
  renderAll();

  // Keyboard navigation for slide modal
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('slideModalBackdrop');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'ArrowRight') nextModalSlide();
      if (e.key === 'ArrowLeft') prevModalSlide();
      if (e.key === 'Escape') closeSlideModal();
    }
  });
});

async function loadCourseData(slug) {
  try {
    const resp = await fetch(`/api/courses/${encodeURIComponent(slug)}`);
    if (resp.ok) {
      const data = await resp.json();
      courseData = data.course;
      courseModules = data.course?.modules || data.modules || [];
      courseQuestions = data.course?.questions || data.questions || [];
      return;
    }
  } catch (err) {
    console.warn("Backend not accessible, loading default fallback for:", slug);
  }

  // Fallback defaults if offline / static
  courseData = {
    slug: slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    subtitle: "Comprehensive Professional Certification Track",
    category: "Marketing & Tech",
    duration: "Self-Paced",
    level: "All Levels",
    description: "Industry-aligned hands-on curriculum with rigorous 70% passing assessment.",
    key_topics: "Strategy, Content Architecture, Funnels, Performance Analytics, Industry Best Practices",
    cert_title: `THRM CERTIFIED ${slug.toUpperCase().replace(/-/g, ' ')} SPECIALIST`,
    cert_code: `THRM-${slug.substring(0, 3).toUpperCase()}`
  };

  courseModules = [
    {
      id: 1,
      module_num: 1,
      title: "1. Core Foundations & Industry Overview",
      subtitle: "Fundamental principles, digital ecosystems & market architecture",
      duration: "45 mins",
      slides: [
        {
          kicker: "Module 01 — Fundamentals",
          title: "Foundations & Principles",
          lead: "Welcome to this certification track. Master core principles and modern distribution.",
          boxes: [
            {
              title: "Strategic Frameworks",
              text: "Building consistent, high-leverage workflows with verifiable output.",
              bullets: ["Clear objectives", "Target audience mapping", "Data-driven execution"]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      module_num: 2,
      title: "2. Strategic Execution & Workflows",
      subtitle: "Hands-on implementation and optimization tactics",
      duration: "50 mins",
      slides: [
        {
          kicker: "Module 02 — Implementation",
          title: "Execution & Optimization",
          lead: "Hands-on execution workflows that drive tangible business results.",
          boxes: [
            {
              title: "Performance Tactics",
              text: "Iterative testing and conversion improvement methods.",
              bullets: ["Rapid experimentation", "ROI measurement", "Scaling winners"]
            }
          ]
        }
      ]
    }
  ];

  courseQuestions = [
    {
      id: 1,
      question_num: 1,
      question: "What is the primary objective of data-driven digital optimization?",
      options: ["Maximizing vanity metrics", "Systematic improvement of business conversion & ROI", "Posting randomly", "Eliminating all marketing spend"],
      category: "Strategy"
    },
    {
      id: 2,
      question_num: 2,
      question: "Which benchmark is strictly required to earn a THRM EduTech Verified Certificate?",
      options: ["50% passing score", "60% passing score", "70% minimum score on the final assessment", "Only opening the slides"],
      category: "Certification Requirements"
    }
  ];
}

function loadUserProgress() {
  const currentUser = window.AuthManager ? AuthManager.getCurrentUser() : null;
  const storageKey = currentUser
    ? `thrm_course_progress_${currentUser.email}_${currentSlug}`
    : `thrm_course_progress_guest_${currentSlug}`;

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      userProgress = JSON.parse(raw);
    } else {
      userProgress = {
        completedModules: [],
        activeModuleId: 1,
        examStatus: 'not_started',
        examScore: null,
        examPassed: false,
        certId: generateCertId(),
        certIssueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };
    }
  } catch (e) {
    console.warn("Could not read user progress", e);
  }
}

function saveCourseProgress() {
  const currentUser = window.AuthManager ? AuthManager.getCurrentUser() : null;
  const storageKey = currentUser
    ? `thrm_course_progress_${currentUser.email}_${currentSlug}`
    : `thrm_course_progress_guest_${currentSlug}`;

  try {
    localStorage.setItem(storageKey, JSON.stringify(userProgress));
  } catch (e) {}

  if (window.AuthManager && currentUser) {
    AuthManager.saveUserProgress(currentSlug, userProgress);
  }
}

function generateCertId() {
  const prefix = (courseData && courseData.cert_code) ? courseData.cert_code : 'THRM-CERT';
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${rand}`;
}

// ==========================================
// 2. RENDERING UI
// ==========================================
function renderAll() {
  renderCourseHeader();
  renderModulesList();
  renderExamTab();
  renderCertificateTab();
}

function renderCourseHeader() {
  if (!courseData) return;

  document.getElementById('pageTitle').innerText = `${courseData.title} | THRM EduTech`;
  document.getElementById('courseHeaderTitle').innerText = courseData.title;
  document.getElementById('courseHeaderSubtitle').innerText = `${courseData.subtitle} • ${courseData.duration} • ${courseModules.length} Modules`;

  // Progress numbers
  const total = courseModules.length || 1;
  const completed = (userProgress.completedModules || []).length;
  const pct = Math.round((completed / total) * 100);

  document.getElementById('trackProgressCount').innerText = `${completed} / ${total} Modules Done`;
  document.getElementById('trackProgressPct').innerText = `${pct}% Complete`;
  document.getElementById('trackProgressFill').style.width = `${pct}%`;

  document.getElementById('tabModulesCountBadge').innerText = `${total} Modules`;

  // Exam Badge
  if (userProgress.examPassed) {
    document.getElementById('tabExamBadge').innerHTML = `<i class="fa-solid fa-check"></i> Passed (${userProgress.examScore?.percentage || 70}%)`;
    document.getElementById('tabExamBadge').className = 'badge-count badge-unlocked';
  } else {
    document.getElementById('tabExamBadge').innerText = '70% Pass Required';
    document.getElementById('tabExamBadge').className = 'badge-count';
  }

  // Cert Badge
  const certBadge = document.getElementById('certTabLockBadge');
  if (userProgress.examPassed) {
    certBadge.className = 'badge-count badge-unlocked';
    certBadge.innerHTML = '<i class="fa-solid fa-unlock"></i> Unlocked';
  } else {
    certBadge.className = 'badge-count badge-locked';
    certBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Locked';
  }
}

function renderModulesList() {
  const container = document.getElementById('modulesContainer');
  if (!container) return;

  if (!courseModules || courseModules.length === 0) {
    container.innerHTML = `
      <div class="loading-skeleton">
        <i class="fa-solid fa-book-open"></i> Curriculum modules are being finalized for this track.
      </div>
    `;
    return;
  }

  container.innerHTML = courseModules.map((m, idx) => {
    const isCompleted = (userProgress.completedModules || []).includes(m.id || m.module_num);
    const modNum = m.module_num || (idx + 1);

    return `
      <div class="module-card ${isCompleted ? 'completed' : ''}" id="modCard_${m.id || modNum}">
        <div class="module-card-header">
          <div class="module-status-indicator">
            <i class="fa-solid ${isCompleted ? 'fa-check' : 'fa-circle'}"></i>
          </div>
          <div class="module-info-wrap">
            <div class="module-meta-row">
              <span class="module-tag-badge">Module ${modNum < 10 ? '0' + modNum : modNum}</span>
              <span class="module-duration"><i class="fa-regular fa-clock"></i> ${m.duration || '45 mins'}</span>
              ${isCompleted ? '<span class="module-completed-tag"><i class="fa-solid fa-check-circle"></i> Completed</span>' : ''}
            </div>
            <h4 class="module-title">${m.title}</h4>
            <p class="module-subtitle">${m.subtitle || ''}</p>
          </div>
        </div>

        <div class="module-actions-row">
          <button class="btn-module-action btn-view-slides" onclick="openModuleSlideDeck(${idx})">
            <i class="fa-solid fa-layer-group"></i>
            <span>Study Slide Deck</span>
          </button>
          
          <button class="btn-module-action ${isCompleted ? 'btn-marked-done' : 'btn-mark-done'}" onclick="toggleModuleCompletion(${m.id || modNum})">
            <i class="fa-solid ${isCompleted ? 'fa-check-double' : 'fa-check'}"></i>
            <span>${isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleModuleCompletion(moduleId) {
  if (!userProgress.completedModules) userProgress.completedModules = [];
  const idx = userProgress.completedModules.indexOf(moduleId);
  if (idx > -1) {
    userProgress.completedModules.splice(idx, 1);
  } else {
    userProgress.completedModules.push(moduleId);
  }
  saveCourseProgress();
  renderAll();
}

// ==========================================
// 3. TAB NAVIGATION
// ==========================================
function switchCourseTab(tabName) {
  document.querySelectorAll('.track-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  const modulesSection = document.getElementById('modulesSectionTab');
  const examSection = document.getElementById('examSectionTab');
  const certSection = document.getElementById('certSectionTab');

  if (modulesSection) modulesSection.style.display = tabName === 'curriculum' ? 'block' : 'none';
  if (examSection) examSection.style.display = tabName === 'exam' ? 'block' : 'none';
  if (certSection) certSection.style.display = tabName === 'certificate' ? 'block' : 'none';

  // Smoothly position tab content in viewport below the sticky navbar
  const tabNav = document.querySelector('.track-tab-nav');
  if (tabNav) {
    const navRect = tabNav.getBoundingClientRect();
    if (navRect.top < 60 || navRect.top > window.innerHeight * 0.4) {
      const targetY = window.pageYOffset + navRect.top - 70;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  }
}

// ==========================================
// 4. FINAL ASSESSMENT (70% PASS REQUIREMENT)
// ==========================================
function renderExamTab() {
  const introCard = document.getElementById('examIntroCard');
  const workspace = document.getElementById('examWorkspace');
  const resultCard = document.getElementById('examResultCard');

  const qCount = courseQuestions.length;
  document.getElementById('examTotalQuestionsNumber').innerText = qCount;
  document.getElementById('examCardTitle').innerText = `${courseData?.title || 'Course'} Assessment`;

  if (userProgress.examStatus === 'completed' && userProgress.examScore) {
    introCard.style.display = 'none';
    workspace.style.display = 'none';
    resultCard.style.display = 'block';
    renderExamResults(userProgress.examScore, userProgress.examPassed);
  } else {
    introCard.style.display = 'block';
    workspace.style.display = 'none';
    resultCard.style.display = 'none';
  }
}

function startCourseExam() {
  if (!courseQuestions || courseQuestions.length === 0) {
    alert("Assessment questions for this course are being prepared. Please check back shortly.");
    return;
  }

  examAnswers = {};
  examFlagged = {};
  currentExamIndex = 0;
  examSubmitted = false;

  document.getElementById('examIntroCard').style.display = 'none';
  document.getElementById('examResultCard').style.display = 'none';
  document.getElementById('examWorkspace').style.display = 'grid';

  renderCurrentQuestion();
  renderPalette();
}

function renderCurrentQuestion() {
  const q = courseQuestions[currentExamIndex];
  if (!q) return;

  const total = courseQuestions.length;
  document.getElementById('examQCounter').innerText = `Question ${currentExamIndex + 1} of ${total}`;
  document.getElementById('examCategoryPill').innerText = q.category || 'Curriculum Competency';
  document.getElementById('examQuestionText').innerText = q.question;

  // Options
  let opts = q.options || [];
  if (typeof opts === 'string') {
    try { opts = JSON.parse(opts); } catch (e) { opts = []; }
  }

  const selectedOpt = examAnswers[q.id || (currentExamIndex + 1)];

  const optsHtml = opts.map((optText, oIdx) => {
    const isSelected = selectedOpt === oIdx;
    const letter = ['A', 'B', 'C', 'D'][oIdx] || (oIdx + 1);

    return `
      <div class="exam-option-item ${isSelected ? 'selected' : ''}" onclick="selectExamOption(${oIdx})">
        <span class="option-letter">${letter}</span>
        <span class="option-text">${optText}</span>
      </div>
    `;
  }).join('');

  document.getElementById('examOptionsList').innerHTML = optsHtml;

  // Prev / Next button states
  document.getElementById('examPrevBtn').disabled = currentExamIndex === 0;
  const nextBtn = document.getElementById('examNextBtn');
  if (currentExamIndex === total - 1) {
    nextBtn.innerHTML = '<span>Review &amp; Finish</span> <i class="fa-solid fa-flag-checkered"></i>';
  } else {
    nextBtn.innerHTML = '<span>Next Question</span> <i class="fa-solid fa-arrow-right"></i>';
  }

  // Flag button state
  const isFlagged = !!examFlagged[q.id || (currentExamIndex + 1)];
  const flagBtn = document.getElementById('examFlagBtn');
  flagBtn.className = `btn-sm ${isFlagged ? 'btn-flagged' : 'btn-secondary'}`;
  flagBtn.innerHTML = `<i class="fa-solid fa-flag"></i> ${isFlagged ? 'Flagged' : 'Flag for Review'}`;
}

function selectExamOption(optionIndex) {
  const q = courseQuestions[currentExamIndex];
  const qId = q.id || (currentExamIndex + 1);
  examAnswers[qId] = optionIndex;

  renderCurrentQuestion();
  renderPalette();
}

function nextExamQuestion() {
  if (currentExamIndex < courseQuestions.length - 1) {
    currentExamIndex++;
    renderCurrentQuestion();
  } else {
    confirmSubmitCourseExam();
  }
}

function prevExamQuestion() {
  if (currentExamIndex > 0) {
    currentExamIndex--;
    renderCurrentQuestion();
  }
}

function toggleFlagCurrentQuestion() {
  const q = courseQuestions[currentExamIndex];
  const qId = q.id || (currentExamIndex + 1);
  examFlagged[qId] = !examFlagged[qId];
  renderCurrentQuestion();
  renderPalette();
}

function jumpToQuestion(idx) {
  currentExamIndex = idx;
  renderCurrentQuestion();
}

function renderPalette() {
  const total = courseQuestions.length;
  let answeredCount = 0;

  const buttonsHtml = courseQuestions.map((q, idx) => {
    const qId = q.id || (idx + 1);
    const isAnswered = examAnswers[qId] !== undefined;
    const isFlagged = !!examFlagged[qId];
    const isCurrent = idx === currentExamIndex;

    if (isAnswered) answeredCount++;

    let cls = 'palette-btn';
    if (isAnswered) cls += ' answered';
    if (isFlagged) cls += ' flagged';
    if (isCurrent) cls += ' current';

    return `<button class="${cls}" onclick="jumpToQuestion(${idx})">${idx + 1}</button>`;
  }).join('');

  document.getElementById('examPaletteGrid').innerHTML = buttonsHtml;
  document.getElementById('paletteAnsweredCount').innerText = `${answeredCount} / ${total} Answered`;
}

async function confirmSubmitCourseExam() {
  const total = courseQuestions.length;
  const answered = Object.keys(examAnswers).length;
  const unanswered = total - answered;

  let msg = `You have answered ${answered} of ${total} questions.`;
  if (unanswered > 0) {
    msg += `\n\nWarning: ${unanswered} question(s) are unanswered. A score of 70% is required to pass.`;
  }
  msg += "\n\nAre you ready to submit your assessment?";

  if (!confirm(msg)) return;

  // Grade Assessment
  let gradeResult = null;

  try {
    const resp = await fetch(`/api/courses/${encodeURIComponent(currentSlug)}/submit-exam`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: examAnswers })
    });

    if (resp.ok) {
      gradeResult = await resp.json();
    }
  } catch (err) {
    console.warn("Server grading offline, falling back to local evaluator");
  }

  // Local fallback evaluator if offline
  if (!gradeResult) {
    let correct = 0;
    courseQuestions.forEach((q, idx) => {
      const qId = q.id || (idx + 1);
      const userAns = examAnswers[qId];
      if (userAns !== undefined && userAns === q.answer_index) {
        correct++;
      }
    });

    const pct = Math.round((correct / total) * 100);
    const passed = pct >= 70;

    gradeResult = {
      total,
      correct,
      percentage: pct,
      passed,
      passingScore: 70,
      certId: generateCertId(),
      certIssueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  }

  // Update User Progress
  userProgress.examStatus = 'completed';
  userProgress.examScore = gradeResult;
  userProgress.examPassed = gradeResult.passed;
  if (gradeResult.passed && !userProgress.certId) {
    userProgress.certId = gradeResult.certId || generateCertId();
    userProgress.certIssueDate = gradeResult.certIssueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  saveCourseProgress();

  document.getElementById('examWorkspace').style.display = 'none';
  document.getElementById('examResultCard').style.display = 'block';

  renderExamResults(gradeResult, gradeResult.passed);
  renderAll();
}

function renderExamResults(score, passed) {
  const badgeIcon = document.getElementById('resultBadgeIcon');
  const title = document.getElementById('resultTitle');
  const scoreNum = document.getElementById('resultScoreNumber');
  const scoreSub = document.getElementById('resultScoreSub');
  const actionBtn = document.getElementById('resultActionBtn');

  scoreNum.innerText = `${score.percentage}%`;

  if (passed) {
    badgeIcon.className = 'result-badge-icon pass';
    badgeIcon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
    title.innerHTML = 'Congratulations! You Passed! <i class="fa-solid fa-award text-gold"></i>';
    scoreSub.innerHTML = `You scored <strong>${score.percentage}%</strong> (Minimum required: 70%). Your verified certification is officially unlocked!`;
    actionBtn.style.display = 'inline-flex';
    actionBtn.onclick = () => switchCourseTab('certificate');
  } else {
    badgeIcon.className = 'result-badge-icon fail';
    badgeIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    title.innerText = 'Passing Score Not Met';
    scoreSub.innerHTML = `You scored <strong>${score.percentage}%</strong>. The minimum threshold is <strong>70%</strong>. Review the modules and retake the assessment to unlock your certificate.`;
    actionBtn.style.display = 'inline-flex';
    actionBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Retake Assessment';
    actionBtn.onclick = () => startCourseExam();
  }

  // Breakdown metrics
  const breakdownRow = document.getElementById('resultBreakdownRow');
  breakdownRow.innerHTML = `
    <div class="breakdown-box">
      <strong>Total Questions</strong>
      <span>${score.total}</span>
    </div>
    <div class="breakdown-box">
      <strong>Correct Answers</strong>
      <span>${score.correct}</span>
    </div>
    <div class="breakdown-box">
      <strong>Passing Threshold</strong>
      <span>70%</span>
    </div>
    <div class="breakdown-box">
      <strong>Status</strong>
      <span style="color: ${passed ? '#10B981' : '#EF4444'}; font-weight:800;">${passed ? 'PASSED' : 'NEEDS RETAKE'}</span>
    </div>
  `;
}

// ==========================================
// 5. OFFICIAL CERTIFICATE (70% STRICT CHECK)
// ==========================================
function renderCertificateTab() {
  const lockedNotice = document.getElementById('certLockedNotice');
  const unlockedArea = document.getElementById('certUnlockedArea');

  const isUnlocked = userProgress.examPassed === true;

  if (!isUnlocked) {
    lockedNotice.style.display = 'block';
    unlockedArea.style.display = 'none';
    return;
  }

  lockedNotice.style.display = 'none';
  unlockedArea.style.display = 'block';

  // Populate dynamic certificate fields
  const currentUser = window.AuthManager ? AuthManager.getCurrentUser() : null;
  const studentName = currentUser?.name || userProgress.studentName || 'Sahil Bijlani';

  const nameInput = document.getElementById('certStudentNameInput');
  if (nameInput) nameInput.value = studentName;

  document.getElementById('certRecipientNameDisplay').innerText = studentName;
  document.getElementById('certAwardTitleDisplay').innerText = courseData?.cert_title || 'THRM CERTIFIED PROFESSIONAL';

  const certId = userProgress.certId || generateCertId();
  const issueDate = userProgress.certIssueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  document.getElementById('certIdDisplay').innerText = certId;
  document.getElementById('certDateDisplay').innerText = issueDate;

  // Render Competencies from key topics
  const topicsContainer = document.getElementById('certSkillsListContainer');
  let topics = (courseData?.key_topics || "Core Strategy, Hands-on Execution, Analytics, Industry Frameworks")
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  topicsContainer.innerHTML = topics.map(t => `<div class="cert-skill-item">&ndash; ${t}</div>`).join('');
}

function onStudentNameChange(name) {
  const clean = name.trim() || 'Student Name';
  userProgress.studentName = clean;
  document.getElementById('certRecipientNameDisplay').innerText = clean;
  saveCourseProgress();
}

function printOnSiteCertificate() {
  if (!userProgress.examPassed) {
    alert("Certificate is locked. You must score 70%+ on the final assessment.");
    return;
  }
  window.print();
}

function addCourseToLinkedIn() {
  if (!userProgress.examPassed) {
    alert("Certificate is locked. Score 70%+ on the assessment first.");
    return;
  }

  const certName = encodeURIComponent(courseData?.cert_title || 'THRM Certified Professional');
  const orgName = encodeURIComponent('THRM EduTech');
  const certId = userProgress.certId || 'THRM-CERT-2026';
  const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=2026&issueMonth=10&certId=${certId}`;
  window.open(url, '_blank');
}

// ==========================================
// 6. SLIDE VIEWER MODAL
// ==========================================
function openModuleSlideDeck(modIndex) {
  const m = courseModules[modIndex];
  if (!m) return;

  activeModuleId = m.id || m.module_num;

  let slides = m.slides || [];
  if (typeof slides === 'string') {
    try { slides = JSON.parse(slides); } catch (e) { slides = []; }
  }

  if (slides.length === 0) {
    slides = [
      {
        kicker: `Module ${m.module_num || (modIndex + 1)} Overview`,
        title: m.title,
        lead: m.subtitle || 'Study the core concepts of this module.',
        boxes: [
          {
            title: "Core Learning Objectives",
            text: "This module covers theoretical foundations, execution workflows, and industry-standard practices.",
            bullets: ["Master fundamental concepts", "Analyze real-world scenarios", "Prepare for final assessment evaluation"]
          }
        ]
      }
    ];
  }

  activeModuleSlides = slides;
  activeSlideIndex = 0;

  document.getElementById('slideModalTitle').innerText = m.title;
  renderModalSlide();

  const modal = document.getElementById('slideModalBackdrop');
  modal.classList.add('active');
}

function closeSlideModal() {
  const modal = document.getElementById('slideModalBackdrop');
  if (modal) modal.classList.remove('active');
}

function markActiveModuleDoneAndClose() {
  if (activeModuleId) {
    if (!userProgress.completedModules) userProgress.completedModules = [];
    if (!userProgress.completedModules.includes(activeModuleId)) {
      userProgress.completedModules.push(activeModuleId);
      saveCourseProgress();
      renderAll();
    }
  }
  closeSlideModal();
}

function renderModalSlide() {
  const total = activeModuleSlides.length;
  const slide = activeModuleSlides[activeSlideIndex];
  if (!slide) return;

  document.getElementById('slideModalTag').innerText = `Slide ${activeSlideIndex + 1} of ${total}`;
  document.getElementById('slideCounterBadge').innerText = `${activeSlideIndex + 1} / ${total}`;

  document.getElementById('btnPrevSlide').disabled = activeSlideIndex === 0;
  document.getElementById('btnNextSlide').disabled = activeSlideIndex === total - 1;

  // Dots
  const dotsHtml = activeModuleSlides.map((_, i) => `
    <span class="slide-dot ${i === activeSlideIndex ? 'active' : ''}" onclick="jumpModalSlide(${i})"></span>
  `).join('');
  document.getElementById('slideProgressDots').innerHTML = dotsHtml;

  // Render Canvas
  const boxesHtml = (slide.boxes || []).map(b => `
    <div class="slide-concept-box">
      <h4>${b.title}</h4>
      <p>${b.text}</p>
      ${b.bullets ? `<ul>${b.bullets.map(item => `<li><i class="fa-solid fa-check text-green"></i> ${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  document.getElementById('slideCanvasPresentation').innerHTML = `
    <div class="slide-inner-viewport">
      <span class="slide-kicker">${slide.kicker || 'THRM Curriculum'}</span>
      <h3 class="slide-headline">${slide.title}</h3>
      <p class="slide-lead">${slide.lead || ''}</p>
      <div class="slide-boxes-grid">${boxesHtml}</div>
    </div>
  `;
}

function nextModalSlide() {
  if (activeSlideIndex < activeModuleSlides.length - 1) {
    activeSlideIndex++;
    renderModalSlide();
  }
}

function prevModalSlide() {
  if (activeSlideIndex > 0) {
    activeSlideIndex--;
    renderModalSlide();
  }
}

function jumpModalSlide(idx) {
  activeSlideIndex = idx;
  renderModalSlide();
}
