"use client";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { formatPrice } from "@/_utils/formatters";
import { Heading } from "@/components/ui/Heading";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { OrderWithUser } from "@/_types";
import moment from "moment";
import { StatusBar } from "@/components/admin/StatusBar";

type OrdersClientProps = {
  orders: OrderWithUser[];
};

export function OrdersClient({ orders }: OrdersClientProps) {
  const router = useRouter();

  const rows: GridRowsProp = orders.map((order) => {
    return {
      id: order.id,
      amount: formatPrice(order.amount / 100),
      paymentStatus: order.status,
      date: moment(order.createdAt).fromNow(),
      deliveryStatus: order.deliveryStatus,
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 220 },
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
    { field: "date", headerName: "Order Placed", width: 130 },
  ];

  return (
    <div className="m-auto w-fit text-xl">
      <div className="mb-4 mt-8">
        <Heading title="My Orders" center />
      </div>

      <div className="h-[600px] w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20]}
          disableRowSelectionOnClick
          onRowClick={(row) => router.push(`/order/${row.id}`)}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "&.MuiDataGrid-root .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
      </div>
    </div>
  );
}
