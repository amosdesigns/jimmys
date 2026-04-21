import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding Jimmy\'s Order App database...')

  // Seed categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Appetizers' },
      update: {},
      create: { name: 'Appetizers', description: 'Starters and small plates', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { name: 'Mains' },
      update: {},
      create: { name: 'Mains', description: 'Main course dishes', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { name: 'Desserts' },
      update: {},
      create: { name: 'Desserts', description: 'Sweet treats', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { name: 'Drinks' },
      update: {},
      create: { name: 'Drinks', description: 'Beverages', sortOrder: 4 },
    }),
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Seed sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'APP-001' },
      update: {},
      create: {
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        price: 5.99,
        sku: 'APP-001',
        categoryId: categories[0].id,
        sortOrder: 1,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'MAIN-001' },
      update: {},
      create: {
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, and special sauce',
        price: 14.99,
        sku: 'MAIN-001',
        categoryId: categories[1].id,
        sortOrder: 1,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'MAIN-002' },
      update: {},
      create: {
        name: 'Grilled Chicken',
        description: 'Herb-marinated grilled chicken breast',
        price: 16.99,
        sku: 'MAIN-002',
        categoryId: categories[1].id,
        sortOrder: 2,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'DES-001' },
      update: {},
      create: {
        name: 'Chocolate Cake',
        description: 'Rich chocolate layer cake',
        price: 7.99,
        sku: 'DES-001',
        categoryId: categories[2].id,
        sortOrder: 1,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'DRK-001' },
      update: {},
      create: {
        name: 'Soft Drink',
        description: 'Choice of Coke, Sprite, or Orange',
        price: 2.99,
        sku: 'DRK-001',
        categoryId: categories[3].id,
        sortOrder: 1,
      },
    }),
  ])

  console.log(`✅ Created ${products.length} products`)
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
