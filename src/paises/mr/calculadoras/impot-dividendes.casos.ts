import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-dividendes";

export default definirCasos(calculadora, [
  {
    nombre: "Dividendos de 1.000.000",
    origen: { tipo: "recalculado", detalle: "Art. 126 CGI: 10 % = 100.000. Neto 900.000." },
    fecha: "2026-10-29",
    entrada: { nature: "dividendes", montant: 1000000 },
    esperado: { impot: 100000, net: 900000, taux: 10 },
  },
  {
    nombre: "Intereses de 250.000",
    origen: { tipo: "recalculado", detalle: "10 % = 25.000." },
    fecha: "2026-10-29",
    entrada: { nature: "interets", montant: 250000 },
    esperado: { impot: 25000 },
  },
  {
    nombre: "Plusvalía de cedente en paraíso fiscal",
    origen: { tipo: "recalculado", detalle: "Art. 126: 20 % de 500.000 = 100.000." },
    fecha: "2026-10-29",
    entrada: { nature: "plus-value-paradis", montant: 500000 },
    esperado: { impot: 100000, taux: 20 },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Sin monto." },
    fecha: "2026-10-29",
    entrada: { nature: "dividendes", montant: 0 },
    esperaError: true,
  },
]);
