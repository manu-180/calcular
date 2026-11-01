import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.porez-na-nepokretnosti",
  h1: "Porez na nepokretnosti {{anio}}: godišnji iznos za stan ili kuću",
  title: "Porez na nepokretnosti {{anio}}: od {{me.nepokretnosti-min}} do {{me.nepokretnosti-max}} vrijednosti",
  description: "Godišnji porez na nepokretnosti plaća se od {{me.nepokretnosti-min}} do {{me.nepokretnosti-max}} tržišne vrijednosti. Unesite vrijednost i stopu opštine da vidite iznos i raspon.",
  intro: [
    "Vlasnik stana, kuće, poslovnog prostora ili zemljišta plaća godišnji porez od {{me.nepokretnosti-min}} do {{me.nepokretnosti-max}} tržišne vrijednosti nepokretnosti. Taj raspon navodi Uprava prihoda i carina.",
    "Tačnu stopu u tom okviru određuje opština, pa je najbolje da unesete stopu iz njene odluke ili poreskog rješenja. Bez nje dobijate gornju i donju granicu.",
  ],
  comoSeCalcula: [
    "Osnovica je tržišna vrijednost nepokretnosti.",
    "Porez je ta vrijednost pomnožena stopom vaše opštine.",
    "Kalkulator ne uračunava umanjenja ni posebne stope za pojedine vrste objekata. Konačan iznos je onaj iz rješenja koje izda opština.",
  ],
  ejemplo: [
    "Stan procijenjen na 100.000 eura godišnje nosi najmanje 250 eura, a po najvišoj opštoj stopi 1.000 eura. Ako opština primjenjuje 0,5 odsto, porez je 500 eura.",
  ],
  faq: [
    {
      pregunta: "Šta se sve oporezuje?",
      respuesta: "Prema Upravi prihoda i carina: zemljište (građevinsko, šumsko, poljoprivredno i drugo), objekti (poslovni, stambeni, mješoviti, u izgradnji, pomoćni, privremeni) i posebni djelovi zgrada, kao stanovi, poslovni prostori i garaže.",
    },
    {
      pregunta: "Koji propis to uređuje?",
      respuesta: "Zakon o porezu na nepokretnosti. Propisuje proporcionalnu stopu od {{me.nepokretnosti-min}} do {{me.nepokretnosti-max}} tržišne vrijednosti, prema objavi na gov.me.",
    },
    {
      pregunta: "Razlikuje li se ovo od poreza pri kupovini stana?",
      respuesta: "Da. Ovo je godišnji porez na vlasništvo. Pri kupovini se jednom plaća porez na promet nepokretnosti, po stopama od 3 do 6 odsto (izmjena iz „Službenog lista CG“ 28/23).",
    },
  ],
  glosario: [
    { termino: "Poresko rješenje", definicion: "Akt opštine kojim se utvrđuje iznos godišnjeg poreza." },
    { termino: "Tržišna vrijednost", definicion: "Procijenjena cijena nepokretnosti na tržištu." },
    { termino: "Poseban dio zgrade", definicion: "Stan, poslovni prostor ili garaža koji se vode zasebno." },
  ],
});
