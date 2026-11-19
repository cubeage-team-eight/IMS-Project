import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "node:stream";
import { fileTypeFromBuffer } from "file-type";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
    fields: 2,
  },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new Error("Unsupported image type.");
      error.statusCode = 400;
      return callback(error);
    }

    callback(null, true);
  },
});

// Stage 1: Parse multipart photo into memory.
// No Cloudinary upload happens at this stage.
export const parseAttendancePhoto = upload.single("photo");

// Stage 2: Verify image bytes and upload only after QR validation.
export const uploadAttendancePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Live student photo is required.",
      });
    }

    const detectedType = await fileTypeFromBuffer(req.file.buffer);

    if (
      !detectedType ||
      !allowedMimeTypes.includes(detectedType.mime) ||
      detectedType.mime !== req.file.mimetype
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file. Upload a genuine JPEG, PNG or WEBP photo.",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ims/attendance",
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          transformation: [
            { width: 1200, height: 1200, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, uploaded) => {
          if (error) return reject(error);

          if (!uploaded?.secure_url || !uploaded?.public_id) {
            return reject(new Error("Cloudinary upload failed."));
          }

          resolve(uploaded);
        }
      );

      Readable.from([req.file.buffer]).pipe(stream);
    });

    req.cloudinaryPhotoUrl = result.secure_url;
    req.cloudinaryPublicId = result.public_id;

    return next();
  } catch (error) {
    console.error("Attendance photo upload failed:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to process or upload attendance photo. Please try again.",
    });
  }
};

export const handleUploadError = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Photo must be smaller than 5 MB."
          : "Invalid photo upload.",
    });
  }

  if (error?.statusCode === 400) {
    return res.status(400).json({
      success: false,
      message: "Only genuine JPEG, PNG and WEBP images are allowed.",
    });
  }

  if (error) {
    console.error("Unexpected attendance upload error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Photo upload failed. Please try again.",
    });
  }

  return next();
};
