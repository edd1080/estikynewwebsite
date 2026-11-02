# Handoff: website público de Estiky

Última actualización: 2 de noviembre de 2026
Repo: https://github.com/edd1080/estikynewwebsite, rama `main`, en la raíz del repo (no en `web/`).

Este documento es la fuente de verdad para seguir desarrollando el sitio. Reemplaza al handoff original (`website-handoff.md`), al prompt inicial y al `DESIGN.md` de referencia. Recoge las decisiones del dueño durante la primera sesión. Si algo de aquí choca con esos documentos viejos, gana este.

---

## 1. Qué es Estiky (verdad de producto, actualizada)

Estiky es una plataforma de **publicidad exterior on-demand** en **Ciudad de Guatemala**. Las marcas (anunciantes) ponen su publicidad en wraps instalados en autos particulares de conductores verificados que circulan por la ciudad.

- La marca viaja en autos reales que hacen rutas reales.
- La circulación se mide con **GPS** durante los viajes que el conductor inicia y detiene desde su app.
- El anunciante tiene un **panel (dashboard) en tiempo real**: crea, monitorea y administra sus campañas, y ve métricas en cualquier momento.
- La operación es **asistida**: Estiky verifica conductores y vehículos, produce e instala el wrap, coordina el retiro y gestiona aprobaciones y pagos.

### Cambios del dueño respecto al handoff original (obligatorios)

1. **No hay "piloto cerrado".** No mencionar "piloto 2026" ni "piloto cerrado". Solo decir **Ciudad de Guatemala**.
2. **No hay reportes quincenales para el anunciante.** Todo se ve **en tiempo real, en cualquier momento**, desde el panel. Lo quincenal es solo el **pago al conductor**.
3. **El CTA principal del anunciante es registrarse** ("Crear cuenta de anunciante"), no "solicitar propuesta". "Hablar con ventas" (`/demo`) queda como secundario.
4. La landing es **para anunciantes** y todo el copy vende Estiky. Los conductores tienen su superficie aparte en `/conductores`, que es secundaria.
5. **El hero es claro** (no dark) y conserva siempre la **ciudad isométrica** con autos con wrap circulando y burbujas de impresiones.

### Qué puede hacer el anunciante en el panel (lo que prometemos)

- Crear una campaña: definir zonas, fechas, formato y presupuesto, y enviarla a revisión.
- Ver el estado real de cada campaña: borrador, en revisión, aprobada, activa, rechazada **con motivo**, finalizada.
- Ver el avance en tiempo real: km verificados, zonas cubiertas, vehículos participando, impresiones estimadas.
- Ver el mapa en vivo y los trayectos (cada viaje con distancia y duración).
- **Límite honesto:** hoy el control es de **visibilidad y decisión**. Pausar, mover zonas o ajustar presupuesto se hace **con el equipo, de forma asistida**. Si el producto cambia (la "Feature 007"), actualizar esa frase a "pausas, ajustas el ritmo y lo ves en vivo tú mismo".

---

## 2. Reglas de contenido (no negociables)

1. Español de Guatemala, con tuteo. Moneda Q solo para el presupuesto del anunciante.
2. **Prohibido publicar** tarifas por km, ganancias del conductor, montos de pago o calculadoras de ingreso. Eso vive dentro de la app.
3. **Prohibido inventar** clientes reales, logos reales, testimonios, prensa, tamaño de flota, ROI, conversiones o "miles de conductores".
4. **No mezclar audiencias.** Las páginas de anunciantes no hablan de ingresos del conductor. Las de conductores no hablan de campañas de marca.
5. No afirmar personas únicas, recordación ni conversiones. Las impresiones son **estimadas**.
6. Las maquetas con números llevan siempre la etiqueta "Datos ilustrativos", "Vista ilustrativa", "Simulación ilustrativa" o "Ejemplo de estructura".
7. Las marcas de los wraps son **ficticias**: Café Aurora, FITZONE (fitzone.gt), Frutiko, y "Marca Ejemplo" en el panel. Estiky aparece con su propia app.
8. Tono directo y vendedor, pero sin superlativos vacíos ("líder", "el mejor", "revolucionario").
9. Datos reales que sí se pueden usar: la campaña de prueba **"Testin 1"** con viajes registrados por GPS, el proceso de verificación de conductores y la operación en Ciudad de Guatemala.

---

## 3. Copy comercial de la plataforma (dado por el dueño)

**Posicionamiento:** "Estiky te da un panel donde tu campaña deja de ser una caja negra: ves cómo avanza, con qué evidencia y qué decisión tomar."

**Los 5 argumentos.** Están en `src/lib/platform.tsx`.

1. **Autonomía:** tú creas la campaña, defines zonas, fechas y presupuesto, y la envías a revisión. *"Tú decides el alcance; nosotros ejecutamos la calle."*
2. **Visibilidad:** estados reales y avance en tiempo real. *"Lo que otros te cuentan al final del contrato, tú lo ves mientras está pasando."*
3. **Evidencia:** GPS por viaje, no estimaciones de tránsito. *"No te vendemos 'mucha gente pasó'. Te mostramos dónde y cuánto circuló tu marca."*
4. **Riesgo controlado:** empiezas con una campaña concreta y escalas con datos. *"Empiezas con una campaña, no con un año."*
5. **Cero carga operativa:** verificación, producción, instalación y retiro corren por Estiky. *"Tú te enfocas en la marca; la operación corre por nuestra cuenta."*

**Guion del recorrido por el panel.** Está en `/plataforma`: resumen → campañas por estado → detalle de una campaña → motivo de rechazo → trayectos. Cierre: "Lo que ves no es una promesa: es la evidencia de la calle, campaña por campaña."

**Comparación sin precios (agencia/OOH vs Estiky):** cuándo arrancas, qué sabes mientras corre, cómo se mide, qué puedes ajustar, carga para tu equipo, compromiso inicial.

**Cierre:** "No compras espacio: compras evidencia y control."

---

## 4. Stack y cómo correrlo

- React 19, TypeScript, Vite 8 y react-router-dom 7. Sin framework de CSS: un solo `src/styles/global.css`.
- Fuentes self-hosted con `@fontsource-variable`: Bricolage Grotesque (display) e Inter (texto).
- `@supabase/supabase-js` para auth.

```bash
npm install
npm run dev
```

`npm run build` corre `tsc --noEmit` y luego `vite build`. `npm run preview` sirve el build en el puerto 4173.

**No hay suite de tests.** La verificación se hizo con:

- `npm run build`.
- Un smoke test con Playwright sobre las 24 rutas en 1440 y 390 px, que revisa errores de consola, desborde horizontal y que exista un `h1`.
- Capturas de pantalla revisadas a ojo.

En un contenedor de Claude Code en la nube, Playwright y Chromium ya vienen instalados: usar `require('playwright')` con `NODE_PATH=$(npm root -g)`.

Ojo al matar `vite preview`: `pkill -f "vite preview"` también mata el shell que lo ejecuta, porque el comando contiene ese texto. Hacerlo en una llamada aparte.

---

## 5. Mapa del código

```
src/
  App.tsx                 rutas (lazy por página)
  main.tsx                fuentes + CSS + router
  styles/global.css       todo el sistema visual (tokens en :root)
  components/
    Layout.tsx            nav (principales + menú "Más"), footer, RoadStrip, data-surface
    IsoCity.tsx           ciudad isométrica en canvas (hero); modos advertiser/driver
    WrapCar.tsx           sedán lateral SVG con 4 campañas de ejemplo
    RoadStrip.tsx         calle fija al pie: autos que avanzan con el scroll
    RoadTimeline.tsx      ruta vertical con auto que avanza con el scroll (pasos)
    panel.tsx             maquetas del dashboard: DashboardMock (interactivo), LiveMap,
                          TripsCard, CampaignList, StatusFlow, Wizard, ImpressionsChart, Activity
    phones.tsx            pantallas de teléfono: DriverStart/Trip/Docs/Pay, AdvPhone
    illus.tsx             Billboard (valla), RouteMini, CaseArt, TrustStack,
                          ImpressionsDiagram, BudgetParts, QuoteSliders, WeeksTimeline
    PanelMock.tsx         SIN USO (reemplazado por DashboardMock); se puede borrar
    ui.tsx                Section, PageHero, Button, Card, Check, Faq, CtaBand (con auto)
    Icon.tsx, Reveal.tsx
  lib/
    config.ts             env + RESPONSE_WINDOW ("2 días hábiles", por confirmar)
    platform.tsx          5 argumentos comerciales
    faq.tsx               FAQ anunciante (por categoría) y conductor
    supabase.ts, handoff.ts, analytics.ts, seo.ts
  pages/
    anunciantes/          Home, Plataforma, Formatos, ComoFunciona, Medicion, Comparativa,
                          Inversion, Casos, Nosotros, Demo, Ayuda, Contacto
    conductores/          Home, Requisitos, Pagos, Seguridad, Ayuda
    Auth.tsx, Legal.tsx, NotFound.tsx
public/                   favicon.svg, og.svg, robots.txt, sitemap.xml
vercel.json               rewrite SPA → index.html
CONTENT.md                inventario de contenido y pendientes (versión anterior; este archivo manda)
```

### Rutas

**Anunciantes:**

- `/` y `/plataforma`, `/formatos`, `/como-funciona`, `/medicion`
- `/comparativa`, `/inversion`, `/casos-de-uso`, `/nosotros`
- `/demo`, `/ayuda`, `/contacto`
- `/legal/terminos`, `/legal/privacidad`
- `/ingresar`, `/registro`

**Conductores:**

- `/conductores` y `/conductores/requisitos`, `/conductores/pagos`
- `/conductores/seguridad`, `/conductores/ayuda`
- `/conductores/ingresar`, `/conductores/registro`

**Otras:** 404.

**Menú superior:**

- Anunciantes: visibles Plataforma, Formatos y Cómo funciona. El resto va en el desplegable "Más": Medición, Inversión, Casos, Comparativa, Nosotros, Ayuda, Contacto.
- Conductores: visibles Requisitos y Pagos. "Más": Seguridad, Ayuda, Contacto.

El dueño pidió explícitamente **no mostrar todas las opciones a la vez**.

---

## 6. Sistema visual

Estilo inspirado en Airbnb: fondos claros cálidos, tarjetas muy redondeadas, una píldora tipo "sticker" con borde y sombra dura, y animaciones con intención.

- **Tokens** (en `:root` de `global.css`):

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#FAF8F3` | fondo |
| `--bg-2` | `#F2EEE5` | fondo secundario |
| `--ink` | `#15122B` | texto principal |
| `--brand` | `#5B3DF5` | violeta del anunciante |
| `--pop` | `#C8F31D` | lima de acento |
| `--coral` | `#FF5C7A` | coral |
| `--sun` | `#FFC93C` | amarillo |
| `--sky` | `#35C4FF` | celeste |

- **Superficie de conductores:** `:root[data-surface='driver']` cambia `--brand` a verde `#087F52`. `Layout.tsx` pone `data-surface` según la ruta.
- **Tipografía:** titulares en Bricolage 800 con tracking negativo. El realce `.hl` es la palabra en color de marca con subrayado lima.
- **Botones** compactos: `md` mide 40 px de alto y `lg` 48 px. El dueño se quejó de botones altos y alargados donde no cabía el texto.
- **Animaciones existentes:**
  - Ciudad isométrica con autos y burbujas "+N impresiones".
  - Calle fija al pie con autos que avanzan con el scroll.
  - Ruta vertical con auto en "Cómo funciona".
  - Ticker de casos de uso.
  - Reveal al hacer scroll.
  - KPIs del dashboard que se incrementan.
  - Mapa en vivo con puntos en `animateMotion`.
  - Se respeta `prefers-reduced-motion`.

### Autos y wraps (lo más importante para el dueño)

- **Tienen que ser sedanes.** Se rechazaron las vans.
- Las referencias del dueño son wraps reales sobre autos laterales (Petco, High Noon, Cricket, monday.com, Wrapify): auto blanco o de color, publicidad sobre todo en las puertas, titular enorme, un elemento visual fuerte (personaje, producto, teléfono o line-art), logo en la parte trasera y letra pequeña legal.
- `WrapCar.tsx` (viewBox 620×230) dibuja un sedán con sombreado, uniones de puertas, manijas, espejo, luces y rines de cinco rayos. Los diseños (`design`) son:
  - `estiky`: full wrap violeta con franja lima, "Tu campaña, en tiempo real", la app en un teléfono saliendo del auto y confeti (estilo Cricket).
  - `cafe`: auto blanco con panel café en las puertas, "Despierta tu ciudad." y una taza (estilo monday).
  - `fit`: calcomanía azul marino sobre auto blanco, "fitzone.gt / PRIMER MES GRATIS" y un corredor en line-art (estilo Petco).
  - `fruta`: wrap parcial de cielo con nubes, una lata y "SOL EN LATA" (estilo High Noon).
- **Correspondencia con los formatos:** Full wrap = `estiky`, Panel+ (wrap parcial) = `fruta`, Panel (panel en puertas) = `cafe`.
- `IsoCity.tsx` → `drawWrapArt` dibuja versiones simplificadas de estos diseños sobre la cara lateral de cada auto isométrico.
- Por compatibilidad, si se pasa `color` en lugar de `design`, se deduce: `#5B3DF5` → estiky, `#FF5C7A` → fruta, `#15122B` → cafe, `#C8F31D`/`#FFC93C` → fit.

### Gráficos de apoyo

El dueño pidió que **cada sección tenga un gráfico que ilustre lo que dice**. Ya hay uno en casi todas: la valla fija ilustrada (`Billboard`), la ruta por zonas, el dashboard interactivo, mapas, trayectos, ilustraciones de casos, la ficha de verificación, el diagrama de impresiones, la barra del presupuesto (sin montos), los deslizadores de cotización, la línea de semanas, los teléfonos del conductor y un auto en cada `CtaBand`. Al agregar secciones nuevas, mantener esa regla.

---

## 7. Dashboard del anunciante (maqueta)

- `DashboardMock` en `panel.tsx` está en la landing, en la sección "La plataforma" (debajo del hero, no dentro de él), y en `/plataforma`.
- Tiene ventana de navegador (`app.estiky.com/panel`), barra lateral oscura y vistas que cambian al hacer clic: Resumen, Campañas, Mapa en vivo, Trayectos y Nueva campaña (con asistente interactivo).
- Datos ilustrativos con el sello "Datos ilustrativos": campañas "Campaña de ejemplo A–D" y vehículos "Vehículo 01–07".
- El motivo de rechazo de ejemplo ("el arte no respeta el área segura del wrap") es **inventado**: confirmar el texto real.
- Los nombres del menú y las métricas siguen lo prometido, no el producto real. Si llegan capturas del dashboard real, hay que alinear la maqueta.

---

## 8. Integraciones

Las variables están en `.env.example` y se leen en `src/lib/config.ts`.

| Variable | Para qué | Sin configurar |
|---|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | registro e ingreso para ambos roles (`user_metadata.role` = `advertiser` o `driver`) | el formulario muestra "acceso no conectado" |
| `VITE_ADVERTISER_APP_URL`, `VITE_DRIVER_APP_URL` | a dónde continúa el usuario tras autenticarse | mensaje de app no configurada |
| `VITE_HANDOFF_ENDPOINT` | Edge Function que recibe el bearer y devuelve `{ code }` de un solo uso; la app lo canjea en `/auth/handoff` | redirige a la app sin sesión. **Nunca** se pasan tokens por la URL |
| `VITE_DEMO_ENDPOINT` | destino real del formulario de `/demo` (POST JSON) | declara que no está conectado y ofrece enviarlo por correo |
| `VITE_SALES_EMAIL`, `VITE_SUPPORT_EMAIL`, `VITE_LEGAL_EMAIL` | contacto | por defecto ventas@, soporte@ y legal@estiky.com, **sin confirmar** |

La analítica (`track()`) usa `gtag` o `plausible` si existen y no manda datos personales.

---

## 9. Deploy

- `vercel.json` ya reescribe las rutas SPA.
- **No está desplegado.** La cuenta de Vercel (team `edgarcalderon-outlookcom's projects`) no tiene GitHub conectado: crear el proyecto vía API dio 403.
- Opciones: conectar GitHub en Vercel, o importar el repo en https://vercel.com/new. Vite se detecta solo; el build es `npm run build` y la salida `dist`.

---

## 10. Pendientes y próximos pasos

### Confirmar con el dueño (el texto actual es genérico o supuesto)

- Qué cubre exactamente cada formato y qué vehículos admite.
- La metodología real de impresiones estimadas.
- Los tiempos por etapa. La `WeeksTimeline` muestra unas 6 semanas como ilustración.
- Las políticas de rechazo, pausa y reemplazo de vehículos.
- Que el conductor no paga instalación ni retiro.
- Las fotos y la elegibilidad exactas del vehículo.
- Si la cuenta bancaria debe estar a nombre del conductor.
- Los correos de contacto, el horario y el plazo de respuesta (`RESPONSE_WINDOW`).
- Los rangos de presupuesto del formulario de demo (Q).
- Los textos legales: están marcados como borrador sujeto a revisión.
- Lo de "instalación sin costo para anunciantes seleccionados", que viene de las condiciones del antiguo piloto: confirmar si sigue vigente.

### Técnicos

- Borrar `PanelMock.tsx` (no se usa).
- El autito simplificado dentro de `Billboard withCar` (Comparativa) debería ser un sedán coherente con `WrapCar`.
- Pasar la imagen OG a PNG/JPG de 1200×630 (hoy es `og.svg`).
- Correr Lighthouse en el deploy (meta: LCP < 2.5 s en 4G, contraste AA).
- No hay `npm test`: agregar al menos un smoke test de rutas si se quiere CI.
- `CONTENT.md` está parcialmente desactualizado respecto a este documento.
- Revisión visual en móvil (390 px) de las páginas nuevas.

### Ideas que el dueño valoró

- Más elementos gráficos que muestren la app.
- Wraps todavía más llamativos: más diseños de campaña, texturas y personajes.
- Tener siempre la ciudad isométrica en el hero.

---

## 11. Prompt sugerido para la nueva sesión

```text
Continúa el desarrollo del website de Estiky en este repo (React + TS + Vite, en la raíz).
Lee primero docs/HANDOFF.md: es la fuente de verdad (producto, reglas de contenido,
copy de plataforma, sistema visual, autos/wraps, pendientes). Respeta sus reglas: sin
"piloto", sin reportes quincenales al anunciante (todo en tiempo real), CTA principal =
crear cuenta, sin montos para conductores, sin datos ni marcas reales inventadas, autos
sedán con wraps llamativos, cada sección con su gráfico de apoyo, hero claro con la
ciudad isométrica. Verifica cada cambio con `npm run build` y capturas de Playwright.
Tarea de hoy: <describir>.
```
