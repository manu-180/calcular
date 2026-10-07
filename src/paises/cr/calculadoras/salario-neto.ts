import { aplicarEscalaMarginal, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.salario-neto",
  mercado: "cr",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "publicado",
  requiere: {
    "cr.ccss-sem-trabajador": "numero",
    "cr.ccss-ivm-trabajador": "numero",
    "cr.banco-popular-trabajador": "numero",
    "cr.impuesto-salario": "escala",
    "cr.credito-hijo": "numero",
    "cr.credito-conyuge": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", ayuda: "Lo que dice el contrato, antes de rebajos.", min: 0 },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos que declara para el crédito fiscal", min: 0, max: 20, porDefecto: 0 },
    { id: "conyuge", tipo: "si-no", etiqueta: "Declara el crédito por cónyuge", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario } = entrada;
    const sem = redondear(porcentaje(salario, valores["cr.ccss-sem-trabajador"]));
    const ivm = redondear(porcentaje(salario, valores["cr.ccss-ivm-trabajador"]));
    const bancoPopular = redondear(porcentaje(salario, valores["cr.banco-popular-trabajador"]));
    const cargas = redondear(sem + ivm + bancoPopular);
    const segunTramos = aplicarEscalaMarginal(valores["cr.impuesto-salario"], salario);
    const creditos = entrada.hijos * valores["cr.credito-hijo"] + (entrada.conyuge ? valores["cr.credito-conyuge"] : 0);
    const renta = Math.max(0, redondear(segunTramos - creditos));
    return {
      sem,
      ivm,
      bancoPopular,
      cargas,
      renta,
      neto: redondear(salario - cargas - renta),
      observaciones: ["La renta se calcula sobre el salario bruto: las cuotas de la Caja no se restan antes."],
    };
  },
  resultado: [
    { clave: "sem", etiqueta: "Seguro de Salud (CCSS)", formato: "moneda" },
    { clave: "ivm", etiqueta: "Pensión IVM (CCSS)", formato: "moneda" },
    { clave: "bancoPopular", etiqueta: "Aporte al Banco Popular", formato: "moneda" },
    { clave: "cargas", etiqueta: "Total de cargas sociales", formato: "moneda" },
    { clave: "renta", etiqueta: "Impuesto al salario", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto a recibir", formato: "moneda", destacada: true },
  ],
});
