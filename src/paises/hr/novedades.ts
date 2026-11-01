import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "hr.minimalna-2027",
    fecha: "2026-11-01",
    titulo: "Minimalna plaća za 2027.: 1.130 eura bruto",
    texto: "Vlada je 29. listopada 2026. donijela Uredbu objavljenu u Narodnim novinama 124/2026. Od 1. siječnja 2027. minimalna plaća raste s 1.050 na 1.130 eura bruto, a kalkulator tada sam prelazi na novi iznos.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["hr.minimalna-placa"],
    fuente: { organismo: "Narodne novine", titulo: "Uredba o visini minimalne plaće za 2027., NN 124/2026", url: "https://narodne-novine.nn.hr/eli/sluzbeni/2026/124/1481/pdf", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "hr.stope-dohodak-2026",
    fecha: "2026-11-01",
    titulo: "Tablica stopa poreza na dohodak za 2026.",
    texto: "Porezna uprava objavila je stope za svih 556 gradova i općina. Rijeka od 1. siječnja 2026. primjenjuje 20 % i 25 %, a Zagreb ostaje na 23 % i 33 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["hr.bruto-neto-kalkulator", "hr.neto-bruto-kalkulator", "hr.porez-na-dohodak", "hr.trosak-poslodavca", "hr.minimalna-placa"],
    fuente: { organismo: "Porezna uprava", titulo: "Stope godišnjeg poreza na dohodak za 2026. godinu", url: "https://porezna-uprava.gov.hr/hr/stope-godisnjeg-poreza-na-dohodak-za-2026-godinu/8166", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
];
