import { definirCasos } from "@/motor/calculo";
import cambioKwanza from "./cambio-kwanza";

const BNA = "https://www.bna.ao/service/rest/taxas/get/evolucao/taxa?moeda=usd&numeromeses=2&tipocambio=b";

export default definirCasos(cambioKwanza, [
  {
    nombre: "100 dólares a 23/10/2026",
    origen: { tipo: "recalculado", url: BNA, detalle: "Taxa de referência de venda do BNA a 23/10/2026: 913 Kz. 100 × 913 = 91 300." },
    fecha: "2026-10-23",
    entrada: { moeda: "usd", sentido: "para-kwanzas", quantia: 100 },
    esperado: { taxa: 913, kwanzas: 91300, data: "2026-10-23" },
  },
  {
    nombre: "Kwanzas para euros",
    origen: { tipo: "recalculado", url: "https://www.bna.ao/service/rest/taxas/get/evolucao/taxa?moeda=eur&numeromeses=2&tipocambio=b", detalle: "Euro a 23/10/2026: 1 040,9915. 1 040 991,50 / 1 040,9915 = 1 000." },
    fecha: "2026-10-23",
    entrada: { moeda: "eur", sentido: "de-kwanzas", quantia: 1040991.5 },
    esperado: { estrangeira: 1000 },
  },
  {
    nombre: "Taxa fixada para testar a fórmula",
    origen: { tipo: "recalculado", url: BNA, detalle: "Com 900 Kz por dólar: 450 000 / 900 = 500." },
    fecha: "2026-10-23",
    entrada: { moeda: "usd", sentido: "de-kwanzas", quantia: 450000 },
    valores: { "ao.usd": { fecha: "2026-10-23", valor: 900 }, "ao.eur": { fecha: "2026-10-23", valor: 1000 } },
    esperado: { estrangeira: 500 },
  },
]);
