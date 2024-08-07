
/** @function
 * @type {*|null}
 * @name clear
 * @returns Clear keys from mocked local storage.
*/

export const clear = () => localStorage.clear()

/** @function
 * @type {*|null}
 * @name getItem
 * @param key
 * @returns Get key from mocked local storage
*/

export const getItem = (key) => localStorage.getItem(key)

/** @function
 * @type {*|null}
 * @name setItem
 * @param key
 * @param value
 * @returns Set key to mocked local storage.
*/

export const setItem = (key, value) => localStorage.setItem(key, value)

/** @function
 * @type {*|null}
 * @name removeItem
 * @param key
 * @returns  Remove key from mocked local storage.
*/

export const removeItem = (key) => localStorage.removeItem(key)
