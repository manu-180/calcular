import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Ocupación no calificada",
    origen: {
      tipo: "oficial",
      url: "https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=105838&param2=148681&param3=1",
      detalle: "Decreto 45303-MTSS: ₡373.092,30 por mes. Art. 7: quincena = mes / 2 = 186.546,15; día = mes / 30 = 12.436,41; hora = día / 8 = 1.554,55.",
    },
    fecha: "2026-10-07",
    entrada: { categoria: "no-calificado" },
    esperado: { mensual: 373092.3, quincenal: 186546.15, diario: 12436.41, hora: 1554.55 },
  },
  {
    nombre: "Licenciado universitario",
    origen: { tipo: "recalculado", detalle: "796.921 / 2 = 398.460,50; / 30 = 26.564,03; / 8 = 3.320,50." },
    fecha: "2026-10-07",
    entrada: { categoria: "licenciado" },
    esperado: { mensual: 796921, quincenal: 398460.5, diario: 26564.03, hora: 3320.5 },
  },
  {
    nombre: "Trabajo doméstico (redondeo de la quincena)",
    origen: { tipo: "recalculado", detalle: "268.731,31 / 2 = 134.365,655, redondeado 134.365,66; / 30 = 8.957,71; / 8 = 1.119,71." },
    fecha: "2026-10-07",
    entrada: { categoria: "trabajo-domestico" },
    esperado: { mensual: 268731.31, quincenal: 134365.66, diario: 8957.71, hora: 1119.71 },
  },
]);
