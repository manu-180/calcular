import { definirCasos } from "@/motor/calculo";
import devolucionIrpf from "./devolucion-irpf";

const BASE = { hijos: 0, hijosDiscapacidad: 0, compartida: false, otras: 0 } as const;

export default definirCasos(devolucionIrpf, [
  {
    nombre: "Sueldo de $ 100.000 todo el año con retenciones de $ 70.000",
    origen: {
      tipo: "recalculado",
      url: "https://www.bps.gub.uy/bps/file/23657/1/2025---comunicado-13---ajuste-anual-irpf-2025-trabajadores-dependientes.pdf",
      detalle:
        "Método del BPS (Comunicado 13/2025), BPC 6.864. Escala anual sobre 1.200.000: 10 % de 247.104 (24.710,40) + 15 % de 376.320 (56.448) = 81.158,40; tasa máxima 15 %. Deducciones 250.300 al 14 % (ingresos hasta 180 BPC = 1.235.520): 35.042. Rentas 46.116,40. Aguinaldo y salario vacacional 120.000 × 15 % = 18.000. Impuesto 64.116,40. Retenciones 70.000: devolución 5.883,60.",
    },
    fecha: "2026-10-12",
    entrada: { ...BASE, ingresos: 1200000, aguinaldoSv: 120000, aportes: 250300, retenciones: 70000 },
    esperado: { impuestoEscala: 81158.4, tasaMaxima: 15, descuento: 35042, sobreAguinaldo: 18000, impuesto: 64116.4, devolucion: 5883.6, aPagar: 0 },
  },
  {
    nombre: "Ingresos bajo el mínimo: se devuelve todo lo retenido",
    origen: { tipo: "recalculado", detalle: "500.000 no pasa 84 BPC (576.576): impuesto 0, y sin impuesto sobre rentas el aguinaldo no paga. Devolución 2.000." },
    fecha: "2026-10-12",
    entrada: { ...BASE, ingresos: 500000, aguinaldoSv: 60000, aportes: 100000, retenciones: 2000 },
    esperado: { impuesto: 0, sobreAguinaldo: 0, devolucion: 2000 },
  },
  {
    nombre: "Con un hijo y retenciones bajas: falta pagar",
    origen: {
      tipo: "recalculado",
      detalle: "Como el primer caso pero con un hijo: 20 BPC = 137.280 más de deducciones. 387.580 × 14 % = 54.261,20. Rentas 26.897,20 + 18.000 = 44.897,20. Retenciones 40.000: faltan 4.897,20.",
    },
    fecha: "2026-10-12",
    entrada: { ...BASE, hijos: 1, ingresos: 1200000, aguinaldoSv: 120000, aportes: 250300, retenciones: 40000 },
    esperado: { deducciones: 387580, impuesto: 44897.2, aPagar: 4897.2, devolucion: 0 },
  },
]);
