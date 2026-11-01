import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-registration-calculator";

const FAQ = "https://www.drc.gov.bt/wp-content/uploads/2026/02/Frequently-Asked-Questions-3.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Exactly Nu. 5 million",
    origen: { tipo: "recalculado", url: FAQ, detalle: "Equal to or above Nu. 5 million: must register." },
    fecha: "2026-10-31",
    entrada: { ventas: 5000000 },
    esperado: { situacion: "You must register for GST", faltante: 0, gst: 250000 },
  },
  {
    nombre: "Nu. 3 million",
    origen: { tipo: "recalculado", url: FAQ, detalle: "Nu. 2.5 million or more, under Nu. 5 million: may opt in." },
    fecha: "2026-10-31",
    entrada: { ventas: 3000000 },
    esperado: { situacion: "You may register voluntarily", faltante: 2000000, gst: 150000 },
  },
  {
    nombre: "Nu. 1 million",
    origen: { tipo: "recalculado", url: FAQ, detalle: "Under Nu. 2.5 million." },
    fecha: "2026-10-31",
    entrada: { ventas: 1000000 },
    esperado: { situacion: "You do not need to register", faltante: 4000000 },
  },
]);
