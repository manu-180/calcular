// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "aylanma-soligi-kalkulyatori": () => import("@/paises/uz/calculadoras/aylanma-soligi-kalkulyatori"),
  "bhm-kalkulyatori": () => import("@/paises/uz/calculadoras/bhm-kalkulyatori"),
  "daromad-soligi-kalkulyatori": () => import("@/paises/uz/calculadoras/daromad-soligi-kalkulyatori"),
  "dekret-puli-hisoblash": () => import("@/paises/uz/calculadoras/dekret-puli-hisoblash"),
  "depozit-kalkulyatori": () => import("@/paises/uz/calculadoras/depozit-kalkulyatori"),
  "eng-kam-ish-haqi": () => import("@/paises/uz/calculadoras/eng-kam-ish-haqi"),
  "ijtimoiy-soliq-kalkulyatori": () => import("@/paises/uz/calculadoras/ijtimoiy-soliq-kalkulyatori"),
  "inflyatsiya-kalkulyatori": () => import("@/paises/uz/calculadoras/inflyatsiya-kalkulyatori"),
  "ish-haqi-kalkulyatori": () => import("@/paises/uz/calculadoras/ish-haqi-kalkulyatori"),
  "ishdan-boshatish-nafaqasi": () => import("@/paises/uz/calculadoras/ishdan-boshatish-nafaqasi"),
  "kasallik-nafaqasi": () => import("@/paises/uz/calculadoras/kasallik-nafaqasi"),
  "mol-mulk-soligi-kalkulyatori": () => import("@/paises/uz/calculadoras/mol-mulk-soligi-kalkulyatori"),
  "ogohlantirish-muddati": () => import("@/paises/uz/calculadoras/ogohlantirish-muddati"),
  "ortacha-ish-haqi-hisoblash": () => import("@/paises/uz/calculadoras/ortacha-ish-haqi-hisoblash"),
  "ortiqcha-ish-vaqti": () => import("@/paises/uz/calculadoras/ortiqcha-ish-vaqti"),
  "otpusknoy-hisoblash": () => import("@/paises/uz/calculadoras/otpusknoy-hisoblash"),
  "sof-ish-haqi-hisoblash": () => import("@/paises/uz/calculadoras/sof-ish-haqi-hisoblash"),
  "valyuta-kalkulyatori": () => import("@/paises/uz/calculadoras/valyuta-kalkulyatori"),
  "yer-soligi-kalkulyatori": () => import("@/paises/uz/calculadoras/yer-soligi-kalkulyatori"),
};
