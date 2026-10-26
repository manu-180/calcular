import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosCs: TextosUi<UiSumarDias> = {
  slug: "pricteni-dni-k-datu",
  ui: () => ({
    fecha: "Výchozí datum",
    operacion: "Operace",
    sumar: "Přičíst dny",
    restar: "Odečíst dny",
    dias: "Počet dní",
    tipo: "Druh dní",
    corridos: "Kalendářní dny",
    habiles: "Pracovní dny (pondělí až pátek)",
    resultado: "Výsledné datum",
    diaSemana: "Den v týdnu",
    diasCorridos: "Kalendářních dní celkem",
    nombresDias: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],
    errorDias: "Počet dní musí být celé číslo, nejvýš za 100 let.",
    notaHabiles: "Pracovní dny vynechávají soboty a neděle, ne však státní svátky. Pokud nějaký svátek do období připadne, přičtěte ho zvlášť.",
  }),
};
