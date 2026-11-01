import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosIs: TextosUi<UiOvulacion> = {
  slug: "egglos",
  ui: () => ({
    fum: "Fyrsti dagur síðustu blæðinga",
    fumAyuda: "Fyrsti blæðingadagurinn, ekki sá síðasti.",
    ciclo: "Lengd tíðahrings (dagar)",
    cicloAyuda: "Frá fyrsta degi blæðinga að deginum fyrir næstu blæðingar. Ef lengdin er breytileg skaltu nota meðaltal.",
    ovulacion: "Áætlað egglos",
    fertilDesde: "Frjósamir dagar frá",
    fertilHasta: "Frjósamir dagar til",
    proxima: "Næstu blæðingar",
    tabla: "Næstu tíðahringir",
    colRegla: "Blæðingar",
    colDesde: "Frjósöm frá",
    colHasta: "Frjósöm til",
    colOvulacion: "Egglos",
    errorCiclo: "Lengd tíðahrings þarf að vera á bilinu 21 til 45 dagar.",
    aviso: "Þetta er áætlun fyrir reglulega tíðahringi. Hún er ekki getnaðarvörn og kemur ekki í stað mats ljósmóður, læknis eða annars heilbrigðisstarfsfólks.",
  }),
};
