"use client";

import { ProductWithReviews, UserWithOrders } from "@/_types";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addReview } from "../_actions/reviews";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FailureMessage, FormError } from "@/components/Message";
import { Heading } from "@/components/ui/Heading";
import { Rating } from "@mui/material";

type RatingFormProps = {
  product: ProductWithReviews;
  user: UserWithOrders | null;
};

export function RatingForm({ product, user }: RatingFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [data, formAction] = useFormState(addReview.bind(null, product.id), {});
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState<number | null>(0);

  useEffect(() => {
    setErrors(data.fieldErrors!);
  }, [data.fieldErrors]);

  if (!user) return null;

  // Check if product has been delivered to the user
  const deliveredOrder = user.orders.find(
    (order) =>
      order.deliveryStatus === "delivered" &&
      order.products.some((p) => p.id === product.id),
  );

  // Check if user has already reviewed this product
  const existingReview = product.reviews.find(
    (review) => review.userId === user.id,
  );

  if (!deliveredOrder || existingReview) return null;

  return (
    <form
      ref={formRef}
      action={(formData) => {
        formAction(formData);
        formRef.current?.reset();
        setRating(0);
      }}
      className="flex max-w-lg flex-col gap-4"
    >
      <Heading title="Rate this product" />

      {data.error && <FailureMessage message={data.error} />}

      <Rating
        name="rating"
        size="large"
        value={rating}
        onChange={(e, newValue) => {
          setRating(newValue);
        }}
      />
      {errors?.rating && errors?.rating.length > 0 && (
        <FormError message={"Please add a rating for this product."} />
      )}

      <Textarea
        id="comment"
        label="Comment"
        errors={errors}
        setErrors={setErrors}
      />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </Button>
  );
}
