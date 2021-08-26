function setCookie(name, value, iDay) {
  //传值为名，值，过期时间
  if (iDay) {
    //如果有过期时间的话则执行这个条件
    var oDate = new Date() //获取当且的事件戳
    oDate.setDate(oDate.getDate() + iDay) //设置过期事件
    document.cookie = name + '=' + value + '; path=/; expires=' + oDate //设置cookie
  } else {
    //如果有过期时间的话则执行这个条件 设置cookie
    document.cookie = name + '=' + value + '; path=/' //名，值以及根目录
  }
}
//获取cookie值
function getCookie(name) {
  var arr1 = document.cookie.split('; ')
  //获取cookie值并且用”；“ 来进行切割成数组
  for (var i = 0; i < arr1.length; i++) {
    //循环本数组
    var arr2 = arr1[i].split('=') //再次利用split（）方法进行切割为二维数组
    if (arr2[0] == name) {
      //循环二维数组，当第一个值为你所传的值则返回本数组的第二个值
      return arr2[1]
    }
  }
  return 'notfound'
}
//删除cookie
function removeCookie(name) {
  setCookie(name, 'del', -1) //再次调用setCookie,关键是把过期时间设置为负值
}
