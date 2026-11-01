import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.bruto-iz-neta",
  h1: "Bruto iz neta {{anio}}: koliki bruto daje željenu platu",
  title: "Bruto iz neta {{anio}}: od neto plate do bruta i troška firme",
  description: "Dogovorili ste neto iznos? Izračunajte bruto zaradu uz doprinose od 10,5 odsto, porez {{me.porez-zarada[1].tasa}} i {{me.porez-zarada[2].tasa}} i prirez opštine.",
  intro: [
    "Kod nas se plata često dogovara u neto iznosu, a u ugovor ide bruto. Zato je ovaj račun obrnut: polazi od onoga što želite da primite i traži bruto koji ga daje uz važeći porez od {{me.porez-zarada[1].tasa}} iznad {{me.porez-zarada[0].hasta}} i {{me.porez-zarada[2].tasa}} iznad {{me.porez-zarada[1].hasta}}.",
    "Pokazaćemo i koliko firmu ta zarada košta ukupno, sa doprinosima koje poslodavac plaća na bruto.",
  ],
  comoSeCalcula: [
    "Do 700 eura bruta veza je prosta: neto je 89,5 odsto bruta, jer nema poreza. Bruto je tada neto podijeljen sa 0,895.",
    "Iznad toga svaki novi euro bruta nosi i porez i prirez, pa kalkulator traži najmanji bruto, na cent tačno, od kog ostaje bar traženi neto.",
    "Na kraju se na nađeni bruto dodaju obaveze poslodavca: {{me.nezaposlenost-poslodavac}} za nezaposlenost i {{me.fond-rada}} za Fond rada.",
  ],
  ejemplo: [
    "Za neto 800 eura i obračun bez prireza potreban je bruto 915,53 eura. Iz njega ide 96,13 eura doprinosa i 19,40 eura poreza. Poslodavca ta zarada košta 921,94 eura.",
    "Sa prirezom bruto je malo veći, jer se i on plaća iz iste zarade. Zato uvijek unesite stopu opštine u kojoj zaposleni živi.",
  ],
  faq: [
    {
      pregunta: "Može li se u ugovoru navesti samo neto zarada?",
      respuesta: "Član 31 Zakona o radu traži da ugovor sadrži visinu koeficijenta, iznos osnovne zarade i osnove za uvećanje. Zato je korisno znati bruto i kad je dogovor bio u neto iznosu.",
    },
    {
      pregunta: "Koliki je bruto za minimalnu zaradu?",
      respuesta: "Član 101 Zakona o radu propisuje neto iznose: {{me.minimalna-do-v}} i {{me.minimalna-vi}}. Prvom odgovara bruto 670,39 eura, a drugi zavisi i od prireza jer prelazi granicu od {{me.porez-zarada[0].hasta}}.",
    },
    {
      pregunta: "Zašto je razlika između bruta i neta veća kod većih plata?",
      respuesta: "Zato što su stope poreza progresivne (Zakon o porezu na dohodak fizičkih lica, čl. 10). Dio iznad {{me.porez-zarada[1].hasta}} plaća {{me.porez-zarada[2].tasa}}, plus prirez na taj porez.",
    },
  ],
  glosario: [
    { termino: "Neto u bruto", definicion: "Obrnuti obračun zarade, od iznosa na računu do iznosa u ugovoru." },
    { termino: "Trošak poslodavca", definicion: "Bruto zarada uvećana za doprinose koje plaća poslodavac." },
    { termino: "Fond rada", definicion: "Fond iz kog se zaposlenima isplaćuju potraživanja kad poslodavac ode u stečaj." },
  ],
});
