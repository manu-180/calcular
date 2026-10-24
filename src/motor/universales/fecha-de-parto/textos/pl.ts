import { pluralPl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosPl: TextosUi<UiFechaDeParto> = {
  slug: "kalkulator-ciazy",
  ui: () => ({
    metodo: "Którą datę znasz?",
    fum: "Pierwszy dzień ostatniej miesiączki",
    concepcion: "Data poczęcia",
    fecha: "Data",
    fechaAyuda: "Jeśli wybierasz ostatnią miesiączkę, wpisz pierwszy dzień krwawienia.",
    ciclo: "Długość cyklu (dni)",
    cicloAyuda: "Używana tylko przy ostatniej miesiączce. Jeśli jej nie znasz, zostaw 28.",
    fpp: "Przewidywany termin porodu",
    edadGestacional: "Tydzień ciąży na dziś",
    trimestre: "Trymestr",
    faltan: "Zostało dni",
    fechaConcepcion: "Przybliżona data poczęcia",
    semanasYDias: (s, d) => `${pluralPl(s, "tydzień", "tygodnie", "tygodni")}${d ? ` i ${pluralPl(d, "dzień", "dni", "dni")}` : ""}`,
    trimestres: ["Pierwszy trymestr", "Drugi trymestr", "Trzeci trymestr"],
    errorFutura: "Data nie może być późniejsza niż dzisiejsza.",
    errorCiclo: "Długość cyklu musi wynosić od 20 do 45 dni.",
    notaPasada: "Od tej daty minęło ponad 42 tygodnie, więc nie pokazujemy tygodnia ciąży.",
    aviso: "To szacunek: niewiele dzieci rodzi się dokładnie w wyznaczonym terminie. Najdokładniejszą datę ustali lekarz albo położna na podstawie USG i wizyt kontrolnych. Kalkulator nie zastępuje konsultacji ze specjalistą.",
  }),
};
