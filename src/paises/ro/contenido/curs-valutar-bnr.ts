import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.curs-valutar-bnr",
  h1: "Curs valutar BNR azi: convertor euro, dolar, liră",
  title: "Curs valutar BNR azi: euro {{ro.eur}}",
  description:
    "Transformați euro, dolari, lire, franci elvețieni sau lei moldovenești în lei la cursul de referință BNR din {{ro.eur#desde}}: 1 euro = {{ro.eur}}.",
  intro: [
    "Convertorul folosește cursul de referință publicat de Banca Națională a României în fiecare zi bancară.",
    "Același curs se folosește în facturi, contracte și declarații fiscale care cer cursul BNR.",
  ],
  comoSeCalcula: [
    "Din valută în lei: suma se înmulțește cu cursul BNR.",
    "Din lei în valută: suma se împarte la cursul BNR.",
    "Rezultatul se rotunjește la bani.",
  ],
  faq: [
    {
      pregunta: "Cât este euro azi la BNR?",
      respuesta: "La {{ro.eur#desde}}, cursul de referință BNR a fost {{ro.eur}} pentru 1 euro.",
    },
    {
      pregunta: "Cât este dolarul azi?",
      respuesta: "La {{ro.usd#desde}}, BNR a publicat {{ro.usd}} pentru 1 dolar american.",
    },
    {
      pregunta: "De ce banca îmi dă alt curs?",
      respuesta: "Băncile și casele de schimb au cursuri proprii de cumpărare și de vânzare. Cursul BNR este un curs de referință, fără marjă.",
    },
    {
      pregunta: "BNR publică curs în weekend?",
      respuesta: "Nu. Cursul se publică doar în zilele bancare, așa că în weekend convertorul arată cursul din ultima zi bancară.",
    },
  ],
  glosario: [
    { termino: "Curs de referință", definicion: "Cursul oficial calculat și publicat zilnic de BNR." },
    { termino: "Zi bancară", definicion: "Zi lucrătoare în care se fac decontări interbancare." },
  ],
});
