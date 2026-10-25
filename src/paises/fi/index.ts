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
import lomapalkkalaskuri from "./calculadoras/lomapalkkalaskuri";
import contenidoLomapalkkalaskuri from "./contenido/lomapalkkalaskuri";
import lomarahalaskuri from "./calculadoras/lomarahalaskuri";
import contenidoLomarahalaskuri from "./contenido/lomarahalaskuri";
import lomakorvauslaskuri from "./calculadoras/lomakorvauslaskuri";
import contenidoLomakorvauslaskuri from "./contenido/lomakorvauslaskuri";
import ylityokorvaus from "./calculadoras/ylityokorvaus";
import contenidoYlityokorvaus from "./contenido/ylityokorvaus";
import irtisanomisaika from "./calculadoras/irtisanomisaika";
import contenidoIrtisanomisaika from "./contenido/irtisanomisaika";
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
    { definicion: lomapalkkalaskuri, contenido: contenidoLomapalkkalaskuri, cliente: () => import("./calculadoras/lomapalkkalaskuri.cliente") },
    { definicion: lomarahalaskuri, contenido: contenidoLomarahalaskuri, cliente: () => import("./calculadoras/lomarahalaskuri.cliente") },
    { definicion: lomakorvauslaskuri, contenido: contenidoLomakorvauslaskuri, cliente: () => import("./calculadoras/lomakorvauslaskuri.cliente") },
    { definicion: ylityokorvaus, contenido: contenidoYlityokorvaus, cliente: () => import("./calculadoras/ylityokorvaus.cliente") },
    { definicion: irtisanomisaika, contenido: contenidoIrtisanomisaika, cliente: () => import("./calculadoras/irtisanomisaika.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
