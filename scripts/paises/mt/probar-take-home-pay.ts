// Corre mt.take-home-pay con los valores de datos.json aunque estén sin verificar (la tabla Class 1
// de 2026), para revisar el neto y la forma que vería «Tu sueldo en el mundo» el día que se verifique.
//   npx tsx scripts/paises/mt/probar-take-home-pay.ts
import { crearContexto } from "@/motor/calculo";
import datos from "@/paises/mt/datos.json";
import takeHomePay from "@/paises/mt/calculadoras/take-home-pay";
import { mercado } from "@/paises/mt/mercado";

const valores: Record<string, unknown> = {};
for (const d of datos.datos) {
  const tramo = d.tramos[d.tramos.length - 1];
  valores[d.id] = tramo.valor;
}

const contexto = crearContexto(mercado, "2026-10-26");
let anterior = 0;
for (const salario of [8000, 12000, 20000, 30000, 45000, 60000, 90000, 150000]) {
  const r = takeHomePay.calcular({ salario, estado: "single", desde1962: true, bonos: false } as never, valores as never, contexto) as Record<string, unknown>;
  const neto = r.anual as number;
  const marca = neto < anterior ? "  ← baja" : "";
  console.log(`${String(salario).padStart(7)}  neto ${neto.toFixed(2).padStart(10)}  tax ${String(r.impuesto).padStart(9)}  ssc ${String(r.ssc).padStart(8)}  cat ${r.categoria}  ${((neto / salario) * 100).toFixed(1)} %${marca}`);
  anterior = neto;
}
