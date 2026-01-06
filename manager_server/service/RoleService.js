
import postgresRole from "../repository/implement/postgresRole.js";
import RoleAccess from "../repository/interface/RoleAccess.js";
import postgresPermissionApi from "../repository/implement/postgresPermissionApi.js";
import PermissionApiRepository from "../repository/interface/PermissionApiAccess.js";

const roleRepository = new RoleAccess(postgresRole);
const permissionApiRepository = new PermissionApiRepository(postgresPermissionApi);
/**
 * 
 * @param {integer} role_id 
 * @param {String} serviceName 
 * @param {String} actionName 
 * @param {function(error, isPermitted)} cb Argument isPermitted is true if the role has permission, otherwise false
 * @returns 
 */
async function authorizeRight(role_id, serviceName, actionName, cb){
    // if(rid === 0){
    //     return cb(null, true)
    // }else{
    //     return cb(null, false);
    // }
    //console.log("RoleService authorizeRight()");
    await permissionApiRepository.getPermissionApiByName(serviceName, actionName, async function(err, permissionApi){
        if(err)
            cb(err);

        if(!permissionApi)
            cb("no permission api available");

        await roleRepository.getRole(role_id, function(err, role){
            if(err)
                return cb("server has problem");

            if(!role)
                return cb(`role id ${role_id} does not exist`);

            
            const ps_ids = role.permission_ids.split(",");

            for(const id of ps_ids){
                if(parseInt(id) == parseInt(permissionApi.permission_id))
                    return cb(null, true);
            }

            return cb(null, false);
        });


    });


}

export default(authorizeRight);