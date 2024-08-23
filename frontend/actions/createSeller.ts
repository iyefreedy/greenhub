"use server";

import API from "@/utils/API";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createSeller(formData: FormData) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    console.log(accessToken);
    console.log(formData);

    const newSeller = {
      name: formData.get("name"),
      city: formData.get("city"),
      address: formData.get("address"),
    };

    const res = await API.createSeller(newSeller, accessToken);

    revalidatePath("/seller");
    // return { message: `Added todo ` };
  } catch (e) {
    console.error(e);
    return { message: "Failed to create todo" };
  }
}
