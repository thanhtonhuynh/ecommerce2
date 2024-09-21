import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(4, { message: "Minimum 4 characters required" }),
});

const ImageSchema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
  colorCode: z.string().min(1, { message: "Color code is required" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image"), {
      message: "Invalid file type",
    }),
});

export const AddProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce
    .number()
    .int({ message: "Please enter an integer." })
    .positive({
      message:
        "Please enter a price for this product. Price has to be positive number.",
    }),
  brand: z.string().min(1, { message: "Brand is required" }),
  category: z
    .string({ message: "Category is required" })
    .min(1, { message: "Category is required" }),
  inStock: z
    .boolean({
      invalid_type_error: "inStock must be a boolean",
    })
    .optional(),
  images: ImageSchema.array().min(1, {
    message: "Upload at least one image for this product",
  }),
});

export const AddReviewSchema = z.object({
  rating: z.coerce
    .number({ message: "Required." })
    .int({ message: "Please enter an integer." })
    .min(1, { message: "Rating must be between 1 and 5" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  comment: z.string().min(1, { message: "Required." }),
});
