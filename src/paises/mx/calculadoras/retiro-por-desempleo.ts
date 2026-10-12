import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

// Borrador: el tope de la modalidad A (diez salarios mínimos mensuales del DF, LSS art. 191) no tiene
// fuente oficial que diga si tras la desindexación se toma el salario mínimo o la UMA.
export default definirCalculadora({
  id: "mx.retiro-por-desempleo",
  mercado: "mx",
  concepto: "propio",
  slug: "retiro-por-desempleo",
  estado: "borrador",
  requiere: {
    "mx.retiro-desempleo": "mapa",
    "mx.tope-retiro-desempleo": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Antigüedad de tu cuenta Afore",
      opciones: [
        { valor: "a", etiqueta: "3 años o más, con 12 bimestres cotizados" },
        { valor: "b", etiqueta: "5 años o más" },
      ],
      porDefecto: "a",
    },
    { id: "sbc", tipo: "moneda", etiqueta: "Último salario base de cotización diario", min: 0 },
    { id: "promedio", tipo: "moneda", etiqueta: "Promedio de tu SBC de las últimas 250 semanas", min: 0, requerido: false },
    { id: "saldo", tipo: "moneda", etiqueta: "Saldo de tu subcuenta de retiro, cesantía y vejez", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const m = valores["mx.retiro-desempleo"];
    const opcionA = Math.min(redondear(entrada.sbc * enMapa(m, "dias-a")), valores["mx.tope-retiro-desempleo"]);
    const opcionB =
      entrada.modalidad === "b"
        ? Math.min(redondear((entrada.promedio ?? entrada.sbc) * enMapa(m, "dias-b")), redondear(porcentaje(entrada.saldo ?? 0, enMapa(m, "porcentaje-b"))))
        : null;
    return { opcionA, opcionB };
  },
  resultado: [
    { clave: "opcionA", etiqueta: "Retiro en una sola exhibición", formato: "moneda", destacada: true },
    { clave: "opcionB", etiqueta: "Retiro en hasta seis pagos", formato: "moneda" },
  ],
});
