
export const downloadFile = (
  response,
  fileName = "certificate.pdf"
) => {
  const blob = new Blob([response.data], {
    type:
      response.headers?.["content-type"] ||
      "application/pdf",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};

