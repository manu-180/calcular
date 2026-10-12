import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { diasEntre, sumarDias, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "co.periodo-de-prueba",
  mercado: "co",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "co.periodo-prueba-maximo": "numero",
    "co.periodo-prueba-fraccion": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "indefinido", etiqueta: "A término indefinido" },
        { valor: "fijo", etiqueta: "A término fijo" },
        { valor: "obra", etiqueta: "Por obra o labor" },
      ],
      porDefecto: "indefinido",
    },
    { id: "meses", tipo: "entero", etiqueta: "Duración pactada del contrato fijo, en meses", ayuda: "Solo para contratos a término fijo.", min: 1, max: 48, porDefecto: 12 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha de inicio del contrato", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    const maxMeses = valores["co.periodo-prueba-maximo"];
    const finMaximo = sumarDias(sumarMeses(entrada.inicio, maxMeses), -1);
    const diasMaximo = diasEntre(entrada.inicio, finMaximo) + 1;
    let dias = diasMaximo;
    let fin = finMaximo;
    // CST art. 78: en contratos fijos de menos de un año, la quinta parte del término (meses de 30 días).
    if (entrada.contrato === "fijo" && entrada.meses < 12) {
      const proporcional = Math.floor(porcentaje(entrada.meses * 30, valores["co.periodo-prueba-fraccion"]));
      if (proporcional < diasMaximo) {
        dias = proporcional;
        fin = sumarDias(entrada.inicio, proporcional - 1);
      }
    }
    return {
      dias,
      fin,
      regla: dias < diasMaximo ? "La quinta parte del término pactado" : `El máximo legal de ${maxMeses} meses`,
    };
  },
  resultado: [
    { clave: "regla", etiqueta: "Regla que aplica", formato: "texto" },
    { clave: "dias", etiqueta: "Duración máxima del periodo de prueba", formato: "dias" },
    { clave: "fin", etiqueta: "Último día del periodo de prueba", formato: "fecha", destacada: true },
  ],
});
