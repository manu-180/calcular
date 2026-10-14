import alquilarOComprar from "./alquilar-o-comprar";
import hipoteca from "./hipoteca";
import prestamo from "./prestamo";
import tasaEfectiva from "./tasa-efectiva";
import type { Universal } from "./tipos";

// Lista del frente "finanzas, negocio y sueldo". Cada entrada es el index.ts de su carpeta.
export const UNIVERSALES_FINANZAS: readonly Universal<never>[] = [
  prestamo as Universal<never>,
  tasaEfectiva as Universal<never>,
  hipoteca as Universal<never>,
  alquilarOComprar as Universal<never>,
];
