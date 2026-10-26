import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.gyed-kalkulator",
  h1: "GYED kalkulátor",
  title: "GYED kalkulátor: gyermekgondozási díj és maximuma",
  description:
    "A GYED a napi átlagkereset {{hu.gyed}} része, legfeljebb a minimálbér kétszeresének {{hu.gyed}} része. Bruttó, nyugdíjjárulék és nettó GYED havonta.",
  intro: [
    "A gyermekgondozási díj (GYED) a CSED után jár, amíg a gyermek betölti a második életévét. Ikreknél egy évvel tovább.",
    "A GYED a korábbi átlagkereset {{hu.gyed}} része, de van felső határa. SZJA-t nem vonnak le belőle, nyugdíjjárulékot ({{hu.nyugdijjarulek}}) igen.",
  ],
  comoSeCalcula: [
    "Bruttó GYED = havi átlagkereset × {{hu.gyed}}.",
    "Felső határ: a minimálbér kétszeresének {{hu.gyed}} része. A minimálbér most {{hu.minimalber[havi]}}.",
    "Nettó GYED = bruttó GYED − nyugdíjjárulék ({{hu.nyugdijjarulek}}).",
  ],
  ejemplo: [
    "Havi 500 000 Ft átlagkereset: a bruttó GYED 350 000 Ft, ebből 35 000 Ft nyugdíjjárulék, a nettó 315 000 Ft.",
  ],
  faq: [
    {
      pregunta: "Mennyi a GYED maximuma?",
      respuesta: "A minimálbér kétszeresének {{hu.gyed}} része, idén havi 451 920 Ft bruttó. A nyugdíjjárulék után 406 728 Ft marad.",
    },
    {
      pregunta: "Meddig jár a GYED?",
      respuesta: "A CSED lejártától addig, amíg a gyermek betölti a második életévét. Ikrek esetén egy évvel tovább.",
    },
    {
      pregunta: "Ki kaphat GYED-et?",
      respuesta: "Az a szülő, aki a gyermek születése előtti két évben legalább 365 napig biztosított volt, és a gyermeket a saját háztartásában neveli.",
    },
  ],
  glosario: [
    { termino: "GYED", definicion: "Gyermekgondozási díj, a CSED utáni egészségbiztosítási ellátás." },
    { termino: "Nyugdíjjárulék", definicion: "A GYED-ből levont járulék, ami nyugdíjjogosultságot szerez." },
  ],
});
