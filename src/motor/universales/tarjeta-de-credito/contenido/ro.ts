import { pluralRo } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const luni = (n: number) => pluralRo(n, "lună", "luni");
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Calculator card de credit",
    title: tituloQueEntre(`Calculator card de credit: ${ctx.nombrePais}`, "Calculator card de credit: dobândă și rate", "Calculator card de credit"),
    description: "Aflați în câte luni achitați datoria de pe cardul de credit și câtă dobândă plătiți, cu o plată fixă sau cu plata minimă.",
    intro: [
      "Cardul de credit este de obicei cea mai scumpă datorie. Dacă plătiți doar suma minimă, rambursarea se întinde pe ani și dobânda se adună.",
      "Introduceți datoria, dobânda anuală și cât puteți plăti în fiecare lună. Vedeți când terminați, câtă dobândă plătiți și planul lună de lună.",
    ],
    comoSeCalcula: [
      "În fiecare lună se adaugă dobânda: datoria × dobânda anuală ÷ 12.",
      "Apoi se scade plata. Cu plata minimă, plata este un procent din datorie, dar nu mai mică decât un prag.",
      "Calculul se repetă până când datoria ajunge la zero. Dacă plata nu depășește dobânda, datoria nu scade niciodată.",
    ],
    ejemplo: [
      `O datorie de ${m(saldo)} cu dobânda de 22% pe an, cu o plată de ${m(fijo)} pe lună, se achită în ${luni(conFijo.meses)}, cu o dobândă de ${m(conFijo.intereses)}.`,
      `Dacă plătiți doar o sumă minimă de 3%, rambursarea durează ${luni(conMinimo.meses)} și dobânda urcă la ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Ce se întâmplă dacă plătesc doar suma minimă?",
        respuesta:
          "Plata minimă scade odată cu datoria, așa că plătiți tot mai puțin în fiecare lună și datoria se prelungește ani de zile. Dacă puteți, plătiți o sumă fixă mai mare, chiar și puțin mai mare.",
      },
      {
        pregunta: "Merită să refinanțez datoria de pe card cu un credit de nevoi personale?",
        respuesta: "Dacă dobânda creditului este mult mai mică decât cea a cardului, de obicei merită. Comparați dobânda totală a celor două variante, cu toate comisioanele incluse.",
      },
      {
        pregunta: "Ce card să achit mai întâi?",
        respuesta: "Plătiți suma minimă pe toate și puneți restul pe cardul cu dobânda cea mai mare. Așa plătiți cea mai mică dobândă în total.",
      },
    ],
    glosario: [
      { termino: "Plată minimă", definicion: "Cea mai mică sumă pe care o puteți plăti într-o lună fără penalități. Nu stinge datoria." },
      { termino: "Perioadă de grație", definicion: "Intervalul în care cumpărăturile cu cardul nu au dobândă dacă achitați integral datoria." },
      { termino: "Dobândă anuală", definicion: "Procentul pe an pe care cardul îl aplică datoriei pe care o reportați." },
    ],
  };
};
