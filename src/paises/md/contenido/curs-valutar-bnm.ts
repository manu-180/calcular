import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.curs-valutar-bnm",
  h1: "Cursul oficial BNM: convertor valutar",
  title: "Curs valutar BNM azi: euro, dolar, leu românesc",
  description: "Convertiți euro, dolari, lei românești, grivne și lire în lei moldovenești la cursul oficial al Băncii Naționale a Moldovei. Euro: {{md.eur}}.",
  intro: [
    "Banca Națională a Moldovei stabilește în fiecare zi lucrătoare cursul oficial al leului moldovenesc față de alte valute.",
    "Calculatorul folosește ultimul curs publicat și transformă suma în ambele sensuri.",
  ],
  comoSeCalcula: [
    "Din valută în lei: suma se înmulțește cu cursul oficial.",
    "Din lei în valută: suma se împarte la curs.",
    "Cursul euro este acum {{md.eur}}, din {{md.eur#desde}}. Dolarul SUA este {{md.usd}}.",
  ],
  faq: [
    {
      pregunta: "Cât este cursul euro la BNM azi?",
      respuesta: "Ultimul curs oficial este {{md.eur}} pentru un euro, stabilit pentru {{md.eur#desde}}.",
    },
    {
      pregunta: "De ce banca îmi dă alt curs?",
      respuesta: "Cursul oficial este o referință. Băncile și casele de schimb stabilesc propriile cursuri de cumpărare și vânzare.",
    },
    {
      pregunta: "La ce se folosește cursul oficial?",
      respuesta: "În contabilitate, la declarații și la recalcularea sumelor în valută stabilite de lege sau de contracte.",
    },
  ],
  glosario: [
    { termino: "BNM", definicion: "Banca Națională a Moldovei, banca centrală a țării." },
    { termino: "Curs oficial", definicion: "Cursul leului moldovenesc față de o valută, stabilit de BNM pentru o zi." },
  ],
});
