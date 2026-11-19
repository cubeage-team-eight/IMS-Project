export async function up({ sequelize, transaction }) {
  await sequelize.query(`
    ALTER TABLE public.qr_sessions
      ADD COLUMN "encryptedToken" TEXT NULL;
  `, { transaction });
}

export async function down({ sequelize, transaction }) {
  const [rows] = await sequelize.query(`
    SELECT COUNT(*)::INTEGER AS count
    FROM public.qr_sessions
    WHERE "encryptedToken" IS NOT NULL;
  `, { transaction });

  if (rows[0].count > 0) {
    throw new Error(
      "Rollback blocked: encrypted QR tokens exist. Do not remove this column while active or historical encrypted tokens are stored."
    );
  }

  await sequelize.query(`
    ALTER TABLE public.qr_sessions
      DROP COLUMN "encryptedToken";
  `, { transaction });
}
