import { definirCasos } from "@/motor/calculo";
import permisoDeMaternidad from "./permiso-de-maternidad";

const L7534 = "https://www.bacn.gov.py/leyes-paraguayas/12838/ley-n-7534-2025-que-modifica-y-amplia-los-articulos-2-y-11-de-la-ley-n-5508-2015" as const;

export default definirCasos(permisoDeMaternidad, [
  {
    nombre: "Parto simple desde el día del parto",
    origen: {
      tipo: "recalculado",
      url: L7534,
      detalle: "Art. 11: 18 semanas = 126 días desde el 10/11/2026, último día 15/3/2027. Subsidio 100 % (art. 12): 3.044.000 / 30 × 126 = 12.784.800. Padre: 2 semanas (art. 13 b), hasta el 23/11/2026.",
    },
    fecha: "2026-10-12",
    entrada: { parto: "2026-11-10", antes: false, especial: false, bebes: 1, salario: 3044000 },
    esperado: { inicio: "2026-11-10", fin: "2027-03-15", dias: 126, subsidio: 12784800, finPaternidad: "2026-11-23" },
  },
  {
    nombre: "Mellizos prematuros, desde dos semanas antes",
    origen: {
      tipo: "recalculado",
      url: L7534,
      detalle: "Empieza el 17/11/2026. Por mellizos: 18 semanas más un mes, hasta el 22/4/2027. Por prematuro: 24 semanas, hasta el 3/5/2027. Rige el más largo: 168 días. Subsidio 150.000 × 168 = 25.200.000.",
    },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-01", antes: true, especial: true, bebes: 2, salario: 4500000 },
    esperado: { inicio: "2026-11-17", fin: "2027-05-03", dias: 168, subsidio: 25200000 },
  },
  {
    nombre: "Trillizos sin prematuridad",
    origen: { tipo: "recalculado", detalle: "18 semanas desde el 1/2/2027 terminan el 6/6/2027 (exclusive 7/6); dos meses más por el segundo y tercer bebé: hasta el 6/8/2027. 187 días." },
    fecha: "2026-10-12",
    entrada: { parto: "2027-02-01", antes: false, especial: false, bebes: 3, salario: 3000000 },
    esperado: { inicio: "2027-02-01", fin: "2027-08-06", dias: 187 },
  },
]);
