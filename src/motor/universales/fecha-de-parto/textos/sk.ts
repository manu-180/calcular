import { pluralSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosSk: TextosUi<UiFechaDeParto> = {
  slug: "termin-porodu",
  ui: () => ({
    metodo: "Ktorý dátum poznáte?",
    fum: "Prvý deň poslednej menštruácie",
    concepcion: "Dátum počatia",
    fecha: "Dátum",
    fechaAyuda: "Ak vychádzate z poslednej menštruácie, zadajte prvý deň krvácania.",
    ciclo: "Dĺžka menštruačného cyklu (dni)",
    cicloAyuda: "Použije sa len s dátumom poslednej menštruácie. Ak ju nepoznáte, nechajte 28.",
    fpp: "Predpokladaný termín pôrodu",
    edadGestacional: "Týždeň tehotenstva dnes",
    trimestre: "Trimester",
    faltan: "Dní do pôrodu",
    fechaConcepcion: "Približný dátum počatia",
    semanasYDias: (s, d) => `${pluralSk(s, "týždeň", "týždne", "týždňov")}${d ? ` a ${pluralSk(d, "deň", "dni", "dní")}` : ""}`,
    trimestres: ["Prvý trimester", "Druhý trimester", "Tretí trimester"],
    errorFutura: "Dátum nemôže byť neskorší ako dnešok.",
    errorCiclo: "Dĺžka cyklu musí byť od 20 do 45 dní.",
    notaPasada: "Od tohto dátumu uplynulo viac ako 42 týždňov, preto týždeň tehotenstva nezobrazujeme.",
    aviso: "Ide o odhad: presne v predpokladaný deň sa rodí len málo detí. Najpresnejší termín určí ultrazvuk a prehliadky u vášho gynekológa alebo pôrodnej asistentky.",
  }),
};
