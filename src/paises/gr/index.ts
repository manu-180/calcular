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
import ypologismosFpa from "./calculadoras/ypologismos-fpa";
import contenidoYpologismosFpa from "./contenido/ypologismos-fpa";
import ypologismosForouEisodimatos from "./calculadoras/ypologismos-forou-eisodimatos";
import contenidoYpologismosForouEisodimatos from "./contenido/ypologismos-forou-eisodimatos";
import forosEleftheronEpangelmation from "./calculadoras/foros-eleftheron-epangelmation";
import contenidoForosEleftheronEpangelmation from "./contenido/foros-eleftheron-epangelmation";
import eisforesEleftheronEpangelmation from "./calculadoras/eisfores-eleftheron-epangelmation";
import contenidoEisforesEleftheronEpangelmation from "./contenido/eisfores-eleftheron-epangelmation";
import ypologismosPlithorismou from "./calculadoras/ypologismos-plithorismou";
import contenidoYpologismosPlithorismou from "./contenido/ypologismos-plithorismou";
import forosMetavivasisAkinitou from "./calculadoras/foros-metavivasis-akinitou";
import contenidoForosMetavivasisAkinitou from "./contenido/foros-metavivasis-akinitou";
import forosEnoikion from "./calculadoras/foros-enoikion";
import contenidoForosEnoikion from "./contenido/foros-enoikion";
import tokoiKatatheseon from "./calculadoras/tokoi-katatheseon";
import contenidoTokoiKatatheseon from "./contenido/tokoi-katatheseon";
import elachistoTekmartoEisodima from "./calculadoras/elachisto-tekmarto-eisodima";
import contenidoElachistoTekmartoEisodima from "./contenido/elachisto-tekmarto-eisodima";
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
    { definicion: ypologismosFpa, contenido: contenidoYpologismosFpa, cliente: () => import("./calculadoras/ypologismos-fpa.cliente") },
    { definicion: ypologismosForouEisodimatos, contenido: contenidoYpologismosForouEisodimatos, cliente: () => import("./calculadoras/ypologismos-forou-eisodimatos.cliente") },
    { definicion: forosEleftheronEpangelmation, contenido: contenidoForosEleftheronEpangelmation, cliente: () => import("./calculadoras/foros-eleftheron-epangelmation.cliente") },
    { definicion: eisforesEleftheronEpangelmation, contenido: contenidoEisforesEleftheronEpangelmation, cliente: () => import("./calculadoras/eisfores-eleftheron-epangelmation.cliente") },
    { definicion: ypologismosPlithorismou, contenido: contenidoYpologismosPlithorismou, cliente: () => import("./calculadoras/ypologismos-plithorismou.cliente") },
    { definicion: forosMetavivasisAkinitou, contenido: contenidoForosMetavivasisAkinitou, cliente: () => import("./calculadoras/foros-metavivasis-akinitou.cliente") },
    { definicion: forosEnoikion, contenido: contenidoForosEnoikion, cliente: () => import("./calculadoras/foros-enoikion.cliente") },
    { definicion: tokoiKatatheseon, contenido: contenidoTokoiKatatheseon, cliente: () => import("./calculadoras/tokoi-katatheseon.cliente") },
    { definicion: elachistoTekmartoEisodima, contenido: contenidoElachistoTekmartoEisodima, cliente: () => import("./calculadoras/elachisto-tekmarto-eisodima.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
