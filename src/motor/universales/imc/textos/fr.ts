import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosFr: TextosUi<UiImc> = {
  slug: "calcul-imc",
  ui: () => ({
    peso: (u) => `Poids (${u})`,
    altura: (u) => `Taille (${u})`,
    pies: "Taille : pieds (ft)",
    pulgadas: "Taille : pouces (in)",
    imc: "Indice de masse corporelle (IMC)",
    categoria: "Catégorie (OMS)",
    pesoMin: (u) => `Poids normal à partir de (${u})`,
    pesoMax: (u) => `Poids normal jusqu’à (${u})`,
    rangoAyuda: "La fourchette de poids qui donne un IMC normal pour cette taille.",
    bajo: "Insuffisance pondérale",
    normal: "Poids normal",
    sobrepeso: "Surpoids",
    obesidad1: "Obésité modérée",
    obesidad2: "Obésité sévère",
    obesidad3: "Obésité massive",
    errorPeso: "Le poids doit être supérieur à 0.",
    errorAltura: "La taille doit être supérieure à 0.",
    aviso:
      "L’IMC est un repère général pour les adultes : il ne distingue pas le muscle de la graisse et ne s’interprète pas de la même façon pendant la grossesse ni chez l’enfant. Il ne remplace pas l’avis d’un professionnel de santé.",
  }),
};
