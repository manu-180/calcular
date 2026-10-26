import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.munkaltatoi-koltseg-kalkulator",
  h1: "Munkáltatói költség kalkulátor",
  title: "Munkáltatói költség kalkulátor: bér és szocho",
  description:
    "Mennyibe kerül egy munkavállaló a cégnek? A bruttó bér és a szocho ({{hu.szocho}}) együtt, havonta és évente, a dolgozó nettó bérével összevetve.",
  intro: [
    "A munkáltató a bruttó béren felül szociális hozzájárulási adót (szocho) fizet, mértéke {{hu.szocho}}. A bérköltség tehát a bruttó bér és a szocho összege.",
    "A kalkulátor megmutatja azt is, hogy a teljes költségből mennyi jut el a dolgozóhoz nettóként, és mennyi megy adóra és járulékra.",
  ],
  comoSeCalcula: [
    "Szocho = bruttó bér × {{hu.szocho}}.",
    "Munkáltatói költség = bruttó bér + szocho.",
    "A dolgozó nettó bére a bruttóból a TB-járulék ({{hu.tb-jarulek}}) és az SZJA ({{hu.szja}}) levonása után marad.",
  ],
  ejemplo: [
    "Bruttó 500 000 Ft mellett a szocho 65 000 Ft, a cég havi költsége 565 000 Ft. A dolgozó ebből 332 500 Ft nettót kap, a többi 232 500 Ft adó és járulék.",
  ],
  faq: [
    {
      pregunta: "Mennyi a szocho mértéke?",
      respuesta: "A szociális hozzájárulási adó mértéke {{hu.szocho}}. Az alapja munkaviszonyban jellemzően a bruttó bér.",
    },
    {
      pregunta: "Mennyibe kerül a cégnek egy minimálbéres dolgozó?",
      respuesta: "A minimálbér {{hu.minimalber[havi]}}. A szochóval együtt a havi költség 364 764 Ft.",
    },
    {
      pregunta: "A családi kedvezmény csökkenti a munkáltató költségét?",
      respuesta: "Nem. A családi kedvezmény és a 25 év alattiak kedvezménye a dolgozó SZJA-ját csökkenti, a szocho a teljes bruttó bér után jár.",
    },
  ],
  glosario: [
    { termino: "Szocho", definicion: "Szociális hozzájárulási adó, amit a munkáltató fizet a bér után." },
    { termino: "Bérköltség", definicion: "A bruttó bér és a munkáltatót terhelő közteher összege." },
  ],
});
