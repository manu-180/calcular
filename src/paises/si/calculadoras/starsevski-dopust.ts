import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.starsevski-dopust",
  mercado: "si",
  concepto: "propio",
  slug: "starsevski-dopust",
  estado: "publicado",
  requiere: { "si.starsevski-dopust": "mapa", "si.starsevsko-nadomestilo": "mapa", "si.minimalna-placa": "numero" },
  campos: [
    { id: "osnova", tipo: "moneda", etiqueta: "Povprečna mesečna bruto osnova v zadnjih 12 mesecih", min: 0, porDefecto: 2000 },
    {
      id: "vrsta",
      tipo: "opcion",
      etiqueta: "Vrsta dopusta",
      opciones: [
        { valor: "materinski", etiqueta: "Materinski dopust" },
        { valor: "ocetovski", etiqueta: "Očetovski dopust" },
        { valor: "starsevski", etiqueta: "Starševski dopust enega od staršev" },
      ],
      porDefecto: "starsevski",
    },
    { id: "hkrati", tipo: "entero", etiqueta: "Hkrati rojeni otroci", min: 1, max: 6, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnova <= 0) throw new ErrorEntrada("Vnesite osnovo, večjo od nič.", "osnova");
    const d = v["si.starsevski-dopust"];
    const n = v["si.starsevsko-nadomestilo"];
    const dodatni = e.hkrati - 1;
    let dni = enMapa(d, "materinski");
    if (e.vrsta === "ocetovski") dni = enMapa(d, "ocetovski") + dodatni * enMapa(d, "dodatni-oce");
    else if (e.vrsta === "starsevski") dni = enMapa(d, "starsevski") + dodatni * enMapa(d, "dodatni-otrok");
    const stopnja = e.vrsta === "materinski" || e.osnova <= v["si.minimalna-placa"] ? enMapa(n, "materinsko") : enMapa(n, "drugo");
    const mesecno = redondear(porcentaje(e.osnova, stopnja));
    return {
      mesecno,
      dni,
      stopnja,
      skupaj: redondear((mesecno * dni) / 30),
      observaciones: ["Izračun ne upošteva zakonske zgornje in spodnje meje nadomestila. Pri zelo visokih osnovah je lahko dejanski znesek nižji."],
    };
  },
  resultado: [
    { clave: "mesecno", etiqueta: "Bruto nadomestilo na mesec", formato: "moneda", destacada: true },
    { clave: "dni", etiqueta: "Trajanje dopusta", formato: "dias" },
    { clave: "stopnja", etiqueta: "Odstotek osnove", formato: "porcentaje" },
    { clave: "skupaj", etiqueta: "Okvirni znesek za ves dopust", formato: "moneda" },
  ],
});
