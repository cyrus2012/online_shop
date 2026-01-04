import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

//code user info here for test
const user = {
    userid: 1,
    username: "Tom",
    password: "123",
}


passport.use('local', new LocalStrategy(function verify (username, password, cb){
    if(username !== user.username){
        return cb(null, false, {message: "User does not exit."});
    }

    if(password !== user.password){
        return cb(null, false, {message: "Incorrect password"});
    }

    return cb(null, user);

}));


function login(req, res, next){
    passport.authenticate('local', (err, user, info) => {
            console.log("local login");
            if(err){
                return res.sendResult(err, 400, "Server has a problem");
            }

            if(!user){
                return res.sendResult(null, 400, info.message);
            }

            return res.sendResult(user, 200, "success");
        })(req, res, next);
}

export default login;
