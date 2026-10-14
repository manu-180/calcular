import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosFr: TextosUi<UiPromedio> = {
  slug: "calcul-moyenne-coefficient",
  ui: () => ({
    nota: (n) => `Note ${n}`,
    notaAyuda: "Saisissez chaque note ou valeur avec son coefficient. Laissez vides les lignes inutiles.",
    peso: (n) => `Coefficient ${n}`,
    pesoAyuda: "Un pourcentage, des crédits ECTS ou le nombre de fois où la note compte. Sans coefficient, toutes les notes comptent pareil.",
    ponderado: "Moyenne pondérée",
    simple: "Moyenne simple",
    cantidad: "Nombre de notes",
    sumaPesos: "Somme des coefficients",
    errorSinNotas: "Saisissez au moins une note.",
    errorFaltaPeso: "Cette note n’a pas de coefficient. Si vous en utilisez, remplissez-les pour toutes les notes.",
    errorFaltaNota: "Ce coefficient n’a pas de note. Saisissez la note ou effacez le coefficient.",
    errorPesosCero: "La somme des coefficients est nulle : au moins un doit être supérieur à zéro.",
    sinPesos: "Sans coefficient, la moyenne pondérée est égale à la moyenne simple.",
  }),
};
