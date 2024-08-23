import API from "@/utils/API";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();

  const accessToken = cookies().get("access_token")?.value;

  const res = await API.createOrder(data, accessToken);

  const result = await res.json();

  console.log(result);

  return Response.json({ message: "Success" });
}
