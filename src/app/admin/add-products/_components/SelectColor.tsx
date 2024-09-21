"use client";

import { useEffect, useState } from "react";
import { SelectImage } from "./SelectImage";
import { Button } from "@/components/ui/Button";
import { ImageType } from "@/_types";

type SelectColorProps = {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
};

export function SelectColor({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}: SelectColorProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  function handleFileChange(value: File) {
    setFile(value);
    addImageToState({ ...item, image: value });
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }

  return (
    <div className="grid grid-cols-1 items-center overflow-y-auto border-b-[1.2px] border-slate-200 p-2">
      <div className="flex h-[60px] flex-row items-center gap-2">
        <input
          type="checkbox"
          id={item.color}
          name={item.color}
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="cursor-pointer font-medium">
          {item.color}
        </label>
      </div>

      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}

        {file && (
          <div className="col-span-2 flex flex-row items-center justify-between gap-2 text-sm">
            <p>{file.name}</p>
            <div className="w-[70px]">
              <Button
                small
                outline
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
