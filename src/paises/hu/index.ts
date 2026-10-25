import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import nettoberKalkulator from "./calculadoras/nettober-kalkulator";
import contenidoNettoberKalkulator from "./contenido/nettober-kalkulator";
import bruttoBerKalkulator from "./calculadoras/brutto-ber-kalkulator";
import contenidoBruttoBerKalkulator from "./contenido/brutto-ber-kalkulator";
import munkaltatoiKoltsegKalkulator from "./calculadoras/munkaltatoi-koltseg-kalkulator";
import contenidoMunkaltatoiKoltsegKalkulator from "./contenido/munkaltatoi-koltseg-kalkulator";
import minimalberKalkulator from "./calculadoras/minimalber-kalkulator";
import contenidoMinimalberKalkulator from "./contenido/minimalber-kalkulator";
import csaladiAdokedvezmenyKalkulator from "./calculadoras/csaladi-adokedvezmeny-kalkulator";
import contenidoCsaladiAdokedvezmenyKalkulator from "./contenido/csaladi-adokedvezmeny-kalkulator";
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
    { definicion: nettoberKalkulator, contenido: contenidoNettoberKalkulator, cliente: () => import("./calculadoras/nettober-kalkulator.cliente") },
    { definicion: bruttoBerKalkulator, contenido: contenidoBruttoBerKalkulator, cliente: () => import("./calculadoras/brutto-ber-kalkulator.cliente") },
    { definicion: munkaltatoiKoltsegKalkulator, contenido: contenidoMunkaltatoiKoltsegKalkulator, cliente: () => import("./calculadoras/munkaltatoi-koltseg-kalkulator.cliente") },
    { definicion: minimalberKalkulator, contenido: contenidoMinimalberKalkulator, cliente: () => import("./calculadoras/minimalber-kalkulator.cliente") },
    { definicion: csaladiAdokedvezmenyKalkulator, contenido: contenidoCsaladiAdokedvezmenyKalkulator, cliente: () => import("./calculadoras/csaladi-adokedvezmeny-kalkulator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
