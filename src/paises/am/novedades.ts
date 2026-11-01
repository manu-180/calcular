import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "am.droshmanish-2026",
    fecha: "2026-11-01",
    titulo: "Դրոշմանիշային վճարը նվազել է",
    texto: "2026 թվականի հունվարի մեկից մինչև 1 000 000 դրամ աշխատավարձի դեպքում դրոշմանիշային վճարը ամսական 1000 դրամ է։ Ավելի բարձր աշխատավարձի դեպքում այն մնում է 15 000 դրամ։ 200 001 դրամ և ավելի ստացողների համար փոփոխությունը գործում է ավելի շուտ՝ օրենքի հրապարակման հաջորդ օրվանից։",
    vigenteDesde: "2026-01-01",
    calculadoras: ["am.droshmanishayin-vchar", "am.ashkhatavardzi-hashvich", "am.zut-hamakhar-ashkhatavardz"],
    fuente: {
      organismo: "ARLIS, ՀՀ արդարադատության նախարարություն",
      titulo: "ՀՕ-477-Ն, 17.12.2025",
      url: "https://www.arlis.am/hy/acts/218648",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "am.aroghjutyan-apahovagrutyun-2026",
    fecha: "2026-11-01",
    titulo: "Առողջության համընդհանուր ապահովագրավճարը",
    texto: "2025 թվականի դեկտեմբերի և 2026 թվականի աշխատավարձի համար 200 001 դրամից մինչև 500 000 դրամ աշխատավարձով աշխատողի մասով վճարվում է 4800 դրամ, 500 001 դրամից սկսած՝ 10 800 դրամ։ 2027 թվականի հունվարի մեկից ապահովագրավճարն ընդգրկում է նաև մինչև 200 000 դրամ աշխատավարձ ստացողներին։",
    vigenteDesde: "2026-01-01",
    calculadoras: ["am.aroghjutyan-apahovagravchar", "am.ashkhatavardzi-hashvich", "am.zut-hamakhar-ashkhatavardz", "am.gortatui-tsakhs"],
    fuente: {
      organismo: "ARLIS, ՀՀ արդարադատության նախարարություն",
      titulo: "ՀՕ-459-Ն, հոդվածներ 13, 45, 46",
      url: "https://www.arlis.am/hy/acts/218650/latest",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
