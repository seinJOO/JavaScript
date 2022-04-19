// Prototype의 기본 syntax를 Syntax Sugar를 이용해 Class로 사용해보기
/* eslint-disable */

class Person {

  constructor(name) {
    this.name = name
  }

  greet() {
    return `Hi, ${this.name}.`
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }
  study() {
    return `${this.name} is studying.`
  }
}
// 디버깅 시 클래스도 prototype 체인으로 이루어짐을 확인 가능
const me = new Student('sein')
console.log(me.study()) // sein is studying.
console.log(me.greet()) // Hi, sein.
