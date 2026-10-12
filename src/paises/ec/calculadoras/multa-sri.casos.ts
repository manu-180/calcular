import { definirCasos } from "@/motor/calculo";
import multaSri from "./multa-sri";

export default definirCasos(multaSri, [
  {
    nombre: "Impuesto de 500 con 2 meses de retraso",
    origen: { tipo: "recalculado", detalle: "LRTI art. 100: 3 % por mes × 2 = 6 % de 500 = 30. Si la cobra el SRI, + 20 % = 36." },
    fecha: "2026-10-07",
    entrada: { impuesto: 500, ingresos: 0, meses: 2 },
    esperado: { tasa: 6, multa: 30, conRecargo: 36 },
  },
  {
    nombre: "Sin impuesto: 0,1 % de los ingresos por mes",
    origen: { tipo: "recalculado", detalle: "Sin impuesto: 0,1 % × 3 meses = 0,3 % de 20.000 = 60." },
    fecha: "2026-10-07",
    entrada: { impuesto: 0, ingresos: 20000, meses: 3 },
    esperado: { tasa: 0.3, multa: 60 },
  },
  {
    nombre: "Tope del 100 % del impuesto",
    origen: { tipo: "recalculado", detalle: "3 % × 40 meses = 120 %, con tope del 100 %: multa igual al impuesto, 1.000." },
    fecha: "2026-10-07",
    entrada: { impuesto: 1000, ingresos: 0, meses: 40 },
    esperado: { tasa: 100, multa: 1000 },
  },
  {
    nombre: "Tope del 5 % de los ingresos",
    origen: { tipo: "recalculado", detalle: "0,1 % × 60 meses = 6 %, con tope del 5 %: 5 % de 10.000 = 500." },
    fecha: "2026-10-07",
    entrada: { impuesto: 0, ingresos: 10000, meses: 60 },
    esperado: { tasa: 5, multa: 500 },
  },
]);
