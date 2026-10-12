import { definirCasos } from "@/motor/calculo";
import ivaAPagar from "./iva-a-pagar";

export default definirCasos(ivaAPagar, [
  {
    nombre: "Mes con IVA a pagar",
    origen: {
      tipo: "recalculado",
      url: "https://www.dnit.gov.py/web/portal-institucional/iva",
      detalle: "Débito: 11.000.000 / 11 = 1.000.000 más 2.100.000 / 21 = 100.000; total 1.100.000. Crédito: 5.500.000 / 11 = 500.000. A pagar 600.000.",
    },
    fecha: "2026-10-12",
    entrada: { ventas10: 11000000, ventas5: 2100000, compras10: 5500000, compras5: 0, saldoAnterior: 0 },
    esperado: { debito: 1100000, credito: 500000, aPagar: 600000, saldoAFavor: 0 },
  },
  {
    nombre: "Mes con saldo a favor",
    origen: { tipo: "recalculado", detalle: "Débito 2.200.000 / 11 = 200.000. Crédito 4.400.000 / 11 = 400.000 más 100.000 del mes anterior. Saldo a favor 300.000." },
    fecha: "2026-10-12",
    entrada: { ventas10: 2200000, ventas5: 0, compras10: 4400000, compras5: 0, saldoAnterior: 100000 },
    esperado: { debito: 200000, credito: 400000, aPagar: 0, saldoAFavor: 300000 },
  },
]);
