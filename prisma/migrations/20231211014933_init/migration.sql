-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'RUB', 'BRL');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "barcode" TEXT,
    "sku" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT,
    "model" TEXT,
    "material" TEXT,
    "brand" TEXT,
    "weight" DOUBLE PRECISION,
    "size" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "inactivedAt" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "coastPrice" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_barcode_key" ON "products"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
