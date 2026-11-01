import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.taksa-e-ndertesave",
  mercado: "al",
  concepto: "propio",
  slug: "taksa-e-ndertesave",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  requiere: { "al.taksa-ndertese": "mapa" },
  campos: [
    { id: "vlera", tipo: "moneda", etiqueta: "Vlera e ndërtesës", min: 0, porDefecto: 10000000 },
    { id: "perdorimi", tipo: "opcion-dato", dato: "al.taksa-ndertese", etiqueta: "Përdorimi i ndërtesës", porDefecto: "banim" },
  ],
  calcular(e, v, { redondear }) {
    if (e.vlera <= 0) throw new ErrorEntrada("Vendosni vlerën e ndërtesës.", "vlera");
    const shkalla = enMapa(v["al.taksa-ndertese"], e.perdorimi);
    const vjetore = redondear((e.vlera * shkalla) / 100);
    return { vjetore, mujore: redondear(vjetore / 12), shkalla };
  },
  resultado: [
    { clave: "vjetore", etiqueta: "Taksa në vit", formato: "moneda", destacada: true },
    { clave: "mujore", etiqueta: "Taksa në muaj", formato: "moneda" },
    { clave: "shkalla", etiqueta: "Shkalla e zbatuar", formato: "porcentaje", decimales: 2 },
  ],
});
