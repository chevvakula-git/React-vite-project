import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const isEmailValid = useMemo(() => {
    if (email.trim().length === 0) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [email])

  const isPasswordValid = password.trim().length >= 6
  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    if (!isFormValid) return

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 700))

      const isMockSuccess = email.toLowerCase() === 'user@example.com' && password === 'password123'
      if (!isMockSuccess) {
        setErrorMessage('Invalid email or password')
        return
      }

      localStorage.setItem('authToken', 'mock-token')
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      navigate('/')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sign in</h1>

        {errorMessage && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                email && !isEmailValid ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            {email && !isEmailValid && (
              <p className="mt-1 text-xs text-red-600">Enter a valid email address</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  password && !isPasswordValid ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Your password"
                autoComplete="current-password"
                required
                minLength={6}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto h-8 rounded px-2 text-xs text-gray-600 hover:bg-gray-100"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {password && !isPasswordValid && (
              <p className="mt-1 text-xs text-red-600">Password must be at least 6 characters</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <button type="button" className="text-sm text-blue-600 hover:underline"
              onClick={() => alert('Forgot password flow not implemented')}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Use email <span className="font-medium">user@example.com</span> and password <span className="font-medium">password123</span> to sign in.
        </p>
      </div>
    </div>
  )
}

export default Login


