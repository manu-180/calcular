import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { edadConAnios } from "../lib/jubilacion";

export default definirCalculadora({
  id: "uy.edad-de-jubilacion",
  mercado: "uy",
  concepto: "propio",
  slug: "edad-de-jubilacion",
  estado: "publicado",
  requiere: {
    "uy.jubilacion-edad-normal": "mapa",
    "uy.jubilacion-anios-minimos": "mapa",
    "uy.jubilacion-anios-minimos-bps": "mapa",
    "uy.jubilacion-anterior": "mapa",
  },
  campos: [
    { id: "nacimiento", tipo: "entero", etiqueta: "Año en que naciste", min: 1940, max: 2010, porDefecto: 1980 },
    {
      id: "anios",
      tipo: "entero",
      etiqueta: "Años de trabajo con aportes que vas a tener al jubilarte",
      ayuda: "Mirá tu historia laboral en el BPS y sumá los años que pensás seguir trabajando.",
      min: 0,
      max: 60,
      porDefecto: 30,
    },
    { id: "bps", tipo: "si-no", etiqueta: "Aportás al BPS", ayuda: "Las cajas paraestatales y de profesionales tienen otras reglas.", porDefecto: true },
  ],
  calcular(entrada, valores) {
    if (entrada.nacimiento < 1940) throw new ErrorEntrada("Escribí un año de nacimiento válido.", "nacimiento");
    const anterior = valores["uy.jubilacion-anterior"];
    const observaciones: string[] = [];
    if (entrada.nacimiento < 1973) {
      const edad = enMapa(anterior, "edad");
      const llega = entrada.anios >= enMapa(anterior, "servicios");
      if (!llega) observaciones.push("Con menos de 30 años de servicio, el régimen anterior tiene otras causales (por edad avanzada). Consultalo en el BPS.");
      return { edad: llega ? edad : null, anio: llega ? String(entrada.nacimiento + edad) : null, regimen: "Régimen anterior (Ley 16.713)", observaciones };
    }
    const edad = edadConAnios(
      { edadNormal: valores["uy.jubilacion-edad-normal"], aniosMinimos: valores["uy.jubilacion-anios-minimos"], aniosMinimosBps: valores["uy.jubilacion-anios-minimos-bps"] },
      entrada.nacimiento,
      entrada.anios,
      entrada.bps,
    );
    if (edad === null) observaciones.push("Con esos años de trabajo no llegás a una causal jubilatoria común. Desde los 70 años podría corresponder la pensión a la vejez.");
    const anio = edad === null ? null : entrada.nacimiento + edad;
    if (anio !== null && anio < 2033) observaciones.push("Si te jubilás antes de 2033, se te aplica entero el régimen anterior.");
    else if (anio !== null && anio < 2043) observaciones.push("Entre 2033 y 2042 rige la convergencia: una parte de tu jubilación se calcula con el régimen anterior y otra con el nuevo.");
    observaciones.push("Hay causales anticipadas por carrera muy larga o por tareas exigentes, con otras edades.");
    return { edad, anio: anio === null ? null : String(anio), regimen: "Sistema Previsional Común (Ley 20.130)", observaciones };
  },
  resultado: [
    { clave: "edad", etiqueta: "Edad a la que te podés jubilar", formato: "anios", destacada: true },
    { clave: "anio", etiqueta: "Año en que llegás a esa edad", formato: "texto" },
    { clave: "regimen", etiqueta: "Régimen que te corresponde", formato: "texto" },
  ],
});
