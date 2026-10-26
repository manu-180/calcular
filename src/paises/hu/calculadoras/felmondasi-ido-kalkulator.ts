import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "hu.felmondasi-ido-kalkulator",
  mercado: "hu",
  concepto: "preaviso",
  slug: "felmondasi-ido-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.felmondasi-ido-alap": "numero",
    "hu.felmondasi-ido-hosszabbitas": "mapa",
  },
  campos: [
    {
      id: "ki",
      tipo: "opcion",
      etiqueta: "Ki mond fel?",
      opciones: [
        { valor: "munkaltato", etiqueta: "A munkáltató" },
        { valor: "munkavallalo", etiqueta: "Én, a munkavállaló" },
      ],
      porDefecto: "munkaltato",
    },
    { id: "evek", tipo: "entero", etiqueta: "Hány évet dolgoztál a munkáltatónál?", min: 0, max: 60, porDefecto: 5 },
    { id: "kozles", tipo: "fecha", etiqueta: "A felmondás közlésének napja (nem kötelező)", requerido: false },
  ],
  calcular(e, v) {
    if (e.evek < 0) throw new ErrorEntrada("A munkaviszony hossza nem lehet negatív.", "evek");
    const alap = v["hu.felmondasi-ido-alap"];
    let hosszabbitas = 0;
    if (e.ki === "munkaltato") {
      for (const [ev, nap] of Object.entries(v["hu.felmondasi-ido-hosszabbitas"])) if (e.evek >= Number(ev)) hosszabbitas = Math.max(hosszabbitas, nap);
    }
    const napok = alap + hosszabbitas;
    const felmentes = e.ki === "munkaltato" ? Math.ceil(napok / 2) : 0;
    const kezdet = e.kozles ? sumarDias(e.kozles, 1) : null;
    const utolso = kezdet ? sumarDias(kezdet, napok - 1) : null;
    const observaciones: string[] = [];
    if (e.ki === "munkaltato") observaciones.push("A munkáltató a felmondási idő legalább felére felment a munkavégzés alól. Erre az időre távolléti díj jár.");
    if (e.ki === "munkavallalo") observaciones.push("Munkavállalói felmondásnál a felmondási idő nem hosszabbodik a munkaviszony hosszával, hacsak a szerződés másként nem rendelkezik.");
    return { napok, alap, hosszabbitas, felmentes, dolgozni: napok - felmentes, kezdet, utolso, observaciones };
  },
  resultado: [
    { clave: "napok", etiqueta: "Felmondási idő", formato: "dias", destacada: true },
    { clave: "alap", etiqueta: "Alap felmondási idő", formato: "dias" },
    { clave: "hosszabbitas", etiqueta: "Meghosszabbítás a munkaviszony hossza miatt", formato: "dias", ocultarSiCero: true },
    { clave: "felmentes", etiqueta: "Munkavégzés alóli felmentés legalább", formato: "dias", ocultarSiCero: true },
    { clave: "dolgozni", etiqueta: "Ennyi napig kérhetnek munkát legfeljebb", formato: "dias" },
    { clave: "kezdet", etiqueta: "A felmondási idő első napja", formato: "fecha" },
    { clave: "utolso", etiqueta: "A munkaviszony utolsó napja", formato: "fecha" },
  ],
});
