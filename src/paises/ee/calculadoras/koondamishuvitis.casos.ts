import { definirCasos } from "@/motor/calculo";
import koondamine from "./koondamishuvitis";

const TKS = "https://www.riigiteataja.ee/akt/TKindlS";

export default definirCasos(koondamine, [
  { nombre: "Alla viie aasta", origen: { tipo: "recalculado", url: "https://www.riigiteataja.ee/akt/TLS", detalle: "TLS § 100 lg 1: üks kuu; TKS § 141: alla 5 aasta kindlustushüvitist pole." }, fecha: "2026-10-15", entrada: { palk: 2000, aastad: 3 }, esperado: { kokku: 2000, tootukassa: 0 } },
  { nombre: "Täpselt viis aastat", origen: { tipo: "recalculado", url: TKS, detalle: "§ 142 lg 1 p 1: üks kuu." }, fecha: "2026-10-15", entrada: { palk: 2000, aastad: 5 }, esperado: { kokku: 4000, tootukassa: 2000 } },
  { nombre: "Täpselt kümme aastat", origen: { tipo: "recalculado", url: TKS, detalle: "§ 142 lg 1 p 1: viis kuni kümme aastat, üks kuu." }, fecha: "2026-10-15", entrada: { palk: 2000, aastad: 10 }, esperado: { tootukassa: 2000 } },
  { nombre: "12 aastat", origen: { tipo: "recalculado", url: TKS, detalle: "§ 142 lg 1 p 2: üle kümne aasta, kaks kuud; 2000 + 4000 = 6000." }, fecha: "2026-10-15", entrada: { palk: 2000, aastad: 12 }, esperado: { kokku: 6000, tootukassaKuud: 2 } },
]);
