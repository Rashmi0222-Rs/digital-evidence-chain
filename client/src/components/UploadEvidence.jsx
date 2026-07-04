import { useState } from "react";
import { Upload } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

function UploadEvidence({ cases, refresh }) {
  const [caseId, setCaseId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadEvidence = async (e) => {
    e.preventDefault();

    if (!caseId || !file) {
      toast.error("Please select a case and a file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caseId", caseId);
      formData.append("file", file);

      await API.post("/evidence/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Evidence uploaded successfully");

      setCaseId("");
      setFile(null);

      // Clear file input
      document.getElementById("evidenceFile").value = "";

      refresh();

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={uploadEvidence}
      className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8 shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
        <Upload /> Upload Evidence
      </h3>

      <div className="grid md:grid-cols-3 gap-4">

        <select
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3"
        >
          <option value="">Select Case</option>

          {cases.map((c) => (
            <option key={c._id} value={c._id}>
              {c.caseTitle}
            </option>
          ))}
        </select>

        <input
          id="evidenceFile"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Evidence"}
        </button>

      </div>
    </form>
  );
}

export default UploadEvidence;