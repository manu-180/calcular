// Los ids de pago entran crudos en un filtro .or() de PostgREST, donde una coma, un paréntesis o una
// comilla cambian la condición. Los ids reales (MP numérico, "proveedor:id") nunca los traen.
export function idParaFiltro(id: string): string {
  if (!/^[A-Za-z0-9:_-]+$/.test(id)) throw new Error(`id de pago con caracteres inválidos para un filtro: ${JSON.stringify(id)}`);
  return id;
}
