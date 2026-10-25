import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosHu: TextosUi<UiPrestamo> = {
  slug: "hitelkalkulator",
  ui: () => ({
    monto: "Hitelösszeg",
    tasa: "Éves kamat (%)",
    tasaAyuda: "Az ajánlatban szereplő éves névleges kamat. A díjak nincsenek benne, azokat a THM mutatja.",
    meses: "Futamidő hónapban",
    extra: "Havi plusz törlesztés (nem kötelező)",
    extraAyuda: "Ennyit fizetnél be minden hónapban a részleten felül, hogy hamarabb végezz. Az egész a tőketartozást csökkenti.",
    cuota: "Havi törlesztőrészlet",
    intereses: "Kamat összesen",
    total: "Összesen visszafizetendő",
    mesesReales: "Hónapok száma plusz törlesztéssel",
    ahorro: "Megspórolt kamat",
    tabla: "Törlesztési terv",
    colMes: "Hónap",
    colPago: "Részlet",
    colInteres: "Kamat",
    colCapital: "Tőke",
    colSaldo: "Tartozás",
    errorMonto: "Nullánál nagyobb összeget adj meg.",
    observacionCostos: "A részletben nincs benne a biztosítás, a díjak és az adók, amelyeket a hitelező felszámolhat. Aláírás előtt kérdezz rá a THM-re és a teljes visszafizetendő összegre.",
    observacionExtra: (meses, ahorro) => `Plusz törlesztéssel ennyi hónap alatt fizeted vissza a hitelt: ${meses}. A megspórolt kamat: ${ahorro}.`,
  }),
};
