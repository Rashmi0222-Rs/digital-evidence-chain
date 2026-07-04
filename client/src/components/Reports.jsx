import { FileText, Printer, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function Reports({ cases, evidence, logs }) {

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Digital Evidence Chain Report", 14, 18);

    autoTable(doc, {
      startY: 30,
      head: [["Metric", "Count"]],
      body: [
        ["Total Cases", cases.length],
        ["Total Evidence", evidence.length],
        ["Activity Logs", logs.length],
        ["Verified", evidence.filter(e => e.status === "verified").length],
        ["Pending", evidence.filter(e => e.status === "pending").length],
        ["Tampered", evidence.filter(e => e.status === "tampered").length]
      ]
    });

    doc.save("DigitalEvidenceReport.pdf");
  };

  const exportExcel = () => {
    const data = evidence.map(e => ({
      File: e.originalName,
      Case: e.caseId?.caseTitle || "",
      Status: e.status,
      UploadedBy: e.uploadedBy?.name || "",
      Date: new Date(e.createdAt).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Evidence");

    XLSX.writeFile(wb, "EvidenceReport.xlsx");
  };

  const printReport = () => window.print();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText />
        Reports
      </h2>

      <div className="grid md:grid-cols-4 gap-5">

        <button
          onClick={exportPDF}
          className="rounded-2xl bg-red-500/20 border border-red-400/30 p-6 hover:bg-red-500/30 transition"
        >
          <Download className="mx-auto mb-3 text-red-300" size={36}/>
          <p className="font-bold">Export PDF</p>
        </button>

        <button
          onClick={exportExcel}
          className="rounded-2xl bg-green-500/20 border border-green-400/30 p-6 hover:bg-green-500/30 transition"
        >
          <Download className="mx-auto mb-3 text-green-300" size={36}/>
          <p className="font-bold">Export Excel</p>
        </button>

        <button
          onClick={printReport}
          className="rounded-2xl bg-purple-500/20 border border-purple-400/30 p-6 hover:bg-purple-500/30 transition"
        >
          <Printer className="mx-auto mb-3 text-purple-300" size={36}/>
          <p className="font-bold">Print Report</p>
        </button>

        <div className="rounded-2xl bg-cyan-500/20 border border-cyan-400/30 p-6">
          <h3 className="text-xl font-bold mb-4">
            Summary
          </h3>

          <p>Total Cases : {cases.length}</p>
          <p>Total Evidence : {evidence.length}</p>
          <p>Total Logs : {logs.length}</p>
        </div>

      </div>
    </div>
  );
}

export default Reports;