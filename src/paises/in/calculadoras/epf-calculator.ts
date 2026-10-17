import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.epf-calculator",
  mercado: "in",
  concepto: "jubilacion",
  slug: "epf-calculator",
  estado: "publicado",
  requiere: {
    "in.epf-rate": "numero",
    "in.eps-share": "numero",
    "in.epf-wage-ceiling": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary plus DA a month", min: 0, porDefecto: 40000 },
    { id: "edad", tipo: "entero", etiqueta: "Your age today", min: 15, max: 70, porDefecto: 30 },
    { id: "retiro", tipo: "entero", etiqueta: "Age you expect to retire", min: 16, max: 75, porDefecto: 58 },
    { id: "saldo", tipo: "moneda", etiqueta: "Current EPF balance", min: 0, porDefecto: 0 },
    { id: "aumento", tipo: "porcentaje", etiqueta: "Yearly salary increase", min: 0, max: 30, porDefecto: 5 },
    { id: "interes", tipo: "porcentaje", etiqueta: "EPF interest rate a year", min: 0, max: 15, porDefecto: 8.25, ayuda: "EPFO declares the rate every year. Change it to test other rates." },
    {
      id: "pf",
      tipo: "opcion",
      etiqueta: "PF is worked out on",
      opciones: [
        { valor: "ceiling", etiqueta: "Basic up to the wage ceiling" },
        { valor: "full", etiqueta: "The full basic" },
      ],
      porDefecto: "full",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.retiro <= entrada.edad) throw new ErrorEntrada("Retirement age must be above your age today.", "retiro");
    const tope = v["in.epf-wage-ceiling"];
    const tasaMes = entrada.interes / 100 / 12;
    let saldo = entrada.saldo;
    let basico = entrada.basico;
    let tuyo = 0;
    let empleador = 0;
    let interes = 0;
    let primerMes = { tuyo: 0, empleador: 0, eps: 0 };
    for (let anio = 0; anio < entrada.retiro - entrada.edad; anio++) {
      const salarioPf = entrada.pf === "ceiling" ? Math.min(basico, tope) : basico;
      const aporte = porcentaje(salarioPf, v["in.epf-rate"]);
      const eps = porcentaje(Math.min(salarioPf, tope), v["in.eps-share"]);
      const delEmpleador = aporte - eps;
      if (anio === 0) primerMes = { tuyo: aporte, empleador: delEmpleador, eps };
      // EPFO calcula el interés sobre el saldo de cada mes y lo acredita una vez al año.
      let interesAnio = 0;
      for (let mes = 0; mes < 12; mes++) {
        saldo += aporte + delEmpleador;
        interesAnio += saldo * tasaMes;
      }
      saldo += interesAnio;
      tuyo += aporte * 12;
      empleador += delEmpleador * 12;
      interes += interesAnio;
      basico = basico * (1 + entrada.aumento / 100);
    }
    return {
      saldo: redondear(saldo),
      tuyo: redondear(tuyo),
      empleador: redondear(empleador),
      interes: redondear(interes),
      aporteMes: redondear(primerMes.tuyo + primerMes.empleador),
      tuyoMes: redondear(primerMes.tuyo),
      empleadorMes: redondear(primerMes.empleador),
      epsMes: redondear(primerMes.eps),
      anios: entrada.retiro - entrada.edad,
    };
  },
  resultado: [
    { clave: "saldo", etiqueta: "EPF balance at retirement", formato: "moneda", destacada: true },
    { clave: "tuyo", etiqueta: "Your contributions", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer contributions to EPF", formato: "moneda" },
    { clave: "interes", etiqueta: "Interest earned", formato: "moneda" },
    { clave: "tuyoMes", etiqueta: "Your PF this month", formato: "moneda" },
    { clave: "empleadorMes", etiqueta: "Employer EPF this month", formato: "moneda" },
    { clave: "epsMes", etiqueta: "Employer EPS (pension) this month", formato: "moneda" },
    { clave: "anios", etiqueta: "Years of saving", formato: "anios" },
  ],
});
