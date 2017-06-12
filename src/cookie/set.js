import { getCookie } from './get'
export function setCookie(key, value, expires) {
    // console.log(value)
    let exp = new Date()
    if ((typeof value === 'string') && (value.length > 0)) {
        exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000)
        document.cookie = `${key}=${escape(value)};expires=${exp.toUTCString}`
    } else {
        exp = new Date()
        exp.setTime(exp.getTime() - 1)
        let v = getCookie(key)
        if (v != null) {
            document.cookie = `${key}=${escape(value)};expires=${exp.toUTCString}`
        }
    }
}