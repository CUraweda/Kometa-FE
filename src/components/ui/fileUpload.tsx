import React, { useState } from "react";

const FileUploader: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateImageFile(droppedFile)) {
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateImageFile(selectedFile)) {
      handleFile(selectedFile);
    }
  };

  const validateImageFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG files are allowed!");
      return false;
    }
    return true;
  };

  const handleFile = (uploadedFile: File) => {
    setFile(uploadedFile); // Simpan file
    const preview = URL.createObjectURL(uploadedFile); // Buat URL untuk preview
    setPreviewUrl(preview); // Simpan URL preview
  };

  const handleDeleteFile = () => {
    setFile(null); // Reset file
    setPreviewUrl(null); // Reset preview
  };

  return (
    <div
      className={`border-dashed border-2 rounded-md flex flex-col items-center justify-center h-40 ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="flex items-center gap-5 justify-between w-full p-5">
          <img
            src={previewUrl}
            alt="Preview"
            className=" w-52 object-cover mb-2 rounded"
          />
          
          <button
            onClick={handleDeleteFile}
            className="mt-2 px-4 py-1 bg-red-500 text-white text-sm font-medium rounded cursor-pointer hover:bg-red-600"
          >
            Delete File
          </button>
        </div>
      ) : (
        <>
          <span className="text-gray-400 text-center">
            Drag & Drop file here, or click to upload
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="mt-2 hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="mt-2 px-4 py-1 bg-primary text-white text-sm font-medium rounded cursor-pointer hover:bg-emerald-500"
          >
            Browse File
          </label>
          <span className="text-gray-400 text-center text-sm">jpeg, jpg, png, max 2mb</span>
        </>
      )}
    </div>
  );
};

export default FileUploader;
