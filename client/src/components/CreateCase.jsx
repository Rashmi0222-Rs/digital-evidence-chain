import { useState } from "react";
import { FolderKanban } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

function CreateCase({ refresh }) {
  const [caseTitle, setCaseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("insurance");
  const [loading, setLoading] = useState(false);

  const createCase = async (e) => {
    e.preventDefault();

    if (!caseTitle || !description) {
      toast.error("Enter case title and description");
      return;
    }

    try {
      setLoading(true);

      await API.post("/cases", {
        caseTitle,
        description,
        category
      });

      toast.success("Case created successfully");

      setCaseTitle("");
      setDescription("");
      setCategory("insurance");

      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to create case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={createCase}
      className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6 mb-8 shadow-2xl"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
        <FolderKanban /> Create New Case
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Case title"
          value={caseTitle}
          onChange={(e) => setCaseTitle(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
        />

        <input
          type="text"
          placeholder="Case description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-purple-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none"
        >
          <option value="legal">Legal</option>
          <option value="insurance">Insurance</option>
          <option value="cybercrime">Cybercrime</option>
          <option value="academic">Academic</option>
          <option value="complaint">Complaint</option>
          <option value="other">Other</option>
        </select>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 py-3 font-bold disabled:opacity-60 hover:scale-[1.02] transition"
        >
          {loading ? "Creating..." : "Create Case"}
        </button>
      </div>
    </form>
  );
}

export default CreateCase;