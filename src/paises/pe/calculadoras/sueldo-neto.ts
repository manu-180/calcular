import { aplicarEscalaMarginal, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

// En borrador hasta poder leer en la SBS el aporte, la prima, las comisiones y la RMA vigentes.
export default definirCalculadora({
  id: "pe.sueldo-neto",
  mercado: "pe",
  concepto: "sueldo-neto",
  slug: "sueldo-neto",
  estado: "borrador",
  requiere: {
    "pe.uit": "numero",
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.escala-renta-trabajo": "escala",
    "pe.deduccion-renta-trabajo": "numero",
    "pe.aporte-onp": "numero",
    "pe.aporte-afp": "numero",
    "pe.prima-seguro-afp": "numero",
    "pe.comision-afp": "mapa",
    "pe.rma-afp": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual bruto", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "sistema",
      tipo: "opcion",
      etiqueta: "Sistema de pensiones",
      opciones: [
        { valor: "afp", etiqueta: "AFP (sistema privado)" },
        { valor: "onp", etiqueta: "ONP (sistema nacional)" },
      ],
      porDefecto: "afp",
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "Tu AFP", dato: "pe.comision-afp", porDefecto: "habitat" },
    { id: "gratificaciones", tipo: "si-no", etiqueta: "Recibes gratificaciones en julio y diciembre", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const uit = valores["pe.uit"];
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const bruto = redondear(entrada.sueldo + asignacion);
    let pension: number;
    if (entrada.sistema === "onp") pension = redondear(porcentaje(bruto, valores["pe.aporte-onp"]));
    else {
      const aporte = porcentaje(bruto, valores["pe.aporte-afp"]);
      const prima = porcentaje(Math.min(bruto, valores["pe.rma-afp"]), valores["pe.prima-seguro-afp"]);
      const comision = porcentaje(bruto, enMapa(valores["pe.comision-afp"], entrada.afp));
      pension = redondear(aporte + prima + comision);
    }
    const gratificaciones = entrada.gratificaciones ? bruto * 2 : 0;
    const bonificacion = porcentaje(gratificaciones, enMapa(valores["pe.bonificacion-extraordinaria"], "essalud"));
    const anual = bruto * 12 + gratificaciones + bonificacion;
    const neta = Math.max(0, anual - valores["pe.deduccion-renta-trabajo"] * uit);
    const escala = valores["pe.escala-renta-trabajo"].map((f) => ({ ...f, desde: f.desde * uit, hasta: f.hasta === null ? null : f.hasta * uit }));
    const quinta = redondear(aplicarEscalaMarginal(escala, neta) / 12);
    return { bruto, pension, quinta, neto: redondear(bruto - pension - quinta) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Sueldo bruto", formato: "moneda" },
    { clave: "pension", etiqueta: "Descuento de pensión", formato: "moneda" },
    { clave: "quinta", etiqueta: "Retención de quinta categoría", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Sueldo neto", formato: "moneda", destacada: true },
  ],
});
