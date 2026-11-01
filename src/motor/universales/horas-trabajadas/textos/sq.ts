import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosSq: TextosUi<UiHorasTrabajadas> = {
  slug: "kalkulator-ore-pune",
  ui: () => ({
    dias: ["E hënë", "E martë", "E mërkurë", "E enjte", "E premte", "E shtunë", "E diel"],
    entrada: (dia) => `${dia}: ora e fillimit`,
    salida: (dia) => `${dia}: ora e mbarimit`,
    horarioAyuda: "Lini bosh ditët kur nuk keni punuar. Nëse mbaroni pas mesnate, llogaritet si i njëjti turn.",
    pausa: "Pushim i papaguar në ditë (minuta)",
    pausaAyuda: "Pushimi i drekës ose i çlodhjes që nuk paguhet. Zbritet nga çdo ditë pune.",
    pagoHora: "Pagesa për orë",
    umbral: "Orë normale në javë (opsionale)",
    umbralAyuda: "Orët mbi këtë numër paguhen si orë shtesë. Lëreni fushën bosh nëse nuk ka orë shtesë.",
    recargo: "Rritja e pagesës për orët shtesë (%)",
    recargoAyuda: "Sa më shumë paguhet çdo orë shtesë. 50% do të thotë një herë e gjysmë pagesa normale.",
    horasTotales: "Orë të punuara",
    horasReloj: "Në orë dhe minuta",
    horasNormales: "Orë normale",
    horasExtra: "Orë shtesë",
    pagoNormal: "Pagesa për orët normale",
    pagoExtra: "Pagesa për orët shtesë",
    pagoTotal: "Totali për t'u paguar në javë",
    tabla: "Ditë pas dite",
    colDia: "Dita",
    colEntrada: "Fillimi",
    colSalida: "Mbarimi",
    colHoras: "Orë",
    errorFaltaSalida: (dia) => `${dia}: mungon ora e mbarimit.`,
    errorFaltaEntrada: (dia) => `${dia}: mungon ora e fillimit.`,
    errorIguales: (dia) => `${dia}: ora e fillimit dhe ora e mbarimit janë të njëjta.`,
    errorPausa: (dia) => `${dia}: pushimi është po aq i gjatë sa turni ose më i gjatë.`,
    errorSinDias: "Plotësoni orën e fillimit dhe orën e mbarimit për të paktën një ditë.",
    observacionNoche: "Disa turne mbarojnë ditën tjetër: llogariten të plota në ditën kur fillojnë.",
    observacionGenerico:
      "Kjo është një llogaritje e përgjithshme. Numri maksimal i orëve, rregullat për orët shtesë dhe pagesa për punën e natës ose të festave varen nga ligji dhe nga kontrata e punës.",
  }),
};
