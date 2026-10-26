import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Přičtení dní k datu",
    title: tituloQueEntre(
      `Přičtení dní k datu: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Přičtení a odečtení dní od data: kalkulačka",
      "Přičtení dní k datu",
    ),
    description: "Přičtěte nebo odečtěte kalendářní či pracovní dny od data a zjistěte, na který den výsledek připadne. Hodí se pro lhůty a dny splatnosti.",
    intro: [
      "Vyberte datum, počet dní a jestli je chcete přičíst, nebo odečíst. Uvidíte výsledné datum i den v týdnu.",
      "U pracovních dní kalkulačka vynechává soboty a neděle.",
    ],
    comoSeCalcula: [
      "U kalendářních dní se za každý zadaný den posune o jeden den v kalendáři.",
      "U pracovních dní se počítá jen pondělí až pátek. Výchozí datum se nezapočítává.",
      "Státní svátky se neodečítají, protože se liší podle země i regionu.",
    ],
    ejemplo: [
      `Když k datu ${f(inicio)} přičtete 90 kalendářních dní, vyjde ${f(mas90)}.`,
      `Když k datu ${f(inicio)} přičtete 15 pracovních dní, vyjde ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Počítá se výchozí datum jako první den?",
        respuesta: "Ne. Když k pondělí přičtete 1 den, vyjde úterý. Tak se počítá většina lhůt.",
      },
      {
        pregunta: "Co když přičítám pracovní dny od soboty?",
        respuesta: "Prvním pracovním dnem je následující pondělí. Když k sobotě přičtete 1 pracovní den, vyjde pondělí.",
      },
      {
        pregunta: "Počítá kalkulačka s přestupnými roky?",
        respuesta: "Ano. Pokud období zahrnuje 29. únor, počítá se jako den navíc.",
      },
    ],
    glosario: [
      { termino: "Kalendářní dny", definicion: "Všechny dny v kalendáři, žádný se nevynechává." },
      { termino: "Pracovní dny", definicion: "V této kalkulačce pondělí až pátek." },
    ],
  };
};
