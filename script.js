// =========================================================
// FinWise AI — demo app logic
// "Database" = browser localStorage (this is a static frontend
// with no server, so there is no real database connection here).
// For a production version this would be swapped for a real
// backend + DB, with passwords hashed+salted server-side.
// =========================================================

const DB_KEY = 'finwise_users_db';
const SESSION_KEY = 'finwise_session';

// ---------- storage helpers ----------
function getDB(){
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
function getSession(){
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
function setSession(userId){
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
}
function clearSession(){
  localStorage.removeItem(SESSION_KEY);
}
function currentUser(){
  const s = getSession();
  if(!s) return null;
  const db = getDB();
  return db.find(u => u.id === s.userId) || null;
}

// simple client-side hash so raw passwords are never stored as plain text
// (note: for a real product this must happen server-side with salt)
async function hashPassword(pw){
  const enc = new TextEncoder().encode(pw);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ---------- view router ----------
function showView(id){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  updateNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToView(id){
  const protectedViews = ['view-dashboard', 'view-eligibility', 'view-cibil', 'view-profile'];
  if(protectedViews.includes(id) && !currentUser()){
    showView('view-login');
    return;
  }
  if(id === 'view-dashboard') renderDashboard();
  if(id === 'view-profile') renderProfile();
  showView(id);
}

function updateNav(){
  const u = currentUser();
  const authLinks = document.getElementById('authLinks');
  const userLinks = document.getElementById('userLinks');
  if(u){
    authLinks.style.display = 'none';
    userLinks.style.display = 'flex';
    document.getElementById('navUserName').textContent = u.fullName.split(' ')[0];
  } else {
    authLinks.style.display = 'flex';
    userLinks.style.display = 'none';
  }
}

// ---------- signup + id verification (two-step) ----------
let signupDraft = {};

function handleSignupSubmit(e){
  e.preventDefault();
  const fullName = document.getElementById('suName').value.trim();
  const email = document.getElementById('suEmail').value.trim().toLowerCase();
  const password = document.getElementById('suPassword').value;
  const confirm = document.getElementById('suConfirm').value;
  const errEl = document.getElementById('suError');
  errEl.textContent = '';

  if(!fullName || !email || !password){ errEl.textContent = 'Fill all fields.'; return; }
  if(password.length < 6){ errEl.textContent = 'Password must be at least 6 characters.'; return; }
  if(password !== confirm){ errEl.textContent = 'Passwords do not match.'; return; }

  const db = getDB();
  if(db.some(u => u.email === email)){ errEl.textContent = 'An account with this email already exists.'; return; }

  signupDraft = { fullName, email, password };
  document.getElementById('idVerifyForm').reset();
  document.getElementById('idError').textContent = '';
  showView('view-idverify');
}

async function handleIdVerifySubmit(e){
  e.preventDefault();
  const dob = document.getElementById('idDob').value;
  const idType = document.getElementById('idType').value;
  const idNumber = document.getElementById('idNumber').value.trim();
  const errEl = document.getElementById('idError');
  errEl.textContent = '';

  if(!dob || !idNumber){ errEl.textContent = 'Fill all fields.'; return; }

  const age = calcAge(dob);
  if(age < 18){
    errEl.textContent = `You are ${age} years old. FinWise AI requires applicants to be 18 or older — this account cannot be created.`;
    return;
  }
  if(idNumber.replace(/\s/g,'').length < 6){
    errEl.textContent = 'Enter a valid-looking ID number (min 6 characters).';
    return;
  }
  if(!signupDraft.email){
    errEl.textContent = 'Something went wrong — please restart signup.';
    showView('view-signup');
    return;
  }

  const passwordHash = await hashPassword(signupDraft.password);
  const db = getDB();
  const newUser = {
    id: 'u_' + Date.now(),
    fullName: signupDraft.fullName,
    email: signupDraft.email,
    passwordHash,
    dob, age, idType, idNumber,
    verified: true,
    createdAt: new Date().toISOString(),
    eligibilityHistory: [],
    cibilHistory: []
  };
  db.push(newUser);
  saveDB(db);
  setSession(newUser.id);
  signupDraft = {};

  renderDashboard();
  showView('view-dashboard');
}

async function handleLoginSubmit(e){
  e.preventDefault();
  const email = document.getElementById('liEmail').value.trim().toLowerCase();
  const password = document.getElementById('liPassword').value;
  const errEl = document.getElementById('liError');
  errEl.textContent = '';

  const db = getDB();
  const user = db.find(u => u.email === email);
  if(!user){ errEl.textContent = 'No account found with this email.'; return; }

  const hash = await hashPassword(password);
  if(hash !== user.passwordHash){ errEl.textContent = 'Incorrect password.'; return; }

  setSession(user.id);
  renderDashboard();
  showView('view-dashboard');
}

function logout(){
  clearSession();
  showView('view-landing');
}

function calcAge(dobStr){
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if(m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

// ---------- dashboard ----------
function renderDashboard(){
  const u = currentUser();
  if(!u) return;
  document.getElementById('dashName').textContent = u.fullName;
  document.getElementById('dashSince').textContent = new Date(u.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  document.getElementById('dashElig').textContent = u.eligibilityHistory.length;
  document.getElementById('dashCibil').textContent = u.cibilHistory.length ? u.cibilHistory[u.cibilHistory.length - 1].score : '—';
}

// ---------- eligibility calculator ----------
function emiFor(principal, annualRatePct, months){
  const r = (annualRatePct / 12) / 100;
  if(r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return principal * r * pow / (pow - 1);
}
function maxPrincipalFor(emi, annualRatePct, months){
  const r = (annualRatePct / 12) / 100;
  if(r === 0) return emi * months;
  const pow = Math.pow(1 + r, months);
  return emi * (pow - 1) / (r * pow);
}
function fmtRs(n){ return '₹' + Math.round(n).toLocaleString('en-IN'); }

function syncEligLabels(){
  document.getElementById('incomeVal').textContent = Number(document.getElementById('income').value).toLocaleString('en-IN');
  document.getElementById('emiVal').textContent = Number(document.getElementById('existingEmi').value).toLocaleString('en-IN');
  document.getElementById('loanVal').textContent = Number(document.getElementById('loanAmt').value).toLocaleString('en-IN');
  document.getElementById('tenureVal').textContent = document.getElementById('tenure').value;
}

function runEligibility(){
  const u = currentUser();
  if(!u){ showView('view-login'); return; }

  const income = Number(document.getElementById('income').value);
  const existingEmi = Number(document.getElementById('existingEmi').value);
  const loanAmt = Number(document.getElementById('loanAmt').value);
  const tenure = Math.max(Number(document.getElementById('tenure').value), 12);
  const employment = document.getElementById('employment').value;
  const score = u.cibilHistory.length ? u.cibilHistory[u.cibilHistory.length - 1].score : 700;

  let rate = 10.5;
  if(score >= 800) rate -= 2.0;
  else if(score >= 750) rate -= 1.5;
  else if(score >= 700) rate -= 0.5;
  else if(score < 650) rate += 2.5;
  else if(score < 700) rate += 1.0;
  if(employment === 'self') rate += 0.5;
  rate = Math.round(rate * 100) / 100;

  const emi = emiFor(loanAmt, rate, tenure);
  const foir = (existingEmi + emi) / income;
  const maxAllowedEmi = Math.max(income * 0.5 - existingEmi, 0);
  const maxLoan = maxPrincipalFor(maxAllowedEmi, rate, tenure);

  let stampClass, stampText, advisory;
  if(foir <= 0.40 && score >= 700){
    stampClass = 'approved'; stampText = 'APPROVED';
    advisory = `Solid application. Your FOIR of ${(foir * 100).toFixed(1)}% is comfortably under the 40% mark lenders like, and your credit score backs it up.`;
  } else if(foir <= 0.50 && score >= 650){
    stampClass = 'review'; stampText = 'CONDITIONAL';
    advisory = `Bankable, but not clean. FOIR is at ${(foir * 100).toFixed(1)}% — above the comfortable zone. A co-applicant, collateral, or a longer tenure would help.`;
  } else {
    stampClass = 'decline'; stampText = 'HIGH RISK';
    advisory = `${score < 650 ? 'Your credit score is the bigger blocker here — get it above 650 before reapplying. ' : ''}${foir > 0.50 ? `FOIR is at ${(foir * 100).toFixed(1)}%, past what most lenders approve — try a smaller amount or longer tenure.` : ''}`;
  }

  document.getElementById('stampEl').textContent = stampText;
  document.getElementById('stampEl').className = 'stamp ' + stampClass;
  document.getElementById('rateOut').textContent = rate.toFixed(2) + '%';
  document.getElementById('emiOut').textContent = fmtRs(emi);
  document.getElementById('foirOut').textContent = (foir * 100).toFixed(1) + '%';
  document.getElementById('maxLoanOut').textContent = fmtRs(Math.max(maxLoan, 0));
  document.getElementById('advisoryOut').textContent = advisory;

  const box = document.getElementById('resultBox');
  box.classList.remove('show'); void box.offsetWidth; box.classList.add('show');

  const db = getDB();
  const idx = db.findIndex(x => x.id === u.id);
  db[idx].eligibilityHistory.push({
    date: new Date().toISOString(), income, existingEmi, loanAmt, tenure, employment,
    rate, emi: Math.round(emi), foir: +(foir * 100).toFixed(1), verdict: stampText, maxLoan: Math.round(maxLoan)
  });
  saveDB(db);
}

// ---------- CIBIL-style simulator ----------
function syncCibilLabels(){
  document.getElementById('onTimeVal').textContent = document.getElementById('onTimePct').value + '%';
  document.getElementById('utilVal').textContent = document.getElementById('utilPct').value + '%';
  document.getElementById('histVal').textContent = document.getElementById('creditHistYears').value + ' yrs';
  document.getElementById('accVal').textContent = document.getElementById('numAccounts').value;
  document.getElementById('inqVal').textContent = document.getElementById('hardInquiries').value;
}

function runCibilCheck(){
  const u = currentUser();
  if(!u){ showView('view-login'); return; }

  const onTime = Number(document.getElementById('onTimePct').value);
  const util = Number(document.getElementById('utilPct').value);
  const histYears = Number(document.getElementById('creditHistYears').value);
  const numAcc = Number(document.getElementById('numAccounts').value);
  const inquiries = Number(document.getElementById('hardInquiries').value);

  let score = 300;
  score += (onTime / 100) * 300;
  score += (1 - util / 100) * 200;
  score += Math.min(histYears / 15, 1) * 120;
  score += Math.min(numAcc / 8, 1) * 60;
  score -= Math.min(inquiries * 15, 120);
  score = Math.max(300, Math.min(900, Math.round(score)));

  let band, bandClass;
  if(score >= 800){ band = 'Excellent'; bandClass = 'excellent'; }
  else if(score >= 750){ band = 'Very Good'; bandClass = 'good'; }
  else if(score >= 700){ band = 'Good'; bandClass = 'fair'; }
  else if(score >= 650){ band = 'Fair'; bandClass = 'fair'; }
  else { band = 'Poor'; bandClass = 'poor'; }

  document.getElementById('cibilScoreOut').textContent = score;
  document.getElementById('cibilBandOut').textContent = band;
  document.getElementById('cibilBandOut').className = 'band-tag ' + bandClass;
  document.getElementById('cibilGaugeFill').style.width = ((score - 300) / 600 * 100) + '%';
  document.getElementById('cibilResultBox').classList.add('show');

  const db = getDB();
  const idx = db.findIndex(x => x.id === u.id);
  db[idx].cibilHistory.push({ date: new Date().toISOString(), score, band, onTime, util, histYears, numAcc, inquiries });
  saveDB(db);
}

// ---------- profile ----------
function maskId(id){
  if(id.length <= 4) return id;
  return id.slice(0, 2) + '*'.repeat(id.length - 4) + id.slice(-2);
}

function renderProfile(){
  const u = currentUser();
  if(!u) return;
  document.getElementById('profName').textContent = u.fullName;
  document.getElementById('profEmail').textContent = u.email;
  document.getElementById('profAge').textContent = u.age;
  document.getElementById('profIdType').textContent = u.idType.toUpperCase();
  document.getElementById('profIdNum').textContent = maskId(u.idNumber);
  document.getElementById('profSince').textContent = new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const eligBody = document.getElementById('eligHistoryBody');
  eligBody.innerHTML = u.eligibilityHistory.slice().reverse().map(h => `
    <tr>
      <td>${new Date(h.date).toLocaleDateString('en-IN')}</td>
      <td>${fmtRs(h.loanAmt)}</td>
      <td>${h.tenure}m</td>
      <td>${h.rate}%</td>
      <td>${h.foir}%</td>
      <td class="v-${h.verdict.toLowerCase().replace(' ', '-')}">${h.verdict}</td>
    </tr>`).join('') || '<tr><td colspan="6" class="empty-row">No eligibility checks yet.</td></tr>';

  const cibilBody = document.getElementById('cibilHistoryBody');
  cibilBody.innerHTML = u.cibilHistory.slice().reverse().map(h => `
    <tr>
      <td>${new Date(h.date).toLocaleDateString('en-IN')}</td>
      <td>${h.score}</td>
      <td>${h.band}</td>
      <td>${h.onTime}%</td>
      <td>${h.util}%</td>
    </tr>`).join('') || '<tr><td colspan="5" class="empty-row">No CIBIL-style checks yet.</td></tr>';
}

// ---------- init ----------
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signupForm').addEventListener('submit', handleSignupSubmit);
  document.getElementById('idVerifyForm').addEventListener('submit', handleIdVerifySubmit);
  document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);

  ['income', 'existingEmi', 'loanAmt', 'tenure'].forEach(id => {
    document.getElementById(id).addEventListener('input', syncEligLabels);
  });
  ['onTimePct', 'utilPct', 'creditHistYears', 'numAccounts', 'hardInquiries'].forEach(id => {
    document.getElementById(id).addEventListener('input', syncCibilLabels);
  });
  syncEligLabels();
  syncCibilLabels();

  const u = currentUser();
  if(u){
    renderDashboard();
    showView('view-dashboard');
  } else {
    showView('view-landing');
  }
});