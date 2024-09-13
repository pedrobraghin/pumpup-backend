-- CreateTable
CREATE TABLE "train_history_exercise" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "train_history_id" TEXT NOT NULL,
    "pause_time" INTEGER NOT NULL,
    "series_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "train_history_exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "train_history_exercise" ADD CONSTRAINT "train_history_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_history_exercise" ADD CONSTRAINT "train_history_exercise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_history_exercise" ADD CONSTRAINT "train_history_exercise_train_history_id_fkey" FOREIGN KEY ("train_history_id") REFERENCES "train_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
