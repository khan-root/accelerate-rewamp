import { axiosInstanceBackLog } from "../Base"

const backlogApi = {

    gettingBackLog: function(id){
        console.log('id', id)
        return axiosInstanceBackLog.request({
            method:"GET",
            url:`get_backlogs_by_project/${id}`,
        })
    },
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
    gettingLabels: function(id){
        return axiosInstanceBackLog.request({
            method:"GET",
            url:`get_label/${id}`,
        })
    },
    cerateLabel: function(data){
        return axiosInstanceBackLog.request({
            method:"POST",
            url:'create_label',
            data: data
        })
    },
    deleteLabel: function(id){
        return axiosInstanceBackLog.request({
            method:"DELETE",
            url:`delete_label/${id}`,
        })
    },
    updateLabel: function(data){
        return axiosInstanceBackLog.request({
            method:"PUT",
            url:`update_label`,
            data:data
        })
    },


}


export default backlogApi