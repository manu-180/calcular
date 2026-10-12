import { definirCasos } from "@/motor/calculo";
import poderAdquisitivo from "./poder-adquisitivo";

export default definirCasos(poderAdquisitivo, [
  {
    nombre: "Salario que se cuadruplicó en un año, pero perdió contra la inflación",
    origen: {
      tipo: "recalculado",
      url: "https://www.bcv.org.ve/estadisticas/consumidor",
      detalle:
        "INPC BCV septiembre 2025 = 122.169.616.603.138,98 y septiembre 2026 = 690.967.674.312.665. Factor 5,6558: Bs 10.000 → Bs 56.558,06. Con Bs 40.000: 40.000 / 56.558,06 − 1 = −29,28 %; diferencia −16.558,06.",
    },
    fecha: "2026-10-12",
    entrada: { salarioAntes: 10000, mesAntes: "2025-09-01", salarioAhora: 40000, mesAhora: "2026-09-01" },
    esperado: { inflacion: 465.58, equivalente: 56558.06, variacionReal: -29.28, diferencia: -16558.06 },
  },
  {
    nombre: "Salario que le ganó a la inflación en 2026",
    origen: {
      tipo: "recalculado",
      detalle: "INPC enero 2026 = 281.565.112.063.483. Factor a septiembre 2,4540: Bs 50.000 → 122.701,22. Con Bs 150.000: +22,25 %; diferencia 27.298,78.",
    },
    fecha: "2026-10-12",
    entrada: { salarioAntes: 50000, mesAntes: "2026-01-01", salarioAhora: 150000, mesAhora: "2026-09-15" },
    esperado: { equivalente: 122701.22, variacionReal: 22.25, diferencia: 27298.78, mesDestino: "septiembre de 2026" },
  },
  {
    nombre: "Mes anterior a la reconversión",
    origen: { tipo: "recalculado", detalle: "Antes de octubre 2021 los montos estaban en otra expresión monetaria (Decreto 4.553)." },
    fecha: "2026-10-12",
    entrada: { salarioAntes: 10000, mesAntes: "2021-01-01", salarioAhora: 40000, mesAhora: "2026-09-01" },
    esperaError: true,
  },
]);
