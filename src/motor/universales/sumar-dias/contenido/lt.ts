import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dienų pridėjimas prie datos",
    title: tituloQueEntre(
      `Dienų pridėjimas prie datos ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Dienų pridėjimas ir atėmimas: skaičiuoklė",
      "Dienų pridėjimas prie datos",
    ),
    description: "Pridėkite prie datos arba atimkite kalendorines ar darbo dienas ir sužinokite, kuri diena gaunama. Tinka terminams ir mokėjimo datoms.",
    intro: [
      "Pasirinkite datą, dienų skaičių ir tai, ar dienas pridėti, ar atimti. Pamatysite galutinę datą ir savaitės dieną.",
      "Skaičiuojant darbo dienas, šeštadieniai ir sekmadieniai praleidžiami.",
    ],
    comoSeCalcula: [
      "Kalendorinių dienų atveju kiekviena įvesta diena kalendoriuje pasislenka per vieną dieną.",
      "Darbo dienų atveju skaičiuojama tik nuo pirmadienio iki penktadienio. Pradinė data neįskaičiuojama.",
      "Valstybinės šventės neatimamos, nes jos skiriasi pagal šalį ir regioną.",
    ],
    ejemplo: [
      `Data ${f(mas90)} gaunama, kai prie datos ${f(inicio)} pridedama 90 kalendorinių dienų.`,
      `Data ${f(aFecha(habil))} gaunama, kai prie datos ${f(inicio)} pridedama 15 darbo dienų.`,
    ],
    faq: [
      {
        pregunta: "Ar pradinė data skaičiuojama kaip pirmoji diena?",
        respuesta: "Ne. Kai prie pirmadienio pridedama 1 diena, gaunamas antradienis. Taip skaičiuojama dauguma terminų.",
      },
      {
        pregunta: "Kas nutinka, kai darbo dienos pridedamos nuo šeštadienio?",
        respuesta: "Pirmoji darbo diena yra kitas pirmadienis. Kai prie šeštadienio pridedama 1 darbo diena, gaunamas pirmadienis.",
      },
      {
        pregunta: "Ar skaičiuoklė atsižvelgia į keliamuosius metus?",
        respuesta: "Taip. Jei į laikotarpį patenka vasario 29-oji, ji skaičiuojama kaip papildoma diena.",
      },
    ],
    glosario: [
      { termino: "Kalendorinės dienos", definicion: "Visos kalendoriaus dienos, nė viena nepraleidžiama." },
      { termino: "Darbo dienos", definicion: "Šioje skaičiuoklėje dienos nuo pirmadienio iki penktadienio." },
    ],
  };
};
