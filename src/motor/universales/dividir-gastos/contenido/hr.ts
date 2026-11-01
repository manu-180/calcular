import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator za podjelu računa",
    title: tituloQueEntre(`Podjela računa: kalkulator zajedničkih troškova (${ctx.nombrePais})`, "Podjela računa: kalkulator zajedničkih troškova", "Podjela računa"),
    description: "Podijelite zajedničke troškove na najviše osam osoba: dio svake osobe i tko kome koliko uplaćuje, sa što manje uplata.",
    intro: [
      "Korisno za putovanje, večeru, proslavu ili zajedničku stanarinu, kada je svatko platio drukčiji iznos.",
      "Unesite koliko je tko platio. Dobit ćete dio svake osobe i uplate nakon kojih nitko nikome ništa ne duguje.",
    ],
    comoSeCalcula: [
      "Dio po osobi = ukupan trošak ÷ broj osoba.",
      "Tko je platio manje od svojeg dijela, duguje razliku. Tko je platio više, dobiva razliku natrag.",
      "Uplate idu od najvećeg duga prema najvećoj preplati, tako da nijedna uplata nije suvišna.",
    ],
    ejemplo: [
      `Ivana je platila ${m(a)}, Marko ${m(b)}, a Ana ništa. Ukupno je ${m(a + b)}, pa je dio svake osobe ${m(cuota)}.`,
      `Ana uplaćuje Ivani ${m(cuota)}, a Marko uplaćuje Ivani ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kako podijeliti račun kada je svatko platio drukčiji iznos?",
        respuesta: "Zbrojite sve iznose, podijelite zbroj brojem osoba i usporedite rezultat s onim što je tko platio. Razlika pokazuje tko koliko duguje ili koliko treba dobiti.",
      },
      {
        pregunta: "Što ako netko nije platio ništa?",
        respuesta: "Unesite 0 za tu osobu, da bi i ona sudjelovala u trošku. Ako polje ostavite prazno, ta se osoba ne računa.",
      },
      {
        pregunta: "Zašto ima manje uplata nego osoba?",
        respuesta: "Dugovi se spajaju: tko duguje najviše, plaća onome tko je najviše preplatio, i tako redom. Nikada nije potrebno više uplata od broja osoba umanjenog za jedan.",
      },
    ],
    glosario: [
      { termino: "Dio po osobi", definicion: "Koliko svatko treba platiti od ukupnog troška." },
      { termino: "Saldo", definicion: "Razlika između onoga što je osoba platila i njezina dijela." },
    ],
  };
};
