import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bedrijfsvoorheffingBerekenen from "./calculadoras/bedrijfsvoorheffing-berekenen";
import brutoNettoBerekenen from "./calculadoras/bruto-netto-berekenen";
import btwBerekenen from "./calculadoras/btw-berekenen";
import rszBerekenen from "./calculadoras/rsz-berekenen";
import contenidoBedrijfsvoorheffingBerekenen from "./contenido/bedrijfsvoorheffing-berekenen";
import contenidoBrutoNettoBerekenen from "./contenido/bruto-netto-berekenen";
import contenidoBtwBerekenen from "./contenido/btw-berekenen";
import contenidoRszBerekenen from "./contenido/rsz-berekenen";
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
    { definicion: brutoNettoBerekenen, contenido: contenidoBrutoNettoBerekenen, cliente: () => import("./calculadoras/bruto-netto-berekenen.cliente") },
    { definicion: bedrijfsvoorheffingBerekenen, contenido: contenidoBedrijfsvoorheffingBerekenen, cliente: () => import("./calculadoras/bedrijfsvoorheffing-berekenen.cliente") },
    { definicion: rszBerekenen, contenido: contenidoRszBerekenen, cliente: () => import("./calculadoras/rsz-berekenen.cliente") },
    { definicion: btwBerekenen, contenido: contenidoBtwBerekenen, cliente: () => import("./calculadoras/btw-berekenen.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
