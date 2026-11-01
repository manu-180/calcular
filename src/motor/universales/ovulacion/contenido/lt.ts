import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovuliacijos ir vaisingų dienų skaičiuoklė",
    title: tituloQueEntre("Ovuliacijos ir vaisingų dienų skaičiuoklė", "Ovuliacijos skaičiuoklė"),
    description: "Apskaičiuokite ovuliacijos dieną, vaisingas dienas ir kitų mėnesinių datą, taip pat tris paskesnius ciklus.",
    intro: [
      "Įveskite pirmąją paskutinių mėnesinių dieną ir ciklo trukmę. Matysite numatomą ovuliacijos dieną, vaisingas dienas ir kitas mėnesines.",
      "Tai apytikslis skaičiavimas reguliariam ciklui. Tai nėra kontracepcijos metodas, ir jis neatstoja gydytojo ar ginekologo konsultacijos.",
    ],
    comoSeCalcula: [
      `Ovuliacija paprastai įvyksta likus ${FASE_LUTEA} dienų iki kitų mėnesinių: pirmoji paskutinių mėnesinių diena + ciklo trukmė − ${FASE_LUTEA}.`,
      "Vaisingos dienos trunka nuo penktos dienos prieš ovuliaciją iki kitos dienos po jos, nes spermatozoidai gali išgyventi iki 5 dienų.",
      "Kitos mėnesinės tikėtinos praėjus vienam ciklui po paskutiniųjų.",
    ],
    ejemplo: [
      `Kai paskutinės mėnesinės prasidėjo ${f(fum)}, o ciklo trukmė 28 dienos, ${f(aFecha(v.ovulacion))} numatoma ovuliacija.`,
      `Vaisingos dienos trunka nuo ${f(aFecha(v.desde))} iki ${f(aFecha(v.hasta))}, o ${f(aFecha(v.proxima))} tikėtinos kitos mėnesinės.`,
    ],
    faq: [
      {
        pregunta: "Kurios dienos yra vaisingiausios?",
        respuesta: "Dvi ar trys dienos prieš ovuliaciją ir pati ovuliacijos diena. Visas vaisingas laikotarpis yra maždaug 6 dienos.",
      },
      {
        pregunta: "Ar skaičiavimas tinka esant nereguliariam ciklui?",
        respuesta: "Jis duos apytikslį vaizdą, bet ne tokį tikslų. Kai ciklas nereguliarus, ovuliacija kas mėnesį gali pasislinkti keliomis dienomis.",
      },
      {
        pregunta: "Ar galima tuo remtis siekiant išvengti nėštumo?",
        respuesta: "Ne. Skaičiavimas apytikslis, o ovuliacija gali įvykti anksčiau arba vėliau. Nėštumui išvengti naudokite kontracepciją ir pasitarkite su gydytoju.",
      },
    ],
    glosario: [
      { termino: "Ovuliacija", definicion: "Kiaušialąstės išsiskyrimas iš kiaušidės." },
      { termino: "Vaisingos dienos", definicion: "Ciklo dienos, kai galima pastoti." },
    ],
  };
};
