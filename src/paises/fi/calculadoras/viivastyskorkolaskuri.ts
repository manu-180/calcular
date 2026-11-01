import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { Dato, FechaISO, TablaResultado } from "@/motor/tipos";
import { diasEntre, sumarDias, vigente } from "@/motor/vigencia";
import datos from "../datos.json";

// Pitkä viivästys voi osua usealle puolivuotiskaudelle, ja moottori antaa vain tämän päivän
// viitekoron, joten tarkistetut kaudet luetaan suoraan datos.jsonista.
const VIITEKORKO = datos.datos.find((d) => d.id === "fi.viitekorko") as unknown as Dato<"numero">;

export default definirCalculadora({
  id: "fi.viivastyskorkolaskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "viivastyskorkolaskuri",
  estado: "publicado",
  requiere: {
    "fi.viitekorko": "numero",
    "fi.viivastyskoron-lisa": "mapa",
  },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Maksamaton summa", min: 0, porDefecto: 1000 },
    { id: "erapaiva", tipo: "fecha", etiqueta: "Eräpäivä", min: "2025-01-01", porDefecto: "2026-06-30" },
    { id: "maksupaiva", tipo: "fecha", etiqueta: "Maksupäivä", min: "2025-01-01", porDefecto: "hoy" },
    { id: "laji", tipo: "opcion-dato", dato: "fi.viivastyskoron-lisa", etiqueta: "Velan laji", porDefecto: "kuluttaja" },
  ],
  tablas: [{ clave: "kaudet", titulo: "Viivästyskorko kausittain", filasVisibles: 6 }],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Syötä summa, joka on suurempi kuin nolla.", "summa");
    if (e.maksupaiva <= e.erapaiva) throw new ErrorEntrada("Maksupäivän pitää olla eräpäivän jälkeen.", "maksupaiva");
    const lisa = enMapa(v["fi.viivastyskoron-lisa"], e.laji);
    const filas: (string | number)[][] = [];
    let yhteensa = 0;
    let paiva: FechaISO = sumarDias(e.erapaiva, 1);
    while (paiva <= e.maksupaiva) {
      const tramo = vigente(VIITEKORKO, paiva);
      if (!tramo) throw new ErrorEntrada("Viitekorkoa ei ole tarkistettu tälle ajalle.", "erapaiva");
      const loppu = tramo.hasta && tramo.hasta < e.maksupaiva ? tramo.hasta : e.maksupaiva;
      const paivat = diasEntre(paiva, loppu) + 1;
      const korko = tramo.valor + lisa;
      const maara = (e.summa * korko * paivat) / 100 / 365;
      yhteensa += maara;
      filas.push([paiva, loppu, paivat, korko, redondear(maara)]);
      paiva = sumarDias(loppu, 1);
    }
    const kaudet: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "alku", etiqueta: "Alku", formato: "fecha" },
        { clave: "loppu", etiqueta: "Loppu", formato: "fecha" },
        { clave: "paivat", etiqueta: "Päivät", formato: "dias" },
        { clave: "korko", etiqueta: "Vuosikorko", formato: "porcentaje" },
        { clave: "maara", etiqueta: "Korko", formato: "moneda" },
      ],
      filas,
    };
    const korko = redondear(yhteensa);
    return {
      korko,
      yhteensa: redondear(e.summa + korko),
      paivat: diasEntre(e.erapaiva, e.maksupaiva),
      nykyinen: v["fi.viitekorko"] + lisa,
      kaudet,
      observaciones: ["Korko lasketaan eräpäivän jälkeisestä päivästä maksupäivään ja 365 päivän vuodella."],
    };
  },
  resultado: [
    { clave: "korko", etiqueta: "Viivästyskorko", formato: "moneda", destacada: true },
    { clave: "yhteensa", etiqueta: "Summa korkoineen", formato: "moneda" },
    { clave: "paivat", etiqueta: "Viivästyspäivät", formato: "dias", decimales: 0 },
    { clave: "nykyinen", etiqueta: "Viivästyskorko nyt (vuodessa)", formato: "porcentaje", decimales: 1 },
  ],
});
