import { ErrorEntrada } from "@/motor/calculo";
import datos from "../datos.json";

interface TramoUvt {
  estado: string;
  desde: string;
  hasta?: string;
  valor?: unknown;
}

// El motor entrega solo la UVT vigente a la fecha de consulta. Renta se declara por año gravable
// (en 2026 se declara 2025), así que la UVT de ese año se lee de los tramos verificados del mismo
// datos.json: un tramo sin verificar nunca entra al cálculo.
export function uvtDelAnio(anio: number, campo: string): number {
  const dato = datos.datos.find((d) => d.id === "co.uvt");
  const tramos = (dato?.tramos ?? []) as readonly TramoUvt[];
  const medio = `${anio}-06-30`;
  const tramo = tramos.find((t) => t.estado === "verificado" && t.desde <= medio && (!t.hasta || t.hasta >= medio));
  if (!tramo || typeof tramo.valor !== "number") throw new ErrorEntrada(`Todavía no tenemos la UVT verificada de ${anio}.`, campo);
  return tramo.valor;
}
