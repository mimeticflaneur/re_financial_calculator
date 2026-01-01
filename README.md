# 🏠 Análisis de Inversión Inmobiliaria

Calculadora avanzada de rentabilidad apalancada para inversiones inmobiliarias en España. Analiza la viabilidad de compra de viviendas para alquiler con proyecciones de cashflow, métricas financieras clave y simulación de venta anticipada.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Características

### 📊 Análisis Completo de Inversión
- **Métricas financieras clave**: TIR, Cash-on-Cash, DSCR, Rentabilidad Bruta, Equity Multiple
- **Proyección de cashflows**: Visualización año a año de ingresos, gastos, hipoteca e impuestos
- **Decisión automática**: Recomendación de compra basada en criterios personalizables
- **Tres escenarios**: Optimista, Base y Pesimista para análisis de sensibilidad

### 💰 Simulador de Venta Anticipada
- Calcula tu rentabilidad real si vendieras hoy
- Considera: cashflows acumulados, saldo de hipoteca pendiente, impuestos por ganancia patrimonial
- Métricas: TIR de venta, Equity Multiple, Rentabilidad Anual Apalancada

### 🎨 Interfaz Moderna
- **Dark/Light Mode**: Cambia entre temas con un clic
- **Tooltips educativos**: Explicaciones detalladas de cada concepto financiero
- **Diseño responsive**: Funciona en desktop, tablet y móvil
- **100% en español**: Adaptado al mercado inmobiliario español

## 🚀 Demo

[Ver Demo en Vivo](#) <!-- Añade tu URL de deploy aquí -->

## 📸 Screenshots

<details>
<summary>Ver capturas de pantalla</summary>

### Modo Oscuro - Análisis
![Análisis Dark Mode](screenshots/analysis-dark.png)

### Modo Claro - Simulador de Venta
![Venta Light Mode](screenshots/sale-light.png)

</details>

## 🛠️ Instalación

### Requisitos previos
- Node.js 18+ 
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/real-estate-investment-analyzer.git

# Entrar al directorio
cd real-estate-investment-analyzer

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 📖 Uso

### 1. Configurar parámetros de inversión

En el panel izquierdo, ajusta:

- **Fiscalidad**: Tipos impositivos y bonificaciones aplicables
- **Adquisición**: Valor de vivienda, entrada, gastos de compra, condiciones de hipoteca
- **Gastos operativos**: Comunidad, IBI, mantenimiento, provisión para derramas
- **Alquiler**: Renta mensual esperada, ocupación, subidas anuales

### 2. Seleccionar escenario

Elige entre tres escenarios que modifican las proyecciones:

| Escenario | Alquiler | Ocupación | Revalorización | Gastos |
|-----------|----------|-----------|----------------|--------|
| Optimista | +10% | +5% | +30% | -10% |
| Base | 0% | 0% | 0% | 0% |
| Pesimista | -10% | -15% | -30% | +15% |

### 3. Interpretar resultados

La aplicación calcula automáticamente:

- **TIR (Tasa Interna de Retorno)**: Rentabilidad anualizada de la inversión
- **Cash-on-Cash**: Rendimiento anual sobre el capital invertido
- **DSCR**: Ratio de cobertura de deuda (NOI / Cuota hipoteca)
- **Decisión**: ✅ Compra recomendada o ❌ No recomendado

### 4. Simular venta anticipada

En la pestaña "Simular Venta":

1. Indica cuántos años llevas con la propiedad
2. Opcionalmente, introduce el valor de mercado actual
3. Visualiza tu rentabilidad real considerando todos los flujos

## 🧮 Fórmulas utilizadas

### TIR (Tasa Interna de Retorno)
```
VPN = Σ CFt / (1+TIR)^t = 0
```

### Cash-on-Cash Return
```
CoC = Cashflow Neto Anual / Equity Inicial × 100
```

### DSCR (Debt Service Coverage Ratio)
```
DSCR = NOI / Servicio de Deuda Anual
```

### Cuota hipoteca (sistema francés)
```
Cuota = Principal × [i(1+i)^n] / [(1+i)^n - 1]
```

## 📁 Estructura del proyecto

```
real-estate-investment-analyzer/
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── CashflowTable.jsx
│   │   ├── DecisionPanel.jsx
│   │   ├── EarlySaleCalculator.jsx
│   │   ├── Input.jsx
│   │   ├── RealEstateAnalyzer.jsx
│   │   └── Tooltip.jsx
│   ├── constants/
│   │   ├── defaults.js
│   │   └── tooltips.js
│   ├── hooks/
│   │   └── useTheme.js
│   ├── utils/
│   │   ├── calculations.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📋 Roadmap

- [ ] Exportar análisis a PDF
- [ ] Comparador de múltiples propiedades
- [ ] Gráficos interactivos de cashflows
- [ ] Calculadora de refinanciación
- [ ] Integración con APIs de valoración inmobiliaria
- [ ] Soporte para otros países (Portugal, México, Argentina)

## ⚠️ Disclaimer

Esta herramienta es solo para fines educativos e informativos. No constituye asesoramiento financiero, fiscal o legal. Consulta siempre con profesionales antes de tomar decisiones de inversión. Los cálculos son aproximaciones y pueden no reflejar tu situación fiscal específica.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Inspirado en modelos de análisis de inversión inmobiliaria profesionales
- Iconos de [Lucide](https://lucide.dev/)
- Estilos con [Tailwind CSS](https://tailwindcss.com/)

---

<p align="center">
  Hecho con ❤️ para inversores inmobiliarios
</p>
