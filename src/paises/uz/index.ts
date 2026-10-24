import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import ishHaqiKalkulyatori from "./calculadoras/ish-haqi-kalkulyatori";
import contenidoIshHaqiKalkulyatori from "./contenido/ish-haqi-kalkulyatori";
import sofIshHaqiHisoblash from "./calculadoras/sof-ish-haqi-hisoblash";
import contenidoSofIshHaqiHisoblash from "./contenido/sof-ish-haqi-hisoblash";
import ijtimoiySoliqKalkulyatori from "./calculadoras/ijtimoiy-soliq-kalkulyatori";
import contenidoIjtimoiySoliqKalkulyatori from "./contenido/ijtimoiy-soliq-kalkulyatori";
import daromadSoligiKalkulyatori from "./calculadoras/daromad-soligi-kalkulyatori";
import contenidoDaromadSoligiKalkulyatori from "./contenido/daromad-soligi-kalkulyatori";
import engKamIshHaqi from "./calculadoras/eng-kam-ish-haqi";
import contenidoEngKamIshHaqi from "./contenido/eng-kam-ish-haqi";
import bhmKalkulyatori from "./calculadoras/bhm-kalkulyatori";
import contenidoBhmKalkulyatori from "./contenido/bhm-kalkulyatori";
import otpusknoyHisoblash from "./calculadoras/otpusknoy-hisoblash";
import contenidoOtpusknoyHisoblash from "./contenido/otpusknoy-hisoblash";
import ortachaIshHaqiHisoblash from "./calculadoras/ortacha-ish-haqi-hisoblash";
import contenidoOrtachaIshHaqiHisoblash from "./contenido/ortacha-ish-haqi-hisoblash";
import kasallikNafaqasi from "./calculadoras/kasallik-nafaqasi";
import contenidoKasallikNafaqasi from "./contenido/kasallik-nafaqasi";
import dekretPuliHisoblash from "./calculadoras/dekret-puli-hisoblash";
import contenidoDekretPuliHisoblash from "./contenido/dekret-puli-hisoblash";
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
    { definicion: ishHaqiKalkulyatori, contenido: contenidoIshHaqiKalkulyatori, cliente: () => import("./calculadoras/ish-haqi-kalkulyatori.cliente") },
    { definicion: sofIshHaqiHisoblash, contenido: contenidoSofIshHaqiHisoblash, cliente: () => import("./calculadoras/sof-ish-haqi-hisoblash.cliente") },
    { definicion: ijtimoiySoliqKalkulyatori, contenido: contenidoIjtimoiySoliqKalkulyatori, cliente: () => import("./calculadoras/ijtimoiy-soliq-kalkulyatori.cliente") },
    { definicion: daromadSoligiKalkulyatori, contenido: contenidoDaromadSoligiKalkulyatori, cliente: () => import("./calculadoras/daromad-soligi-kalkulyatori.cliente") },
    { definicion: engKamIshHaqi, contenido: contenidoEngKamIshHaqi, cliente: () => import("./calculadoras/eng-kam-ish-haqi.cliente") },
    { definicion: bhmKalkulyatori, contenido: contenidoBhmKalkulyatori, cliente: () => import("./calculadoras/bhm-kalkulyatori.cliente") },
    { definicion: otpusknoyHisoblash, contenido: contenidoOtpusknoyHisoblash, cliente: () => import("./calculadoras/otpusknoy-hisoblash.cliente") },
    { definicion: ortachaIshHaqiHisoblash, contenido: contenidoOrtachaIshHaqiHisoblash, cliente: () => import("./calculadoras/ortacha-ish-haqi-hisoblash.cliente") },
    { definicion: kasallikNafaqasi, contenido: contenidoKasallikNafaqasi, cliente: () => import("./calculadoras/kasallik-nafaqasi.cliente") },
    { definicion: dekretPuliHisoblash, contenido: contenidoDekretPuliHisoblash, cliente: () => import("./calculadoras/dekret-puli-hisoblash.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "uz.qqs" } }] },
  novedades,
  detectores,
});
