import { definirCalculadora } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ec.periodo-de-prueba",
  mercado: "ec",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "ec.periodo-prueba-dias": "numero",
    "ec.periodo-prueba-domestico-dias": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Primer día de trabajo", porDefecto: "hoy" },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de trabajo",
      opciones: [
        { valor: "general", etiqueta: "Contrato indefinido en general" },
        { valor: "hogar", etiqueta: "Trabajo remunerado del hogar" },
      ],
      porDefecto: "general",
    },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días de prueba que dice tu contrato",
      ayuda: "Si tu contrato no dice otra cosa, deja el máximo de la ley.",
      min: 1,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { fecha }) {
    const maximo = entrada.tipo === "hogar" ? valores["ec.periodo-prueba-domestico-dias"] : valores["ec.periodo-prueba-dias"];
    const pactados = entrada.dias === null ? maximo : Math.min(entrada.dias, maximo);
    const fin = sumarDias(entrada.inicio, pactados - 1);
    const restantes = fecha > fin ? 0 : Math.min(pactados, diasEntre(fecha < entrada.inicio ? entrada.inicio : fecha, fin) + 1);
    const observaciones: string[] = [];
    if (entrada.dias !== null && entrada.dias > maximo) observaciones.push(`La ley permite hasta ${maximo} días de prueba. Lo que pase de eso no cuenta como prueba.`);
    observaciones.push("Solo puede haber un período de prueba con el mismo empleador, y solo en el primer contrato.");
    return { maximo, pactados, fin, restantes, observaciones };
  },
  resultado: [
    { clave: "maximo", etiqueta: "Máximo que permite la ley", formato: "dias" },
    { clave: "pactados", etiqueta: "Días de prueba", formato: "dias" },
    { clave: "fin", etiqueta: "Último día del período de prueba", formato: "fecha", destacada: true },
    { clave: "restantes", etiqueta: "Días que faltan desde hoy", formato: "dias" },
  ],
});
