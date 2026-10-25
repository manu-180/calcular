import { definirCasos } from "@/motor/calculo";
import atpBidrag from "./atp-bidrag";

const ATP = "https://www.borger.dk/pension-og-efterloen/ATP-Livslang-pension-oversigt/atp-bidraget/atp-satser-for-privat-virksomhed";

export default definirCasos(atpBidrag, [
  {
    nombre: "Fuldtid: mindst 117 timer",
    origen: { tipo: "oficial", url: ATP, detalle: "Mindst 117 timer: lønmodtager 99 kr., arbejdsgiver 198 kr., i alt 297 kr. pr. måned." },
    fecha: "2026-10-24",
    entrada: { timer: 160 },
    esperado: { dig: 99, arbejdsgiver: 198, ialt: 297, aar: 3564, digAar: 1188 },
  },
  {
    nombre: "100 timer om måneden",
    origen: { tipo: "oficial", url: ATP, detalle: "Under 117 timer, mindst 78 timer: 66 + 132 = 198 kr." },
    fecha: "2026-10-24",
    entrada: { timer: 100 },
    esperado: { dig: 66, arbejdsgiver: 132, ialt: 198 },
  },
  {
    nombre: "50 timer om måneden",
    origen: { tipo: "oficial", url: ATP, detalle: "Under 78 timer, mindst 39 timer: 33 + 66 = 99 kr." },
    fecha: "2026-10-24",
    entrada: { timer: 50 },
    esperado: { dig: 33, ialt: 99 },
  },
  {
    nombre: "Under 39 timer",
    origen: { tipo: "oficial", url: ATP, detalle: "Under 39 timer: intet bidrag." },
    fecha: "2026-10-24",
    entrada: { timer: 30 },
    esperado: { dig: 0, ialt: 0 },
  },
]);
