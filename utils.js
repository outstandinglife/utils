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



/** 操作localStorage
 *  Storage.get(key)    获取单个存储对象
 *  Storage.get()       获取所有存储对象
 *  Storage.set(key, vaule)       设置单个存储对象
 *  Storage.set({key: valye, key: value})       设置多个存储对象
 *  Storage.clear()     清空所有存储对象
 *  Storage.remove(key)     删除存储对象
 **/
class Storage {
    constructor() {
        this.storage = window.localStorage;
    }

    get(key) {
        if (!key) {
            let ret = {};
            this.each((key, val) => {
                ret[key] = val;
            });
            return ret;
        }
        return this.deserialize(this.storage.getItem(key));
    }

    set(key, val) {
        if (key && !this.isJSON(key)) this.storage.setItem(key, JSON.stringify(val));
        else
            for (let a in key) this.set(a, key[a]);
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }

    has(key) {
        return Object.hasOwnProperty.call(this.get(), key);
    }

    isJSON(obj) {
        return typeof obj === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
    }

    deserialize(value) {
        if (typeof value !== 'string') {
            return undefined;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            return value || undefined;
        }
    }

    each(callback) {
        for (let i = 0; i < this.storage.length; i++) {
            let key = this.storage.key(i);
            callback(key, this.get(key));
        }
    }
}



/** 数组排序
 *@params   {arr}   排序的数组
 *@params   {state} 排序的类型
 *@author   lipenghui
 *@return   arr 排序后的数组
 **/
function sort(arr, state = 1) {
    return arr.sort((a, b) => {
        switch (state) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    });
}



/** 获取url参数
 *@params   {url}   查询的url链接
 *@author   lipenghui
 *@return   url对象
 **/
function getUrlAllParams(url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1);
    var _arrS = _pa.split('&');
    var _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) continue;
        _rs[_arrS[i].substring(0, pos)] = _arrS[i].substring(pos + 1);
    }
    return _rs;
}