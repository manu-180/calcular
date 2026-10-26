import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.nettober-kalkulator",
  h1: "Nettó bér kalkulátor",
  title: "Nettó bér kalkulátor 2026: bruttóból nettó kedvezményekkel",
  description:
    "Számold ki a nettó béredet a bruttóból: SZJA ({{hu.szja}}), TB-járulék ({{hu.tb-jarulek}}), családi kedvezmény, 25 év alattiak és anyák kedvezménye.",
  intro: [
    "A bruttó bérből két tételt vonnak le: a személyi jövedelemadót (SZJA, mértéke {{hu.szja}}) és a társadalombiztosítási járulékot (TB-járulék, mértéke {{hu.tb-jarulek}}). Kedvezmények nélkül a kettő együtt valamivel több, mint a bruttó bér harmada.",
    "A kalkulátor az idei kedvezményekkel számol: családi kedvezmény és családi járulékkedvezmény, 25 év alattiak kedvezménye, anyák kedvezményei, személyi kedvezmény és az első házasok kedvezménye.",
  ],
  comoSeCalcula: [
    "A TB-járulék a bruttó bér {{hu.tb-jarulek}} része.",
    "Az SZJA alapja a bruttó bér. Ebből jönnek le a kedvezmények, ebben a sorrendben: anyák kedvezménye, 25 év alattiak kedvezménye, személyi kedvezmény, első házasok kedvezménye, végül a családi kedvezmény.",
    "Az SZJA a megmaradt alap {{hu.szja}} része.",
    "Ha a családi kedvezmény nagyobb, mint ami az adóalapból levonható, a fennmaradó rész {{hu.szja}} része a TB-járulékot csökkenti. Ez a családi járulékkedvezmény.",
    "Nettó bér = bruttó bér − TB-járulék + családi járulékkedvezmény − SZJA.",
  ],
  ejemplo: [
    "Bruttó 500 000 Ft, egy gyermek. A TB-járulék 92 500 Ft. A családi kedvezmény havonta {{hu.csaladi-kedvezmeny[1]}}, ezért az SZJA alapja 366 660 Ft, az adó 54 999 Ft. A nettó bér 352 501 Ft.",
    "Ugyanez a bér gyermek nélkül 332 500 Ft nettó. Az egy gyermek után járó kedvezmény tehát havi 20 001 Ft-tal növeli a fizetést.",
  ],
  faq: [
    {
      pregunta: "Mennyi a 2026. évi minimálbér nettó összege?",
      respuesta: "A minimálbér bruttó {{hu.minimalber[havi]}}. Kedvezmények nélkül ebből 214 662 Ft nettó marad. Ha gyermeket nevelsz vagy 25 év alatti vagy, ennél több.",
    },
    {
      pregunta: "Mennyi a családi adókedvezmény egy, két és három gyermek után?",
      respuesta: "Havonta, kedvezményezett eltartottanként: egy eltartottnál {{hu.csaladi-kedvezmeny[1]}}, két eltartottnál {{hu.csaladi-kedvezmeny[2]}}, három vagy több eltartottnál {{hu.csaladi-kedvezmeny[3]}}. Ez az összeg az adóalapot csökkenti, a megtakarítás ennek {{hu.szja}} része.",
    },
    {
      pregunta: "Hogyan működik a 25 év alattiak kedvezménye?",
      respuesta: "A 25 év alatti fiatalok bére havonta legfeljebb {{hu.fiatalok-kedvezmenye-hatar}} összegig SZJA-mentes. A határ feletti rész után adót fizetsz. A TB-járulékot a teljes bérből levonják.",
    },
    {
      pregunta: "Kinek jár az anyák kedvezménye?",
      respuesta: "A munkából származó jövedelem SZJA-mentes a 30 év alatti anyáknak, a négy vagy több, illetve a három gyermeket nevelő anyáknak. A két gyermeket nevelő anyák közül először azok kapják, akik a 40. életévüket 2025 után töltik be. A TB-járulékot ők is fizetik.",
    },
    {
      pregunta: "Mi az a családi járulékkedvezmény?",
      respuesta: "Ha kicsi a bér és sok a gyermek, a családi kedvezmény nem fér bele az adóalapba. A fel nem használt rész {{hu.szja}} része ilyenkor a TB-járulékot csökkenti, legfeljebb a járulék összegéig.",
    },
  ],
  glosario: [
    { termino: "Bruttó bér", definicion: "A munkaszerződésben szereplő bér, levonások előtt." },
    { termino: "Nettó bér", definicion: "Amit a levonások után a számládra utalnak." },
    { termino: "SZJA", definicion: "Személyi jövedelemadó. A munkáltató havonta adóelőlegként vonja le." },
    { termino: "TB-járulék", definicion: "Társadalombiztosítási járulék: ebből fizetik a nyugdíjat és az egészségügyi ellátást." },
    { termino: "Kedvezményezett eltartott", definicion: "Az a gyermek, aki után családi pótlék jár." },
  ],
});
