import { showToast } from "../components/Toaster/Toaster";
import apiServices from "../Model/ApiServices/ApiServices";






export const fileHitting = async(file)=>{
    const formData = new FormData();
    formData.append('file_data', file);
    formData.append('operation', 'store_file')
    
    try{
        const response = await apiServices.elephantApi(formData)
        const responseData = await response.data
        if(response.status === 200 && responseData.STATUS === 'SUCCESSFUL'){
            showToast("File Attach Successfully", 'success')
            return responseData
        }else{
            showToast("Try another File", 'error')
        }
    }catch(err){

    }
}


