function FilePreviewModal({ evidence, close }) {
  if (!evidence) return null;

  const url = `http://localhost:5000/${evidence.filePath?.replace(/\\/g, "/")}`;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl rounded-3xl bg-slate-950 border border-white/10 p-6">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">{evidence.originalName}</h2>
          <button onClick={close} className="text-red-300 font-bold">Close</button>
        </div>

        <div className="rounded-2xl bg-black/40 border border-white/10 p-4 mb-5 max-h-[500px] overflow-auto">
          {evidence.fileType?.startsWith("image") && (
            <img src={url} className="max-h-[450px] mx-auto rounded-xl" />
          )}

          {evidence.fileType?.includes("pdf") && (
            <iframe src={url} className="w-full h-[450px] rounded-xl"></iframe>
          )}

          {evidence.fileType?.startsWith("video") && (
            <video src={url} controls className="w-full rounded-xl"></video>
          )}

          {!evidence.fileType?.startsWith("image") &&
            !evidence.fileType?.includes("pdf") &&
            !evidence.fileType?.startsWith("video") && (
              <p className="text-slate-400 text-center py-10">
                Preview not available. Use download option.
              </p>
            )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><b>Status:</b> {evidence.status}</p>
          <p><b>Case:</b> {evidence.caseId?.caseTitle || "N/A"}</p>
          <p className="break-all"><b>SHA-256:</b> {evidence.hash}</p>
          <p><b>Uploaded:</b> {new Date(evidence.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default FilePreviewModal;