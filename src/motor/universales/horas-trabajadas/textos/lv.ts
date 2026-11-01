import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosLv: TextosUi<UiHorasTrabajadas> = {
  slug: "nostradato-stundu-kalkulators",
  ui: () => ({
    dias: ["Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"],
    entrada: (dia) => `${dia}: sākums`,
    salida: (dia) => `${dia}: beigas`,
    horarioAyuda: "Brīvdienas atstājiet tukšas. Ja maiņa beidzas pēc pusnakts, to skaita kā to pašu maiņu.",
    pausa: "Neapmaksāts pārtraukums dienā (minūtēs)",
    pausaAyuda: "Pusdienu un atpūtas pārtraukums, par kuru nemaksā. To atņem par katru darba dienu.",
    pagoHora: "Stundas likme",
    umbral: "Parastās stundas nedēļā (nav obligāti)",
    umbralAyuda: "Stundas virs šī skaita apmaksā kā virsstundas. Ja virsstundu nav, atstājiet lauku tukšu.",
    recargo: "Piemaksa par virsstundām (%)",
    recargoAyuda: "Cik vairāk maksā par katru virsstundu. 50% nozīmē pusotru reizi lielāku samaksu.",
    horasTotales: "Nostrādātās stundas",
    horasReloj: "Stundās un minūtēs",
    horasNormales: "Parastās stundas",
    horasExtra: "Virsstundas",
    pagoNormal: "Samaksa par parastajām stundām",
    pagoExtra: "Samaksa par virsstundām",
    pagoTotal: "Kopā nedēļā",
    tabla: "Pa dienām",
    colDia: "Diena",
    colEntrada: "Sākums",
    colSalida: "Beigas",
    colHoras: "Stundas",
    errorFaltaSalida: (dia) => `${dia}: trūkst beigu laika.`,
    errorFaltaEntrada: (dia) => `${dia}: trūkst sākuma laika.`,
    errorIguales: (dia) => `${dia}: sākuma un beigu laiks sakrīt.`,
    errorPausa: (dia) => `${dia}: pārtraukums ir tikpat garš vai garāks par maiņu.`,
    errorSinDias: "Ievadiet sākumu un beigas vismaz vienai dienai.",
    observacionNoche: "Dažas maiņas beidzas nākamajā dienā: tās pilnībā pieskaita dienai, kurā tās sākās.",
    observacionGenerico:
      "Tas ir vispārīgs aprēķins. Maksimālo darba laiku, virsstundu noteikumus un piemaksas par nakts darbu un svētku dienām nosaka likumi un jūsu darba līgums.",
  }),
};
