import React from "react";

function FilePreviewModal({ evidence, close }) {
  if (!evidence) return null;

 const BACKEND_URL =
  import.meta.env.VITE_API_URL ||
  "https://digital-evidence-chain-api.onrender.com";

const normalizedPath = evidence.filePath?.startsWith("/")
  ? evidence.filePath
  : `/${evidence.filePath}`;

const url =
  evidence.filePath?.startsWith("http://") ||
  evidence.filePath?.startsWith("https://")
    ? evidence.filePath
    : `${BACKEND_URL}${normalizedPath}`;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl rounded-3xl bg-slate-950 border border-white/10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">{evidence.originalName}</h2>

          <button
            onClick={close}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Close
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-2xl bg-black/40 border border-white/10 p-4 mb-5 max-h-[500px] overflow-auto">

          {evidence.fileType?.startsWith("image") && (
            <img
              src={url}
              alt={evidence.originalName}
              className="max-h-[450px] mx-auto rounded-xl"
            />
          )}

          {evidence.fileType?.includes("pdf") && (
            <iframe
              src={url}
              title="PDF Preview"
              className="w-full h-[450px] rounded-xl"
            />
          )}

          {evidence.fileType?.startsWith("video") && (
            <video
              src={url}
              controls
              className="w-full rounded-xl"
            />
          )}

          {!evidence.fileType?.startsWith("image") &&
            !evidence.fileType?.includes("pdf") &&
            !evidence.fileType?.startsWith("video") && (
              <div className="text-center py-10">
                <p className="text-slate-400 mb-5">
                  Preview not available.
                </p>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  Download File
                </a>
              </div>
            )}
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p>
            <b>Status:</b> {evidence.status}
          </p>

          <p>
            <b>Case:</b> {evidence.caseId?.caseTitle || "N/A"}
          </p>

          <p className="break-all">
            <b>SHA-256:</b> {evidence.hash}
          </p>

          <p>
            <b>Uploaded:</b>{" "}
            {new Date(evidence.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FilePreviewModal;