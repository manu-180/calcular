import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosMn: TextosUi<UiCombustible> = {
  slug: "shatakhuuny-zardal-tootsooluur",
  ui: () => ({
    distancia: (u) => `Замын зай (${u})`,
    idaYVuelta: "Очиж ирэх",
    tipoConsumo: "Зарцуулалтыг хэрхэн хэмжих вэ",
    l100: "100 km тутамд литр",
    kml: "Нэг литрээр явах километр",
    consumo: "Шатахууны зарцуулалт",
    consumoMpg: "Шатахууны зарцуулалт (галлон тутамд миль)",
    consumoAyuda: "Ашиглалтын заавар эсвэл самбарын компьютерээс шалгана уу. Хотын гадна машин ихэвчлэн хотын доторхоос бага зарцуулдаг.",
    precio: (u) => (u === "L" ? "Нэг литрийн үнэ" : "Нэг галлоны үнэ"),
    personas: "Зардлыг хэдэн хүн хуваах вэ",
    costo: "Шатахууны зардал",
    porPersona: "Нэг хүнд",
    combustible: (u) => (u === "L" ? "Шаардлагатай шатахуун (литр)" : "Шаардлагатай шатахуун (галлон)"),
    distanciaTotal: (u) => `Нийт зай (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Нэг милийн зардал" : `${u} тутмын зардал`),
    errorConsumo: "Шатахууны зарцуулалт тэгээс их байх ёстой.",
    errorPersonas: "Дор хаяж нэг хүн байх ёстой.",
  }),
};
