/*
  Warnings:

  - The `weekday` column on the `Train` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Train" DROP COLUMN "weekday",
ADD COLUMN     "weekday" INTEGER;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
