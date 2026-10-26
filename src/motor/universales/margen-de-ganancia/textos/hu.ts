import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosHu: TextosUi<UiMargenDeGanancia> = {
  slug: "arres-kalkulator",
  ui: () => ({
    modo: "Mit szeretnél kiszámolni?",
    modoPrecio: "Az árrést a beszerzési árból és az eladási árból",
    modoMargen: "Az eladási árat a kívánt árrésszinthez",
    modoMarkup: "Az eladási árat a kívánt haszonkulcshoz",
    costo: "Beszerzési ár vagy önköltség darabonként",
    costoAyuda: "Amennyibe egy darab megvétele vagy előállítása kerül, a vevőre áthárított ÁFA nélkül.",
    precio: "Eladási ár",
    precioAyuda: "Csak ha az árrést számolod. ÁFA nélkül.",
    objetivo: "Kívánt árrésszint vagy haszonkulcs (%)",
    objetivoAyuda: "Csak ha az eladási árat számolod.",
    precioResultado: "Eladási ár",
    margen: "Árrésszint",
    margenAyuda: "A haszon az eladási ár százalékában.",
    markup: "Haszonkulcs",
    markupAyuda: "A haszon a beszerzési ár százalékában.",
    ganancia: "Árrés darabonként",
    errorCosto: "Add meg egy darab beszerzési árát.",
    errorFaltaPrecio: "Add meg az eladási árat, hogy kiszámolhassuk az árrést.",
    errorFaltaObjetivo: "Add meg, milyen árrésszintet vagy haszonkulcsot szeretnél elérni.",
    errorMargen100: "Az árrésszint 100 százaléknál kisebb kell legyen: a 100 azt jelentené, hogy az egész ár haszon, költség nélkül.",
    observacionPerdida: "Ezen az áron a beszerzési ár alatt adsz el: minden eladáson veszítesz.",
  }),
};
