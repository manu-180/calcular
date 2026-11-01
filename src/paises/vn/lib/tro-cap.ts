// khoản 3 Điều 8 Nghị định 145/2020: se cuenta por años enteros; los meses sueltos valen medio año si son
// 6 o menos, y un año entero si son más.
export function namTinhTroCap(thang: number): number {
  const nam = Math.floor(thang / 12);
  const le = thang % 12;
  if (le === 0) return nam;
  return le <= 6 ? nam + 0.5 : nam + 1;
}
