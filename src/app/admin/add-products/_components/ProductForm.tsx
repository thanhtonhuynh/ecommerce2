"use client";

import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { addProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { categories } from "@/_utils/Categories";
import { CategoryInput } from "@/app/admin/add-products/_components/CategoryInput";
import { colors } from "@/_utils/Colors";
import { SelectColor } from "./SelectColor";
import toast from "react-hot-toast";
import { FailureMessage, FormError } from "@/components/Message";
import { ImageType } from "@/_types";

export function ProductForm() {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [images, setImages] = useState<ImageType[]>([]);
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false);
  const [data, formAction] = useFormState(addProduct, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setErrors(data.fieldErrors!);
  }, [data.fieldErrors]);

  useEffect(() => {
    if (data.success) {
      toast.success("Product added successfully");
      setIsProductCreated(true);
      setImages([]);
      setSelectedCategory("");
      formRef.current?.reset();
    }
  }, [data]);

  function addImageToState(value: ImageType) {
    setImages((prev) => {
      if (!prev) return [value];
      return [...prev, value];
    });
    setErrors({ ...errors, images: [] });
  }

  function removeImageFromState(value: ImageType) {
    setImages((prev) => {
      if (!prev) return [];
      return prev.filter((item) => item.color !== value.color);
    });
  }

  return (
    <>
      <Heading title="Add a Product" center />
      <form
        ref={formRef}
        action={(formData) => {
          setIsProductCreated(false);

          formData.append("images", JSON.stringify(images));

          images.forEach((image) => {
            formData.append(`productImage_${image.color}`, image.image as File);
          });

          formAction(formData);
        }}
        className="flex w-full flex-col gap-4"
      >
        {data.error && <p className="text-red-500">{data.error}</p>}

        <Input id="name" label="Name" errors={errors} setErrors={setErrors} />

        <Input
          id="price"
          label="Price"
          type="number"
          errors={errors}
          setErrors={setErrors}
        />

        <Input id="brand" label="Brand" errors={errors} setErrors={setErrors} />

        <Textarea
          id="description"
          label="Description"
          errors={errors}
          setErrors={setErrors}
        />

        <Checkbox
          id="inStock"
          label="This product is in stock"
          errors={errors}
          setErrors={setErrors}
        />

        <div className="w-full font-medium">
          <div className="mb-2 font-bold">Select a Category</div>
          <div className="grid max-h-[50vh] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
            {categories.map((item) => {
              if (item.label === "All") return null;

              return (
                <CategoryInput
                  key={item.label}
                  id={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={selectedCategory === item.label}
                  onSelect={() => setSelectedCategory(item.label)}
                  errors={errors}
                  setErrors={setErrors}
                />
              );
            })}
          </div>

          {errors?.category && errors?.category.length > 0 && (
            <FormError message={errors?.category} />
          )}
        </div>

        <div className="flex w-full flex-col flex-wrap gap-4">
          <div>
            <div className="font-bold">
              Select the available product colors and upload their images.
            </div>
            <div className="text-sm">
              You must upload an image for each of the color selected, otherwise
              your color selection will be ignored.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colors.map((item) => (
              <SelectColor
                key={item.color}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            ))}
          </div>

          {errors?.images && errors?.images.length > 0 && (
            <FormError message={errors?.images} />
          )}
        </div>

        <SubmitButton />
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
