import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.regres",
  h1: "Regres i božićnica {{anio}}: neoporezivo do {{hr.prigodne-nagrade}}",
  title: "Regres i božićnica {{anio}}: neoporezivo {{hr.prigodne-nagrade}}",
  description: "Provjerite koliki dio regresa i božićnice je neoporeziv. Godišnja svota prigodnih nagrada je {{hr.prigodne-nagrade}}, zajedno za sve isplate u godini.",
  intro: [
    "Prigodne nagrade, kao božićnica i naknada za godišnji odmor, neoporezive su do {{hr.prigodne-nagrade}} godišnje. Svota je jedna za sve isplate u godini, pa regres smanjuje ono što ostaje za božićnicu.",
    "Unesite isplatu i ono što je već isplaćeno ove godine. Dobit ćete neoporezivi dio i dio iznad te svote.",
  ],
  comoSeCalcula: [
    "Od {{hr.prigodne-nagrade}} oduzmite već isplaćene prigodne nagrade. To je preostala neoporeziva svota.",
    "Isplata do te svote ne ulazi u porez ni doprinose. Sve iznad je oporezivi primitak, koji poslodavac obračunava uz plaću.",
  ],
  ejemplo: [
    "Regres od 500 eura potpuno je neoporeziv i preostaje 200 eura. Božićnica od 300 eura u prosincu tada ima 200 eura neoporezivo i 100 eura iznad svote.",
    "Ako ste već primili 800 eura, novih 100 eura ide u cijelosti iznad neoporezive svote.",
  ],
  faq: [
    {
      pregunta: "Koje još neoporezive svote postoje?",
      respuesta: "Porezna uprava navodi, među ostalim, dar djetetu do 15 godina do {{hr.dar-djetetu}} godišnje i nagrade za radne rezultate do {{hr.nagrade-rezultati}} godišnje. To su odvojene svote od prigodnih nagrada.",
    },
    {
      pregunta: "Vrijedi li svota po poslodavcu?",
      respuesta: "Porezna uprava svotu navodi kao godišnji iznos po radniku, pa ovdje računamo zbroj svih prigodnih isplata u godini. Kod više poslodavaca provjerite obračun s računovodstvom.",
    },
    {
      pregunta: "Je li regres isto što i naknada plaće za godišnji odmor?",
      respuesta: "Nije. Naknada plaće za vrijeme odmora je zamjena za plaću, a regres je dodatni iznos koji Porezna uprava svrstava u prigodne nagrade.",
    },
  ],
  glosario: [
    { termino: "Regres", definicion: "Naknada za godišnji odmor koja se isplaćuje uz plaću." },
    { termino: "Božićnica", definicion: "Prigodna nagrada koja se isplaćuje uz blagdane." },
    { termino: "Neoporezivi primitak", definicion: "Isplata na koju se ne plaćaju porez ni doprinosi." },
  ],
});
