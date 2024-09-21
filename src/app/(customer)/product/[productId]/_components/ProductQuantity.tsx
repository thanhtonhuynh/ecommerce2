import { CartProductType } from "@/_types";

type ProductQuantityProps = {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
};

const btnStyles = "border border-slate-300 px-2 rounded hover:bg-slate-100";

export function ProductQuantity({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: ProductQuantityProps) {
  return (
    <div className="flex items-center gap-8">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}

      <div className="flex items-center gap-4 text-base">
        <button className={btnStyles} onClick={handleQuantityDecrease}>
          -
        </button>
        <span>{cartProduct.quantity}</span>
        <button className={btnStyles} onClick={handleQuantityIncrease}>
          +
        </button>
      </div>
    </div>
  );
}
