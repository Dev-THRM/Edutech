/**
 * THRM EduTech — Authentication & Course Progress Sync Manager
 * Supports: User Registration, Login, Logout, Multi-user Local Persistence
 * and course progress syncing across sessions.
 */

// Auto-bridge API calls to backend port 5000 if frontend is launched on an alternate port (e.g. Live Server :5500)
if (typeof window !== 'undefined' && window.fetch && !window.__thrmFetchBridged) {
  window.__thrmFetchBridged = true;
  const _origFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.startsWith('/api/')) {
      if (window.location.protocol.startsWith('http') && window.location.port && window.location.port !== '5000' && window.location.port !== '80' && window.location.port !== '443') {
        url = `${window.location.protocol}//${window.location.hostname}:5000${url}`;
      }
    }
    return _origFetch.apply(this, [url, options]);
  };
}

const AuthManager = (() => {
  const USERS_KEY = 'thrm_edutech_users_v2';
  const CURRENT_USER_KEY = 'thrm_edutech_current_user_v2';
  const listeners = [];

  // Automatically purge legacy v1 dummy/mock users from browser storage
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('thrm_edutech_users_v1');
      localStorage.removeItem('thrm_edutech_current_user_v1');
    }
  } catch (e) {}

  // Helpers
  function _getUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("Could not read users database", e);
      return {};
    }
  }

  function _saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn("Could not save users database", e);
    }
  }

  function getCurrentUser() {
    try {
      const email = localStorage.getItem(CURRENT_USER_KEY);
      if (!email) return null;
      const users = _getUsers();
      return users[email.toLowerCase()] || null;
    } catch (e) {
      return null;
    }
  }

  function isLoggedIn() {
    return !!getCurrentUser();
  }

  async function register(name, email, password) {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanName) return { success: false, message: 'Please enter your full name.' };
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    // Attempt registration against backend API
    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, password: cleanPass })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          const u = data.user;
          if (data.token) {
            localStorage.setItem('thrm_user_token', data.token);
          }
          const users = _getUsers();
          users[cleanEmail] = u;
          _saveUsers(users);
          localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
          _notifyAuthState(u);
          return { success: true, user: u };
        } else {
          return { success: false, message: data.message || 'Registration failed.' };
        }
      }
    } catch (apiErr) {
      // Backend not running on static host (e.g. Hostinger public_html); proceed to local storage
    }

    // RESILIENT CLIENT-SIDE FALLBACK
    if (cleanEmail === 'dev@thrmdigitalmarketing.in') {
      return { success: false, message: 'This email is reserved for administration. Please log into the Admin Console.' };
    }

    const users = _getUsers();
    const existing = users[cleanEmail];
    const newUser = {
      id: existing ? existing.id : ('usr_' + Date.now().toString(36)),
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      role: 'student',
      registeredAt: existing ? existing.registeredAt : new Date().toISOString(),
      courseProgress: existing ? (existing.courseProgress || {}) : {}
    };
    users[cleanEmail] = newUser;
    _saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
    _notifyAuthState(newUser);
    return { success: true, user: newUser };
  }

  async function login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail) return { success: false, message: 'Please enter your email address.' };
    if (!cleanPass) return { success: false, message: 'Please enter your password.' };

    // Attempt login against backend API
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          const u = data.user;
          if (data.token) {
            localStorage.setItem('thrm_user_token', data.token);
          }
          const users = _getUsers();
          users[cleanEmail] = u;
          _saveUsers(users);
          localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
          _notifyAuthState(u);
          return { success: true, user: u };
        } else {
          return { success: false, message: data.message || 'Invalid email or password. Please try again.' };
        }
      }
    } catch (apiErr) {
      // Backend not running on static host; proceed to local storage
    }

    // RESILIENT CLIENT-SIDE FALLBACK
    const users = _getUsers();
    const existing = users[cleanEmail];
    if (existing) {
      if (existing.password && existing.password !== cleanPass) {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }
      localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
      _notifyAuthState(existing);
      return { success: true, user: existing };
    }

    // Super admin check
    if (cleanEmail === 'dev@thrmdigitalmarketing.in' && cleanPass === 'Thrm@0205') {
      const adminUser = {
        id: 'admin_master',
        name: 'THRM Super Administrator',
        email: cleanEmail,
        role: 'admin'
      };
      localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
      _notifyAuthState(adminUser);
      return { success: true, user: adminUser };
    }

    return { success: false, message: 'No account found with this email. Please register first.' };
  }

  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem('thrm_user_token');
    _notifyAuthState(null);
  }

  function getUserProgress(courseSlug = 'social-media-marketing') {
    const user = getCurrentUser();
    if (!user || !user.courseProgress) return null;
    return user.courseProgress[courseSlug] || null;
  }

  async function saveUserProgress(courseSlug = 'social-media-marketing', progressData) {
    const user = getCurrentUser();
    if (!user) return false;

    const users = _getUsers();
    if (!users[user.email]) {
      users[user.email] = user;
    }

    if (!users[user.email].courseProgress) {
      users[user.email].courseProgress = {};
    }

    users[user.email].courseProgress[courseSlug] = {
      ...(users[user.email].courseProgress[courseSlug] || {}),
      ...progressData,
      lastUpdated: new Date().toISOString()
    };

    _saveUsers(users);

    // Sync to backend DB if online
    try {
      const token = localStorage.getItem('thrm_user_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch(`/api/progress/${encodeURIComponent(courseSlug)}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: user.email,
          ...progressData
        })
      });
    } catch (e) {
      // offline mode
    }

    return true;
  }

  function onAuthStateChange(callback) {
    if (typeof callback === 'function') {
      listeners.push(callback);
    }
  }

  function _notifyAuthState(user) {
    renderNavbarAuth();
    listeners.forEach(fn => {
      try { fn(user); } catch (e) { console.error("Auth listener error", e); }
    });
  }

  // ==========================================
  // AUTH MODAL & NAVBAR UI
  // ==========================================
  function injectAuthModal() {
    if (document.getElementById('thrmAuthModalBackdrop')) return;

    // Ensure standalone auth stylesheet is attached to head
    if (!document.getElementById('thrmAuthCssLink')) {
      const link = document.createElement('link');
      link.id = 'thrmAuthCssLink';
      link.rel = 'stylesheet';
      link.href = _resolveAssetPath('css/auth.css?v=800');
      document.head.appendChild(link);
    }

    const modal = document.createElement('div');
    modal.id = 'thrmAuthModalBackdrop';
    modal.className = 'auth-modal-backdrop';
    modal.style.display = 'none'; // CRITICAL: Hidden until openModal is explicitly called
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
      <div class="auth-modal-card" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
        <!-- Accent Top Bar -->
        <div class="auth-card-top-accent"></div>

        <!-- Ambient Glow Mesh -->
        <div class="auth-card-glow-mesh"></div>

        <!-- Close Button -->
        <button class="auth-modal-close" onclick="AuthManager.closeModal()" aria-label="Close modal">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <!-- Header -->
        <div class="auth-modal-header">
          <div class="auth-header-top">
            <div class="auth-brand-badge">
              <img src="${_resolveAssetPath('assets/images/logo.png')}" alt="THRM EduTech" class="auth-brand-logo" />
              <span class="auth-brand-text">THRM<span class="brand-gradient-txt">EduTech</span></span>
            </div>
            <div class="auth-security-tag">
              <i class="fa-solid fa-shield-halved"></i>
              <span>Verified Portal</span>
            </div>
          </div>
          <h3 id="authModalTitle" class="auth-title">Welcome Back!</h3>
          <p id="authModalDesc" class="auth-desc">Sign in to save your course progress, resume modules seamlessly, and access your verified credentials.</p>
        </div>

        <!-- Segmented Tab Switcher -->
        <div class="auth-tab-pills" role="tablist">
          <button class="auth-tab-btn active" id="tabBtnLogin" onclick="AuthManager.switchTab('login')" role="tab" type="button">
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            <span>Sign In</span>
          </button>
          <button class="auth-tab-btn" id="tabBtnRegister" onclick="AuthManager.switchTab('register')" role="tab" type="button">
            <i class="fa-solid fa-user-plus"></i>
            <span>Create Account</span>
          </button>
        </div>

        <!-- Feedback Alert -->
        <div class="auth-alert" id="authAlert" style="display:none;" role="alert"></div>

        <!-- LOGIN FORM -->
        <form class="auth-form" id="authLoginForm" onsubmit="AuthManager.handleLoginSubmit(event)">
          <div class="auth-input-group">
            <label for="loginEmail">
              <i class="fa-solid fa-envelope"></i>
              <span>Email Address</span>
            </label>
            <div class="auth-input-wrapper">
              <i class="fa-solid fa-at input-prefix-icon"></i>
              <input type="email" id="loginEmail" placeholder="you@example.com" required autocomplete="email" />
            </div>
          </div>

          <div class="auth-input-group">
            <div class="auth-label-row">
              <label for="loginPassword">
                <i class="fa-solid fa-lock"></i>
                <span>Password</span>
              </label>
            </div>
            <div class="auth-input-wrapper">
              <i class="fa-solid fa-key input-prefix-icon"></i>
              <input type="password" id="loginPassword" placeholder="••••••••" required autocomplete="current-password" />
              <button type="button" class="btn-toggle-pwd" onclick="AuthManager.togglePasswordVisibility('loginPassword', this)" aria-label="Toggle password visibility">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-auth-submit" id="btnLoginSubmit">
            <span>Sign In &amp; Continue Learning</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </form>

        <!-- REGISTER FORM -->
        <form class="auth-form" id="authRegisterForm" style="display:none;" onsubmit="AuthManager.handleRegisterSubmit(event)">
          <div class="auth-input-group">
            <div class="auth-label-row">
              <label for="regName">
                <i class="fa-solid fa-user"></i>
                <span>Full Legal Name</span>
              </label>
              <span class="auth-label-badge"><i class="fa-solid fa-award"></i> Certificate Name</span>
            </div>
            <div class="auth-input-wrapper">
              <i class="fa-solid fa-id-card input-prefix-icon"></i>
              <input type="text" id="regName" placeholder="e.g. Sahil Bijlani" required autocomplete="name" />
            </div>
            <small class="auth-input-hint">Printed exactly as entered on your official completion certificate.</small>
          </div>

          <div class="auth-input-group">
            <label for="regEmail">
              <i class="fa-solid fa-envelope"></i>
              <span>Email Address</span>
            </label>
            <div class="auth-input-wrapper">
              <i class="fa-solid fa-at input-prefix-icon"></i>
              <input type="email" id="regEmail" placeholder="you@example.com" required autocomplete="email" />
            </div>
          </div>

          <div class="auth-input-group">
            <label for="regPassword">
              <i class="fa-solid fa-lock"></i>
              <span>Create Password</span>
            </label>
            <div class="auth-input-wrapper">
              <i class="fa-solid fa-key input-prefix-icon"></i>
              <input type="password" id="regPassword" placeholder="Minimum 4 characters" minlength="4" required autocomplete="new-password" />
              <button type="button" class="btn-toggle-pwd" onclick="AuthManager.togglePasswordVisibility('regPassword', this)" aria-label="Toggle password visibility">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-auth-submit" id="btnRegSubmit">
            <span>Create Account &amp; Save Progress</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </form>

        <!-- Feature Assurance Strip -->
        <div class="auth-features-strip">
          <div class="auth-feature-pill">
            <i class="fa-solid fa-bolt-lightning text-accent-blue"></i>
            <span>Auto-Saves Progress</span>
          </div>
          <div class="auth-feature-pill">
            <i class="fa-solid fa-graduation-cap text-accent-purple"></i>
            <span>Verified Credentials</span>
          </div>
          <div class="auth-feature-pill">
            <i class="fa-solid fa-circle-check text-accent-green"></i>
            <span>100% Free Access</span>
          </div>
        </div>

        <!-- Footer Switch Prompt -->
        <div class="auth-modal-footer">
          <span id="authSwitchPrompt">Don't have an account yet? <a href="javascript:void(0)" onclick="AuthManager.switchTab('register')">Create one now</a></span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function _resolveAssetPath(relativePath) {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/certifications/social-media-marketing/')) {
      return '../../' + relativePath;
    } else if (path.includes('/certifications/')) {
      return '../' + relativePath;
    }
    return relativePath;
  }

  function openModal(mode = 'login') {
    injectAuthModal();
    const modal = document.getElementById('thrmAuthModalBackdrop');
    if (!modal) return;

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
    switchTab(mode);
    _clearAlert();

    setTimeout(() => {
      if (mode === 'login') {
        const el = document.getElementById('loginEmail');
        if (el) el.focus();
      } else {
        const el = document.getElementById('regName');
        if (el) el.focus();
      }
    }, 100);
  }

  function closeModal() {
    const modal = document.getElementById('thrmAuthModalBackdrop');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 300);
    }
    _clearAlert();
  }

  function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    const icon = btn ? btn.querySelector('i') : null;
    if (icon) {
      if (isPass) {
        icon.className = 'fa-solid fa-eye-slash';
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        icon.className = 'fa-solid fa-eye';
        btn.setAttribute('aria-label', 'Show password');
      }
    }
  }

  function switchTab(mode) {
    const isLogin = mode === 'login';
    const tabLogin = document.getElementById('tabBtnLogin');
    const tabReg = document.getElementById('tabBtnRegister');
    const formLogin = document.getElementById('authLoginForm');
    const formReg = document.getElementById('authRegisterForm');
    const title = document.getElementById('authModalTitle');
    const desc = document.getElementById('authModalDesc');
    const prompt = document.getElementById('authSwitchPrompt');

    if (tabLogin) tabLogin.className = `auth-tab-btn ${isLogin ? 'active' : ''}`;
    if (tabReg) tabReg.className = `auth-tab-btn ${!isLogin ? 'active' : ''}`;

    if (formLogin) formLogin.style.display = isLogin ? 'flex' : 'none';
    if (formReg) formReg.style.display = !isLogin ? 'flex' : 'none';

    if (title) title.innerText = isLogin ? 'Welcome Back!' : 'Create Free Account';
    if (desc) desc.innerText = isLogin 
      ? 'Sign in to sync your course progress, resume modules seamlessly, and access your verified credentials.' 
      : 'Register now to automatically save module progress, complete assessments, and earn your verified certificate.';

    if (prompt) {
      prompt.innerHTML = isLogin
        ? `Don't have an account yet? <a href="javascript:void(0)" onclick="AuthManager.switchTab('register')">Create one now</a>`
        : `Already have an account? <a href="javascript:void(0)" onclick="AuthManager.switchTab('login')">Sign in here</a>`;
    }

    _clearAlert();
  }

  function _showAlert(msg, isError = true) {
    const el = document.getElementById('authAlert');
    if (!el) return;
    el.style.display = 'block';
    el.className = `auth-alert ${isError ? 'error' : 'success'}`;
    el.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> <span>${msg}</span>`;
  }

  function _clearAlert() {
    const el = document.getElementById('authAlert');
    if (el) el.style.display = 'none';
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    const btn = document.getElementById('btnLoginSubmit');
    if (btn) btn.disabled = true;

    try {
      const res = await login(email, pass);
      if (!res.success) {
        _showAlert(res.message, true);
      } else {
        _showAlert(`Welcome back, ${res.user.name}! Restoring your session...`, false);
        setTimeout(() => {
          closeModal();
        }, 700);
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;
    const btn = document.getElementById('btnRegSubmit');
    if (btn) btn.disabled = true;

    try {
      const res = await register(name, email, pass);
      if (!res.success) {
        _showAlert(res.message, true);
      } else {
        _showAlert(`Account created successfully! Welcome, ${res.user.name}.`, false);
        setTimeout(() => {
          closeModal();
        }, 800);
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function renderNavbarAuth() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    let authMount = document.getElementById('navAuthMount');
    if (!authMount) {
      authMount = document.createElement('div');
      authMount.id = 'navAuthMount';
      authMount.className = 'nav-auth-mount';
      // Insert before mobileToggle if exists, or append
      const toggle = navActions.querySelector('.mobile-toggle');
      if (toggle) {
        navActions.insertBefore(authMount, toggle);
      } else {
        navActions.appendChild(authMount);
      }
    }

    const user = getCurrentUser();
    if (user) {
      const initials = user.name
        ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'U';
      const smmProg = user.courseProgress?.['social-media-marketing']?.completedModules?.length || 0;
      const isAdmin = user.role === 'admin' || user.email === 'dev@thrmdigitalmarketing.in';

      authMount.innerHTML = `
        <div class="user-profile-menu-wrap" id="userProfileMenuWrap">
          <button class="user-profile-btn" onclick="AuthManager.toggleProfileDropdown()" aria-label="User profile menu">
            <span class="user-avatar-badge">${initials}</span>
            <span class="user-name-label">${user.name}</span>
            <i class="fa-solid fa-chevron-down user-chevron"></i>
          </button>
          <div class="user-dropdown-card" id="userDropdownCard">
            <div class="user-dropdown-header">
              <div class="user-dropdown-avatar">${initials}</div>
              <div class="user-dropdown-details">
                <strong>${user.name} ${isAdmin ? '<span style="font-size:0.7rem;background:#2563EB;color:#fff;padding:2px 6px;border-radius:4px;margin-left:4px;">ADMIN</span>' : ''}</strong>
                <span>${user.email}</span>
              </div>
            </div>
            <div class="user-dropdown-track-stat">
              <div class="track-stat-row">
                <span><i class="fa-solid fa-layer-group text-blue"></i> SMM Track:</span>
                <strong>${smmProg} / 12 Done</strong>
              </div>
              <div class="track-stat-bar">
                <div class="track-stat-fill" style="width: ${Math.round((smmProg / 12) * 100)}%;"></div>
              </div>
            </div>
            <div class="user-dropdown-actions">
              ${isAdmin ? `
                <a href="${_resolveAssetPath('admin.html')}" class="btn-user-action" style="text-decoration:none;display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;background:rgba(37,99,235,0.08);color:#2563EB;font-weight:700;margin-bottom:8px;font-size:0.85rem;">
                  <i class="fa-solid fa-gauge-high"></i>
                  <span>Admin Dashboard</span>
                </a>
              ` : ''}
              <button class="btn-user-action btn-logout" onclick="AuthManager.logout()">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      authMount.innerHTML = `
        <button class="btn-auth-trigger" onclick="AuthManager.openModal('login')">
          <i class="fa-solid fa-user-circle"></i>
          <span>Log In</span>
        </button>
      `;
    }
  }

  function toggleProfileDropdown() {
    const card = document.getElementById('userDropdownCard');
    if (!card) return;
    card.classList.toggle('active');
  }

  // Close profile dropdown on outside click
  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('userProfileMenuWrap');
    const card = document.getElementById('userDropdownCard');
    if (wrap && card && !wrap.contains(e.target)) {
      card.classList.remove('active');
    }
  });

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectAuthModal();
      renderNavbarAuth();
    });
  } else {
    injectAuthModal();
    renderNavbarAuth();
  }

  return {
    getCurrentUser,
    isLoggedIn,
    register,
    login,
    logout,
    getUserProgress,
    saveUserProgress,
    onAuthStateChange,
    openModal,
    closeModal,
    switchTab,
    togglePasswordVisibility,
    handleLoginSubmit,
    handleRegisterSubmit,
    renderNavbarAuth,
    toggleProfileDropdown
  };
})();
