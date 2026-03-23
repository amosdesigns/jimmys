import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-lg font-bold">
            Jimmy&apos;s Orders
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/orders" className="hover:underline">
              Orders
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <Link href="/customers" className="hover:underline">
              Customers
            </Link>
          </nav>
        </div>
        <UserButton />
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
