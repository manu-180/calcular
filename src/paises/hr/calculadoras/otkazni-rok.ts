import { definirCalculadora, enMapa } from "@/motor/calculo";

function tekst(mjeseci: number): string {
  const m = Math.floor(mjeseci);
  const t = Math.floor((mjeseci - m) * 4 + 0.5);
  const dijelovi: string[] = [];
  if (m === 1) dijelovi.push("1 mjesec");
  else if (m > 1) dijelovi.push(`${m} mjeseca`);
  if (t === 1) dijelovi.push("1 tjedan");
  else if (t > 1) dijelovi.push(`${t} tjedna`);
  return dijelovi.join(" i ");
}

export default definirCalculadora({
  id: "hr.otkazni-rok",
  mercado: "hr",
  concepto: "preaviso",
  slug: "otkazni-rok",
  estado: "publicado",
  requiere: { "hr.otkazni-rok": "mapa", "hr.otkazni-dob": "mapa" },
  campos: [
    { id: "godine", tipo: "entero", etiqueta: "Neprekidne godine rada kod poslodavca", min: 0, max: 60, porDefecto: 6 },
    { id: "dob", tipo: "entero", etiqueta: "Vaša dob", min: 15, max: 80, porDefecto: 40 },
    { id: "skrivljeno", tipo: "si-no", etiqueta: "Otkaz zbog vašeg skrivljenog ponašanja", porDefecto: false },
    { id: "mirovina", tipo: "si-no", etiqueta: "Imate najmanje 65 godina života i 15 godina mirovinskog staža", ayuda: "Tada zakonski otkazni rok ne pripada (čl. 122. st. 8.).", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.mirovina) return { rok: "Nema otkaznog roka", mjeseci: 0 };
    const g = e.godine;
    const r = g < 1 ? "do1" : g < 2 ? "od1" : g < 5 ? "od2" : g < 10 ? "od5" : g < 20 ? "od10" : "od20";
    let mjeseci = enMapa(v["hr.otkazni-rok"], r);
    if (g >= 20 && e.dob >= 55) mjeseci += enMapa(v["hr.otkazni-dob"], "od55");
    else if (g >= 20 && e.dob >= 50) mjeseci += enMapa(v["hr.otkazni-dob"], "od50");
    if (e.skrivljeno) mjeseci /= 2;
    return { rok: tekst(mjeseci), mjeseci };
  },
  resultado: [
    { clave: "rok", etiqueta: "Najkraći otkazni rok", formato: "texto", destacada: true },
    { clave: "mjeseci", etiqueta: "U mjesecima, dva tjedna su 0,5", formato: "numero", decimales: 2 },
  ],
});
