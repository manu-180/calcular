import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosSl: TextosUi<UiInteresCompuesto> = {
  slug: "obrestno-obrestni-racun",
  ui: () => ({
    capital: "Začetni vložek",
    aporte: "Mesečni vložek (neobvezno)",
    aporteAyuda: "Koliko boste dodali vsak mesec. Vložek se prišteje ob koncu vsakega meseca.",
    tasa: "Letna obrestna mera (%)",
    anios: "Število let",
    capitalizacion: "Pripis obresti",
    anual: "Letno",
    semestral: "Polletno",
    trimestral: "Četrtletno",
    mensual: "Mesečno",
    diaria: "Dnevno",
    saldo: "Končni znesek",
    aportado: "Skupaj vloženo",
    intereses: "Prislužene obresti",
    tabla: "Rast po letih",
    colAnio: "Leto",
    colAportado: "Vložki",
    colIntereses: "Obresti",
    colSaldo: "Znesek ob koncu leta",
    errorSinDinero: "Vnesite začetni ali mesečni vložek.",
    observacionIntereses: (porcentaje) => `Obresti predstavljajo ${porcentaje} % končnega zneska.`,
  }),
};
