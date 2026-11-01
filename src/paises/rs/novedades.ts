import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "rs.minimalna-cena-2027",
    fecha: "2026-10-31",
    titulo: "Minimalna cena rada za 2027: 405 dinara po času",
    texto: "Vlada je 20. avgusta 2026. usvojila odluku za period januar-decembar 2027. Za mesec od 174 časa to je oko 70.470 dinara neto. Od 1. januara kalkulatori sami prelaze na novi iznos.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["rs.minimalna-zarada", "rs.obracun-bolovanja"],
    fuente: {
      organismo: "Vlada Republike Srbije",
      titulo: "Saopštenje od 20. 8. 2026",
      url: "https://www.srbija.gov.rs/vest/994489/vlada-usvojila-predlog-zakona-o-rebalansu-budzeta-za-2026-godinu.php",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "rs.neoporezivi-2027",
    fecha: "2026-10-31",
    titulo: "Neoporezivi deo zarade raste na 37.369 dinara",
    texto: "Izmena Zakona o porezu na dohodak građana iz „Službenog glasnika RS“ 80/2026 podiže neoporezivi iznos sa 34.221 na 37.369 dinara od 1. januara 2027.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["rs.kalkulator-plate", "rs.neto-u-bruto", "rs.porez-na-zarade", "rs.trosak-poslodavca"],
    fuente: {
      organismo: "Ministarstvo finansija",
      titulo: "Zakon o porezu na dohodak građana, čl. 15a",
      url: "https://www.mfin.gov.rs//upload/media/MOq4eO_6aa14ac8c7a47.docx",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "rs.osnovice-2026",
    fecha: "2026-10-31",
    titulo: "Najniža i najviša osnovica doprinosa za 2026",
    texto: "Najniža mesečna osnovica je 51.297 dinara, a najviša 732.820 dinara. Objavljene su u „Službenom glasniku RS“ 112/2025.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["rs.kalkulator-plate", "rs.obracun-doprinosa", "rs.pausal-kalkulator"],
    fuente: {
      organismo: "Ministarstvo finansija",
      titulo: "Iznos najniže mesečne osnovice doprinosa za 2026",
      url: "https://www.mfin.gov.rs//upload/media/nATlw2_69429ec84247a.docx",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
];
