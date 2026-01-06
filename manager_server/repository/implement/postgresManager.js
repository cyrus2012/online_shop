import db from "../../module/postgres_db.js";
import managerModel from "../models/managerModel.js";

async function getUserByid(userId, cb){
    return await db.findOne(managerModel.table, {id: userId}, cb);
}

async function getUserByName(username, cb){
    return await db.findOne(managerModel.table, {name: username}, cb);
}

export default {getUserByid, getUserByName};