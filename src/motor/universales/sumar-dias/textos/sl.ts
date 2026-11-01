import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosSl: TextosUi<UiSumarDias> = {
  slug: "pristej-dneve",
  ui: () => ({
    fecha: "Začetni datum",
    operacion: "Operacija",
    sumar: "Prištevanje dni",
    restar: "Odštevanje dni",
    dias: "Število dni",
    tipo: "Vrsta dni",
    corridos: "Koledarski dnevi",
    habiles: "Delovni dnevi (od ponedeljka do petka)",
    resultado: "Dobljeni datum",
    diaSemana: "Dan v tednu",
    diasCorridos: "Skupno število koledarskih dni",
    nombresDias: ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"],
    errorDias: "Število dni mora biti celo število, obdobje pa ne sme presegati 100 let.",
    notaHabiles: "Delovni dnevi preskočijo sobote in nedelje, ne pa tudi praznikov. Če v to obdobje pade praznik, ga prištejte posebej.",
  }),
};
