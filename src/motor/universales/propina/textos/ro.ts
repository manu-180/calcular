import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosRo: TextosUi<UiPropina> = {
  slug: "calculator-bacsis",
  ui: () => ({
    cuenta: "Valoarea notei de plată",
    porcentaje: "Bacșiș (%)",
    porcentajeAyuda: "Obiceiurile diferă de la o țară la alta și de la un local la altul. Alegeți ce vi se pare potrivit.",
    personas: "Numărul de persoane care plătesc",
    redondear: "Rotunjiți în sus partea fiecăruia",
    redondearAyuda: "Astfel fiecare plătește o sumă rotundă. Diferența se adaugă la bacșiș.",
    propina: "Bacșiș",
    total: "Total cu bacșiș",
    porPersona: "Plătește fiecare",
    propinaEfectiva: "Bacșiș după rotunjire",
    errorPersonas: "Trebuie să plătească cel puțin o persoană.",
    observacionRedondeo: (efectiva) => `După rotunjire, bacșișul reprezintă ${efectiva}% din nota de plată.`,
  }),
};
