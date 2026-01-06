import db from "../../module/postgres_db.js";
import roleModel from "../models/roleModel.js";

/**
 * 
 * @param {Number} role_id role id 
 * @param {function(error, info)} cb callback function where the matched result is passed to info. Null if there is no match
 */
async function getRole(role_id, cb){
    await db.findOne(roleModel.table, {role_id: role_id}, cb);
}


export default {getRole};