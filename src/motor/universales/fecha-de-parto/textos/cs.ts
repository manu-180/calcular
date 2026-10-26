import { pluralCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosCs: TextosUi<UiFechaDeParto> = {
  slug: "termin-porodu",
  ui: () => ({
    metodo: "Které datum znáte?",
    fum: "První den poslední menstruace",
    concepcion: "Datum početí",
    fecha: "Datum",
    fechaAyuda: "Pokud jste zvolila poslední menstruaci, zadejte první den krvácení.",
    ciclo: "Délka menstruačního cyklu (dny)",
    cicloAyuda: "Použije se jen s datem poslední menstruace. Pokud ji neznáte, nechte 28.",
    fpp: "Předpokládaný termín porodu",
    edadGestacional: "Týden těhotenství dnes",
    trimestre: "Trimestr",
    faltan: "Dní do porodu",
    fechaConcepcion: "Přibližné datum početí",
    semanasYDias: (s, d) => `${pluralCs(s, "týden", "týdny", "týdnů")}${d ? ` a ${pluralCs(d, "den", "dny", "dní")}` : ""}`,
    trimestres: ["První trimestr", "Druhý trimestr", "Třetí trimestr"],
    errorFutura: "Datum nemůže být pozdější než dnešek.",
    errorCiclo: "Délka cyklu musí být mezi 20 a 45 dny.",
    notaPasada: "Od tohoto data uplynulo víc než 42 týdnů, proto týden těhotenství nezobrazujeme.",
    aviso: "Jde o odhad: přesně v předpokládaný den se rodí jen málo dětí. Nejpřesnější termín určí ultrazvuk a prohlídky u vašeho gynekologa nebo porodní asistentky.",
  }),
};
