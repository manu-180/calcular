import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { antiguedad, textoAntiguedad } from "../lib/fechas";
import { clavePreaviso } from "../lib/terminacion";

export default definirCalculadora({
  id: "do.preaviso",
  mercado: "do",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "do.preaviso-dias": "mapa",
    "do.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó el trabajo" },
    { id: "aviso", tipo: "fecha", etiqueta: "Fecha del aviso", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual del último año", ayuda: "Sin horas extra ni regalía.", min: 0 },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Quién termina el contrato",
      opciones: [
        { valor: "empleador", etiqueta: "El empleador (desahucio)" },
        { valor: "trabajador", etiqueta: "El trabajador (renuncia)" },
      ],
      porDefecto: "empleador",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.aviso < entrada.inicio) throw new ErrorEntrada("La fecha del aviso tiene que ser posterior a la fecha de inicio.", "aviso");
    const a = antiguedad(entrada.inicio, entrada.aviso);
    const clave = clavePreaviso(a);
    const dias = clave ? enMapa(valores["do.preaviso-dias"], clave) : 0;
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const observaciones: string[] = [];
    if (dias === 0) observaciones.push("Con menos de 3 meses de trabajo no hace falta dar preaviso.");
    else if (entrada.quien === "empleador") {
      observaciones.push("Si el empleador no da el aviso o lo da con menos días, debe pagar esos días en dinero (art. 79).");
      observaciones.push("Mientras corre el preaviso tienes derecho a dos medias jornadas libres por semana, sin descuento, para buscar trabajo.");
    } else observaciones.push("Si renuncias sin dar el preaviso, el empleador puede reclamarte el pago de esos días (art. 79).");
    return {
      antiguedad: textoAntiguedad(a),
      dias,
      ultimoDia: dias > 0 ? sumarDias(entrada.aviso, dias) : null,
      diario,
      monto: redondear(diario * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado al dar el aviso", formato: "texto" },
    { clave: "dias", etiqueta: "Días de preaviso", formato: "dias", destacada: true },
    { clave: "ultimoDia", etiqueta: "El contrato termina el", formato: "fecha" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "monto", etiqueta: "Pago si se omite el preaviso", formato: "moneda" },
  ],
});
