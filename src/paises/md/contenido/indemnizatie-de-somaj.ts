import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.indemnizatie-de-somaj",
  h1: "Calculator indemnizație de șomaj",
  title: "Indemnizația de șomaj 2026: cât și cât timp",
  description: "Calculați indemnizația de șomaj: {{md.somaj-procent}} din venitul mediu lunar asigurat, plătită {{md.somaj-luni[sub10]}}, {{md.somaj-luni[10-15]}} sau {{md.somaj-luni[peste15]}}, după stagiu.",
  intro: [
    "Persoanele înregistrate cu statut de șomer care îndeplinesc condițiile de stagiu primesc o indemnizație lunară de la Casa Națională de Asigurări Sociale.",
    "Calculatorul arată suma pe lună, câte luni se plătește și totalul.",
  ],
  comoSeCalcula: [
    "Venitul mediu lunar asigurat este venitul din 12 luni din ultimele 24 înainte de înregistrare, împărțit la 12.",
    "Indemnizația lunară este {{md.somaj-procent}} din acest venit.",
    "Perioada de plată este de {{md.somaj-luni[sub10]}} la un stagiu între 12 luni și 10 ani, {{md.somaj-luni[10-15]}} între 10 și 15 ani și {{md.somaj-luni[peste15]}} peste 15 ani.",
  ],
  faq: [
    {
      pregunta: "Există o limită a indemnizației de șomaj?",
      respuesta: "Da. Indemnizația nu poate depăși salariul mediu lunar pe economie pentru anul precedent stabilirii dreptului.",
    },
    {
      pregunta: "Când se plătește?",
      respuesta: "Lunar, pentru luna precedentă, prin modalitatea aleasă în serviciul guvernamental de plăți electronice MPay.",
    },
    {
      pregunta: "Cât primesc șomerii cu statut special?",
      respuesta: "Pentru ei suma este fixă, de 700 de lei pe lună, indiferent de venitul anterior.",
    },
  ],
  glosario: [
    { termino: "Stagiu de cotizare", definicion: "Perioada în care s-au plătit contribuții de asigurări sociale pentru dumneavoastră." },
    { termino: "Venit mediu lunar asigurat", definicion: "Venitul din care s-au plătit contribuții, împărțit la numărul de luni luate în calcul." },
  ],
});
