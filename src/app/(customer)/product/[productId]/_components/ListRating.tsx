import { Avatar } from "@/components/Avatar";
import { Heading } from "@/components/ui/Heading";
import { ProductWithReviews } from "@/_types";
import { Rating } from "@mui/material";
import moment from "moment";

type ListRatingProps = {
  product: ProductWithReviews;
};

export function ListRating({ product }: ListRatingProps) {
  if (product.reviews.length === 0) return null;

  return (
    <div className="border-t-2 border-t-slate-300 pt-4">
      <Heading title="Product Reviews" />

      <div className="mt-2 text-sm">
        {product.reviews &&
          product.reviews.map((review) => (
            <div key={review.id} className="max-w-[300px]">
              <div className="flex items-center gap-2">
                <Avatar src={review.user.image} />

                <div className="font-semibold">{review.user.name}</div>

                <div className="font-light">
                  {moment(review.createdAt).fromNow()}
                </div>
              </div>

              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="mb-4 mt-4" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
