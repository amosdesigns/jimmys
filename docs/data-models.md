# Data Models

## Entity Relationships

```
User ──< Order >── Customer
          │
          └──< OrderItem >── Product >── Category
          │
          └──< Payment
```

## Models

### User
Staff members synced from Clerk.

| Field | Type | Notes |
|---|---|---|
| id | String | Clerk user ID |
| email | String | Unique |
| firstName | String | |
| lastName | String | |
| role | Role | SUPER_ADMIN, ADMIN, MANAGER, STAFF |
| createdAt | DateTime | |

### Product
Menu items available for ordering.

| Field | Type | Notes |
|---|---|---|
| id | String | |
| name | String | |
| description | String? | |
| sku | String? | Unique |
| price | Decimal | |
| categoryId | String? | FK → Category |
| isAvailable | Boolean | Default true |
| trackInventory | Boolean | Default false |
| inventoryCount | Int? | |

### Category
Groups products (e.g. Burgers, Drinks, Sides).

| Field | Type | Notes |
|---|---|---|
| id | String | |
| name | String | |
| displayOrder | Int | Sort order |
| imageUrl | String? | |

### Customer
Optional — orders can be anonymous (walk-in).

| Field | Type | Notes |
|---|---|---|
| id | String | |
| name | String | |
| email | String? | |
| phone | String? | |
| address | String? | |

### Order
Core entity representing a single order transaction.

| Field | Type | Notes |
|---|---|---|
| id | String | |
| orderNumber | String | Unique, human-readable |
| type | OrderType | DINE_IN, TAKEOUT, DELIVERY, ONLINE |
| status | OrderStatus | See lifecycle below |
| customerId | String? | Optional |
| createdById | String | FK → User |
| subtotal | Decimal | |
| tax | Decimal | |
| discount | Decimal | Default 0 |
| tip | Decimal | Default 0 |
| total | Decimal | |
| paymentStatus | PaymentStatus | UNPAID, PARTIAL, PAID, REFUNDED |
| notes | String? | |

**Order Lifecycle:**
```
PENDING → CONFIRMED → PREPARING → READY → COMPLETED
                                        ↘ CANCELLED / REFUNDED
```

### OrderItem
A product line within an order. Captures a price snapshot at order time.

| Field | Type | Notes |
|---|---|---|
| id | String | |
| orderId | String | FK → Order |
| productId | String | FK → Product |
| productName | String | Snapshot |
| productPrice | Decimal | Snapshot |
| quantity | Int | |
| modifiers | Json? | e.g. add-ons, removals |
| notes | String? | |

### Payment
A payment record linked to an order. An order can have multiple partial payments.

| Field | Type | Notes |
|---|---|---|
| id | String | |
| orderId | String | FK → Order |
| amount | Decimal | |
| method | PaymentMethod | CASH, CREDIT_CARD, DEBIT_CARD, ONLINE, OTHER |
| processedById | String | FK → User |

### Notification
In-app notifications for staff.

| Field | Type | Notes |
|---|---|---|
| id | String | |
| userId | String | FK → User |
| title | String | |
| message | String | |
| isRead | Boolean | Default false |
| type | String? | e.g. "order", "alert" |
