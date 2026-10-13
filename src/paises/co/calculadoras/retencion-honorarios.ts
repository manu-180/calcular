import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { filaDe, retencionMensual } from "../reglas";

export default definirCalculadora({
  id: "co.retencion-honorarios",
  mercado: "co",
  concepto: "retencion-honorarios",
  slug: "retencion-honorarios",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.ibc-independientes": "numero",
    "co.salud-cotizacion": "numero",
    "co.pension-cotizacion": "numero",
    "co.fsp": "escala",
    "co.tope-ibc": "numero",
    "co.uvt": "numero",
    "co.retencion-tabla": "escala",
    "co.renta-exenta-trabajo": "numero",
    "co.renta-exenta-trabajo-tope": "numero",
    "co.limite-beneficios": "numero",
    "co.limite-beneficios-tope": "numero",
    "co.deduccion-dependientes": "numero",
    "co.deduccion-dependientes-tope": "numero",
    "co.deduccion-salud-tope": "numero",
    "co.retencion-honorarios": "mapa",
    "co.honorarios-umbral": "numero",
  },
  campos: [
    { id: "honorarios", tipo: "moneda", etiqueta: "Honorarios del mes", ayuda: "Valor mensual del contrato, sin IVA.", min: 0 },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Quién cobra los honorarios",
      opciones: [
        { valor: "natural", etiqueta: "Persona natural (sin dos o más trabajadores contratados)" },
        { valor: "natural-empleador", etiqueta: "Persona natural con dos o más trabajadores contratados" },
        { valor: "juridica", etiqueta: "Empresa o persona jurídica" },
      ],
      porDefecto: "natural",
    },
    {
      id: "superaUmbral",
      tipo: "si-no",
      etiqueta: "Tus contratos con este cliente pasan de 3.300 UVT al año",
      ayuda: "Solo cambia el cálculo si tienes dos o más trabajadores.",
      porDefecto: false,
    },
    { id: "dependiente", tipo: "si-no", etiqueta: "Tienes personas a cargo (dependientes)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.honorarios <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "honorarios");
    const smmlv = valores["co.smmlv"];
    const ibc = Math.min(Math.max(porcentaje(entrada.honorarios, valores["co.ibc-independientes"]), smmlv), valores["co.tope-ibc"] * smmlv);
    const tasaFsp = filaDe(valores["co.fsp"], ibc / smmlv).tasa;
    const aportes = redondear(porcentaje(ibc, valores["co.salud-cotizacion"]) + porcentaje(ibc, valores["co.pension-cotizacion"]) + porcentaje(ibc, tasaFsp));
    const tarifas = valores["co.retencion-honorarios"];
    let retencion: number;
    let metodo: string;
    let tarifa: number | null = null;
    let base: number;
    if (entrada.quien === "natural") {
      // ET art. 383 par. 2 (Ley 2277): las rentas de trabajo sin relación laboral usan la tabla de salarios.
      const ret = retencionMensual(
        entrada.honorarios,
        aportes,
        entrada.dependiente,
        0,
        {
          uvt: valores["co.uvt"],
          tabla: valores["co.retencion-tabla"],
          rentaExenta: valores["co.renta-exenta-trabajo"],
          rentaExentaTopeAnual: valores["co.renta-exenta-trabajo-tope"],
          limiteBeneficios: valores["co.limite-beneficios"],
          limiteBeneficiosTopeAnual: valores["co.limite-beneficios-tope"],
          dependientes: valores["co.deduccion-dependientes"],
          dependientesTope: valores["co.deduccion-dependientes-tope"],
          saludTope: valores["co.deduccion-salud-tope"],
        },
        redondear,
      );
      retencion = ret.retencion;
      base = ret.base;
      metodo = "Tabla del artículo 383 (como un salario)";
    } else {
      const clave = entrada.quien === "juridica" ? "juridica" : entrada.superaUmbral ? "natural-mayor" : "natural";
      tarifa = enMapa(tarifas, clave);
      base = entrada.honorarios;
      retencion = redondear(porcentaje(entrada.honorarios, tarifa));
      metodo = `Tarifa fija del ${tarifa} %`;
    }
    return {
      metodo,
      aportes: entrada.quien === "natural" ? aportes : 0,
      base: redondear(base),
      tarifa,
      retencion,
      neto: redondear(entrada.honorarios - retencion),
    };
  },
  resultado: [
    { clave: "metodo", etiqueta: "Cómo se calcula", formato: "texto" },
    { clave: "aportes", etiqueta: "Aportes a salud y pensión que se restan", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "base", etiqueta: "Base de retención", formato: "moneda", decimales: 0 },
    { clave: "tarifa", etiqueta: "Tarifa", formato: "porcentaje" },
    { clave: "retencion", etiqueta: "Retención en la fuente", formato: "moneda", decimales: 0, destacada: true },
    { clave: "neto", etiqueta: "Lo que recibes después de la retención", formato: "moneda", decimales: 0 },
  ],
});
