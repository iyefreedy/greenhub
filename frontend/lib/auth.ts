import { User } from "@/types";
import API from "@/utils/API";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function auth() {
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) {
    return null;
  }

  const res = await API.authorize(accessToken);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data as User;
}
