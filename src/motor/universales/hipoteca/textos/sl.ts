import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosSl: TextosUi<UiHipoteca> = {
  slug: "stanovanjski-kredit",
  ui: () => ({
    precio: "Cena nepremičnine",
    entradaPorcentaje: "Lastna sredstva (% cene)",
    entradaMonto: "Lastna sredstva v znesku (neobvezno)",
    entradaMontoAyuda: "Če vnesete znesek, ta nadomesti odstotek.",
    tasa: "Letna obrestna mera (%)",
    anios: "Doba odplačila (leta)",
    gastos: "Mesečni stroški stanovanja (neobvezno)",
    gastosAyuda: "Zavarovanje nepremičnine, davek na nepremičnine ali stroški upravljanja stavbe, ki jih plačujete poleg obroka.",
    cuota: "Mesečni obrok kredita",
    cuotaTotal: "Mesečni obrok s stroški",
    entrada: "Lastna sredstva",
    prestado: "Znesek kredita",
    intereses: "Skupne obresti",
    total: "Skupaj v obrokih",
    tabla: "Po letih",
    colAnio: "Leto",
    colIntereses: "Plačane obresti",
    colCapital: "Odplačana glavnica",
    colSaldo: "Preostali dolg ob koncu leta",
    errorPrecio: "Vnesite ceno nepremičnine.",
    errorEntrada: "Lastna sredstva pokrivajo celotno ceno, zato kredita ne potrebujete. Zmanjšajte lastna sredstva.",
    observacionPrestado: (porcentaje) => `Izposojate si ${porcentaje} % cene nepremičnine. Večji ko je ta delež, strožje pogoje običajno zahteva banka.`,
    observacionCostos: "Stroški odobritve kredita (cenitev nepremičnine, nadomestila, overitev pogodbe, vpis hipoteke) niso všteti. Predvidite jih poleg lastnih sredstev.",
  }),
};
