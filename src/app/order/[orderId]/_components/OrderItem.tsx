import { formatPrice } from "@/_utils/formatters";
import { truncateText } from "@/_utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

type OrderItemProps = {
  item: CartProductType;
};

export function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t-2 border-slate-200 py-4 text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <div className="relative aspect-square w-[70px]">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>

      <div className="justify-self-center">{formatPrice(item.price / 100)}</div>

      <div className="justify-self-center">{item.quantity}</div>

      <div className="justify-self-end font-semibold">
        {formatPrice((item.price * item.quantity) / 100)}
      </div>
    </div>
  );
}
