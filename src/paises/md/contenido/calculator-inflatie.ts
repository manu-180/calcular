import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.calculator-inflatie",
  h1: "Calculator inflație: actualizați o sumă cu prețurile de azi",
  title: "Calculator inflație Moldova: valoarea banilor în timp",
  description: "Aflați cât valorează azi o sumă din trecut, după indicele prețurilor de consum al Biroului Național de Statistică. Ultimul indice: {{md.ipc#desde}}.",
  intro: [
    "Cu aceeași sumă de bani cumpărați în timp tot mai puțin. Calculatorul arată de câți lei aveți nevoie azi pentru aceeași putere de cumpărare.",
    "Folosește indicele prețurilor de consum (IPC) calculat de Biroul Național de Statistică, cu date lunare din ianuarie 2000.",
  ],
  comoSeCalcula: [
    "Se ia indicele lunii de pornire și indicele lunii de sosire.",
    "Suma se înmulțește cu raportul dintre cei doi indici.",
    "Dacă luna de sosire nu are încă indice publicat, calculul se oprește la ultima lună disponibilă.",
  ],
  faq: [
    {
      pregunta: "Cât valorează azi 1.000 de lei din 2020?",
      respuesta: "Între ianuarie 2020 și septembrie 2026 prețurile au crescut cu aproape 88 %, deci aveți nevoie de circa 1.880 de lei pentru aceleași cumpărături.",
    },
    {
      pregunta: "Ce indice folosește calculatorul?",
      respuesta: "IPC-ul lunar al Biroului Național de Statistică, cu baza decembrie 1993 = 100. Raportul dintre două luni dă creșterea prețurilor între ele.",
    },
    {
      pregunta: "Cât de des se actualizează?",
      respuesta: "Lunar, după ce Biroul Național de Statistică publică indicele lunii precedente. Ultima lună disponibilă acum este {{md.ipc#desde}}.",
    },
  ],
  glosario: [
    { termino: "Inflație", definicion: "Creșterea generală a prețurilor într-o perioadă." },
    { termino: "IPC", definicion: "Indicele prețurilor de consum, care măsoară cât costă un coș fix de bunuri și servicii." },
  ],
});
