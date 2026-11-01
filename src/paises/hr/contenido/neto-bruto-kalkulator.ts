import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.neto-bruto-kalkulator",
  h1: "Neto u bruto kalkulator {{anio}}",
  title: "Neto u bruto {{anio}}: koliki bruto daje željeni neto",
  description: "Pregovarate o neto iznosu? Izračunajte potrebnu bruto plaću za svoj grad, uz odbitak {{hr.osobni-odbitak}} i zdravstveno {{hr.zdravstveno}} na teret poslodavca.",
  intro: [
    "U pregovorima se često spominje neto, a ugovor glasi na bruto. Unesite iznos koji želite na računu i dobit ćete bruto plaću koja ga daje u vašem gradu ili općini, uz osobni odbitak od {{hr.osobni-odbitak}}.",
    "Isti neto u različitim mjestima traži različit bruto, jer se stope poreza razlikuju: niža stopa je {{hr.stopa-niza[zagreb]}} u Zagrebu, a {{hr.stopa-niza[rijeka]}} u Rijeci.",
  ],
  comoSeCalcula: [
    "Formula bruto u neto ima više dijelova: umanjenje osnovice, dvije porezne stope i najvišu osnovicu od {{hr.najvisa-osnovica}}. Zato kalkulator bruto traži postupnim približavanjem, do centa.",
    "Pronađeni bruto provjerava se punim obračunom: mirovinsko {{hr.mio-i}} i {{hr.mio-ii}}, porez po stopama grada, a poslodavac dodaje {{hr.zdravstveno}} za zdravstveno.",
  ],
  ejemplo: [
    "Želite 1.370 eura neto u Zagrebu, bez djece i uz II. stup. Potrebni bruto je 2.000 eura: doprinosi su 400 eura, porez 230 eura. Poslodavcu trošak raste na 2.330 eura mjesečno.",
    "Ako za isti neto živite u Rijeci, gdje je niža stopa manja, dovoljan je niži bruto.",
  ],
  faq: [
    {
      pregunta: "Koliki je bruto za neto od 1.000 eura?",
      respuesta: "Ovisi o gradu i odbitku, jer niža stopa ide od {{hr.stopa-niza[rijeka]}} u Rijeci do {{hr.stopa-niza[zagreb]}} u Zagrebu. Unesite svoje mjesto i broj djece pa dobivate iznos do centa.",
    },
    {
      pregunta: "Zašto se govori o bruto iznosu?",
      respuesta: "Bruto je osnovica za doprinose prema Poreznoj upravi, a i Vlada minimalnu plaću određuje u bruto iznosu. Neto ovisi o osobnim okolnostima, pa isti bruto različitim ljudima daje različit neto.",
    },
    {
      pregunta: "Što ako se promijeni osobni odbitak?",
      respuesta: "Neto se mijenja i kad bruto ostane isti. Odbitak od {{hr.osobni-odbitak}} primjenjuje se od {{hr.osobni-odbitak#desde}}. Kad se promijeni, ovaj kalkulator koristi novi iznos od dana primjene.",
    },
  ],
  glosario: [
    { termino: "Bruto", definicion: "Iznos prije doprinosa iz plaće i poreza." },
    { termino: "Neto", definicion: "Iznos koji stiže na račun." },
    { termino: "Bruto 2", definicion: "Bruto plaća uvećana za zdravstveno osiguranje na plaću, što je trošak poslodavca." },
  ],
});
