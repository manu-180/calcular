import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import ashkhatavardziHashvich from "./calculadoras/ashkhatavardzi-hashvich";
import contenidoAshkhatavardziHashvich from "./contenido/ashkhatavardzi-hashvich";
import zutHamakharAshkhatavardz from "./calculadoras/zut-hamakhar-ashkhatavardz";
import contenidoZutHamakharAshkhatavardz from "./contenido/zut-hamakhar-ashkhatavardz";
import gortatuiTsakhs from "./calculadoras/gortatui-tsakhs";
import contenidoGortatuiTsakhs from "./contenido/gortatui-tsakhs";
import nvazaguynAshkhatavardz from "./calculadoras/nvazaguyn-ashkhatavardz";
import contenidoNvazaguynAshkhatavardz from "./contenido/nvazaguyn-ashkhatavardz";
import yekamtayinHark from "./calculadoras/yekamtayin-hark";
import contenidoYekamtayinHark from "./contenido/yekamtayin-hark";
import kutakayinVchar from "./calculadoras/kutakayin-vchar";
import contenidoKutakayinVchar from "./contenido/kutakayin-vchar";
import droshmanishayinVchar from "./calculadoras/droshmanishayin-vchar";
import contenidoDroshmanishayinVchar from "./contenido/droshmanishayin-vchar";
import aroghjutyanApahovagravchar from "./calculadoras/aroghjutyan-apahovagravchar";
import contenidoAroghjutyanApahovagravchar from "./contenido/aroghjutyan-apahovagravchar";
import shrjanarutyanHark from "./calculadoras/shrjanarutyan-hark";
import contenidoShrjanarutyanHark from "./contenido/shrjanarutyan-hark";
import mikrodzernarkatirutyun from "./calculadoras/mikrodzernarkatirutyun";
import contenidoMikrodzernarkatirutyun from "./contenido/mikrodzernarkatirutyun";
import shahabazhniHark from "./calculadoras/shahabazhni-hark";
import contenidoShahabazhniHark from "./contenido/shahabazhni-hark";
import vardzakalutyanHark from "./calculadoras/vardzakalutyan-hark";
import contenidoVardzakalutyanHark from "./contenido/vardzakalutyan-hark";
import sepakanutyanHark from "./calculadoras/sepakanutyan-hark";
import contenidoSepakanutyanHark from "./contenido/sepakanutyan-hark";
import ardzakurdayinHashvich from "./calculadoras/ardzakurdayin-hashvich";
import contenidoArdzakurdayinHashvich from "./contenido/ardzakurdayin-hashvich";
import hivandutyanNpast from "./calculadoras/hivandutyan-npast";
import contenidoHivandutyanNpast from "./contenido/hivandutyan-npast";
import mayrutyanNpast from "./calculadoras/mayrutyan-npast";
import contenidoMayrutyanNpast from "./contenido/mayrutyan-npast";
import artazhamyaAshkhatank from "./calculadoras/artazhamya-ashkhatank";
import contenidoArtazhamyaAshkhatank from "./contenido/artazhamya-ashkhatank";
import ardzakmanNpast from "./calculadoras/ardzakman-npast";
import contenidoArdzakmanNpast from "./contenido/ardzakman-npast";
import tsanutsmanZhamket from "./calculadoras/tsanutsman-zhamket";
import contenidoTsanutsmanZhamket from "./contenido/tsanutsman-zhamket";
import pokharzhekiHashvich from "./calculadoras/pokharzheki-hashvich";
import contenidoPokharzhekiHashvich from "./contenido/pokharzheki-hashvich";
import gnachiHashvich from "./calculadoras/gnachi-hashvich";
import contenidoGnachiHashvich from "./contenido/gnachi-hashvich";
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
    { definicion: ashkhatavardziHashvich, contenido: contenidoAshkhatavardziHashvich, cliente: () => import("./calculadoras/ashkhatavardzi-hashvich.cliente") },
    { definicion: zutHamakharAshkhatavardz, contenido: contenidoZutHamakharAshkhatavardz, cliente: () => import("./calculadoras/zut-hamakhar-ashkhatavardz.cliente") },
    { definicion: gortatuiTsakhs, contenido: contenidoGortatuiTsakhs, cliente: () => import("./calculadoras/gortatui-tsakhs.cliente") },
    { definicion: nvazaguynAshkhatavardz, contenido: contenidoNvazaguynAshkhatavardz, cliente: () => import("./calculadoras/nvazaguyn-ashkhatavardz.cliente") },
    { definicion: yekamtayinHark, contenido: contenidoYekamtayinHark, cliente: () => import("./calculadoras/yekamtayin-hark.cliente") },
    { definicion: kutakayinVchar, contenido: contenidoKutakayinVchar, cliente: () => import("./calculadoras/kutakayin-vchar.cliente") },
    { definicion: droshmanishayinVchar, contenido: contenidoDroshmanishayinVchar, cliente: () => import("./calculadoras/droshmanishayin-vchar.cliente") },
    { definicion: aroghjutyanApahovagravchar, contenido: contenidoAroghjutyanApahovagravchar, cliente: () => import("./calculadoras/aroghjutyan-apahovagravchar.cliente") },
    { definicion: shrjanarutyanHark, contenido: contenidoShrjanarutyanHark, cliente: () => import("./calculadoras/shrjanarutyan-hark.cliente") },
    { definicion: mikrodzernarkatirutyun, contenido: contenidoMikrodzernarkatirutyun, cliente: () => import("./calculadoras/mikrodzernarkatirutyun.cliente") },
    { definicion: shahabazhniHark, contenido: contenidoShahabazhniHark, cliente: () => import("./calculadoras/shahabazhni-hark.cliente") },
    { definicion: vardzakalutyanHark, contenido: contenidoVardzakalutyanHark, cliente: () => import("./calculadoras/vardzakalutyan-hark.cliente") },
    { definicion: sepakanutyanHark, contenido: contenidoSepakanutyanHark, cliente: () => import("./calculadoras/sepakanutyan-hark.cliente") },
    { definicion: ardzakurdayinHashvich, contenido: contenidoArdzakurdayinHashvich, cliente: () => import("./calculadoras/ardzakurdayin-hashvich.cliente") },
    { definicion: hivandutyanNpast, contenido: contenidoHivandutyanNpast, cliente: () => import("./calculadoras/hivandutyan-npast.cliente") },
    { definicion: mayrutyanNpast, contenido: contenidoMayrutyanNpast, cliente: () => import("./calculadoras/mayrutyan-npast.cliente") },
    { definicion: artazhamyaAshkhatank, contenido: contenidoArtazhamyaAshkhatank, cliente: () => import("./calculadoras/artazhamya-ashkhatank.cliente") },
    { definicion: ardzakmanNpast, contenido: contenidoArdzakmanNpast, cliente: () => import("./calculadoras/ardzakman-npast.cliente") },
    { definicion: tsanutsmanZhamket, contenido: contenidoTsanutsmanZhamket, cliente: () => import("./calculadoras/tsanutsman-zhamket.cliente") },
    { definicion: pokharzhekiHashvich, contenido: contenidoPokharzhekiHashvich, cliente: () => import("./calculadoras/pokharzheki-hashvich.cliente") },
    { definicion: gnachiHashvich, contenido: contenidoGnachiHashvich, cliente: () => import("./calculadoras/gnachi-hashvich.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "am.aah" } }] },
  novedades,
  detectores,
});
