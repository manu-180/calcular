// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "asgari-ucret-hesaplama": () => import("@/paises/tr/calculadoras/asgari-ucret-hesaplama"),
  "brutten-nete-maas-hesaplama": () => import("@/paises/tr/calculadoras/brutten-nete-maas-hesaplama"),
  "damga-vergisi-hesaplama": () => import("@/paises/tr/calculadoras/damga-vergisi-hesaplama"),
  "doviz-hesaplama": () => import("@/paises/tr/calculadoras/doviz-hesaplama"),
  "emlak-vergisi-hesaplama": () => import("@/paises/tr/calculadoras/emlak-vergisi-hesaplama"),
  "enflasyon-hesaplama": () => import("@/paises/tr/calculadoras/enflasyon-hesaplama"),
  "fazla-mesai-hesaplama": () => import("@/paises/tr/calculadoras/fazla-mesai-hesaplama"),
  "gelir-vergisi-hesaplama": () => import("@/paises/tr/calculadoras/gelir-vergisi-hesaplama"),
  "ihbar-tazminati-hesaplama": () => import("@/paises/tr/calculadoras/ihbar-tazminati-hesaplama"),
  "isveren-maliyeti-hesaplama": () => import("@/paises/tr/calculadoras/isveren-maliyeti-hesaplama"),
  "kdv-hesaplama": () => import("@/paises/tr/calculadoras/kdv-hesaplama"),
  "kidem-tazminati-hesaplama": () => import("@/paises/tr/calculadoras/kidem-tazminati-hesaplama"),
  "kira-artis-orani-hesaplama": () => import("@/paises/tr/calculadoras/kira-artis-orani-hesaplama"),
  "kira-stopaji-hesaplama": () => import("@/paises/tr/calculadoras/kira-stopaji-hesaplama"),
  "mevduat-faizi-hesaplama": () => import("@/paises/tr/calculadoras/mevduat-faizi-hesaplama"),
  "netten-brute-maas-hesaplama": () => import("@/paises/tr/calculadoras/netten-brute-maas-hesaplama"),
  "serbest-meslek-makbuzu-hesaplama": () => import("@/paises/tr/calculadoras/serbest-meslek-makbuzu-hesaplama"),
  "sgk-prim-hesaplama": () => import("@/paises/tr/calculadoras/sgk-prim-hesaplama"),
  "tapu-harci-hesaplama": () => import("@/paises/tr/calculadoras/tapu-harci-hesaplama"),
  "yillik-izin-hesaplama": () => import("@/paises/tr/calculadoras/yillik-izin-hesaplama"),
};
