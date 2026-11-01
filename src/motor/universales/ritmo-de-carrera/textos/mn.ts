import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// La definición pasa «km»/«mi» y «km/h»/«mph»; en mongol se escriben «км», «миль», «км/цаг» y «миль/цаг».
const corta = (u: string) => (u === "mi" ? "миль" : "км");
const una = (u: string) => (u === "mi" ? "миль" : "км");
const velocidad = (u: string) => (u === "mph" ? "миль/цаг" : "км/цаг");

export const textosMn: TextosUi<UiRitmo> = {
  slug: "guiltiin-khemneliin-tootsooluur",
  ui: () => ({
    calcular: "Та юу тооцоолохыг хүсэж байна вэ?",
    calcRitmo: "Хэмнэл (зай, хугацаанаас)",
    calcTiempo: "Хугацаа (зай, хэмнэлээс)",
    calcDistancia: "Зай (хугацаа, хэмнэлээс)",
    distancia: "Зай",
    distanciaAyuda: "Уралдаан сонгох эсвэл өөрийн зайг оруулахын тулд «Бусад» сонголтыг сонгоно уу.",
    otra: "Бусад",
    cincoK: "5 км",
    diezK: "10 км",
    media: "Хагас марафон",
    maraton: "Марафон",
    distanciaOtra: (u) => `Бусад зай (${corta(u)})`,
    horas: "Хугацаа: цаг",
    minutos: "Хугацаа: минут",
    segundos: "Хугацаа: секунд",
    ritmoMin: (u) => `Хэмнэл: ${una(u)} тутмын минут`,
    ritmoSeg: "Хэмнэл: секунд",
    ritmo: (u) => `Хэмнэл (мин/${una(u)})`,
    tiempo: "Эцсийн хугацаа",
    distanciaRes: (u) => `Зай (${corta(u)})`,
    velocidad: (u) => `Дундаж хурд (${velocidad(u)})`,
    errorDistancia: "Тэгээс их зай оруулна уу.",
    errorTiempo: "Хугацааг цаг, минут эсвэл секундээр оруулна уу.",
    errorRitmo: "Зайн нэгж тутмын хэмнэлийг минут, секундээр оруулна уу.",
  }),
};
