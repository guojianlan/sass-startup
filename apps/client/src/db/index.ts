import {DbDriver} from "@sass-startup/db";
export class Db {
    static db:typeof DbDriver
    static get install(){
        return new Promise<typeof DbDriver>(async(resolve, reject)=>{
            if(Db.db){
                resolve(DbDriver)
            }
            await Db.getInstall();
            resolve(DbDriver)
        })
    }
    static async getInstall(){
        if(Db.db === undefined){
            // 配置
            DbDriver.setConfig({
                type: 'mysql',
                synchronize: true,
                logging: true,
                entities: [...DbDriver.getEntities()],
                logger: 'advanced-console',
                poolSize: 20,
                connectorPackage: 'mysql2',
                relationLoadStrategy:"query",
                host: process.env.db_host,
                port: parseInt(process.env.db_port!,10),
                username: process.env.db_username,
                password:process.env.db_password,
                timezone: '+08:00',
            })
            await DbDriver.connect().catch(e=>{
                console.log(e)
            })
            return DbDriver
        }
        return DbDriver
    }
}
