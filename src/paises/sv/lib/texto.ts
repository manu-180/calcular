export function dinero(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function numero(n: number, decimales = 2): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimales });
}
