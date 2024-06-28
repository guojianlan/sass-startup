export class IResponse {
    static ok<T>(data: T, msg = '') {
        return {
            data: data,
            msg: msg,
            success: true,
            code: 0
        };
    }
    static fail(msg: any, code = 1, data: Record<any, any> | string = {}) {
        return {
            msg: msg,
            success: false,
            code: code,
            ...(data ? { data } : {})
        };
    }
}
