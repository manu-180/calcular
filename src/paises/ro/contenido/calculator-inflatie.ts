import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-inflatie",
  h1: "Calculator inflație: actualizați o sumă cu prețurile de azi",
  title: "Calculator inflație România: valoarea banilor în timp",
  description:
    "Aflați cât valorează azi o sumă din trecut, după indicele armonizat al prețurilor de consum pentru România. Ultimul indice: {{ro.iapc#desde}}.",
  intro: [
    "Cu aceeași sumă de bani cumpărați în timp tot mai puțin. Calculatorul arată de câți lei aveți nevoie azi pentru aceeași putere de cumpărare.",
    "Folosește indicele armonizat al prețurilor de consum (IAPC) pentru România, calculat de Institutul Național de Statistică și publicat de Eurostat, cu date din ianuarie 2000.",
  ],
  comoSeCalcula: [
    "Se ia indicele lunii de pornire și indicele lunii de sosire.",
    "Suma se înmulțește cu raportul dintre cei doi indici.",
    "Dacă luna de sosire nu are încă indice publicat, calculul se oprește la ultima lună disponibilă.",
  ],
  faq: [
    {
      pregunta: "Cât valorează azi 1.000 de lei din 2020?",
      respuesta: "Introduceți 1.000 și luna din 2020 în calculator. Între ianuarie 2020 și septembrie 2026 prețurile au crescut cu aproape 59 %, deci aveți nevoie de circa 1.588 de lei.",
    },
    {
      pregunta: "De ce indicele armonizat și nu IPC-ul INS?",
      respuesta: "IAPC este calculat de INS după metodologia comună din Uniunea Europeană și se poate citi automat din datele Eurostat. IPC-ul național poate da o rată puțin diferită.",
    },
    {
      pregunta: "Cât de des se actualizează?",
      respuesta: "Lunar, după ce Eurostat publică indicele lunii precedente. Ultima lună disponibilă acum este {{ro.iapc#desde}}.",
    },
  ],
  glosario: [
    { termino: "Inflație", definicion: "Creșterea generală a prețurilor într-o perioadă." },
    { termino: "IAPC", definicion: "Indicele armonizat al prețurilor de consum, comparabil între țările Uniunii Europene." },
  ],
});
