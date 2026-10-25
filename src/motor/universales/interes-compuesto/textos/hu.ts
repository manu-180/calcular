import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosHu: TextosUi<UiInteresCompuesto> = {
  slug: "kamatos-kamat-kalkulator",
  ui: () => ({
    capital: "Kezdőösszeg",
    aporte: "Havi befizetés (nem kötelező)",
    aporteAyuda: "Ennyit teszel hozzá minden hónapban. A befizetés a hónap végén kerül a számlára.",
    tasa: "Éves kamat (%)",
    anios: "Évek száma",
    capitalizacion: "Tőkésítés",
    anual: "Évente",
    semestral: "Félévente",
    trimestral: "Negyedévente",
    mensual: "Havonta",
    diaria: "Naponta",
    saldo: "Végösszeg",
    aportado: "Befizetések összesen",
    intereses: "Kamatjövedelem",
    tabla: "Növekedés évről évre",
    colAnio: "Év",
    colAportado: "Befizetések",
    colIntereses: "Kamat",
    colSaldo: "Egyenleg az év végén",
    errorSinDinero: "Adj meg kezdőösszeget vagy havi befizetést.",
    observacionIntereses: (porcentaje) => `A végösszegből a kamat aránya: ${porcentaje}%.`,
  }),
};
