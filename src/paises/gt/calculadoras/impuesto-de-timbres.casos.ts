import { definirCasos } from "@/motor/calculo";
import impuestoDeTimbres from "./impuesto-de-timbres";

export default definirCasos(impuestoDeTimbres, [
  {
    nombre: "Contrato de Q100,000",
    origen: { tipo: "recalculado", detalle: "Decreto 37-92 art. 4: 3 % de 100000 = 3000." },
    fecha: "2026-10-12",
    entrada: { valor: 100000 },
    esperado: { tasa: 3, impuesto: 3000 },
  },
  {
    nombre: "Documento de Q2,500",
    origen: { tipo: "recalculado", detalle: "3 % de 2500 = 75." },
    fecha: "2026-10-12",
    entrada: { valor: 2500 },
    esperado: { impuesto: 75 },
  },
]);
