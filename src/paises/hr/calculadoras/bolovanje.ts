import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.bolovanje",
  mercado: "hr",
  concepto: "propio",
  slug: "bolovanje",
  estado: "publicado",
  requiere: {
    "hr.bolovanje-stopa": "numero",
    "hr.bolovanje-stopa-nakon": "numero",
    "hr.bolovanje-dijete": "numero",
    "hr.bolovanje-najvise": "numero",
    "hr.bolovanje-najmanje": "numero",
    "hr.bolovanje-poslodavac-dani": "numero",
  },
  campos: [
    { id: "osnovica", tipo: "moneda", etiqueta: "Prosječna plaća u zadnjih šest mjeseci", min: 0, porDefecto: 1800 },
    { id: "dani", tipo: "entero", etiqueta: "Dani bolovanja", min: 1, max: 730, porDefecto: 30 },
    {
      id: "razlog",
      tipo: "opcion",
      etiqueta: "Razlog",
      opciones: [
        { valor: "bolest", etiqueta: "Bolest ili ozljeda, početak bolovanja" },
        { valor: "nakon", etiqueta: "Bolest nakon šest mjeseci neprekidno" },
        { valor: "dijete", etiqueta: "Njega djeteta do 7 godina" },
        { valor: "ozljeda", etiqueta: "Priznata ozljeda na radu ili profesionalna bolest" },
      ],
      porDefecto: "bolest",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnovica <= 0) throw new ErrorEntrada("Unesite plaću veću od nule.", "osnovica");
    const stisni = (x: number) => Math.max(v["hr.bolovanje-najmanje"], Math.min(x, v["hr.bolovanje-najvise"]));
    const stopa70 = (e.osnovica * v["hr.bolovanje-stopa"]) / 100;
    let mjesecPoslodavac = 0;
    let mjesecHzzo = 0;
    let daniPoslodavac = 0;
    if (e.razlog === "bolest") {
      daniPoslodavac = Math.min(e.dani, v["hr.bolovanje-poslodavac-dani"]);
      mjesecPoslodavac = stopa70;
      mjesecHzzo = stisni(stopa70);
    } else if (e.razlog === "nakon") {
      mjesecHzzo = stisni((e.osnovica * v["hr.bolovanje-stopa-nakon"]) / 100);
    } else if (e.razlog === "dijete") {
      mjesecHzzo = stisni((e.osnovica * v["hr.bolovanje-dijete"]) / 100);
    } else {
      mjesecHzzo = e.osnovica;
    }
    const daniHzzo = e.dani - daniPoslodavac;
    const poslodavac = redondear((mjesecPoslodavac * daniPoslodavac) / 30);
    const hzzo = redondear((mjesecHzzo * daniHzzo) / 30);
    return {
      ukupno: redondear(poslodavac + hzzo),
      daniPoslodavac,
      poslodavac,
      daniHzzo,
      hzzo,
      observaciones: ["Procjena: mjesečni iznos računamo na 30 dana. HZZO osnovicu preračunava po satu, pa stvarna isplata može biti malo drukčija."],
    };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Procjena naknade za sve dane", formato: "moneda", destacada: true },
    { clave: "daniPoslodavac", etiqueta: "Dani na teret poslodavca", formato: "dias", ocultarSiCero: true },
    { clave: "poslodavac", etiqueta: "Naknada na teret poslodavca, najmanje", formato: "moneda", ocultarSiCero: true },
    { clave: "daniHzzo", etiqueta: "Dani na teret HZZO-a", formato: "dias", ocultarSiCero: true },
    { clave: "hzzo", etiqueta: "Naknada na teret HZZO-a", formato: "moneda", ocultarSiCero: true },
  ],
});
