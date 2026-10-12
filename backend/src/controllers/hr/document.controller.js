import {
  getDocumentsForHR,
  reviewDocument,
} from "../../services/upload.service.js";
import { Document } from "../../models/index.js";

// HR views submitted documents, optionally filtered by status
export const getDocuments = async (req, res) => {
  try {
    const documents = await getDocumentsForHR(req.query.status);

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// HR dashboard document statistics
export const getDocumentStats = async (req, res) => {
  try {
    const [pending, verified, rejected, total] = await Promise.all([
      Document.count({ where: { status: "PENDING" } }),
      Document.count({ where: { status: "VERIFIED" } }),
      Document.count({ where: { status: "REJECTED" } }),
      Document.count(),
    ]);

    return res.status(200).json({
      success: true,
      data: { pending, verified, rejected, total },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// HR approves or rejects a document
export const reviewStudentDocument = async (req, res) => {
  try {
    const { status, reviewReason } = req.body;

    const document = await reviewDocument(
      req.params.id,
      req.user.id,
      status,
      reviewReason
    );

    return res.status(200).json({
      success: true,
      message: `Document ${status.toLowerCase()} successfully`,
      data: document,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
