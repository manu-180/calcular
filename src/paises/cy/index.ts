import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import ypologismosKatharouMisthou from "./calculadoras/ypologismos-katharou-misthou";
import contenidoYpologismosKatharouMisthou from "./contenido/ypologismos-katharou-misthou";
import ypologismosMiktouApoKatharo from "./calculadoras/ypologismos-miktou-apo-katharo";
import contenidoYpologismosMiktouApoKatharo from "./contenido/ypologismos-miktou-apo-katharo";
import ypologismosForouEisodimatos from "./calculadoras/ypologismos-forou-eisodimatos";
import contenidoYpologismosForouEisodimatos from "./contenido/ypologismos-forou-eisodimatos";
import eisforesKoinonikonAsfaliseon from "./calculadoras/eisfores-koinonikon-asfaliseon";
import contenidoEisforesKoinonikonAsfaliseon from "./contenido/eisfores-koinonikon-asfaliseon";
import kostosErgodoti from "./calculadoras/kostos-ergodoti";
import contenidoKostosErgodoti from "./contenido/kostos-ergodoti";
import eisforesGesy from "./calculadoras/eisfores-gesy";
import contenidoEisforesGesy from "./contenido/eisfores-gesy";
import katotatosMisthos from "./calculadoras/katotatos-misthos";
import contenidoKatotatosMisthos from "./contenido/katotatos-misthos";
import ypologismosFpa from "./calculadoras/ypologismos-fpa";
import contenidoYpologismosFpa from "./contenido/ypologismos-fpa";
import etisiaAdeia from "./calculadoras/etisia-adeia";
import contenidoEtisiaAdeia from "./contenido/etisia-adeia";
import proeidopoiisiTermatismou from "./calculadoras/proeidopoiisi-termatismou";
import contenidoProeidopoiisiTermatismou from "./contenido/proeidopoiisi-termatismou";
import pliromePleonasmou from "./calculadoras/plirome-pleonasmou";
import contenidoPliromePleonasmou from "./contenido/plirome-pleonasmou";
import eisforesAutotelosErgazomenon from "./calculadoras/eisfores-autotelos-ergazomenon";
import contenidoEisforesAutotelosErgazomenon from "./contenido/eisfores-autotelos-ergazomenon";
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
    { definicion: ypologismosForouEisodimatos, contenido: contenidoYpologismosForouEisodimatos, cliente: () => import("./calculadoras/ypologismos-forou-eisodimatos.cliente") },
    { definicion: eisforesKoinonikonAsfaliseon, contenido: contenidoEisforesKoinonikonAsfaliseon, cliente: () => import("./calculadoras/eisfores-koinonikon-asfaliseon.cliente") },
    { definicion: kostosErgodoti, contenido: contenidoKostosErgodoti, cliente: () => import("./calculadoras/kostos-ergodoti.cliente") },
    { definicion: eisforesGesy, contenido: contenidoEisforesGesy, cliente: () => import("./calculadoras/eisfores-gesy.cliente") },
    { definicion: katotatosMisthos, contenido: contenidoKatotatosMisthos, cliente: () => import("./calculadoras/katotatos-misthos.cliente") },
    { definicion: ypologismosFpa, contenido: contenidoYpologismosFpa, cliente: () => import("./calculadoras/ypologismos-fpa.cliente") },
    { definicion: etisiaAdeia, contenido: contenidoEtisiaAdeia, cliente: () => import("./calculadoras/etisia-adeia.cliente") },
    { definicion: proeidopoiisiTermatismou, contenido: contenidoProeidopoiisiTermatismou, cliente: () => import("./calculadoras/proeidopoiisi-termatismou.cliente") },
    { definicion: pliromePleonasmou, contenido: contenidoPliromePleonasmou, cliente: () => import("./calculadoras/plirome-pleonasmou.cliente") },
    { definicion: eisforesAutotelosErgazomenon, contenido: contenidoEisforesAutotelosErgazomenon, cliente: () => import("./calculadoras/eisfores-autotelos-ergazomenon.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
