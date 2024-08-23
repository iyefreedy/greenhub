import API from "@/utils/API";
import { formatCurrency } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getTransactions() {
  const accessToken = cookies().get("access_token")?.value;
  const res = await API.getTransactions(accessToken);

  if (res.status === 401) {
    return redirect("/login");
  }

  const result = await res.json();
  return result as any[];
}

export default async function OrderPage() {
  const transactions = await getTransactions();
  return (
    <div className="shadow bg-white p-6 rounded-md">
      <h2 className="text-xl font-medium">Orders</h2>

      <ul className="mt-5">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between space-y-4">
            <div>
              <span>{transaction.invoice_number}</span>
            </div>
            <div className="flex flex-col">
              <span>{formatCurrency(transaction.total_price)}</span>
              <form>
                <button
                  formAction={async (formData: FormData) => {
                    "use server";

                    const accessToken = cookies().get("access_token")?.value;
                    await API.payTransaction(transaction.id, accessToken);
                    revalidatePath("/orders");
                  }}
                  className={` text-gray-700 rounded-full text-center w-full ${
                    transaction.status === "paid"
                      ? "bg-green-300"
                      : "bg-red-300"
                  }`}
                >
                  {transaction.status}
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
