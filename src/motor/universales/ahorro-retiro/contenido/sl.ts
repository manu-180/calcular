import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Kalkulator varčevanja za pokojnino",
    title: tituloQueEntre(`Varčevanje za pokojnino: kalkulator (${ctx.nombrePais})`, "Kalkulator varčevanja za pokojnino", "Varčevanje za pokojnino"),
    description: "Izračunajte, koliko lahko z mesečnimi vplačili prihranite za pokojnino in kolikšen mesečni dohodek vam to prinese, v današnjih cenah.",
    intro: [
      "Državna pokojnina pogosto ne zadošča za dosedanji življenjski standard. Osebno varčevanje, tudi majhno, veliko pomaga, če začnete pravočasno.",
      "Vnesite, koliko ste stari, kdaj se želite upokojiti, koliko že imate in koliko lahko dodate na mesec. Prikažemo znesek ob upokojitvi in koliko lahko od njega porabite na mesec.",
    ],
    comoSeCalcula: [
      "Prihranki vsak mesec rastejo za realni donos, torej donos, zmanjšan za inflacijo. Zato je rezultat v današnjih cenah.",
      "Po upokojitvi se prihranki izplačujejo v enakih mesečnih zneskih skozi izbrano število let. Preostanek medtem še naprej prinaša donos.",
      "Državna pokojnina, davki in stroški naložbe niso upoštevani.",
    ],
    ejemplo: [
      `Če imate pri 30 letih ${m(actual)} in vsak mesec dodate ${m(aporte)} ob realnem donosu 4 %, boste do 65. leta prihranili ${m(capital30)}. To zadošča za ${m(rentaMensual(capital30, 4, 25))} na mesec 25 let dolgo.`,
      `Če z enakimi zneski začnete šele pri 40 letih, boste imeli ${m(capital40)}. Deset let več naredi veliko razliko.`,
    ],
    faq: [
      {
        pregunta: "Kaj je realni donos?",
        respuesta: "To, kar naložba prinese po odštetju inflacije. Če naložba prinaša 7 %, inflacija pa je 3 %, je realni donos približno 4 %.",
      },
      {
        pregunta: "Ali to nadomesti državno pokojnino?",
        respuesta:
          "Ne. Gre za vaše osebno varčevanje poleg državne pokojnine ali prostovoljnega pokojninskega sklada. Oceno državne pokojnine vam da pristojna pokojninska ustanova v vaši državi.",
      },
      {
        pregunta: "Koliko odvajati za pokojnino?",
        respuesta: "Enega pravega števila ni. Običajno pravilo priporoča 10 do 15 % dohodka. Najpomembneje je začeti čim prej.",
      },
    ],
    glosario: [
      { termino: "Realni donos", definicion: "To, kar naložba prinese nad inflacijo." },
      { termino: "Današnje cene", definicion: "Prihodnji znesek, izražen s tem, kar lahko zanj kupite danes." },
    ],
  };
};
