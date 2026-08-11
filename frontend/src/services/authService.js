// src/services/authService.js
// ============================================================
// TEMPORARY FRONTEND AUTHENTICATION
// ============================================================
//
// This implementation uses LocalStorage ONLY so the frontend
// can be developed and tested before the backend exists.
//
// IMPORTANT:
// This is NOT production authentication.
// Passwords are temporarily stored locally for development.
//
// BACKEND INTEGRATION:
// Replace the implementation of these functions with API calls.
//
// Planned API:
//   POST /api/auth/signup
//   POST /api/auth/login
//   POST /api/auth/logout
//   GET  /api/auth/me
//   POST /api/auth/forgot-password
//
// The React components should NOT need to know whether the
// authentication comes from LocalStorage or the backend.
// ============================================================

const USERS_KEY = 'finlingo_users'
const SESSION_KEY = 'finlingo_session'

// ============================================================
// INTERNAL STORAGE HELPERS
// ============================================================

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    // LocalStorage failure is intentionally ignored for now.
    // BACKEND INTEGRATION:
    // The backend/database will handle persistence instead.
  }
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeSession(userId) {
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ userId })
    )
  } catch {
    // No-op for temporary frontend implementation.
  }
}

function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // No-op.
  }
}

// ============================================================
// NORMALIZATION
// ============================================================

function normalizeEmail(email) {
  return (email ?? '').trim().toLowerCase()
}

// ============================================================
// TEMPORARY USER ID
// ============================================================
//
// BACKEND INTEGRATION:
// The backend/database will generate the real canonical user ID.
// ============================================================

function generateId() {
  return `user_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

// ============================================================
// PUBLIC USER OBJECT
// ============================================================
//
// Never expose the password to React components.
//
// BACKEND INTEGRATION:
// The backend should NEVER return a plaintext password either.
// ============================================================

function toPublicUser(record) {
  if (!record) return null

  const {
    password,
    ...publicUser
  } = record

  return publicUser
}

// ============================================================
// SIGN UP
// ============================================================
//
// BACKEND INTEGRATION:
// Replace this entire implementation with:
//
// POST /api/auth/signup
//
// The backend should:
// 1. Validate the input
// 2. Check whether email already exists
// 3. Hash the password
// 4. Create the database user
// 5. Create the authentication session
// 6. Return the authenticated user
// ============================================================

async function signup(userData = {}) {
  const {
    name,
    email,
    password,
    interests = [],
    difficulty,
    profilePicture = null,
  } = userData

  // -----------------------------
  // Validation
  // -----------------------------

  if (!name || !name.trim()) {
    throw new Error('Please enter your name')
  }

  if (!email || !email.trim()) {
    throw new Error('Please enter a valid email address')
  }

  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }

  if (!difficulty) {
    throw new Error('Please select your experience level')
  }

  const normalizedEmail = normalizeEmail(email)

  // -----------------------------
  // Check duplicate email
  // -----------------------------

  const users = readUsers()

  const existingUser = users.find(
    (user) => user.email === normalizedEmail
  )

  if (existingUser) {
    throw new Error('Email already registered')
  }

  // -----------------------------
  // Create user
  // -----------------------------

  const record = {
    id: generateId(),

    name: name.trim(),

    email: normalizedEmail,

    interests: Array.isArray(interests)
      ? interests
      : [],

    difficulty,

    // Temporary frontend profile picture.
    //
    // This can currently contain a data URL.
    //
    // BACKEND INTEGRATION:
    // Replace this with a real uploaded image URL.
    profilePicture: profilePicture || null,

    createdAt: new Date().toISOString(),

    // TEMPORARY ONLY.
    //
    // BACKEND INTEGRATION:
    // Never store plaintext passwords.
    password,
  }

  // -----------------------------
  // Save user
  // -----------------------------

  users.push(record)
  writeUsers(users)

  // -----------------------------
  // Automatically sign user in
  // -----------------------------

  writeSession(record.id)

  return toPublicUser(record)
}

// ============================================================
// SIGN IN
// ============================================================
//
// BACKEND INTEGRATION:
// Replace with:
//
// POST /api/auth/login
//
// The backend will validate the credentials and establish the
// real authenticated session.
// ============================================================

async function signin(email, password) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    throw new Error('Please enter your email address')
  }

  if (!password) {
    throw new Error('Please enter your password')
  }

  const users = readUsers()

  const record = users.find(
    (user) => user.email === normalizedEmail
  )

  if (!record || record.password !== password) {
    throw new Error('Invalid email or password')
  }

  // Create/update current session.
  writeSession(record.id)

  return toPublicUser(record)
}

// ============================================================
// LOGOUT
// ============================================================
//
// BACKEND INTEGRATION:
// Depending on the final auth strategy:
//
// POST /api/auth/logout
//
// and/or clear the frontend session.
// ============================================================

async function logout() {
  clearSession()
}

// ============================================================
// GET CURRENT USER
// ============================================================
//
// BACKEND INTEGRATION:
// Replace this with:
//
// GET /api/auth/me
//
// The backend should determine the authenticated user from
// the real session/token/cookie.
// ============================================================

function getCurrentUser() {
  const session = readSession()

  if (!session?.userId) {
    return null
  }

  const users = readUsers()

  const record = users.find(
    (user) => user.id === session.userId
  )

  if (!record) {
    clearSession()
    return null
  }

  return toPublicUser(record)
}

// ============================================================
// IS AUTHENTICATED
// ============================================================

function isAuthenticated() {
  return getCurrentUser() !== null
}

// ============================================================
// FORGOT PASSWORD
// ============================================================
//
// TEMPORARY:
// No real email is sent yet.
//
// BACKEND INTEGRATION:
// Add:
//
// POST /api/auth/forgot-password
//
// The backend should send a secure password-reset email.
// ============================================================

async function forgotPassword(email) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    throw new Error('Please enter your email address')
  }

  // Temporary simulated request.
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  )

  return {
    success: true,
  }
}

// ============================================================
// EXPORT
// ============================================================

const authService = {
  signup,
  signin,
  logout,
  getCurrentUser,
  isAuthenticated,
  forgotPassword,
}

export default authService