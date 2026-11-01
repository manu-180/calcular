import { definirCasos } from "@/motor/calculo";
import calculadora from "./bnd-to-sgd";

export default definirCasos(calculadora, [
  {
    nombre: "BND 1,000 to SGD",
    origen: { tipo: "recalculado", detalle: "At par, 1,000 BND is 1,000 SGD." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, sentido: "bnd-sgd" },
    esperado: { resultado: 1000, tasa: 1 },
  },
  {
    nombre: "SGD 250 to BND",
    origen: { tipo: "recalculado", detalle: "At par, 250 SGD is 250 BND." },
    fecha: "2026-10-29",
    entrada: { importe: 250, sentido: "sgd-bnd" },
    esperado: { resultado: 250 },
  },
  {
    nombre: "Nothing to convert",
    origen: { tipo: "recalculado", detalle: "Zero is rejected." },
    fecha: "2026-10-29",
    entrada: { importe: 0, sentido: "bnd-sgd" },
    esperaError: true,
  },
]);
