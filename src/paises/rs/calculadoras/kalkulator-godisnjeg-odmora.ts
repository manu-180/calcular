import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.kalkulator-godisnjeg-odmora",
  mercado: "rs",
  concepto: "vacaciones",
  slug: "kalkulator-godisnjeg-odmora",
  estado: "publicado",
  requiere: { "rs.godisnji-odmor-minimum": "numero" },
  campos: [
    { id: "ukupnoDana", tipo: "entero", etiqueta: "Dani odmora po ugovoru za celu godinu", ayuda: "Zakonski minimum uvećan po opštem aktu ili ugovoru o radu.", min: 1, max: 60, porDefecto: 20 },
    { id: "meseci", tipo: "entero", etiqueta: "Pune mesece rada u kalendarskoj godini", min: 0, max: 12, porDefecto: 12 },
    { id: "iskorisceno", tipo: "numero", etiqueta: "Već iskorišćeni dani", min: 0, porDefecto: 0 },
    { id: "prosecnaZarada", tipo: "moneda", etiqueta: "Prosečna mesečna zarada u prethodnih 12 meseci", ayuda: "Nije obavezno. Treba za naknadu neiskorišćenih dana.", min: 0, requerido: false },
    { id: "radnihDana", tipo: "entero", etiqueta: "Radnih dana u mesecu", min: 1, max: 31, porDefecto: 21 },
  ],
  calcular(e, v, { redondear }) {
    if (e.iskorisceno < 0) throw new ErrorEntrada("Iskorišćeni dani ne mogu biti negativni.", "iskorisceno");
    const minimum = v["rs.godisnji-odmor-minimum"];
    const godisnje = Math.max(e.ukupnoDana, minimum);
    const pripada = e.meseci >= 12 ? godisnje : (godisnje * e.meseci) / 12;
    const ostalo = Math.max(0, pripada - e.iskorisceno);
    const observaciones: string[] = [];
    if (e.ukupnoDana < minimum) observaciones.push(`Zakonski minimum je ${minimum} radnih dana, pa je obračun urađen sa tim brojem.`);
    return {
      pripada: Math.round(pripada * 100) / 100,
      ostalo: Math.round(ostalo * 100) / 100,
      naknada: e.prosecnaZarada ? redondear((e.prosecnaZarada * ostalo) / e.radnihDana) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "pripada", etiqueta: "Pripada vam radnih dana odmora", formato: "dias", destacada: true, decimales: 2 },
    { clave: "ostalo", etiqueta: "Ostalo neiskorišćeno", formato: "dias", decimales: 2 },
    { clave: "naknada", etiqueta: "Naknada za neiskorišćene dane pri prestanku radnog odnosa", formato: "moneda" },
  ],
});
