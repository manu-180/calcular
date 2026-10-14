import calorias from "./calorias";
import combustible from "./combustible";
import consumoElectrico from "./consumo-electrico";
import descuento from "./descuento";
import fechaDeParto from "./fecha-de-parto";
import imc from "./imc";
import ovulacion from "./ovulacion";
import diasEntreFechas from "./dias-entre-fechas";
import dividirGastos from "./dividir-gastos";
import edad from "./edad";
import sumarDias from "./sumar-dias";
import porcentaje from "./porcentaje";
import promedio from "./promedio";
import propina from "./propina";
import reglaDeTres from "./regla-de-tres";
import ritmoDeCarrera from "./ritmo-de-carrera";
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
  edad,
  diasEntreFechas,
  sumarDias,
  imc,
  calorias,
  fechaDeParto,
  ovulacion,
  ritmoDeCarrera,
  combustible,
  consumoElectrico,
] as Universal<never>[];
