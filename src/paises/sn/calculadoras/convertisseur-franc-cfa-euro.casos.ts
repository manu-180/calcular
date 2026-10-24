import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-franc-cfa-euro";

export default definirCasos(calculadora, [
  {
    nombre: "100 euros",
    origen: { tipo: "recalculado", detalle: "100 × 655,957 = 65 595,7." },
    fecha: "2026-10-18",
    entrada: { sens: "eur-xof", montant: 100 },
    esperado: { resultat: 65595.7 },
  },
]);
