import { definirCasos } from "@/motor/calculo";
import impuestoSobreDividendos from "./impuesto-sobre-dividendos";

export default definirCasos(impuestoSobreDividendos, [
  {
    nombre: "Dividendos de ₡10.000.000 a una persona",
    origen: { tipo: "recalculado", detalle: "Ley 7092, art. 31 ter: 15 % = 1.500.000. Neto 8.500.000." },
    fecha: "2026-10-12",
    entrada: { dividendos: 10000000, socio: "persona" },
    esperado: { retencion: 1500000, neto: 8500000 },
  },
  {
    nombre: "Dividendos entre sociedades",
    origen: { tipo: "recalculado", detalle: "Art. 28 bis, inciso 3: exentos si el socio es otra sociedad domiciliada con actividad económica sujeta al impuesto." },
    fecha: "2026-10-12",
    entrada: { dividendos: 10000000, socio: "sociedad" },
    esperado: { retencion: 0, neto: 10000000 },
  },
]);
