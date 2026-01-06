/*
** This Service is going to validate the user.
**
*/

import ManagerRepository from "../repository/interface/ManagerAccess.js";
import managerDB from "../repository/implement/postgresManager.js";
//import inMemoryManager from "../repository/implement/inMemoryManager.js";

const managerRepository = new ManagerRepository(managerDB);
//const managerRepository = new ManagerRepository(inMemoryManager);
//const test = await managerRepository.getUserByName("Tommy");
//console.log(test);


async function login(username, password, cb){

    await managerRepository.getUserByName(username, function(err, userRow){
        if(err)
            cb("Database Server has problem");

        if(!userRow)
            return cb("User does not exist");    

        if(password != userRow.password){
            return cb("incorrect password");
        }

        const user = {
            username: userRow.name,
            id: userRow.id,
            rid: userRow.role_id,
        };

        return cb(null, user);

    });
    
}


export default {login}