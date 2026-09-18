import { getSettings, updateSettings } from "../../services/superadmin/systemSettings.service.js";

export const get = async (req, res) => {
  try {
    const settings = await getSettings();

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const settings = await updateSettings(req.body);

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};