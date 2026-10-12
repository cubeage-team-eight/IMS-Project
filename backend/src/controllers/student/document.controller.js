
import {
  uploadStudentDocument,
  getStudentDocuments,
} from "../../services/upload.service.js";

// Student uploads a document
export const uploadDocument = async (req, res) => {
  try {
    const document = await uploadStudentDocument(
      req.user.id,
      req.file,
      req.body.documentType
    );

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully. Waiting for HR verification.",
      data: document,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Student views their documents and verification statuses
export const getMyDocuments = async (req, res) => {
  try {
    const documents = await getStudentDocuments(req.user.id);

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
