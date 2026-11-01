import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

// Nädalapäevad kirjutatakse eesti keeles väikese tähega. Väljadel on need lause alguses, seega suur algustäht.
const suur = (s: string) => s[0].toUpperCase() + s.slice(1);

// Veateadetes on päev alalütlevas käändes („esmaspäeval“).
const ALALEUTLEV: Readonly<Record<string, string>> = {
  esmaspäev: "esmaspäeval",
  teisipäev: "teisipäeval",
  kolmapäev: "kolmapäeval",
  neljapäev: "neljapäeval",
  reede: "reedel",
  laupäev: "laupäeval",
  pühapäev: "pühapäeval",
};
const paeval = (dia: string) => ALALEUTLEV[dia] ?? dia;

export const textosEt: TextosUi<UiHorasTrabajadas> = {
  slug: "tootundide-kalkulaator",
  ui: () => ({
    dias: ["esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev", "pühapäev"],
    entrada: (dia) => `${suur(dia)}: algus`,
    salida: (dia) => `${suur(dia)}: lõpp`,
    horarioAyuda: "Jäta tühjaks päevad, mil sa tööl ei olnud. Kui lõpetad pärast südaööd, arvestatakse see sama vahetuse hulka.",
    pausa: "Tasustamata paus päevas (minutites)",
    pausaAyuda: "Lõuna või paus, mille eest palka ei maksta. See lahutatakse igast tööpäevast.",
    pagoHora: "Tunnipalk",
    umbral: "Tavaline tööaeg nädalas (valikuline)",
    umbralAyuda: "Seda tundide arvu ületavad tunnid makstakse ületunnitööna. Jäta tühjaks, kui ületunde ei ole.",
    recargo: "Ületunnitöö lisatasu (%)",
    recargoAyuda: "Kui palju rohkem iga ületunni eest makstakse. 50% tähendab poolteist korda suuremat tunnipalka.",
    horasTotales: "Töötatud tunnid",
    horasReloj: "Tundides ja minutites",
    horasNormales: "Tavalised tunnid",
    horasExtra: "Ületunnid",
    pagoNormal: "Palk tavalise tööaja eest",
    pagoExtra: "Tasu ületundide eest",
    pagoTotal: "Nädala palk",
    tabla: "Päevade kaupa",
    colDia: "Päev",
    colEntrada: "Algus",
    colSalida: "Lõpp",
    colHoras: "Tunnid",
    errorFaltaSalida: (dia) => `Lõpuaeg puudub ${paeval(dia)}.`,
    errorFaltaEntrada: (dia) => `Algusaeg puudub ${paeval(dia)}.`,
    errorIguales: (dia) => `Algus ja lõpp on ${paeval(dia)} samal kellaajal.`,
    errorPausa: (dia) => `Paus on ${paeval(dia)} sama pikk kui vahetus või pikem.`,
    errorSinDias: "Sisesta vähemalt ühe päeva algus ja lõpp.",
    observacionNoche: "Osa vahetusi lõpeb järgmisel päeval. Need arvestatakse täielikult selle päeva alla, mil need algavad.",
    observacionGenerico:
      "See on üldine arvutus. Lubatud tööaeg, ületunnitöö reeglid ning õhtuse, öise ja nädalavahetuse töö lisatasud sõltuvad seadusest, kollektiivlepingust ja sinu töölepingust.",
  }),
};
