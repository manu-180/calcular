import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import alutMaasik from "./calculadoras/alut-maasik";
import bituachLeumi from "./calculadoras/bituach-leumi";
import brutoNeto from "./calculadoras/bruto-neto";
import masHachnasa from "./calculadoras/mas-hachnasa";
import sacharNeto from "./calculadoras/sachar-neto";
import contenidoAlutMaasik from "./contenido/alut-maasik";
import contenidoBituachLeumi from "./contenido/bituach-leumi";
import contenidoBrutoNeto from "./contenido/bruto-neto";
import contenidoMasHachnasa from "./contenido/mas-hachnasa";
import contenidoSacharNeto from "./contenido/sachar-neto";
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
    { definicion: sacharNeto, contenido: contenidoSacharNeto, cliente: () => import("./calculadoras/sachar-neto.cliente") },
    { definicion: brutoNeto, contenido: contenidoBrutoNeto, cliente: () => import("./calculadoras/bruto-neto.cliente") },
    { definicion: masHachnasa, contenido: contenidoMasHachnasa, cliente: () => import("./calculadoras/mas-hachnasa.cliente") },
    { definicion: bituachLeumi, contenido: contenidoBituachLeumi, cliente: () => import("./calculadoras/bituach-leumi.cliente") },
    { definicion: alutMaasik, contenido: contenidoAlutMaasik, cliente: () => import("./calculadoras/alut-maasik.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
