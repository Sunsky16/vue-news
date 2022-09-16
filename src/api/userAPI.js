import request from '@/utils/request';

//只是单纯的演示一下，其实并没有这个接口
export const getUserInfoAPI = function() {
    return request.get('/user')
}
2
3
4