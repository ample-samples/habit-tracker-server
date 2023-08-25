-- CreateTable
CREATE TABLE "Habits" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "meditation" INTEGER,
    "calories" INTEGER,
    "sleep" INTEGER,
    "steps" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Habits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Habits" ADD CONSTRAINT "Habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
