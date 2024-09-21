"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { formatPrice } from "@/_utils/formatters";
import { Heading } from "@/components/ui/Heading";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { ActionButton } from "@/components/ActionButton";
import { useRouter } from "next/navigation";
import { deleteProduct, toggleProductStock } from "../../_actions/products";
import { useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import { StatusBar } from "@/components/admin/StatusBar";

type ManageProductsClientProps = {
  products: Product[];
};

export function ManageProductsClient({ products }: ManageProductsClientProps) {
  const router = useRouter();
  const [optimisticProducts, updateOptimisticProducts] = useOptimistic(
    products,
    (state, updatedProductId) => {
      const updatedProductIndex = state.findIndex(
        (product) => product.id === updatedProductId,
      );

      if (updatedProductIndex === -1) return state;

      const updatedProduct = state[updatedProductIndex];
      const updatedProducts = [...state];

      updatedProducts[updatedProductIndex] = {
        ...updatedProduct,
        inStock: !updatedProduct.inStock,
      };

      return updatedProducts;
    },
  );
  const [isPending, startTransition] = useTransition();

  const rows: GridRowsProp = optimisticProducts.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price / 100),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      images: product.images,
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.value}</div>
      ),
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value === true ? (
            <StatusBar icon={MdDone} color="text-teal-700">
              {"in stock"}
            </StatusBar>
          ) : (
            <StatusBar icon={MdClose} color="text-rose-700">
              {"out of stock"}
            </StatusBar>
          )}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex h-full items-center gap-2">
          <ActionButton
            icon={MdCached}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                updateOptimisticProducts(params.row.id);
                await toggleProductStock(params.row.id, params.row.inStock);
              });
            }}
          />

          <ActionButton
            icon={MdDelete}
            onClick={async () => {
              toast.promise(deleteProduct(params.row.id, params.row.images), {
                loading: "Deleting product...",
                success: "Product deleted",
                error: "There was an error deleting the product",
              });
            }}
          />

          <ActionButton
            icon={MdRemoveRedEye}
            onClick={() => router.push(`/product/${params.row.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="m-auto max-w-[1150px] text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>

      <div className="h-[600px] w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 9 } },
          }}
          pageSizeOptions={[1, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
