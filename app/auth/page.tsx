'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import { LoginForm } from '@/components/auth/login-form'
import { SignUpForm } from '@/components/auth/signup-form'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

type AuthView = 'login' | 'signup' | 'forgot-password'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useAuthContext()
  
  const [currentView, setCurrentView] = useState<AuthView>('login')

  useEffect(() => {
    const view = searchParams.get('view') as AuthView
    if (view && ['login', 'signup', 'forgot-password'].includes(view)) {
      setCurrentView(view)
    }
  }, [searchParams])

  useEffect(() => {
    if (!loading && user) {
      router.push('/')
    }
  }, [user, loading, router])

  const handleSuccess = () => {
    const redirect = searchParams.get('redirect')
    router.push(redirect || '/')
  }

  const updateUrl = (view: AuthView) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', view)
    window.history.replaceState({}, '', url.toString())
    setCurrentView(view)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return null
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignUpForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => updateUrl('login')}
          />
        )
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToLogin={() => updateUrl('login')}
          />
        )
      default:
        return (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => updateUrl('signup')}
            onForgotPassword={() => updateUrl('forgot-password')}
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {renderCurrentView()}
    </div>
  )
}