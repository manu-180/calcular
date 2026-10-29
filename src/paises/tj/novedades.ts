import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tj.kurs-nbt-2026-10",
    fecha: "2026-10-29",
    titulo: "Курс сомони обновляется по ленте Национального банка",
    texto: "Калькулятор курса берет официальные курсы доллара, евро, рубля, юаня и тенге из ленты Национального банка Таджикистана. На 29 октября 2026 года доллар стоит 9,2174 сомони.",
    vigenteDesde: "2026-10-29",
    calculadoras: ["tj.kurs-valyut"],
    fuente: {
      organismo: "Национальный банк Таджикистана",
      titulo: "Официальные курсы валют к сомони на 29.10.2026",
      url: "https://nbt.tj/ru/kurs/kurs.php",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
