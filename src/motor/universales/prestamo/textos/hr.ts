import { formaHr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosHr: TextosUi<UiPrestamo> = {
  slug: "kalkulator-kredita",
  ui: () => ({
    monto: "Iznos kredita",
    tasa: "Godišnja kamatna stopa (%)",
    tasaAyuda: "Nominalna godišnja kamatna stopa iz ponude. Naknade nisu uključene, njih obuhvaća EKS.",
    meses: "Rok otplate u mjesecima",
    extra: "Dodatna uplata mjesečno (neobavezno)",
    extraAyuda: "Koliko biste svakog mjeseca uplatili više kako biste kredit otplatili ranije. Cijeli iznos smanjuje glavnicu.",
    cuota: "Mjesečna rata",
    intereses: "Ukupna kamata",
    total: "Ukupno ćete platiti",
    mesesReales: "Broj mjeseci s dodatnom uplatom",
    ahorro: "Ušteda na kamati",
    tabla: "Plan otplate",
    colMes: "Mjesec",
    colPago: "Rata",
    colInteres: "Kamata",
    colCapital: "Glavnica",
    colSaldo: "Preostali dug",
    errorMonto: "Unesite iznos veći od nule.",
    observacionCostos: "Rata ne obuhvaća osiguranje, naknade ni poreze koje banka može dodati. Prije potpisivanja ugovora pitajte za EKS i ukupni iznos za otplatu.",
    observacionExtra: (meses, ahorro) =>
      `S dodatnom uplatom kredit otplaćujete za ${meses} ${formaHr(meses.replace(/\D/g, ""), "mjesec", "mjeseca", "mjeseci")} i na kamati štedite ${ahorro}.`,
  }),
};
