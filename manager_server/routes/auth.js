import BearerStrategy from "passport-http-bearer";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "config";
import { Strategy as LocalStrategy } from "passport-local";

const jwt_config = config.get("jwt_config");

const user = {
    id: 1,
    rid: 2,
    username: "Tom",
    password: "123",
}

passport.use('local', new LocalStrategy(function verify (username, password, cb){
    console.log("auth.js local strategy");
    if(username !== user.username){
        return cb(null, false, {message: "User does not exit."});
    }

    if(password !== user.password){
        return cb(null, false, {message: "Incorrect password"});
    }

    return cb(null, user);

}));

passport.use('bearer', new BearerStrategy(
    (token, done) => {
        jwt.verify(token, jwt_config.get("secretKey"), function(err, decode){
            if(err)
                return done("error in token auth: " + err.message);

            return done(null, "token auth");
        });
        //set fixed token for test purpose
        // if(token === "aaa"){
        //     return done(null, "get user info");
        // }else{
        //     return done(null, false);            
        // }
        
    }
));


function login(req, res, next){
    passport.authenticate('local', (err, user, info) => {
            
            if(err){
                return res.sendResult(err, 400, "Server has a problem");
            }

            if(!user){
                return res.sendResult(null, 400, info.message);
            }


            const token = jwt.sign({uid:user.id, rid:user.rid}, jwt_config.get("secretKey"),
                {expiresIn:jwt_config.get("expiresIn")});

            user.token = "Bearer" + token;
            return res.sendResult(
                {
                    username: user.username, 
                    id: user.id, 
                    rid: user.rid,
                    token: user.token
                }, 200, "success");
        })(req, res, next);
}


// The 3rd parameter of passport.authenticate() is the callback function of the "bearer" Strategy
function tokenAuth(req, res, next){
    console.log("Bearer");
    passport.authenticate('bearer', {session:false}, 
        (err, user, info, status) => {
            if(err){
                return res.sendResult(err, 400, "invalid token");
            }

            if(!user){
                return res.sendResult(null, 400, "invalid token");
            }

            return res.sendResult(user, 200, "success");
        })(req, res, next);
}


export default tokenAuth;
export {login};