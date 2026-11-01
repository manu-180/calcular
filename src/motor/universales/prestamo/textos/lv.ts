import { formaLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosLv: TextosUi<UiPrestamo> = {
  slug: "kredita-kalkulators",
  ui: () => ({
    monto: "Kredīta summa",
    tasa: "Gada procentu likme (%)",
    tasaAyuda: "Nominālā gada procentu likme, kas norādīta piedāvājumā. Komisijas maksas tajā nav iekļautas, tās parāda GPL.",
    meses: "Atmaksas termiņš mēnešos",
    extra: "Papildu maksājums katru mēnesi (nav obligāts)",
    extraAyuda: "Cik katru mēnesi maksātu papildus, lai kredītu atmaksātu ātrāk. Visa šī summa samazina kredīta atlikumu.",
    cuota: "Ikmēneša maksājums",
    intereses: "Procenti kopā",
    total: "Kopā samaksāsiet",
    mesesReales: "Mēnešu skaits ar papildu maksājumu",
    ahorro: "Ietaupīsiet procentos",
    tabla: "Atmaksas grafiks",
    colMes: "Mēnesis",
    colPago: "Maksājums",
    colInteres: "Procenti",
    colCapital: "Pamatsumma",
    colSaldo: "Atlikums",
    errorMonto: "Ievadiet summu, kas lielāka par nulli.",
    observacionCostos: "Maksājumā nav iekļauta apdrošināšana, komisijas maksas un citas izmaksas, ko var pieskaitīt kreditors. Pirms līguma parakstīšanas pajautājiet GPL un kopējo maksājamo summu.",
    observacionExtra: (meses, ahorro) =>
      `Ar papildu maksājumu atmaksas ilgums ir ${meses} ${formaLv(meses.replace(/\D/g, ""), "mēnesis", "mēneši", "mēnešu")}, un procentos ietaupīsiet ${ahorro}.`,
  }),
};
