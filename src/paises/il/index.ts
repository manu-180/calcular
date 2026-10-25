import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import alutMaasik from "./calculadoras/alut-maasik";
import contenidoAlutMaasik from "./contenido/alut-maasik";
import bituachLeumi from "./calculadoras/bituach-leumi";
import contenidoBituachLeumi from "./contenido/bituach-leumi";
import brutoNeto from "./calculadoras/bruto-neto";
import contenidoBrutoNeto from "./contenido/bruto-neto";
import dmeiAvtala from "./calculadoras/dmei-avtala";
import contenidoDmeiAvtala from "./contenido/dmei-avtala";
import dmeiHavraa from "./calculadoras/dmei-havraa";
import contenidoDmeiHavraa from "./contenido/dmei-havraa";
import dmeiLeida from "./calculadoras/dmei-leida";
import contenidoDmeiLeida from "./contenido/dmei-leida";
import dmeiMachala from "./calculadoras/dmei-machala";
import contenidoDmeiMachala from "./contenido/dmei-machala";
import hodaaMukdemet from "./calculadoras/hodaa-mukdemet";
import contenidoHodaaMukdemet from "./contenido/hodaa-mukdemet";
import kitzbatYeladim from "./calculadoras/kitzbat-yeladim";
import contenidoKitzbatYeladim from "./contenido/kitzbat-yeladim";
import maam from "./calculadoras/maam";
import contenidoMaam from "./contenido/maam";
import masHachnasa from "./calculadoras/mas-hachnasa";
import contenidoMasHachnasa from "./contenido/mas-hachnasa";
import pitzuyeiPiturim from "./calculadoras/pitzuyei-piturim";
import contenidoPitzuyeiPiturim from "./contenido/pitzuyei-piturim";
import sacharMinimum from "./calculadoras/sachar-minimum";
import contenidoSacharMinimum from "./contenido/sachar-minimum";
import sacharNeto from "./calculadoras/sachar-neto";
import contenidoSacharNeto from "./contenido/sachar-neto";
import shaotNosafot from "./calculadoras/shaot-nosafot";
import contenidoShaotNosafot from "./contenido/shaot-nosafot";
import yemeiChufsha from "./calculadoras/yemei-chufsha";
import contenidoYemeiChufsha from "./contenido/yemei-chufsha";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// El מע"מ es local (maam): la universal del mismo concepto se cae sola.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: alutMaasik, contenido: contenidoAlutMaasik, cliente: () => import("./calculadoras/alut-maasik.cliente") },
    { definicion: bituachLeumi, contenido: contenidoBituachLeumi, cliente: () => import("./calculadoras/bituach-leumi.cliente") },
    { definicion: brutoNeto, contenido: contenidoBrutoNeto, cliente: () => import("./calculadoras/bruto-neto.cliente") },
    { definicion: dmeiAvtala, contenido: contenidoDmeiAvtala, cliente: () => import("./calculadoras/dmei-avtala.cliente") },
    { definicion: dmeiHavraa, contenido: contenidoDmeiHavraa, cliente: () => import("./calculadoras/dmei-havraa.cliente") },
    { definicion: dmeiLeida, contenido: contenidoDmeiLeida, cliente: () => import("./calculadoras/dmei-leida.cliente") },
    { definicion: dmeiMachala, contenido: contenidoDmeiMachala, cliente: () => import("./calculadoras/dmei-machala.cliente") },
    { definicion: hodaaMukdemet, contenido: contenidoHodaaMukdemet, cliente: () => import("./calculadoras/hodaa-mukdemet.cliente") },
    { definicion: kitzbatYeladim, contenido: contenidoKitzbatYeladim, cliente: () => import("./calculadoras/kitzbat-yeladim.cliente") },
    { definicion: maam, contenido: contenidoMaam, cliente: () => import("./calculadoras/maam.cliente") },
    { definicion: masHachnasa, contenido: contenidoMasHachnasa, cliente: () => import("./calculadoras/mas-hachnasa.cliente") },
    { definicion: pitzuyeiPiturim, contenido: contenidoPitzuyeiPiturim, cliente: () => import("./calculadoras/pitzuyei-piturim.cliente") },
    { definicion: sacharMinimum, contenido: contenidoSacharMinimum, cliente: () => import("./calculadoras/sachar-minimum.cliente") },
    { definicion: sacharNeto, contenido: contenidoSacharNeto, cliente: () => import("./calculadoras/sachar-neto.cliente") },
    { definicion: shaotNosafot, contenido: contenidoShaotNosafot, cliente: () => import("./calculadoras/shaot-nosafot.cliente") },
    { definicion: yemeiChufsha, contenido: contenidoYemeiChufsha, cliente: () => import("./calculadoras/yemei-chufsha.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
