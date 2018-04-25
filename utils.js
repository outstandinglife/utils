/** 元素添加样式
 *@params   {dom}   dom元素
 *@params   {json}  css样式名称
 *@author   lipenghui
 *@Email   felicity_live@sina.cn
 *@return   null
 **/
function css(ele, json) {
    if (ele.length) {
        for (let i = 0; i < ele.length; i++) {
            for (let attr in json) {
                ele[i].style[attr] = json[attr];
            }
        }
    } else {
        for (let attr in json) {
            ele.style[attr] = json[attr];
        }
    }
}