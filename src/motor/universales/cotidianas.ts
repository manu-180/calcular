import descuento from "./descuento";
import dividirGastos from "./dividir-gastos";
import porcentaje from "./porcentaje";
import promedio from "./promedio";
import propina from "./propina";
import reglaDeTres from "./regla-de-tres";
import type { Universal } from "./tipos";
import variacionPorcentual from "./variacion-porcentual";

// Lista del frente "cuentas, fechas, salud y hogar". Cada entrada es el index.ts de su carpeta.
export const UNIVERSALES_COTIDIANAS: readonly Universal<never>[] = [
  descuento,
  porcentaje,
  variacionPorcentual,
  reglaDeTres,
  propina,
  dividirGastos,
  promedio,
] as Universal<never>[];
