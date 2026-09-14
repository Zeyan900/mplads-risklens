import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileUp, History, Info, UploadCloud, X } from "lucide-react";

type CsvImportProps = { onClose: () => void };
type ImportRecord = { id: string; fileName: string; rows: number; valid: number; warnings: number; importedAt: string; hash: string };

const requiredColumns = ["work_id", "work_name", "district", "sanctioned_amount", "status"];
const optionalColumns = ["implementing_agency", "progress_percent", "paid_amount", "sanction_date", "expected_completion", "latitude", "longitude"];

function parseCsv(text: string) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] as Record<string, string>[] };
  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase().replace(/\s+/g, "_"));
  const rows = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim().replace(/^"|"$/g, ""));
    return headers.reduce<Record<string, string>>((record, header, index) => ({ ...record, [header]: values[index] ?? "" }), {});
  });
  return { headers, rows };
}

function fingerprint(fileName: string, size: number, rows: number) {
  const input = `${fileName}:${size}:${rows}`;
  return Array.from(input).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 7).toString(16).replace("-", "");
}

export default function CsvImport({ onClose }: CsvImportProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [history, setHistory] = useState<ImportRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"upload" | "history">("upload");

  const validation = useMemo(() => {
    const missing = requiredColumns.filter((column) => !headers.includes(column));
    const rowErrors = rows.flatMap((row, index) => {
      const issues: string[] = [];
      if (!row.work_id) issues.push(`Row ${index + 2}: missing work_id`);
      if (row.sanctioned_amount && Number.isNaN(Number(row.sanctioned_amount))) issues.push(`Row ${index + 2}: sanctioned_amount is not numeric`);
      if (row.progress_percent && (Number.isNaN(Number(row.progress_percent)) || Number(row.progress_percent) < 0 || Number(row.progress_percent) > 100)) issues.push(`Row ${index + 2}: progress_percent must be between 0 and 100`);
      return issues;
    });
    return { missing, rowErrors };
  }, [headers, rows]);

  const chooseFile = (nextFile?: File) => {
    if (!nextFile) return;
    if (!nextFile.name.toLowerCase().endsWith(".csv")) { toast.error("Please choose a CSV file"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCsv(String(reader.result ?? ""));
      setFile(nextFile); setHeaders(parsed.headers); setRows(parsed.rows);
      setErrors(parsed.headers.length ? [] : ["The file does not contain a header row."]);
      setWarnings(parsed.headers.filter((header) => !requiredColumns.includes(header) && !optionalColumns.includes(header)).map((header) => `Unrecognised column “${header}” will be ignored.`));
    };
    reader.readAsText(nextFile);
  };

  const canImport = Boolean(file && headers.length && validation.missing.length === 0 && validation.rowErrors.length === 0 && rows.length > 0);
  const allErrors = file ? [...errors, ...validation.missing.map((column) => `Required column missing: ${column}`), ...validation.rowErrors] : [];

  const importData = () => {
    if (!file || !canImport) return;
    const record: ImportRecord = { id: `IMP-${Date.now().toString().slice(-6)}`, fileName: file.name, rows: rows.length, valid: rows.length, warnings: warnings.length, importedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }), hash: fingerprint(file.name, file.size, rows.length) };
    setHistory((current) => [record, ...current]);
    toast.success("CSV snapshot imported", { description: `${rows.length} valid work records added to the demo workspace.` });
    setFile(null); setHeaders([]); setRows([]); setErrors([]); setWarnings([]); setActiveTab("history");
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#162b3a]/35 p-4 backdrop-blur-[2px]" onClick={onClose}><div className="w-full max-w-2xl overflow-hidden rounded-[4px] border border-[#ccd6dc] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between border-b border-[#e2e7ea] bg-[#f5f7f8] px-6 py-5"><div><div className="flex items-center gap-2 text-[#1d5578]"><FileUp size={18} /><span className="text-[11px] font-bold uppercase tracking-[.12em]">Data intake desk</span></div><h2 className="mt-2 text-xl font-bold tracking-[-.02em] text-[#1c3547]">Import work records</h2><p className="mt-1 text-xs text-[#6d7e88]">Upload a CSV snapshot and preserve its source trail.</p></div><button onClick={onClose} className="rounded p-1.5 text-[#6f7f89] hover:bg-white" aria-label="Close import"><X size={18} /></button></div><div className="flex border-b border-[#e2e7ea] px-6"><button onClick={() => setActiveTab("upload")} className={`border-b-2 px-3 py-3 text-xs font-bold ${activeTab === "upload" ? "border-[#e8752a] text-[#1c5578]" : "border-transparent text-[#788891]"}`}>Upload & validate</button><button onClick={() => setActiveTab("history")} className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-bold ${activeTab === "history" ? "border-[#e8752a] text-[#1c5578]" : "border-transparent text-[#788891]"}`}><History size={13} />Lineage history {history.length > 0 && `(${history.length})`}</button></div>{activeTab === "upload" ? <div className="p-6"><input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => chooseFile(event.target.files?.[0])} /><button onClick={() => inputRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded border-2 border-dashed border-[#bdcdd6] bg-[#f8fafb] px-6 py-10 text-center hover:border-[#39759a] hover:bg-[#f3f8fa]"><UploadCloud size={28} className="text-[#39759a]" /><span className="mt-3 text-sm font-bold text-[#365466]">Choose a CSV snapshot</span><span className="mt-1 text-xs text-[#8998a1]">Required: work_id, work_name, district, sanctioned_amount, status</span></button>{file && <div className="mt-5 rounded border border-[#d7e1e5] bg-white"><div className="flex items-center justify-between border-b border-[#e7ecee] px-4 py-3"><div><p className="text-xs font-bold text-[#3c5360]">{file.name}</p><p className="mt-0.5 text-[10px] text-[#8a989f]">{rows.length} data rows · {(file.size / 1024).toFixed(1)} KB</p></div><span className={`rounded px-2 py-1 text-[10px] font-bold ${canImport ? "bg-[#e9f5ee] text-[#2d754f]" : "bg-[#fff1ed] text-[#b4493d]"}`}>{canImport ? "Ready to import" : "Needs attention"}</span></div><div className="grid gap-3 p-4 sm:grid-cols-2"><ValidationBox label="Required columns" value={`${requiredColumns.length - validation.missing.length}/${requiredColumns.length} found`} good={validation.missing.length === 0} /><ValidationBox label="Row validation" value={`${rows.length - validation.rowErrors.length}/${rows.length} rows valid`} good={validation.rowErrors.length === 0 && rows.length > 0} /></div></div>}{allErrors.length > 0 && <div className="mt-4 rounded border border-[#f0cfc9] bg-[#fff8f6] p-3 text-xs text-[#a5483c]"><p className="font-bold">Validation errors</p>{allErrors.slice(0, 4).map((error) => <p key={error} className="mt-1">• {error}</p>)}</div>}{warnings.length > 0 && <div className="mt-4 rounded border border-[#ead8af] bg-[#fffbef] p-3 text-xs text-[#866616]"><p className="font-bold">Warnings</p>{warnings.map((warning) => <p key={warning} className="mt-1">• {warning}</p>)}</div>}<div className="mt-6 flex items-start gap-2 rounded bg-[#f2f7fa] p-3 text-[11px] leading-relaxed text-[#6d808b]"><Info size={15} className="mt-0.5 shrink-0 text-[#39759a]" /><span>Lineage records keep the original filename, import time, row count, validation result, and a lightweight file fingerprint. This prototype does not transmit files to a government system.</span></div><div className="mt-5 flex justify-end gap-2"><button onClick={onClose} className="rounded border border-[#d4dfe4] px-4 py-2 text-xs font-bold text-[#637680] hover:bg-[#f5f7f8]">Cancel</button><button disabled={!canImport} onClick={importData} className="rounded bg-[#1d587b] px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#174965]">Validate & import</button></div></div> : <div className="p-6">{history.length === 0 ? <div className="py-12 text-center"><History size={24} className="mx-auto text-[#9eabb2]" /><p className="mt-3 text-sm font-bold text-[#526873]">No imports in this workspace</p><p className="mt-1 text-xs text-[#89979f]">Imported snapshots will appear here with their validation trail.</p></div> : <div className="space-y-3">{history.map((item) => <div key={item.id} className="rounded border border-[#dfe7ea] bg-[#fbfcfc] p-4"><div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#3b8a62]" /><p className="text-xs font-bold text-[#3d5662]">{item.fileName}</p></div><p className="mt-1 text-[10px] text-[#8c9aa1]">{item.id} · {item.importedAt}</p></div><span className="rounded bg-[#e9f5ee] px-2 py-1 text-[10px] font-bold text-[#2d754f]">Validated</span></div><div className="mt-3 grid grid-cols-3 gap-3 border-t border-[#e8edef] pt-3 text-[10px] text-[#84939b]"><span><b className="block text-xs text-[#516873]">{item.rows}</b>rows</span><span><b className="block text-xs text-[#516873]">{item.warnings}</b>warnings</span><span><b className="block font-mono text-xs text-[#516873]">{item.hash}</b>fingerprint</span></div></div>)}</div>}</div>}</div></div>;
}

function ValidationBox({ label, value, good }: { label: string; value: string; good: boolean }) { return <div className="flex items-center gap-2 rounded bg-[#f7f9fa] p-3"><CheckCircle2 size={16} className={good ? "text-[#3d8a61]" : "text-[#c85c50]"} /><div><p className="text-[10px] font-bold uppercase tracking-[.08em] text-[#8a989f]">{label}</p><p className="mt-0.5 text-xs font-bold text-[#506873]">{value}</p></div></div>; }
