import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.retirement-pay",
  mercado: "ph",
  concepto: "propio",
  slug: "retirement-pay",
  estado: "publicado",
  requiere: {
    "ph.retirement-days": "numero",
    "ph.retirement-sil-days": "numero",
    "ph.retirement-minimum-age": "numero",
    "ph.retirement-compulsory-age": "numero",
    "ph.retirement-minimum-service": "numero",
    "ph.retirement-exempt-employees": "numero",
  },
  campos: [
    { id: "diario", tipo: "moneda", etiqueta: "Your latest daily rate", min: 0, porDefecto: 1000 },
    { id: "trece", tipo: "moneda", etiqueta: "Your 13th month pay", min: 0, porDefecto: 26000, ayuda: "The 13th month pay you get for a full year." },
    { id: "anios", tipo: "entero", etiqueta: "Full years of service", min: 0, max: 60, porDefecto: 20 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
    { id: "edad", tipo: "entero", etiqueta: "Your age when you retire", min: 15, max: 100, porDefecto: 60 },
    { id: "pequena", tipo: "si-no", etiqueta: "Retail, service or farm business with 10 workers or fewer", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.diario <= 0) throw new ErrorEntrada("Enter your daily rate.", "diario");
    if (entrada.meses > 11) throw new ErrorEntrada("Enter 11 months at most; full years go in the field above.", "meses");
    const anios = entrada.anios + (entrada.meses >= 6 ? 1 : 0);
    const mediaMes = redondear(v["ph.retirement-days"] * entrada.diario + entrada.trece / 12 + v["ph.retirement-sil-days"] * entrada.diario);
    const total = redondear(mediaMes * anios);
    const observaciones: string[] = [];
    let elegible = "Yes";
    if (entrada.pequena) {
      elegible = "No, your employer is exempt";
      observaciones.push(`Retail, service and agricultural businesses with ${v["ph.retirement-exempt-employees"]} workers or fewer are exempt from this rule.`);
    } else if (entrada.edad < v["ph.retirement-minimum-age"]) {
      elegible = `Not yet, the minimum age is ${v["ph.retirement-minimum-age"]}`;
    } else if (entrada.anios < v["ph.retirement-minimum-service"]) {
      elegible = `No, you need ${v["ph.retirement-minimum-service"]} years in the company`;
    }
    if (entrada.edad > v["ph.retirement-compulsory-age"]) observaciones.push(`The compulsory retirement age is ${v["ph.retirement-compulsory-age"]}.`);
    if (entrada.meses >= 6) observaciones.push("Your extra months count as one more full year, since they are 6 or more.");
    observaciones.push("This is the minimum the law sets when there is no retirement plan or agreement. A company plan or a CBA can give more, never less.");
    return {
      total,
      mediaMes,
      anios,
      elegible,
      dias: v["ph.retirement-days"] + v["ph.retirement-sil-days"] + entrada.trece / 12 / entrada.diario,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Retirement pay", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "Do you qualify?", formato: "texto" },
    { clave: "mediaMes", etiqueta: "One-half month salary (per year of service)", formato: "moneda" },
    { clave: "anios", etiqueta: "Years of service counted", formato: "anios" },
    { clave: "dias", etiqueta: "Days of pay per year of service", formato: "numero", decimales: 2 },
  ],
});
