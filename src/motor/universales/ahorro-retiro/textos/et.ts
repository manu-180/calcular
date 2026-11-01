import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosEt: TextosUi<UiAhorroRetiro> = {
  slug: "pensionisaastmine",
  ui: () => ({
    edadActual: "Sinu praegune vanus",
    edadRetiro: "Vanus, mil soovid pensionile jääda",
    actual: "Juba säästetud summa",
    aporte: "Igakuine sääst",
    rendimiento: "Reaaltootlus aastas (%)",
    rendimientoAyuda: "Säästude tootlus pärast inflatsiooni. Ettevaatlik pikaajaline eeldus on 2-5%.",
    aniosRenta: "Aastad, mille jooksul säästud peavad pensionil vastu pidama",
    aniosRentaAyuda: "Mitu aastat soovid oma säästudest raha välja võtta.",
    capital: "Säästud pensionile jäädes",
    renta: "Igakuine väljamakse säästudest",
    aportado: "Sissemaksed kokku",
    intereses: "Väärtuse kasv kokku",
    tabla: "Muutus vanuse järgi",
    colEdad: "Vanus",
    colAportado: "Seni sisse makstud",
    colSaldo: "Säästud",
    errorEdades: "Pensioniiga peab olema suurem kui sinu praegune vanus.",
    errorSinAhorro: "Sisesta oma praegused säästud või igakuine sääst.",
    observacionDineroDeHoy: "Summad on tänases rahas, sest tootlusest on inflatsioon juba maha arvatud.",
    observacionPublica: "Siin on arvesse võetud ainult sinu enda säästud. Riiklik pension ja tööandja lisapension ei ole arvestuses.",
  }),
};
