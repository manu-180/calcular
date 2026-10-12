import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ni.periodo-de-prueba",
  mercado: "ni",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "ni.periodo-prueba-dias": "numero",
    "ni.periodo-prueba-domestico-dias": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Primer día de trabajo", porDefecto: "hoy" },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de trabajo",
      opciones: [
        { valor: "general", etiqueta: "Contrato por tiempo indeterminado" },
        { valor: "domestico", etiqueta: "Trabajo doméstico" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores) {
    const domestico = entrada.tipo === "domestico";
    const dias = domestico ? valores["ni.periodo-prueba-domestico-dias"] : valores["ni.periodo-prueba-dias"];
    const observaciones = domestico
      ? ["En el trabajo doméstico los primeros días son de prueba por ley: no hace falta pactarlos."]
      : [
          "Solo vale si lo pactaron. El período de prueba puede ser más corto, nunca más largo.",
          "En un contrato por tiempo determinado no hay período de prueba.",
        ];
    observaciones.push("Si el contrato termina en la prueba, no hay indemnización, pero te pagan los días trabajados y las prestaciones proporcionales que te correspondan.");
    return { dias, fin: sumarDias(entrada.inicio, dias - 1), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Duración máxima de la prueba", formato: "dias" },
    { clave: "fin", etiqueta: "Último día de prueba", formato: "fecha", destacada: true },
  ],
});
