import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import brutoNettoSalaris from "./calculadoras/bruto-netto-salaris";
import contenidoBrutoNettoSalaris from "./contenido/bruto-netto-salaris";
import nettoNaarBrutoBerekenen from "./calculadoras/netto-naar-bruto-berekenen";
import contenidoNettoNaarBrutoBerekenen from "./contenido/netto-naar-bruto-berekenen";
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
import uitkeringIneensBelasting from "./calculadoras/uitkering-ineens-belasting";
import contenidoUitkeringIneensBelasting from "./contenido/uitkering-ineens-belasting";
import hypotheekrenteaftrekBerekenen from "./calculadoras/hypotheekrenteaftrek-berekenen";
import contenidoHypotheekrenteaftrekBerekenen from "./contenido/hypotheekrenteaftrek-berekenen";
import huurwaardebelastingBerekenen from "./calculadoras/huurwaardebelasting-berekenen";
import contenidoHuurwaardebelastingBerekenen from "./contenido/huurwaardebelasting-berekenen";
import inflatieBerekenen from "./calculadoras/inflatie-berekenen";
import contenidoInflatieBerekenen from "./contenido/inflatie-berekenen";
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
    { definicion: nettoNaarBrutoBerekenen, contenido: contenidoNettoNaarBrutoBerekenen, cliente: () => import("./calculadoras/netto-naar-bruto-berekenen.cliente") },
    { definicion: loonbelastingBerekenen, contenido: contenidoLoonbelastingBerekenen, cliente: () => import("./calculadoras/loonbelasting-berekenen.cliente") },
    { definicion: inkomstenbelastingBerekenen, contenido: contenidoInkomstenbelastingBerekenen, cliente: () => import("./calculadoras/inkomstenbelasting-berekenen.cliente") },
    { definicion: aovPremieBerekenen, contenido: contenidoAovPremieBerekenen, cliente: () => import("./calculadoras/aov-premie-berekenen.cliente") },
    { definicion: btwBerekenen, contenido: contenidoBtwBerekenen, cliente: () => import("./calculadoras/btw-berekenen.cliente") },
    { definicion: minimumloonBerekenen, contenido: contenidoMinimumloonBerekenen, cliente: () => import("./calculadoras/minimumloon-berekenen.cliente") },
    { definicion: overurenBerekenen, contenido: contenidoOverurenBerekenen, cliente: () => import("./calculadoras/overuren-berekenen.cliente") },
    { definicion: vakantiedagenBerekenen, contenido: contenidoVakantiedagenBerekenen, cliente: () => import("./calculadoras/vakantiedagen-berekenen.cliente") },
    { definicion: vakantietoelageBerekenen, contenido: contenidoVakantietoelageBerekenen, cliente: () => import("./calculadoras/vakantietoelage-berekenen.cliente") },
    { definicion: bonusBelastingBerekenen, contenido: contenidoBonusBelastingBerekenen, cliente: () => import("./calculadoras/bonus-belasting-berekenen.cliente") },
    { definicion: uitkeringIneensBelasting, contenido: contenidoUitkeringIneensBelasting, cliente: () => import("./calculadoras/uitkering-ineens-belasting.cliente") },
    { definicion: hypotheekrenteaftrekBerekenen, contenido: contenidoHypotheekrenteaftrekBerekenen, cliente: () => import("./calculadoras/hypotheekrenteaftrek-berekenen.cliente") },
    { definicion: huurwaardebelastingBerekenen, contenido: contenidoHuurwaardebelastingBerekenen, cliente: () => import("./calculadoras/huurwaardebelasting-berekenen.cliente") },
    { definicion: inflatieBerekenen, contenido: contenidoInflatieBerekenen, cliente: () => import("./calculadoras/inflatie-berekenen.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
