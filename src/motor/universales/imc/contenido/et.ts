import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Kui kaalud 160 naela ja sinu pikkus on 5 jalga 9 tolli, on sinu KMI ${n((160 * KG_POR_LB) / (m * m))} ehk normaalkaal.`,
        `Selle pikkuse juures jääb normaalkaal vahemikku ${n((18.5 * m * m) / KG_POR_LB)} kuni ${n((24.9 * m * m) / KG_POR_LB)} naela.`,
      ]
    : [
        `Kui kaalud 70 kilo ja sinu pikkus on ${n(1.75, 2)} meetrit, on sinu KMI ${n(70 / (1.75 * 1.75))} ehk normaalkaal.`,
        `Selle pikkuse juures jääb normaalkaal vahemikku ${n(18.5 * 1.75 * 1.75)} kuni ${n(24.9 * 1.75 * 1.75)} kilo.`,
      ];
  return {
    h1: "KMI-kalkulaator",
    title: tituloQueEntre(
      `KMI-kalkulaator: arvuta oma kehamassiindeks | ${ctx.nombrePais}`,
      `KMI-kalkulaator | ${ctx.nombrePais}`,
      "KMI-kalkulaator",
    ),
    description: "Arvuta oma kehamassiindeks kaalu ja pikkuse järgi. Näed oma kategooriat WHO piirväärtuste järgi ja sinu pikkusele sobivat normaalkaalu.",
    intro: [
      "Sisesta kaal ja pikkus. Näed oma KMI-d, kategooriat Maailma Terviseorganisatsiooni (WHO) piirväärtuste järgi ja normaalkaalu vahemikku oma pikkuse jaoks.",
      "Tulemus on ligikaudne ja mõeldud täiskasvanutele. See ei asenda arsti ega õe hinnangut.",
    ],
    comoSeCalcula: [
      imperial ? "KMI = kaal naelades × 703 ÷ (pikkus tollides × pikkus tollides)." : "KMI = kaal kilogrammides ÷ (pikkus meetrites × pikkus meetrites).",
      `Alla ${n(18.5)} on alakaal. Vahemikus ${n(18.5)} kuni ${n(24.9)} on kaal normaalne. Vahemik 25 kuni ${n(29.9)} tähendab ülekaalu ning väärtus 30 või rohkem rasvumist.`,
      `Normaalkaal on kaaluvahemik, mille puhul jääb KMI sinu pikkuse juures vahemikku ${n(18.5)} kuni ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Milline on normaalne KMI?",
        respuesta: `WHO järgi on täiskasvanu normaalne KMI vahemikus ${n(18.5)} kuni ${n(24.9)}. Piirid on naistel ja meestel samad.`,
      },
      {
        pregunta: "Kas KMI sobib kõigile?",
        respuesta: "Ei. See ei erista lihaseid ja rasva, nii et palju treenival inimesel võib väärtus olla kõrge. Raseduse ajal ning lastel ja noortel kasutatakse teisi näitajaid.",
      },
      {
        pregunta: "Kuidas KMI-d arvutatakse?",
        respuesta: imperial
          ? "Korruta kaal naelades arvuga 703 ja jaga pikkuse ruuduga tollides. Pikkuse 5 jalga 9 tolli puhul on see 69 × 69."
          : `Jaga kaal kilogrammides pikkuse ruuduga meetrites. Kui oled ${n(1.75, 2)} meetrit pikk, jagad arvuga ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "Kehamassiindeks (KMI)", definicion: "Näitaja, mis seab kaalu suhtesse pikkusega. Inglise keeles body mass index." },
      { termino: "WHO", definicion: "Maailma Terviseorganisatsioon, mis on määranud täiskasvanute KMI kategooriad." },
    ],
  };
};
