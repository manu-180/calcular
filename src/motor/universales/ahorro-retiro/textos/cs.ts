import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosCs: TextosUi<UiAhorroRetiro> = {
  slug: "sporeni-na-duchod",
  ui: () => ({
    edadActual: "Váš současný věk",
    edadRetiro: "V kolika letech chcete jít do důchodu",
    actual: "Kolik už máte naspořeno",
    aporte: "Měsíční vklad",
    rendimiento: "Reálný roční výnos (%)",
    rendimientoAyuda: "Kolik investice vynášejí nad inflaci. Pro dlouhé období je 2 až 5 % opatrný předpoklad.",
    aniosRenta: "Na kolik let důchodu má úspora vystačit",
    aniosRentaAyuda: "Kolik let chcete z těchto úspor čerpat peníze.",
    capital: "Úspory v den odchodu do důchodu",
    renta: "Měsíční příjem z těchto úspor",
    aportado: "Celkem vloženo",
    intereses: "Celkové zhodnocení",
    tabla: "Vývoj úspor podle věku",
    colEdad: "Věk",
    colAportado: "Vloženo do té doby",
    colSaldo: "Úspory",
    errorEdades: "Věk odchodu do důchodu musí být vyšší než váš současný věk.",
    errorSinAhorro: "Zadejte, kolik už máte naspořeno, nebo měsíční vklad.",
    observacionDineroDeHoy: "Částky jsou v dnešních cenách, protože výnos je už očištěný o inflaci.",
    observacionPublica: "Počítají se jen vaše vlastní úspory. Státní důchod ani jiné dávky, na které můžete mít nárok, zahrnuté nejsou.",
  }),
};
