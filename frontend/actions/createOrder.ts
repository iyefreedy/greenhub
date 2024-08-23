"use server";

import API from "@/utils/API";
import { z } from "zod";

export async function createOrder(
  prevState: { message: string },
  formData: FormData
) {
  console.log(localStorage.getItem("cart"));

  const schema = z.object({
    product: z.number(),
    price: z.number(),
    quantity: z.number(),
  });

  const parse = schema.safeParse({
    product: parseInt(formData.get("product")?.toString() ?? ""),
    price: parseFloat(formData.get("price")?.toString() ?? ""),
    quantity: parseInt(formData.get("quantity")?.toString() ?? ""),
  });

  if (!parse.success) {
    return { message: "Failed create transaction" };
  }

  //   console.log(parse.data);

  //   const data = {
  //     product: parseInt(formData.get("product")?.toString() ?? ""),
  //     price: parseFloat(formData.get("price")?.toString() ?? ""),
  //     quantity: parseInt(formData.get("quantity")?.toString() ?? ""),
  //   };

  console.log(formData.getAll("products"));
  console.log(formData);

  return { message: "Success create transaction" };
}
