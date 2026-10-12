import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "hn.periodo-de-prueba",
  mercado: "hn",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "hn.periodo-prueba-dias": "mapa",
  },
  campos: [
    { id: "fechaInicio", tipo: "fecha", etiqueta: "Primer día de trabajo", porDefecto: "hoy" },
    { id: "tipo", tipo: "opcion-dato", dato: "hn.periodo-prueba-dias", etiqueta: "Tipo de trabajo", porDefecto: "general" },
    {
      id: "diasPactados",
      tipo: "entero",
      etiqueta: "Días de prueba que dice su contrato",
      min: 1,
      requerido: false,
      ayuda: "Déjelo vacío para usar el máximo de la ley.",
    },
  ],
  calcular(entrada, valores) {
    const maximo = enMapa(valores["hn.periodo-prueba-dias"], entrada.tipo);
    const dias = entrada.diasPactados ?? maximo;
    if (dias > maximo) throw new ErrorEntrada(`El período de prueba no puede pasar de ${maximo} días.`, "diasPactados");
    const observaciones = [
      "Durante la prueba cualquiera de las dos partes puede terminar el contrato sin preaviso ni indemnización.",
      "La prueba se paga y le corresponden las demás prestaciones, como décimos y vacaciones proporcionales.",
      "Si al terminar nadie dice nada, el contrato sigue por tiempo indefinido.",
    ];
    if (entrada.tipo === "general") observaciones.push("Debe estar escrita en el contrato. Si no lo está, no hay período de prueba.");
    return { maximo, dias, fechaFin: sumarDias(entrada.fechaInicio, dias - 1), observaciones };
  },
  resultado: [
    { clave: "maximo", etiqueta: "Máximo que permite la ley", formato: "dias" },
    { clave: "dias", etiqueta: "Días de prueba", formato: "dias" },
    { clave: "fechaFin", etiqueta: "Último día del período de prueba", formato: "fecha", destacada: true },
  ],
});
