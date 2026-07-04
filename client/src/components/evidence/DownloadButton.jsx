function DownloadButton({ filePath, fileName }) {
  const url = `http://localhost:5000/${filePath?.replace(/\\/g, "/")}`;

  return (
    <a
      href={url}
      download={fileName}
      target="_blank"
      className="rounded-xl px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/30 text-sm"
    >
      Download
    </a>
  );
}

export default DownloadButton;