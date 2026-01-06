import db from "../../module/postgres_db.js";
import permissionApiModel from "../models/permissionApiModel.js";

/**
 * 
 * @param {String} serviceName 
 * @param {String} actionName 
 * @param {function(error, info)} cb callback function where a matched result will pass to info as paramter, null if there is no match
 */
async function getPermissionApiByName(serviceName, actionName, cb){
    await db.findOne(permissionApiModel.table, {api_service: serviceName, api_action:actionName}, cb);
}



export default {getPermissionApiByName};