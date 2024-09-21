"use client";

import { ImageType } from "@/_types";
import { useDropzone } from "react-dropzone";

type SelectImageProps = {
  item?: ImageType;
  handleFileChange: (value: File) => void;
};

export function SelectImage({ item, handleFileChange }: SelectImageProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  function onDrop(acceptedFiles: File[]) {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer items-center justify-center border-2 border-dashed border-slate-400 p-2 text-sm font-normal text-slate-400"
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>+ {item?.color} Image</p>
      )}
    </div>
  );
}
