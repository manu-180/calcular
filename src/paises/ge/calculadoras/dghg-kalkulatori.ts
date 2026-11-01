import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.dghg-kalkulatori",
  mercado: "ge",
  concepto: "iva",
  slug: "dghg-kalkulatori",
  estado: "publicado",
  requiere: { "ge.dghg": "numero", "ge.dghg-zghvari": "numero" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "რა გსურთ",
      opciones: [
        { valor: "damateba", etiqueta: "დღგ-ის დამატება თანხაზე" },
        { valor: "gamoqopa", etiqueta: "დღგ-ის გამოყოფა თანხიდან" },
      ],
      porDefecto: "damateba",
    },
    { id: "tanxa", tipo: "moneda", etiqueta: "თანხა", min: 0, porDefecto: 100 },
    { id: "brunva", tipo: "moneda", etiqueta: "ბრუნვა ბოლო 12 თვეში (არასავალდებულო)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    const t = v["ge.dghg"];
    const netoTanxa = redondear(e.modo === "damateba" ? e.tanxa : e.tanxa / (1 + t / 100));
    const sul = redondear(e.modo === "damateba" ? e.tanxa * (1 + t / 100) : e.tanxa);
    const observaciones: string[] = [];
    if (e.brunva !== null) {
      observaciones.push(
        e.brunva > v["ge.dghg-zghvari"]
          ? "ბრუნვამ რეგისტრაციის ზღვარს გადააჭარბა. საგადასახადო ორგანოს 2 სამუშაო დღეში უნდა მიმართოთ."
          : "ბრუნვა რეგისტრაციის სავალდებულო ზღვარს არ აღემატება.",
      );
    }
    return { sul, dghg: redondear(sul - netoTanxa), netoTanxa, observaciones };
  },
  resultado: [
    { clave: "sul", etiqueta: "თანხა დღგ-ით", formato: "moneda", destacada: true },
    { clave: "dghg", etiqueta: "დღგ", formato: "moneda" },
    { clave: "netoTanxa", etiqueta: "თანხა დღგ-ის გარეშე", formato: "moneda" },
  ],
});
