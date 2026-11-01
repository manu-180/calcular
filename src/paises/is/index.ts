import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import launareiknivel from "./calculadoras/launareiknivel";
import contenidoLaunareiknivel from "./contenido/launareiknivel";
import bruttoUrNeti from "./calculadoras/brutto-ur-neti";
import contenidoBruttoUrNeti from "./contenido/brutto-ur-neti";
import launakostnadur from "./calculadoras/launakostnadur";
import contenidoLaunakostnadur from "./contenido/launakostnadur";
import tekjuskattur from "./calculadoras/tekjuskattur";
import contenidoTekjuskattur from "./contenido/tekjuskattur";
import personuafslattur from "./calculadoras/personuafslattur";
import contenidoPersonuafslattur from "./contenido/personuafslattur";
import lifeyrissjodur from "./calculadoras/lifeyrissjodur";
import contenidoLifeyrissjodur from "./contenido/lifeyrissjodur";
import tryggingagjald from "./calculadoras/tryggingagjald";
import contenidoTryggingagjald from "./contenido/tryggingagjald";
import vskReiknivel from "./calculadoras/vsk-reiknivel";
import contenidoVskReiknivel from "./contenido/vsk-reiknivel";
import fjarmagnstekjuskattur from "./calculadoras/fjarmagnstekjuskattur";
import contenidoFjarmagnstekjuskattur from "./contenido/fjarmagnstekjuskattur";
import leigutekjur from "./calculadoras/leigutekjur";
import contenidoLeigutekjur from "./contenido/leigutekjur";
import orlofslaun from "./calculadoras/orlofslaun";
import contenidoOrlofslaun from "./contenido/orlofslaun";
import desemberuppbot from "./calculadoras/desemberuppbot";
import contenidoDesemberuppbot from "./contenido/desemberuppbot";
import orlofsuppbot from "./calculadoras/orlofsuppbot";
import contenidoOrlofsuppbot from "./contenido/orlofsuppbot";
import faedingarorlof from "./calculadoras/faedingarorlof";
import contenidoFaedingarorlof from "./contenido/faedingarorlof";
import atvinnuleysisbaetur from "./calculadoras/atvinnuleysisbaetur";
import contenidoAtvinnuleysisbaetur from "./contenido/atvinnuleysisbaetur";
import barnabaetur from "./calculadoras/barnabaetur";
import contenidoBarnabaetur from "./contenido/barnabaetur";
import vaxtabaetur from "./calculadoras/vaxtabaetur";
import contenidoVaxtabaetur from "./contenido/vaxtabaetur";
import stimpilgjald from "./calculadoras/stimpilgjald";
import contenidoStimpilgjald from "./contenido/stimpilgjald";
import verdtrygging from "./calculadoras/verdtrygging";
import contenidoVerdtrygging from "./contenido/verdtrygging";
import gengi from "./calculadoras/gengi";
import contenidoGengi from "./contenido/gengi";
import verdbolga from "./calculadoras/verdbolga";
import contenidoVerdbolga from "./contenido/verdbolga";
import erfdafjarskattur from "./calculadoras/erfdafjarskattur";
import contenidoErfdafjarskattur from "./contenido/erfdafjarskattur";
import ellilifeyrir from "./calculadoras/ellilifeyrir";
import contenidoEllilifeyrir from "./contenido/ellilifeyrir";
import dagpeningar from "./calculadoras/dagpeningar";
import contenidoDagpeningar from "./contenido/dagpeningar";
import drattarvextir from "./calculadoras/drattarvextir";
import contenidoDrattarvextir from "./contenido/drattarvextir";
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
    { definicion: launareiknivel, contenido: contenidoLaunareiknivel, cliente: () => import("./calculadoras/launareiknivel.cliente") },
    { definicion: bruttoUrNeti, contenido: contenidoBruttoUrNeti, cliente: () => import("./calculadoras/brutto-ur-neti.cliente") },
    { definicion: launakostnadur, contenido: contenidoLaunakostnadur, cliente: () => import("./calculadoras/launakostnadur.cliente") },
    { definicion: tekjuskattur, contenido: contenidoTekjuskattur, cliente: () => import("./calculadoras/tekjuskattur.cliente") },
    { definicion: personuafslattur, contenido: contenidoPersonuafslattur, cliente: () => import("./calculadoras/personuafslattur.cliente") },
    { definicion: lifeyrissjodur, contenido: contenidoLifeyrissjodur, cliente: () => import("./calculadoras/lifeyrissjodur.cliente") },
    { definicion: tryggingagjald, contenido: contenidoTryggingagjald, cliente: () => import("./calculadoras/tryggingagjald.cliente") },
    { definicion: vskReiknivel, contenido: contenidoVskReiknivel, cliente: () => import("./calculadoras/vsk-reiknivel.cliente") },
    { definicion: fjarmagnstekjuskattur, contenido: contenidoFjarmagnstekjuskattur, cliente: () => import("./calculadoras/fjarmagnstekjuskattur.cliente") },
    { definicion: leigutekjur, contenido: contenidoLeigutekjur, cliente: () => import("./calculadoras/leigutekjur.cliente") },
    { definicion: orlofslaun, contenido: contenidoOrlofslaun, cliente: () => import("./calculadoras/orlofslaun.cliente") },
    { definicion: desemberuppbot, contenido: contenidoDesemberuppbot, cliente: () => import("./calculadoras/desemberuppbot.cliente") },
    { definicion: orlofsuppbot, contenido: contenidoOrlofsuppbot, cliente: () => import("./calculadoras/orlofsuppbot.cliente") },
    { definicion: faedingarorlof, contenido: contenidoFaedingarorlof, cliente: () => import("./calculadoras/faedingarorlof.cliente") },
    { definicion: atvinnuleysisbaetur, contenido: contenidoAtvinnuleysisbaetur, cliente: () => import("./calculadoras/atvinnuleysisbaetur.cliente") },
    { definicion: barnabaetur, contenido: contenidoBarnabaetur, cliente: () => import("./calculadoras/barnabaetur.cliente") },
    { definicion: vaxtabaetur, contenido: contenidoVaxtabaetur, cliente: () => import("./calculadoras/vaxtabaetur.cliente") },
    { definicion: stimpilgjald, contenido: contenidoStimpilgjald, cliente: () => import("./calculadoras/stimpilgjald.cliente") },
    { definicion: verdtrygging, contenido: contenidoVerdtrygging, cliente: () => import("./calculadoras/verdtrygging.cliente") },
    { definicion: gengi, contenido: contenidoGengi, cliente: () => import("./calculadoras/gengi.cliente") },
    { definicion: verdbolga, contenido: contenidoVerdbolga, cliente: () => import("./calculadoras/verdbolga.cliente") },
    { definicion: erfdafjarskattur, contenido: contenidoErfdafjarskattur, cliente: () => import("./calculadoras/erfdafjarskattur.cliente") },
    { definicion: ellilifeyrir, contenido: contenidoEllilifeyrir, cliente: () => import("./calculadoras/ellilifeyrir.cliente") },
    { definicion: dagpeningar, contenido: contenidoDagpeningar, cliente: () => import("./calculadoras/dagpeningar.cliente") },
    { definicion: drattarvextir, contenido: contenidoDrattarvextir, cliente: () => import("./calculadoras/drattarvextir.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
