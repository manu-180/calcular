import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarMeses, tiempoEntre } from "../lib/fechas";

const MESES_DEL_ANIO = 12;

export default definirCalculadora({
  id: "bo.jubilacion",
  mercado: "bo",
  concepto: "jubilacion",
  slug: "jubilacion",
  estado: "publicado",
  requiere: {
    "bo.jubilacion-edad": "numero",
    "bo.jubilacion-hijos-maximo": "numero",
    "bo.jubilacion-aportes-minimos": "numero",
    "bo.renta-dignidad-edad": "numero",
  },
  campos: [
    { id: "nacimiento", tipo: "fecha", etiqueta: "Fecha de nacimiento" },
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: "Usted es",
      opciones: [
        { valor: "mujer", etiqueta: "Mujer" },
        { valor: "hombre", etiqueta: "Hombre" },
      ],
      porDefecto: "mujer",
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijas e hijos nacidos vivos", ayuda: "Solo cuenta para las mujeres.", min: 0, max: 20, porDefecto: 0 },
    { id: "aportes", tipo: "entero", etiqueta: "Meses que aportó a la Gestora (o a las AFP)", min: 0, max: 720 },
  ],
  calcular(entrada, valores, { fecha }) {
    if (entrada.nacimiento >= fecha) throw new ErrorEntrada("La fecha de nacimiento tiene que ser anterior a hoy.", "nacimiento");
    const edadBase = valores["bo.jubilacion-edad"];
    const hijosComputables = entrada.sexo === "mujer" ? Math.min(entrada.hijos, valores["bo.jubilacion-hijos-maximo"]) : 0;
    const edadHoy = tiempoEntre(entrada.nacimiento, fecha).anios;
    // Ley 065: la madre baja un año de edad por hijo; si ya tiene la edad general, en cambio suma
    // 12 aportes por hijo. No se usan las dos cosas a la vez.
    const usaAportesPorHijos = hijosComputables > 0 && edadHoy >= edadBase;
    const edadRequerida = usaAportesPorHijos ? edadBase : edadBase - hijosComputables;
    const aportesPorHijos = usaAportesPorHijos ? hijosComputables * MESES_DEL_ANIO : 0;
    const fechaEdad = sumarMeses(entrada.nacimiento, edadRequerida * MESES_DEL_ANIO);
    const minimos = valores["bo.jubilacion-aportes-minimos"];
    const aportesFaltantes = Math.max(0, minimos - entrada.aportes - aportesPorHijos);
    const cumpleEdad = fecha >= fechaEdad;
    const observaciones: string[] = [];
    if (cumpleEdad && aportesFaltantes === 0) observaciones.push("Cumple la edad y los aportes para pedir la Pensión Solidaria de Vejez en la Gestora.");
    else if (cumpleEdad) observaciones.push("Ya tiene la edad, pero le faltan aportes para la Pensión Solidaria de Vejez.");
    else observaciones.push("Todavía no tiene la edad de jubilación.");
    observaciones.push("Si su saldo en la Gestora alcanza para una pensión de al menos el 60 % de su promedio salarial, puede jubilarse a cualquier edad.");
    observaciones.push("El monto de la pensión depende de su saldo acumulado; lo calcula la Gestora.");
    return {
      edadHoy,
      edadRequerida,
      fechaEdad,
      aportesPorHijos,
      aportesFaltantes,
      fechaRentaDignidad: sumarMeses(entrada.nacimiento, valores["bo.renta-dignidad-edad"] * MESES_DEL_ANIO),
      observaciones,
    };
  },
  resultado: [
    { clave: "edadHoy", etiqueta: "Su edad hoy", formato: "anios" },
    { clave: "edadRequerida", etiqueta: "Edad de jubilación para usted", formato: "anios", destacada: true },
    { clave: "fechaEdad", etiqueta: "Cumple esa edad el", formato: "fecha" },
    { clave: "aportesPorHijos", etiqueta: "Aportes que suma por sus hijos", formato: "meses", decimales: 0, ocultarSiCero: true },
    { clave: "aportesFaltantes", etiqueta: "Aportes que le faltan para la Pensión Solidaria", formato: "meses", decimales: 0 },
    { clave: "fechaRentaDignidad", etiqueta: "Puede cobrar la Renta Dignidad desde", formato: "fecha" },
  ],
});
