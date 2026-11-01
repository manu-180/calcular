import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosSk: TextosUi<UiSumarDias> = {
  slug: "pripocitanie-dni-k-datumu",
  ui: () => ({
    fecha: "Východiskový dátum",
    operacion: "Operácia",
    sumar: "Pripočítať dni",
    restar: "Odpočítať dni",
    dias: "Počet dní",
    tipo: "Druh dní",
    corridos: "Kalendárne dni",
    habiles: "Pracovné dni (pondelok až piatok)",
    resultado: "Výsledný dátum",
    diaSemana: "Deň v týždni",
    diasCorridos: "Kalendárnych dní spolu",
    nombresDias: ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"],
    errorDias: "Počet dní musí byť celé číslo, najviac za 100 rokov.",
    notaHabiles: "Pracovné dni vynechávajú soboty a nedele, nie však štátne sviatky. Ak na obdobie pripadne nejaký sviatok, pripočítajte ho osobitne.",
  }),
};
