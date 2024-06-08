const formatSuccess = (succ)=>{
    const success = {
        message: succ.message ? succ.message : succ.toString(),
        success: true,
        data : succ.data ? succ.data : {},
    } 
    return success;
}

class CustomSuccess{
    static create(succ){
        const success = formatSuccess(succ)
        return {
            ...success,
            status:201
        }
    }
    static ok(succ){
        const success = formatSuccess(succ)
        return {
            ...success,
            status:200
        }
    }
}
module.exports = CustomSuccess;