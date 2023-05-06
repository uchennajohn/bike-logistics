import ApiManager from "./ApiManager";

export const userLogin =async data=>{
    try {
        const result = await ApiManager.post('/auth/login',{
            method:"POST",
            headers:{
                    "Content-Type":"application/json"
            },
            data:data
        })
        return result
    } catch (error) {
       console.log("user Error", error)
    }
}