import { FileText, Image, Video, File } from "lucide-react";

function FileIcon({ type }) {
  if (type?.startsWith("image")) return <Image className="text-cyan-300" />;
  if (type?.startsWith("video")) return <Video className="text-purple-300" />;
  if (type?.includes("pdf")) return <FileText className="text-red-300" />;
  return <File className="text-slate-300" />;
}

export default FileIcon;