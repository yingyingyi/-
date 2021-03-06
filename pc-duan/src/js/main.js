/*
 头部模块
 */
export default function () {
    //实现头部点击切换class
    const navLiNodes = document.querySelectorAll('.nav li');
    const arrowNode = document.querySelector('.arrow');
    const ulNode = document.querySelector('#content>ul');
    const contentNode = document.querySelector('#content');

    //缓存高度
    const contentHeight = contentNode.offsetHeight;
    //缓存小箭头一半的宽度
    const arrowHalfWidth = arrowNode.offsetWidth / 2;

    //代表li的下标
    let nowIndex = 0;

    //ie/chrome
    document.onmousewheel = wheel;
    //firefox
    document.addEventListener && document.addEventListener('DOMMouseScroll', wheel);

    let wheeltimer = null;

    function wheel(event) {
        event = event || window.event;

        let flag = '';
        if (event.wheelDelta) {
            //ie/chrome
            if (event.wheelDelta > 0) {
                flag = 'up';
            } else {
                flag = 'down';
            }
        } else if (event.detail) {
            //firefox
            if (event.detail < 0) {
                flag = 'up';
            } else {
                flag = 'down';
            }

        }

        switch (flag) {
            case 'up' :
                /*if (nowIndex < 0) nowIndex = 0;
                 ulNode.style.top = - nowIndex * contentHeight + 'px';*/
                if (nowIndex > 0) {
                    nowIndex--;
                    move(nowIndex);
                    //函数防抖
                    clearInterval(wheeltimer)
                    wheeltimer = setInterval(() =>{

                    },200)

                }
                break;
            case 'down' :
                if (nowIndex < 4) {
                    nowIndex++;
                    move(nowIndex);
                }
                break;
        }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;


    }

    function move(nowIndex) {
        //将所有的class清空
        for (var j = 0; j < navLiNodes.length; j++) {
            navLiNodes[j].className = '';
        }
        //将当前点击的元素添加active class
        navLiNodes[nowIndex].className = 'active';
        //切换小箭头的位置
        arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
        //内容区ul的top
        ulNode.style.top = - nowIndex * contentHeight + 'px';
    }

    //遍历绑定事件监听
    for (let i = 0; i < navLiNodes.length; i++) {
        navLiNodes[i].onclick = function () {
            //同步nowIndex的值
            nowIndex = i;
            move(nowIndex);
        };

    }

    //初始化让小箭头来到第一个li下面
    arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

}