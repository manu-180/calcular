# Google Ads — Campaña Planillas Comercio (calcular.ar/planillas)

**Creado:** 2026-06-21 · **Autor:** Hornero · **Estado:** lista para encender (pendiente: Manuel crea la cáscara)
**Producto:** Planilla de sueldos Comercio 2026 (CCT 130/75) · **$14.900** pago único · margen ≈ **$14.200**

> Por qué esta campaña existe: validar con tráfico de intención de compra si la landing convierte y a
> qué costo, y **descubrir qué términos de búsqueda venden** (informe de términos de búsqueda) para
> después afinar todo el SEO orgánico con esa data. Es un experimento de aprendizaje barato, NO la
> palanca de ingresos.

---

## ⚙️ Estado técnico (HECHO por Hornero — 2026-06-21)

- ✅ **Conversión creada** en la cuenta APEX (`4869983637`): *"CalculAR - Compra Planilla Comercio"*
  (PURCHASE, ID `7656363058`). `send_to: AW-18041789644/UzbYCLKo68IcEMy5_5pD`.
- ✅ **Sitio instrumentado** y deployado (calcular.ar en vivo):
  - gtag base `AW-18041789644` en todo el sitio (`src/lib/ads.ts` + `src/app/layout.tsx`).
  - Disparo de la conversión en `/planillas/gracias` cuando MP confirma el pago
    (`src/components/ConversionGoogleAds.tsx`), con `value=14900`, `currency=ARS` y
    `transaction_id=payment_id` (deduplica refrescos). Smoke en vivo: gtag presente. ✓

La validación final del píxel (que la conversión *registre*) se confirma con Google Tag Assistant o con
la **primera venta real** — no se puede smoke-testear sin un pago.

---

## 🧱 Lo único que tiene que hacer Manuel (el MCP no crea campañas ni anuncios)

El MCP de Google Ads sólo **gestiona** (keywords, negativas, presupuesto, puja, prender/pausar) y crea
conversiones — **no** crea la campaña, el grupo de anuncios ni el texto del anuncio. Esa cáscara la creás
vos en la UI (una vez, ~10 min); el resto lo lleno yo.

### Paso a paso (en https://ads.google.com, cuenta **APEX**)

1. **+ Nueva campaña** → objetivo **"Ventas"** (o "Crear sin objetivo") → tipo **"Búsqueda"**.
   - Si pide un objetivo de conversión, elegí **"CalculAR - Compra Planilla Comercio"**.
2. **Nombre:** `CalculAR · Planillas Comercio · Search`
3. **Redes:** ✅ sólo Búsqueda de Google. **Desactivá** "Incluir socios de búsqueda" y "Red de Display".
4. **Ubicación:** Argentina. Importante: en opciones de ubicación elegí **"Presencia: personas que están
   en tu zona"** (NO "interés") para no pagar clics de afuera.
5. **Idioma:** Español.
6. **Presupuesto:** $**1.500**/día. (Yo lo confirmo por MCP.)
7. **Puja:** elegí **"Clics" → Maximizar clics** (al principio no hay conversiones, así que Maximizar
   conversiones todavía no sirve). Yo lo ajusto/confirmo por MCP.
8. **Grupo de anuncios:** nombre `Planillas Comercio`. Dejá las keywords vacías o ignorá lo que sugiera
   Google — **las cargo yo**.
9. **Anuncio** (creá 1 anuncio responsive de búsqueda con el copy de abajo).
10. **⚠️ Dejá la campaña en PAUSA** (no la actives). Avisame "ya está" y yo cargo keywords + negativas +
    presupuesto + puja, verifico todo, y la encendemos juntos.

---

## ✍️ Anuncio responsive de búsqueda (copiá y pegá)

**URL final:** `https://calcular.ar/planillas`
**Ruta visible:** `planilla` / `comercio` (muestra calcular.ar/planilla/comercio)

**Títulos (15 — máx. 30 caracteres c/u):**
1. Planilla Sueldos Comercio
2. Liquidá Comercio en Excel
3. Escala FAECYS Oficial 2026
4. CCT 130/75 Actualizada
5. Planilla Excel + Sheets
6. Pago Único $14.900
7. Actualización Garantizada
8. Siempre al Día con Paritaria
9. Sueldos de Comercio Fácil
10. Descarga Inmediata
11. Datos Oficiales, no Blogs
12. Liquidación sin Errores
13. Para Contadores y Pymes
14. Comprá y Descargá Hoy
15. Planilla de Comercio 2026

> Opcional: fijá (pin) el título 1 o 6 en la posición 1 si querés que siempre aparezca el nombre/precio.

**Descripciones (4 — máx. 90 caracteres c/u):**
1. Liquidá sueldos de Comercio con la escala oficial FAECYS. Excel y Google Sheets.
2. Pago único $14.900 con todas las actualizaciones 2026 incluidas. Descarga inmediata.
3. No son las planillas gratis desactualizadas: reflejan la circular oficial vigente.
4. Se actualiza con cada paritaria de FAECYS. Datos oficiales, no blogs de terceros.

---

## 🔑 Keywords que cargo yo por MCP (transparencia)

Validadas por SERP propia (2026-06-15, ver `docs/plans/2026-06-15-plan-alcance-planillas.md` §3).
Sólo intención de **compra**. Las informacionales ("cómo liquidar…") quedan para el orgánico, no para Ads.

**Exact match** (máxima intención):
- `[planilla sueldos empleados de comercio excel]`
- `[modelo recibo de sueldo empleado de comercio excel]`
- `[planilla liquidacion sueldos comercio]`
- `[planilla sueldos comercio excel]`

**Phrase match** (captura variantes):
- `"planilla sueldos comercio"`
- `"planilla liquidacion comercio"`
- `"modelo recibo sueldo comercio"`
- `"planilla empleados de comercio excel"`

**Negativas** (no malgastar en intención equivocada): gratis, gratuita, gratuito, descargar gratis,
calculadora, curso, cursos, pdf, cuanto gana, cuanto cobra, sueldo minimo, empleo, trabajo, busco
trabajo, afip, arca, monotributo, mercadolibre, mercado libre, como calcular, como liquidar, youtube,
sindicato.

---

## 🛑 Regla de corte (kill-switch) y lectura

- **Margen por venta ≈ $14.200.** Si el costo por venta (CPA) supera eso, se pierde plata en cada venta.
- **Corte:** si al gastar **$30.000 ARS** acumulados NO hubo **≥2 ventas reales** (CPA < ~$15.000),
  pausar y revisar (keywords / landing / precio). Lo vigilo yo por MCP y aviso.
- **Aprendizaje real:** mirar el **informe de términos de búsqueda** (qué tipeó la gente) — de ahí salen
  las keywords nuevas y las negativas, y esa data alimenta el SEO orgánico de todo el sitio.
- **Escalar:** sólo subir el presupuesto si el CPA cierra con 2 semanas de datos. No antes.

## 🔁 Cómo lo opero (MCP, cuenta 4869983637)

Tras la cáscara: `add_keywords` (exact+phrase) · `add_negative_keywords` · `update_campaign_budget`
(1.500.000.000 micros) · `update_bidding_strategy` (MAXIMIZE_CLICKS) · `set_campaign_status`
(ENABLED al encender). Cuando junte ~15-30 conversiones, evaluar pasar a Maximizar conversiones / Target CPA.
