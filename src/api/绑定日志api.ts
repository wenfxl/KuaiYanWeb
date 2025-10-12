import { createCrudApi, BaseResponse } from '@/api/common';
import service from "@/api/request";
import {取url根入口路径} from "@/utils/utils";


const customMethods = {
    // setNote: (data: any) => service<BaseResponse>({
    //     url:  取url根入口路径() + `/logKey/setNote`,
    //     method: 'post',
    //     data
    // }),
};

export const 绑定日志api = createCrudApi('logKey', customMethods);
