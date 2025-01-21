"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X } from "lucide-react";
import type { ChangeEvent } from "react";

interface FileUploaderProps {
  onUploadComplete?: (path: string) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
}

export default function FileUploader({
  onUploadComplete,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB default
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + files.length > maxFiles) {
        setError(`Maximum ${maxFiles} file${maxFiles === 1 ? "" : "s"} allowed`);
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setError(null);
    },
    [files.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
  });

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setUploading(true);
    setProgress(0);
    setError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        setProgress(((i + 1) / files.length) * 100);

        if (onUploadComplete) {
          onUploadComplete(data.path);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        setUploading(false);
        return;
      }
    }

    setUploading(false);
    setFiles([]);
    setProgress(0);
  };

  return (
    <div className="space-y-4" data-testid="file-uploader">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        }`}
        data-testid="dropzone"
      >
        <input {...getInputProps()} data-testid="file-input" />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop files here, or click to select files"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Max file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
              data-testid={`file-item-${index}`}
            >
              <span className="text-sm truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                disabled={uploading}
                data-testid={`remove-file-${index}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              onClick={uploadFiles}
              disabled={uploading}
              data-testid="upload-button"
              variant="default"
              size="default"
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      )}

      {uploading && (
        <Progress value={progress} className="w-full" data-testid="upload-progress" />
      )}

      {error && (
        <Alert variant="destructive" data-testid="error-message">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
} 