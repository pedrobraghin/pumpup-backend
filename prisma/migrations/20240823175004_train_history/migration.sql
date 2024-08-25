-- CreateTable
CREATE TABLE "train_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "train_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "train_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "train_histories" ADD CONSTRAINT "train_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_histories" ADD CONSTRAINT "train_histories_train_id_fkey" FOREIGN KEY ("train_id") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
