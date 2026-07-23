import { Download } from "lucide-react";

function DownloadButton({ filePath, fileName }) {
  const BACKEND_URL =
    import.meta.env.VITE_API_URL ||
    "https://digital-evidence-chain-api.onrender.com";

  const getFileUrl = () => {
    if (!filePath) return "";

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    const normalizedPath = filePath.startsWith("/")
      ? filePath
      : `/${filePath}`;

    return `${BACKEND_URL}${normalizedPath}`;
  };

  const handleDownload = async () => {
    const fileUrl = getFileUrl();

    if (!fileUrl) {
      alert("File path is unavailable");
      return;
    }

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("File could not be downloaded");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "evidence-file";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("Unable to download this evidence file");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-xl px-3 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-sm flex items-center gap-2"
    >
      <Download size={16} />
      Download
    </button>
  );
}

export default DownloadButton;