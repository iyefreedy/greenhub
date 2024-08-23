"use server";

import API from "@/utils/dummy";

export async function explore(formData: FormData) {
  console.log(formData);

  const products = await API.getAll();
}
