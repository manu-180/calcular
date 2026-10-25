import { definirCasos } from "@/motor/calculo";
import calculatorDrepturiDeAutor from "./calculator-drepturi-de-autor";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(calculatorDrepturiDeAutor, [
  {
    nombre: "100.000 lei drepturi de autor, fără salariu",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Net 60 % = 60.000 (art. 72 alin. 2); impozit 10 % = 6.000. Net între 12 × 4.050 = 48.600 și 97.200: CAS 25 % × 48.600 = 12.150 (art. 148); CASS 10 % × 48.600 = 4.860 (art. 170). Rămân 76.990 lei.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 100000, salariat: false, pensionar: false },
    esperado: { net: 60000, impozit: 6000, cas: 12150, cass: 4860, ramas: 76990 },
  },
  {
    nombre: "Cu salariu: fără CAS",
    origen: { tipo: "recalculado", url: CF, detalle: "Art. 150 alin. (2): cine are salariu nu datorează CAS pentru drepturile de autor. Rămân 100.000 − 6.000 − 4.860 = 89.140 lei." },
    fecha: "2026-10-24",
    entrada: { brut: 100000, salariat: true, pensionar: false },
    esperado: { cas: 0, cass: 4860, ramas: 89140 },
  },
  {
    nombre: "Sume mici: doar impozitul",
    origen: { tipo: "recalculado", url: CF, detalle: "30.000 lei: net 18.000, impozit 1.800. Sub 24.300 fără CASS, sub 48.600 fără CAS." },
    fecha: "2026-10-24",
    entrada: { brut: 30000, salariat: false, pensionar: false },
    esperado: { impozit: 1800, cas: 0, cass: 0, ramas: 28200 },
  },
  {
    nombre: "Fără venit",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără drepturi de autor nu există calcul." },
    fecha: "2026-10-24",
    entrada: { brut: 0, salariat: false, pensionar: false },
    esperaError: true,
  },
]);
