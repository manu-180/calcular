import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function adunaLuni(data: string, luni: number): string {
  const [a, l, z] = data.split("-").map(Number);
  const total = a * 12 + (l - 1) + luni;
  const an = Math.floor(total / 12);
  const luna = (total % 12) + 1;
  const bisect = an % 4 === 0 && (an % 100 !== 0 || an % 400 === 0);
  const ultimaZi = luna === 2 ? (bisect ? 29 : 28) : [4, 6, 9, 11].includes(luna) ? 30 : 31;
  return `${an}-${String(luna).padStart(2, "0")}-${String(Math.min(z, ultimaZi)).padStart(2, "0")}`;
}

function luniIntre(de: string, pana: string): number {
  const [a1, l1, z1] = de.split("-").map(Number);
  const [a2, l2, z2] = pana.split("-").map(Number);
  return (a2 - a1) * 12 + (l2 - l1) - (z2 < z1 ? 1 : 0);
}

function varstaText(luni: number): string {
  const ani = Math.floor(luni / 12);
  const rest = luni % 12;
  return rest ? `${ani} de ani și ${rest} luni` : `${ani} de ani`;
}

const PRIMUL_AN = 2023;
const ULTIMUL_AN = 2028;

export default definirCalculadora({
  id: "md.varsta-de-pensionare",
  mercado: "md",
  concepto: "propio",
  slug: "varsta-de-pensionare",
  estado: "publicado",
  requiere: { "md.varsta-pensionare": "mapa" },
  campos: [
    {
      id: "sex",
      tipo: "opcion",
      etiqueta: "Sexul",
      opciones: [
        { valor: "femeie", etiqueta: "Femeie" },
        { valor: "barbat", etiqueta: "Bărbat" },
      ],
      porDefecto: "femeie",
    },
    { id: "nastere", tipo: "fecha", etiqueta: "Data nașterii", min: "1955-01-01", porDefecto: "1965-01-01" },
  ],
  calcular(e, v, { fecha }) {
    const m = v["md.varsta-pensionare"];
    let data: string | null = null;
    let varsta = 0;
    for (let an = PRIMUL_AN; an <= ULTIMUL_AN && !data; an++) {
      const cerinta = Math.round(enMapa(m, e.sex === "barbat" ? "barbati" : `femei-${an}`) * 12);
      const atinsa = adunaLuni(e.nastere, cerinta);
      const inceput = `${an}-07-01`;
      if (an === PRIMUL_AN && atinsa < inceput) {
        throw new ErrorEntrada("Vârsta standard a fost atinsă înainte de iulie 2023, după reguli mai vechi. Verificați data la CNAS.", "nastere");
      }
      const candidat = atinsa > inceput ? atinsa : inceput;
      if (an === ULTIMUL_AN || candidat < `${an + 1}-07-01`) {
        data = candidat;
        varsta = cerinta;
      }
    }
    if (!data) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const ramase = luniIntre(fecha, data);
    return {
      data,
      varsta: varstaText(varsta),
      ramase: ramase > 0 ? ramase : 0,
      stare: data <= fecha ? "Ați atins deja vârsta standard de pensionare." : "Nu ați atins încă vârsta standard de pensionare.",
      observaciones: ["Pe lângă vârstă, pensia pentru limită de vârstă cere stagiul complet de cotizare prevăzut de lege."],
    };
  },
  resultado: [
    { clave: "data", etiqueta: "Data la care atingeți vârsta standard de pensionare", formato: "fecha", destacada: true },
    { clave: "varsta", etiqueta: "Vârsta cerută la acea dată", formato: "texto" },
    { clave: "ramase", etiqueta: "Luni rămase", formato: "meses", ocultarSiCero: true },
    { clave: "stare", etiqueta: "Situația de azi", formato: "texto" },
  ],
});
