export function postIcon(url, params) {
    // console.log(params)
    const result = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    return result
}