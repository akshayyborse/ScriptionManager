'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Plus, Home, Settings, TrendingUp, Calendar, CreditCard, Bell, AlertTriangle } from 'lucide-react'

interface Subscription {
  id: string
  name: string
  platform: string
  amount: number
  billingCycle: 'monthly' | 'yearly'
  nextBilling: string
  daysUntilDue: number
  icon: string
  color: string
}

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [monthlySpending, setMonthlySpending] = useState(269.96)
  const [userName, setUserName] = useState('User')
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Start with logged out state
  const [showReminder, setShowReminder] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasProfile = localStorage.getItem('userProfile')
    if (hasProfile) {
      const userData = JSON.parse(hasProfile)
      setIsLoggedIn(true)
      setUserName(userData.name || 'User')
      
      // Mock data - in real app, this would come from API
      const mockSubscriptions: Subscription[] = [
        {
          id: '1',
          name: 'Netflix',
          platform: 'Streaming',
          amount: 8.44,
          billingCycle: 'monthly',
          nextBilling: 'Dec 9, 2025',
          daysUntilDue: 3,
          icon: 'N',
          color: 'bg-red-600'
        },
        {
          id: '2',
          name: 'Spotify',
          platform: 'Music',
          amount: 100,
          billingCycle: 'yearly',
          nextBilling: 'Dec 16, 2025',
          daysUntilDue: 10,
          icon: 'S',
          color: 'bg-green-600'
        },
        {
          id: '3',
          name: 'Hotstar',
          platform: 'Streaming',
          amount: 125,
          billingCycle: 'yearly',
          nextBilling: 'Dec 26, 2025',
          daysUntilDue: 20,
          icon: 'H',
          color: 'bg-blue-600'
        }
      ]
      setSubscriptions(mockSubscriptions)
      
      // Show reminder for payments due in 3 days or less
      const urgentPayments = mockSubscriptions.filter(sub => sub.daysUntilDue <= 3)
      if (urgentPayments.length > 0) {
        setShowReminder(true)
      }
    }
  }, [])

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-primary-foreground">$</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Welcome to Subscription Manager</h1>
          <p className="text-muted-foreground mb-8">
            Track all your subscriptions in one place and never miss a payment
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full h-12" 
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12" 
              onClick={() => window.location.href = '/register'}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const urgentPayments = subscriptions.filter(sub => sub.daysUntilDue <= 3)
  const upcomingPayments = subscriptions.filter(sub => sub.daysUntilDue > 3 && sub.daysUntilDue <= 10)
  const allSubscriptions = subscriptions.filter(sub => sub.daysUntilDue > 10)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
        
        {/* Payment Reminder Banner */}
        {showReminder && urgentPayments.length > 0 && (
          <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 mx-6 mt-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-orange-800 dark:text-orange-200">
                  Payment Due Soon!
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  {urgentPayments.length === 1 
                    ? `${urgentPayments[0].name} payment due in ${urgentPayments[0].daysUntilDue} day${urgentPayments[0].daysUntilDue > 1 ? 's' : ''}`
                    : `${urgentPayments.length} payments due soon`
                  }
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-orange-600 hover:text-orange-800"
                onClick={() => setShowReminder(false)}
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="p-6 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">Morning, {userName}</h1>
              <p className="text-muted-foreground">Manage your subscriptions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {urgentPayments.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/settings'}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Monthly Spending Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Amount Spent this month</p>
                  <p className="text-3xl font-bold mt-1">${monthlySpending.toFixed(2)}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-20 overflow-y-auto">
          
          {/* Urgent Payments */}
          {urgentPayments.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Urgent Payments
              </h2>
              <div className="space-y-3">
                {urgentPayments.map(subscription => (
                  <Card key={subscription.id} className="bg-card border-red-200 dark:border-red-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${subscription.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                            {subscription.icon}
                          </div>
                          <div>
                            <p className="font-medium">{subscription.name}</p>
                            <p className="text-sm text-red-600 font-medium">
                              Due in {subscription.daysUntilDue} day{subscription.daysUntilDue > 1 ? 's' : ''}!
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${subscription.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {subscription.billingCycle === 'monthly' ? '/month' : '/year'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Payments */}
          {upcomingPayments.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Payments
              </h2>
              <div className="space-y-3">
                {upcomingPayments.map(subscription => (
                  <Card key={subscription.id} className="bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${subscription.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                            {subscription.icon}
                          </div>
                          <div>
                            <p className="font-medium">{subscription.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Due in {subscription.daysUntilDue} days
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${subscription.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {subscription.billingCycle === 'monthly' ? '/month' : '/year'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All Subscriptions */}
          {allSubscriptions.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Your Subscriptions</h2>
              <div className="space-y-3">
                {allSubscriptions.map(subscription => (
                  <Card key={subscription.id} className="bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${subscription.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                            {subscription.icon}
                          </div>
                          <div>
                            <p className="font-medium">{subscription.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Due in {subscription.daysUntilDue} days
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${subscription.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {subscription.billingCycle === 'monthly' ? '/Month' : '/Year'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {subscriptions.length === 0 && (
            <section className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No subscriptions yet</h3>
              <p className="text-muted-foreground mb-6">Start by adding your first subscription</p>
              <Button onClick={() => window.location.href = '/add-subscription'}>
                Add Your First Subscription
              </Button>
            </section>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex justify-around items-center">
              <Button variant="ghost" size="icon" className="text-primary">
                <Home className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.location.href = '/add-subscription'}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/analytics'}>
                <TrendingUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}