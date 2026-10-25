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
  ],
  universales: "todas",
  novedades,
  detectores,
});
