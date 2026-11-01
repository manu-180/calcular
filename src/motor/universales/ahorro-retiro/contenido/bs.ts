import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Kalkulator štednje za penziju",
    title: tituloQueEntre(`Štednja za penziju: kalkulator (${ctx.nombrePais})`, "Kalkulator štednje za penziju", "Štednja za penziju"),
    description: "Saznajte koliko možete uštedjeti za penziju mjesečnim uplatama i koliki vam mjesečni prihod to donosi, u današnjim cijenama.",
    intro: [
      "Državna penzija često nije dovoljna za dosadašnji životni standard. Lična štednja, čak i mala, puno pomaže ako počnete na vrijeme.",
      "Unesite koliko imate godina, kada želite u penziju, koliko već imate i koliko možete dodavati mjesečno. Prikazujemo iznos na dan odlaska u penziju i koliko od njega možete trošiti mjesečno.",
    ],
    comoSeCalcula: [
      "Ušteđevina svakog mjeseca raste za realni prinos, odnosno prinos umanjen za inflaciju. Zato je rezultat u današnjim cijenama.",
      "Nakon odlaska u penziju ušteđevina se isplaćuje u jednakim mjesečnim iznosima tokom izabranog broja godina. Ostatak u međuvremenu i dalje donosi prinos.",
      "Državna penzija, porezi i naknade za ulaganje nisu uračunati.",
    ],
    ejemplo: [
      `Ako s 30 godina imate ${m(actual)} i svakog mjeseca dodajete ${m(aporte)} uz realni prinos od 4 %, do 65. godine uštedjet ćete ${m(capital30)}. To je dovoljno za ${m(rentaMensual(capital30, 4, 25))} mjesečno tokom 25 godina.`,
      `Počnete li s istim iznosima tek s 40 godina, dobit ćete ${m(capital40)}. Deset godina više čini veliku razliku.`,
    ],
    faq: [
      {
        pregunta: "Šta je realni prinos?",
        respuesta: "Ono što ulaganje donese nakon oduzimanja inflacije. Ako ulaganje donosi 7 %, a inflacija je 3 %, realni prinos je oko 4 %.",
      },
      {
        pregunta: "Zamjenjuje li ovo državnu penziju?",
        respuesta:
          "Ne. Riječ je o vašoj ličnoj štednji uz državnu penziju ili dobrovoljni penzioni fond. Procjenu državne penzije daje nadležna penziona ustanova u vašoj zemlji.",
      },
      {
        pregunta: "Koliko odvajati za penziju?",
        respuesta: "Jedan tačan broj ne postoji. Uobičajeno pravilo preporučuje 10 do 15 % prihoda. Najvažnije je početi što ranije.",
      },
    ],
    glosario: [
      { termino: "Realni prinos", definicion: "Ono što ulaganje donosi iznad inflacije." },
      { termino: "Današnje cijene", definicion: "Budući iznos izražen kroz ono što se za njega može kupiti danas." },
    ],
  };
};
