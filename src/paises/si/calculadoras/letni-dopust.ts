import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.letni-dopust",
  mercado: "si",
  concepto: "vacaciones",
  slug: "letni-dopust",
  estado: "publicado",
  requiere: { "si.dopust": "mapa" },
  campos: [
    { id: "dniTeden", tipo: "entero", etiqueta: "Delovni dnevi v tednu", min: 1, max: 7, porDefecto: 5 },
    { id: "posebni", tipo: "si-no", etiqueta: "Ste starejši od 55 let, invalid, imate vsaj 60-odstotno telesno okvaro ali negujete otroka s posebnimi potrebami", porDefecto: false },
    { id: "otroci", tipo: "entero", etiqueta: "Otroci, mlajši od 15 let", min: 0, max: 15, porDefecto: 0 },
    { id: "meseci", tipo: "entero", etiqueta: "Meseci zaposlitve v letu", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.meseci < 1 || e.meseci > 12) throw new ErrorEntrada("Vnesite od 1 do 12 mesecev.", "meseci");
    const m = v["si.dopust"];
    const osnovni = enMapa(m, "tedni") * e.dniTeden;
    const dodatni = (e.posebni ? enMapa(m, "dodatni") : 0) + e.otroci * enMapa(m, "na-otroka");
    const skupaj = osnovni + dodatni;
    return { skupaj, osnovni, dodatni, sorazmerni: e.meseci < 12 ? redondear((skupaj * e.meseci) / 12) : null };
  },
  resultado: [
    { clave: "skupaj", etiqueta: "Najmanj dni dopusta za vse leto", formato: "dias", destacada: true },
    { clave: "osnovni", etiqueta: "Osnovni dopust", formato: "dias" },
    { clave: "dodatni", etiqueta: "Dodatni dnevi", formato: "dias", ocultarSiCero: true },
    { clave: "sorazmerni", etiqueta: "Sorazmerni del za vaše mesece", formato: "dias", decimales: 1 },
  ],
});
