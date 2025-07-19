import service from '@/api/request'
import { 取url根入口路径 } from "@/utils/utils"

/**
 * 创建CRUD API工厂函数
 * @param {string} resourceName 资源名称（如'Ka'）
 * @param {object} customMethods 自定义方法配置
 */
export const createCrudApi = <T = any>(
    resourceName: string,
    customMethods: Record<string, Function> = {}
) => {
    const baseUrl = 取url根入口路径() + `/${resourceName}/`;

    // 添加资源名到返回对象中
    const context = {
        resourceName,
        baseUrl
    };

    // 使用 BaseResponse 包裹标准方法
    const standardMethods = {
        getList: (data: any) => service<BaseResponse<T>>({
            url: baseUrl + 'getList',
            method: 'post',
            data
        }),
        create: (data: any) => service<BaseResponse<T>>({
            url: baseUrl + 'create',
            method: 'post',
            data
        }),
        delete: (data: any) => service<BaseResponse<T>>({
            url: baseUrl + 'delete',
            method: 'post',
            data
        }),
        update: (data: any) => service<BaseResponse<T>>({
            url: baseUrl + 'update',
            method: 'post',
            data
        }),
        info: (data: any) => service<BaseResponse<T>>({
            url: baseUrl + 'info',
            method: 'post',
            data
        }),
        httpSend: (path: string, data: any) => service<BaseResponse<T>>({
            url: baseUrl + path,
            method: 'post',
            data
        }),
        setSort: (data: any) => service<BaseResponse<T>>({
            url: baseUrl + 'setSort',
            method: 'post',
            data
        }),
    }

    return { ...context, ...standardMethods, ...customMethods };
}
// 新增基础响应类型
export interface BaseResponse<T = any> {
    code: number;
    data: T;
    msg: string;
}
