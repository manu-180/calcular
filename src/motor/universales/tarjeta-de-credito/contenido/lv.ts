import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const menesi = (n: number) => `${formatearNumero(ctx, n)} ${formaLv(n, "mēnesis", "mēneši", "mēnešu")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kredītkartes atmaksas kalkulators",
    title: tituloQueEntre(
      `Kredītkartes kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Kredītkartes atmaksa: procenti un ilgums",
      "Kredītkartes kalkulators",
    ),
    description: "Uzziniet, cik ilgi atmaksāsiet kredītkarti un cik samaksāsiet procentos, ja maksājat fiksētu vai minimālo maksājumu.",
    intro: [
      "Kredītkarte bieži ir visdārgākais parāds. Ja maksājat tikai minimumu, atmaksa ievelkas gadiem, un procenti uzkrājas.",
      "Ievadiet parādu, gada procentu likmi un summu, ko varat maksāt katru mēnesi. Parādīsim, kad parāds būs atmaksāts, cik samaksāsiet procentos, un plānu pa mēnešiem.",
    ],
    comoSeCalcula: [
      "Katru mēnesi pieskaita procentus: atlikums × gada likme ÷ 12.",
      "Pēc tam atņem maksājumu. Minimālais maksājums ir procents no parāda, bet ne mazāks par noteiktu summu.",
      "To atkārto, līdz atlikums sasniedz nulli. Ja maksājums nav lielāks par procentiem, parāds nekad nesamazināsies.",
    ],
    ejemplo: [
      `Ja parāds ir ${m(saldo)}, gada procentu likme 22%, bet maksājums ${m(fijo)} mēnesī, atmaksas ilgums ir ${menesi(conFijo.meses)}, un procentos samaksāsiet ${m(conFijo.intereses)}.`,
      `Ja maksājat tikai 3% minimālo maksājumu, ilgums ir ${menesi(conMinimo.meses)}, un procenti pieaug līdz ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Kas notiek, ja maksā tikai minimālo maksājumu?",
        respuesta:
          "Minimālais maksājums samazinās kopā ar parādu, tāpēc katru mēnesi maksājat mazāk, un parāds velkas gadiem. Ja varat, maksājiet lielāku fiksētu summu, pat ja tikai nedaudz lielāku.",
      },
      {
        pregunta: "Vai ir vērts kartes parādu pārnest uz patēriņa kredītu?",
        respuesta:
          "Parasti jā, ja kredīta procentu likme ir krietni mazāka nekā kartei. Salīdziniet abu variantu kopējo cenu ar komisijas maksām, vislabāk pēc GPL.",
      },
      {
        pregunta: "Kuru karti atmaksāt vispirms?",
        respuesta: "Par visām maksājiet minimumu, bet atlikušo summu novirziet kartei ar lielāko procentu likmi. Tā procentos kopā samaksāsiet vismazāk.",
      },
    ],
    glosario: [
      { termino: "Minimālais maksājums", definicion: "Mazākā summa, ko varat samaksāt mēnesī bez sankcijām. Parādu tā nedzēš." },
      { termino: "Gada procentu likme", definicion: "Likme, ko karte gadā piemēro neatmaksātajam atlikumam." },
      { termino: "Bezprocentu periods", definicion: "Laiks, kad par pirkumiem procenti nav jāmaksā, ja visu parādu atmaksājat laikā." },
    ],
  };
};
