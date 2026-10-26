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
import lapsilisa from "./calculadoras/lapsilisa";
import contenidoLapsilisa from "./contenido/lapsilisa";
import vanhempainpaivarahaLaskuri from "./calculadoras/vanhempainpaivaraha-laskuri";
import contenidoVanhempainpaivarahaLaskuri from "./contenido/vanhempainpaivaraha-laskuri";
import sairauspaivarahaLaskuri from "./calculadoras/sairauspaivaraha-laskuri";
import contenidoSairauspaivarahaLaskuri from "./contenido/sairauspaivaraha-laskuri";
import alvLaskuri from "./calculadoras/alv-laskuri";
import contenidoAlvLaskuri from "./contenido/alv-laskuri";
import varainsiirtoveroLaskuri from "./calculadoras/varainsiirtovero-laskuri";
import contenidoVarainsiirtoveroLaskuri from "./contenido/varainsiirtovero-laskuri";
import paaomatulovero from "./calculadoras/paaomatulovero";
import contenidoPaaomatulovero from "./contenido/paaomatulovero";
import osakesaastotiliVerotus from "./calculadoras/osakesaastotili-verotus";
import contenidoOsakesaastotiliVerotus from "./contenido/osakesaastotili-verotus";
import kotitalousvahennysLaskuri from "./calculadoras/kotitalousvahennys-laskuri";
import contenidoKotitalousvahennysLaskuri from "./contenido/kotitalousvahennys-laskuri";
import inflaatiolaskuri from "./calculadoras/inflaatiolaskuri";
import contenidoInflaatiolaskuri from "./contenido/inflaatiolaskuri";
import viivastyskorkolaskuri from "./calculadoras/viivastyskorkolaskuri";
import contenidoViivastyskorkolaskuri from "./contenido/viivastyskorkolaskuri";
import perintoverolaskuri from "./calculadoras/perintoverolaskuri";
import contenidoPerintoverolaskuri from "./contenido/perintoverolaskuri";
import lahjaverolaskuri from "./calculadoras/lahjaverolaskuri";
import contenidoLahjaverolaskuri from "./contenido/lahjaverolaskuri";
import kilometrikorvaus from "./calculadoras/kilometrikorvaus";
import contenidoKilometrikorvaus from "./contenido/kilometrikorvaus";
import yleVero from "./calculadoras/yle-vero";
import contenidoYleVero from "./contenido/yle-vero";
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
    { definicion: lapsilisa, contenido: contenidoLapsilisa, cliente: () => import("./calculadoras/lapsilisa.cliente") },
    { definicion: vanhempainpaivarahaLaskuri, contenido: contenidoVanhempainpaivarahaLaskuri, cliente: () => import("./calculadoras/vanhempainpaivaraha-laskuri.cliente") },
    { definicion: sairauspaivarahaLaskuri, contenido: contenidoSairauspaivarahaLaskuri, cliente: () => import("./calculadoras/sairauspaivaraha-laskuri.cliente") },
    { definicion: alvLaskuri, contenido: contenidoAlvLaskuri, cliente: () => import("./calculadoras/alv-laskuri.cliente") },
    { definicion: varainsiirtoveroLaskuri, contenido: contenidoVarainsiirtoveroLaskuri, cliente: () => import("./calculadoras/varainsiirtovero-laskuri.cliente") },
    { definicion: paaomatulovero, contenido: contenidoPaaomatulovero, cliente: () => import("./calculadoras/paaomatulovero.cliente") },
    { definicion: osakesaastotiliVerotus, contenido: contenidoOsakesaastotiliVerotus, cliente: () => import("./calculadoras/osakesaastotili-verotus.cliente") },
    { definicion: kotitalousvahennysLaskuri, contenido: contenidoKotitalousvahennysLaskuri, cliente: () => import("./calculadoras/kotitalousvahennys-laskuri.cliente") },
    { definicion: inflaatiolaskuri, contenido: contenidoInflaatiolaskuri, cliente: () => import("./calculadoras/inflaatiolaskuri.cliente") },
    { definicion: viivastyskorkolaskuri, contenido: contenidoViivastyskorkolaskuri, cliente: () => import("./calculadoras/viivastyskorkolaskuri.cliente") },
    { definicion: perintoverolaskuri, contenido: contenidoPerintoverolaskuri, cliente: () => import("./calculadoras/perintoverolaskuri.cliente") },
    { definicion: lahjaverolaskuri, contenido: contenidoLahjaverolaskuri, cliente: () => import("./calculadoras/lahjaverolaskuri.cliente") },
    { definicion: kilometrikorvaus, contenido: contenidoKilometrikorvaus, cliente: () => import("./calculadoras/kilometrikorvaus.cliente") },
    { definicion: yleVero, contenido: contenidoYleVero, cliente: () => import("./calculadoras/yle-vero.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
