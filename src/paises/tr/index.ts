import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttenNeteMaasHesaplama from "./calculadoras/brutten-nete-maas-hesaplama";
import nettenBruteMaasHesaplama from "./calculadoras/netten-brute-maas-hesaplama";
import asgariUcretHesaplama from "./calculadoras/asgari-ucret-hesaplama";
import isverenMaliyetiHesaplama from "./calculadoras/isveren-maliyeti-hesaplama";
import sgkPrimHesaplama from "./calculadoras/sgk-prim-hesaplama";
import kidemTazminatiHesaplama from "./calculadoras/kidem-tazminati-hesaplama";
import ihbarTazminatiHesaplama from "./calculadoras/ihbar-tazminati-hesaplama";
import yillikIzinHesaplama from "./calculadoras/yillik-izin-hesaplama";
import fazlaMesaiHesaplama from "./calculadoras/fazla-mesai-hesaplama";
import contenidoBruttenNeteMaasHesaplama from "./contenido/brutten-nete-maas-hesaplama";
import contenidoNettenBruteMaasHesaplama from "./contenido/netten-brute-maas-hesaplama";
import contenidoAsgariUcretHesaplama from "./contenido/asgari-ucret-hesaplama";
import contenidoIsverenMaliyetiHesaplama from "./contenido/isveren-maliyeti-hesaplama";
import contenidoSgkPrimHesaplama from "./contenido/sgk-prim-hesaplama";
import contenidoKidemTazminatiHesaplama from "./contenido/kidem-tazminati-hesaplama";
import contenidoIhbarTazminatiHesaplama from "./contenido/ihbar-tazminati-hesaplama";
import contenidoYillikIzinHesaplama from "./contenido/yillik-izin-hesaplama";
import contenidoFazlaMesaiHesaplama from "./contenido/fazla-mesai-hesaplama";
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
    { definicion: bruttenNeteMaasHesaplama, contenido: contenidoBruttenNeteMaasHesaplama, cliente: () => import("./calculadoras/brutten-nete-maas-hesaplama.cliente") },
    { definicion: nettenBruteMaasHesaplama, contenido: contenidoNettenBruteMaasHesaplama, cliente: () => import("./calculadoras/netten-brute-maas-hesaplama.cliente") },
    { definicion: asgariUcretHesaplama, contenido: contenidoAsgariUcretHesaplama, cliente: () => import("./calculadoras/asgari-ucret-hesaplama.cliente") },
    { definicion: isverenMaliyetiHesaplama, contenido: contenidoIsverenMaliyetiHesaplama, cliente: () => import("./calculadoras/isveren-maliyeti-hesaplama.cliente") },
    { definicion: sgkPrimHesaplama, contenido: contenidoSgkPrimHesaplama, cliente: () => import("./calculadoras/sgk-prim-hesaplama.cliente") },
    { definicion: kidemTazminatiHesaplama, contenido: contenidoKidemTazminatiHesaplama, cliente: () => import("./calculadoras/kidem-tazminati-hesaplama.cliente") },
    { definicion: ihbarTazminatiHesaplama, contenido: contenidoIhbarTazminatiHesaplama, cliente: () => import("./calculadoras/ihbar-tazminati-hesaplama.cliente") },
    { definicion: yillikIzinHesaplama, contenido: contenidoYillikIzinHesaplama, cliente: () => import("./calculadoras/yillik-izin-hesaplama.cliente") },
    { definicion: fazlaMesaiHesaplama, contenido: contenidoFazlaMesaiHesaplama, cliente: () => import("./calculadoras/fazla-mesai-hesaplama.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
