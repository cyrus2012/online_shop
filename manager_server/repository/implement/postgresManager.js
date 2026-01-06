import db from "../../module/postgres_db.js";
import managerModel from "../models/managerModel.js";

async function getUserByid(userId){
    const result = await db.find(managerModel.table, {id: userId});

    return result.rows[0];

}

async function getUserByName(username){
    const result = await db.find(managerModel.table, {name: username});

    return result.rows[0];
}

export default {getUserByid, getUserByName};