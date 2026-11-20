export async function up({ sequelize, transaction }) {
  await sequelize.query(
    `
    CREATE TABLE public.attendance_sync_outbox (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      "attendanceId" UUID NOT NULL UNIQUE
        REFERENCES public.attendances(id)
        ON DELETE RESTRICT,

      status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'SYNCED', 'FAILED')),

      attempts INTEGER NOT NULL DEFAULT 0
        CHECK (attempts >= 0),

      "nextAttemptAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      "lastError" TEXT,

      "syncedAt" TIMESTAMPTZ,

      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX attendance_sync_outbox_pending_idx
    ON public.attendance_sync_outbox
      (status, "nextAttemptAt");
    `,
    { transaction }
  );
}


export async function down({ sequelize, transaction }) {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*)::int AS count
     FROM public.attendance_sync_outbox`,
    { transaction }
  );

  if (rows[0].count > 0) {
    throw new Error(
      "Rollback blocked: attendance sync outbox contains records."
    );
  }

  await sequelize.query(
    `DROP TABLE public.attendance_sync_outbox;`,
    { transaction }
  );
}

