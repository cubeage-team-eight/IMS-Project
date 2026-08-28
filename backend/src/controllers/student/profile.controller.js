import profileService from "../../services/student/profile.service.js";

const profileController = {
  // GET /student/profile
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const profile = await profileService.getProfile(userId);

      return res.status(200).json({
        success: true,
        message: "Student profile fetched successfully",
        data: profile,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },

  // PUT /student/profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const profile = await profileService.updateProfile(
        userId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Student profile updated successfully",
        data: profile,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default profileController;