import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const subscriptions = await db.subscription.findMany({
      include: {
        user: true
      },
      orderBy: {
        nextBilling: 'asc'
      }
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, platform, amount, billingCycle, nextBilling, userId } = body

    const subscription = await db.subscription.create({
      data: {
        name,
        platform,
        amount: parseFloat(amount),
        billingCycle,
        nextBilling: new Date(nextBilling),
        userId
      }
    })

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}