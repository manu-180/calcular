# Estado de calcularya.com (multi-país)

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
