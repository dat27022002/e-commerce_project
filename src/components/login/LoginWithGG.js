import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import { useAuth } from "~/hooks/useAuth"

const LoginWithGG= ({callback=null}) => {
    const {handleLoginGG} = useAuth()
    const login = useGoogleLogin({
        onSuccess: res => {
            handleLoginGG(res.access_token)
            if(callback) callback(res)
        },
    })
    return (
        <GoogleLogin onSuccess={login} onError={res => console.log(res)}/>
    )
}
export default LoginWithGG