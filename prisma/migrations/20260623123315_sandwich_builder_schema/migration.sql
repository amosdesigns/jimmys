-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'READY', 'DELIVERED', 'VOIDED');

-- CreateEnum
CREATE TYPE "SandwichCategoryKind" AS ENUM ('BREAD', 'CHEESE', 'PROTEIN', 'VEG', 'SAUCE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "basePrice" DECIMAL(10,2),
ADD COLUMN     "isConfigurable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "readyAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "status" "OrderItemStatus" NOT NULL DEFAULT 'QUEUED',
ADD COLUMN     "voidReason" TEXT,
ADD COLUMN     "voidedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "kind" "SandwichCategoryKind" NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "allergens" TEXT[],
    "trackInventory" BOOLEAN NOT NULL DEFAULT false,
    "stockQuantity" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOptionGroup" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "kind" "SandwichCategoryKind" NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "minSelections" INTEGER NOT NULL DEFAULT 0,
    "maxSelections" INTEGER NOT NULL DEFAULT 1,
    "secondSelectionFee" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "ProductOptionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "priceDelta" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandwichDraft" (
    "id" TEXT NOT NULL,
    "sessionCookie" TEXT NOT NULL,
    "userId" TEXT,
    "productId" TEXT NOT NULL,
    "composition" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SandwichDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedSandwich" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "composition" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedSandwich_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_slug_key" ON "Ingredient"("slug");

-- CreateIndex
CREATE INDEX "Ingredient_kind_isAvailable_idx" ON "Ingredient"("kind", "isAvailable");

-- CreateIndex
CREATE INDEX "Ingredient_sortOrder_idx" ON "Ingredient"("sortOrder");

-- CreateIndex
CREATE INDEX "ProductOptionGroup_productId_idx" ON "ProductOptionGroup"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOptionGroup_productId_position_key" ON "ProductOptionGroup"("productId", "position");

-- CreateIndex
CREATE INDEX "ProductOption_groupId_idx" ON "ProductOption"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOption_groupId_ingredientId_key" ON "ProductOption"("groupId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "SandwichDraft_sessionCookie_key" ON "SandwichDraft"("sessionCookie");

-- CreateIndex
CREATE INDEX "SandwichDraft_sessionCookie_idx" ON "SandwichDraft"("sessionCookie");

-- CreateIndex
CREATE INDEX "SandwichDraft_userId_idx" ON "SandwichDraft"("userId");

-- CreateIndex
CREATE INDEX "SandwichDraft_expiresAt_idx" ON "SandwichDraft"("expiresAt");

-- CreateIndex
CREATE INDEX "SavedSandwich_userId_idx" ON "SavedSandwich"("userId");

-- CreateIndex
CREATE INDEX "OrderItem_status_idx" ON "OrderItem"("status");

-- AddForeignKey
ALTER TABLE "ProductOptionGroup" ADD CONSTRAINT "ProductOptionGroup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ProductOptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

