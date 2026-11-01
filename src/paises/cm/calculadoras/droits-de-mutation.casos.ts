import { definirCasos } from "@/motor/calculo";
import calculadora from "./droits-de-mutation";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "Maison en ville à 30 millions",
    origen: { tipo: "recalculado", detalle: "Article C 57 a) : 10 % × 30 000 000 = 3 000 000 F." },
    fecha: F,
    entrada: { prix: 30000000, nature: "urbain-bati" },
    esperado: { taux: 10, droits: 3000000, total: 33000000 },
  },
  {
    nombre: "Terrain urbain à 8 millions",
    origen: { tipo: "recalculado", detalle: "Article C 57 b) : 5 % × 8 000 000 = 400 000 F." },
    fecha: F,
    entrada: { prix: 8000000, nature: "urbain-non-bati" },
    esperado: { droits: 400000 },
  },
  {
    nombre: "Terrain rural à 2 millions",
    origen: { tipo: "recalculado", detalle: "Article C 57 c) : 2 % × 2 000 000 = 40 000 F." },
    fecha: F,
    entrada: { prix: 2000000, nature: "rural-non-bati" },
    esperado: { droits: 40000 },
  },
]);
