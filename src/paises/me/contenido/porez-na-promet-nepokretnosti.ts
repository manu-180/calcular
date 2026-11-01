import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.porez-na-promet-nepokretnosti",
  h1: "Porez na promet nepokretnosti {{anio}}: 3, 5 i 6 odsto",
  title: "Porez na promet nepokretnosti {{anio}}: progresivne stope do {{me.porez-promet[2].tasa}}",
  description: "Kupujete stan? Do {{me.porez-promet[0].hasta}} stopa je {{me.porez-promet[0].tasa}}, do {{me.porez-promet[1].hasta}} {{me.porez-promet[1].tasa}}, a iznad toga {{me.porez-promet[2].tasa}}. Izračunajte porez koji plaća kupac.",
  intro: [
    "Od 2024. godine porez na promet nepokretnosti je progresivan: {{me.porez-promet[0].tasa}} do {{me.porez-promet[0].hasta}}, {{me.porez-promet[1].tasa}} na dio do {{me.porez-promet[1].hasta}} i {{me.porez-promet[2].tasa}} na sve preko toga.",
    "Porez plaća sticalac, dakle kupac. Unesite vrijednost stana, kuće ili placa i dobićete iznos sa stvarnom stopom.",
  ],
  comoSeCalcula: [
    "Svaki dio vrijednosti plaća stopu svog razreda. Zakon to piše kao fiksni iznos i procenat: 4.500 eura plus 5 odsto preko 150.000 eura, odnosno 22.000 eura plus 6 odsto preko 500.000 eura.",
    "Osnovica je tržišna vrijednost nepokretnosti. Ako je ugovorena cijena niska, poreski organ može da je procijeni.",
    "Novogradnja i građevinsko zemljište koji se oporezuju PDV-om nijesu promet po ovom zakonu.",
  ],
  ejemplo: [
    "Stan od 120.000 eura: porez je 3.600 eura.",
    "Kuća od 300.000 eura: 4.500 eura na prvih 150.000 i 7.500 eura na ostatak, ukupno 12.000 eura, odnosno stvarna stopa od 4 odsto.",
  ],
  faq: [
    {
      pregunta: "Ko plaća porez, kupac ili prodavac?",
      respuesta: "Obveznik je sticalac nepokretnosti (Zakon o porezu na promet nepokretnosti, u prečišćenom tekstu koji smo čitali član 6). Pri razmjeni obveznik je svaki učesnik.",
    },
    {
      pregunta: "Od kada važe ove stope?",
      respuesta: "Od 1. januara 2024, prema izmjeni iz „Službenog lista CG“ 28/23. Izmjena iz broja 33/26, u primjeni od 1. aprila 2026, ne dira stope: među izuzetke iz člana 6 dodaje građevinsko zemljište.",
    },
    {
      pregunta: "Postoji li oslobođenje za prvi stan?",
      respuesta: "Tekst zakona koji smo pročitali oslobađa kupca koji rješava stambeno pitanje i nema stan u svojini, najviše do 20 kvadrata po članu domaćinstva. To je stariji prečišćen tekst, pa provjerite uslove u Upravi prihoda i carina prije kupovine. Kalkulator to ne odbija.",
    },
  ],
  glosario: [
    { termino: "Sticalac", definicion: "Lice koje stiče vlasništvo nad nepokretnošću." },
    { termino: "Tržišna vrijednost", definicion: "Cijena po kojoj bi se nepokretnost prodala na dan nastanka obaveze." },
    { termino: "Poreska prijava", definicion: "Obrazac kojim se prijavljuje promet radi obračuna poreza." },
  ],
});
