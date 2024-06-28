import { Column, Entity} from 'typeorm'
import {BaseWithFullEntity} from "./base.entity";
import {passwordTransformer} from "../util";

@Entity('user',{
    database:'sass'
})
export class SassStartUserEntity extends BaseWithFullEntity {
    @Column('varchar', { name: 'email', comment: '邮箱', length: 255,nullable:false })
    email: string;

    @Column('varchar', { name: 'password', comment: '密码', length: 255,transformer:passwordTransformer()})
    password: string;

    @Column('varchar', { name: 'nick_name', comment: '昵称', length: 255})
    nickName:string
}
