import { aplicarEscalaMarginal, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Todo lo que se descuenta de un sueldo mensual en Israel: מס הכנסה con sus מדרגות, נקודות זיכוי y
// el זיכוי del artículo 45א por la הפרשה a la pensión; ביטוח לאומי y מס בריאות en dos tramos
// (מופחת hasta la תקרה, מלא hasta la הכנסה מרבית); y la parte de la pensión que pone la persona.

export const REQUIERE_MAS = {
  "il.mas-hachnasa": "escala",
  "il.mas-yasaf": "mapa",
  "il.nekudat-zikui": "numero",
  "il.nekudot-bsis": "mapa",
} as const;

export const REQUIERE_PENSIA = {
  "il.zikui-pensia": "mapa",
  "il.zikui-pensia-tikra": "numero",
} as const;

export const REQUIERE_BL = {
  "il.bl-tikrot": "mapa",
  "il.bl-oved": "mapa",
  "il.mas-briut": "mapa",
} as const;

export const CAMPO_MIN = {
  id: "min",
  tipo: "opcion",
  etiqueta: "נקודות זיכוי בסיסיות",
  opciones: [
    { valor: "gever", etiqueta: "גבר (תושב ישראל)" },
    { valor: "isha", etiqueta: "אישה (תושבת ישראל, עם חצי נקודה נוספת)" },
  ],
  porDefecto: "gever",
} as const;

export const CAMPO_NEKUDOT = {
  id: "nekudotNosafot",
  tipo: "numero",
  etiqueta: "נקודות זיכוי נוספות",
  ayuda: "ילדים, תואר אקדמי, שירות צבאי, עלייה ועוד. המספר מופיע בטופס 101 או בתלוש. אם אין, השאירו 0.",
  min: 0,
  max: 30,
  porDefecto: 0,
} as const;

export const CAMPO_PENSIA = {
  id: "pensia",
  tipo: "porcentaje",
  etiqueta: "הפרשת העובד לפנסיה (%)",
  ayuda: "האחוז שמנוכה מהשכר לקרן הפנסיה, כפי שמופיע בתלוש.",
  min: 0,
  max: 10,
  porDefecto: 6,
} as const;

export interface ValoresMas {
  "il.mas-hachnasa": readonly FilaEscala[];
  "il.mas-yasaf": Readonly<Record<string, number>>;
  "il.nekudat-zikui": number;
  "il.nekudot-bsis": Readonly<Record<string, number>>;
}

export interface ValoresPensia {
  "il.zikui-pensia": Readonly<Record<string, number>>;
  "il.zikui-pensia-tikra": number;
}

export interface ValoresBl {
  "il.bl-tikrot": Readonly<Record<string, number>>;
  "il.bl-oved": Readonly<Record<string, number>>;
  "il.mas-briut": Readonly<Record<string, number>>;
}

export function nekudotZikui(v: ValoresMas, min: string, nosafot: number): number {
  const bsis = v["il.nekudot-bsis"];
  return enMapa(bsis, "toshav") + (min === "isha" ? enMapa(bsis, "isha") : 0) + nosafot;
}

export interface MasHachnasa {
  lifneiZikui: number;
  zikuiNekudot: number;
  zikuiPensia: number;
  masYasaf: number;
  mas: number;
  shiurShuli: number;
}

// Mes de un sueldo: el impuesto por מדרגות menos los créditos (nunca por debajo de cero) más el מס
// נוסף del 3 % sobre lo que pasa el umbral mensual.
export function masChodshi(bruto: number, nekudot: number, hafrashaPensia: number, v: ValoresMas, vp: ValoresPensia | null): MasHachnasa {
  const escala = v["il.mas-hachnasa"];
  const lifneiZikui = aplicarEscalaMarginal(escala, bruto);
  const zikuiNekudot = nekudot * v["il.nekudat-zikui"];
  let zikuiPensia = 0;
  if (vp) {
    const tikra = porcentaje(Math.min(bruto, vp["il.zikui-pensia-tikra"]), enMapa(vp["il.zikui-pensia"], "achuz-mezake"));
    zikuiPensia = porcentaje(Math.min(hafrashaPensia, tikra), enMapa(vp["il.zikui-pensia"], "shiur-zikui"));
  }
  const yasaf = v["il.mas-yasaf"];
  const masYasaf = porcentaje(Math.max(0, bruto - enMapa(yasaf, "saf-chodshi")), enMapa(yasaf, "shiur"));
  const neto = Math.max(0, lifneiZikui - zikuiNekudot - zikuiPensia);
  let shiurShuli = escala[0]?.tasa ?? 0;
  for (const f of escala) if (bruto > f.desde) shiurShuli = f.tasa;
  if (masYasaf > 0) shiurShuli += enMapa(yasaf, "shiur");
  return { lifneiZikui, zikuiNekudot, zikuiPensia, masYasaf, mas: neto + masYasaf, shiurShuli };
}

export interface BituachLeumi {
  bituachLeumi: number;
  masBriut: number;
  tikraMufchat: number;
  basis: number;
}

export function bituachChodshi(bruto: number, v: ValoresBl): BituachLeumi {
  const tikrot = v["il.bl-tikrot"];
  const basis = Math.min(bruto, enMapa(tikrot, "merbit"));
  const mufchat = Math.min(basis, enMapa(tikrot, "mufchat"));
  const male = Math.max(0, basis - mufchat);
  const bl = v["il.bl-oved"];
  const br = v["il.mas-briut"];
  return {
    bituachLeumi: porcentaje(mufchat, enMapa(bl, "mufchat")) + porcentaje(male, enMapa(bl, "male")),
    masBriut: porcentaje(mufchat, enMapa(br, "mufchat")) + porcentaje(male, enMapa(br, "male")),
    tikraMufchat: enMapa(tikrot, "mufchat"),
    basis,
  };
}

export interface Tlush {
  bruto: number;
  mas: MasHachnasa;
  bl: BituachLeumi;
  pensia: number;
  neto: number;
}

export function tlush(bruto: number, nekudot: number, achuzPensia: number, v: ValoresMas & ValoresPensia & ValoresBl, redondear: (n: number) => number): Tlush {
  const pensia = redondear(porcentaje(bruto, achuzPensia));
  const mas = masChodshi(bruto, nekudot, pensia, v, v);
  const bl = bituachChodshi(bruto, v);
  const neto = redondear(bruto - redondear(mas.mas) - redondear(bl.bituachLeumi) - redondear(bl.masBriut) - pensia);
  return { bruto, mas, bl, pensia, neto };
}
