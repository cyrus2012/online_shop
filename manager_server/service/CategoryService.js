

function addCategory(cb){
    return cb(null, "add new category function");
}

function getAllCategories(cb){
    return cb(null, "get All category function");
}


function getCategoryById(cb){
    return cb(null, "get category by id function");
}

function updateCategory(cb){
    return cb(null, "update category function");
}
function deleteCategory(cb){
    return cb(null, "delete function");
}

export {addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory};