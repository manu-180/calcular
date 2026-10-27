import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "md.salariu-minim-2026",
    fecha: "2026-10-26",
    titulo: "Salariul minim pe țară a crescut la 6.300 de lei",
    texto: "De la 1 ianuarie 2026 salariul minim pe țară este 6.300 de lei pe lună pentru un program complet de 169 de ore, adică 37,28 lei pe oră. În 2025 a fost 5.500 de lei.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["md.salariul-minim"],
    fuente: {
      organismo: "Guvernul Republicii Moldova (Monitorul Oficial)",
      titulo: "HG nr. 771/2025 privind stabilirea cuantumului salariului minim pe țară pentru anul 2026 (Monitorul Oficial nr. 620-622 din 18 decembrie 2025)",
      url: "https://monitorul.gov.md/ro/monitorul/view/pdf/3193/part/2",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "md.salariu-mediu-2026",
    fecha: "2026-10-26",
    titulo: "Salariul mediu lunar prognozat pentru 2026 este 17.400 de lei",
    texto: "Guvernul a aprobat pentru 2026 un salariu mediu lunar pe economie de 17.400 de lei, față de 16.100 de lei în 2025. De el depinde plafonul venitului asigurat pentru indemnizațiile CNAS.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["md.salariul-mediu-pe-economie", "md.calculator-concediu-medical", "md.indemnizatie-de-maternitate", "md.indemnizatie-crestere-copil"],
    fuente: {
      organismo: "Guvernul Republicii Moldova (Monitorul Oficial)",
      titulo: "HG nr. 773/2025 privind aprobarea cuantumului salariului mediu lunar pe economie, prognozat pentru anul 2026",
      url: "https://monitorul.gov.md/ro/monitorul/view/pdf/3193/part/2",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "md.indemnizatie-nastere-2026",
    fecha: "2026-10-26",
    titulo: "Indemnizația unică la naștere este 21.886 de lei",
    texto: "Pentru copiii născuți începând cu 1 ianuarie 2026, mama primește 21.886 de lei pentru fiecare copil născut viu. CNAS o stabilește din oficiu, fără cerere.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["md.indemnizatie-unica-la-nastere"],
    fuente: {
      organismo: "Casa Națională de Asigurări Sociale",
      titulo: "Indemnizații adresate familiilor cu copii",
      url: "https://cnas.gov.md/ro/servicii/servicii/indemnizatii/indemnizatii-adresate-familiilor-cu-copii",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "md.prima-medicala-2026",
    fecha: "2026-10-26",
    titulo: "Polița de asigurare medicală costă 12.636 de lei în 2026",
    texto: "Legea fondurilor asigurării obligatorii de asistență medicală pentru 2026 păstrează prima procentuală de 9 % din salariu și stabilește prima în sumă fixă la 12.636 de lei.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["md.polita-de-asigurare-medicala", "md.calculator-salariu-net"],
    fuente: {
      organismo: "Parlamentul Republicii Moldova (Monitorul Oficial)",
      titulo: "Legea nr. 321/2025, art. 4 (Monitorul Oficial nr. 659-661 din 31 decembrie 2025)",
      url: "https://monitorul.gov.md/ro/monitorul/view/pdf/3204/part/1",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
