// 方便操作cookie的库
import Cookies from 'js-cookie';

/**
 * 设置某个cookie
 * @param { String } cookieName cookie名字
 * @param { Object } obj cookie内容
 */
export function setCookie(cookieName, obj = {}) {
  // cookie的时效为7天
  Cookies.set(cookieName, obj, { expires: 7 });
}

/**
 * 删除某个cookie
 * @param { String } cookieName cookie名字
 */
export function cancellationCookie(cookieName) {
  if (Cookies.get(cookieName)) {
    Cookies.remove(cookieName);
  } else {
    console.log('此cookie不存在');
  }
}
