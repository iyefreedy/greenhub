import API from "@/utils/API"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    const body = await req.json()

    const res = await API.register(body)
    const data = await res.json()

    if(!res.ok) {
        return Response.json({
            error: data.error
        }, {status: res.status})
    }

    cookies().set("access_token", data.access_token)
    
    return Response.json({"status": true})
}