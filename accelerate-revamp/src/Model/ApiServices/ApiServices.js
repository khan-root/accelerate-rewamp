import { axiosInstanceFile } from "../Base"

const apiServices = {
    elephantApi : function(data){
        return axiosInstanceFile.request({
            method: 'POST',            
            url:`/set_data.php`,
            data:data,
        })
    },
}



export default apiServices