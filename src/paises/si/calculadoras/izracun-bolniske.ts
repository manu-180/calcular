import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.izracun-bolniske",
  mercado: "si",
  concepto: "propio",
  slug: "izracun-bolniske",
  estado: "publicado",
  requiere: { "si.bolniska": "mapa", "si.minimalna-placa": "numero" },
  campos: [
    { id: "osnova", tipo: "moneda", etiqueta: "Povprečna mesečna bruto plača v preteklem letu", min: 0, porDefecto: 2000 },
    {
      id: "vzrok",
      tipo: "opcion",
      etiqueta: "Razlog za odsotnost",
      opciones: [
        { valor: "bolezen", etiqueta: "Bolezen" },
        { valor: "poskodba", etiqueta: "Poškodba zunaj dela" },
        { valor: "nega", etiqueta: "Nega družinskega člana" },
        { valor: "poklicna", etiqueta: "Poškodba pri delu ali poklicna bolezen" },
      ],
      porDefecto: "bolezen",
    },
    {
      id: "trajanje",
      tipo: "opcion",
      etiqueta: "Trajanje odsotnosti",
      opciones: [
        { valor: "do90", etiqueta: "Prvih 90 dni" },
        { valor: "nad90", etiqueta: "Po 90 dneh" },
      ],
      porDefecto: "do90",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnova <= 0) throw new ErrorEntrada("Vnesite plačo, večjo od nič.", "osnova");
    const m = v["si.bolniska"];
    const kratko = e.trajanje === "do90";
    let stopnja = enMapa(m, "poklicna");
    if (e.vzrok === "bolezen") stopnja = enMapa(m, kratko ? "bolezen-do90" : "bolezen-nad90");
    else if (e.vzrok === "poskodba") stopnja = enMapa(m, kratko ? "poskodba-do90" : "poskodba-nad90");
    else if (e.vzrok === "nega") stopnja = enMapa(m, "nega");
    const izracun = porcentaje(e.osnova, stopnja);
    const najmanj = redondear(porcentaje(v["si.minimalna-placa"], enMapa(m, "najmanj")));
    const nadomestilo = redondear(Math.max(izracun, najmanj));
    return { nadomestilo, stopnja, najmanj, razlika: redondear(e.osnova - nadomestilo) };
  },
  resultado: [
    { clave: "nadomestilo", etiqueta: "Bruto nadomestilo za polni mesec", formato: "moneda", destacada: true },
    { clave: "stopnja", etiqueta: "Odstotek osnove", formato: "porcentaje" },
    { clave: "najmanj", etiqueta: "Najnižje nadomestilo", formato: "moneda" },
    { clave: "razlika", etiqueta: "Manj kot pri osnovi", formato: "moneda" },
  ],
});
