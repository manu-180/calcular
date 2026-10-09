import { definirCasos } from "@/motor/calculo";
import costo from "./costo-de-un-empleado";

export default definirCasos(costo, [
  {
    nombre: "Salario de 3 millones en una sociedad, riesgo I",
    origen: {
      tipo: "recalculado",
      detalle:
        "3.000.000 < 10 SMMLV: sin salud, SENA ni ICBF (ET art. 114-1). Auxilio 249.095. Pensión 12 % = 360.000; ARL 0,522 % = 15.660; caja 4 % = 120.000. Prestaciones sobre 3.249.095: prima 270.758, cesantías 270.758, intereses 32.491; vacaciones 125.000. Costo 4.443.762.",
    },
    fecha: "2026-10-08",
    entrada: { salario: 3000000, auxilio: true, empleador: "sociedad", riesgo: "i" },
    esperado: { salud: 0, sena: 0, icbf: 0, pension: 360000, arl: 15660, caja: 120000, prima: 270758, intereses: 32491, vacaciones: 125000, costoMensual: 4443762 },
  },
  {
    nombre: "Salario de 20 millones, riesgo III: paga todo",
    origen: {
      tipo: "recalculado",
      detalle:
        "20.000.000 ≥ 10 SMMLV (17.509.050): no hay exoneración ni auxilio. Salud 8,5 % = 1.700.000; pensión 2.400.000; ARL clase III 2,436 % = 487.200; caja 800.000; SENA 2 % = 400.000; ICBF 3 % = 600.000. Prima y cesantías 1.666.667 cada una, intereses 200.000, vacaciones 833.333. Costo 30.753.867.",
    },
    fecha: "2026-10-08",
    entrada: { salario: 20000000, auxilio: true, empleador: "sociedad", riesgo: "iii" },
    esperado: { auxilio: 0, salud: 1700000, arl: 487200, sena: 400000, icbf: 600000, aportes: 6387200, prestaciones: 4366667, costoMensual: 30753867 },
  },
  {
    nombre: "Persona natural con un solo trabajador: sin exoneración",
    origen: { tipo: "recalculado", detalle: "ET art. 114-1: la persona natural con menos de dos trabajadores sigue pagando salud, SENA e ICBF. Salario mínimo: salud 148.827, SENA 35.018, ICBF 52.527." },
    fecha: "2026-10-08",
    entrada: { salario: 1750905, auxilio: true, empleador: "otro", riesgo: "i" },
    esperado: { salud: 148827, sena: 35018, icbf: 52527 },
  },
]);
