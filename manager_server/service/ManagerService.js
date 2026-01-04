/*
** This Service is going to validate the user.
**
*/

function login(username, password, cb){
    //user info should be retrieve from database
    const tempuser = {
        username: "Tom",
        password: "321",
    };

    if(username != tempuser.username){
        return cb("user does not exist");
    }

    if(password != tempuser.password){
        return cb("incorrect password");
    }

    //simulate user info from database
    const user = {
        username: tempuser.username,
        id: 2,
        rid: 3,
    };

    return cb(null, user);
}


export default {login}