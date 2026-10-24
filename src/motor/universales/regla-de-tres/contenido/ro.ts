import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculator regula de trei simplă",
    title: tituloQueEntre(`Regula de trei simplă: ${ctx.nombrePais}`, "Calculator regula de trei simplă", "Regula de trei simplă"),
    description: "Rezolvați o regulă de trei simplă, directă sau inversă, într-o secundă. Introduceți trei valori și aflați a patra, cu calculul afișat.",
    intro: [
      "Regula de trei simplă se folosește când două mărimi variază împreună și cunoașteți trei dintre cele patru valori.",
      "Alegeți proporționalitatea directă sau inversă, completați A, B și C, iar calculatorul vă dă X.",
    ],
    comoSeCalcula: [
      "Directă: X = B × C ÷ A. Se folosește când cele două mărimi cresc împreună (mai multe kilograme, preț mai mare).",
      "Inversă: X = A × B ÷ C. Se folosește când una crește și cealaltă scade (mai mulți oameni, mai puține zile).",
    ],
    ejemplo: [
      `Dacă 3 kilograme costă ${m(precio3)}, 5 kilograme costă ${m((precio3 * 5) / 3)}.`,
      "Dacă 4 oameni zugrăvesc o casă în 12 zile, 6 oameni o zugrăvesc în 8 zile.",
    ],
    faq: [
      {
        pregunta: "Cum îmi dau seama dacă proporționalitatea este directă sau inversă?",
        respuesta: "Dacă o mărime crește când crește și cealaltă, este directă. Dacă una scade când cealaltă crește, este inversă.",
      },
      {
        pregunta: "Cum se face de mână regula de trei simplă directă?",
        respuesta: `Înmulțiți în cruce cele două valori cunoscute de pe diagonală și împărțiți la valoarea rămasă. Dacă lui 3 îi corespunde 600, lui 5 îi corespunde 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Se poate folosi pentru procente?",
        respuesta: "Da. Dacă 200 înseamnă 100%, atunci 50 înseamnă 25%: este o proporționalitate directă cu A = 200, B = 100 și C = 50.",
      },
    ],
    glosario: [
      { termino: "Proporționalitate directă", definicion: "Cele două mărimi cresc sau scad împreună." },
      { termino: "Proporționalitate inversă", definicion: "O mărime crește când cealaltă scade." },
    ],
  };
};
