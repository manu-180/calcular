import descuento from "./descuento";
import type { Universal } from "./tipos";

// Lista del frente "cuentas, fechas, salud y hogar". Cada entrada es el index.ts de su carpeta.
export const UNIVERSALES_COTIDIANAS: readonly Universal<never>[] = [descuento as Universal<never>];
