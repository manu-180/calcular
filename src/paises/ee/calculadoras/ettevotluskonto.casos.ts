import { definirCasos } from "@/motor/calculo";
import konto from "./ettevotluskonto";

const EMTA = "https://www.emta.ee/en/private-client/taxes-and-payment/taxable-income/entrepreneur-account";

export default definirCasos(konto, [
  {
    nombre: "II sammas 6%: 100 eurost jääb 74",
    origen: { tipo: "oficial", url: EMTA, detalle: "Maksu- ja Tolliameti näide: 6% maksega laekumisest 100 eurot jääb kontole 74 eurot." },
    fecha: "2026-10-15",
    entrada: { kuus: 100, sammas: "6" },
    esperado: { jaab: 74, maks: 26, maar: 26 },
  },
  {
    nombre: "Ilma II sambata 2500 eurot",
    origen: { tipo: "recalculado", url: EMTA, detalle: "20% = 500; jääb 2000; aastas 30 000 ja 24 000." },
    fecha: "2026-10-15",
    entrada: { kuus: 2500, sammas: "0" },
    esperado: { jaab: 2000, maks: 500, aastas: 30000, jaabAastas: 24000 },
  },
]);
