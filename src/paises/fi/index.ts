import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import palkkalaskuri from "./calculadoras/palkkalaskuri";
import contenidoPalkkalaskuri from "./contenido/palkkalaskuri";
import veroprosenttilaskuri from "./calculadoras/veroprosenttilaskuri";
import contenidoVeroprosenttilaskuri from "./contenido/veroprosenttilaskuri";
import kunnallisverolaskuri from "./calculadoras/kunnallisverolaskuri";
import contenidoKunnallisverolaskuri from "./contenido/kunnallisverolaskuri";
import tyonantajanSivukulut from "./calculadoras/tyonantajan-sivukulut";
import contenidoTyonantajanSivukulut from "./contenido/tyonantajan-sivukulut";
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
    { definicion: palkkalaskuri, contenido: contenidoPalkkalaskuri, cliente: () => import("./calculadoras/palkkalaskuri.cliente") },
    { definicion: veroprosenttilaskuri, contenido: contenidoVeroprosenttilaskuri, cliente: () => import("./calculadoras/veroprosenttilaskuri.cliente") },
    { definicion: kunnallisverolaskuri, contenido: contenidoKunnallisverolaskuri, cliente: () => import("./calculadoras/kunnallisverolaskuri.cliente") },
    { definicion: tyonantajanSivukulut, contenido: contenidoTyonantajanSivukulut, cliente: () => import("./calculadoras/tyonantajan-sivukulut.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
