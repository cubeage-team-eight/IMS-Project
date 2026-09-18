import SystemSettings from "../../models/SystemSettings.js";

export const getSettings = async () => {
  let settings = await SystemSettings.findOne();

  if (!settings) {
    settings = await SystemSettings.create({});
  }

  return settings;
};

export const updateSettings = async (data) => {
  let settings = await SystemSettings.findOne();

  if (!settings) {
    settings = await SystemSettings.create({});
  }

  const {
    platformName,
    sessionTimeout,
    maxStudentsPerBatch,
    certificatePrefix,
  } = data;

  await settings.update({
    platformName: platformName ?? settings.platformName,
    sessionTimeout: sessionTimeout ?? settings.sessionTimeout,
    maxStudentsPerBatch: maxStudentsPerBatch ?? settings.maxStudentsPerBatch,
    certificatePrefix: certificatePrefix ?? settings.certificatePrefix,
  });

  return settings;
};