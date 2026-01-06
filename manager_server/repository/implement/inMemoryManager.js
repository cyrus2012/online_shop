
const user = {
    id:2,
    name: "Tommy",
    password: "123456",
    role: 1,
    mobile: 98765432,
    email: "abc@esd.com"

};

async function getUserByid(userId){
   
    console.log("getUserByid");

    if(userId === user.id)
        return user;

    return null;
}

async function getUserByName(username){
    
    console.log("InMemoryManager.getUserByName");

    if(username === user.name)
        return user;

    return null;
}

export default {getUserByid, getUserByName};