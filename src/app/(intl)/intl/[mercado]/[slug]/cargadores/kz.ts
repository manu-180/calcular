// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bolnichnye": () => import("@/paises/kz/calculadoras/bolnichnye"),
  "dekretnye": () => import("@/paises/kz/calculadoras/dekretnye"),
  "kalkulyator-depozita": () => import("@/paises/kz/calculadoras/kalkulyator-depozita"),
  "kalkulyator-inflyatsii": () => import("@/paises/kz/calculadoras/kalkulyator-inflyatsii"),
  "kalkulyator-ipn": () => import("@/paises/kz/calculadoras/kalkulyator-ipn"),
  "kalkulyator-nds": () => import("@/paises/kz/calculadoras/kalkulyator-nds"),
  "kalkulyator-zarplaty": () => import("@/paises/kz/calculadoras/kalkulyator-zarplaty"),
  "kurs-valyut": () => import("@/paises/kz/calculadoras/kurs-valyut"),
  "minimalnaya-zarplata": () => import("@/paises/kz/calculadoras/minimalnaya-zarplata"),
  "mrp-v-tenge": () => import("@/paises/kz/calculadoras/mrp-v-tenge"),
  "nalog-na-imushchestvo": () => import("@/paises/kz/calculadoras/nalog-na-imushchestvo"),
  "nalogi-rabotodatelya": () => import("@/paises/kz/calculadoras/nalogi-rabotodatelya"),
  "otpusknye": () => import("@/paises/kz/calculadoras/otpusknye"),
  "pensionnye-nakopleniya": () => import("@/paises/kz/calculadoras/pensionnye-nakopleniya"),
  "posobie-na-rozhdenie": () => import("@/paises/kz/calculadoras/posobie-na-rozhdenie"),
  "posobie-po-ukhodu-za-rebenkom": () => import("@/paises/kz/calculadoras/posobie-po-ukhodu-za-rebenkom"),
  "raschet-pri-uvolnenii": () => import("@/paises/kz/calculadoras/raschet-pri-uvolnenii"),
  "sverkhurochnye": () => import("@/paises/kz/calculadoras/sverkhurochnye"),
  "transportnyy-nalog": () => import("@/paises/kz/calculadoras/transportnyy-nalog"),
  "uproshchennaya-deklaratsiya": () => import("@/paises/kz/calculadoras/uproshchennaya-deklaratsiya"),
  "vznosy-ip-za-sebya": () => import("@/paises/kz/calculadoras/vznosy-ip-za-sebya"),
  "zarplata-na-ruki": () => import("@/paises/kz/calculadoras/zarplata-na-ruki"),
};
