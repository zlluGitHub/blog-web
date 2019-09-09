
(function(w) {
    // 创建工厂函数
    function JsFunctionLibrary() {
        return new JsFunctionLibrary.fn.init();
    };
    // 给原型提供方法
    JsFunctionLibrary.fn = JsFunctionLibrary.prototype = {
        constrcutor: JsFunctionLibrary,
        //判断是否在移动端打开，若在pc端打开则返回true
        isPC:function() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"
            ];
            var flag = true;
            for (var i = 0; i < Agents.length; i++) {
                if (userAgentInfo.indexOf(Agents[i]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        // 判断是不是对象
        isObject: function(obj) {

            // 防止typeof对null的误判
            if (obj === null) {
                return false;
            }
            // 如果是object或function，那就是对象
            if (typeof obj === 'object' || typeof obj === 'function') {
                return true;
            }
            return false;
        },
        // 判断是不是字符串
        isString: function(str) {
            if (typeof str === 'string') {
                return true;
            }
            return false;
        },
        // 判断是不是函数
        isFunction: function(fn) {
            if (typeof fn === 'function') {
                return true;
            }
            return false;
        },
        //给所有的元素移除指定的class
        removeClass: function(idOrclass, className) {
            if (idOrclass.indexOf('#') > -1) {
                var idOrclass = idOrclass.replace(/#/g, "");
                idOrclass = this.id(idOrclass);
                idOrclass.classList.remove(className);
            } else {
                var idOrclass = idOrclass.replace(/\./g, "");
                var arrayClassname = this.class(idOrclass);
                for (var i = 0; i < arrayClassname.length; i++) {
                    arrayClassname[i].classList.remove(className);
                };
            };
        },
        // 给所有的元素添加指定的class
        addClass: function(idOrclass, className) {
            if (idOrclass.indexOf('#') > -1) {
                var idOrclass = idOrclass.replace(/#/g, "");
                idOrclass = this.id(idOrclass);
                if (!this.hasClass(className)) {
                    idOrclass.className += ' ' + className;
                };
            } else {
                var idOrclass = idOrclass.replace(/\./g, "");
                var arrayClassname = this.class(idOrclass);
                if (!this.hasClass(className)) {
                    for (var i = 0; i < arrayClassname.length; i++) {
                        arrayClassname[i].className += ' ' + className;
                    };
                };
            };
        },
        // 设置或者获取元素的value属性值
        val: function(idOrclass, val) {
            if (idOrclass.indexOf('#') > -1) {
                var idOrclass = idOrclass.replace(/#/g, "");
                idOrclass = this.id(idOrclass);
                if (val != undefined) {
                    return idOrclass.value = val;
                };
                return idOrclass.value;
            } else {
                var idOrclass = idOrclass.replace(/\./g, "");
                idOrclass = this.class(idOrclass)[0];
                if (val != undefined) {
                    return idOrclass.value = val;
                };
                return idOrclass.value;
            };
        },
        // 判断元素中是否含有指定的class
        hasClass: function(className) {
            var ele = this.class(className);
            for (var i = 0, len = ele.length; i < len; i++) {
                // 只要有一个元素存在指定的className，那么就可以true了
                if ((' ' + ele[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
                    return true;
                };
            };
            // 所有的元素都没有，那么返回false
            return false;
        },
        class: function(className) {
            var aResult = [];
            var aEle = document.getElementsByTagName('*');
            for (var i = 0; i < aEle.length; i++) {
                /*将每个className拆分*/
                var arr = aEle[i].className.split(/\s+/);
                for (var j = 0; j < arr.length; j++) {
                    /*判断拆分后的数组中有没有满足的class*/
                    if (arr[j] == className) {
                        aResult.push(aEle[i]);
                    };
                };
            };
            return aResult;
        },
        //通过id获取元素对象
        id: function(id) {
            return typeof id === 'string' ? document.getElementById(id) : null;
        },
        //getElementsByClassName()兼容处理
        getElementsByClassName: function() {
            if (!document.getElementsByClassName) {
                document.getElementsByClassName = function(cls) {
                    var ret = [];
                    var els = document.getElementsByTagName('*');
                    for (var i = 0, len = els.length; i < len; i++) {
                        if (els[i].className === cls || els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
                            ret.push(els[i]);
                        };
                    };
                    return ret;
                };
            };
        },
    };
    // 构造函数
    var init = JsFunctionLibrary.fn.init = function() {
        this.name = "JsFunctionLibrary";
    };
    // 替换构造函数的原型为JsFunctionLibrary工厂的原型
    init.prototype = JsFunctionLibrary.fn;
    // 把工厂函数通过两个变量暴露出去
    w.jsFL = w.$ = JsFunctionLibrary();

})(window);
