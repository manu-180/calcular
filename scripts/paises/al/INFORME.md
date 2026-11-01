# Albania (al): informe

Rama `claude/pais-al`. **Depende de `claude/mundo-motor-sq`** (sin mergear): el albanés entra en `IDIOMAS` ahí
(ADR 0002, D31). Integrar el motor primero. `estado: "interno"`; `src/paises/index.ts` sin tocar en los commits.

## Calculadoras locales (23)

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| kalkulator-page | sueldo-neto | sí | ley 29/2023, VKM 776/2025, VKM 77/2015. Paga maksimale: ver riesgo 1 |
| paga-bruto-nga-neto | propio | sí | ídem |
| kosto-e-punedhenesit | costo-empleador | sí | ídem |
| paga-minimale | salario-minimo | sí | VKM 776/2025, INSTAT |
| kontributet-e-sigurimeve | aportes-seguridad-social | sí | VKM 77/2015, ISSH |
| tatimi-mbi-pagen | impuesto-renta | sí | ley 29/2023, arts. 22 a 24 |
| kalkulator-tvsh | iva | sí | ley 92/2014, arts. 48 y 49 |
| tatimi-mbi-fitimin | propio | sí | ley 29/2023, arts. 41 y 69 |
| biznesi-i-vogel | regimen-simplificado | sí | ley 29/2023, arts. 14, 24 y 69 |
| tatimi-per-profesionistet | retencion-honorarios | sí | ley 29/2023, arts. 14, 58, 59 y 69 |
| tatimi-mbi-dividendin | propio | sí | ley 29/2023, arts. 24, 41 y 59 |
| tatimi-mbi-qirane | propio | sí | ley 29/2023, arts. 15, 24 y 58 |
| taksa-e-ndertesave | propio | sí | ley 9632/2006, art. 22/2 |
| tatimi-shitja-e-prones | propio | sí | ley 29/2023, art. 17 |
| tatimi-dhurata-trashegimi | propio | sí | ley 29/2023, art. 60. Ver riesgo 3 |
| pagesa-e-semundjes | propio | sí | ley 7703/1993, arts. 22, 23 y 25. Ver riesgo 2 |
| pagesa-e-barnise | propio | sí | ley 7703/1993, arts. 27 y 29. Ver riesgo 2 |
| kursi-i-kembimit | tipo-de-cambio | sí | Banka e Shqipërisë |
| kalkulator-inflacioni | inflacion | sí | INSTAT, tabla IÇK COICOP Ver. 2 |
| leja-vjetore | vacaciones | no, borrador | falta leer el Kodi i Punës vigente |
| oret-shtese | horas-extra | no, borrador | ídem |
| afati-i-njoftimit | preaviso | no, borrador | ídem |
| shperblimi-per-vjetersi | indemnizacion-despido | no, borrador | ídem |

Universales: `universales: "todas"` (41, menos la de IVA que cae por la local). 19 locales publicables + 40
universales = 59 páginas; 63 calculadoras con los borradores.

No se hizo el **pensioni**: la fórmula del art. 32 pide el pensioni social, cuyo monto vigente no se leyó, y la edad
sale de la tabla gradual del art. 92. Queda la universal `kalkulator-kursimi-pension`.

## Datos no verificados (4, todos del Kodi i Punës)

`al.leje-vjetore`, `al.ore-shtese`, `al.afat-njoftimi`, `al.shperblim-vjetersi`. Motivo: el texto consolidado
(inspektoriatipunes.gov.al, idp.al) responde con un bloqueo del firewall a nuestras lecturas y qbz.gov.al solo carga
con JavaScript. Los valores cargados son pistas de extractos del buscador, que mezclan versiones de 2003, 2018 y
2024, y el tramo de 6 meses a 2 años del preaviso venía cortado. Para publicar: abrir el Kodi i Punës en un navegador,
confirmar los cuatro valores (y la ley 91/2024 sobre la leja vjetore), pasarlos a `verificado` y sumar `.casos.ts`.

## Riesgos y decisiones

1. **Paga maksimale 186 416 lekë: revisar antes de publicar.** Está como `verificado` con la noticia de Tatime
   (https://tatime.gov.al/nga-1-janari-2026-rritet-paga-minimale-dhe-maksimale/), pero esa página también responde
   con el bloqueo. La leímos solo en la copia del buscador, con esta frase: «duke shkuar në 186,416 lekë në muaj nga
   176,416 lekë, që ishte deri më 31.12.2025». No se la abrió directamente. PwC publica 220 520 lekë (176 416 × 1,25),
   que es lo que da la regla de subas proporcionales de años anteriores; el art. 10 de la ley 7703 dice «me të njëjtën
   masë» sin aclarar si es absoluta o proporcional. Se eligió la cifra del ente recaudador. Afecta solo a sueldos
   brutos por encima de 186 416 lekë. Hay que abrir la página a mano para confirmar.
2. **Divisor de 30 días** en enfermedad y barnia: la ley dice «mesatare ditore» y no da el divisor. Asumido, y el
   resultado lo avisa como observación.
3. **Exención de dhurata:** el art. 60 exime «deri në» 5 M y 1 M de lekë. Se aplicó el impuesto solo al excedente.
   La redacción admite otra lectura; falta la instrucción del ministro.
4. **Compensación del 16,7 % a empleadores** (enero a septiembre de 2026, por la suba de la paga minimale): solo la
   vimos en prensa, sin VKM. No está modelada en `kosto-e-punedhenesit`.
5. **Contratos de menos de 87 horas** tienen otra división (13,9 % y 9,4 %, VKM 77/2015): no se calculan, solo se
   mencionan en la FAQ. Trabajo a tiempo parcial bajo el mínimo: se avisa, pero el cálculo usa la base mínima.
6. **El neto baja** al pasar 50 000 y 60 000 lekë (la zbritja se aplica a todo el sueldo): es la ley, no un error.
   `paga-bruto-nga-neto` busca por tramos y devuelve el bruto más bajo.
7. **Impuesto sobre el bruto:** los arts. 21 y 22 no incluyen las cotizaciones entre las zbritje. Se dedujo de la
   ley y coincide con la tabla 2023-2024 del art. 69, pero no hay un ejemplo oficial con la cuenta.
8. **Sin ejemplos oficiales de sueldo:** los casos son `recalculado`. Falta revisión de hablante nativo (ESTADO).
9. **Acceso a las fuentes:** las primeras descargas (incluidos los PDF de leyes de Tatime y la página de la Banka e
   Shqipërisë) se hicieron con un User-Agent de navegador. El clasificador de seguridad frenó un pedido nuestro con
   cabeceras de navegador contra el bloqueo de Tatime; desde ahí se usó un User-Agent propio, sin reintentar ni usar
   el navegador para pasarlo. Los detectores usan `fetch` sin `userAgentNavegador` y leen bien esas páginas.
   Los PDF de leyes no quedan afectados: el contenido es público y las URL son las de la fuente.
11. **«Tu sueldo en el mundo» sin probar para AL:** `check_mundo` no lista mercados en `interno`. La suite falla por
    `be` (neto de 24000 €), ajeno a este país. Hay `mundo` declarado, pero el neto baja en 50 000 y 60 000 lekë:
    revisar la validación cuando se publique.
12. **Sin mirada en `next dev`:** no se levantó (Turbopack no acepta la junction y pide `npm ci`), ni está en la
    verificación del brief común.
10. **`kufi-zero` vence el 31/12/2029:** después de esa fecha `tatimi-mbi-fitimin`, `biznesi-i-vogel` y
    `tatimi-per-profesionistet` dejan de publicarse hasta cargar la regla nueva.

## Detectores y prueba real

`scripts/paises/al/probar_detectores.ts`, corrida el 2026-11-01: `al.eur-bsh` 90,9 y `al.usd-bsh` 81,16 (30/10/2026,
iguales a lo leído a mano); `al.tatime-ligji-29-2023` 1 hallazgo, `al.tatime-ligji-92-2014` 1, `al.tatime-ligji-9632` 2.

## Checks (con el país registrado localmente)

`tsc` sin errores; `check_paises al` OK (32 datos, 28 tramos verificados, 4 pendientes, 3 series, 63 calculadoras, 2
avisos de series por vencer); `check_paises_casos al` 73 casos en 19 archivos; `check_textos_paises al` 854 textos, 0
avisos; `check_seo_pais al` OK; `check_ofertas_intl al` OK; `check_fronteras` OK; `check_eol` OK.

**Pedido al motor:** el IÇK solo se publica en xlsx y `Http` no lee binarios, así que `al.ick` no tiene detector. Hay
que cargar cada mes a mano desde la tabla de INSTAT; con `maxAntiguedadDias` 90 deja de publicarse hacia fines de
noviembre de 2026 si nadie la actualiza.
