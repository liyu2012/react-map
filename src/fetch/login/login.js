import { post } from '../post'
export function handleLog(params, expires) {
    const url = 'api/login'
    const config = {
        email: params.email,
        pass: params.pass
    }
    const json = post(url, config).then(res => {
        return res.json()
    })
    return json
}