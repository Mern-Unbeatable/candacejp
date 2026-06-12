const DUMMY_USERS = [
  {
    email: 'member@demo.com',
    password: 'demo123',
    user: { id: 1, name: 'Demo Member', email: 'member@demo.com', role: 'member' },
  },
  {
    email: 'concierge@demo.com',
    password: 'demo123',
    user: { id: 2, name: 'Demo Concierge', email: 'concierge@demo.com', role: 'concierge' },
  },
  {
    email: 'admin@demo.com',
    password: 'demo123',
    user: { id: 3, name: 'Demo Admin', email: 'admin@demo.com', role: 'admin' },
  },
]

export const DUMMY_CREDENTIALS_HINT = DUMMY_USERS.map(({ email, password, user }) => ({
  email,
  password,
  role: user.role,
}))

export function dummyLogin({ email, password }) {
  const account = DUMMY_USERS.find(
    (u) => u.email === email.toLowerCase().trim() && u.password === password,
  )

  if (!account) {
    throw { data: { message: 'Invalid email or password' } }
  }

  return {
    user: account.user,
    token: `dummy-token-${account.user.role}`,
  }
}

export function dummyRegister({ name, email }) {
  const exists = DUMMY_USERS.some((u) => u.email === email.toLowerCase().trim())
  if (exists) {
    throw { data: { message: 'Email already registered' } }
  }
  return { message: 'Registration successful' }
}
