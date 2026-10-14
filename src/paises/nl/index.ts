import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import brutoNettoSalaris from "./calculadoras/bruto-netto-salaris";
import contenidoBrutoNettoSalaris from "./contenido/bruto-netto-salaris";
import inkomstenbelastingBerekenen from "./calculadoras/inkomstenbelasting-berekenen";
import contenidoInkomstenbelastingBerekenen from "./contenido/inkomstenbelasting-berekenen";
import btwBerekenen from "./calculadoras/btw-berekenen";
import contenidoBtwBerekenen from "./contenido/btw-berekenen";
import minimumloonBerekenen from "./calculadoras/minimumloon-berekenen";
import contenidoMinimumloonBerekenen from "./contenido/minimumloon-berekenen";
import vakantiegeldBerekenen from "./calculadoras/vakantiegeld-berekenen";
import contenidoVakantiegeldBerekenen from "./contenido/vakantiegeld-berekenen";
import vakantiedagenBerekenen from "./calculadoras/vakantiedagen-berekenen";
import contenidoVakantiedagenBerekenen from "./contenido/vakantiedagen-berekenen";
import transitievergoedingBerekenen from "./calculadoras/transitievergoeding-berekenen";
import contenidoTransitievergoedingBerekenen from "./contenido/transitievergoeding-berekenen";
import opzegtermijnBerekenen from "./calculadoras/opzegtermijn-berekenen";
import contenidoOpzegtermijnBerekenen from "./contenido/opzegtermijn-berekenen";
import wwUitkeringBerekenen from "./calculadoras/ww-uitkering-berekenen";
import contenidoWwUitkeringBerekenen from "./contenido/ww-uitkering-berekenen";
import zzpBelastingBerekenen from "./calculadoras/zzp-belasting-berekenen";
import contenidoZzpBelastingBerekenen from "./contenido/zzp-belasting-berekenen";
import arbeidskortingBerekenen from "./calculadoras/arbeidskorting-berekenen";
import contenidoArbeidskortingBerekenen from "./contenido/arbeidskorting-berekenen";
import algemeneHeffingskortingBerekenen from "./calculadoras/algemene-heffingskorting-berekenen";
import contenidoAlgemeneHeffingskortingBerekenen from "./contenido/algemene-heffingskorting-berekenen";
import box3Berekenen from "./calculadoras/box-3-berekenen";
import contenidoBox3Berekenen from "./contenido/box-3-berekenen";
import hypotheekrenteaftrekBerekenen from "./calculadoras/hypotheekrenteaftrek-berekenen";
import contenidoHypotheekrenteaftrekBerekenen from "./contenido/hypotheekrenteaftrek-berekenen";
import eigenwoningforfaitBerekenen from "./calculadoras/eigenwoningforfait-berekenen";
import contenidoEigenwoningforfaitBerekenen from "./contenido/eigenwoningforfait-berekenen";
import overdrachtsbelastingBerekenen from "./calculadoras/overdrachtsbelasting-berekenen";
import contenidoOverdrachtsbelastingBerekenen from "./contenido/overdrachtsbelasting-berekenen";
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
    { definicion: inkomstenbelastingBerekenen, contenido: contenidoInkomstenbelastingBerekenen, cliente: () => import("./calculadoras/inkomstenbelasting-berekenen.cliente") },
    { definicion: btwBerekenen, contenido: contenidoBtwBerekenen, cliente: () => import("./calculadoras/btw-berekenen.cliente") },
    { definicion: minimumloonBerekenen, contenido: contenidoMinimumloonBerekenen, cliente: () => import("./calculadoras/minimumloon-berekenen.cliente") },
    { definicion: vakantiegeldBerekenen, contenido: contenidoVakantiegeldBerekenen, cliente: () => import("./calculadoras/vakantiegeld-berekenen.cliente") },
    { definicion: vakantiedagenBerekenen, contenido: contenidoVakantiedagenBerekenen, cliente: () => import("./calculadoras/vakantiedagen-berekenen.cliente") },
    { definicion: transitievergoedingBerekenen, contenido: contenidoTransitievergoedingBerekenen, cliente: () => import("./calculadoras/transitievergoeding-berekenen.cliente") },
    { definicion: opzegtermijnBerekenen, contenido: contenidoOpzegtermijnBerekenen, cliente: () => import("./calculadoras/opzegtermijn-berekenen.cliente") },
    { definicion: wwUitkeringBerekenen, contenido: contenidoWwUitkeringBerekenen, cliente: () => import("./calculadoras/ww-uitkering-berekenen.cliente") },
    { definicion: zzpBelastingBerekenen, contenido: contenidoZzpBelastingBerekenen, cliente: () => import("./calculadoras/zzp-belasting-berekenen.cliente") },
    { definicion: arbeidskortingBerekenen, contenido: contenidoArbeidskortingBerekenen, cliente: () => import("./calculadoras/arbeidskorting-berekenen.cliente") },
    { definicion: algemeneHeffingskortingBerekenen, contenido: contenidoAlgemeneHeffingskortingBerekenen, cliente: () => import("./calculadoras/algemene-heffingskorting-berekenen.cliente") },
    { definicion: box3Berekenen, contenido: contenidoBox3Berekenen, cliente: () => import("./calculadoras/box-3-berekenen.cliente") },
    { definicion: hypotheekrenteaftrekBerekenen, contenido: contenidoHypotheekrenteaftrekBerekenen, cliente: () => import("./calculadoras/hypotheekrenteaftrek-berekenen.cliente") },
    { definicion: eigenwoningforfaitBerekenen, contenido: contenidoEigenwoningforfaitBerekenen, cliente: () => import("./calculadoras/eigenwoningforfait-berekenen.cliente") },
    { definicion: overdrachtsbelastingBerekenen, contenido: contenidoOverdrachtsbelastingBerekenen, cliente: () => import("./calculadoras/overdrachtsbelasting-berekenen.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
