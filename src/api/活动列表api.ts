import { createCrudApi, BaseResponse } from '@/api/common';
import service from "@/api/request";
import {取url根入口路径} from "@/utils/utils";


const customMethods = {
    reset: (data: any) => service<BaseResponse>({
        url:   取url根入口路径() + '/appPromotionConfig/reset',
        method: 'post',
        data
    }),


};

export const 活动列表api = createCrudApi('appPromotionConfig', customMethods);
