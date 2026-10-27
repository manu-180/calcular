import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "il.rivuach-madregot-2026",
    fecha: "2026-10-24",
    titulo: "מדרגות המס של 20% ו-31% הורחבו לכל שנת 2026",
    texto:
      "החוק שאושר ב-31 במרץ 2026 הרחיב את מדרגות מס ההכנסה מינואר 2026: מדרגת ה-20% חלה עד 19,000 ש\"ח בחודש ומדרגת ה-31% עד 25,100 ש\"ח. מי שהכנסתו בטווח הזה משלם פחות מס. מחשבוני שכר הנטו, הברוטו מנטו ומס ההכנסה כבר משתמשים במדרגות החדשות.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["il.sachar-neto", "il.bruto-neto", "il.mas-hachnasa"],
    fuente: {
      organismo: "רשות המסים בישראל",
      titulo: "לוח עזר לחישוב מס הכנסה ממשכורת ושכר עבודה לחודש ינואר 2026 ואילך (מעודכן לאפריל 2026)",
      url: "https://www.gov.il/BlobFolder/generalpage/income-tax-monthly-deductions-booklet/he/generalInformation_income-tax-monthly-deductions-booklet_monthly-deductions-booklet-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "il.sachar-minimum-2026-04",
    fecha: "2026-10-24",
    titulo: "שכר המינימום עלה ל-6,443.85 ש\"ח בחודש",
    texto:
      "מ-1 באפריל 2026 שכר המינימום לעובד מגיל 18 הוא 6,443.85 ש\"ח בחודש ו-35.40 ש\"ח לשעה (לפי 182 שעות בחודש). מחשבון שכר המינימום כבר מעודכן.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["il.sachar-minimum"],
    fuente: {
      organismo: "המוסד לביטוח לאומי",
      titulo: "שכר מינימום (נתונים כלליים)",
      url: "https://www.btl.gov.il/Mediniyut/GeneralData/Pages/%D7%A9%D7%9B%D7%A8%20%D7%9E%D7%99%D7%A0%D7%99%D7%9E%D7%95%D7%9D.aspx",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
