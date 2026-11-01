import { definirCasos } from "@/motor/calculo";
import mayrutyanNpast from "./mayrutyan-npast";

const LEY = "https://www.arlis.am/hy/acts/205733/latest";

export default definirCasos(mayrutyanNpast, [
  { nombre: "400 000 դրամ՝ 140 օր", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 22 մասեր 1, 19: 400 000 / 30,4 × 140 = 1 842 105." }, fecha: "2026-11-01", entrada: { mijin: 400000, tesak: "sovorakan" }, esperado: { npast: 1842105, orer: 140 } },
  { nombre: "Բարդ ծննդաբերություն՝ 155 օր", origen: { tipo: "oficial", url: LEY, detalle: "ԱՕ հոդված 172: 155 օր։ 400 000 / 30,4 × 155 = 2 039 474." }, fecha: "2026-11-01", entrada: { mijin: 400000, tesak: "bard" }, esperado: { npast: 2039474, orer: 155 } },
  { nombre: "Սահմանով՝ 2 000 000 դրամ", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 22 մաս 5: 15 × 90 000 = 1 350 000 (բառացի ընթերցում). / 30,4 × 140 = 6 217 105." }, fecha: "2026-11-01", entrada: { mijin: 2000000, tesak: "sovorakan" }, esperado: { himan: 1350000, npast: 6217105 } },
]);
