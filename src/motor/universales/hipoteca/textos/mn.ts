import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosMn: TextosUi<UiHipoteca> = {
  slug: "oron-suutsny-zeeliin-tootsooluur",
  ui: () => ({
    precio: "Орон сууцны үнэ",
    entradaPorcentaje: "Урьдчилгаа төлбөр (үнийн %)",
    entradaMonto: "Урьдчилгаа төлбөрийн дүн (заавал биш)",
    entradaMontoAyuda: "Оруулбал хувийн оронд энэ дүнг ашиглана.",
    tasa: "Жилийн хүү (%)",
    anios: "Хугацаа (жилээр)",
    gastos: "Орон сууцны сарын зардал (заавал биш)",
    gastosAyuda: "Зээлийн хамт төлдөг үл хөдлөх хөрөнгийн албан татвар, даатгал эсвэл засвар үйлчилгээний хураамж.",
    cuota: "Зээлийн сарын төлбөр",
    cuotaTotal: "Зардалтай сарын төлбөр",
    entrada: "Урьдчилгаа төлбөр",
    prestado: "Зээлийн хэмжээ",
    intereses: "Нийт хүү",
    total: "Нийт төлөх төлбөр",
    tabla: "Жил жилээр",
    colAnio: "Жил",
    colIntereses: "Төлсөн хүү",
    colCapital: "Төлсөн үндсэн төлбөр",
    colSaldo: "Оны эцсийн үлдэгдэл",
    errorPrecio: "Орон сууцны үнийг оруулна уу.",
    errorEntrada: "Урьдчилгаа төлбөр бүх үнийг нөхөж байгаа тул тооцоолох зээл алга. Урьдчилгаа төлбөрөө бууруулна уу.",
    observacionPrestado: (porcentaje) => `Та орон сууцны үнийн ${porcentaje} хувийг зээлж байна. Энэ хувь их байх тусам банк ихэвчлэн илүү олон шаардлага тавьдаг.`,
    observacionCostos: "Худалдан авалтын зардал (нотариатын хураамж, орон нутгийн татвар, хөрөнгийн үнэлгээ) ороогүй. Урьдчилгаа төлбөрөөс гадна тусад нь тооцно уу.",
  }),
};
