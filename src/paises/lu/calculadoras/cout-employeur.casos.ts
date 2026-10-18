import { definirCasos } from "@/motor/calculo";
import coutEmployeur from "./cout-employeur";

const CCSS = "https://ccss.public.lu/fr/parametres-sociaux.html";

export default definirCasos(coutEmployeur, [
  {
    nombre: "5000 euros, mutualité classe 2",
    origen: { tipo: "recalculado", url: CCSS, detalle: "Maladie 3,05 % = 152,50 ; pension 8,5 % = 425 ; accident 0,65 % = 32,50 ; santé au travail 0,14 % = 7 ; mutualité classe 2 0,95 % = 47,50. Charges 664,50, coût 5664,50." },
    fecha: "2026-10-16",
    entrada: { brut: 5000, mutualite: "classe-2" },
    esperado: { maladie: 152.5, pension: 425, accident: 32.5, sante: 7, mutualite: 47.5, charges: 664.5, cout: 5664.5, annuel: 67974 },
  },
  {
    nombre: "Au-dessus du maximum cotisable, classe 1",
    origen: { tipo: "recalculado", url: CCSS, detalle: "Assiette 13 856,63 : maladie 422,63 ; pension 1177,81 ; accident 90,07 ; santé 19,40 ; mutualité 0,23 % 31,87. Charges 1741,78." },
    fecha: "2026-10-16",
    entrada: { brut: 15000, mutualite: "classe-1" },
    esperado: { charges: 1741.78, cout: 16741.78 },
  },
]);
