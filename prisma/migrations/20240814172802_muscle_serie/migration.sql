/*
  Warnings:

  - Made the column `weekday` on table `Train` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Train" ALTER COLUMN "weekday" SET NOT NULL;

-- CreateTable
CREATE TABLE "muscle_series" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "weight" DOUBLE PRECISION NOT NULL,
    "repetitions_count" INTEGER NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_series_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "muscle_series" ADD CONSTRAINT "muscle_series_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muscle_series" ADD CONSTRAINT "muscle_series_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
