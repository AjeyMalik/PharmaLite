import { API_URL, LOGIN_API_URL } from "index/Constant";
import { IStandardAPIResponse } from "index/vm";

export const sanitizeUrl = (url: string) => {
  if (url[url.length - 1] === '/') {
    return url.slice(0, url.length - 1);
  }
  return url;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
  localStorage.removeItem('selectedMenuGroup')
  localStorage.removeItem('selectedMenu')
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('selectedMenuGroup')
  localStorage.removeItem('selectedMenu')
};

export const groupBy = (data: Array<any>, prop: string) => {
  return data.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

export function getToken() {
  let res = localStorage.getItem('token');
  if (res === null || res === undefined) {
    return '';
  }
  return res;
}

export const parseJwt = (tokenParsed?: string) => {
  let token;
  if (!tokenParsed) {
    token = getToken();
  } else {
    token = tokenParsed;
  }
  if (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  return undefined;
};

export const httpClient = async <T>(
  url: string,
  type: string,
  obj: any = undefined
): Promise<IStandardAPIResponse<T>> => {
  try {
    type = type.toUpperCase();
    if (type.toLowerCase() === 'get' && obj) {
      var params = Object.keys(obj)
        .map(function (key) {
          return key + '=' + obj[key];
        })
        .join('&');
      url += '?' + params;
      obj = undefined;
    }

    let res = await fetch(API_URL + url, {
      method: type.toUpperCase(),
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        token: getToken(),
      },
    });
    return await res.json();
  } catch (error) {
    console.group(`API ${type} Error`);
    console.error(error);
    console.groupEnd();
    throw error;
  }
};

export const isTokenExpired = () => {
  var token = getToken();
  if (token) {
    let user = parseJwt(token);
    var cur_time = new Date().getTime() / 1000;
    if (user && user.exp && cur_time < user.exp) {
      return false;
    }
    return true;
  } else {
    return true;
  }
};

export const removeNulls = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeNulls(obj[key]);
    } else if (obj[key] === '' || obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};

export function debounce<F extends (...params: any[]) => void>(
  fn: Function,
  delay: number
) {
  let timeoutID: any = null;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}