import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosSl: TextosUi<UiHorasTrabajadas> = {
  slug: "izracun-delovnih-ur",
  ui: () => ({
    dias: ["Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota", "Nedelja"],
    entrada: (dia) => `${dia}: začetek`,
    salida: (dia) => `${dia}: konec`,
    horarioAyuda: "Dneve, ko niste delali, pustite prazne. Če se izmena konča po polnoči, se šteje kot ista izmena.",
    pausa: "Neplačan odmor na dan (minute)",
    pausaAyuda: "Odmor za malico in počitek, ki ni plačan. Odšteje se za vsak delovni dan.",
    pagoHora: "Urna postavka",
    umbral: "Redne ure na teden (neobvezno)",
    umbralAyuda: "Ure nad tem številom se plačajo kot nadure. Če nadur nimate, pustite polje prazno.",
    recargo: "Dodatek za nadure (%)",
    recargoAyuda: "Koliko več se plača vsaka nadura. 50 % pomeni uro in pol.",
    horasTotales: "Delovne ure",
    horasReloj: "V urah in minutah",
    horasNormales: "Redne ure",
    horasExtra: "Nadure",
    pagoNormal: "Znesek za redne ure",
    pagoExtra: "Znesek za nadure",
    pagoTotal: "Skupaj za teden",
    tabla: "Po dnevih",
    colDia: "Dan",
    colEntrada: "Začetek",
    colSalida: "Konec",
    colHoras: "Ure",
    errorFaltaSalida: (dia) => `${dia}: manjka čas konca.`,
    errorFaltaEntrada: (dia) => `${dia}: manjka čas začetka.`,
    errorIguales: (dia) => `${dia}: začetek in konec sta ob istem času.`,
    errorPausa: (dia) => `${dia}: odmor traja toliko kot izmena ali dlje.`,
    errorSinDias: "Vnesite začetek in konec vsaj za en dan.",
    observacionNoche: "Nekatere izmene se končajo naslednji dan: v celoti se štejejo v dan, ko so se začele.",
    observacionGenerico:
      "To je splošen izračun. Najdaljši delovni čas, pravila za nadure in dodatke za nočno delo ter praznike določata zakon in vaša pogodba o zaposlitvi.",
  }),
};
