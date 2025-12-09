'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, Phone, ArrowRight } from 'lucide-react'

type LoginStep = 'choice' | 'phone' | 'otp' | 'success'

export default function Login() {
  const [currentStep, setCurrentStep] = useState<LoginStep>('choice')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone')

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setCurrentStep('otp')
    }
  }

  const handleOtpSubmit = () => {
    const otpValue = otp.join('')
    if (otpValue.length === 6) {
      setCurrentStep('success')
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleLoginChoice = (method: 'phone' | 'email') => {
    setLoginMethod(method)
    setCurrentStep('phone')
  }

  const renderLoginChoice = () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-foreground">$</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Login to Your Account</h1>
          <p className="text-muted-foreground">Choose your login method</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => handleLoginChoice('phone')}
            variant="outline"
            className="w-full h-16 justify-start gap-4"
          >
            <Phone className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Phone Number</div>
              <div className="text-sm text-muted-foreground">Login with OTP</div>
            </div>
          </Button>

          <Button
            onClick={() => handleLoginChoice('email')}
            variant="outline"
            className="w-full h-16 justify-start gap-4"
          >
            <Mail className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Email Address</div>
              <div className="text-sm text-muted-foreground">Login with password</div>
            </div>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <Button variant="link" className="p-0 h-auto">Sign Up</Button>
          </p>
        </div>
      </div>
    </div>
  )

  const renderPhoneInput = () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentStep('choice')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mb-2">Phone Verification</h1>
          <p className="text-muted-foreground">Enter your phone number to continue</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10 h-12"
              type="tel"
            />
          </div>

          <Button 
            onClick={handlePhoneSubmit}
            className="w-full h-12"
            disabled={phoneNumber.length < 10}
          >
            Send OTP
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderOtpInput = () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentStep('phone')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mb-2">Enter Verification Code</h1>
          <p className="text-muted-foreground">
            Enter 6 digit verification code sent to your phone number
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold"
              />
            ))}
          </div>

          <Button 
            onClick={handleOtpSubmit}
            className="w-full h-12"
            disabled={otp.join('').length !== 6}
          >
            Verify
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            <Button variant="link" className="p-0 h-auto">
              Resend Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSuccess = () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Verification Complete</h1>
        <p className="text-muted-foreground mb-6">Phone Number Verified</p>
        <Button 
          className="w-full h-12"
          onClick={() => {
            // Set user profile in localStorage to simulate login
            localStorage.setItem('userProfile', JSON.stringify({
              name: 'Zain',
              phone: phoneNumber,
              verified: true
            }))
            window.location.href = '/'
          }}
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  )

  switch (currentStep) {
    case 'choice':
      return renderLoginChoice()
    case 'phone':
      return renderPhoneInput()
    case 'otp':
      return renderOtpInput()
    case 'success':
      return renderSuccess()
    default:
      return renderLoginChoice()
  }
}