# Genera src/paises/ps/datos.json. Todos los valores verificados salen del texto de قانون العمل رقم 7
# لسنة 2000 publicado por وزارة المالية (leído el 2026-10-29). Uso: python3 -I scripts/paises/ps/generar_datos.py
import json
import pathlib

HOY = "2026-10-29"
# La ley rige 30 días después de su publicación en الوقائع الفلسطينية (art. 141). La fecha exacta de
# publicación no se leyó: se toma el primer año completo en vigor, y el cuerpo no la muestra.
DESDE = "2002-01-01"
LEY = {
    "organismo": "وزارة المالية",
    "titulo": "قانون العمل رقم (7) لسنة 2000م",
    "url": "https://mof.gov.ps/wp-content/uploads/documnets/pal_work_law.doc",
    "tipo": "primaria",
    "verificadoEl": HOY,
}


def ley(nota):
    return {**LEY, "nota": nota}


def dato(id_, nombre, tipo, unidad, valor, nota, **extra):
    return {
        "id": id_,
        "nombre": nombre,
        "tipo": tipo,
        "unidad": unidad,
        **extra,
        "tramos": [{"estado": "verificado", "desde": DESDE, "valor": valor, "fuente": ley(nota)}],
    }


datos = [
    dato("ps.end-of-service", "مكافأة نهاية الخدمة عن كل سنة عمل", "numero", "meses", 1,
         "المادة 45: أجر شهر عن كل سنة على أساس آخر أجر دون ساعات العمل الإضافية، وتُحتسب كسور السنة."),
    dato("ps.end-of-service-min", "مدة العمل التي تُستحق بعدها مكافأة نهاية الخدمة", "numero", "anios", 1,
         "المادة 45: للعامل الذي أمضى سنة من العمل."),
    dato("ps.resignation-years", "حدود مدة الخدمة لحصة المستقيل من المكافأة", "mapa", "anios", {"third": 5, "full": 10},
         "المادة 42 (2): ثلث المكافأة لمن استقال خلال السنوات الخمس الأولى، وثلثاها خلال الخمس التالية، وكاملة لمن أمضى عشر سنوات أو أكثر.",
         etiquetas={"third": "حد الثلث", "full": "حد المكافأة الكاملة"}),
    dato("ps.unfair-dismissal", "التعويض عن الفصل التعسفي", "mapa", "meses", {"per-year": 2, "cap": 24},
         "المادة 47: أجر شهرين عن كل سنة على ألا يتجاوز التعويض أجر سنتين.",
         etiquetas={"per-year": "عن كل سنة عمل", "cap": "الحد الأعلى"}),
    dato("ps.notice", "مدة الإشعار لإنهاء العقد غير محدد المدة", "numero", "meses", 1,
         "المادة 46 (1): إشعار بعلم الوصول قبل شهر من إنهاء العمل. والمادة 35: شهر للعامل بأجر شهري."),
    dato("ps.notice-weekly", "مدة إخطار العامل المستقيل بأجر يومي أو أسبوعي أو بالقطعة", "numero", "semanas", 1,
         "المادة 35: أسبوع إذا كان العامل يتقاضى أجره على أساس يومي أو أسبوعي أو بالقطعة أو بالعمولة."),
    dato("ps.probation", "أقصى مدة للتجربة", "numero", "meses", 3,
         "المادة 29: فترة تجربة مدتها ثلاثة أشهر لا تتكرر أكثر من مرة لدى صاحب العمل نفسه."),
    dato("ps.annual-leave", "الإجازة السنوية مدفوعة الأجر", "mapa", "semanas", {"base": 2, "extended": 3},
         "المادة 74 (1): أسبوعان عن كل سنة، وثلاثة أسابيع في الأعمال الخطرة أو الضارة بالصحة ولمن أمضى خمس سنوات في المنشأة.",
         etiquetas={"base": "الإجازة الأساسية", "extended": "الإجازة الممددة"}),
    dato("ps.annual-leave-years", "مدة الخدمة التي ترفع الإجازة السنوية", "numero", "anios", 5,
         "المادة 74 (1): ثلاثة أسابيع لمن أمضى خمس سنوات في المنشأة."),
    dato("ps.annual-leave-carryover", "أقصى مدة لتجميع الإجازات السنوية", "numero", "anios", 2,
         "المادة 74 (4): لا يجوز تجميع الإجازات السنوية لأكثر من سنتين."),
    dato("ps.working-hours", "ساعات العمل الفعلي في الأسبوع", "numero", "horas", 45,
         "المادة 68: ساعات العمل الفعلي في الأسبوع خمس وأربعون ساعة."),
    dato("ps.overtime-rate", "أجر الساعة الإضافية نسبةً إلى أجر الساعة", "numero", "%", 150,
         "المادة 71 (2): يُدفع للعامل أجر ساعة ونصف عن كل ساعة عمل إضافية."),
    dato("ps.overtime-max", "الحد الأعلى لساعات العمل الإضافية في الأسبوع", "numero", "horas", 12,
         "المادة 71 (1): ساعات عمل إضافية لا تتجاوز اثنتي عشرة ساعة في الأسبوع."),
    dato("ps.sick-leave", "الإجازة المرضية في السنة", "mapa", "dias", {"full": 14, "half": 14},
         "المادة 79: أربعة عشر يومًا مدفوعة الأجر، وأربعة عشر يومًا أخرى بنصف الأجر، بناءً على تقرير اللجنة الطبية.",
         etiquetas={"full": "بالأجر الكامل", "half": "بنصف الأجر"}),
    dato("ps.sick-leave-half-rate", "نسبة الأجر في المرحلة الثانية من الإجازة المرضية", "numero", "%", 50,
         "المادة 79: بنصف الأجر لمدة أربعة عشر يومًا أخرى."),
    dato("ps.maternity-leave", "إجازة الوضع مدفوعة الأجر", "numero", "semanas", 10,
         "المادة 103 (1): إجازة وضع لمدة عشرة أسابيع مدفوعة الأجر."),
    dato("ps.maternity-after-birth", "الحد الأدنى من إجازة الوضع بعد الولادة", "numero", "semanas", 6,
         "المادة 103 (1): منها ستة أسابيع على الأقل بعد الولادة."),
    dato("ps.maternity-min-service", "مدة العمل المطلوبة قبل الولادة", "numero", "dias", 180,
         "المادة 103 (1): للمرأة العاملة التي أمضت في العمل قبل كل ولادة مدة مائة وثمانين يومًا."),
    dato("ps.nursing-hour", "فترة الرضاعة اليومية", "numero", "horas", 1,
         "المادة 104: لا تقل في مجموعها عن ساعة يوميًا لمدة سنة من تاريخ الوضع، وتُحتسب من ساعات العمل."),
    dato("ps.deduction-advance", "أقصى حسم لكل قسط من السلفة", "numero", "%", 10,
         "المادة 83 (1) ب: ألا يزيد كل حسم عن 10% من الأجر الأساسي."),
    dato("ps.deduction-total", "أقصى مجموع لحسم السلف والغرامات", "numero", "%", 15,
         "المادة 83 (2): لا يزيد مجموع ما يُحسم للسلفة والغرامات عن 15% من الأجر الأساسي."),
    dato("ps.fine-max", "أقصى غرامة تأديبية في الشهر", "numero", "dias", 3,
         "المادة 84 (أ): لا يزيد مقدار الغرامة عن أجر ثلاثة أيام في الشهر."),
    {
        "id": "ps.minimum-wage",
        "nombre": "الحد الأدنى للأجور الشهري",
        "tipo": "numero",
        "unidad": "ILS",
        "tramos": [
            {
                "estado": "no-verificado",
                "desde": "2022-01-01",
                "valor": 1880,
                "motivo": "قرار مجلس الوزراء رقم 4 لسنة 2021 لم يُقرأ في مصدر رسمي: موقع وزارة العمل والجريدة الرسمية لم يفتحا في 2026-10-29. الرقم من مركز مسارات وWageIndicator فقط.",
            }
        ],
    },
]

ruta = pathlib.Path(__file__).resolve().parents[3] / "src/paises/ps/datos.json"
ruta.write_text(json.dumps({"mercado": "ps", "datos": datos}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(ruta, len(datos))
