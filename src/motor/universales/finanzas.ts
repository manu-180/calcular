import ahorroRetiro from "./ahorro-retiro";
import alquilarOComprar from "./alquilar-o-comprar";
import hipoteca from "./hipoteca";
import interesCompuesto from "./interes-compuesto";
import interesSimple from "./interes-simple";
import metaDeAhorro from "./meta-de-ahorro";
import prestamo from "./prestamo";
import tasaEfectiva from "./tasa-efectiva";
import type { Universal } from "./tipos";

// Lista del frente "finanzas, negocio y sueldo". Cada entrada es el index.ts de su carpeta.
export const UNIVERSALES_FINANZAS: readonly Universal<never>[] = [
  prestamo as Universal<never>,
  tasaEfectiva as Universal<never>,
  hipoteca as Universal<never>,
  alquilarOComprar as Universal<never>,
  interesCompuesto as Universal<never>,
  interesSimple as Universal<never>,
  metaDeAhorro as Universal<never>,
  ahorroRetiro as Universal<never>,
];
