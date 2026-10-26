import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "pl.placa-minimalna-2027",
    fecha: "2026-10-24",
    titulo: "Płaca minimalna w 2027 r.: 4950 zł brutto",
    texto: "Rząd ustalił minimalne wynagrodzenie na 2027 r. w wysokości 4950 zł i minimalną stawkę godzinową 32,30 zł. Do końca 2026 r. obowiązuje 4806 zł i 31,40 zł za godzinę.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["pl.placa-minimalna", "pl.odprawa"],
    fuente: {
      organismo: "Dziennik Ustaw (ISAP, Kancelaria Sejmu)",
      titulo: "Rozporządzenie Rady Ministrów z 14 września 2026 r. (Dz.U. 2026 poz. 1213)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001213",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "pl.stopa-referencyjna-marzec-2026",
    fecha: "2026-10-24",
    titulo: "Stopa referencyjna NBP spadła do 3,75 %",
    texto: "Od 5 marca 2026 r. stopa referencyjna NBP wynosi 3,75 %. Odsetki ustawowe za opóźnienie to od tego dnia 9,25 % w skali roku, a w transakcjach handlowych 13,75 %.",
    vigenteDesde: "2026-03-05",
    calculadoras: ["pl.kalkulator-odsetek-ustawowych"],
    fuente: {
      organismo: "Narodowy Bank Polski",
      titulo: "Podstawowe stopy procentowe NBP",
      url: "https://static.nbp.pl/dane/stopy/stopy_procentowe.xml",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "pl.zus-2026",
    fecha: "2026-10-24",
    titulo: "Składki ZUS przedsiębiorcy w 2026 r.",
    texto: "W 2026 r. pełne składki społeczne liczy się od 5652 zł, a preferencyjne od 1441,80 zł. Minimalna składka zdrowotna na skali i liniowym wynosi 432,54 zł od lutego 2026 r.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pl.skladki-zus", "pl.kalkulator-b2b", "pl.maly-zus-plus"],
    fuente: {
      organismo: "Zakład Ubezpieczeń Społecznych",
      titulo: "Wysokość składek na ubezpieczenia społeczne w 2026 r.",
      url: "https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
