import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const DECRETO = "https://www.mitradel.gob.pa/wp-content/uploads/2025/12/Decreto-Ejecutivo-No.13-del-31-de-diciembre-de-2025.pdf" as const;

export default definirCasos(salarioMinimo, [
  {
    nombre: "Comercio al por menor, gran empresa, Región 1",
    origen: {
      tipo: "oficial",
      url: DECRETO,
      detalle: "D.E. 13 de 2025, art. 2: B/. 3.02 la hora en Región 1. Semana 3.02 × 48 = 144.96; mes 144.96 × 52 ÷ 12 = 628.16. Doméstico Región 1: B/. 350.",
    },
    fecha: "2026-10-07",
    entrada: { region: "region-1", actividad: "comercio-menor-gran" },
    esperado: { hora: 3.02, semanal: 144.96, quincenal: 314.08, mensual: 628.16, domestico: 350 },
  },
  {
    nombre: "Agricultura, pequeña empresa, Región 2, el día que entra en vigencia",
    origen: {
      tipo: "oficial",
      url: DECRETO,
      detalle: "Art. 2: B/. 1.64 la hora; art. 5: rige desde el 16/1/2026. Semana 78.72; mes 341.12. Doméstico Región 2: B/. 320.",
    },
    fecha: "2026-01-16",
    entrada: { region: "region-2", actividad: "agro-pequena" },
    esperado: { hora: 1.64, semanal: 78.72, quincenal: 170.56, mensual: 341.12, domestico: 320 },
  },
  {
    nombre: "Tripulantes de cabina (tasa más alta)",
    origen: { tipo: "recalculado", detalle: "5.01 × 48 = 240.48; × 52 ÷ 12 = 1,042.08; quincena 521.04." },
    fecha: "2026-10-07",
    entrada: { region: "region-1", actividad: "tripulantes-cabina" },
    esperado: { hora: 5.01, semanal: 240.48, quincenal: 521.04, mensual: 1042.08 },
  },
  {
    nombre: "Zona Libre de Colón en la Región 2",
    origen: { tipo: "recalculado", detalle: "El decreto no fija tasa para la Región 2 en esta actividad." },
    fecha: "2026-10-07",
    entrada: { region: "region-2", actividad: "zona-libre-colon" },
    esperaError: true,
  },
]);
