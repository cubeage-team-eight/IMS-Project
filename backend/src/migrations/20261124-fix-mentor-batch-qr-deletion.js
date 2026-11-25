
export async function up({ sequelize, transaction }) {
  // Preserve existing batch names in QR session history.
  await sequelize.query(
    `
    ALTER TABLE public.qr_sessions
    ADD COLUMN "batchName" VARCHAR(255),
    ADD COLUMN "originalBatchId" UUID;
    `,
    { transaction }
  );

  await sequelize.query(
    `
    UPDATE public.qr_sessions qs
    SET
    "batchName" = b.name,
    "originalBatchId" = qs."batchId"
    FROM public.batches b
    WHERE qs."batchId" = b.id;
    `,
    { transaction }
  );

  // Allow QR sessions to remain after mentor deletion.
  await sequelize.query(
    `
    ALTER TABLE public.qr_sessions
    DROP CONSTRAINT "qr_sessions_mentorId_fkey";

    ALTER TABLE public.qr_sessions
    ALTER COLUMN "mentorId" DROP NOT NULL;

    ALTER TABLE public.qr_sessions
    ADD CONSTRAINT "qr_sessions_mentorId_fkey"
    FOREIGN KEY ("mentorId")
    REFERENCES public.mentors(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;
    `,
    { transaction }
  );

  // Allow QR sessions to remain after batch deletion.
  await sequelize.query(
    `
    ALTER TABLE public.qr_sessions
    DROP CONSTRAINT "qr_sessions_batchId_fkey";

    ALTER TABLE public.qr_sessions
    ALTER COLUMN "batchId" DROP NOT NULL;

    ALTER TABLE public.qr_sessions
    ADD CONSTRAINT "qr_sessions_batchId_fkey"
    FOREIGN KEY ("batchId")
    REFERENCES public.batches(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;
    `,
    { transaction }
  );
}

export async function down({ sequelize, transaction }) {
  const [rows] = await sequelize.query(
    `
    SELECT
      COUNT(*) FILTER (WHERE "mentorId" IS NULL)::int AS null_mentors,
      COUNT(*) FILTER (WHERE "batchId" IS NULL)::int AS null_batches
    FROM public.qr_sessions;
    `,
    { transaction }
  );

  if (rows[0].null_mentors > 0 || rows[0].null_batches > 0) {
    throw new Error(
      "Rollback blocked: QR sessions contain detached mentor or batch references."
    );
  }

  await sequelize.query(
    `
    ALTER TABLE public.qr_sessions
    DROP CONSTRAINT "qr_sessions_mentorId_fkey";

    ALTER TABLE public.qr_sessions
    ALTER COLUMN "mentorId" SET NOT NULL;

    ALTER TABLE public.qr_sessions
    ADD CONSTRAINT "qr_sessions_mentorId_fkey"
    FOREIGN KEY ("mentorId")
    REFERENCES public.mentors(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;

    ALTER TABLE public.qr_sessions
    DROP CONSTRAINT "qr_sessions_batchId_fkey";

    ALTER TABLE public.qr_sessions
    ALTER COLUMN "batchId" SET NOT NULL;

    ALTER TABLE public.qr_sessions
    ADD CONSTRAINT "qr_sessions_batchId_fkey"
    FOREIGN KEY ("batchId")
    REFERENCES public.batches(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;

    ALTER TABLE public.qr_sessions
    DROP COLUMN "batchName";
    DROP COLUMN "originalBatchId";
    `,
    { transaction }
  );
}
