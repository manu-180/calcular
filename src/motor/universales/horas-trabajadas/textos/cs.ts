import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosCs: TextosUi<UiHorasTrabajadas> = {
  slug: "odpracovane-hodiny",
  ui: () => ({
    dias: ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"],
    entrada: (dia) => `${dia}: začátek`,
    salida: (dia) => `${dia}: konec`,
    horarioAyuda: "Dny, kdy jste nepracovali, nechte prázdné. Pokud směna končí po půlnoci, počítá se jako stejná směna.",
    pausa: "Neplacená přestávka za den (minuty)",
    pausaAyuda: "Přestávka na jídlo a oddech, která se neplatí. Odečítá se za každý odpracovaný den.",
    pagoHora: "Hodinová mzda",
    umbral: "Běžných hodin za týden (nepovinné)",
    umbralAyuda: "Hodiny nad tento počet se platí jako přesčas. Pokud přesčasy nemáte, nechte pole prázdné.",
    recargo: "Příplatek za přesčas (%)",
    recargoAyuda: "O kolik víc se platí každá hodina přesčasu. 50 % znamená jedenapůlnásobek.",
    horasTotales: "Odpracované hodiny",
    horasReloj: "V hodinách a minutách",
    horasNormales: "Běžné hodiny",
    horasExtra: "Přesčasové hodiny",
    pagoNormal: "Mzda za běžné hodiny",
    pagoExtra: "Mzda za přesčasy",
    pagoTotal: "Celkem za týden",
    tabla: "Po dnech",
    colDia: "Den",
    colEntrada: "Začátek",
    colSalida: "Konec",
    colHoras: "Hodiny",
    errorFaltaSalida: (dia) => `${dia}: chybí čas konce.`,
    errorFaltaEntrada: (dia) => `${dia}: chybí čas začátku.`,
    errorIguales: (dia) => `${dia}: začátek a konec jsou ve stejný čas.`,
    errorPausa: (dia) => `${dia}: přestávka je stejně dlouhá nebo delší než směna.`,
    errorSinDias: "Zadejte začátek a konec alespoň u jednoho dne.",
    observacionNoche: "Některé směny končí až další den: celé se započítají do dne, kdy začaly.",
    observacionGenerico:
      "Jde o obecný výpočet. Nejvyšší délku pracovní doby, pravidla pro přesčasy a příplatky za noční práci a svátky určuje zákon a vaše pracovní smlouva.",
  }),
};
