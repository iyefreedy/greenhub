export function formatCurrency(num: number) {
  const numberFormat = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  });

  return numberFormat.format(num);
}
