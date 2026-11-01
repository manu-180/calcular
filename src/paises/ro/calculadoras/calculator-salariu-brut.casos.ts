import { definirCasos } from "@/motor/calculo";
import calculatorSalariuBrut from "./calculator-salariu-brut";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(calculatorSalariuBrut, [
  {
    nombre: "3.523 lei net, fără persoane în întreținere",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "6.000 lei brut dă 3.523 lei net (CAS 1.500, CASS 600, impozit 377). La 5.999 lei brut netul este 3.522 lei, deci brutul minim este 6.000.",
    },
    fecha: "2026-10-24",
    entrada: { net: 3523, persoane: "0", sub26: false, copii: 0, minim: false },
    esperado: { brut: 6000, netObtinut: 3523 },
  },
  {
    nombre: "Netul salariului minim: 2.699 lei",
    origen: {
      tipo: "recalculado",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf",
      detalle: "Cu suma neimpozabilă de 200 de lei, 4.325 lei brut dau 2.699 lei net. Sub salariul minim facilitatea nu se aplică, așa că 4.324 lei brut dau doar 2.616 lei net.",
    },
    fecha: "2026-10-24",
    entrada: { net: 2699, persoane: "0", sub26: false, copii: 0, minim: true },
    esperado: { brut: 4325, cas: 1031, cass: 413, impozit: 182 },
  },
  {
    nombre: "5.850 lei net",
    origen: { tipo: "recalculado", url: CF, detalle: "10.000 lei brut: CAS 2.500, CASS 1.000, impozit 650, net 5.850. La 9.999 lei brut netul este 5.849 lei." },
    fecha: "2026-10-24",
    entrada: { net: 5850, persoane: "0", sub26: false, copii: 0, minim: false },
    esperado: { brut: 10000 },
  },
  {
    nombre: "Net zero",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără net dorit nu există calcul." },
    fecha: "2026-10-24",
    entrada: { net: 0, persoane: "0", sub26: false, copii: 0, minim: false },
    esperaError: true,
  },
]);
