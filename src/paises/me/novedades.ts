import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "me.inflacija-septembar-2026",
    fecha: "2026-10-13",
    titulo: "Inflacija u septembru 2026: 5,2 odsto godišnje",
    texto: "MONSTAT je objavio da su potrošačke cijene u septembru bile za 0,5 odsto više nego u avgustu i za 5,2 odsto više nego godinu ranije.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["me.kalkulator-inflacije"],
    fuente: {
      organismo: "MONSTAT",
      titulo: "Indeks potrošačkih cijena, septembar 2026",
      url: "https://monstat.org/uploads/files/cijene/CPI/2026/9/CPI_CG_Septembar_2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "me.zarada-septembar-2026",
    fecha: "2026-10-30",
    titulo: "Prosječna neto zarada za septembar: 1.043 eura",
    texto: "Bruto je iznosila 1.245 eura. Neto zarada je za 0,3 odsto veća nego u avgustu i za 2,7 odsto veća nego u septembru 2025.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["me.prosjecna-zarada", "me.otpremnina"],
    fuente: {
      organismo: "MONSTAT",
      titulo: "Prosječne zarade, septembar 2026",
      url: "https://monstat.org/DS/ZARADE/Zarade_CG_Sep_2026.html",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "me.promet-gradjevinsko-2026",
    fecha: "2026-03-10",
    titulo: "Građevinsko zemljište prelazi na PDV",
    texto: "Izmjena Zakona o porezu na promet nepokretnosti iz „Službenog lista CG“ 33/26 izuzima građevinsko zemljište koje se oporezuje PDV-om, u primjeni od 1. aprila 2026. Stope poreza se ne mijenjaju.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["me.porez-na-promet-nepokretnosti"],
    fuente: {
      organismo: "Službeni list Crne Gore",
      titulo: "Zakon o izmjeni Zakona o porezu na promet nepokretnosti, broj 33/2026",
      url: "https://www.sluzbenilist.me/propisi/391611",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "me.dohodak-160-25",
    fecha: "2025-12-30",
    titulo: "Nov član 10 Zakona o porezu na dohodak",
    texto: "Izmjena iz „Službenog lista CG“ 160/25 preuređuje stope i za preduzetnike: osnovna samostalna djelatnost ima 0, 9 i 15 odsto sa pragovima od 8.400 i 12.000 eura godišnje. Na zarade ostaju pragovi od 700 i 1.000 eura mjesečno.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["me.kalkulator-plate", "me.porez-na-dohodak", "me.porez-za-preduzetnike"],
    fuente: {
      organismo: "Službeni list Crne Gore",
      titulo: "Zakon o izmjenama i dopunama Zakona o porezu na dohodak fizičkih lica, 160/25",
      url: "https://wapi.gov.me/download/47bea12c-f250-4cdc-b481-3afc30fba94f?version=1.0",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
];
