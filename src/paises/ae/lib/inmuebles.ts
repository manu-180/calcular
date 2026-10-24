import { enMapa, porcentaje } from "@/motor/calculo";

export interface CostosDld {
  transferencia: number;
  registro: number;
  hipoteca: number;
  titulo: number;
  total: number;
}

export function costosDubai(
  precio: number,
  prestamo: number,
  d: { tasa: number; registros: Readonly<Record<string, number>>; tasaHipoteca: number; titulo: number },
): CostosDld {
  const transferencia = porcentaje(precio, d.tasa);
  const registro = precio < 500000 ? enMapa(d.registros, "below-500k") : enMapa(d.registros, "from-500k");
  const hipoteca = prestamo > 0 ? porcentaje(prestamo, d.tasaHipoteca) : 0;
  return { transferencia, registro, hipoteca, titulo: d.titulo, total: transferencia + registro + hipoteca + d.titulo };
}
