/**
 * Created by rulersex on 2017/7/16.
 */
var Tools = (function () {
    /**
     * 去首尾空格
     * 参数:要去空格的字符串
     * 返回值:去完首尾空格的字符串
     * @param str
     *
     */
    function trim(str){
        return str.replace(/^(\s+)|(\s+)$/ig,"");
    }
    /**
     *   判断原型中是否有某个属性
     *   参数:(要判断的对象，要判断的属性)
     *   返回值:对象原型中有这个属性返回true,没有返回false
     */
    function hasPrototypeProperty(obj, property) {
        //如果对象的实例中没有这个属性，但是这个属性在这个对象中，那么他就只能在原型中了
        return !obj.hasOwnProperty(property) && (property in obj);
    }

    /**
     *
     * 依据对象的原型创建一个新的对象(一个没有原来对象属性，只有原来对象方法的对象，而且方法也是放在新对象的原型上)
     * 参数:(要复制的对象的原型)
     * 返回值:一个包含老对象原型方法的新对象
     *
     */
    function createPrototypeObj(oldObj) {
        //定义一个空function
        function Fn() {
        }
        //这个function的原型赋值为传入的对象的原型
        Fn.prototype = oldObj;
        //返回一个实例
        return new Fn();
    }

    /**
     * 实现方法继承
     * 参数:(父对象，子对象)
     * 功能:调用此方法子对象就能继承来自父对象原型上的方法
     * @param supObj
     * @param subObj
     */
    function inheritanceFn(supObj, subObj) {
        //调用上面的方法创建一个只包含父类原型的实例
        var prototype = createPrototypeObj(supObj.prototype);
        //指定子类原型的构造者
        prototype.constructor = subObj;
        //子类原型赋值为一个只包含父类原型的实例
        subObj.prototype = prototype;
    }

    /**
     * 获取页面视口大小
     * 返回值:返回一个包含视口宽度和高度的数组[宽度,高度]
     * @returns {*[]}
     */
    function  getClientWH(){
        //在IE8,firefox,chrome,oprea,Safari中可用
        var pageWidth=window.innerWidth;
        var pageHeight=window.innerHeight;
        //判断css渲染方式
        if(typeof  pageHeight != "number"){
            //标准模式
            if(document.compatMode == "CSS1Compat"){
                pageHeight=document.documentElement.clientHeight;
                pageWidth=document.documentElement.clientWidth;
            }else{
                //混杂模式
                pageWidth=document.body.clientWidth;
                pageHeight=document.body.clientHeight;
            }
        }
        return [pageWidth,pageHeight];
    }

    /**
     * 获取浏览器类型和设备类型
     * @returns {*[]}
     */
    function  getClientType(){
        var engine={
            ie:false,
            gecko:false,
            webkit:false,
            khtml:false,
            opera:false
        };
        var plantForm={
            ios:false,
            android:false
        };
        var ua=window.navigator.userAgent;

        //检测浏览器类型
        if(window.opera){
            engine.opera=true;
        }else if(/AppleWebKit\/(\S+)/.test(ua)){
            engine.webkit=true;
        }else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
            engine.khtml=true;
        }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
            engine.gecko=true;
        }else if(/MSIE ([^;]+)/.test(ua)){
            engine.ie=true;
        }

        //检测设备类型
        if(ua.indexOf("iPhone")){
            plantForm.ios=true;
        }else if(ua.indexOf("Android")){
            plantForm.android=true;
        }
        return [engine,plantForm];

    }

    /**
     * 获取元素所有的属性
     * 参数:DOM元素
     * 返回值:包含属性的键值对二维数组数组[[key,value],[key,value],[key,value]]
     * @param elem
     * @returns {Array}
     */
    function getAllAttributes(elem){
        var attrArr=[]; //存所有的属性值对
        var attributes=elem.attributes;
        for(var i = attributes.length-1 ; i > -1 ; i-- ){
            //将键值对存为数组
           if(attributes[i].specified){
               attrArr.push([attributes[i].nodeName,attributes[i].nodeValue]);
           }
        }
        return attrArr;
    }

    /**
     * 获取所有子元素节点
     * 参数:父节点
     * 返回值；子元素节点数组 [childElement,childElement]
     * @param parentNode
     * @returns {Array}
     */
    function  getChildElements(parentNode){
        var childNodes=[];
        var children=parentNode.childNodes;
        for(var i = children.length-1 ; i > -1 ; i--){
            if(children[i].nodeType==1){
                childNodes.push(children[i]);
            }

        }
        return childNodes;
    }

    /**
     * 动态加载外部js文件，然后回调
     * 参数:外部js的url,回调函数
     * @param url
     * @param callBackStr
     */
    function  loadScript(url,callBackStr){
        var oScript=document.createElement("script");
        oScript.type="text/javascript";
        oScript.src=url;
        try {
            oScript.appendChild(document.createTextNode(callBackStr));
        }catch (ex){
            oScript.text=callBackStr;
        }
        document.body.appendChild(oScript);

    }

    /**
     * 动态加载样式表
     * 参数:样式表的url
     * @param url
     */
    function loadCss(url){
        var oLink=document.createElement("link");
        oLink.type="text/css";
        oLink.rel="stylesheet";
        oLink.href=url;
        document.getElementsByTagName("head")[0].appendChild(oLink);
    }
    /**
     * 返回工具方法的公共接口
     */
    return{
        trim:trim,
        hasPrototypeProperty:hasPrototypeProperty,
        inheritanceFn:inheritanceFn,
        createPrototypeObj:createPrototypeObj,
        getClientWH:getClientWH,
        getClientType:getClientType,
        getAllAttributes:getAllAttributes,
        getChildElements:getChildElements,
        loadScript:loadScript,
        loadCss:loadCss
    }
})();