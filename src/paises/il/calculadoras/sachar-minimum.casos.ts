import { definirCasos } from "@/motor/calculo";
import calculadora from "./sachar-minimum";

export default definirCasos(calculadora, [
  {
    nombre: "Jornada completa desde abril de 2026",
    origen: { tipo: "oficial", url: "https://www.btl.gov.il/Mediniyut/GeneralData/Pages/%D7%A9%D7%9B%D7%A8%20%D7%9E%D7%99%D7%A0%D7%99%D7%9E%D7%95%D7%9D.aspx", detalle: "Desde el 01.04.2026: 6.443,85 por mes, 35,40 por hora (182 h)." },
    fecha: "2026-10-24",
    entrada: { sug: "chodshi", misra: 100, shaot: null, bsis: "shaa-182" },
    esperado: { minimum: 6443.85, shaa: 35.4, yom5: 297.4, yom6: 257.75 },
  },
  {
    nombre: "Media jornada",
    origen: { tipo: "recalculado", detalle: "50 % de 6.443,85 = 3.221,925 -> 3.221,93." },
    fecha: "2026-10-24",
    entrada: { sug: "chodshi", misra: 50, shaot: null, bsis: "shaa-182" },
    esperado: { minimum: 3221.93 },
  },
  {
    nombre: "120 horas con base de 186",
    origen: { tipo: "recalculado", detalle: "120 x 34,64 = 4.156,80." },
    fecha: "2026-10-24",
    entrada: { sug: "shaati", misra: null, shaot: 120, bsis: "shaa-186" },
    esperado: { minimum: 4156.8, shaa: 34.64 },
  },
  {
    nombre: "Marzo de 2026, antes del aumento",
    origen: { tipo: "oficial", url: "https://www.btl.gov.il/Mediniyut/GeneralData/Pages/%D7%A9%D7%9B%D7%A8%20%D7%9E%D7%99%D7%A0%D7%99%D7%9E%D7%95%D7%9D.aspx", detalle: "Desde el 01.04.2025: 6.247,67 por mes y 34,32 por hora (182 h)." },
    fecha: "2026-03-31",
    entrada: { sug: "chodshi", misra: 100, shaot: null, bsis: "shaa-182" },
    esperado: { minimum: 6247.67, shaa: 34.32 },
  },
  {
    nombre: "Horas en cero",
    origen: { tipo: "recalculado", detalle: "0 horas." },
    fecha: "2026-10-24",
    entrada: { sug: "shaati", misra: null, shaot: 0, bsis: "shaa-182" },
    esperaError: true,
  },
]);
