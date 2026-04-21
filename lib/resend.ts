import { Resend } from 'resend'

export const resend = new Resend(process.env['RESEND_API_KEY'])

export const FROM_EMAIL =
  process.env['RESEND_FROM_EMAIL'] ?? 'orders@jimmys.com'

/**
 * Send an order confirmation email to a customer
 */
export async function sendOrderConfirmationEmail({
  to,
  orderNumber,
  customerName,
  totalAmount,
}: {
  to: string
  orderNumber: string
  customerName: string
  totalAmount: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmed – ${orderNumber}`,
    html: `
      <h2>Thanks, ${customerName}!</h2>
      <p>Your order <strong>${orderNumber}</strong> has been confirmed.</p>
      <p>Total: <strong>${totalAmount}</strong></p>
      <p>We'll notify you when it's ready.</p>
    `,
  })
}

/**
 * Send an order ready notification email
 */
export async function sendOrderReadyEmail({
  to,
  orderNumber,
  customerName,
}: {
  to: string
  orderNumber: string
  customerName: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your Order is Ready – ${orderNumber}`,
    html: `
      <h2>Your order is ready, ${customerName}!</h2>
      <p>Order <strong>${orderNumber}</strong> is ready for pickup.</p>
    `,
  })
}
