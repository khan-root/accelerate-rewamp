import { axiosInstanceBackLog } from "../Base"

const backlogApi = {

    createBacklog: function(data){
        return axiosInstanceBackLog.request({
            method:"POST",
            url:'create_category',
            data: data
        })
    },
    gettingCategories: function(id){
        return axiosInstanceBackLog.request({
            method:"GET",
            url:`get_catagory/${id}`,
        })
    },
    deleteCategory: function(id){
        return axiosInstanceBackLog.request({
            method:"DELETE",
            url:`delete_category/${id}`,
        })
    },
    updateCategory: function(data){
        return axiosInstanceBackLog.request({
            method:"PUT",
            url:`update_category`,
            data:data
        })
    },


}


export default backlogApi