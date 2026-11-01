import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-uz.bono",
  slug: "yarim-yillik-mukofot",
  campos: {
    sueldo: { etiqueta: "Oylik yalpi maosh" },
    meses: { etiqueta: "Shu yarim yilda ishlagan oylaringiz soni" },
    region: { etiqueta: "Ishlaydigan hududingiz" },
    regimen: { etiqueta: "Korxona hajmi", opciones: { general: "Oʻrta yoki yirik korxona", pequena: "Kichik korxona" } },
  },
  filas: {
    base: { etiqueta: "Hisobda ishlatilgan maosh" },
    bono: { etiqueta: "Mukofot" },
    bonificacion: { etiqueta: "Qoʻshimcha toʻlov" },
    total: { etiqueta: "Qoʻlingizga tegadigan jami summa" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Oylar soni kamida 1, koʻpi bilan 6 boʻlishi kerak.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Maoshingiz hududingizdagi eng kam ish haqidan past. Shuning uchun mukofot eng kam ish haqi asosida hisoblanadi.",
  },
});
