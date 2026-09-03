import PDFDocument from "pdfkit";

// Generates a certificate PDF and streams it to the response
const generateCertificatePDF = (res, data) => {
  const {
    studentName,
    course,
    collegeName,
    mentorName,
    startDate,
    endDate,
    certificateNumber,
    issueDate,
  } = data;

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${certificateNumber}.pdf`
  );

  doc.pipe(res);

  // Border
  doc
    .lineWidth(3)
    .strokeColor("#1a4d8f")
    .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
    .stroke();

  // Title
  doc
    .fontSize(30)
    .fillColor("#1a4d8f")
    .font("Helvetica-Bold")
    .text("Certificate of Internship Completion", 0, 100, {
      align: "center",
    });

  // Subtitle
  doc
    .fontSize(14)
    .fillColor("#333")
    .font("Helvetica")
    .text("This is proudly presented to", 0, 160, { align: "center" });

  // Student name
  doc
    .fontSize(26)
    .fillColor("#000")
    .font("Helvetica-Bold")
    .text(studentName, 0, 195, { align: "center" });

  // Body text
  doc
    .fontSize(13)
    .fillColor("#333")
    .font("Helvetica")
    .text(
      `for successfully completing the internship program in ${course} at ${collegeName}, `,
      100,
      250,
      { align: "center", width: doc.page.width - 200 }
    );

  doc.text(
    `from ${startDate} to ${endDate}.`,
    100,
    270,
    { align: "center", width: doc.page.width - 200 }
  );

  // Certificate number + issue date
  doc
    .fontSize(11)
    .fillColor("#555")
    .text(`Certificate No: ${certificateNumber}`, 60, doc.page.height - 120);

  doc.text(`Issue Date: ${issueDate}`, 60, doc.page.height - 100);

  // Mentor signature line
  doc
    .moveTo(doc.page.width - 250, doc.page.height - 100)
    .lineTo(doc.page.width - 60, doc.page.height - 100)
    .stroke();

  doc
    .fontSize(11)
    .text(mentorName, doc.page.width - 250, doc.page.height - 90, {
      width: 190,
      align: "center",
    });

  doc
    .fontSize(9)
    .fillColor("#777")
    .text("Mentor", doc.page.width - 250, doc.page.height - 75, {
      width: 190,
      align: "center",
    });

  doc.end();
};

export default { generateCertificatePDF };