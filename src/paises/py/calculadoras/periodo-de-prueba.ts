import { definirCalculadora, enMapa } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "py.periodo-de-prueba",
  mercado: "py",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "py.periodo-prueba-dias": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso", porDefecto: "hoy" },
    { id: "tipo", tipo: "opcion-dato", dato: "py.periodo-prueba-dias", etiqueta: "Tipo de trabajo", porDefecto: "calificado" },
  ],
  calcular(entrada, valores, { fecha }) {
    const dias = enMapa(valores["py.periodo-prueba-dias"], entrada.tipo);
    // El día de ingreso es el primero del período: 30 días desde el 1/9 terminan el 30/9.
    const fin = sumarDias(entrada.ingreso, dias - 1);
    const enCurso = fecha >= entrada.ingreso && fecha <= fin;
    return {
      dias,
      fin,
      estado: fecha < entrada.ingreso ? "Todavía no empezó" : enCurso ? "En curso" : "Ya terminó",
      diasRestantes: enCurso ? diasEntre(fecha, fin) : null,
      observaciones: [
        "Es la duración máxima. El contrato puede fijar un período más corto, nunca más largo.",
        "Durante la prueba cualquiera puede terminar el contrato sin preaviso ni indemnización. El resto de los derechos (salario, IPS, aguinaldo) corren desde el primer día.",
        "Si al terminar la prueba nadie dice nada, el contrato sigue y ese tiempo cuenta para tu antigüedad.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Duración máxima", formato: "dias" },
    { clave: "fin", etiqueta: "Último día del período de prueba", formato: "fecha", destacada: true },
    { clave: "estado", etiqueta: "Hoy", formato: "texto" },
    { clave: "diasRestantes", etiqueta: "Días que faltan", formato: "dias" },
  ],
});
