import { useState } from "react";
import { Search, Filter } from "lucide-react";
import API from "../services/api";
import FileIcon from "./evidence/FileIcon";
import FilePreviewModal from "./evidence/FilePreviewModal";
import DownloadButton from "./evidence/DownloadButton";
import toast from "react-hot-toast";
import Pagination from "./common/Pagination";
import EmptyState from "./common/EmptyState";

function EvidenceTable({ evidence = [], refresh, canVerify = true }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifyFiles, setVerifyFiles] = useState({});
  const [preview, setPreview] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 5;

  const filteredEvidence = evidence.filter((ev) => {
    const fileMatch = ev.originalName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const caseMatch = ev.caseId?.caseTitle
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "all" || ev.status === statusFilter;

    return (fileMatch || caseMatch) && statusMatch;
  });

  const paginatedEvidence = filteredEvidence.slice(
    (page - 1) * limit,
    page * limit
  );

  const verifyEvidence = async (id) => {
    const verifyFile = verifyFiles[id];

    if (!verifyFile) {
      toast.error("Please select a file to verify");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", verifyFile);

      const res = await API.post(`/evidence/verify/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(res.data.message);

      setVerifyFiles((prev) => ({
        ...prev,
        [id]: null
      }));

      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6 mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
          <Search /> Search & Filter Evidence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by file name or case title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400 w-full"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-purple-400 w-full"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="tampered">Tampered</option>
          </select>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6 mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
          <Filter /> Evidence List
        </h3>

        <div className="space-y-4">
          {paginatedEvidence.map((ev) => (
            <div
              key={ev._id}
              className="rounded-2xl bg-slate-950/70 border border-white/10 p-4 md:p-5 grid grid-cols-1 xl:grid-cols-5 gap-4 items-start xl:items-center"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center">
                  <FileIcon type={ev.fileType} />
                </div>

                <div className="min-w-0">
                  <p className="font-bold truncate">
                    {ev.originalName}
                  </p>

                  <p className="text-sm text-slate-400 truncate">
                    {ev.fileType}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-300 break-words">
                <span className="text-slate-500">Case:</span>{" "}
                {ev.caseId?.caseTitle || "N/A"}
              </div>

              <div className="text-xs break-all text-slate-400">
                <span className="text-slate-500">Hash:</span>{" "}
                {ev.hash?.slice(0, 32)}...
              </div>

              <span
                className={`w-fit xl:w-full text-center rounded-full px-3 py-2 text-sm font-bold capitalize ${
                  ev.status === "verified"
                    ? "bg-green-500/20 text-green-300"
                    : ev.status === "tampered"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {ev.status}
              </span>

              <div className="space-y-3 w-full">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPreview(ev)}
                    className="rounded-xl px-3 py-2 bg-purple-500/20 text-purple-300 border border-purple-400/30 text-sm"
                  >
                    Preview
                  </button>

                  <DownloadButton
                    filePath={ev.filePath}
                    fileName={ev.originalName}
                  />
                </div>

                {canVerify ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) =>
                        setVerifyFiles((prev) => ({
                          ...prev,
                          [ev._id]: e.target.files[0]
                        }))
                      }
                      className="text-sm w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2"
                    />

                    <button
                      onClick={() => verifyEvidence(ev._id)}
                      className="w-full rounded-xl py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
                    >
                      Verify
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">View only</p>
                )}
              </div>
            </div>
          ))}

          {filteredEvidence.length === 0 && (
            <EmptyState message="No evidence found." />
          )}
        </div>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        total={filteredEvidence.length}
        limit={limit}
      />

      <FilePreviewModal
        evidence={preview}
        close={() => setPreview(null)}
      />
    </>
  );
}

export default EvidenceTable;