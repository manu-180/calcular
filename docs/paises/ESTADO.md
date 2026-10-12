# Estado de calcularya.com (multi-país)

Última actualización: 2026-10-12 (sesión «calcularya igual a calcular.ar, con 16 países completos»).
Rama de integración `claude/calcularya-tanda2`; estado por país en la tabla de abajo.

## Tanda 2 (12/10/2026): paridad total con calcular.ar y 614 calculadoras

Pedido de Manuel: misma experiencia que calcular.ar al detalle (foco verde incluido), muchas más
calculadoras por país, algo para vender en cada una, arrancar en el país de la persona, novedades
automáticas y datos citados a su fuente.

| País | Antes | Ahora (publicadas) | Notas de la expansión |
|---|---|---|---|
| Paraguay `py` | 14 | 44 | 3 series nuevas del BCP (real, peso argentino, euro) |
| Colombia `co` | 18 | 43 | reforma pensional 1/4/2027 y reforma tributaria 2026 con aviso |
| Perú `pe` | 17 | 41 | 56 datos, 0 sin verificar; serie del FSD |
| México `mx` | 16 | 40 | CETES (4 series), detectores de Banxico con reintento; `retiro-por-desempleo` en borrador |
| Uruguay `uy` | 14 | 40 | serie UR; topes del BPS con detector |
| Costa Rica `cr` | 12 | 40 | TBP del BCCR; `salario-base` en borrador |
| República Dominicana `do` | 13 | 40 | Ley 30-26 (retenciones 15 % desde 1/7/2026); IPC sin detector |
| Panamá `pa` | 12 | 40 | Ley 462 de 2025 (CSS) |
| Nicaragua `ni` | 12 | 40 | 69 datos, 0 sin verificar |
| Ecuador `ec` | 15 | 39 | `jubilacion-iess` en borrador (pensiones mínima/máxima solo en prensa) |
| Chile `cl` | 14 | 38 | Ley 21.735 (cotización del empleador por tramos); caso de UF corregido |
| Bolivia `bo` | 14 | 36 | `horas-extras` sigue en borrador (recargo sin fuente legible) |
| Guatemala `gt` | 8 | 36 | IVA, bonificación incentivo y sueldo líquido pasaron a publicado |
| Honduras `hn` | 9 | 36 | décimo tercer mes publicado (Decreto 112-82 leído); salario neto y costo empleador en borrador (techo IHSS 2026) |
| El Salvador `sv` | 9 | 33 | ISSS y aguinaldo 2026 verificados |
| Venezuela `ve` | 9 | 28 | solo lo que tiene fuente https: IVSS, FAOV, UT e IGTF quedan en borrador |

Cada país tiene `docs/research/paises/<m>-expansion.md` con la lista rankeada por demanda, lo
construido, lo descartado y por qué, y los riesgos legales.

**Plataforma (lo que cambió además de los países):**
- **Paridad visual con calcular.ar:** las páginas intl usan la misma página de una columna, campos,
  foco verde, resultado, FAQ (`AcordeonesFluidos`) y caja de fuentes que AR. Ya no hay botón
  «Calcular»: recalcula en vivo como AR (`src/motor/ui/estilos.css`, `PielCalculadora.tsx`,
  `PaginaCalculadora.tsx`, `cliente.tsx`).
- **Arranque en tu país:** la raíz muestra «Estás en México» por `/api/geo` (nunca redirige por
  IP); la elección se guarda en `localStorage` (`cy-pais`) y al volver a `/` lleva directo al país.
  Selector del header con buscador y equivalentes por concepto (cambiar de país desde una
  calculadora abre la misma calculadora en el destino). `src/motor/ui/{Inicio,ArranquePais,SelectorPais,AvisoPais}.tsx`.
- **Datos vivos a la vista:** sello «Datos verificados en fuente oficial el …» (la fecha más vieja de
  los datos que usa la página) y «actualizado hoy/ayer» por serie (`src/motor/frescura.ts`,
  `Sello.tsx`). `/<m>/novedades` junta las notas editoriales con un registro automático de
  cambios (tramos nuevos, próximos a regir, último punto de cada serie, revisiones) y publica un
  feed Atom en `/<m>/novedades.xml` (`src/motor/novedades.ts`).
- **Ofertas por concepto dentro del resultado:** 79 productos (78 informes PDF + la planilla),
  definidos por concepto en `src/lib/pagos/ofertas-intl.ts`: una calculadora nueva de un concepto
  con oferta la recibe sola. Los números de la persona viajan al producto (`src/lib/prefill/intl*.ts`,
  `ca_checkouts.datos`). `src/motor/ui/Oferta.tsx`, `/<m>/informes/**`. Precios USD 5 a 9.
- **PayPal en vivo:** credenciales de la app live de APEX cargadas en Vercel Production
  (`PAYPAL_*`), webhook `https://calcularya.com/api/pagos/paypal/webhook` creado por REST. Las
  planillas intl muestran «Comprar por USD 7» en vez de «Pronto».
- **Seguridad (auditoría del 12/10):** la marca de venta en `revenue_events.note` es una huella
  HMAC (no el id de captura, que abre el informe), sin mail del comprador; `revoke select` de
  `anon`/`authenticated` sobre `revenue_events` aplicado en la base; el webhook captura solo
  órdenes con referencia propia; sandbox nunca vende en producción; headers privados en
  `/:mercado/informes/:informe/ver` y `/:mercado/planillas/gracias`.
- **Checks:** `check_fronteras` admite puentes acotados del motor a la capa de cobro intl;
  `check_frescura` tolera un día de desfase horario entre quien verifica (AR) y el mercado.

**Pendiente de Manuel:** URI de Google (`https://calcularya.com/auth/google/vuelta`) y
`NEXT_PUBLIC_GOOGLE_INTL_ACTIVO=1`. Nada más: PayPal y el SQL ya están.

**Pedidos al motor que repitieron varios países (próxima obra):** marcador para filas de una
escala (`{{id[fila]}}`), unidad «semanas», historia completa de una serie o de los tramos de un
dato desde `calcular()`, calendario de feriados por país, `opcion-dato` con `mapa-por-region`.

---

## Estado previo (8/10/2026)

Última actualización: 2026-10-08 06:30. **Mergeado a `main` (PR #12, `258b61e`).** calcular.ar idéntico
(foto de 244 rutas contra main). calcularya.com sigue redirigiendo a calcular.ar hasta que se cargue
`NEXT_PUBLIC_SITIO_INTL_URL` en Vercel.

## Rama de integración (histórica)

`claude/calcularya-intl` (pusheada). Todo lo integrado vive acá; `main` todavía no tiene nada de intl.

## Hecho e integrado

**Los 16 países publicados y registrados en `src/paises/index.ts`:**

| País | Calculadoras | Nota |
|---|---|---|
| Chile `cl` | 11 | todo verificado |
| Colombia `co` | 14 | FSP 2027 no verificado; detector UVR arreglado (Accept-Language sin región) |
| México `mx` | 14 | leyes de SEGOB/IMSS como primarias |
| Perú `pe` | 13 | RMA y UIT vencen 31/12/2026; sin detector SBS (CAPTCHA) |
| Uruguay `uy` | 11 | voseo |
| Ecuador `ec` | 11 | SBU, renta y canasta vencen 31/12/2026 |
| Costa Rica `cr` | 11 | usted |
| Guatemala `gt` | 8 (+3 borrador) | IVA, IGSS EMA y bonificación Q250 sin fuente legible |
| Paraguay `py` | 12 | voseo |
| República Dominicana `do` (importado como `rd`) | 11 | ISR 2027 no verificado |
| El Salvador `sv` | 9 (+1 borrador) | ISSS sin fuente primaria; reforma del aguinaldo 2026 pendiente de leer en el D.O. |
| Panamá `pa` | 11 | todo verificado |
| Honduras `hn` | 8 (+1 borrador) | décimo tercer mes sin fuente legible |
| Nicaragua `ni` | 10 | tipo de cambio sin detector (BCN: POST + TLS viejo + captcha); serie cargada hasta 31/12/2026 |
| Venezuela `ve` | 8 (+1 borrador) | solo tasa oficial BCV; salario mínimo Bs 130 con aviso; cestaticket en borrador |
| Bolivia `bo` | 12 (+1 borrador) | usted; TCO flotante (salto máx 12 %) |

**Plataforma y arreglos:**
- **Plataforma web (F3):** ruteo por host, SEO, hreflang, UI, aviso de país y partición del JS por calculadora.
- **Motor (F2):** decimales por moneda (enteros sin «,00»; hasta 6 decimales para datos como la UFV).
- **Pipeline de datos (F4):** runner, semáforo y workflow con un solo commit por corrida.
- **Fix A (pipeline):**
  - permisos mínimos;
  - parches validados (solo `series.json`);
  - TLS con intermedios versionados, sin `rejectUnauthorized: false`;
  - redirecciones seguras;
  - issues sin inyección y cerrados recién después de publicar;
  - `iguales()` en bandas;
  - `PAISES_TOLERANTE` ampliado;
  - `ci.yml` en cada PR.
- **Fix B (motor):**
  - el build falla si un país publicado tiene errores;
  - `hoyEn` usa la zona del mercado, con `revalidate` de 1 h;
  - «5.000» ambiguo se rechaza con un mensaje;
  - los gates de preview van por allowlist;
  - `/api` y `/og` de AR bloqueados en calcularya, con `llms.txt` propio;
  - 404 sin imports internos de Next;
  - `cargadores.ts` explícito (181 calculadoras; se regenera con `npx tsx scripts/check_motor.ts --generar-cargadores`);
  - tope en el finiquito de Chile.
- **Checks rápidos verdes después del último merge:** `tsc`, `check_paises`, `check_paises_casos`, `check_textos_paises`, `check_fronteras`, `check_motor`, `check_hreflang`, `check_routing_hosts`, `check_eol` y `check_datos_paises`.

## Activación (pendiente de Manuel) y siguientes pasos

1. Vercel → proyecto calcular-ar → Settings → Environment Variables: `NEXT_PUBLIC_SITIO_INTL_URL` =
   `https://calcularya.com`, solo Production. Después Redeploy del último deployment de producción
   (las `NEXT_PUBLIC_*` se hornean en el build). El conector de Vercel y la CLI de esta máquina no
   tienen permiso para env de producción en este proyecto.
2. Smoke: `calcularya.com/` (selector), `calcularya.com/mx/aguinaldo`, `calcularya.com/sitemap.xml`,
   `calcular.ar/mx/aguinaldo` (308 a calcularya), `calcular.ar/aguinaldo` igual que siempre.
3. `npx tsx scripts/indexnow_intl.ts` (avisa las URLs a Bing/Yandex).
4. Google Search Console: propiedad de dominio calcularya.com (registro TXT en Namecheap) y enviar
   `https://calcularya.com/sitemap.xml`. AdSense: agregar calcularya.com.
5. Decisión de Manuel: hreflang desde calcular.ar (`NEXT_PUBLIC_HREFLANG_AR=1`).
6. Mantenimiento: datos que vencen el 31/12/2026 (UIT y RMA Perú, SBU/renta/canasta Ecuador, ISR 2027
   RD, deducción ISR 2027 Guatemala, zona franca Nicaragua) los marca el semáforo de `datos-paises.yml`.
7. Mejoras no bloqueantes: 79 calculadoras pasan 130 KB de HTML (mediana 129 KB; Lighthouse móvil
   93-97); `registro.pagina()` crece cuadrático con los equivalentes (memo en `tarjetaDe`, arreglo de
   fondo en `registro.ts`); zz aparece en el selector solo en preview.

## Pedidos al motor (no bloquean)

- Requisitos opcionales en una calculadora (zona franca de Nicaragua).
- `Http` con POST y TLS legado (BCN Nicaragua, Banguat SOAP).
- `opcion-dato` con `mapa-por-region` (Panamá).
- `aplicarEscala` "sobre el exceso de" el límite anterior (El Salvador lo resolvió con una función propia).
- `http.binario` para XLSX oficiales (BCRD, BCV).

## Decisiones tomadas

- Colombia en tú (la investigación decía usted).
- México: SEGOB (ordenjuridico.gob.mx) e IMSS como fuente primaria de leyes.
- Un país con todo verificado entra como `publicado`; lo no verificado no se publica.
- Nunca se salta un CAPTCHA, Cloudflare o Incapsula: el dato queda `no-verificado`.
- Mobbin y 21st no estaban conectados: el diseño de calcularya es criterio propio (`diseno-maestro`, `high-end-visual-design`).
