import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.porez-na-promet-nekretnina",
  h1: "Porez na promet nekretnina {{anio}}: kalkulator {{hr.porez-promet-nekretnina}}",
  title: "Porez na promet nekretnina {{anio}}: izračun {{hr.porez-promet-nekretnina}}",
  description: "Izračunajte porez na promet nekretnina od {{hr.porez-promet-nekretnina}} na tržišnu vrijednost. Plaća ga stjecatelj, u roku od 15 dana od rješenja.",
  intro: [
    "Porez na promet nekretnina je {{hr.porez-promet-nekretnina}} tržišne vrijednosti nekretnine u trenutku nastanka porezne obveze. Plaća ga stjecatelj: kupac, nasljednik, daroprimac ili strana u zamjeni.",
    "Ako se na isporuku nekretnine plaća PDV, ovaj porez se ne plaća. Zato kalkulator za usporedbu pokazuje i PDV od {{hr.pdv[opca]}}.",
  ],
  comoSeCalcula: [
    "Unesite tržišnu vrijednost. To je cijena koja se postiže ili se može postići na tržištu.",
    "Porez je ta vrijednost pomnožena s {{hr.porez-promet-nekretnina}}. Porezna uprava može procjenom utvrditi drukčiju vrijednost od one u ugovoru.",
  ],
  ejemplo: [
    "Stan vrijedi 200.000 eura. Porez je 200.000 x 3 % = 6.000 eura, pa kupnja s porezom stoji 206.000 eura, bez javnobilježničkih i drugih troškova.",
    "Da je isti stan u sustavu PDV-a, PDV bi iznosio 50.000 eura, a porez na promet se ne bi plaćao.",
  ],
  faq: [
    {
      pregunta: "Do kada se plaća porez?",
      respuesta: "U roku od 15 dana od dostave poreznog rješenja, čak i ako izjavite žalbu. Rok za žalbu je 30 dana od primitka rješenja.",
    },
    {
      pregunta: "Tko prijavljuje promet?",
      respuesta: "Javni bilježnik prijavljuje u roku od 30 dana od ovjere isprave. Kad bilježnika nema, prijavu u istom roku podnosi stjecatelj.",
    },
    {
      pregunta: "Plaća li se porez ako plaćam PDV?",
      respuesta: "Ne. Porezna uprava navodi da su stjecanja na koja se plaća PDV izvan oporezivanja porezom na promet nekretnina. Propis je Zakon o porezu na promet nekretnina (NN 115/16, 106/18).",
    },
  ],
  glosario: [
    { termino: "Stjecatelj", definicion: "Osoba koja stječe nekretninu i plaća porez." },
    { termino: "Tržišna vrijednost", definicion: "Cijena koja se postiže ili može postići na tržištu." },
    { termino: "Porezno rješenje", definicion: "Odluka Porezne uprave o iznosu poreza." },
  ],
});
