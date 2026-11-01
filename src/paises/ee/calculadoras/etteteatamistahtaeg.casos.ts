import { definirCasos } from "@/motor/calculo";
import ette from "./etteteatamistahtaeg";

const TLS = "https://www.riigiteataja.ee/akt/TLS";

export default definirCasos(ette, [
  { nombre: "Alla aasta", origen: { tipo: "recalculado", url: TLS, detalle: "§ 97 lg 2 p 1: 15 päeva." }, fecha: "2026-10-15", entrada: { kes: "tooandja", aastad: 0.5, kuupaev: null }, esperado: { paevad: 15 } },
  { nombre: "Üks aasta", origen: { tipo: "recalculado", url: TLS, detalle: "§ 97 lg 2 p 2: 30 päeva." }, fecha: "2026-10-15", entrada: { kes: "tooandja", aastad: 1, kuupaev: "2026-11-01" }, esperado: { paevad: 30, viimane: "2026-12-01" } },
  { nombre: "Viis aastat", origen: { tipo: "recalculado", url: TLS, detalle: "§ 97 lg 2 p 3: 60 päeva." }, fecha: "2026-10-15", entrada: { kes: "tooandja", aastad: 5, kuupaev: null }, esperado: { paevad: 60 } },
  { nombre: "Kümme aastat", origen: { tipo: "recalculado", url: TLS, detalle: "§ 97 lg 2 p 4: 90 päeva." }, fecha: "2026-10-15", entrada: { kes: "tooandja", aastad: 10, kuupaev: null }, esperado: { paevad: 90 } },
  { nombre: "Töötaja", origen: { tipo: "recalculado", url: TLS, detalle: "§ 98 lg 1: 30 päeva sõltumata staažist." }, fecha: "2026-10-15", entrada: { kes: "tootaja", aastad: 15, kuupaev: null }, esperado: { paevad: 30 } },
]);
