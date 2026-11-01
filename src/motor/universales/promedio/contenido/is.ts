import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const c = (x: number) => formatearCifra(ctx, x);
  const ponderado = (7 * 20 + 8 * 30 + 9 * 50) / (20 + 30 + 50);
  const simple = (7 + 8 + 9) / 3;
  return {
    h1: "Reiknaðu vegið meðaltal",
    title: tituloQueEntre(
      `Vegið meðaltal: reiknaðu meðaltal með vægi | ${ctx.nombrePais}`,
      `Vegið meðaltal | ${ctx.nombrePais}`,
      "Vegið meðaltal",
    ),
    description: "Reiknaðu venjulegt eða vegið meðaltal með allt að 10 gildum og vægi hvers gildis, í prósentum, einingum eða fjölda skipta.",
    intro: [
      "Sláðu inn hverja einkunn eða gildi og hvað það vegur mikið. Þú sérð vegið meðaltal og venjulegt meðaltal hlið við hlið.",
      "Þetta hentar fyrir einkunnir í skóla eða háskóla og öll meðaltöl þar sem sum gildi telja meira en önnur.",
    ],
    comoSeCalcula: [
      "Venjulegt meðaltal = summa gildanna ÷ fjöldi gildanna.",
      "Vegið meðaltal = summa (gildi × vægi) ÷ summa vægisins.",
      "Vægið þarf ekki að vera 100 samanlagt, því reikningurinn deilir með summu þess.",
    ],
    ejemplo: [
      `Með 7 sem vegur 20%, 8 sem vegur 30% og 9 sem vegur 50% er vegið meðaltal ${n(ponderado)}.`,
      `Venjulegt meðaltal sömu þriggja gilda er ${n(simple)}. Nían vegur mest og dregur vegið meðaltal upp.`,
    ],
    faq: [
      {
        pregunta: "Hvernig reikna ég vegið meðaltal?",
        respuesta: "Margfaldaðu hvert gildi með vægi sínu, leggðu útkomurnar saman og deildu með samanlögðu vægi.",
      },
      {
        pregunta: "Hvað ef vægið er ekki 100% samanlagt?",
        respuesta: `Það gerir ekkert til. Ef einn áfangi er 6 einingar og annar 4 notarðu 6 og 4. Reikningurinn deilir með heildarvæginu, hér ${c(6 + 4)}.`,
      },
      {
        pregunta: "Hver er munurinn á venjulegu og vegnu meðaltali?",
        respuesta: "Í venjulegu meðaltali telja öll gildi jafn mikið. Í vegnu meðaltali telur hvert gildi eftir vægi sínu.",
      },
    ],
    glosario: [
      { termino: "Vægi", definicion: "Hvað eitt gildi hefur mikil áhrif á lokameðaltalið." },
      { termino: "Vegið meðaltal", definicion: "Meðaltal þar sem hvert gildi er margfaldað með vægi sínu." },
    ],
  };
};
