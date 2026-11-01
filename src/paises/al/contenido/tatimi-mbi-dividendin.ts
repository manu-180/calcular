import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.tatimi-mbi-dividendin",
  h1: "Tatimi mbi dividendin {{anio}}",
  title: "Tatimi mbi dividendin {{anio}}: {{al.tatim-dividend}} në burim",
  description: "Dividendi tatohet me {{al.tatim-dividend}}, pa zbritur asnjë kosto. Llogaritni dividendin neto dhe barrën totale bashkë me tatimin mbi fitimin.",
  intro: [
    "Dividendi tatohet me {{al.tatim-dividend}}, sipas neneve 24 dhe 59 të ligjit nr. 29/2023. Tatimin e mban shoqëria që e paguan dhe asnjë kosto nuk zbritet.",
    "Kalkulatori jep dividendin neto. Nëse doni, llogarit edhe fitimin para tatimit për të parë barrën e plotë me normën {{al.tatim-korporate}}.",
  ],
  comoSeCalcula: [
    "Tatimi: dividendi bruto shumëzohet me {{al.tatim-dividend}}.",
    "Dividendi neto: dividendi bruto minus tatimin.",
    "Fitimi para tatimit: dividendi bruto pjesëtohet me 1 minus normën {{al.tatim-korporate}}. Kjo vlen kur shoqëria paguan normën e plotë. Me normën 0% të nenit 69, barra është vetëm {{al.tatim-dividend}}.",
  ],
  ejemplo: [
    "Një shoqëri ka 1 milion lekë fitim para tatimit. Paguan 150 000 lekë tatim mbi fitimin dhe shpërndan 850 000 lekë. Mbahen 68 000 lekë tatim mbi dividendin dhe ortakut i mbeten 782 000 lekë. Barra totale është 21,8%.",
  ],
  faq: [
    {
      pregunta: "Kush e paguan tatimin mbi dividendin?",
      respuesta: "E mban në burim shoqëria që shpërndan dividendin, sipas neneve 56 dhe 58. Ortaku merr shumën neto.",
    },
    {
      pregunta: "A përjashtohet dividendi mes shoqërive?",
      respuesta: "Neni 29 e përjashton nga e ardhura e tatueshme kur entiteti marrës ka të paktën 10% në kapital ose të drejtat e votës dhe plotësohen kushtet e tjera të këtij neni.",
    },
    {
      pregunta: "Si tatohet dividendi për një jorezident?",
      respuesta: "Neni 58 e përfshin dividendin e paguar një jorezidenti te mbajtja përfundimtare në burim. Një marrëveshje për shmangien e tatimit të dyfishtë mund të ndryshojë normën.",
    },
  ],
  glosario: [
    { termino: "Dividend", definicion: "Pjesa e fitimit që shoqëria ua shpërndan ortakëve." },
    { termino: "Mbajtje në burim", definicion: "Tatimi që hiqet nga pagesa përpara se të arrijë te marrësi." },
  ],
});
