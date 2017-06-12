export function getCookie(key) {
    //match  返回所有匹配正则模式的数组
    //console.log(document.cookie)
    let arr = document.cookie.match(new RegExp(`(^|)${key}=([^;]*)(;|$)`))
        //  console.log(111, arr)
    if (arr !== null) {
        return unescape(arr[2])
    }
    return null
}