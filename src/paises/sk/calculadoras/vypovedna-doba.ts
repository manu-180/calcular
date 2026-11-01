import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const DNI = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// § 62 ods. 7: la doba corre desde el primer día del mes siguiente y acaba el último día del mes que toca.
function posledny(dorucene: string, mesiace: number): string {
  const [r, m] = dorucene.split("-").map(Number);
  const z = m + mesiace - 1;
  const rok = r + Math.floor(z / 12);
  const mes = z % 12;
  const prestupny = (rok % 4 === 0 && rok % 100 !== 0) || rok % 400 === 0;
  const dni = mes === 1 && prestupny ? 29 : DNI[mes];
  return `${rok}-${String(mes + 1).padStart(2, "0")}-${String(dni).padStart(2, "0")}`;
}

export default definirCalculadora({
  id: "sk.vypovedna-doba",
  mercado: "sk",
  concepto: "preaviso",
  slug: "vypovedna-doba",
  estado: "publicado",
  requiere: { "sk.vypovedna-doba": "mapa" },
  campos: [
    {
      id: "dovod",
      tipo: "opcion",
      etiqueta: "Výpoveď dáva",
      porDefecto: "organizacne",
      opciones: [
        { valor: "organizacne", etiqueta: "zamestnávateľ pre organizačné alebo zdravotné dôvody" },
        { valor: "ine", etiqueta: "zamestnávateľ z iných dôvodov" },
        { valor: "zamestnanec", etiqueta: "zamestnanec" },
      ],
    },
    { id: "roky", tipo: "numero", etiqueta: "Trvanie pracovného pomeru v rokoch", min: 0, porDefecto: 3 },
    { id: "dorucene", tipo: "fecha", etiqueta: "Dátum doručenia výpovede", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.roky < 0) throw new ErrorEntrada("Trvanie nemôže byť záporné.", "roky");
    const m = v["sk.vypovedna-doba"];
    const mesiace = e.dovod === "organizacne" && e.roky >= 5 ? m.od5 : e.roky >= 1 ? m.od1 : m.zaklad;
    return { mesiace, koniec: posledny(e.dorucene, mesiace) };
  },
  resultado: [
    { clave: "mesiace", etiqueta: "Výpovedná doba najmenej", formato: "meses", destacada: true },
    { clave: "koniec", etiqueta: "Pracovný pomer sa skončí", formato: "fecha" },
  ],
});
