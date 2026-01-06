class PermissionApiAccess{
    constructor(permissionApiRepository){
        this.permissionApiRepository = permissionApiRepository;
    }

    /**
     * 
     * @param {String} serviceName 
     * @param {String} actionName 
     * @param {function(error, info)} cb callback function where a matched result will pass to info as paramter, null if there is no match
     */
    async getPermissionApiByName(serviceName, actionName, cb){
        
        return await this.permissionApiRepository.getPermissionApiByName(serviceName, actionName, cb);
    }
}

export default PermissionApiAccess;