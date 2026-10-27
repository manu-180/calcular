import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.pension-calculator",
  mercado: "qa",
  concepto: "jubilacion",
  slug: "pension-calculator",
  estado: "publicado",
  requiere: {
    "qa.pension-ages": "mapa",
    "qa.pension-reduction": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Pension salary per month", ayuda: "In the private sector, the average contribution salary of your last three years. In government, your last contribution salary.", min: 0, porDefecto: 30000 },
    { id: "anios", tipo: "numero", etiqueta: "Years of contributions", min: 0, max: 50, porDefecto: 27 },
    { id: "edad", tipo: "entero", etiqueta: "Age when your service ends", min: 18, max: 80, porDefecto: 52 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why your service ends",
      opciones: [
        { valor: "edad", etiqueta: "Retirement age" },
        { valor: "renuncia", etiqueta: "Resignation" },
      ],
      porDefecto: "renuncia",
    },
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: "Sex",
      opciones: [
        { valor: "hombre", etiqueta: "Man" },
        { valor: "mujer", etiqueta: "Woman" },
      ],
      porDefecto: "hombre",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your pension salary.", "salario");
    const e = v["qa.pension-ages"];
    const observaciones: string[] = [];
    const sinPension = (motivo: string) => {
      observaciones.push(motivo, "Without a pension you can ask for a lump-sum compensation if you contributed for more than a year.");
      return { pension: 0, bruta: 0, reduccion: 0, desde: 0, observaciones };
    };
    if (entrada.anios < enMapa(e, "min-years")) return sinPension("A pension needs at least 25 years of contributions, including 20 years of actual service.");
    if (entrada.motivo === "edad" && entrada.edad < enMapa(e, "retirement-age")) return sinPension("Retirement age can't be under 60. Choose resignation if you leave earlier.");
    const bruta = Math.min(entrada.salario, (entrada.salario * entrada.anios) / enMapa(e, "full-years"));
    let reduccion = 0;
    let desde = entrada.edad;
    if (entrada.motivo === "renuncia") {
      const referencia = enMapa(e, entrada.sexo === "mujer" ? "reference-women" : "reference-men");
      reduccion = Math.max(0, referencia - entrada.edad) * v["qa.pension-reduction"];
      desde = Math.max(entrada.edad, enMapa(e, "min-age-resignation"));
      if (entrada.edad < enMapa(e, "min-age-resignation")) observaciones.push("After resigning under 50, the pension is paid from age 50.");
    }
    observaciones.push("This assumes all your contribution years are actual service. GRSIA works out the official amount.");
    return { pension: redondear(bruta - porcentaje(bruta, reduccion)), bruta: redondear(bruta), reduccion, desde, observaciones };
  },
  resultado: [
    { clave: "pension", etiqueta: "Monthly pension", formato: "moneda", destacada: true },
    { clave: "bruta", etiqueta: "Pension before any reduction", formato: "moneda" },
    { clave: "reduccion", etiqueta: "Reduction for leaving early", formato: "porcentaje", ocultarSiCero: true },
    { clave: "desde", etiqueta: "Age the pension starts", formato: "anios", ocultarSiCero: true },
  ],
});
