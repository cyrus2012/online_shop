import {Pool} from "pg";
import config from "config";

const dbConfig = config.get("postgresql_config");

const pool = new Pool({
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    max: dbConfig.max
});

async function query(text, params){
    
    return await pool.query(text, params);
}

/**
 * 
 * @param {String} table name of database table
 * @param {Object} conditions its property name and value is the column name of the table and the corresponding value
 * @param {function(error, info)} cb info is a match row in the table. Null when there is not match row.
 */
async function findOne(table, conditions, cb){
    var text = `SELECT * FROM ${table} WHERE `;

    const params = [];
    for(const key in conditions){
        params.push(conditions[key]);
        
        if(params.length === 1){
            text = text + `${key}=$${params.length}`;
        }else{
            text = text + ` AND ${key}=$${params.length}`;
        }
    }

    //console.log("db query: " + text);
    //console.log("param: " + params);
     try{
        const result = await query(text, params);
        if(result.rows.length === 0){
            return cb(null, null);
        }

        return cb(null, result.rows[0]);
     }catch(err){
        console.log(err);
        return cb("Accessing database has problem");
     }

}



export default {query, findOne};