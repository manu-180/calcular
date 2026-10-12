import { definirCasos } from "@/motor/calculo";
import rentaPersonasJuridicas from "./renta-personas-juridicas";

export default definirCasos(rentaPersonasJuridicas, [
  {
    nombre: "Pyme con renta neta de ₡15.000.000",
    origen: {
      tipo: "recalculado",
      detalle:
        "Bruta 80.000.000, menos que 119.174.000. Decreto 45333-H, art. 3: 5.621.000 × 5 % = 281.050; 2.812.000 × 10 % = 281.200; 2.810.000 × 15 % = 421.500; 3.757.000 × 20 % = 751.400. Total 1.735.150.",
    },
    fecha: "2026-10-12",
    entrada: { rentaBruta: 80000000, rentaNeta: 15000000 },
    esperado: { impuesto: 1735150, utilidadNeta: 13264850 },
  },
  {
    nombre: "Empresa grande: 30 %",
    origen: { tipo: "recalculado", detalle: "Bruta 200.000.000: tarifa general del art. 15 a, 30 % de 30.000.000 = 9.000.000." },
    fecha: "2026-10-12",
    entrada: { rentaBruta: 200000000, rentaNeta: 30000000 },
    esperado: { impuesto: 9000000, tasaEfectiva: 30 },
  },
  {
    nombre: "Justo en el tope de la pyme",
    origen: { tipo: "recalculado", detalle: "Bruta 119.174.000 (no supera el tope): tramos. Neta 5.000.000 × 5 % = 250.000." },
    fecha: "2026-10-12",
    entrada: { rentaBruta: 119174000, rentaNeta: 5000000 },
    esperado: { impuesto: 250000 },
  },
  {
    nombre: "Neta mayor que bruta",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { rentaBruta: 1000000, rentaNeta: 2000000 },
    esperaError: true,
  },
]);
