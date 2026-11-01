import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Finansinio rezervo skaičiuoklė",
    title: tituloQueEntre(
      `Finansinio rezervo skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Finansinis rezervas: skaičiuoklė",
      "Finansinio rezervo skaičiuoklė",
    ),
    description: "Apskaičiuokite, kokio finansinio rezervo reikia pagal būtinas išlaidas ir per kiek mėnesių jį sukaupsite.",
    intro: [
      "Finansinis rezervas yra pinigų pagalvė tam, ko neįmanoma suplanuoti: darbo netekimui, sveikatos bėdoms ar netikėtam remontui namuose.",
      "Su juo nereikia skolintis ar gyventi iš kredito kortelės pačiu sunkiausiu metu. Įveskite būtinas išlaidas ir mėnesių skaičių, kurį norite padengti.",
    ],
    comoSeCalcula: [
      "Rekomenduojamas rezervas = būtinos mėnesio išlaidos × mėnesių skaičius.",
      "Dar reikia sutaupyti = rekomenduojamas rezervas − tai, ką jau turite.",
      "Mėnesiai iki tikslo = likusi suma ÷ per mėnesį atidedama suma, suapvalinta į didesnę pusę.",
    ],
    ejemplo: [
      `Kai būtinos išlaidos yra ${m(gastos)} per mėnesį, 6 mėnesių rezervas yra ${m(gastos * 6)}.`,
      `Kai kas mėnesį atidedate ${m(aporte)}, taupymo laikotarpis yra ${meses} ${formaLt(meses, "mėnuo", "mėnesiai", "mėnesių")}.`,
    ],
    faq: [
      {
        pregunta: "Kelių mėnesių išlaidoms turėtų užtekti finansinio rezervo?",
        respuesta:
          "Paprastai rekomenduojama turėti būtinų išlaidų rezervą nuo 3 iki 6 mėnesių. Jei pajamos nereguliarios, dirbate sau arba namų ūkis turi tik vieną pajamų šaltinį, geriau planuokite nuo 6 iki 12 mėnesių.",
      },
      {
        pregunta: "Kur laikyti finansinį rezervą?",
        respuesta: "Saugioje vietoje, iš kurios pinigus galite gauti tą pačią dieną, atskirai nuo kasdienių išlaidų kortelės. Tai nėra pinigai rizikingoms investicijoms: jie turi būti po ranka, kai prireiks.",
      },
      {
        pregunta: "Kas pirmiau: rezervas ar skolų grąžinimas?",
        respuesta: "Dažnai pirmiausia atidedama vieno mėnesio išlaidų suma, tada grąžinamos brangios skolos, pavyzdžiui, kredito kortelės, o galiausiai rezervas papildomas iki visos sumos.",
      },
    ],
    glosario: [
      { termino: "Būtinos išlaidos", definicion: "Mokėjimai, kuriuos reikia atlikti net ir nebegaunant pajamų: būstas, maistas, komunaliniai mokesčiai, sveikata." },
      { termino: "Likvidumas", definicion: "Kaip greitai galite pasinaudoti pinigais, kad jie neprarastų vertės." },
    ],
  };
};
