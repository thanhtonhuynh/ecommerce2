"use client";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { formatPrice } from "@/_utils/formatters";
import { Heading } from "@/components/ui/Heading";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { ActionButton } from "@/components/ActionButton";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { OrderWithUser } from "@/_types";
import moment from "moment";
import { StatusBar } from "@/components/admin/StatusBar";
import { updateDeliveryStatus } from "../../_actions/orders";

type ManageOrdersClientProps = {
  orders: OrderWithUser[];
};

export function ManageOrdersClient({ orders }: ManageOrdersClientProps) {
  const router = useRouter();
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(orders);
  const [isPending, startTransition] = useTransition();

  function updateOptimisticDeliveryStatus(id: string, status: string) {
    setOptimisticOrders((orders) => {
      const updatedOrder = orders.find((order) => order.id === id);

      if (!updatedOrder) return orders;

      return orders.map((order) =>
        order.id === id ? { ...order, deliveryStatus: status } : order,
      );
    });
  }

  const rows: GridRowsProp = optimisticOrders.map((order) => {
    return {
      id: order.id,
      customer: order.user.name,
      amount: formatPrice(order.amount / 100),
      paymentStatus: order.status,
      date: moment(order.createdAt).fromNow(),
      deliveryStatus: order.deliveryStatus,
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount Paid",
      width: 130,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.value}</div>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value === "pending" && (
            <StatusBar icon={MdAccessTimeFilled} color="text-yellow-700">
              {params.value}
            </StatusBar>
          )}

          {params.value === "complete" && (
            <StatusBar icon={MdDone} color="text-green-700">
              {"paid"}
            </StatusBar>
          )}
        </div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value === "pending" && (
            <StatusBar icon={MdAccessTimeFilled} color="text-yellow-700">
              {params.value}
            </StatusBar>
          )}

          {params.value === "dispatched" && (
            <StatusBar icon={MdDeliveryDining} color="text-purple-700">
              {params.value}
            </StatusBar>
          )}

          {params.value === "delivered" && (
            <StatusBar icon={MdDone} color="text-green-600">
              {params.value}
            </StatusBar>
          )}
        </div>
      ),
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div className="flex h-full items-center gap-2">
          <ActionButton
            icon={MdAccessTimeFilled}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                updateOptimisticDeliveryStatus(params.row.id, "pending");
                await updateDeliveryStatus(params.row.id, "pending");
              });
            }}
          />

          <ActionButton
            icon={MdDeliveryDining}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                updateOptimisticDeliveryStatus(params.row.id, "dispatched");
                await updateDeliveryStatus(params.row.id, "dispatched");
              });
            }}
          />

          <ActionButton
            icon={MdDone}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                updateOptimisticDeliveryStatus(params.row.id, "delivered");
                await updateDeliveryStatus(params.row.id, "delivered");
              });
            }}
          />

          <ActionButton
            icon={MdRemoveRedEye}
            onClick={() => router.push(`/order/${params.row.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="m-auto max-w-[1150px] text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>

      <div className="h-[600px] w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
