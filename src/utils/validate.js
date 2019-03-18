import store from '../store'

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
