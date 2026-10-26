import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulačka na rozdělení útraty",
    title: tituloQueEntre(`Rozdělení účtu: kalkulačka společných výdajů (${ctx.nombrePais})`, "Rozdělení účtu: kalkulačka společných výdajů", "Rozdělení účtu"),
    description: "Rozdělte společné výdaje mezi až osm lidí: podíl každého a kdo komu kolik pošle, s co nejmenším počtem plateb.",
    intro: [
      "Hodí se na výlet, večeři, oslavu nebo společný nájem, kdy každý zaplatil jinou částku.",
      "Zadejte, kolik kdo zaplatil. Uvidíte podíl každého a platby, po kterých budou všichni vyrovnaní.",
    ],
    comoSeCalcula: [
      "Podíl = celková útrata ÷ počet osob.",
      "Kdo zaplatil méně, než je jeho podíl, dluží rozdíl. Kdo zaplatil víc, dostane rozdíl zpět.",
      "Platby jdou od největšího dluhu k největšímu přeplatku, takže žádná platba není navíc.",
    ],
    ejemplo: [
      `Jana zaplatila ${m(a)}, Petr ${m(b)} a Eva nic. Dohromady je to ${m(a + b)}, takže podíl každého je ${m(cuota)}.`,
      `Eva pošle Janě ${m(cuota)} a Petr pošle Janě ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Jak rozdělit účet, když každý zaplatil jinou částku?",
        respuesta: "Sečtěte všechny částky, vydělte je počtem osob a porovnejte s tím, co kdo zaplatil. Rozdíl ukáže, kdo kolik dluží nebo kolik má dostat.",
      },
      {
        pregunta: "Co když někdo nic nezaplatil?",
        respuesta: "Zadejte u něj 0, aby se na útratě také podílel. Pokud pole necháte prázdné, s danou osobou se nepočítá.",
      },
      {
        pregunta: "Proč je plateb méně než lidí?",
        respuesta: "Dluhy se spojují: kdo dluží nejvíc, platí tomu, kdo nejvíc přeplatil, a tak dále. Plateb nikdy není potřeba víc, než je počet osob minus jedna.",
      },
    ],
    glosario: [
      { termino: "Podíl", definicion: "Kolik má každý zaplatit z celkové útraty." },
      { termino: "Saldo", definicion: "Rozdíl mezi tím, co člověk zaplatil, a jeho podílem." },
    ],
  };
};
