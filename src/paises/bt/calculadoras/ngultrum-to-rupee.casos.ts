import { definirCasos } from "@/motor/calculo";
import calculadora from "./ngultrum-to-rupee";

const MPS = "https://www.rma.org.bt/media/Publication/Macro-economic%20Data/Monetary%20Policy%20Statement%202026.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nu. 1,000 to rupees",
    origen: { tipo: "recalculado", url: MPS, detalle: "The RMA: pegged to the Indian rupee at par." },
    fecha: "2026-10-31",
    entrada: { sentido: "btn-inr", monto: 1000 },
    esperado: { resultado: 1000, tasa: 1 },
  },
  {
    nombre: "Rs 2,500 to ngultrum",
    origen: { tipo: "recalculado", url: MPS, detalle: "At par: 2,500." },
    fecha: "2026-10-31",
    entrada: { sentido: "inr-btn", monto: 2500 },
    esperado: { resultado: 2500 },
  },
]);
