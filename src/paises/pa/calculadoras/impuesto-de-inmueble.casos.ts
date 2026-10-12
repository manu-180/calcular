import { definirCasos } from "@/motor/calculo";
import impuestoDeInmueble from "./impuesto-de-inmueble";

export default definirCasos(impuestoDeInmueble, [
  {
    nombre: "Vivienda principal de B/. 200,000",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 766: 0% hasta 120,000 y 0.5% sobre el excedente: 80,000 × 0.5% = 400. Con 10% de descuento por pago hasta febrero (art. 786): 360.",
    },
    fecha: "2026-10-12",
    entrada: { valor: 200000, uso: "vivienda-principal" },
    esperado: { exento: 120000, anual: 400, descuento: 40, conDescuento: 360, partida: 133.33 },
  },
  {
    nombre: "Local de B/. 600,000",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 766-A: 220,000 × 0.6% = 1,320; 250,000 × 0.8% = 2,000; 100,000 × 1% = 1,000. Total 4,320.",
    },
    fecha: "2026-10-12",
    entrada: { valor: 600000, uso: "otro" },
    esperado: { exento: 30000, anual: 4320, descuento: 432, conDescuento: 3888, partida: 1440 },
  },
  {
    nombre: "Vivienda principal exenta",
    origen: { tipo: "recalculado", detalle: "Hasta 120,000 no paga." },
    fecha: "2026-10-12",
    entrada: { valor: 120000, uso: "vivienda-principal" },
    esperado: { anual: 0 },
  },
  {
    nombre: "Vivienda principal de B/. 800,000",
    origen: { tipo: "recalculado", detalle: "580,000 × 0.5% = 2,900 más 100,000 × 0.7% = 700. Total 3,600." },
    fecha: "2026-10-12",
    entrada: { valor: 800000, uso: "vivienda-principal" },
    esperado: { anual: 3600 },
  },
]);
