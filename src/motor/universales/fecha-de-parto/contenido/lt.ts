import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Gimdymo datos skaičiuoklė",
    title: tituloQueEntre(`Gimdymo datos skaičiuoklė: ${ctx.nombrePais}`, "Gimdymo datos ir nėštumo savaitės skaičiuoklė", "Gimdymo datos skaičiuoklė"),
    description: "Apskaičiuokite numatomą gimdymo datą pagal paskutines mėnesines arba pastojimo datą ir sužinokite, kokia šiandien yra nėštumo savaitė.",
    intro: [
      "Įveskite paskutinių mėnesinių pirmą dieną (arba pastojimo datą, jei ją žinote). Pamatysite numatomą gimdymo datą, nėštumo savaitę ir dabartinį trimestrą.",
      "Tai orientacinis įvertis. Tiksliausią datą nustato apsilankymai pas gydytoją ar akušerį ir echoskopija; šis skaičiavimas nepakeičia specialisto konsultacijos.",
    ],
    comoSeCalcula: [
      "Naudojama Negelės taisyklė: prie paskutinių mėnesinių pirmos dienos pridedama 280 dienų (40 savaičių).",
      "Jei jūsų ciklas ilgesnis ar trumpesnis nei 28 dienos, data pasislenka šiuo skirtumu.",
      "Prie pastojimo datos pridedamos 266 dienos (38 savaitės).",
      "Nėštumo savaitės skaičiuojamos nuo paskutinių mėnesinių, o ne nuo pastojimo.",
    ],
    ejemplo: [
      `Jei paskutinės mėnesinės prasidėjo ${f(fum)}, o ciklo trukmė yra 28 dienos, ${f(fpp)} yra numatoma gimdymo data.`,
      `Kai ciklo trukmė yra 32 dienos, skirtumas yra 4 dienos, todėl numatoma gimdymo data tampa ${f(fpp32)} ir pasislenka į priekį.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti gimdymo datą?",
        respuesta: "Prie paskutinių mėnesinių pirmos dienos pridedama 280 dienų. Paprastas būdas, duodantis beveik tą pačią datą: prie dienos pridėkite 7, iš mėnesio atimkite 3, o prie metų pridėkite 1.",
      },
      {
        pregunta: "Kodėl savaitės skaičiuojamos nuo paskutinių mėnesinių?",
        respuesta: "Nes šią datą žino beveik kiekviena moteris. Dėl to antrą savaitę pastojimo dažniausiai dar nebūna.",
      },
      {
        pregunta: "Kiek vaikų gimsta tiksliai numatytą dieną?",
        respuesta: "Labai nedaug. Dauguma gimsta tarp 37-os ir 42-os savaitės, todėl ši data yra orientacinė, o ne tiksli diena.",
      },
    ],
    glosario: [
      { termino: "Paskutinės mėnesinės", definicion: "Paskutinio menstruacinio kraujavimo pirma diena." },
      { termino: "Negelės taisyklė", definicion: "Būdas nustatyti numatomą gimdymo datą prie paskutinių mėnesinių pirmos dienos pridedant 280 dienų." },
    ],
  };
};
