import { GRAMATICA } from "../../../i18n/gramatica";
import { formaHr } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Kalkulator fonda za hitne slučajeve",
    title: tituloQueEntre(
      `Fond za hitne slučajeve: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Fond za hitne slučajeve: kalkulator",
      "Kalkulator fonda za hitne slučajeve",
    ),
    description: "Izračunajte koliki vam fond za hitne slučajeve treba prema nužnim troškovima i za koliko ga mjeseci možete uštedjeti.",
    intro: [
      "Fond za hitne slučajeve financijska je rezerva za ono što se ne može planirati: gubitak posla, zdravstvene probleme ili iznenadni kvar u kući.",
      "S njim se ne morate zaduživati ni živjeti na kreditnoj kartici baš kada je najteže. Unesite nužne troškove i broj mjeseci koje želite pokriti.",
    ],
    comoSeCalcula: [
      "Preporučeni fond = nužni mjesečni troškovi × broj mjeseci.",
      "Preostaje uštedjeti = preporučeni fond − ono što već imate.",
      "Mjeseci do ciljnog iznosa = preostali iznos ÷ iznos koji mjesečno odvajate, zaokruženo na više.",
    ],
    ejemplo: [
      `Ako su vaši nužni troškovi ${m(gastos)} mjesečno, fond za 6 mjeseci iznosi ${m(gastos * 6)}.`,
      `Ako svakog mjeseca odvajate ${m(aporte)}, uštedjet ćete ga za ${meses} ${formaHr(meses, "mjesec", "mjeseca", "mjeseci")}.`,
    ],
    faq: [
      {
        pregunta: "Za koliko mjeseci treba biti dovoljan fond za hitne slučajeve?",
        respuesta:
          "Obično se preporučuju nužni troškovi za 3 do 6 mjeseci. Ako imate neredovita primanja, radite za sebe ili u kućanstvu radi samo jedna osoba, računajte radije na 6 do 12 mjeseci.",
      },
      {
        pregunta: "Gdje čuvati fond za hitne slučajeve?",
        respuesta:
          "Na sigurnom mjestu s kojeg novac možete dobiti istog dana, odvojeno od kartice za svakodnevne troškove. To nije novac za rizična ulaganja: treba biti pri ruci kada zatreba.",
      },
      {
        pregunta: "Što prvo: rezerva ili otplata dugova?",
        respuesta:
          "Čest je redoslijed da najprije odvojite troškove za jedan mjesec, zatim otplatite skupe dugove kao što je kreditna kartica, a na kraju dopunite rezervu do punog iznosa.",
      },
    ],
    glosario: [
      { termino: "Nužni troškovi", definicion: "Plaćanja koja morate podmiriti i kada prihod prestane: stanovanje, hrana, računi, zdravlje." },
      { termino: "Likvidnost", definicion: "Koliko brzo možete upotrijebiti novac, a da ne izgubi vrijednost." },
    ],
  };
};
