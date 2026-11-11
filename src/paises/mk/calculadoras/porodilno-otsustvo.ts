import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { dodajMeseci } from "../lib/plata";

export default definirCalculadora({
  id: "mk.porodilno-otsustvo",
  mercado: "mk",
  concepto: "propio",
  slug: "porodilno-otsustvo",
  estado: "publicado",
  requiere: { "mk.porodilno": "mapa", "mk.porodilno-denovi": "mapa" },
  campos: [
    { id: "raganje", tipo: "fecha", etiqueta: "Очекуван ден на раѓање", porDefecto: "hoy" },
    { id: "pred", tipo: "entero", etiqueta: "Денови пред раѓањето кога почнува отсуството", min: 28, max: 45, porDefecto: 45 },
    { id: "poveke", tipo: "si-no", etiqueta: "Повеќе деца одеднаш (близнаци, тројка)", porDefecto: false },
  ],
  calcular(e, v) {
    const d = v["mk.porodilno-denovi"];
    if (e.pred > enMapa(d, "najrano") || e.pred < enMapa(d, "zadolzhitelno")) throw new ErrorEntrada("Отсуството почнува најрано 45 и најдоцна 28 дена пред раѓањето.", "pred");
    const pocetok = sumarDias(e.raganje, -e.pred);
    const meseci = enMapa(v["mk.porodilno"], e.poveke ? "poveke" : "edno");
    return {
      kraj: sumarDias(dodajMeseci(pocetok, meseci), -1),
      pocetok,
      meseci,
      najranoVrakjanje: sumarDias(e.raganje, enMapa(d, "vrakjanje")),
    };
  },
  resultado: [
    { clave: "kraj", etiqueta: "Последен ден од отсуството", formato: "fecha", destacada: true },
    { clave: "pocetok", etiqueta: "Почеток на отсуството", formato: "fecha" },
    { clave: "meseci", etiqueta: "Траење", formato: "meses" },
    { clave: "najranoVrakjanje", etiqueta: "Најрано враќање на работа", formato: "fecha" },
  ],
});
