import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Räkna dagar mellan datum",
    title: tituloQueEntre(
      `Dagar mellan datum: räkna antal dagar | ${ctx.nombrePais}`,
      `Dagar mellan datum | ${ctx.nombrePais}`,
      "Dagar mellan datum",
    ),
    description: "Räkna antalet dagar mellan två datum. Du ser kalenderdagar, veckor, månader och vardagar från måndag till fredag.",
    intro: [
      "Välj ett startdatum och ett slutdatum. Du ser kalenderdagarna, samma period i veckor och månader och antalet vardagar.",
      "Använd den för tidsfrister, förfallodagar, semester, graviditet eller en nedräkning.",
    ],
    comoSeCalcula: [
      "Kalenderdagar är alla dagar mellan de två datumen. Startdatumet räknas men inte slutdatumet, om du inte kryssar i det.",
      "Vardagar är måndagarna till fredagarna under samma period. Helgdagar dras inte av.",
      "Skottår räknas med sin 29 februari.",
    ],
    ejemplo: [
      `Från ${f(desde)} till ${f(hasta)} är det ${n(dias)} kalenderdagar.`,
      `Av dem infaller ${n(habiles)} på måndag till fredag.`,
    ],
    faq: [
      {
        pregunta: "Räknas den första eller den sista dagen?",
        respuesta: "Som standard räknas den första men inte den sista, precis som när du drar ett datum från ett annat. Behöver du båda, kryssa i «Räkna med slutdatumet».",
      },
      {
        pregunta: "Dras helgdagar av från vardagarna?",
        respuesta: "Nej. Vardagarna räknas måndag till fredag. Helgdagar skiljer sig mellan länder, regioner och år, så dra av dem separat.",
      },
      {
        pregunta: "Hur många dagar har ett år?",
        respuesta: "365, eller 366 under ett skottår. Därför kan samma två datum ligga olika många dagar ifrån varandra olika år.",
      },
    ],
    glosario: [
      { termino: "Kalenderdagar", definicion: "Alla dagar i kalendern, helger och helgdagar inräknade." },
      { termino: "Vardagar", definicion: "I den här kalkylatorn måndag till fredag." },
    ],
  };
};
