import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.starsevski-dopust",
  h1: "Starševski dopust {{anio}}: trajanje in nadomestilo",
  title: "Starševski dopust {{anio}}: dnevi in nadomestilo",
  description: "Materinski dopust {{si.starsevski-dopust[materinski]}}, očetovski {{si.starsevski-dopust[ocetovski]}}, starševski {{si.starsevski-dopust[starsevski]}}. Izračunajte okvirno nadomestilo.",
  intro: [
    "Materinski dopust traja {{si.starsevski-dopust[materinski]}}, očetovski {{si.starsevski-dopust[ocetovski]}}, vsak od staršev pa ima še {{si.starsevski-dopust[starsevski]}} starševskega dopusta. Tako določa ZSDP-1.",
    "Materinsko nadomestilo je {{si.starsevsko-nadomestilo[materinsko]}} osnove, drugo pa {{si.starsevsko-nadomestilo[drugo]}}, razen če osnova ne presega minimalne plače. Osnova je povprečje zadnjih 12 mesecev s plačanimi prispevki.",
  ],
  comoSeCalcula: [
    "Od starševskega dopusta je {{si.starsevski-dopust[neprenosljivi]}} neprenosljivih, {{si.starsevski-dopust[prenosljivi]}} pa lahko prenesete na drugega starša (29. člen ZSDP-1).",
    "Ob hkratnem rojstvu več otrok se starševski dopust za vsakega nadaljnjega otroka podaljša za {{si.starsevski-dopust[dodatni-otrok]}}, očetovski pa za {{si.starsevski-dopust[dodatni-oce]}}.",
    "Mesečno nadomestilo = osnova × odstotek. Okvirni znesek za ves dopust = mesečno nadomestilo × dnevi / 30. Zakonskih mej nadomestila kalkulator ne upošteva, ker najvišji znesek ni objavljen kot enoten podatek.",
  ],
  ejemplo: [
    "Osnova 2.000,00 €, starševski dopust enega od staršev: nadomestilo je 1.800,00 € bruto na mesec, za 160 dni okvirno 9.600,00 €.",
    "Pri materinskem dopustu je mesečno nadomestilo 2.000,00 €, za 105 dni okvirno 7.000,00 €.",
  ],
  faq: [
    {
      pregunta: "Koliko materinskega dopusta je obveznega?",
      respuesta: "Mati mora obvezno izrabiti {{si.starsevski-dopust[obvezni]}} materinskega dopusta (19. člen ZSDP-1).",
    },
    {
      pregunta: "Ali se lahko del dopusta izrabi pozneje?",
      respuesta: "Da. Del neprenosljivega starševskega dopusta, največ 60 dni, lahko vsak od staršev izrabi najpozneje do osmega leta starosti otroka (sedmi odstavek 29. člena ZSDP-1).",
    },
    {
      pregunta: "Zakaj je zgornja meja le opomba?",
      respuesta: "Člen 112.a ZSDP-1 določa najvišje nadomestilo kot dvakratnik povprečne plače z uskladitvami. Ker ni objavljen na enem uradnem mestu, ga ne vnašamo. Točen znesek določi center za socialno delo.",
    },
  ],
  glosario: [
    { termino: "Materinski dopust", definicion: "Dopust matere ob rojstvu otroka." },
    { termino: "Nadomestilo", definicion: "Denarni prejemek namesto plače v času dopusta." },
  ],
});
