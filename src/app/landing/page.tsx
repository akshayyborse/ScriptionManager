'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Shield, Smartphone, ArrowRight } from 'lucide-react'

export default function Landing() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Track Spending',
      description: 'Monitor all your subscription expenses in one place'
    },
    {
      icon: Shield,
      title: 'Never Miss a Payment',
      description: 'Get timely reminders for upcoming renewals'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Manage subscriptions on the go with our mobile app'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        
        {/* Hero Section */}
        <section className="flex-1 px-6 py-12 flex flex-col justify-center">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-primary-foreground">$</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Manage your Subscriptions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Seamless subscription management, simplified for your convenience.
            </p>
            
            {/* Demo Stats */}
            <Card className="bg-card mb-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Amount Spent this month</p>
                  <p className="text-4xl font-bold mb-4">$269.96</p>
                  
                  {/* Sample Subscription */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        N
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">Netflix</p>
                        <p className="text-xs text-muted-foreground">Due in 6 days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">$8.44</p>
                      <p className="text-xs text-muted-foreground">/Month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full h-14 text-lg"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Why Choose Us?</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Button variant="link" className="p-0 h-auto" onClick={() => window.location.href = '/login'}>Login</Button>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}