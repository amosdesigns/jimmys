import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

type ClerkEvent = {
  type: string
  data: {
    id: string
    email_addresses: { email_address: string; id: string }[]
    first_name: string | null
    last_name: string | null
    image_url: string | null
    username: string | null
  }
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env['CLERK_WEBHOOK_SECRET']

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let event: ClerkEvent

  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const { type, data } = event
  const primaryEmail = data.email_addresses[0]?.email_address

  if (type === 'user.created') {
    if (!primaryEmail) {
      return NextResponse.json({ error: 'Missing primary email' }, { status: 400 })
    }

    await prisma.user.create({
      data: {
        clerkId: data.id,
        email: primaryEmail,
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        imageUrl: data.image_url,
        username: data.username,
      },
    })
  }

  if (type === 'user.updated') {
    if (!primaryEmail) {
      return NextResponse.json({ error: 'Missing primary email' }, { status: 400 })
    }

    await prisma.user.update({
      where: { clerkId: data.id },
      data: {
        email: primaryEmail,
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        imageUrl: data.image_url,
        username: data.username,
      },
    })
  }

  if (type === 'user.deleted') {
    await prisma.user.update({
      where: { clerkId: data.id },
      data: { archivedAt: new Date() },
    })
  }

  return NextResponse.json({ success: true })
}
