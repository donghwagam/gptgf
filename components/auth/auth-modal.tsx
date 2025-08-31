'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { LoginForm } from './login-form'
import { SignUpForm } from './signup-form'
import { ForgotPasswordForm } from './forgot-password-form'

type AuthView = 'login' | 'signup' | 'forgot-password'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultView?: AuthView
}

export function AuthModal({ open, onOpenChange, defaultView = 'login' }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<AuthView>(defaultView)

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setCurrentView(defaultView)
    }, 300)
  }

  const handleSuccess = () => {
    handleClose()
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignUpForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToLogin={() => setCurrentView('login')}
          />
        )
      default:
        return (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => setCurrentView('signup')}
            onForgotPassword={() => setCurrentView('forgot-password')}
          />
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 border-none">
        {renderCurrentView()}
      </DialogContent>
    </Dialog>
  )
}