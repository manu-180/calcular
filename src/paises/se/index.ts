import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import lonEfterSkatt from "./calculadoras/lon-efter-skatt";
import contenidoLonEfterSkatt from "./contenido/lon-efter-skatt";
import statligSkatt from "./calculadoras/statlig-skatt";
import contenidoStatligSkatt from "./contenido/statlig-skatt";
import arbetsgivaravgift from "./calculadoras/arbetsgivaravgift";
import contenidoArbetsgivaravgift from "./contenido/arbetsgivaravgift";
import egenavgifter from "./calculadoras/egenavgifter";
import contenidoEgenavgifter from "./contenido/egenavgifter";
import semesterersattning from "./calculadoras/semesterersattning";
import contenidoSemesterersattning from "./contenido/semesterersattning";
import semesterdagar from "./calculadoras/semesterdagar";
import contenidoSemesterdagar from "./contenido/semesterdagar";
import uppsagningstid from "./calculadoras/uppsagningstid";
import contenidoUppsagningstid from "./contenido/uppsagningstid";
import sjuklon from "./calculadoras/sjuklon";
import contenidoSjuklon from "./contenido/sjuklon";
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
    { definicion: lonEfterSkatt, contenido: contenidoLonEfterSkatt, cliente: () => import("./calculadoras/lon-efter-skatt.cliente") },
    { definicion: statligSkatt, contenido: contenidoStatligSkatt, cliente: () => import("./calculadoras/statlig-skatt.cliente") },
    { definicion: arbetsgivaravgift, contenido: contenidoArbetsgivaravgift, cliente: () => import("./calculadoras/arbetsgivaravgift.cliente") },
    { definicion: egenavgifter, contenido: contenidoEgenavgifter, cliente: () => import("./calculadoras/egenavgifter.cliente") },
    { definicion: semesterersattning, contenido: contenidoSemesterersattning, cliente: () => import("./calculadoras/semesterersattning.cliente") },
    { definicion: semesterdagar, contenido: contenidoSemesterdagar, cliente: () => import("./calculadoras/semesterdagar.cliente") },
    { definicion: uppsagningstid, contenido: contenidoUppsagningstid, cliente: () => import("./calculadoras/uppsagningstid.cliente") },
    { definicion: sjuklon, contenido: contenidoSjuklon, cliente: () => import("./calculadoras/sjuklon.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
