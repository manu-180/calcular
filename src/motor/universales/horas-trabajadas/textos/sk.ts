import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosSk: TextosUi<UiHorasTrabajadas> = {
  slug: "odpracovane-hodiny",
  ui: () => ({
    dias: ["Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"],
    entrada: (dia) => `${dia}: začiatok`,
    salida: (dia) => `${dia}: koniec`,
    horarioAyuda: "Dni, keď ste nepracovali, nechajte prázdne. Ak sa zmena končí po polnoci, počíta sa ako tá istá zmena.",
    pausa: "Neplatená prestávka za deň (minúty)",
    pausaAyuda: "Prestávka na jedlo a oddych, ktorá sa neplatí. Odpočítava sa za každý odpracovaný deň.",
    pagoHora: "Hodinová mzda",
    umbral: "Bežných hodín za týždeň (nepovinné)",
    umbralAyuda: "Hodiny nad tento počet sa platia ako nadčas. Ak nadčasy nemáte, pole nechajte prázdne.",
    recargo: "Príplatok za nadčas (%)",
    recargoAyuda: "O koľko viac sa platí každá hodina nadčasu. 50 % znamená jedenapolnásobok.",
    horasTotales: "Odpracované hodiny",
    horasReloj: "V hodinách a minútach",
    horasNormales: "Bežné hodiny",
    horasExtra: "Nadčasové hodiny",
    pagoNormal: "Mzda za bežné hodiny",
    pagoExtra: "Mzda za nadčasy",
    pagoTotal: "Spolu za týždeň",
    tabla: "Po dňoch",
    colDia: "Deň",
    colEntrada: "Začiatok",
    colSalida: "Koniec",
    colHoras: "Hodiny",
    errorFaltaSalida: (dia) => `${dia}: chýba čas konca.`,
    errorFaltaEntrada: (dia) => `${dia}: chýba čas začiatku.`,
    errorIguales: (dia) => `${dia}: začiatok a koniec sú v rovnakom čase.`,
    errorPausa: (dia) => `${dia}: prestávka je rovnako dlhá alebo dlhšia ako zmena.`,
    errorSinDias: "Zadajte začiatok a koniec aspoň pri jednom dni.",
    observacionNoche: "Niektoré zmeny sa končia až na druhý deň: celé sa započítajú do dňa, keď sa začali.",
    observacionGenerico:
      "Ide o všeobecný výpočet. Najdlhší pracovný čas, pravidlá pre nadčasy a príplatky za nočnú prácu a sviatky určuje zákon a vaša pracovná zmluva.",
  }),
};
