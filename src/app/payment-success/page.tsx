'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Receipt, Home } from 'lucide-react'

export default function PaymentSuccess() {
  const paymentDetails = {
    service: 'Netflix',
    amount: 8.44,
    date: 'Dec 6, 2025',
    paymentMethod: 'Visa **** 1234'
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your subscription for {paymentDetails.service} has been renewed.
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="bg-card mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-lg">${paymentDetails.amount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{paymentDetails.date}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{paymentDetails.paymentMethod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full h-12 justify-center gap-2">
            <Receipt className="w-4 h-4" />
            View Receipt
          </Button>
          
          <Button className="w-full h-12 justify-center gap-2" onClick={() => window.location.href = '/'}>
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}