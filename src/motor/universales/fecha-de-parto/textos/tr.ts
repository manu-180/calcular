import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosTr: TextosUi<UiFechaDeParto> = {
  slug: "tahmini-dogum-tarihi-hesaplama",
  ui: () => ({
    metodo: "Hangi tarihi biliyorsunuz?",
    fum: "Son adet tarihinin ilk günü",
    concepcion: "Döllenme tarihi",
    fecha: "Tarih",
    fechaAyuda: "Son adet tarihini seçtiyseniz kanamanın başladığı ilk günü girin.",
    ciclo: "Adet döngüsü süresi (gün)",
    cicloAyuda: "Yalnızca son adet tarihiyle kullanılır. Bilmiyorsanız 28 olarak bırakın.",
    fpp: "Tahmini doğum tarihi",
    edadGestacional: "Bugünkü gebelik haftası",
    trimestre: "Trimester",
    faltan: "Doğuma kalan gün",
    fechaConcepcion: "Tahmini döllenme tarihi",
    semanasYDias: (s, d) => `${s} hafta${d ? ` ${d} gün` : ""}`,
    trimestres: ["Birinci trimester", "İkinci trimester", "Üçüncü trimester"],
    errorFutura: "Tarih bugünden sonra olamaz.",
    errorCiclo: "Döngü süresi 20 ile 45 gün arasında olmalıdır.",
    notaPasada: "Bu tarihin üzerinden 42 haftadan fazla geçtiği için gebelik haftası gösterilmiyor.",
    aviso: "Bu bir tahmindir: bebeklerin çok azı tam tahmini doğum tarihinde doğar. En doğru tarihi ultrason ve doktorunuzla ya da ebenizle yapacağınız kontroller verir.",
  }),
};
