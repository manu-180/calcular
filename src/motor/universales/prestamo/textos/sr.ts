import { formaSr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosSr: TextosUi<UiPrestamo> = {
  slug: "kalkulator-kredita",
  ui: () => ({
    monto: "Iznos kredita",
    tasa: "Godišnja kamatna stopa (%)",
    tasaAyuda: "Nominalna godišnja kamatna stopa iz ponude. Naknade nisu uključene, njih obuhvata EKS.",
    meses: "Rok otplate u mesecima",
    extra: "Dodatna uplata mesečno (nije obavezno)",
    extraAyuda: "Koliko biste svakog meseca uplatili više da kredit otplatite ranije. Ceo iznos smanjuje glavnicu.",
    cuota: "Mesečna rata",
    intereses: "Ukupna kamata",
    total: "Ukupno ćete platiti",
    mesesReales: "Broj meseci sa dodatnom uplatom",
    ahorro: "Ušteda na kamati",
    tabla: "Plan otplate",
    colMes: "Mesec",
    colPago: "Rata",
    colInteres: "Kamata",
    colCapital: "Glavnica",
    colSaldo: "Preostali dug",
    errorMonto: "Unesite iznos veći od nule.",
    observacionCostos: "Rata ne obuhvata osiguranje, naknade ni poreze koje banka može da doda. Pre potpisivanja ugovora pitajte za EKS i ukupan iznos za otplatu.",
    observacionExtra: (meses, ahorro) =>
      `Sa dodatnom uplatom kredit otplaćujete za ${meses} ${formaSr(meses.replace(/\D/g, ""), "mesec", "meseca", "meseci")} i na kamati štedite ${ahorro}.`,
  }),
};
