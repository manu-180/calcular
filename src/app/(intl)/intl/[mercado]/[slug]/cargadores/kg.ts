// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "alimenty": () => import("@/paises/kg/calculadoras/alimenty"),
  "bolnichnye": () => import("@/paises/kg/calculadoras/bolnichnye"),
  "dekretnye": () => import("@/paises/kg/calculadoras/dekretnye"),
  "edinyy-nalog": () => import("@/paises/kg/calculadoras/edinyy-nalog"),
  "ispytatelnyy-srok": () => import("@/paises/kg/calculadoras/ispytatelnyy-srok"),
  "kalkulyator-inflyatsii": () => import("@/paises/kg/calculadoras/kalkulyator-inflyatsii"),
  "kalkulyator-nds": () => import("@/paises/kg/calculadoras/kalkulyator-nds"),
  "kalkulyator-zarplaty": () => import("@/paises/kg/calculadoras/kalkulyator-zarplaty"),
  "kompensatsiya-za-otpusk": () => import("@/paises/kg/calculadoras/kompensatsiya-za-otpusk"),
  "kurs-valyut": () => import("@/paises/kg/calculadoras/kurs-valyut"),
  "minimalnaya-zarplata": () => import("@/paises/kg/calculadoras/minimalnaya-zarplata"),
  "nalog-na-pribyl": () => import("@/paises/kg/calculadoras/nalog-na-pribyl"),
  "nalog-s-prodazh": () => import("@/paises/kg/calculadoras/nalog-s-prodazh"),
  "nalogi-rabotodatelya": () => import("@/paises/kg/calculadoras/nalogi-rabotodatelya"),
  "otpusknye": () => import("@/paises/kg/calculadoras/otpusknye"),
  "penya-po-nalogam": () => import("@/paises/kg/calculadoras/penya-po-nalogam"),
  "podokhodnyy-nalog": () => import("@/paises/kg/calculadoras/podokhodnyy-nalog"),
  "raschet-pri-uvolnenii": () => import("@/paises/kg/calculadoras/raschet-pri-uvolnenii"),
  "raschetnyy-pokazatel": () => import("@/paises/kg/calculadoras/raschetnyy-pokazatel"),
  "srok-preduprezhdeniya": () => import("@/paises/kg/calculadoras/srok-preduprezhdeniya"),
  "strakhovye-vznosy": () => import("@/paises/kg/calculadoras/strakhovye-vznosy"),
  "sverkhurochnye": () => import("@/paises/kg/calculadoras/sverkhurochnye"),
  "vykhodnoe-posobie": () => import("@/paises/kg/calculadoras/vykhodnoe-posobie"),
  "zaderzhka-zarplaty": () => import("@/paises/kg/calculadoras/zaderzhka-zarplaty"),
  "zarplata-na-ruki": () => import("@/paises/kg/calculadoras/zarplata-na-ruki"),
};
