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
  ],
  universales: "todas",
  novedades,
  detectores,
});
