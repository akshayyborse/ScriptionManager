'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function RegistrationSuccess() {
  const [userName, setUserName] = useState("User") // Default fallback

  useEffect(() => {
    // Get user data from localStorage
    const userProfile = localStorage.getItem('userProfile')
    if (userProfile) {
      const userData = JSON.parse(userProfile)
      setUserName(userData.name || 'User')
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold mb-3">Account Created Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Welcome aboard, {userName}! You can now manage your subscriptions.
        </p>

        {/* Continue Button */}
        <Button 
          className="w-full h-12"
          onClick={() => window.location.href = '/'}
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  )
}