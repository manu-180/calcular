import { definirCasos } from "@/motor/calculo";
import hivandutyanNpast from "./hivandutyan-npast";

const LEY = "https://www.arlis.am/hy/acts/205733/latest";

export default definirCasos(hivandutyanNpast, [
  { nombre: "400 000 դրամ՝ 10 օր", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 22 մասեր 2, 15: 80% = 320 000; / 30,4 = 10 526,3; × 10 = 105 263. Հոդված 6: գործատու 7 օր = 73 684." }, fecha: "2026-11-01", entrada: { mijin: 400000, orer: 10 }, esperado: { npast: 105263, gortatu: 73684, petutyun: 31579, himan: 320000 } },
  { nombre: "5 օր՝ միայն գործատու", origen: { tipo: "oficial", url: LEY, detalle: "5 օրը առաջին 7 օրվա մեջ է։ 10 526,3 × 5 = 52 632." }, fecha: "2026-11-01", entrada: { mijin: 400000, orer: 5 }, esperado: { npast: 52632, gortatu: 52632, petutyun: 0 } },
  { nombre: "Բարձր աշխատավարձ՝ սահմանով", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 22 մասեր 1, 3: 75 000 + 15 000 = 90 000 (բառացի ընթերցում), × 10 = 900 000. / 30,4 × 10 = 296 053." }, fecha: "2026-11-01", entrada: { mijin: 1500000, orer: 10 }, esperado: { npast: 296053, himan: 900000 } },
  { nombre: "Ցածր միջին՝ նվազագույն հիմք", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 22 մաս 6: 50% × 90 000 = 45 000. / 30,4 × 10 = 14 803." }, fecha: "2026-11-01", entrada: { mijin: 40000, orer: 10 }, esperado: { himan: 45000, npast: 14803 } },
]);
