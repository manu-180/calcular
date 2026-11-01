import { pluralLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosLv: TextosUi<UiFechaDeParto> = {
  slug: "dzemdibu-datuma-kalkulators",
  ui: () => ({
    metodo: "Kuru datumu zināt?",
    fum: "Pēdējo mēnešreižu pirmā diena",
    concepcion: "Ieņemšanas datums",
    fecha: "Datums",
    fechaAyuda: "Ja izvēlētas pēdējās mēnešreizes, ievadiet asiņošanas pirmo dienu.",
    ciclo: "Menstruālā cikla ilgums (dienās)",
    cicloAyuda: "Izmanto tikai ar pēdējo mēnešreižu datumu. Ja ilgumu nezināt, atstājiet 28.",
    fpp: "Paredzamais dzemdību datums",
    edadGestacional: "Grūtniecības nedēļa šodien",
    trimestre: "Trimestris",
    faltan: "Dienas līdz dzemdībām",
    fechaConcepcion: "Aptuvenais ieņemšanas datums",
    semanasYDias: (s, d) => `${pluralLv(s, "nedēļa", "nedēļas", "nedēļu")}${d ? ` un ${pluralLv(d, "diena", "dienas", "dienu")}` : ""}`,
    trimestres: ["Pirmais trimestris", "Otrais trimestris", "Trešais trimestris"],
    errorFutura: "Datums nevar būt vēlāks par šodienu.",
    errorCiclo: "Cikla ilgumam jābūt no 20 līdz 45 dienām.",
    notaPasada: "Kopš šī datuma pagājušas vairāk nekā 42 nedēļas, tāpēc grūtniecības nedēļu nerādām.",
    aviso: "Tas ir aptuvens novērtējums: precīzi paredzētajā dienā piedzimst nedaudz bērnu. Visprecīzāko datumu nosaka ultrasonogrāfija un vizītes pie ārsta vai vecmātes.",
  }),
};
