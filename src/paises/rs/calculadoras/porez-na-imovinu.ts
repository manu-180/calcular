import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.porez-na-imovinu",
  mercado: "rs",
  concepto: "propio",
  slug: "porez-na-imovinu",
  estado: "publicado",
  requiere: {
    "rs.porez-na-imovinu": "escala",
    "rs.porez-imovina-knjige": "numero",
    "rs.porez-imovina-zemljiste": "numero",
  },
  campos: [
    { id: "osnovica", tipo: "moneda", etiqueta: "Poreska osnovica nepokretnosti", ayuda: "Vrednost iz poreske prijave ili rešenja.", min: 0, porDefecto: 12000000 },
    {
      id: "vrsta",
      tipo: "opcion",
      etiqueta: "Obveznik i imovina",
      opciones: [
        { valor: "fizicko", etiqueta: "Bez poslovnih knjiga, stan, kuća ili drugi objekat" },
        { valor: "zemljiste", etiqueta: "Bez poslovnih knjiga, zemljište" },
        { valor: "knjige", etiqueta: "Obveznik koji vodi poslovne knjige" },
      ],
      porDefecto: "fizicko",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnovica <= 0) throw new ErrorEntrada("Unesite osnovicu veću od nule.", "osnovica");
    const porez = redondear(
      e.vrsta === "fizicko"
        ? aplicarEscalaMarginal(v["rs.porez-na-imovinu"], e.osnovica)
        : (e.osnovica * (e.vrsta === "knjige" ? v["rs.porez-imovina-knjige"] : v["rs.porez-imovina-zemljiste"])) / 100,
    );
    return {
      porez,
      kvartalno: redondear(porez / 4),
      stvarnaStopa: (porez / e.osnovica) * 100,
      observaciones: ["Ovo je najviši iznos po zakonskim stopama. Skupština opštine ili grada može da odredi niže stope i poreske olakšice."],
    };
  },
  resultado: [
    { clave: "porez", etiqueta: "Godišnji porez, najviše", formato: "moneda", destacada: true },
    { clave: "kvartalno", etiqueta: "Kvartalna rata", formato: "moneda" },
    { clave: "stvarnaStopa", etiqueta: "Stvarna stopa", formato: "porcentaje", decimales: 3 },
  ],
});
