import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const LN108 = "https://new.kenyalaw.org/akn/ke/act/ln/2026/108/eng@2026-06-26" as const;

export default definirCasos(calculadora, [
  {
    nombre: "General labourer in Nairobi",
    origen: { tipo: "oficial", url: LN108, detalle: "Schedule, item 1, column 2: KSh 18,047.40 a month, KSh 161.34 an hour." },
    fecha: "2026-10-17",
    entrada: { region: "cities", ocupacion: "general", sueldo: null },
    esperado: { mensual: 18047.4, hora: 161.34 },
  },
  {
    nombre: "General labourer in other areas",
    origen: { tipo: "oficial", url: LN108, detalle: "Schedule, item 1, column 4: KSh 9,628.07 a month." },
    fecha: "2026-10-17",
    entrada: { region: "other", ocupacion: "general", sueldo: 9000 },
    esperado: { mensual: 9628.07, diferencia: -628.07 },
  },
  {
    nombre: "Night watchman in Ruiru",
    origen: { tipo: "oficial", url: LN108, detalle: "Schedule, item 3, column 3: KSh 18,665.88 a month." },
    fecha: "2026-10-17",
    entrada: { region: "municipalities", ocupacion: "night-watchman", sueldo: null },
    esperado: { mensual: 18665.88, hora: 165.26 },
  },
  {
    nombre: "Artisan Grade I in a city",
    origen: { tipo: "oficial", url: LN108, detalle: "Schedule, item 15, column 2: KSh 40,724.23 a month." },
    fecha: "2026-10-17",
    entrada: { region: "cities", ocupacion: "artisan-1", sueldo: 45000 },
    esperado: { mensual: 40724.23, diferencia: 4275.77 },
  },
]);
