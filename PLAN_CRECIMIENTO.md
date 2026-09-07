# CalculAR — Plan Maestro de Crecimiento y Monetización v1

**Fecha:** 2026-06-12 · **Autor:** Hornero · **Estado:** vigente
**Evidencia:** [docs/research/2026-06-12-research-crecimiento-monetizacion.md](../docs/research/2026-06-12-research-crecimiento-monetizacion.md) (4 agentes, ~230 verificaciones web en vivo). Todo dato citado acá sale de ahí salvo indicación.
**Complementa:** [HIPOTESIS.md](HIPOTESIS.md) (kill criteria vigentes) · [docs/STRATEGY.md](../docs/STRATEGY.md) (L2)
**Próxima revisión:** mensual (con cada IPC) o al disparar un gate.

> **Cómo usar este documento (para humanos y para el sistema ejecutor):**
> La sección 8 es el backlog ejecutable: tareas atómicas con ID estable (`CAL-NNN`), dependencias,
> criterio de verificación mecánico, owner (`H` = Hornero/IA, `M` = Manuel) y fecha gatillo si aplica.
> Las secciones 1-7 son el porqué y el cuándo. El estado vivo de ejecución se trackea en
> `docs/PROGRESS.md`, no acá: este doc define el QUÉ y el ORDEN; PROGRESS registra lo hecho.
> Regla de oro heredada: lo reversible se ejecuta y reporta; lo irreversible (altas de cuentas,
> plata, identidad) es siempre owner `M` con guía preparada por `H`.

---

## 0. TL;DR — la tesis en diez líneas

1. **La ventana es ahora.** AI Overviews todavía NO está activo en Google Argentina (verificado en vivo); el SEO clásico sigue pagando el click completo. El incumbente (calcularsueldo.com.ar, 133K visitas/mes) está en caída (−11,8% MoM), es anónimo y tiene una grieta de confianza documentada. Los ~20 clones AI nuevos no mantienen datos ni tienen marca.
2. **El moat de CalculAR ya existe y hay que gritarlo:** datos solo de fuentes oficiales, con fecha de verificación visible, actualizado a las reformas 2026 (Ley 27.802) que los blogs viejos no tienen, y maquinaria de frescura mensual automatizada (IPC/BCRA). Nadie del nicho ejecuta esto sistemáticamente — y es exactamente lo que citan Perplexity/ChatGPT.
3. **Display es piso, intent es techo.** Con tráfico 100% AR, AdSense rinde USD ~1,2/1.000 pv: nunca sostiene solo el proyecto. La plata real está en la escalera demostrada localmente: **AdSense+Journey (piso) → afiliados/referidos fintech y SaaS → leads a contadores y abogados (un cliente de gestión vale ARS 60-125k/mes) → sponsorship "calculadora patrocinada" (formato vacante en AR) → B2B (widgets/API)**.
4. **Timing inmediato:** quedan ~10 días editoriales para el pico anual de "aguinaldo" (semana 21-30/6, Trends ya en 65 y subiendo) y 3 semanas para la ventana de recategorización (1/7-5/8). El plan arranca con un Sprint Aguinaldo.
5. **El plan compone 4 motores:** producto compartible (OG/WhatsApp/embeds/API) + SEO/GEO (clusters, frescura, citabilidad) + distribución activa (prensa de datos mensual, comunidades, creators) + owned (email/WhatsApp Channel). Todo medido, con gates y kill criteria.

**Norte:** USD acumulados en `revenue_events`. **Gate D90 (9-10/9/2026):** kill criteria de HIPOTESIS.md.
**Bloqueante crítico hoy:** la delegación DNS de `calcular.ar` (2 min de Manuel) — sin eso no hay indexación, ni GSC, ni AdSense, ni sprint que valga.

---

## 1. Diagnóstico — dónde estamos parados

**Activos (hecho y verificado):** 28 páginas en producción, 7 calculadoras con lógica testeada (35+32+29 casos borde OK), serie IPC embebida con generador propio, TNA BCRA en vivo con fallback fechado, fuentes legales verificadas contra Infoleg (no blogs), dominio `calcular.ar` configurado en Vercel, página Sobre/metodología, sitemap/robots/JSON-LD. Costo marginal de producir más: ~0.

**Faltantes que este plan ataca:** DNS sin delegar (sitio público inaccesible hoy), sin GSC/Bing, sin capa editorial (/blog), sin OG dinámicas ni share, sin llms.txt/IndexNow, sin captura de email, sin monetización activa, sin un solo canal de distribución encendido, marca desconocida (0 menciones, 0 links).

**El tablero competitivo (research §1):**

| Jugador | Qué nos enseña |
|---|---|
| calcularsueldo (incumbente, −12% MoM) | Amplitud gana tráfico, pero el anonimato y los números inconsistentes son su talón: **la confianza es el flanco abierto** |
| servidos.ar (+28% MoM) | Velocidad de clon con respaldo corporativo: **el hueco se cierra; apurar** |
| ikiwi (304K, lead-gen) | El lead financiero paga 10-50x el display en AR |
| contablix | El lead de monotributista → contador es negocio probado acá |
| dolarito/dolarhoy | El utility maduro vive de marca (tráfico directo), afiliados fintech, venta directa y API |
| Omni Calculator | Long-tail + calculadoras noticiables + contenido educativo = compounding; **no cubre Argentina en español** |
| cuantocobro.ar | Un sitio nuevo de nicho YA es fuente de Perplexity: la citabilidad es ganable con frescura fechada |

**Por qué ahora (convergencia del research):** AIO ausente en AR + incumbente débil en confianza + clones aún sin marca + pico de aguinaldo en días + recategorización en 3 semanas + crédito UVA revivido + reforma 27.802 que invalidó el contenido viejo de todos. Esta combinación no dura: servidos crece 28%/mes y AIO puede aterrizar sin aviso.

---

## 2. Posicionamiento y marca

**Promesa:** *"Los números de tu plata, con fuente oficial y fecha. Gratis."*

**Los 3 pilares (cada página debe respirarlos):**
1. **Verificable:** cada dato con su fuente oficial (ARCA/BCRA/INDEC/Infoleg) y "última verificación: DD/MM" visible. Changelog público de cambios de datos y de leyes.
2. **Transparente:** el cálculo se muestra paso a paso (ataca directo la queja documentada de "cada calculadora da un número distinto"). El usuario puede auditar el número que le damos.
3. **Fresco:** rotación mensual automatizada (IPC, TNA, movilidad, escalas) — la frescura visible es el ranking factor de facto del nicho (arquiler.com rankea #1 mostrando "hace 5 horas") y lo que los motores de IA citan.

**Voz:** es-AR directo y cálido, sin jerga; "tu sueldo", "tu alquiler". Sin clickbait: si el título dice calculadora, hay calculadora (los medios no pueden decir lo mismo — y ese contraste es nuestra cuña de prensa).

**Qué NO somos:** no damos consejo financiero/legal personalizado; no vendemos humo de "hacete rico"; no publicamos dato sin fuente. El disclaimer es parte de la marca, no letra chica.

**Batallas elegidas / evitadas:**
- ✅ Pelear: long-tails con intención de herramienta, clusters con hueco (doméstica, jubilación interactiva, ICL), la citabilidad IA, la prensa de datos.
- ❌ No pelear (por ahora): head terms contra organismos y bancos ("plazo fijo banco X", "sueldo neto" head), dólar (D-006: descartado), la noticia diaria contra los medios.

---

## 3. El flywheel — cómo se compone el crecimiento

```
        ┌────────────────────────────────────────────────────┐
        ▼                                                    │
  PRODUCTO ÚTIL ──share WhatsApp/OG──► USUARIOS NUEVOS       │
   (calculadoras       ▲                    │                │
    + datos frescos)   │              email/canal WA         │
        │         embeds/API                ▼                │
        │         (backlinks)         AUDIENCIA PROPIA ──────┤ vuelve cada
   reporte prensa      ▲                    │                │ IPC/aguinaldo/
   mensual (IPC)       │              leads + afiliados      │ recategorización
        │              │              + sponsors             │
        ▼              │                    ▼                │
   MENCIONES+LINKS ────┴──► AUTORIDAD ──► INGRESOS ──► más herramientas
        (SEO/GEO suben)
```

Cada pieza del backlog alimenta al menos un eje de este ciclo. La regla de portfolio sigue viva: lo que no muestra señal en 90 días se mata y se documenta.

---

## 4. Workstreams (el QUÉ, organizado)

### WS-P · Producto para crecimiento
El producto ES el marketing. Prioridades: (1) **resultado compartible**: imagen OG dinámica del resultado + botón "Compartir por WhatsApp" (el canal social real de AR — nadie del nicho lo hace); (2) **tabla TNA por banco** (la pregunta "qué banco paga más" que hoy gana Crónica con una tablita diaria); (3) **widget embebible** (tabla TNA + calculadoras) con atribución, para medios regionales que arman esa tabla a mano cada semana y estudios contables que publican calculadoras precarias; (4) **API pública gratis** (`/api/v1/...`) siguiendo el precedente dolarapi/argentinadatos: cada app de terceros es una mención; (5) badge "Calculado con CalculAR".

### WS-S · SEO (técnico + contenido)
- **Técnico:** GSC + Bing Webmaster (gated por DNS), IndexNow en cada deploy, schema completo (SoftwareApplication/FAQPage/NewsArticle + dateModified real), interlinking de clusters (ya bueno, mantener patrón).
- **Contenido:** completar las series programáticas que el research validó con demanda real: aguinaldo por meses trabajados y por provincia; monotributo por categoría (A-K); indemnización por antigüedad y por convenio; ICL/inflación por mes (patrón ya construido). **Capa editorial `/blog`**: 2-4 piezas/mes ancladas al calendario de datos (requisito Discover + materia prima de prensa + antídoto "low value" de AdSense).
- **E-E-A-T:** página de metodología ya existe; sumar autor visible con bio, changelog público de datos/leyes, y "cómo calculamos" linkeado desde cada resultado.

### WS-G · GEO / citabilidad IA
Objetivo: ser la fuente que citan ChatGPT/Perplexity para cálculos AR (es ganable: cuantocobro.ar ya lo logró siendo nuevo). Tácticas: bloque answer-first con cifra+fecha arriba de cada página; tablas HTML con valores oficiales (los motores citan texto/tablas, no JS); página "aguinaldo neto" que cubra el gap detectado (ningún motor resuelve bien el neto); páginas por evento ("indemnización antes vs después del 6/3/2026"); `/llms.txt`; alta en Bing (ChatGPT usa su índice); **monitoreo mensual**: 5 queries en Perplexity/ChatGPT + check de AIO en Google AR (cuando AIO aterrice, el plan cambia de defensa a ofensiva de citas).

### WS-C · Expansión de clusters (orden por score del research)
1. **Empleada doméstica (8.5/10)** — demanda enorme y estable TODO el año, cero calculadoras interactivas en el top-10, fuente CNTCP clara (Res 4/2026 recién salida). Sueldo por categoría/hora + aguinaldo + liquidación + página de escalas del mes.
2. **Jubilación (7.5)** — wizard "¿me puedo jubilar?" (post-fin de moratoria hay confusión masiva) + "¿cuánto cobraría?" + haberes del mes (movilidad mensual = frescura recurrente).
3. **Ganancias 4ª (7)** — tablas semestrales = moat de frescura; "¿el aguinaldo paga Ganancias?" cruza con el pico de junio/diciembre; SIRADIG para marzo.
4. **ICL alquileres (7)** — autocomplete #1; extiende el cluster inflación ya construido; comparador ICL vs IPC vs Casa Propia.
5. **Liquidación final (6.5)** — adyacente directo de indemnización.
6. **Sueldo neto por convenio (6)** — entrar por Comercio (el convenio más buscado), jamás por el head term.
Regla vigente: research/verificación de fuente ANTES de construir cada uno (tools/keyword-research-ar.md); GO ≥7 o adyacencia directa.

### WS-D · Distribución activa
- **Prensa de datos (la palanca #1):** el pitch es regalar la nota hecha. Mensual: **"Índice CalculAR del sueldo real"** — el día que sale el IPC, mini-reporte a ~20 redacciones (regionales primero: republican casi sin filtro; Reinhold/LN y Terrile como apuestas grandes) con la calculadora como fuente linkeable. Estacional: aguinaldo (ya), recategorización (julio), fin de año.
- **Comunidades (reglas anti-ban del research §4.2):** r/merval post "hice una calculadora, feedback" en semana pico; responder consultas con el cálculo hecho en r/argentina/FB/foro Rava; grupos FB de monotributistas (Manuel identifica los 5 más grandes); **MARA como posible aliado institucional** (50k likes, asociación real).
- **Creators (micro-colabs costo 0):** regalar cálculos exclusivos listos para contenido. Primeros 3: **Soy Jurista** (79K YT, hizo un stream de 3 hs sobre indemnización 27.802 AYER — match perfecto), contadoras TikTok (Manuela Iglesias, Jael Caglioti — la calculadora de recategorización les ahorra responder lo mismo 200 veces), Luli Invierte/Dinero en Orden para aguinaldo/inflación.
- **Google Discover:** el update feb-2026 favorece nicho con autoridad temática → la capa editorial está diseñada para esto (imagen 1200px, autor, NewsArticle).

### WS-R · Retención / audiencia propia
- **Email desde el día 1:** "recibí tu cálculo en PDF + te avisamos cuando cambian los datos que te afectan" (tabla Supabase, RLS insert-only). El gancho de re-engagement natural del nicho es imbatible: el IPC cambia TODOS los meses.
- **Newsletter "Tus números del mes"** (al juntar ~100+ emails): IPC, tasas, escalas nuevas, 1 consejo accionable. Monetizable con sponsors desde 3-5k subs.
- **Canal de WhatsApp CalculAR** (2 mensajes/semana: "TNA hoy banco por banco", "salió el IPC: tu alquiler sube X%") — formato nativo AR, costo cero.
- RSS (habilita el botón Seguir de Discover).

### WS-M · Monetización (escalera con gatillos — detalle §6)

### WS-O · Operación y medición (detalle §7)

---

## 5. Roadmap 90 días (12/6 → 10/9)

**FASE 0 — SPRINT AGUINALDO (12-30/6).** La semana 21-30/6 concentra la demanda anual; todo lo que se shipea antes del 20/6 rinde 20x.
- **S0 (12-15/6) build:** rotar IPC mayo (¡ya salió: 2,1%!) · página "aguinaldo neto" answer-first + serie "trabajé N meses" + fechas por provincia · OG dinámicas + share WhatsApp · llms.txt + IndexNow + schema review · captura de email v1 · contingencia DNS (si 16/6 sigue NXDOMAIN → servir desde vercel.app sin redirect, reversible).
- **S1 (16-22/6) contenido+prensa:** /blog con "Qué hacer con el aguinaldo 2026" y "¿El aguinaldo paga Ganancias?" · mini-reporte de prensa a 15 regionales + LN · GSC/Bing/sitemap apenas resuelva DNS · drafts de outreach a creators.
- **S2 (23-30/6) distribución pico:** post r/merval · DMs a Soy Jurista + contadoras · responder consultas donde las reglas lo permitan · monitorear y capitalizar "no me pagaron el aguinaldo" (1-7/7, demanda legal → indemnización).

**FASE 1 — RECATEGORIZACIÓN + MAQUINARIA MENSUAL (1/7-4/8).**
- S3 (1-7/7): refresh recategorización (ventana abre 1/7) + artículo julio 2026 + pitch a MARA y contadoras (esta vez con recategorización, su tema).
- S4 (8-14/7): IPC junio (~13/7) → **primer "Índice CalculAR del sueldo real"** + circuito de prensa mensual estrenado · arranca cluster empleada doméstica.
- S5 (15-21/7): ship cluster doméstica completo (4 páginas) · spike fuente tabla TNA por banco.
- S6 (22-28/7): **aplicar AdSense** (si DNS+indexación+≥5 artículos OK) · preparar rotación de escalas (monotributo vence 31/7, Ganancias jul-dic).
- S7 (29/7-4/8): rotación escalas + push final recategorización (cierra ~5/8) · Journey by Mediavine al cruzar 1.000 sesiones/mes.

**FASE 2 — CLUSTERS + LOOPS B2B (5/8-8/9).**
- S8 (5-11/8): cluster jubilación v1 · IPC julio (~13/8) reporte #2.
- S9 (12-18/8): ICL alquileres + comparador de índices · widget embebible v1.
- S10 (19-25/8): API pública v1 + lanzamiento en r/devsarg · outreach embeds (10 estudios contables + 5 medios) · artículo en Rankia.
- S11 (26/8-1/9): cluster Ganancias 4ª · sueldo neto por convenio Comercio v1.
- S12 (2-8/9): newsletter #1 (si ≥100 emails) · preparación del gate.
- **9-10/9: GATE D90** — decisión formal contra kill criteria (§7).

**Rutinas permanentes desde julio:** día 10-15 de cada mes = rotación IPC + reporte de prensa + check AIO/citas IA + `tools/check-datos-vencen`; cada deploy = ping IndexNow; cada semana = 1 ship + 1 acción de distribución mínimo; cada mes = revisión de este plan.

**Después de D90 (si pasa el gate), la película de diciembre:** el pico de aguinaldo del 18/12 + vacaciones + AUH-diciembre con un sitio ya indexado, con marca y con 6 meses de compounding → ahí se juega el primer mes de 30-50k visitas y los pitches de sponsorship.

---

## 6. Monetización — la escalera con gatillos

| Etapa | Gatillo de activación | Acciones | Ingreso esperado/mes (peor/base/mejor) |
|---|---|---|---|
| **E0 — Fundaciones** | YA | Captura de email · Cafecito (M) · alta Tienda Nube Asociados (M) · mail a Xubio proponiendo esquema de promotor (H redacta, M envía) · Manuel revisa T&C de referidos personales (MP $10k/referido, Prex, Lemon, Ripio, Belo, Wallbit) y decide cuáles publicar | ~0 (siembra) |
| **E1 — Display base** | DNS + indexado + ≥5 artículos (ventana 22/7-15/8) | Aplicar AdSense → al aprobar: W-8BEN + ads.txt + CMP. **Anti-rechazo:** toda calculadora con 400+ palabras de contexto (ya casi cumplido) | 10k visitas: USD 4/15/31 |
| **E2 — Display premium + referidos** | 1.000 sesiones/mes | Aplicar **Journey by Mediavine** (la única puerta premium abierta: Ezoic cerró, Monumetric exige tráfico anglo) · cajas contextuales de referidos por calculadora con disclosure | +50-150% sobre AdSense |
| **E3 — Leads profesionales** | ~10k visitas/mes o 50+ cálculos/día en monotributo/indemnización | Acuerdos directos de CPL: 3 estudios contables tradicionales (ARS 5-15k/lead — un cliente les vale 60-125k/mes) + 1-2 laboralistas (ARS 10-30k/lead calificado). H redacta pitches con datos de intención; M cierra por llamada. NO con Contablix/Servidos (competencia) | 50k visitas: USD 60/360/940 total stack |
| **E4 — Venta directa** | ~30-50k visitas/mes + media kit por intención | Pitch **"calculadora patrocinada por X"** (formato vacante en AR) a IOL/Cocos/Balanz/fintechs — ya pagan notas y newsletters; sponsor de newsletter | +USD 150-400 por sponsor exclusivo |
| **E5 — B2B** | Marca reconocida (~100k+) | White-label para estudios (ARS 30-80k/mes c/u) · API institucional (modelo dolarito) · Mediavine Official (al llegar a USD 5k/año de ad revenue) | 200k visitas: USD 560/1.780/4.350 total stack |

**Principios:** disclosure siempre visible (afiliados/sponsors marcados); jamás recomendar un producto solo porque paga; los referidos personales son puente (T&C rotan — revisar antes de publicar, diversificar rápido hacia los formales y los deals directos); cada peso a `revenue_events`.

**Proyección honesta a D90:** entre USD 0 y USD 50/mes run-rate. La monetización real llega con el tráfico de la fase dic-2026/2027; lo que se construye ahora son las VÍAS (cuentas aprobadas, deals sembrados, audiencia propia) para que el pico de diciembre no encuentre un sitio sin caja registradora.

---

## 7. Medición, gates y kill criteria

**Árbol de métricas:** `USD (norte) ← tráfico × $/visita + deals` · Leading indicators semanales: páginas indexadas, impresiones GSC, clicks, emails capturados, shares OG (por UTM), embeds activos, menciones/links nuevos, citas IA (mensual).

| Gate | Fecha | Mínimo para seguir sin cambios | Señal de alarma |
|---|---|---|---|
| **G0 — DNS** | 16/6 | `calcular.ar` resuelve | Sigue NXDOMAIN → activar contingencia CAL-011 + escalar a Manuel |
| **G1 — Pico aguinaldo** | 1/7 | Sprint shipped + ≥1 acción de distribución ejecutada + primeras visitas medidas | Cero ships → revisar capacidad de ejecución |
| **G2 — Indexación** | 31/7 | Indexado en Google + impresiones GSC en ≥10 keywords + AdSense aplicado + ≥1 pickup (prensa/comunidad/creator) | Sin indexar a 30 días de DNS → auditoría técnica |
| **G3 — D90** | 9-10/9 | **Kill criteria HIPOTESIS:** ≥500 visitas orgánicas/mes en camino + impresiones crecientes ≥5 keywords del cluster monotributo. **Stretch:** 3.000 visitas/mes totales, 300 emails, AdSense aprobado, 1 deal de leads en negociación | Kill criteria incumplidos → sesión de autopsia: matar, pivotear clusters o re-hipotetizar con datos |

**Registro:** snapshot semanal de métricas en PROGRESS; mensual en `docs/research/seguimiento-calcular/` (creado en CAL-039). Revenue SIEMPRE en `revenue_events` aunque sea $0,50.

---

## 8. BACKLOG EJECUTABLE

> Convenciones: `Tipo` ∈ build / contenido / outreach / config / decisión / ops · `Owner`: H (Hornero), M (Manuel), H+M (H prepara, M ejecuta el paso manual) · `Dep`: IDs que deben estar hechos antes · `Verify`: criterio mecánico de done. Estado inicial de todas: **pendiente**. Las fechas gatillo son del calendario real argentino, no estimaciones.

### Fase 0 — Sprint Aguinaldo (12-30/6)

| ID | Tarea | Tipo | Owner | Dep | Verify |
|---|---|---|---|---|---|
| CAL-001 | **Delegar DNS `calcular.ar` en nic.ar** (ns1/ns2.vercel-dns.com) — ya instruido en INBOX/mensaje #7. **Bloquea: GSC, Bing, indexación, AdSense** | config | M | — | `nslookup calcular.ar` resuelve; `curl -sI https://calcular.ar` → 200 |
| CAL-002 | Rotar datos IPC mayo (salió 11/6: 2,1% — `gen_ipc_serie.ts` + `INFLACION_DEFAULT` + TNA check + `check_inflacion.ts` + deploy) | build | H | — | 35 checks OK; /inflacion muestra mayo 2026 |
| CAL-003 | Página **"Aguinaldo: bruto vs neto (en mano)"** answer-first: cifra+fecha arriba, tabla por rangos de sueldo, tope de aportes, ¿paga Ganancias?, schema FAQPage. Cubre el gap que ningún motor IA resuelve | build | H | CAL-002 | build verde; página en sitemap; FAQPage validado |
| CAL-004 | Serie "¿cuánto cobro si trabajé 1-6 meses?" (sección/anchors en /aguinaldo) + FAQ ampliada con las 11 preguntas reales del research §2.4 | build | H | — | anchors linkeables; FAQ ≥11 ítems |
| CAL-005 | Página "Cuándo se paga el aguinaldo por provincia" (tabla provincias + estatales/docentes, fechas con fuente, actualizable) | build | H | — | build verde; ≥10 provincias con fuente |
| CAL-006 | **OG image dinámica del resultado + botón "Compartir por WhatsApp"** en aguinaldo, plazo fijo e inflación (con UTM para medir) | build | H | — | preview WA muestra la imagen con el monto; UTM llega a Analytics |
| CAL-007 | `/llms.txt` + verificación robots permite GPTBot/PerplexityBot/ClaudeBot/Google-Extended + dateModified real en schema + "Última verificación" visible en TODAS las calculadoras | build | H | — | llms.txt accesible; robots sin bloqueos AI |
| CAL-008 | IndexNow: key file + ping automático post-deploy (script en CI o manual documentado) | build | H | — | key file accesible; ping 200 en deploy de prueba |
| CAL-009 | Bing Webmaster Tools: alta + sitemap (se puede importar de GSC) | config | H+M | CAL-001, CAL-010 | sitio verificado en Bing WT |
| CAL-010 | GSC: TXT por Vercel DNS + verificar + enviar sitemap (instrucciones ya en INBOX) | config | H+M | CAL-001 | propiedad verificada; sitemap "Correcto" |
| CAL-011 | **Contingencia DNS:** si 16/6 18:00 sigue NXDOMAIN → quitar redirect 308 para servir contenido en `calcular-ar.vercel.app` durante el pico (reversible al delegar) + avisar a Manuel | build | H | gatillo 16/6 | sitio responde 200 en vercel.app; tarea revertida al resolver DNS |
| CAL-012 | Capa editorial: sección `/blog` (NewsArticle schema, autor con bio, imágenes 1200px) + 2 piezas: "Qué hacer con el aguinaldo 2026" (linkea plazo fijo/UVA/inflación) y "¿El aguinaldo paga Ganancias?" | contenido | H | — | 2 posts en sitemap con schema válido |
| CAL-013 | Mini-reporte de prensa aguinaldo ("cuánto rinde el medio SAC 2026 vs inflación") a 15 medios regionales + Melisa Reinhold (LN). H redacta mails personalizados; M envía desde su correo | outreach | H+M | CAL-003, CAL-012 | enviados registrados en `docs/research/seguimiento-calcular/outreach.md`; objetivo ≥1 pickup |
| CAL-014 | Post r/merval semana 23-27/6: "Hice una calculadora de aguinaldo neto (tope de aportes + Ganancias) — feedback bienvenido". Requiere cuenta de M con algo de historial; si no hay, degradar a comentarios-respuesta | outreach | H+M | CAL-003, CAL-006 | post publicado o decisión documentada de skip |
| CAL-015 | DMs/mails a Soy Jurista + Manuela Iglesias + Jael Caglioti regalando cálculo exclusivo (indemnización pre/post 27.802 para él; recategorización para ellas) | outreach | H+M | CAL-003 | 3 contactos enviados y registrados |
| CAL-016 | **Captura de email v1:** "Recibí tu cálculo en PDF + avisos cuando cambian tus datos" → tabla `subscribers` en Supabase (RLS insert-only) + envío del PDF (Resend free tier u opción que M apruebe) | build | H+M | — | alta de prueba OK; mail recibido |

### Fase 1 — Recategorización + maquinaria mensual (1/7-4/8)

| ID | Tarea | Tipo | Owner | Dep | Verify |
|---|---|---|---|---|---|
| CAL-017 | Refresh recategorización para la ventana 1/7-5/8 (copy "julio 2026", FAQ de oficio/billeteras/Mercado Pago, fechas ARCA verificadas) — **antes del 1/7** | build | H | — | página actualizada con fecha visible |
| CAL-018 | Artículo "Recategorización julio 2026 paso a paso" + actualización del hub monotributo | contenido | H | CAL-017 | post publicado |
| CAL-019 | **"Índice CalculAR del sueldo real"**: script generador mensual (IPC nuevo → reporte con datos + texto) + página `/sueldo-real` del mes. Primera corrida con IPC junio (~13/7) | build | H | CAL-002 | página live; reporte generado automáticamente |
| CAL-020 | Circuito de prensa mensual: lista curada de ~20 redacciones + template + corrida cada mes al salir el IPC (primera: 13-15/7) | outreach | H+M | CAL-019 | corrida #1 enviada y registrada |
| CAL-021 | **Cluster empleada doméstica** (score 8.5 — el mejor hueco): calculadora de sueldo (categoría/hora/con o sin retiro, escalas CNTCP Res 4/2026 verificadas en B.O.) + aguinaldo doméstica + liquidación/indemnización doméstica + página "escalas del mes" | build | H | — | 4 páginas live; casos borde con script check; fuentes citadas |
| CAL-022 | Spike: fuente estable para **tabla TNA por banco** (el comparador del BCRA timeoutea desde datacenters — evaluar carga semanal manual con fecha visible vs APIs alternativas). Si hay fuente → construir la tabla | build | H | — | decisión documentada; si GO: tabla live con fecha |
| CAL-023 | **AdSense:** aplicar (requiere CAL-001/010 + ≥5 piezas editoriales + checklist research §3.1). Al aprobar: W-8BEN inmediato + ads.txt + CMP de Google. H prepara todo; M hace el alta | config | H+M | CAL-001, CAL-010, CAL-012, CAL-018 | solicitud enviada; al aprobar: ads sirviendo + W-8BEN cargado |
| CAL-024 | **Journey by Mediavine:** al cruzar 1.000 sesiones/mes → instalar script Grow + aplicar | config | H+M | gatillo 1k sesiones | aplicación enviada |
| CAL-025 | Altas de monetización E0: Tienda Nube Asociados + mail a referidos@xubio.com proponiendo esquema de promotor + Cafecito | config | H+M | — | cuentas activas; links trackeados guardados en `.env.local`/doc privado |
| CAL-026 | Decisión referidos personales: M revisa T&C in-app (MP, Prex, Lemon, Ripio, Belo, Wallbit) y aprueba cuáles publicar | decisión | M | — | lista aprobada documentada |
| CAL-027 | Cajas de recomendación contextual por calculadora (plazo fijo → fintech/sponsor; monotributo → SaaS facturación; indemnización → CTA consulta) con **disclosure visible** | build | H | CAL-025, CAL-026 | cajas live solo en páginas aprobadas; disclosure presente |
| CAL-028 | Rotación semestral: escalas monotributo vigencia 1/8 (ARCA publica fines de julio — fuente oficial, nunca blogs) + tablas Ganancias jul-dic | build | H | gatillo 28/7-1/8 | datos nuevos con vigencia visible; checks OK |

### Fase 2 — Clusters + loops B2B (5/8-8/9)

| ID | Tarea | Tipo | Owner | Dep | Verify |
|---|---|---|---|---|---|
| CAL-029 | **Cluster jubilación v1:** wizard "¿me puedo jubilar?" (edad+aportes → jubilación/Plan de Pago/PUAM, estado legal post-moratoria verificado) + "¿cuánto cobraría?" + página haberes del mes (movilidad mensual) | build | H | — | 3 páginas live; fuentes ANSES citadas; check de casos |
| CAL-030 | ICL: ajuste de alquiler por ICL (API BCRA) + comparador "¿tu contrato ajusta por ICL, IPC o Casa Propia?" + serie "ICL [mes] 2026" | build | H | — | páginas live; valores vs BCRA verificados |
| CAL-031 | **API pública v1** (`/api/v1/`: aguinaldo, indemnización, inflación, monotributo) + página de docs + atribución requerida | build | H | — | endpoints 200 con ejemplos; docs live |
| CAL-032 | Lanzar la API en r/devsarg + X dev AR ("API abierta de cálculos laborales argentinos, sin key") | outreach | H+M | CAL-031 | post publicado; registro de adopción |
| CAL-033 | Widget embebible (tabla TNA + calculadora aguinaldo) con atribución + página `/embeber` | build | H | CAL-022 | iframe funcional en página de prueba externa |
| CAL-034 | Outreach embeds: 10 estudios contables chicos + 5 medios regionales ("tabla siempre actualizada, gratis, con fuente") | outreach | H+M | CAL-033 | 15 contactos registrados; objetivo ≥2 embeds activos |
| CAL-035 | Artículo en Rankia Argentina (acepta colaboraciones — comunidad + backlink) + respuestas útiles en foro Rava | outreach | H+M | — | artículo publicado con link |
| CAL-036 | Cluster Ganancias 4ª: calculadora de retención + "¿el aguinaldo paga Ganancias?" interactivo + simulador devolución SIRADIG (listo ANTES del pico de marzo) | build | H | CAL-028 | calculadora live; tablas ARCA citadas |
| CAL-037 | Sueldo neto por convenio: v1 Comercio (escalas FAECYS) — entrar por convenio, NO pelear el head term | build | H | — | página live; escala con fuente y vigencia |
| CAL-038 | Newsletter #1 "Tus números del mes" (gatillo: ≥100 emails) — herramienta de envío a aprobar por M | contenido | H+M | CAL-016 | envío #1 salido; open rate medido |
| CAL-039 | Monitoreo mensual instituido: check AIO Google AR (3 queries) + citas Perplexity/ChatGPT (5 queries) + posiciones GSC top-20 + `tools/check-datos-vencen` → snapshot en `docs/research/seguimiento-calcular/` | ops | H | CAL-010 | primer snapshot guardado; rutina en PROGRESS |
| CAL-040 | **GATE D90 (9-10/9):** evaluación formal contra §7 + decisión documentada en DECISIONS.md (seguir/pivotear/matar) | decisión | H+M | todo lo anterior | ADR escrito |

### Deals y canales (se activan por gatillo de tráfico, no por fecha)

| ID | Tarea | Tipo | Owner | Gatillo | Verify |
|---|---|---|---|---|---|
| CAL-041 | Leads contables: pitch de CPL a 3 estudios tradicionales SIN calculadora propia (H arma el deck con datos de intención; M llama/cierra) | outreach | H+M | ~10k visitas/mes o 50 cálculos/día en monotributo | ≥1 acuerdo de prueba (10 leads) |
| CAL-042 | Lead laboralista: formulario post-cálculo de indemnización ("¿querés que un especialista revise tu caso?") + acuerdo con 1-2 estudios. Encuadre ético: derivación informada, sin promesas | build+outreach | H+M | ~10k visitas/mes | formulario live; acuerdo registrado |
| CAL-043 | Media kit por intención de audiencia + pitch "calculadora patrocinada" a IOL/Cocos/Balanz/fintechs (formato vacante — ser los primeros) | outreach | H+M | ~30-50k visitas/mes | 5 pitches enviados; precio validado |
| CAL-044 | Alianza MARA (Monotributistas Asociados RA): ofrecer la calculadora de recategorización para sus miembros/grupos | outreach | H+M | post-CAL-017 | contacto registrado; respuesta |
| CAL-045 | Canal de WhatsApp "CalculAR" (M crea; H produce los 2 mensajes/semana con datos del día) | config+contenido | M+H | post-Sprint | canal activo; ≥8 mensajes/mes |
| CAL-046 | Identificación manual de los 5 grupos FB más grandes de monotributistas/inquilinos/empleadas domésticas (20 min de M) + plan de participación según reglas de cada grupo | outreach | M | cuando pueda | lista de 5 grupos con reglas anotadas |

### Experimentos (ICE = Impacto·Confianza·Facilidad, 1-10 — correr cuando haya slack, matar sin piedad)

| Experimento | I | C | E | Nota |
|---|---|---|---|---|
| Calculadora "noticiable" (ej: "¿cuántos aguinaldos vale un m² en CABA?" / "tu sueldo medido en asados") | 7 | 4 | 6 | Modelo Omni: prensa-bait con datos reales. Una por trimestre máximo |
| Página comparativa "por qué nuestros números" (transparencia vs competencia, sin nombrar) | 6 | 6 | 8 | Ataca la grieta de confianza sin agresión |
| Shorts/reels con creators usando la calculadora en vivo | 7 | 4 | 5 | Depende de CAL-015 |
| Web Stories para Discover | 4 | 4 | 6 | Solo si Discover muestra tracción |
| Quiz "¿estás en la categoría correcta del monotributo?" compartible | 6 | 5 | 7 | Pre-recategorización dic-ene |

---

## 9. Riesgos y pre-mortem ("ya fracasó: ¿por qué?")

| # | Riesgo | Prob. | Mitigación |
|---|---|---|---|
| 1 | **DNS nunca se delegó a tiempo y el pico de aguinaldo pasó con el sitio caído** | media | CAL-011 (contingencia 16/6) + escalado en INBOX/mensaje. Es LA tarea de esta semana |
| 2 | AIO aterriza en AR y se come el CTR informacional | media | Las queries core son transaccionales (la calculadora ES el destino); GEO-ready desde el día 1 (CAL-003/007/008); audiencia propia (email/WA) como vacuna; monitoreo mensual CAL-039 |
| 3 | Google trata las series programáticas como thin content | media | Solo series con demanda real verificada y contenido sustantivo por página; no spamear variantes; calidad sobre cantidad |
| 4 | AdSense rechaza por "low value" | media | Checklist research §3.1 (400+ palabras/calculadora, capa editorial) ANTES de aplicar; re-aplicar a los 15-20 días corregido |
| 5 | Referidos cambian T&C o prohíben uso en sitios | alta | Son puente, no base: priorizar formales (Tienda Nube/Xubio) y deals directos; revisar T&C antes de publicar (CAL-026) |
| 6 | Los clones (servidos.ar) copian las features | alta | El moat no es la feature: es la frescura automatizada + marca + changelog + comunidad. Velocidad: llegar primero a doméstica/jubilación/ICL |
| 7 | APIs oficiales rotan o caen | media | Ya mitigado: `tools/check-apis.ts`, fallbacks fechados, datos embebidos en build |
| 8 | Cuello de botella en pasos manuales de Manuel | media | Batching: máximo 1-2 asks/semana vía INBOX; todo lo demás autónomo; los asks llevan guía paso a paso |
| 9 | Caída de tráfico post-picos (julio, enero) genera pánico | alta | Esperada y documentada acá: medir contra el calendario estacional (§research 2.1), no contra la semana anterior |
| 10 | Un error de cálculo viral destruye la confianza (YMYL) | baja | Scripts de verificación con casos borde (práctica ya instalada), transparencia del paso a paso, changelog, corrección pública rápida si pasa |

**Kill criteria (sin cambios, heredados de HIPOTESIS.md):** 90 días sin señal desde el deploy (11/6) → D90 = 9/9/2026. Sin ≥500 visitas orgánicas/mes en camino ni impresiones crecientes → autopsia y decisión documentada. Este plan no cambia la vara: la hace alcanzable.

---

## 10. Qué necesita Manuel esta semana (resumen para INBOX)

1. **Delegar el DNS (2 min, bloquea todo)** — instrucciones ya enviadas (mensaje #7).
2. Cuando resuelva: código de verificación de Search Console (5 min, instrucciones en INBOX).
3. Decisión rápida: ¿tiene cuenta de Reddit con historial para CAL-014? (si no, se degrada la táctica, no pasa nada).
4. Lo demás (altas Tienda Nube/Xubio/Cafecito/WhatsApp, T&C de referidos) se activa por gatillo — Hornero avisa cuando toque, con guía.
