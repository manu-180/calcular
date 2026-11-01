import { definirCasos } from "@/motor/calculo";
import valiutos from "./valiutu-skaiciuokle";

const U = "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRatesForCurrency?tp=EU&ccy=USD&dtFrom=2026-09-25&dtTo=2026-10-31";

export default definirCasos(valiutos, [
  {
    nombre: "100 eurų į dolerius",
    origen: { tipo: "recalculado", url: U, detalle: "2026-10-30 santykis 1,1172; 100 × 1,1172 = 111,72." },
    fecha: "2026-11-01",
    entrada: { valiuta: "usd", kryptis: "is-euro", suma: 100 },
    esperado: { rezultatas: 111.72, santykis: 1.1172 },
  },
  {
    nombre: "100 dolerių į eurus",
    origen: { tipo: "recalculado", url: U, detalle: "100 / 1,1172 = 89,51." },
    fecha: "2026-11-01",
    entrada: { valiuta: "usd", kryptis: "i-eura", suma: 100 },
    esperado: { rezultatas: 89.51 },
  },
  {
    nombre: "Nulinė suma",
    origen: { tipo: "recalculado", url: U, detalle: "Suma turi būti didesnė už nulį." },
    fecha: "2026-11-01",
    entrada: { valiuta: "usd", kryptis: "is-euro", suma: 0 },
    esperaError: true,
  },
]);
