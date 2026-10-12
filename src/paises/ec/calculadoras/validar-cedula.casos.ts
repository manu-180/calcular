import { definirCasos } from "@/motor/calculo";
import validarCedula from "./validar-cedula";

export default definirCasos(validarCedula, [
  {
    nombre: "Cédula de Pichincha con dígito correcto",
    origen: {
      tipo: "recalculado",
      detalle: "171234567: 1×2, 7×1, 1×2, 2×1, 3×2, 4×1, 5×2 = 10 − 9 = 1, 6×1, 7×2 = 14 − 9 = 5. Suma 35; verificador 10 − 5 = 5. 1712345675 es válida.",
    },
    fecha: "2026-10-07",
    entrada: { cedula: 1712345675 },
    esperado: { resultado: "Cédula válida", provincia: "Pichincha", numero: "1712345675" },
  },
  {
    nombre: "Cédula de Guayas: el cero inicial se recupera",
    origen: { tipo: "recalculado", detalle: "0912345675: mismo cálculo, suma 35, verificador 5. El campo numérico recibe 912345675 y se completa a diez dígitos." },
    fecha: "2026-10-07",
    entrada: { cedula: 912345675 },
    esperado: { resultado: "Cédula válida", provincia: "Guayas", numero: "0912345675" },
  },
  {
    nombre: "Dígito verificador equivocado",
    origen: { tipo: "recalculado", detalle: "1712345670: el verificador debería ser 5." },
    fecha: "2026-10-07",
    entrada: { cedula: 1712345670 },
    esperado: { resultado: "Cédula no válida" },
  },
  {
    nombre: "Código de provincia inexistente",
    origen: { tipo: "recalculado", detalle: "25 no es una provincia." },
    fecha: "2026-10-07",
    entrada: { cedula: 2512345678 },
    esperado: { resultado: "Cédula no válida", provincia: "Sin provincia" },
  },
]);
