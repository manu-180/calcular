import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import brutoNettoSalaris from "./calculadoras/bruto-netto-salaris";
import contenidoBrutoNettoSalaris from "./contenido/bruto-netto-salaris";
import loonbelastingBerekenen from "./calculadoras/loonbelasting-berekenen";
import contenidoLoonbelastingBerekenen from "./contenido/loonbelasting-berekenen";
import inkomstenbelastingBerekenen from "./calculadoras/inkomstenbelasting-berekenen";
import contenidoInkomstenbelastingBerekenen from "./contenido/inkomstenbelasting-berekenen";
import aovPremieBerekenen from "./calculadoras/aov-premie-berekenen";
import contenidoAovPremieBerekenen from "./contenido/aov-premie-berekenen";
import btwBerekenen from "./calculadoras/btw-berekenen";
import contenidoBtwBerekenen from "./contenido/btw-berekenen";
import minimumloonBerekenen from "./calculadoras/minimumloon-berekenen";
import contenidoMinimumloonBerekenen from "./contenido/minimumloon-berekenen";
import overurenBerekenen from "./calculadoras/overuren-berekenen";
import contenidoOverurenBerekenen from "./contenido/overuren-berekenen";
import vakantiedagenBerekenen from "./calculadoras/vakantiedagen-berekenen";
import contenidoVakantiedagenBerekenen from "./contenido/vakantiedagen-berekenen";
import vakantietoelageBerekenen from "./calculadoras/vakantietoelage-berekenen";
import contenidoVakantietoelageBerekenen from "./contenido/vakantietoelage-berekenen";
import bonusBelastingBerekenen from "./calculadoras/bonus-belasting-berekenen";
import contenidoBonusBelastingBerekenen from "./contenido/bonus-belasting-berekenen";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: brutoNettoSalaris, contenido: contenidoBrutoNettoSalaris, cliente: () => import("./calculadoras/bruto-netto-salaris.cliente") },
    { definicion: loonbelastingBerekenen, contenido: contenidoLoonbelastingBerekenen, cliente: () => import("./calculadoras/loonbelasting-berekenen.cliente") },
    { definicion: inkomstenbelastingBerekenen, contenido: contenidoInkomstenbelastingBerekenen, cliente: () => import("./calculadoras/inkomstenbelasting-berekenen.cliente") },
    { definicion: aovPremieBerekenen, contenido: contenidoAovPremieBerekenen, cliente: () => import("./calculadoras/aov-premie-berekenen.cliente") },
    { definicion: btwBerekenen, contenido: contenidoBtwBerekenen, cliente: () => import("./calculadoras/btw-berekenen.cliente") },
    { definicion: minimumloonBerekenen, contenido: contenidoMinimumloonBerekenen, cliente: () => import("./calculadoras/minimumloon-berekenen.cliente") },
    { definicion: overurenBerekenen, contenido: contenidoOverurenBerekenen, cliente: () => import("./calculadoras/overuren-berekenen.cliente") },
    { definicion: vakantiedagenBerekenen, contenido: contenidoVakantiedagenBerekenen, cliente: () => import("./calculadoras/vakantiedagen-berekenen.cliente") },
    { definicion: vakantietoelageBerekenen, contenido: contenidoVakantietoelageBerekenen, cliente: () => import("./calculadoras/vakantietoelage-berekenen.cliente") },
    { definicion: bonusBelastingBerekenen, contenido: contenidoBonusBelastingBerekenen, cliente: () => import("./calculadoras/bonus-belasting-berekenen.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
