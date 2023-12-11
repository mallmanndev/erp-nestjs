-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
