import {ValueTransformer} from "typeorm";
import bcrypt from "bcryptjs";
export const saltOrRounds = 10
export const passwordTransformer:()=>ValueTransformer = ()=>{
    return {
        from(value: string | null): string|null {
            return value
        },
        to(value:string | null){
            if(value){
                return bcryptHashSync(value)
            }
        }
    }
}
// 密码hash
export const bcryptHashSync = (password: string) => {
    return bcrypt.hashSync(password, saltOrRounds);
};
// 密码hash 对比
export const isMatchPassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (e) {
        return false;
    }
};