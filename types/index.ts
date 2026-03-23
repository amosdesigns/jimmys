import type {
  User,
  Order,
  OrderItem,
  Product,
  Category,
  Customer,
  Payment,
  OrderStatus,
  OrderType,
  PaymentStatus,
  PaymentMethod,
  ProductStatus,
  Role,
} from '@prisma/client'

// Re-export Prisma types
export type {
  User,
  Order,
  OrderItem,
  Product,
  Category,
  Customer,
  Payment,
  OrderStatus,
  OrderType,
  PaymentStatus,
  PaymentMethod,
  ProductStatus,
  Role,
}

// Extended types with relations
export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product | null })[]
  customer: Customer | null
  createdBy: User
  processedBy: User | null
  payments: Payment[]
}

export type ProductWithCategory = Product & {
  category: Category | null
}

// Form types
export type CreateOrderInput = {
  type: OrderType
  customerId?: string
  tableNumber?: string
  deliveryAddress?: string
  notes?: string
  items: {
    productId: string
    quantity: number
    notes?: string
    modifiers?: string[]
  }[]
}

export type UpdateOrderStatusInput = {
  orderId: string
  status: OrderStatus
}
