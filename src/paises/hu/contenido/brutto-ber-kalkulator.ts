import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.brutto-ber-kalkulator",
  h1: "Bruttó bér kalkulátor nettóból",
  title: "Bruttó bér kalkulátor: mennyi bruttó kell a nettóhoz?",
  description:
    "Add meg, mennyi nettót szeretnél, és megmutatjuk a szükséges bruttó bért. SZJA ({{hu.szja}}), TB-járulék ({{hu.tb-jarulek}}) és kedvezmények szerint.",
  intro: [
    "Állásinterjú vagy béralku előtt jó tudni, hogy a kívánt nettó mekkora bruttónak felel meg. A munkáltató ugyanis szinte mindig bruttóban ajánl.",
    "A kalkulátor visszafelé számol: megkeresi azt a legkisebb bruttó bért, amelyből a levonások után megmarad a kért nettó.",
  ],
  comoSeCalcula: [
    "Kedvezmények nélkül a bruttó bérből a TB-járulék ({{hu.tb-jarulek}}) és az SZJA ({{hu.szja}}) jön le.",
    "Ha nincs kedvezményed, a bruttó nagyjából a nettó másfélszerese.",
    "A családi kedvezmény, a 25 év alattiak és az anyák kedvezménye csökkenti az SZJA-t, ezért ugyanahhoz a nettóhoz kisebb bruttó is elég.",
  ],
  ejemplo: [
    "Ha 400 000 Ft nettót szeretnél kedvezmények nélkül, 601 503 Ft bruttóra van szükség. Ha 25 év alatti vagy, 490 797 Ft bruttó is elég, mert nem fizetsz SZJA-t.",
  ],
  faq: [
    {
      pregunta: "Mennyi bruttó kell 300 000 Ft nettóhoz?",
      respuesta: "Kedvezmények nélkül 451 127 Ft bruttó. Írd be a kalkulátorba a saját kedvezményeidet, mert gyermek után vagy 25 év alatt ennél kevesebb is elég.",
    },
    {
      pregunta: "Miért nem pontosan a nettó másfélszerese a bruttó?",
      respuesta: "A levonások együtt a bruttó bér valamivel több mint harmadát teszik ki, ezért a szorzó kicsit nagyobb másfélnél. A forintra kerekítés miatt egy-két forint eltérés is lehet.",
    },
    {
      pregunta: "A munkáltatónak mennyibe kerül ez a bér?",
      respuesta: "A bruttó béren felül a munkáltató szociális hozzájárulási adót fizet, ennek mértéke {{hu.szocho}}. Az eredményben ezt is látod.",
    },
  ],
  glosario: [
    { termino: "Bruttó bér", definicion: "A szerződésben szereplő bér, amiből a levonások még nem jöttek le." },
    { termino: "Szocho", definicion: "Szociális hozzájárulási adó: a munkáltató fizeti a bruttó bér után." },
  ],
});
