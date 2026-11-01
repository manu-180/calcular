import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosHy: TextosUi<UiOvulacion> = {
  slug: "ovulyatsiayi-hashvich",
  ui: () => ({
    fum: "Վերջին դաշտանի առաջին օրը",
    fumAyuda: "Արյունահոսության առաջին օրը, ոչ թե վերջինը։",
    ciclo: "Ցիկլի տևողություն (օր)",
    cicloAyuda: "Մեկ դաշտանի առաջին օրից մինչև հաջորդ դաշտանին նախորդող օրը։ Եթե այն փոփոխվում է, մուտքագրեք միջին արժեքը։",
    ovulacion: "Ակնկալվող օվուլյացիա",
    fertilDesde: "Պտղաբեր օրերի սկիզբ",
    fertilHasta: "Պտղաբեր օրերի ավարտ",
    proxima: "Հաջորդ դաշտան",
    tabla: "Հաջորդ ցիկլերը",
    colRegla: "Դաշտան",
    colDesde: "Պտղաբեր՝ սկիզբ",
    colHasta: "Պտղաբեր՝ ավարտ",
    colOvulacion: "Օվուլյացիա",
    errorCiclo: "Ցիկլի տևողությունը պետք է լինի 21 և 45 օրվա միջև։",
    aviso: "Սա մոտավոր գնահատական է կանոնավոր ցիկլի համար։ Այն հակաբեղմնավորման մեթոդ չէ և չի փոխարինում բժշկի խորհրդատվությանը։",
  }),
};
