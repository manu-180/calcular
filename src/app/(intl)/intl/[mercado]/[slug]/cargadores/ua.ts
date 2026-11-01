// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "dekretni": () => import("@/paises/ua/calculadoras/dekretni"),
  "indeks-infliatsii": () => import("@/paises/ua/calculadoras/indeks-infliatsii"),
  "kalkuliator-alimentiv": () => import("@/paises/ua/calculadoras/kalkuliator-alimentiv"),
  "kalkuliator-fop": () => import("@/paises/ua/calculadoras/kalkuliator-fop"),
  "kalkuliator-pdfo": () => import("@/paises/ua/calculadoras/kalkuliator-pdfo"),
  "kalkuliator-pdv": () => import("@/paises/ua/calculadoras/kalkuliator-pdv"),
  "kalkuliator-peni": () => import("@/paises/ua/calculadoras/kalkuliator-peni"),
  "kalkuliator-zarplaty": () => import("@/paises/ua/calculadoras/kalkuliator-zarplaty"),
  "kompensatsiia-vidpustky": () => import("@/paises/ua/calculadoras/kompensatsiia-vidpustky"),
  "kurs-valiut-nbu": () => import("@/paises/ua/calculadoras/kurs-valiut-nbu"),
  "likarniani": () => import("@/paises/ua/calculadoras/likarniani"),
  "minimalna-zarplata": () => import("@/paises/ua/calculadoras/minimalna-zarplata"),
  "podatok-na-depozyt": () => import("@/paises/ua/calculadoras/podatok-na-depozyt"),
  "podatok-z-prodazhu-avto": () => import("@/paises/ua/calculadoras/podatok-z-prodazhu-avto"),
  "podatok-z-prodazhu-neruhomosti": () => import("@/paises/ua/calculadoras/podatok-z-prodazhu-neruhomosti"),
  "ponadnormovi": () => import("@/paises/ua/calculadoras/ponadnormovi"),
  "rozrakhunok-vidpusknykh": () => import("@/paises/ua/calculadoras/rozrakhunok-vidpusknykh"),
  "try-vidsotky-richnykh": () => import("@/paises/ua/calculadoras/try-vidsotky-richnykh"),
  "vykhidna-dopomoha": () => import("@/paises/ua/calculadoras/vykhidna-dopomoha"),
  "vytraty-robotodavtsia": () => import("@/paises/ua/calculadoras/vytraty-robotodavtsia"),
  "yesv-dlia-fop": () => import("@/paises/ua/calculadoras/yesv-dlia-fop"),
  "zarplata-na-ruky": () => import("@/paises/ua/calculadoras/zarplata-na-ruky"),
};
