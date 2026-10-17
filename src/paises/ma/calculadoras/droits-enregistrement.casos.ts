import { definirCasos } from "@/motor/calculo";
import calculadora from "./droits-enregistrement";

export default definirCasos(calculadora, [
  {
    nombre: "Appartement de 900 000 DH",
    origen: { tipo: "recalculado", detalle: "4 % × 900 000 = 36 000." },
    fecha: "2026-10-16",
    entrada: { prix: 900000, bien: "locaux-construits" },
    esperado: { droits: 36000, taux: 4 },
  },
  {
    nombre: "Terrain nu de 500 000 DH",
    origen: { tipo: "recalculado", detalle: "5 % × 500 000 = 25 000." },
    fecha: "2026-10-16",
    entrada: { prix: 500000, bien: "terrains-nus" },
    esperado: { droits: 25000, taux: 5 },
  },
  {
    nombre: "Minimum de perception",
    origen: { tipo: "recalculado", detalle: "4 % × 1 000 = 40, porté au minimum de 100." },
    fecha: "2026-10-16",
    entrada: { prix: 1000, bien: "locaux-construits" },
    esperado: { droits: 100 },
  },
]);
