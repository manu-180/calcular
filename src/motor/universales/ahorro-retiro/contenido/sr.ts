import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
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
    description: "Saznajte koliko možete da uštedite za penziju mesečnim uplatama i koliki mesečni prihod vam to donosi, u današnjim cenama.",
    intro: [
      "Državna penzija često nije dovoljna da zadržite dosadašnji standard. Lična štednja, čak i mala, mnogo pomaže ako počnete na vreme.",
      "Unesite koliko imate godina, kada želite u penziju, koliko već imate i koliko možete da dodajete mesečno. Prikazujemo iznos na dan odlaska u penziju i koliko od njega možete da trošite mesečno.",
    ],
    comoSeCalcula: [
      "Ušteđevina svakog meseca raste za realni prinos, odnosno prinos minus inflacija. Zato je rezultat u današnjim cenama.",
      "Posle odlaska u penziju ušteđevina se isplaćuje u jednakim mesečnim iznosima tokom izabranog broja godina. Ostatak u međuvremenu i dalje zarađuje.",
      "Državna penzija, porezi i naknade za ulaganje se ne uračunavaju.",
    ],
    ejemplo: [
      `Ako sa 30 godina imate ${m(actual)} i svakog meseca dodajete ${m(aporte)} uz realni prinos od 4%, do 65. godine uštedećete ${m(capital30)}. To je dovoljno za ${m(rentaMensual(capital30, 4, 25))} mesečno tokom 25 godina.`,
      `Ako sa istim brojevima počnete tek sa 40 godina, dobijate ${m(capital40)}. Deset godina više pravi veliku razliku.`,
    ],
    faq: [
      {
        pregunta: "Šta je realni prinos?",
        respuesta: "Ono što ulaganje donese posle oduzimanja inflacije. Ako ulaganje donosi 7%, a inflacija je 3%, realni prinos je oko 4%.",
      },
      {
        pregunta: "Da li ovo zamenjuje državnu penziju?",
        respuesta:
          "Ne. Reč je o vašoj ličnoj štednji pored državne penzije ili dobrovoljnog penzijskog fonda. Procenu državne penzije daje nadležni penzijski fond u vašoj zemlji.",
      },
      {
        pregunta: "Koliko odvajati za penziju?",
        respuesta: "Jedan tačan broj ne postoji. Uobičajeno pravilo preporučuje 10 do 15% prihoda. Najvažnije je da počnete što ranije.",
      },
    ],
    glosario: [
      { termino: "Realni prinos", definicion: "Ono što ulaganje donosi iznad inflacije." },
      { termino: "Današnje cene", definicion: "Budući iznos izražen kroz ono što se za njega može kupiti danas." },
    ],
  };
};
