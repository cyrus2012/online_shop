/*
** This Service is going to validate the user.
**
*/

import ManagerRepository from "../repository/interface/managerAccess.js";
import managerDB from "../repository/implement/postgresManager.js";
import inMemoryManager from "../repository/implement/inMemoryManager.js";

const managerRepository = new ManagerRepository(managerDB);
//const managerRepository = new ManagerRepository(inMemoryManager);
//const test = await managerRepository.getUserByName("Tommy");
//console.log(test);


async function login(username, password, cb){

    const row = await managerRepository.getUserByName(username);
    
    
    if(!row)
        return cb("user donest not exist");

    if(password != row.password){
        return cb("incorrect password");
    }

    //simulate user info from database
    const user = {
        username: row.name,
        id: row.id,
        rid: row.role_id,
    };

    return cb(null, user);
}


export default {login}