import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const BIMESTRES = 6;

export default definirCalculadora({
  id: "bo.regimen-simplificado",
  mercado: "bo",
  concepto: "regimen-simplificado",
  slug: "regimen-simplificado",
  estado: "publicado",
  requiere: {
    "bo.rts-cuota": "escala",
  },
  campos: [
    {
      id: "capital",
      tipo: "moneda",
      etiqueta: "Capital del negocio",
      ayuda: "El capital que declaró (o va a declarar) en el padrón del SIN: mercadería, herramientas y equipos del negocio.",
      min: 0,
    },
  ],
  calcular(entrada, valores) {
    const categorias = valores["bo.rts-cuota"];
    const ultima = categorias[categorias.length - 1];
    if (ultima.hasta !== null && entrada.capital > ultima.hasta) {
      throw new ErrorEntrada("Con un capital de más de Bs 60.000 no puede estar en el Régimen Tributario Simplificado: corresponde el régimen general.", "capital");
    }
    const indice = categorias.findIndex((f) => entrada.capital >= f.desde && (f.hasta === null || entrada.capital <= f.hasta));
    if (indice < 0) {
      return {
        categoria: null,
        bimestral: null,
        anual: null,
        observaciones: ["La tabla del SIN empieza en Bs 12.001 de capital. Con menos capital, consulte su situación en el SIN."],
      };
    }
    const bimestral = categorias[indice].cuotaFija ?? 0;
    return { categoria: indice + 1, bimestral, anual: bimestral * BIMESTRES, observaciones: [] as string[] };
  },
  resultado: [
    { clave: "categoria", etiqueta: "Categoría", formato: "numero", decimales: 0 },
    { clave: "bimestral", etiqueta: "Cuota cada dos meses", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Total en el año (6 cuotas)", formato: "moneda" },
  ],
});
