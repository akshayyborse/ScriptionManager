'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette, 
  Globe, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Mail,
  Phone,
  Moon,
  Sun,
  Smartphone,
  Download,
  Trash2,
  Info,
  TrendingUp,
  Plus
} from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  phone: string
  avatar?: string
}

interface NotificationSettings {
  paymentReminders: boolean
  reminderDays: number
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  monthlyReports: boolean
}

interface AppSettings {
  darkMode: boolean
  currency: string
  language: string
  autoSync: boolean
  dataUsage: 'low' | 'medium' | 'high'
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'User',
    email: 'user@example.com',
    phone: '+1234567890'
  })
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    paymentReminders: true,
    reminderDays: 3,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false,
    monthlyReports: true
  })

  const [appSettings, setAppSettings] = useState<AppSettings>({
    darkMode: true,
    currency: 'USD',
    language: 'English',
    autoSync: true,
    dataUsage: 'medium'
  })

  useEffect(() => {
    // Load user data from localStorage
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const userData = JSON.parse(savedProfile)
      setUserProfile({
        name: userData.name || 'User',
        email: userData.email || 'user@example.com',
        phone: userData.phone || '+1234567890'
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userProfile')
    window.location.href = '/login'
  }

  const saveProfile = () => {
    // Save updated profile to localStorage
    const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    localStorage.setItem('userProfile', JSON.stringify({
      ...currentProfile,
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone
    }))
  }

  const renderProfileSettings = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <Button variant="outline" size="sm">Change Photo</Button>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG max 2MB</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                value={userProfile.name}
                onChange={(e) => setUserProfile(prev => ({...prev, name: e.target.value}))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile(prev => ({...prev, email: e.target.value}))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input 
                type="tel"
                value={userProfile.phone}
                onChange={(e) => setUserProfile(prev => ({...prev, phone: e.target.value}))}
                className="mt-1"
              />
            </div>
          </div>
          
          <Button onClick={saveProfile} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-between">
            <span>Change Password</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Two-Factor Authentication</span>
            <Badge variant="secondary">Enabled</Badge>
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Connected Devices</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified before payments are due</p>
            </div>
            <Switch 
              checked={notifications.paymentReminders}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, paymentReminders: checked}))}
            />
          </div>
          
          {notifications.paymentReminders && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reminder Days</p>
                <p className="text-sm text-muted-foreground">Days before due date</p>
              </div>
              <select 
                value={notifications.reminderDays}
                onChange={(e) => setNotifications(prev => ({...prev, reminderDays: parseInt(e.target.value)}))}
                className="w-20 p-2 border rounded-md bg-background"
              >
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={7}>1 week</option>
                <option value={14}>2 weeks</option>
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
            </div>
            <Switch 
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, emailNotifications: checked}))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Get instant alerts</p>
              </div>
            </div>
            <Switch 
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, pushNotifications: checked}))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Reports</p>
              <p className="text-sm text-muted-foreground">Summary of weekly spending</p>
            </div>
            <Switch 
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, weeklyReports: checked}))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Monthly Reports</p>
              <p className="text-sm text-muted-foreground">Detailed monthly analysis</p>
            </div>
            <Switch 
              checked={notifications.monthlyReports}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, monthlyReports: checked}))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppSettings = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {appSettings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle app theme</p>
              </div>
            </div>
            <Switch 
              checked={appSettings.darkMode}
              onCheckedChange={(checked) => setAppSettings(prev => ({...prev, darkMode: checked}))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Currency</p>
              <p className="text-sm text-muted-foreground">Display currency</p>
            </div>
            <select 
              value={appSettings.currency}
              onChange={(e) => setAppSettings(prev => ({...prev, currency: e.target.value}))}
              className="w-24 p-2 border rounded-md bg-background"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4" />
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">App language</p>
              </div>
            </div>
            <select 
              value={appSettings.language}
              onChange={(e) => setAppSettings(prev => ({...prev, language: e.target.value}))}
              className="w-24 p-2 border rounded-md bg-background"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Sync</p>
              <p className="text-sm text-muted-foreground">Sync data automatically</p>
            </div>
            <Switch 
              checked={appSettings.autoSync}
              onCheckedChange={(checked) => setAppSettings(prev => ({...prev, autoSync: checked}))}
            />
          </div>
          
          <div>
            <p className="font-medium mb-2">Data Usage</p>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <Button
                  key={level}
                  variant={appSettings.dataUsage === level ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAppSettings(prev => ({...prev, dataUsage: level}))}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDataSettings = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4" />
              <span>Backup Subscriptions</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4" />
              <span>Privacy Settings</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Delete Account</p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Permanently delete your account and all data. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm" className="mt-3">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'app', label: 'App Settings', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="p-6 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-20 overflow-y-auto">
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'app' && renderAppSettings()}
          {activeTab === 'data' && renderDataSettings()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex justify-around items-center">
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
                <User className="h-5 w-5" />
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