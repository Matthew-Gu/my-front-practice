const cookieHandler = () => {
  // 定义一个合并对象的函数，用于合并多个对象的属性到一个对象中
  function mergeObjects(target) {
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      for (let key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }

  // 返回一个对象，用于操作 Cookie
  return (function CookieManager(cookieConverter, defaultAttributes) {
    // 设置 Cookie 的方法
    function setCookie(name, value, options) {
      if (typeof document !== 'undefined') {
        options = mergeObjects({}, defaultAttributes, options);

        if (typeof options.expires === 'number') {
          options.expires = new Date(Date.now() + options.expires * 60 * 60 * 1000);
        }

        // 将过期时间转换为 UTC 字符串
        if (options.expires) {
          options.expires = options.expires.toUTCString();
        }

        // 对 name 和 value 进行编码
        name = encodeURIComponent(name)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        // 构建 Cookie 字符串
        let cookieString = '';
        for (let key in options) {
          if (options[key]) {
            cookieString += '; ' + key;
            if (options[key] !== true) {
              cookieString += '=' + options[key].split(';')[0];
            }
          }
        }

        // 将 Cookie 写入到 document.cookie
        document.cookie = name + '=' + cookieConverter.write(value, name) + cookieString;
      }
    }
    function getCookie(name) {
      if (typeof document !== 'undefined' && (!arguments.length || name)) {
        let cookies = document.cookie ? document.cookie.split('; ') : [];
        let cookieData = {};
        for (let i = 0; i < cookies.length; i++) {
          let parts = cookies[i].split('=');
          let cookieValue = parts.slice(1).join('=');
          try {
            let cookieName = decodeURIComponent(parts[0]);
            if (name === cookieName) {
              cookieData[cookieName] = cookieConverter.read(cookieValue, cookieName);
              break;
            }
          } catch (error) {}
        }
        return name ? cookieData[name] : cookieData;
      }
    }

    // 返回一个操作 Cookie 的对象
    return Object.create(
      {
        // 设置 Cookie 的方法
        set: setCookie,

        // 获取 Cookie 的方法
        get: getCookie,

        // 删除 Cookie 的方法
        remove: function (name, options) {
          setCookie(name, '', mergeObjects({}, options, { expires: -1 }));
        },

        // 配置 Cookie 的属性的方法
        withAttributes: function (attributes) {
          return CookieManager(cookieConverter, mergeObjects({}, defaultAttributes, attributes));
        },

        // 配置 Cookie 的编码和解码方法的方法
        withConverter: function (converter) {
          return CookieManager(mergeObjects({}, cookieConverter, converter), defaultAttributes);
        },
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(cookieConverter) },
      }
    );
  })(
    {
      // 读取 Cookie 的方法
      read: function (value) {
        if (value.charAt(0) === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      },

      // 写入 Cookie 的方法
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        );
      },
    },
    { path: '/' } // 默认属性，设置 Cookie 的默认路径为 "/"
  );
};

const cookies = cookieHandler();

cookies.set('username', 'john', { expires: 24 });

// 测试输出
console.log('username', cookies.get('username'));
