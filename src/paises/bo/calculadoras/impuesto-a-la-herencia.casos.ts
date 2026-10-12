import { definirCasos } from "@/motor/calculo";
import impuestoALaHerencia from "./impuesto-a-la-herencia";

const L843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(impuestoALaHerencia, [
  {
    nombre: "Hija que hereda una casa de Bs 500.000",
    origen: { tipo: "recalculado", url: L843, detalle: "Ley 843 art. 102 a): descendientes 1 %. 500.000 × 1 % = 5.000." },
    fecha: "2026-10-12",
    entrada: { parentesco: "directos", valor: 500000 },
    esperado: { alicuota: 1, impuesto: 5000 },
  },
  {
    nombre: "Hermano que recibe Bs 200.000",
    origen: { tipo: "recalculado", url: L843, detalle: "Art. 102 b): hermanos 10 %. 20.000." },
    fecha: "2026-10-12",
    entrada: { parentesco: "hermanos", valor: 200000 },
    esperado: { alicuota: 10, impuesto: 20000 },
  },
  {
    nombre: "Donación a un amigo",
    origen: { tipo: "recalculado", detalle: "Art. 102 c): donatarios 20 %. 100.000 × 20 % = 20.000." },
    fecha: "2026-10-12",
    entrada: { parentesco: "otros", valor: 100000 },
    esperado: { alicuota: 20, impuesto: 20000 },
  },
]);
