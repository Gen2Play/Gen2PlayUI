import React, { useState, useRef } from "react";

interface FileItem {
  file: File;
  preview: string | null;
  name: string;
  size: string;
  createdAt: string;
  description: string;
  tags: string[];
}

export function UploadPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles: FileItem[] = Array.from(event.target.files).map(
      (file) => ({
        file,
        preview:
          file.type.startsWith("image") || file.type.startsWith("audio")
            ? URL.createObjectURL(file)
            : null,
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        createdAt: new Date().toLocaleString(),
        description: "",
        tags: [],
      })
    );

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...selectedFiles];
      if (newFiles.length > 0 && !selectedPreview) {
        setSelectedPreview(newFiles[0].preview);
      }
      return newFiles;
    });
  };

  const handleInputChange = (
    index: number,
    field: keyof FileItem,
    value: string
  ) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index
          ? {
              ...file,
              [field]:
                field === "tags"
                  ? value.split(",").map((tag) => tag.trim())
                  : value,
            }
          : file
      )
    );
  };
  const removeTag = (index: number, tagToRemove: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index
          ? { ...file, tags: file.tags.filter((tag) => tag !== tagToRemove) }
          : file
      )
    );
  };

  const handleUpLoad = () => {
    alert("Update functionality triggered!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 w-full mt-12">
      {files.length === 0 ? (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Upload Files</h2>
          <div className="flex justify-center items-center h-64">
            <input
              type="file"
              multiple
              accept="image/*, video/*, audio/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="border rounded p-2"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Upload Files</h2>

          {selectedPreview && (
            <div className="mb-4 border rounded-lg p-4 bg-gray-50">
              <img
                src={selectedPreview}
                alt="Selected Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 w-full">
            {files.map((file, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex gap-4 bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPreview(file.preview)}
              >
                <div className="w-1/3">
                  {file.preview && file.file.type.startsWith("image") && (
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  {file.preview && file.file.type.startsWith("audio") && (
                    <audio controls className="w-full">
                      <source src={file.preview} type={file.file.type} />
                    </audio>
                  )}
                </div>
                <div className="w-2/3 flex flex-col gap-2">
                  <input
                    type="text"
                    value={file.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="border rounded p-2 w-full"
                  />
                  <p className="text-gray-500 text-sm">
                    UpLoad At: {file.createdAt}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={file.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="border rounded p-2 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(file.tags) &&
                      file.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(index, tag)}
                            className="ml-1 text-xs text-red-400"
                          >
                            ✖
                          </button>
                        </span>
                      ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Enter tags (comma separated)"
                    value={Array.isArray(file.tags) ? file.tags.join(", ") : ""}
                    onChange={(e) =>
                      handleInputChange(index, "tags", e.target.value)
                    }
                    className="border rounded p-2 w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpLoad}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>

          {/* Nút chọn file thay đổi vị trí */}
        </div>
      )}
    </div>
  );
}
