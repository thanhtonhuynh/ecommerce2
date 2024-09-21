"use client";

import { StatusBar } from "@/components/admin/StatusBar";
import { GoBackButton } from "@/components/GoBackButton";
import { Heading } from "@/components/ui/Heading";
import { formatPrice } from "@/_utils/formatters";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { OrderItem } from "./OrderItem";

type OrderDetailsProps = {
  order: Order;
};

export function OrderDetails({ order }: OrderDetailsProps) {
  const router = useRouter();

  return (
    <div className="m-auto flex max-w-[1150px] flex-col gap-2">
      <GoBackButton>Go back</GoBackButton>

      <div className="mt-8">
        <Heading title="Order Details" />
      </div>

      <div>Order ID: {order.id}</div>

      <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>

      <div className="flex items-center gap-2">
        <div>Payment status:</div>
        <div className="text-sm">
          {order.status === "pending" ? (
            <StatusBar
              icon={MdAccessTimeFilled}
              color="text-yellow-700"
              bgColor="bg-yellow-200"
            >
              {"pending"}
            </StatusBar>
          ) : order.status === "complete" ? (
            <StatusBar
              icon={MdDone}
              color="text-green-700"
              bgColor="bg-green-200"
            >
              {"paid"}
            </StatusBar>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div>Delivery status:</div>
        <div className="text-sm">
          {order.deliveryStatus === "pending" ? (
            <StatusBar
              icon={MdAccessTimeFilled}
              color="text-yellow-700"
              bgColor="bg-yellow-200"
            >
              {order.deliveryStatus}
            </StatusBar>
          ) : order.deliveryStatus === "dispatched" ? (
            <StatusBar
              icon={MdDeliveryDining}
              color="text-purple-700"
              bgColor="bg-purple-200"
            >
              {order.deliveryStatus}
            </StatusBar>
          ) : (
            <StatusBar
              icon={MdDone}
              color="text-green-700"
              bgColor="bg-green-200"
            >
              {order.deliveryStatus}
            </StatusBar>
          )}
        </div>
      </div>

      <div className="flex gap-1">
        Date:
        <div>{moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}</div>
        <div>({moment(order.createdAt).fromNow()})</div>
      </div>

      <div>
        <h2 className="mb-2 mt-4 font-semibold">Products ordered:</h2>
        <div className="grid grid-cols-5 items-center gap-4 pb-2 text-xs">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => <OrderItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}
