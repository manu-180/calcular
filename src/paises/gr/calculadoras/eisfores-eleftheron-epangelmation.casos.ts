import { definirCasos } from "@/motor/calculo";
import eisforesEleftheronEpangelmation from "./eisfores-eleftheron-epangelmation";

const EFKA =
  "https://www.e-efka.gov.gr/sites/default/files/2026-02/%CE%91%CF%83%CF%86%CE%B1%CE%BB%CE%B9%CF%83%CF%84%CE%B9%CE%BA%CE%AD%CF%82_%CE%B5%CE%B9%CF%83%CF%86%CE%BF%CF%81%CE%AD%CF%82_%CE%AD%CF%84%CE%BF%CF%85%CF%82_2026_%CE%BC%CE%B7_%CE%BC%CE%B9%CF%83%CE%B8%CF%89%CF%84%CF%8E%CE%BD_%CE%95%CE%BB%CE%B5%CF%85%CE%B8%CE%AD%CF%81%CF%89%CE%BD_%CE%95%CF%80%CE%B1%CE%B3%CE%B3%CE%B5%CE%BB%CE%BC%CE%B1%CF%84%CE%B9%CF%8E%CE%BD_%CE%91%CF%85%CF%84%CE%BF%CE%B1%CF%80%CE%B1%CF%83%CF%87%CE%BF%CE%BB%CE%BF%CF%8D%CE%BC%CE%B5%CE%BD%CF%89%CE%BD_%CE%91%CE%B3%CF%81%CE%BF%CF%84%CF%8E%CE%BD_V1.pdf";

export default definirCasos(eisforesEleftheronEpangelmation, [
  {
    nombre: "1η κατηγορία με ανεργία",
    origen: { tipo: "oficial", url: EFKA, detalle: "Εγκύκλιος 6/2026: 1η κατηγορία 250,77 (185,09 σύνταξη, 5,97 + 59,71 υγεία), συν 10 € ανεργία = 260,77. × 12 = 3129,24." },
    fecha: "2026-10-24",
    entrada: { kategoria: "1", anergia: true, epikouriki: "0", efapax: "0" },
    esperado: { mina: 260.77, syntaxi: 185.09, ygeia: 65.68, etos: 3129.24 },
  },
  {
    nombre: "6η κατηγορία με επικουρική και εφάπαξ 3ης κατηγορίας",
    origen: { tipo: "oficial", url: EFKA, detalle: "675,87 + 10 + 66,88 + 44,18 = 796,93 τον μήνα." },
    fecha: "2026-10-24",
    entrada: { kategoria: "6", anergia: true, epikouriki: "3", efapax: "3" },
    esperado: { mina: 796.93, etos: 9563.16 },
  },
]);
