import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const PROVINCIAS: Readonly<Record<number, string>> = {
  1: "Azuay",
  2: "Bolívar",
  3: "Cañar",
  4: "Carchi",
  5: "Cotopaxi",
  6: "Chimborazo",
  7: "El Oro",
  8: "Esmeraldas",
  9: "Guayas",
  10: "Imbabura",
  11: "Loja",
  12: "Los Ríos",
  13: "Manabí",
  14: "Morona Santiago",
  15: "Napo",
  16: "Pastaza",
  17: "Pichincha",
  18: "Tungurahua",
  19: "Zamora Chinchipe",
  20: "Galápagos",
  21: "Sucumbíos",
  22: "Orellana",
  23: "Santo Domingo de los Tsáchilas",
  24: "Santa Elena",
  30: "Ecuatorianos registrados en el exterior",
};

// Dígito verificador de la cédula (módulo 10): los nueve primeros dígitos se multiplican por 2 y 1
// alternados; los productos mayores a 9 restan 9. El campo es numérico y pierde el cero inicial de
// las provincias 01 a 09, por eso se completa a diez dígitos.
export default definirCalculadora({
  id: "ec.validar-cedula",
  mercado: "ec",
  concepto: "propio",
  slug: "validar-cedula",
  estado: "publicado",
  requiere: {},
  campos: [{ id: "cedula", tipo: "entero", etiqueta: "Número de cédula (10 dígitos, sin guion)", min: 0 }],
  calcular(entrada) {
    const texto = String(Math.trunc(entrada.cedula)).padStart(10, "0");
    if (texto.length !== 10) throw new ErrorEntrada("La cédula tiene 10 dígitos.", "cedula");
    const d = texto.split("").map(Number);
    const codigo = d[0] * 10 + d[1];
    const provincia = PROVINCIAS[codigo] ?? null;
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      const p = d[i] * (i % 2 === 0 ? 2 : 1);
      suma += p > 9 ? p - 9 : p;
    }
    const verificador = (10 - (suma % 10)) % 10;
    const valida = provincia !== null && d[2] < 6 && verificador === d[9];
    const observaciones: string[] = [];
    if (provincia === null) observaciones.push("Los dos primeros dígitos no corresponden a ninguna provincia.");
    else if (d[2] >= 6) observaciones.push("El tercer dígito de una cédula de persona va de 0 a 5. Si es 6 o 9, puede ser un RUC de entidad pública o de sociedad.");
    else if (verificador !== d[9]) observaciones.push(`El último dígito debería ser ${verificador}.`);
    observaciones.push("Esto solo comprueba que el número está bien formado. No confirma que la cédula exista ni a quién pertenece.");
    return {
      numero: texto,
      resultado: valida ? "Cédula válida" : "Cédula no válida",
      provincia: provincia ?? "Sin provincia",
      observaciones,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Resultado", formato: "texto", destacada: true },
    { clave: "numero", etiqueta: "Número revisado", formato: "texto" },
    { clave: "provincia", etiqueta: "Provincia de inscripción", formato: "texto" },
  ],
});
