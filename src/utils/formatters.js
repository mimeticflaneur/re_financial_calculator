/**
 * Utilidades de formato para la aplicación
 */

/**
 * Formatea un número como moneda (EUR)
 */
export function formatCurrency(value, decimals = 0) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

/**
 * Formatea un número como porcentaje
 */
export function formatPercent(value, decimals = 2) {
  return `${value.toFixed(decimals)}%`
}

/**
 * Formatea un número con separador de miles
 */
export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

/**
 * Formatea un ratio (ej: 1.25x)
 */
export function formatRatio(value, decimals = 2) {
  return `${value.toFixed(decimals)}x`
}

/**
 * Clase CSS para valores positivos/negativos
 */
export function getValueClass(value, darkMode = false) {
  if (value > 0) return darkMode ? 'text-emerald-400' : 'text-emerald-600'
  if (value < 0) return darkMode ? 'text-red-400' : 'text-red-600'
  return darkMode ? 'text-slate-300' : 'text-slate-600'
}

export default {
  formatCurrency,
  formatPercent,
  formatNumber,
  formatRatio,
  getValueClass
}
