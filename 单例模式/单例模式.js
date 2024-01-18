// es6静态方法实现单例模式
class SingleDog {
    show() {
        console.log('我是一个单例对象');
    }

    static getInstance() {
        if (!SingleDog.instance) {
            SingleDog.instance = new SingleDog();
        }

        // 如果已经有唯一的实例了就返回这个实例
        return SingleDog.instance;
    }
}

const s1 = SingleDog.getInstance();

// es6 闭包实现单例模式
// const SingleDog2 = (function () {
//     let instance;
//     SingleDog.getInstance = function () {
//         if (!instance) {
//             instance = new SingleDog2();
//         }

//         return instance;
//     };
//     function SingleDog() {
//         this.show = function () {
//             console.log('我是单例');
//         };
//     };
//     return SingleDog
// })();

// const ss1 = SingleDog2.getInstance();
// const ss2 = SingleDog2.getInstance();
// // console.log(ss1 === ss2);

/**
 * 改造可以通过new 关键字 创建实例
 */
 const SingleDog2 = (function () {
    let instance;
    function SingleDog2() {}
    return function() {
        if (!instance) {
            instance = new SingleDog2();
        }
        return instance
    }
})();
const ss1 = SingleDog2();
const ss2 = SingleDog2();
console.log(ss1 === ss2);
/**
 * 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
 */

// 方法一
class Storage {

    static getInstance() {
        if(!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }

    setItem(key,value) {
        return localStorage.setItem(key,value)
    }

    getItem(key) {
        return localStorage.getItem(key)
    }
}
// 方法二
class SingleDog {
    constructor() {
        const fun = SingleDog.getInstance(); // 在es6中的静态方法是不可以通过new关键字 创建实例的
        if (!SingleDog.instance) {
            SingleDog.instance = new fun();
        }
        return SingleDog.instance;
    }

    static getInstance() {
        return class {
            setItem(value, key) {
                return localStorage.setItem(value, key);
            }

            getItem(key) {
                return localStorage.getItem(key);
            }
        };
    }
}
const s = new SingleDog().setItem('key', 'yang');
const s1 = new SingleDog().setItem('key', 'yang1');
console.log(new SingleDog().getItem('key'));
console.log(s === s1);
