
function authRight(rid, cb){
    if(rid == 0){
        return cb(null, true)
    }else{
        return cb(null, false);
    }
}