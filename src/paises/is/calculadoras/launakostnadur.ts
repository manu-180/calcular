import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.launakostnadur",
  mercado: "is",
  concepto: "costo-empleador",
  slug: "launakostnadur",
  estado: "publicado",
  requiere: { "is.lifeyrir-launamadur": "numero", "is.lifeyrir-motframlag": "numero", "is.tryggingagjald": "numero", "is.tryggingagjald-sjomenn": "numero" },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Heildarlaun á mánuði", min: 0, porDefecto: 700000 },
    { id: "motSereign", tipo: "porcentaje", etiqueta: "Mótframlag í séreign", ayuda: "Hlutfallið kemur úr kjarasamningi eða ráðningarsamningi. Skrifaðu 0 ef það á ekki við.", min: 0, max: 10, porDefecto: 0 },
    { id: "sjomadur", tipo: "si-no", etiqueta: "Sjómaður á fiskiskipi", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn laun hærri en núll.", "laun");
    const motframlag = redondear(porcentaje(e.laun, v["is.lifeyrir-motframlag"]));
    const motSereign = redondear(porcentaje(e.laun, e.motSereign));
    const stofn = e.laun + motframlag + motSereign;
    const tryggingagjald = redondear(porcentaje(stofn, e.sjomadur ? v["is.tryggingagjald-sjomenn"] : v["is.tryggingagjald"]));
    const heild = stofn + tryggingagjald;
    return { motframlag, motSereign, tryggingagjald, heild, alag: ((heild - e.laun) / e.laun) * 100 };
  },
  resultado: [
    { clave: "motframlag", etiqueta: "Mótframlag í lífeyrissjóð", formato: "moneda" },
    { clave: "motSereign", etiqueta: "Mótframlag í séreign", formato: "moneda", ocultarSiCero: true },
    { clave: "tryggingagjald", etiqueta: "Tryggingagjald", formato: "moneda" },
    { clave: "heild", etiqueta: "Launakostnaður alls", formato: "moneda", destacada: true },
    { clave: "alag", etiqueta: "Ofan á heildarlaun", formato: "porcentaje", decimales: 1 },
  ],
});
