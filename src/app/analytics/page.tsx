'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, TrendingUp, Calendar, Home, Plus } from 'lucide-react'

interface MonthlyData {
  month: string
  amount: number
}

interface PlatformSpending {
  platform: string
  amount: number
  color: string
  icon: string
}

export default function Analytics() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [platformSpending, setPlatformSpending] = useState<PlatformSpending[]>([])
  const [totalSpending, setTotalSpending] = useState(325.90)

  useEffect(() => {
    // Mock data for the chart
    const mockMonthlyData: MonthlyData[] = [
      { month: '1', amount: 245.50 },
      { month: '2', amount: 267.80 },
      { month: '3', amount: 289.90 },
      { month: '4', amount: 312.40 },
      { month: '5', amount: 298.60 },
      { month: '6', amount: 325.90 },
      { month: '7', amount: 310.20 },
      { month: '8', amount: 295.80 },
      { month: '9', amount: 318.50 },
      { month: '10', amount: 302.30 },
      { month: '11', amount: 287.90 },
      { month: '12', amount: 325.90 }
    ]

    const mockPlatformSpending: PlatformSpending[] = [
      { platform: 'Netflix', amount: 101.28, color: 'bg-red-600', icon: 'N' },
      { platform: 'Disney+', amount: 79.99, color: 'bg-blue-600', icon: 'D' },
      { platform: 'Spotify', amount: 120.00, color: 'bg-green-600', icon: 'S' },
      { platform: 'Amazon Prime', amount: 24.63, color: 'bg-orange-500', icon: 'P' }
    ]

    setMonthlyData(mockMonthlyData)
    setPlatformSpending(mockPlatformSpending)
  }, [selectedYear])

  const maxAmount = Math.max(...monthlyData.map(d => d.amount))
  const chartHeight = 200

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="p-6 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Yearly OTT Spending</h1>
          </div>

          {/* Year Selector */}
          <div className="flex gap-2">
            <Button
              variant={selectedYear === '2024' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedYear('2024')}
            >
              2024
            </Button>
            <Button
              variant={selectedYear === '2025' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedYear('2025')}
            >
              2025
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-20 overflow-y-auto">
          
          {/* Total Spending Card */}
          <Card className="bg-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spending {selectedYear}</p>
                  <p className="text-3xl font-bold mt-1">${totalSpending.toFixed(2)}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="mt-6">
                <div className="flex items-end justify-between h-48 gap-1">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t-sm transition-all duration-300 hover:bg-primary/80"
                          style={{ 
                            height: `${(data.amount / maxAmount) * chartHeight}px`,
                            minHeight: '4px'
                          }}
                        />
                        <span className="text-xs text-muted-foreground mt-1">
                          {data.month}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spending by Platform */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Spending by Platform
            </h2>
            
            <div className="space-y-3">
              {platformSpending.map((platform, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                          {platform.icon}
                        </div>
                        <div>
                          <p className="font-medium">{platform.platform}</p>
                          <p className="text-sm text-muted-foreground">
                            {((platform.amount / totalSpending) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${platform.amount.toFixed(2)}</p>
                        <div className="w-16 h-2 bg-muted rounded-full mt-1">
                          <div 
                            className={`h-full ${platform.color} rounded-full`}
                            style={{ width: `${(platform.amount / totalSpending) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Insights */}
          <section className="mt-6 mb-4">
            <Card className="bg-card">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Key Insights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Your highest spending month was June with ${maxAmount.toFixed(2)}</li>
                  <li>• Spotify accounts for {((platformSpending.find(p => p.platform === 'Spotify')?.amount || 0) / totalSpending * 100).toFixed(1)}% of your total spending</li>
                  <li>• Average monthly spending: ${(totalSpending / 12).toFixed(2)}</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex justify-around items-center">
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
                <Home className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.location.href = '/add-subscription'}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add
              </Button>
              <Button variant="ghost" size="icon" className="text-primary">
                <TrendingUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}