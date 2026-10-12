import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.pension-ips",
  mercado: "py",
  concepto: "propio",
  slug: "pension-ips",
  estado: "publicado",
  requiere: {
    "py.pension-ips": "mapa",
    "py.salario-minimo": "numero",
  },
  campos: [
    { id: "semanas", tipo: "entero", etiqueta: "Semanas de aporte de quien falleció", ayuda: "Si estaba jubilado, poné las semanas con las que se jubiló.", min: 0, max: 3000 },
    { id: "accidente", tipo: "si-no", etiqueta: "Falleció por un accidente de trabajo o una enfermedad profesional", porDefecto: false },
    {
      id: "jubilacion",
      tipo: "moneda",
      etiqueta: "Jubilación que cobraba o que le hubiera correspondido",
      ayuda: "Si no la sabés, estimala con la calculadora de jubilación del IPS.",
      min: 0,
      requerido: false,
    },
    { id: "conyuge", tipo: "si-no", etiqueta: "Deja esposa, esposo o pareja con derecho a pensión", porDefecto: true },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos solteros menores de edad o con incapacidad", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const m = valores["py.pension-ips"];
    const v = (k: string) => enMapa(m, k);
    // Ley 98/92, art. 62 (Ley 2263/2003): deja pensión quien estaba jubilado o tenía las semanas mínimas,
    // o si murió por un riesgo del trabajo. Si no, el art. 65 da un subsidio único por año de antigüedad.
    if (entrada.semanas < v("semanas-minimas") && !entrada.accidente) {
      const anios = Math.floor(entrada.semanas / v("semanas-por-anio"));
      return {
        tipo: "Subsidio único por fallecimiento",
        pension: null,
        parteConyuge: null,
        partePorHijo: null,
        subsidio: anios * valores["py.salario-minimo"],
        observaciones: [
          `Con menos de ${v("semanas-minimas")} semanas de aporte no hay pensión. Los herederos cobran una vez un salario mínimo por cada año de aporte.`,
          "Si no hay herederos, el IPS reintegra los gastos del sepelio a quien los pagó, con un tope.",
        ],
      };
    }
    if (entrada.jubilacion === null) throw new ErrorEntrada("Poné la jubilación que cobraba o que le hubiera correspondido.", "jubilacion");
    const pension = redondear(porcentaje(entrada.jubilacion, v("porcentaje")));
    const conHijos = entrada.hijos > 0;
    let parteConyuge: number | null = null;
    let partePorHijo: number | null = null;
    if (entrada.conyuge && conHijos) {
      parteConyuge = redondear(pension / 2);
      partePorHijo = redondear(pension / 2 / entrada.hijos);
    } else if (entrada.conyuge) parteConyuge = pension;
    else if (conHijos) partePorHijo = redondear(pension / entrada.hijos);
    const observaciones: string[] = [];
    if (!entrada.conyuge && !conHijos) observaciones.push("Sin cónyuge ni hijos, la pensión es para los padres que vivían a su cargo, en partes iguales.");
    if (entrada.conyuge) {
      observaciones.push(`Si la viuda o el viudo tiene menos de ${v("edad-conyuge-joven")} años, la ley prevé una indemnización de ${v("anualidades-conyuge-joven")} años de pensión. El IPS define cuándo corresponde.`);
      observaciones.push("La pareja de hecho tiene derecho si convivió al menos dos años con hijos en común, o cinco sin hijos, y estaba inscripta en el IPS.");
    }
    if (conHijos) observaciones.push("Cuando un hijo cumple la mayoría de edad, su parte se reparte entre los demás.");
    return {
      tipo: "Pensión por fallecimiento",
      pension,
      parteConyuge,
      partePorHijo,
      subsidio: null,
      observaciones,
    };
  },
  resultado: [
    { clave: "tipo", etiqueta: "Qué corresponde", formato: "texto" },
    { clave: "pension", etiqueta: "Pensión mensual total", formato: "moneda", destacada: true },
    { clave: "parteConyuge", etiqueta: "Parte de la esposa, esposo o pareja", formato: "moneda" },
    { clave: "partePorHijo", etiqueta: "Parte de cada hijo", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio único para los herederos", formato: "moneda", destacada: true },
  ],
});
