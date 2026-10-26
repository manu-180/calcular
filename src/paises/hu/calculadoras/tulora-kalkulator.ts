import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.tulora-kalkulator",
  mercado: "hu",
  concepto: "horas-extra",
  slug: "tulora-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.rendkivuli-munkaido-potlek": "mapa",
    "hu.oraber-oszto": "numero",
  },
  campos: [
    {
      id: "berTipus",
      tipo: "opcion",
      etiqueta: "Hogyan kapod a béred?",
      opciones: [
        { valor: "havi", etiqueta: "Havibér" },
        { valor: "orai", etiqueta: "Órabér" },
      ],
      porDefecto: "havi",
    },
    { id: "ber", tipo: "moneda", etiqueta: "Havi alapbér vagy órabér", min: 0, porDefecto: 500000 },
    { id: "orak", tipo: "numero", etiqueta: "Túlórák száma", min: 0, max: 400, porDefecto: 10 },
    { id: "mikor", tipo: "opcion-dato", dato: "hu.rendkivuli-munkaido-potlek", etiqueta: "Mikor dolgoztál túlórában?", porDefecto: "munkanap" },
  ],
  calcular(e, v, { redondear }) {
    if (e.ber <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb bért.", "ber");
    if (e.orak <= 0) throw new ErrorEntrada("Adj meg legalább egy túlórát.", "orak");
    const oraber = e.berTipus === "havi" ? e.ber / v["hu.oraber-oszto"] : e.ber;
    const potlekSzazalek = enMapa(v["hu.rendkivuli-munkaido-potlek"], e.mikor);
    const alapdij = redondear(oraber * e.orak);
    const potlek = redondear((alapdij * potlekSzazalek) / 100);
    const observaciones: string[] = [];
    if (e.orak > 250) observaciones.push("Egy naptári évben legfeljebb 250 óra rendkívüli munkaidő rendelhető el. Írásbeli megállapodással vagy kollektív szerződéssel ennél több is lehet, legfeljebb 400 óra.");
    return {
      osszes: redondear(alapdij + potlek),
      alapdij,
      potlek,
      potlekSzazalek,
      oraber: redondear(oraber),
      observaciones,
    };
  },
  resultado: [
    { clave: "osszes", etiqueta: "Bruttó túlóradíj összesen", formato: "moneda", destacada: true },
    { clave: "alapdij", etiqueta: "Alapbér a túlórákra", formato: "moneda" },
    { clave: "potlek", etiqueta: "Bérpótlék", formato: "moneda" },
    { clave: "potlekSzazalek", etiqueta: "A bérpótlék mértéke", formato: "porcentaje" },
    { clave: "oraber", etiqueta: "Egy órára jutó alapbér", formato: "moneda" },
  ],
});
