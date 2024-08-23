"use server";

import API from "@/utils/API";
import { cookies } from "next/headers";
import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

export async function createProduct(
  prevState: { message: string },
  formData: FormData
) {
  if (!formData.get("is_premium")) {
    formData.append("is_premium", "off");
  }

  const schema = z.object({
    image: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
      })
      .refine((file) => {
        return !file || ACCEPTED_FILE_TYPES.includes(file.type);
      }, "File must be a PNG"),
    name: z.string().min(5),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    is_premium: z.enum(["on", "off"]),
  });

  const parse = schema.safeParse({
    image: formData.get("image"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")?.toString() ?? ""),
    stock: parseFloat(formData.get("stock")?.toString() ?? ""),
    is_premium: formData.get("is_premium"),
  });

  if (!parse.success) {
    return { message: "Invalid value" + parse.error };
  }

  try {
    const accessToken = cookies().get("access_token")?.value;
    const res = await API.createProduct(formData, accessToken);
    if (!res.ok) {
      const result = await res.json();
      return { message: "Failed to create product " + result.error };
    }
    return { message: "Success" };
  } catch (error) {
    return { message: error as string };
  }
}
