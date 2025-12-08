import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Search, Download, Trash, MessagesSquare, UploadCloud, Slash } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";

// download file
import JSZip from "jszip";
import { saveAs } from "file-saver";

type UploadedFile = {
  id: string;
  file: File;
  uploadedAt: Date;
}

function FilesPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [searchText, setSearchText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  // Handle file upload
  const handleUpload = (newFiles: FileList | null) => {
    if (!newFiles) return;

    // check whether the redundant files name exists & pop up alert dialog if redundant
    const existingFileNames = new Set(files.map(f => f.file.name));
    for (let i = 0; i < newFiles.length; i++) {
      if (existingFileNames.has(newFiles[i].name)) {
        alert(`File "${newFiles[i].name}" already exists. Please rename the file before uploading.`);
        return;
      }
    }

    const toAdd = Array.from(newFiles).map((file) => ({
      id: crypto.randomUUID(),
      file,
      uploadedAt: new Date(),
    }));

    setFiles((prev) => [...prev, ...toAdd]);
  };

  // Drag & Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  };

  // File filtering
  const filteredFiles = files.filter((f) =>
    f.file.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // select all checkbox handler
  const toggleSelectAll = (checked: boolean) => {
    const newSelection: Record<string, boolean> = {};

    filteredFiles.forEach((f) => {
      newSelection[f.id] = checked;
    });

    setSelected((prev) => ({ ...prev, ...newSelection }));
  };

  // individual checkbox
  const toggleSelect = (id: string, checked: boolean) => {
    setSelected((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // delete selected files
  const deleteSelected = () => {
    const idsToDelete = Object.keys(selected).filter((id) => selected[id]);

    if (idsToDelete.length === 0) return;

    const remaining = files.filter((f) => !idsToDelete.includes(f.id));

    setFiles(remaining);              // remove from state
    setSelected({});                 // clear selection
  };

  // download selected files as zip
  const downloadSelected = async () => {
    const zip = new JSZip();
    const idsToDownload = Object.keys(selected).filter((id) => selected[id]);

    if (idsToDownload.length === 0) return;

    for (const id of idsToDownload) {
      const fileObj = files.find((f) => f.id === id);
      if (fileObj) {
        zip.file(fileObj.file.name, fileObj.file);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "files.zip");
  };

  const handleChatWithFiles = () => {
    const selectedIds = Object.keys(selected).filter(id => selected[id]);
    const selectedFiles = files.filter(f => selectedIds.includes(f.id));

    // Navigate with file data stored in router state
    navigate("/", {
      state: {
        mode: "chat-with-files",
        files: selectedFiles.map(f => f.file),
      },
    });
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-text-title-light">My Files</h2>
        <p className="text-text-desc-light mt-2">
          All files that have been uploaded to Cognitus
        </p>
      </div>

      {/* ========== UPLOAD AREA ========== */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 mx-auto text-gray-500" />
        <p className="font-semibold text-lg">Drag & Drop your files here</p>
        <p>or click to upload</p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* ========== FILE LIST SECTION ========== */}
      <div className="flex justify-between items-center mt-10 mb-4">
        {/* ----- Header: Search + buttons ----- */}
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-light" />
          <Input
            type="text"
            placeholder="Search files..."
            className="w-full pl-10 py-2 border border-gray-300 rounded-lg text-text-desc-light focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" className="flex gap-2" onClick={downloadSelected} disabled={Object.values(selected).every(v => !v)}>
            <Download className="w-4 h-4" /> Download
          </Button>

          <Button variant="outline" className="flex gap-2" onClick={deleteSelected} disabled={Object.values(selected).every(v => !v)}>
            <Trash className="w-4 h-4" /> Delete
          </Button>

          <Button variant="outline" className="flex gap-2" onClick={handleChatWithFiles} disabled={Object.values(selected).every(v => !v)}>
            <MessagesSquare className="w-4 h-4" /> Chat with Files
          </Button>
        </div>
      </div>

      {/* ----- File List (Table) ----- */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-text-muted-light">
                {filteredFiles.length > 0 &&
                  <Checkbox data-id="select-all"
                    onCheckedChange={(v) => toggleSelectAll(!!v)}
                  />
                }
              </th>
              <th className="px-6 py-3 text-sm font-medium text-text-muted-light">
                Name
              </th>
              <th className="px-6 py-3 text-sm font-medium text-text-muted-light">
                Size
              </th>
              <th className="px-6 py-3 text-sm font-medium text-text-muted-light">
                Upload Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredFiles.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-16 text-center text-text-desc-light"
                >
                  <Slash className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p>
                    Hey, it looks like you haven’t uploaded any files yet.
                    Upload some files to start chatting with them!
                  </p>
                </td>
              </tr>
            ) : (
              filteredFiles.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="px-6 py-3">
                    <Checkbox data-id={f.id}
                      checked={!!selected[f.id]}
                      onCheckedChange={(v) => toggleSelect(f.id, !!v)}
                    />
                  </td>
                  <td className="px-6 py-3">{f.file.name}</td>
                  <td className="px-6 py-3">
                    {(f.file.size / 1024).toFixed(1)} KB
                  </td>
                  <td className="px-6 py-3">
                    {f.uploadedAt.toLocaleDateString()}{" "}
                    {f.uploadedAt.toLocaleTimeString()}
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilesPage;