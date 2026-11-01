import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ba.inflacija-rs-septembar-2026",
    fecha: "2026-10-22",
    titulo: "Cijene u Republici Srpskoj u septembru 2026: 6,0 odsto više nego godinu ranije",
    texto: "Republički zavod za statistiku objavio je da su potrošačke cijene u septembru bile za 1,0 odsto više nego u avgustu i za 6,0 odsto više nego u septembru 2025. Federalni zavod za statistiku za FBiH objavio je 1,4 i 5,7 odsto.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["ba.kalkulator-inflacije"],
    fuente: {
      organismo: "Republički zavod za statistiku RS",
      titulo: "Indeksi potrošačkih cijena, septembar 2026. (saopštenje 341/26)",
      url: "https://www.rzs.rs.ba/static/uploads/saopstenja/cijene/indeksi_potrosackih_cijena/2026/IndeksiPotrosackihCijena_sep_2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "ba.neoporezivo-rs-2026",
    fecha: "2026-01-01",
    titulo: "U RS je od januara dio plate od 50 KM oslobođen poreza",
    texto: "Zakon iz „Službenog glasnika RS” 114/25 oslobađa neto iznos od 50 KM mjesečno na poslovima bez uslova o obrazovanju i na onima s najmanje trogodišnjom srednjom školom.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ba.kalkulator-plate", "ba.bruto-iz-neta", "ba.porez-na-dohodak", "ba.doprinosi"],
    fuente: {
      organismo: "Narodna skupština Republike Srpske",
      titulo: "Zakon o izmjenama i dopunama Zakona o porezu na dohodak, 114/25",
      url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjenama-i-dopunama-zakona-o-porezu-na-dohodak-7",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "ba.minimalna-2026",
    fecha: "2025-12-30",
    titulo: "Najniža plata za 2026: 1.027 KM u FBiH, od 1.000 KM u RS",
    texto: "Vlada FBiH utvrdila je najnižu platu od 1.027 KM neto za cijelu 2026. godinu. U RS iznos zavisi od obrazovanja koje posao traži, od 1.000 do 1.450 KM neto.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ba.minimalna-plata", "ba.bruto-iz-neta"],
    fuente: {
      organismo: "Vlada Federacije BiH",
      titulo: "Odluka o iznosu najniže plate za 2026. godinu",
      url: "https://fbihvlada.gov.ba/bs/1094-odluka-o-iznosu-najnize-place-za-2026-godinu",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "ba.doprinosi-fbih-2025",
    fecha: "2025-07-01",
    titulo: "U FBiH doprinosi poslodavca pali su na 5 odsto",
    texto: "Zakon iz „Službenih novina FBiH” 33/25 spustio je dio poslodavca za penzijsko s 6 na 2,5 odsto i za zdravstveno s 4 na 2 odsto. Primjena je od 1. jula 2025. godine.",
    vigenteDesde: "2025-07-01",
    calculadoras: ["ba.trosak-poslodavca", "ba.doprinosi"],
    fuente: {
      organismo: "Porezna uprava FBiH",
      titulo: "Zakon o izmjenama i dopunama Zakona o doprinosima, 33/25",
      url: "https://www.pufbih.ba/v1/public/upload/zakoni/50ea7-zakon-o-izmjenama-i-dopunama-zakona-o-doprinosima-33-25.pdf",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
