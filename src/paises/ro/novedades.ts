import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ro.salariu-minim-iulie-2026",
    fecha: "2026-10-24",
    titulo: "Salariul minim brut a crescut la 4.325 de lei",
    texto: "De la 1 iulie 2026 salariul de bază minim brut pe țară este 4.325 de lei pe lună, adică 25,949 lei pe oră. Până la 30 iunie 2026 a fost 4.050 de lei.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["ro.salariul-minim", "ro.calculator-salariu-net", "ro.calculator-salariu-brut", "ro.cost-total-angajator"],
    fuente: {
      organismo: "Guvernul României (text publicat de ANAF)",
      titulo: "HG nr. 146/2026 (Monitorul Oficial nr. 196 din 13 martie 2026)",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/HG_146_2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "ro.facilitate-salariu-minim-iulie-2026",
    fecha: "2026-10-24",
    titulo: "Suma neimpozabilă de la salariul minim scade la 200 de lei",
    texto: "Pentru salariile din iulie-decembrie 2026, suma fără impozit și fără contribuții este 200 de lei pe lună, dacă venitul brut nu trece de 4.600 de lei. În prima jumătate a anului a fost 300 de lei, cu plafon de 4.300 de lei.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["ro.calculator-salariu-net", "ro.calculator-salariu-brut", "ro.cost-total-angajator", "ro.salariul-minim"],
    fuente: {
      organismo: "Guvernul României (text publicat de ANAF)",
      titulo: "OUG nr. 89/2025, art. III (Monitorul Oficial nr. 1.203 din 24 decembrie 2025)",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "ro.impozit-dividende-2026",
    fecha: "2026-10-24",
    titulo: "Impozitul pe dividende este 16 %",
    texto: "Pentru dividendele distribuite începând cu 1 ianuarie 2026 impozitul este 16 %. Dividendele din situațiile interimare ale anului 2025 rămân la 10 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ro.impozit-dividende", "ro.calculator-cass"],
    fuente: {
      organismo: "Agenția Națională de Administrare Fiscală (ANAF)",
      titulo: "Codul fiscal, art. 97 alin. (7), cu nota la Legea nr. 141/2025",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "ro.microintreprinderi-2026",
    fecha: "2026-10-24",
    titulo: "Impozitul micro: 1 % până la 100.000 de euro",
    texto: "În 2026 impozitul pe veniturile firmelor micro are o singură cotă, 1 % din venituri, iar plafonul este echivalentul a 100.000 de euro.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ro.calculator-microintreprindere"],
    fuente: {
      organismo: "Agenția Națională de Administrare Fiscală (ANAF)",
      titulo: "Codul fiscal, art. 47 și art. 51",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
