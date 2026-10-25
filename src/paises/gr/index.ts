import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import ypologismosKatharouMisthou from "./calculadoras/ypologismos-katharou-misthou";
import contenidoYpologismosKatharouMisthou from "./contenido/ypologismos-katharou-misthou";
import ypologismosMiktouApoKatharo from "./calculadoras/ypologismos-miktou-apo-katharo";
import contenidoYpologismosMiktouApoKatharo from "./contenido/ypologismos-miktou-apo-katharo";
import kostosErgodoti from "./calculadoras/kostos-ergodoti";
import contenidoKostosErgodoti from "./contenido/kostos-ergodoti";
import asfalistikesEisforesMisthoton from "./calculadoras/asfalistikes-eisfores-misthoton";
import contenidoAsfalistikesEisforesMisthoton from "./contenido/asfalistikes-eisfores-misthoton";
import katotatosMisthos from "./calculadoras/katotatos-misthos";
import contenidoKatotatosMisthos from "./contenido/katotatos-misthos";
import doroChristougennon from "./calculadoras/doro-christougennon";
import contenidoDoroChristougennon from "./contenido/doro-christougennon";
import doroPascha from "./calculadoras/doro-pascha";
import contenidoDoroPascha from "./contenido/doro-pascha";
import epidomaAdeias from "./calculadoras/epidoma-adeias";
import contenidoEpidomaAdeias from "./contenido/epidoma-adeias";
import imeresAdeias from "./calculadoras/imeres-adeias";
import contenidoImeresAdeias from "./contenido/imeres-adeias";
import apozimiosiApolysis from "./calculadoras/apozimiosi-apolysis";
import contenidoApozimiosiApolysis from "./contenido/apozimiosi-apolysis";
import proeidopoiisiApolysis from "./calculadoras/proeidopoiisi-apolysis";
import contenidoProeidopoiisiApolysis from "./contenido/proeidopoiisi-apolysis";
import ypologismosYperorion from "./calculadoras/ypologismos-yperorion";
import contenidoYpologismosYperorion from "./contenido/ypologismos-yperorion";
import nychteriniErgasiaKyriaki from "./calculadoras/nychterini-ergasia-kyriaki";
import contenidoNychteriniErgasiaKyriaki from "./contenido/nychterini-ergasia-kyriaki";
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
    { definicion: ypologismosKatharouMisthou, contenido: contenidoYpologismosKatharouMisthou, cliente: () => import("./calculadoras/ypologismos-katharou-misthou.cliente") },
    { definicion: ypologismosMiktouApoKatharo, contenido: contenidoYpologismosMiktouApoKatharo, cliente: () => import("./calculadoras/ypologismos-miktou-apo-katharo.cliente") },
    { definicion: kostosErgodoti, contenido: contenidoKostosErgodoti, cliente: () => import("./calculadoras/kostos-ergodoti.cliente") },
    { definicion: asfalistikesEisforesMisthoton, contenido: contenidoAsfalistikesEisforesMisthoton, cliente: () => import("./calculadoras/asfalistikes-eisfores-misthoton.cliente") },
    { definicion: katotatosMisthos, contenido: contenidoKatotatosMisthos, cliente: () => import("./calculadoras/katotatos-misthos.cliente") },
    { definicion: doroChristougennon, contenido: contenidoDoroChristougennon, cliente: () => import("./calculadoras/doro-christougennon.cliente") },
    { definicion: doroPascha, contenido: contenidoDoroPascha, cliente: () => import("./calculadoras/doro-pascha.cliente") },
    { definicion: epidomaAdeias, contenido: contenidoEpidomaAdeias, cliente: () => import("./calculadoras/epidoma-adeias.cliente") },
    { definicion: imeresAdeias, contenido: contenidoImeresAdeias, cliente: () => import("./calculadoras/imeres-adeias.cliente") },
    { definicion: apozimiosiApolysis, contenido: contenidoApozimiosiApolysis, cliente: () => import("./calculadoras/apozimiosi-apolysis.cliente") },
    { definicion: proeidopoiisiApolysis, contenido: contenidoProeidopoiisiApolysis, cliente: () => import("./calculadoras/proeidopoiisi-apolysis.cliente") },
    { definicion: ypologismosYperorion, contenido: contenidoYpologismosYperorion, cliente: () => import("./calculadoras/ypologismos-yperorion.cliente") },
    { definicion: nychteriniErgasiaKyriaki, contenido: contenidoNychteriniErgasiaKyriaki, cliente: () => import("./calculadoras/nychterini-ergasia-kyriaki.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
