import { definirCasos } from "@/motor/calculo";
import cotisationsSociales from "./cotisations-sociales";

const CCSS = "https://ccss.public.lu/fr/parametres-sociaux.html";

export default definirCasos(cotisationsSociales, [
  {
    nombre: "5000 euros bruts",
    origen: { tipo: "recalculado", url: CCSS, detalle: "Maladie (5,60 + 0,50) / 2 = 3,05 % : 152,50. Pension 17 / 2 = 8,5 % : 425. Dépendance 1,4 % de (5000 - 692,83) : 60,30. Total 637,80." },
    fecha: "2026-10-16",
    entrada: { brut: 5000 },
    esperado: { maladie: 152.5, pension: 425, dependance: 60.3, total: 637.8, annuel: 7653.6, part: 12.756 },
    tolerancia: 0.001,
  },
  {
    nombre: "Salaire au-dessus du maximum cotisable",
    origen: { tipo: "recalculado", url: CCSS, detalle: "Assiette maladie et pension 13 856,63 ; dépendance sur 20 000 - 692,83." },
    fecha: "2026-10-16",
    entrada: { brut: 20000 },
    esperado: { assiette: 13856.63, maladie: 422.63, pension: 1177.81, dependance: 270.3 },
  },
]);
