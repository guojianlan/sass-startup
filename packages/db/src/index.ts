import {entities } from './entities'
import {
    DataSource,
    DataSourceOptions,
    DefaultNamingStrategy,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
    ValueTransformer
} from "typeorm";
import {snakeCase} from "typeorm/util/StringUtils";
import  bcrypt from 'bcryptjs';
import {isMatchPassword} from "./util";
const saltOrRounds = 10;

class CustomNamingStrategy extends DefaultNamingStrategy {
    tableName(targetName: string, userSpecifiedName: string): string {
        return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
    }
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        if (customName) return customName;
        return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
    }
}
export type TypeEntityProps = keyof typeof entities

export type TypeEntityClass = <K extends TypeEntityProps>(entity:K)=>typeof entities[K]
export type entitiesTypesMap<K extends TypeEntityProps> = InstanceType<typeof entities[K]>
export type TypeEntityTag = <K extends TypeEntityProps>(entity:K)=>InstanceType<typeof entities[K]>
export type TypeRepositoryEntity = <K extends  TypeEntityProps>(entity:K)=>Repository<InstanceType<typeof entities[K]>>
export type TypeCreateQueryBuilder = <K extends TypeEntityProps>(entity:K,alias?:string,queryRunner?:QueryRunner)=>SelectQueryBuilder<InstanceType<typeof entities[K]>>
export type TypeGetSelectFn = <K extends TypeEntityProps>(entity:K,selects?:{[key in keyof (InstanceType<typeof entities[K]> )]?:boolean})=>Array<keyof InstanceType<typeof entities[K]>>


export class DbDriver {

    public static config:DataSourceOptions
    public static dataSource:DataSource
    public static saltOrRounds:10
    // 获取所有的实体，typeorm配置的时候用到
    static getEntities () {
        return Object.values(entities).map(entity=>{
            return entity
        })
    }
    // 设置typeorm 的配置文件
    static setConfig(config:typeof DbDriver['config']){
        DbDriver.config = config
    }

    // 链接typeorm
    static  connect (){
        return new Promise(async(resolve, reject)=>{
            if(!DbDriver.dataSource){
                const dataSource =new DataSource({
                    // 默认启用下横线模式
                    namingStrategy: new CustomNamingStrategy(),
                    ...DbDriver.config
                });
                await dataSource.initialize()
                DbDriver.dataSource =dataSource
                resolve(DbDriver.dataSource)
                console.log('database connect successfully')
            }else{
                resolve(DbDriver.dataSource)
            }
        })
    }
    static isMatchPassword:typeof isMatchPassword =(password, hash)=>{
        return isMatchPassword(password,hash)
    }
    static getEntity :TypeEntityClass = (entity)=>{
        return entities[entity]
    }
    static getRepository:TypeRepositoryEntity=(entity)=>{
        return DbDriver.dataSource.getRepository(DbDriver.getEntity(entity) as any)
    }
}
