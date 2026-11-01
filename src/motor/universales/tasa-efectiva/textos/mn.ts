import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosMn: TextosUi<UiTasaEfectiva> = {
  slug: "jiliin-bodit-khuugiin-tootsooluur",
  ui: () => ({
    direccion: "Танд ямар хүү байгаа вэ?",
    nominalAEfectiva: "Жилийн нэрлэсэн хүү (бодит хүү рүү хөрвүүлэх)",
    efectivaANominal: "Жилийн бодит хүү (нэрлэсэн хүү рүү хөрвүүлэх)",
    tasa: "Жилийн хүү (%)",
    tasaAyuda: "Санал эсвэл гэрээнд заасан ёсоор нь оруулна уу.",
    capitalizacion: "Хүү хуримтлуулах давтамж",
    capitalizacionAyuda: "Хүү хэр олон удаа үндсэн дүнд нэмэгдэх вэ. Зээл, кредит картад ихэвчлэн сар бүр нэмэгддэг.",
    mensual: "Сар бүр (жилд 12 удаа)",
    trimestral: "Улирал бүр (жилд 4 удаа)",
    semestral: "Хагас жил бүр (жилд 2 удаа)",
    diaria: "Өдөр бүр (жилд 365 удаа)",
    efectiva: "Жилийн бодит хүү",
    nominal: "Жилийн нэрлэсэн хүү",
    periodica: "Нэг үеийн хүү",
    errorNegativa: "Хүү сөрөг байж болохгүй. 0 буюу түүнээс их тоо оруулна уу.",
    observacionDiferencia: (puntos) => `Бодит хүү нэрлэсэн хүүгээс ${puntos} нэгж хувиар өндөр байна, учир нь хүү дээр мөн хүү бодогддог.`,
  }),
};
