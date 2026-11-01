import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSr } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Kalkulator fonda za hitne slučajeve",
    title: tituloQueEntre(
      `Fond za hitne slučajeve: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Fond za hitne slučajeve: kalkulator",
      "Kalkulator fonda za hitne slučajeve",
    ),
    description: "Izračunajte koliki fond za hitne slučajeve vam treba prema neophodnim troškovima i za koliko meseci možete da ga uštedite.",
    intro: [
      "Fond za hitne slučajeve je finansijska rezerva za ono što ne može da se planira: gubitak posla, zdravstvene probleme ili iznenadni kvar u kući.",
      "Sa njim ne morate da se zadužujete ni da živite na kreditnoj kartici baš kada je najteže. Unesite neophodne troškove i broj meseci koje želite da pokrijete.",
    ],
    comoSeCalcula: [
      "Preporučeni fond = neophodni mesečni troškovi × broj meseci.",
      "Preostaje da uštedite = preporučeni fond − ono što već imate.",
      "Meseci do ciljnog iznosa = preostali iznos ÷ iznos koji mesečno odvajate, zaokruženo naviše.",
    ],
    ejemplo: [
      `Ako su vaši neophodni troškovi ${m(gastos)} mesečno, fond za 6 meseci iznosi ${m(gastos * 6)}.`,
      `Ako svakog meseca odvajate ${m(aporte)}, uštedećete ga za ${meses} ${formaSr(meses, "mesec", "meseca", "meseci")}.`,
    ],
    faq: [
      {
        pregunta: "Za koliko meseci treba da bude dovoljan fond za hitne slučajeve?",
        respuesta:
          "Obično se preporučuju neophodni troškovi za 3 do 6 meseci. Ako imate neredovna primanja, radite za sebe ili u domaćinstvu radi samo jedna osoba, računajte pre sa 6 do 12 meseci.",
      },
      {
        pregunta: "Gde čuvati fond za hitne slučajeve?",
        respuesta:
          "Na sigurnom mestu odakle novac možete dobiti istog dana, odvojeno od kartice za svakodnevne troškove. To nije novac za rizična ulaganja: treba da bude pri ruci kada zatreba.",
      },
      {
        pregunta: "Šta prvo: rezerva ili otplata dugova?",
        respuesta:
          "Čest redosled je da prvo odvojite troškove za jedan mesec, zatim otplatite skupe dugove kao što je kreditna kartica, a na kraju dopunite rezervu do punog iznosa.",
      },
    ],
    glosario: [
      { termino: "Neophodni troškovi", definicion: "Plaćanja koja morate izmiriti i kada prihod prestane: stanovanje, hrana, računi, zdravlje." },
      { termino: "Likvidnost", definicion: "Koliko brzo možete da upotrebite novac a da ne izgubi vrednost." },
    ],
  };
};
