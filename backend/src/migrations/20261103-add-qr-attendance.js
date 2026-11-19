export async function up({ sequelize, transaction }) {
  await sequelize.query(`
    ALTER TABLE public.attendances
      ADD COLUMN "qrSessionId" UUID NULL,
      ADD COLUMN "photoUrl" TEXT NULL,
      ADD COLUMN "attendanceMethod" VARCHAR(255) NULL DEFAULT 'GPS';

    CREATE TABLE public.qr_sessions (
      "id" UUID PRIMARY KEY,
      "tokenHash" VARCHAR(64) NOT NULL UNIQUE,
      "mentorId" UUID NOT NULL,
      "batchId" UUID NOT NULL,
      "subject" VARCHAR(150) NOT NULL,
      "expiresAt" TIMESTAMPTZ NOT NULL,
      "closedAt" TIMESTAMPTZ NULL,
      "createdAt" TIMESTAMPTZ NOT NULL,
      "updatedAt" TIMESTAMPTZ NOT NULL,

      CONSTRAINT "qr_sessions_mentorId_fkey"
        FOREIGN KEY ("mentorId")
        REFERENCES public.mentors("id")
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

      CONSTRAINT "qr_sessions_batchId_fkey"
        FOREIGN KEY ("batchId")
        REFERENCES public.batches("id")
        ON UPDATE CASCADE
        ON DELETE RESTRICT
    );

    ALTER TABLE public.attendances
      ADD CONSTRAINT "attendances_qrSessionId_fkey"
      FOREIGN KEY ("qrSessionId")
      REFERENCES public.qr_sessions("id")
      ON UPDATE CASCADE
      ON DELETE RESTRICT;

    CREATE INDEX "qr_sessions_mentor_created_idx"
      ON public.qr_sessions ("mentorId", "createdAt");

    CREATE INDEX "qr_sessions_batch_expiry_idx"
      ON public.qr_sessions ("batchId", "expiresAt");

    CREATE INDEX "attendances_qrSessionId_idx"
      ON public.attendances ("qrSessionId");

    CREATE UNIQUE INDEX "attendances_studentId_qrSessionId_unique"
      ON public.attendances ("studentId", "qrSessionId")
      WHERE "qrSessionId" IS NOT NULL;
  `, { transaction });
}

export async function down({ sequelize, transaction }) {
  const [rows] = await sequelize.query(`
    SELECT COUNT(*)::INTEGER AS count
    FROM public.attendances
    WHERE "qrSessionId" IS NOT NULL;
  `, { transaction });

  if (rows[0].count > 0) {
    throw new Error(
      "Rollback blocked: QR attendance records exist. Back up or deliberately archive them before rollback."
    );
  }

  await sequelize.query(`
    ALTER TABLE public.attendances
      DROP CONSTRAINT "attendances_qrSessionId_fkey";

    DROP TABLE public.qr_sessions;

    DROP INDEX public."attendances_studentId_qrSessionId_unique";
    DROP INDEX public."attendances_qrSessionId_idx";

    ALTER TABLE public.attendances
      DROP COLUMN "qrSessionId",
      DROP COLUMN "photoUrl",
      DROP COLUMN "attendanceMethod";
  `, { transaction });
}

