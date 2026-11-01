// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "kalkulyator-nds": () => import("@/paises/tj/calculadoras/kalkulyator-nds"),
  "kalkulyator-zarplaty": () => import("@/paises/tj/calculadoras/kalkulyator-zarplaty"),
  "kurs-valyut": () => import("@/paises/tj/calculadoras/kurs-valyut"),
  "minimalnaya-zarplata": () => import("@/paises/tj/calculadoras/minimalnaya-zarplata"),
  "nalogi-rabotodatelya": () => import("@/paises/tj/calculadoras/nalogi-rabotodatelya"),
  "otpusknye": () => import("@/paises/tj/calculadoras/otpusknye"),
  "podokhodnyy-nalog": () => import("@/paises/tj/calculadoras/podokhodnyy-nalog"),
  "sotsialnyy-nalog": () => import("@/paises/tj/calculadoras/sotsialnyy-nalog"),
  "srok-preduprezhdeniya": () => import("@/paises/tj/calculadoras/srok-preduprezhdeniya"),
  "sverkhurochnye": () => import("@/paises/tj/calculadoras/sverkhurochnye"),
  "vykhodnoe-posobie": () => import("@/paises/tj/calculadoras/vykhodnoe-posobie"),
};
