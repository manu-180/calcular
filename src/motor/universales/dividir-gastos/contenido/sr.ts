import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator za podelu računa",
    title: tituloQueEntre(`Podela računa: kalkulator zajedničkih troškova (${ctx.nombrePais})`, "Podela računa: kalkulator zajedničkih troškova", "Podela računa"),
    description: "Podelite zajedničke troškove na najviše osam osoba: deo svake osobe i ko kome koliko uplaćuje, sa što manje uplata.",
    intro: [
      "Korisno za putovanje, večeru, proslavu ili zajedničku kiriju, kada je svako platio drugačiji iznos.",
      "Unesite koliko je ko platio. Dobijate deo svake osobe i uplate posle kojih niko nikome ništa ne duguje.",
    ],
    comoSeCalcula: [
      "Deo po osobi = ukupan trošak ÷ broj osoba.",
      "Ko je platio manje od svog dela, duguje razliku. Ko je platio više, dobija razliku nazad.",
      "Uplate idu od najvećeg duga ka najvećoj preplati, tako da nijedna uplata nije suvišna.",
    ],
    ejemplo: [
      `Jelena je platila ${m(a)}, Marko ${m(b)}, a Ana ništa. Ukupno je ${m(a + b)}, pa je deo svake osobe ${m(cuota)}.`,
      `Ana uplaćuje Jeleni ${m(cuota)}, a Marko uplaćuje Jeleni ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kako podeliti račun kada je svako platio drugačiji iznos?",
        respuesta: "Saberite sve iznose, podelite zbir brojem osoba i uporedite rezultat sa onim što je ko platio. Razlika pokazuje ko koliko duguje ili koliko treba da dobije.",
      },
      {
        pregunta: "Šta ako neko nije platio ništa?",
        respuesta: "Unesite 0 za tu osobu, da bi i ona učestvovala u trošku. Ako polje ostavite prazno, ta osoba se ne računa.",
      },
      {
        pregunta: "Zašto ima manje uplata nego osoba?",
        respuesta: "Dugovi se spajaju: ko duguje najviše, plaća onome ko je najviše preplatio, i tako redom. Nikada nije potrebno više uplata od broja osoba umanjenog za jedan.",
      },
    ],
    glosario: [
      { termino: "Deo po osobi", definicion: "Koliko svako treba da plati od ukupnog troška." },
      { termino: "Saldo", definicion: "Razlika između onoga što je osoba platila i njenog dela." },
    ],
  };
};
