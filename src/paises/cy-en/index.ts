import { definirEdicion } from "@/motor/registro";
import cy from "../cy";
import { DATOS } from "./lib/datos";
import { mercado } from "./mercado";
import textosChartosima from "./textos/chartosima";
import contenidoChartosima from "./contenido/chartosima";
import textosEisforesAutotelosErgazomenon from "./textos/eisfores-autotelos-ergazomenon";
import contenidoEisforesAutotelosErgazomenon from "./contenido/eisfores-autotelos-ergazomenon";
import textosEisforesGesy from "./textos/eisfores-gesy";
import contenidoEisforesGesy from "./contenido/eisfores-gesy";
import textosEisforesKoinonikonAsfaliseon from "./textos/eisfores-koinonikon-asfaliseon";
import contenidoEisforesKoinonikonAsfaliseon from "./contenido/eisfores-koinonikon-asfaliseon";
import textosEktaktiEisforaMerismata from "./textos/ektakti-eisfora-merismata";
import contenidoEktaktiEisforaMerismata from "./contenido/ektakti-eisfora-merismata";
import textosEtisiaAdeia from "./textos/etisia-adeia";
import contenidoEtisiaAdeia from "./contenido/etisia-adeia";
import textosForosKefalaiouchikonKerdon from "./textos/foros-kefalaiouchikon-kerdon";
import contenidoForosKefalaiouchikonKerdon from "./contenido/foros-kefalaiouchikon-kerdon";
import textosKatotatosMisthos from "./textos/katotatos-misthos";
import contenidoKatotatosMisthos from "./contenido/katotatos-misthos";
import textosKostosErgodoti from "./textos/kostos-ergodoti";
import contenidoKostosErgodoti from "./contenido/kostos-ergodoti";
import textosPliromePleonasmou from "./textos/plirome-pleonasmou";
import contenidoPliromePleonasmou from "./contenido/plirome-pleonasmou";
import textosProeidopoiisiTermatismou from "./textos/proeidopoiisi-termatismou";
import contenidoProeidopoiisiTermatismou from "./contenido/proeidopoiisi-termatismou";
import textosTeliMetavivasis from "./textos/teli-metavivasis";
import contenidoTeliMetavivasis from "./contenido/teli-metavivasis";
import textosTokoiKatatheseon from "./textos/tokoi-katatheseon";
import contenidoTokoiKatatheseon from "./contenido/tokoi-katatheseon";
import textosYpologismosForouEisodimatos from "./textos/ypologismos-forou-eisodimatos";
import contenidoYpologismosForouEisodimatos from "./contenido/ypologismos-forou-eisodimatos";
import textosYpologismosFpa from "./textos/ypologismos-fpa";
import contenidoYpologismosFpa from "./contenido/ypologismos-fpa";
import textosYpologismosKatharouMisthou from "./textos/ypologismos-katharou-misthou";
import contenidoYpologismosKatharouMisthou from "./contenido/ypologismos-katharou-misthou";
import textosYpologismosMiktouApoKatharo from "./textos/ypologismos-miktou-apo-katharo";
import contenidoYpologismosMiktouApoKatharo from "./contenido/ypologismos-miktou-apo-katharo";
import textosYpologismosPlithorismou from "./textos/ypologismos-plithorismou";
import contenidoYpologismosPlithorismou from "./contenido/ypologismos-plithorismou";

export default definirEdicion(cy, {
  mercado,
  traducciones: [
    { textos: textosChartosima, contenido: contenidoChartosima },
    { textos: textosEisforesAutotelosErgazomenon, contenido: contenidoEisforesAutotelosErgazomenon },
    { textos: textosEisforesGesy, contenido: contenidoEisforesGesy },
    { textos: textosEisforesKoinonikonAsfaliseon, contenido: contenidoEisforesKoinonikonAsfaliseon },
    { textos: textosEktaktiEisforaMerismata, contenido: contenidoEktaktiEisforaMerismata },
    { textos: textosEtisiaAdeia, contenido: contenidoEtisiaAdeia },
    { textos: textosForosKefalaiouchikonKerdon, contenido: contenidoForosKefalaiouchikonKerdon },
    { textos: textosKatotatosMisthos, contenido: contenidoKatotatosMisthos },
    { textos: textosKostosErgodoti, contenido: contenidoKostosErgodoti },
    { textos: textosPliromePleonasmou, contenido: contenidoPliromePleonasmou },
    { textos: textosProeidopoiisiTermatismou, contenido: contenidoProeidopoiisiTermatismou },
    { textos: textosTeliMetavivasis, contenido: contenidoTeliMetavivasis },
    { textos: textosTokoiKatatheseon, contenido: contenidoTokoiKatatheseon },
    { textos: textosYpologismosForouEisodimatos, contenido: contenidoYpologismosForouEisodimatos },
    { textos: textosYpologismosFpa, contenido: contenidoYpologismosFpa },
    { textos: textosYpologismosKatharouMisthou, contenido: contenidoYpologismosKatharouMisthou },
    { textos: textosYpologismosMiktouApoKatharo, contenido: contenidoYpologismosMiktouApoKatharo },
    { textos: textosYpologismosPlithorismou, contenido: contenidoYpologismosPlithorismou },
  ],
  universales: "todas",
  datos: DATOS,
});
