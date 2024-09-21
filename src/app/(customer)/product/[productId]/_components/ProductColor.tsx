import { CartProductType, ProductImageType } from "@/_types";

type ProductColorProps = {
  cartProduct: CartProductType;
  images: ProductImageType[];
  handleColorChange: (value: ProductImageType) => void;
};

export function ProductColor({
  cartProduct,
  images,
  handleColorChange,
}: ProductColorProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => (
            <div
              key={image.color}
              onClick={() => handleColorChange(image)}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-teal-300 ${
                cartProduct.selectedImg.color === image.color
                  ? "border-2"
                  : "border-none"
              } `}
            >
              <div
                style={{ background: image.colorCode }}
                className="h-5 w-5 cursor-pointer rounded-full border-[1.2px] border-slate-300"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
