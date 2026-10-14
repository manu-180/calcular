import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosFr: TextosUi<UiPorcentaje> = {
  slug: "calcul-pourcentage",
  ui: () => ({
    modo: "Que voulez-vous calculer ?",
    modoParte: "Combien font X % de Y ?",
    modoProporcion: "X représente quel pourcentage de Y ?",
    modoAumento: "Y augmenté de X %",
    modoRebaja: "Y diminué de X %",
    x: "Nombre X",
    xAyuda: "Le pourcentage. Si vous choisissez « X représente quel pourcentage de Y ? », c’est la partie.",
    y: "Nombre Y",
    resultado: "Résultat",
    porcentaje: "Pourcentage",
    diferencia: "Montant ajouté ou retiré",
    errorYCero: "Y ne peut pas être égal à 0 : on ne calcule pas un pourcentage de zéro.",
    fraseParte: (x, y, r) => `${x} % de ${y} font ${r}.`,
    fraseProporcion: (x, y, p) => `${x} représente ${p} % de ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} augmenté de ${x} % donne ${r} : on ajoute ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} diminué de ${x} % donne ${r} : on retire ${d}.`,
  }),
};
