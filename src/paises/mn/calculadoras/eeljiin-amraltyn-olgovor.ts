import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function shatlal(jil: number): string | null {
  if (jil >= 32) return "j32";
  if (jil >= 26) return "j26";
  if (jil >= 21) return "j21";
  if (jil >= 16) return "j16";
  if (jil >= 11) return "j11";
  if (jil >= 6) return "j6";
  return null;
}

export default definirCalculadora({
  id: "mn.eeljiin-amraltyn-olgovor",
  mercado: "mn",
  concepto: "vacaciones",
  slug: "eeljiin-amraltyn-olgovor",
  estado: "borrador",
  requiere: {
    "mn.eeljiin-undsen": "numero",
    "mn.eeljiin-buurungui": "numero",
    "mn.eeljiin-nemelt-kheviin": "mapa",
    "mn.eeljiin-nemelt-kheviin-bus": "mapa",
    "mn.eeljiin-mongoor-koef": "numero",
    "mn.tetgemj-huvaagch": "numero",
  },
  campos: [
    { id: "dundaj", tipo: "moneda", etiqueta: "Тухайн ажлын жилийн сарын дундаж цалин", min: 0, porDefecto: 1680000 },
    { id: "jil", tipo: "entero", etiqueta: "Хэд дэх жилдээ ажиллаж байна вэ", min: 1, max: 60, porDefecto: 7 },
    { id: "nokhtsol", tipo: "opcion", etiqueta: "Хөдөлмөрийн нөхцөл", opciones: [{ valor: "kheviin", etiqueta: "Хэвийн" }, { valor: "bus", etiqueta: "Хэвийн бус" }], porDefecto: "kheviin" },
    { id: "buurungui", tipo: "si-no", etiqueta: "Хөгжлийн бэрхшээлтэй эсвэл 18 насанд хүрээгүй", porDefecto: false },
    { id: "edelsengui", tipo: "si-no", etiqueta: "Амралтаа ажлын шаардлагаар эдэлж чадаагүй", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dundaj <= 0) throw new ErrorEntrada("Сарын дундаж цалингаа оруулна уу.", "dundaj");
    const undsen = e.buurungui ? v["mn.eeljiin-buurungui"] : v["mn.eeljiin-undsen"];
    const s = shatlal(e.jil);
    const mapa = e.nokhtsol === "bus" ? v["mn.eeljiin-nemelt-kheviin-bus"] : v["mn.eeljiin-nemelt-kheviin"];
    const nemelt = s === null ? 0 : enMapa(mapa, s);
    const odor = undsen + nemelt;
    const odriinTsalin = e.dundaj / v["mn.tetgemj-huvaagch"];
    const koef = e.edelsengui ? v["mn.eeljiin-mongoor-koef"] : 1;
    return {
      olgovor: redondear(odriinTsalin * odor * koef),
      odor,
      undsen,
      nemelt,
      odriinTsalin: redondear(odriinTsalin),
      observaciones: ["Нэг өдрийн дундаж цалинг сарын дунджаас 21 ажлын өдрөөр ойролцоогоор бодов. Яг дүн А/191 журмын дагуу таны ажлын өдрөөр тооцогдоно."],
    };
  },
  resultado: [
    { clave: "olgovor", etiqueta: "Ээлжийн амралтын олговор", formato: "moneda", destacada: true },
    { clave: "odor", etiqueta: "Нийт амралтын өдөр", formato: "dias" },
    { clave: "undsen", etiqueta: "Үндсэн амралт", formato: "dias" },
    { clave: "nemelt", etiqueta: "Нэмэгдэл амралт", formato: "dias", ocultarSiCero: true },
    { clave: "odriinTsalin", etiqueta: "Нэг өдрийн дундаж цалин", formato: "moneda" },
  ],
});
