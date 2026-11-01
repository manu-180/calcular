import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { formatearNumero } from "@/motor/formato";

export default definirCalculadora({
  id: "bd.provident-fund-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "provident-fund-calculator",
  estado: "publicado",
  requiere: {
    "bd.provident-fund-rate": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "মাসিক মূল মজুরি", min: 0, porDefecto: 20000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "আপনার চাঁদার হার (মূল মজুরির %)", min: 0, max: 100, porDefecto: 8 },
    { id: "anios", tipo: "entero", etiqueta: "কত বছর চাঁদা দেবেন", min: 1, max: 45, porDefecto: 10 },
    { id: "rendimiento", tipo: "porcentaje", etiqueta: "তহবিলের বার্ষিক মুনাফার হার", ayuda: "ট্রাস্টি বোর্ড তহবিল বিনিয়োগ করে যে মুনাফা দেয়। না জানলে ০ রাখুন।", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("মাসিক মূল মজুরি লিখুন।", "basico");
    const m = v["bd.provident-fund-rate"];
    const minimo = enMapa(m, "min");
    const maximo = enMapa(m, "max");
    if (entrada.tasa < minimo || entrada.tasa > maximo) {
      throw new ErrorEntrada(`শ্রম আইনে চাঁদার হার ${formatearNumero(minimo, "bn-BD")}% থেকে ${formatearNumero(maximo, "bn-BD")}% এর মধ্যে।`, "tasa");
    }
    const propia = redondear(porcentaje(entrada.basico, entrada.tasa));
    const empleador = propia;
    const mensual = propia + empleador;
    const n = entrada.anios * 12;
    const r = entrada.rendimiento / 100 / 12;
    const acumulado = r === 0 ? mensual * n : mensual * (((1 + r) ** n - 1) / r);
    return {
      acumulado: redondear(acumulado),
      propia,
      empleador,
      mensual: redondear(mensual),
      aportado: redondear(mensual * n),
      ganancia: redondear(acumulado - mensual * n),
    };
  },
  resultado: [
    { clave: "acumulado", etiqueta: "মেয়াদ শেষে তহবিলে জমা", formato: "moneda", destacada: true },
    { clave: "propia", etiqueta: "প্রতি মাসে আপনার চাঁদা", formato: "moneda" },
    { clave: "empleador", etiqueta: "প্রতি মাসে মালিকের চাঁদা", formato: "moneda" },
    { clave: "mensual", etiqueta: "প্রতি মাসে মোট জমা", formato: "moneda" },
    { clave: "aportado", etiqueta: "মোট চাঁদা", formato: "moneda" },
    { clave: "ganancia", etiqueta: "তহবিলের মুনাফা", formato: "moneda", ocultarSiCero: true },
  ],
});
