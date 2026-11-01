import { definirCasos } from "@/motor/calculo";
import gortatuiTsakhs from "./gortatui-tsakhs";

export default definirCasos(gortatuiTsakhs, [
  {
    nombre: "Մեկ աշխատող՝ 400 000 դրամ",
    origen: { tipo: "recalculado", detalle: "Գործատուն առանձին սոցիալական վճար չունի: ծախսը հավասար է համախառնին՝ 400 000. Զուտ 294 200." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 400000, ashkhatoghner: 1, kutakayin: true, ahaGortatu: false },
    esperado: { amsakan: 400000, tarekan: 4800000, zut: 294200, aha: 4800 },
  },
  {
    nombre: "Գործատուն վճարում է ապահովագրավճարը",
    origen: { tipo: "recalculado", detalle: "ՀՕ-459-Ն հոդ։ 14 մաս 9: 700 000 + 10 800 = 710 800. Զուտ 700 000 - 140 000 - 45 000 - 1000 = 514 000." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 700000, ashkhatoghner: 2, kutakayin: true, ahaGortatu: true },
    esperado: { amsakan: 1421600, mekAshkhatogh: 710800, zut: 514000, aha: 10800 },
  },
]);
