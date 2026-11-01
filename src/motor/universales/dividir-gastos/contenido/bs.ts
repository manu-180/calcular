import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator za podjelu računa",
    title: tituloQueEntre(`Podjela računa: kalkulator zajedničkih troškova (${ctx.nombrePais})`, "Podjela računa: kalkulator zajedničkih troškova", "Podjela računa"),
    description: "Podijelite zajedničke troškove na najviše osam osoba: dio svake osobe i ko kome koliko uplaćuje, sa što manje uplata.",
    intro: [
      "Korisno za putovanje, večeru, proslavu ili zajedničku kiriju, kada je svako platio drukčiji iznos.",
      "Unesite koliko je ko platio. Dobit ćete dio svake osobe i uplate nakon kojih niko nikome ništa ne duguje.",
    ],
    comoSeCalcula: [
      "Dio po osobi = ukupan trošak ÷ broj osoba.",
      "Ko je platio manje od svojeg dijela, duguje razliku. Ko je platio više, dobija razliku natrag.",
      "Uplate idu od najvećeg duga prema najvećoj preplati, tako da nijedna uplata nije suvišna.",
    ],
    ejemplo: [
      `Ivana je platila ${m(a)}, Marko ${m(b)}, a Ana ništa. Ukupno je ${m(a + b)}, pa je dio svake osobe ${m(cuota)}.`,
      `Ana uplaćuje Ivani ${m(cuota)}, a Marko uplaćuje Ivani ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kako podijeliti račun kada je svako platio drukčiji iznos?",
        respuesta: "Saberite sve iznose, podijelite zbir brojem osoba i uporedite rezultat s onim što je ko platio. Razlika pokazuje ko koliko duguje ili koliko treba dobiti.",
      },
      {
        pregunta: "Šta ako neko nije platio ništa?",
        respuesta: "Unesite 0 za tu osobu, da bi i ona učestvovala u trošku. Ako polje ostavite prazno, ta se osoba ne računa.",
      },
      {
        pregunta: "Zašto ima manje uplata nego osoba?",
        respuesta: "Dugovi se spajaju: ko duguje najviše, plaća onome ko je najviše preplatio, i tako redom. Nikada nije potrebno više uplata od broja osoba umanjenog za jedan.",
      },
    ],
    glosario: [
      { termino: "Dio po osobi", definicion: "Koliko svako treba platiti od ukupnog troška." },
      { termino: "Saldo", definicion: "Razlika između onoga što je osoba platila i njena dijela." },
    ],
  };
};
