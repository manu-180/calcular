import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosHu: TextosUi<UiHorasTrabajadas> = {
  slug: "munkaido-kalkulator",
  ui: () => ({
    dias: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
    entrada: (dia) => `${dia}: kezdés`,
    salida: (dia) => `${dia}: befejezés`,
    horarioAyuda: "Azokat a napokat, amikor nem dolgoztál, hagyd üresen. Ha éjfél után végzel, az ugyanannak a műszaknak számít.",
    pausa: "Nem fizetett szünet naponta (perc)",
    pausaAyuda: "Ebéd- vagy pihenőidő, amelyet nem fizetnek ki. Minden ledolgozott napból levonjuk.",
    pagoHora: "Órabér",
    umbral: "Rendes munkaórák hetente (nem kötelező)",
    umbralAyuda: "Az e fölötti órákat túlórapótlékkal fizetik. Ha nincs túlóra, hagyd üresen.",
    recargo: "Túlórapótlék (%)",
    recargoAyuda: "Ennyivel fizet többet minden túlóra. Az 50 százalék másfélszeres díjazást jelent.",
    horasTotales: "Ledolgozott órák",
    horasReloj: "Órában és percben",
    horasNormales: "Rendes munkaórák",
    horasExtra: "Túlórák",
    pagoNormal: "Bér a rendes munkaórákért",
    pagoExtra: "Bér a túlórákért",
    pagoTotal: "Heti bér összesen",
    tabla: "Napról napra",
    colDia: "Nap",
    colEntrada: "Kezdés",
    colSalida: "Befejezés",
    colHoras: "Órák",
    errorFaltaSalida: (dia) => `Hiányzik a befejezés ideje ezen a napon: ${dia}.`,
    errorFaltaEntrada: (dia) => `Hiányzik a kezdés ideje ezen a napon: ${dia}.`,
    errorIguales: (dia) => `A kezdés és a befejezés ideje ugyanaz ezen a napon: ${dia}.`,
    errorPausa: (dia) => `A szünet ugyanolyan hosszú vagy hosszabb, mint a műszak ezen a napon: ${dia}.`,
    errorSinDias: "Legalább egy napnál add meg a kezdés és a befejezés idejét.",
    observacionNoche: "Néhány műszak másnap ér véget: ezek teljes egészében a kezdés napjához számítanak.",
    observacionGenerico:
      "Ez általános számítás. A munkaidő felső határa, a túlóra szabályai, valamint az éjszakai és ünnepnapi munka díjazása a jogszabályoktól és a munkaszerződésedtől függ.",
  }),
};
