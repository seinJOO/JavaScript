// Prototype
/* eslint-disable */

function Person(name) {
  this.name = name
}

Person.prototype.greet = function greet() {
  return `Hi, ${this.name}!`
}

function Student(name) {
  this.__proto__.constructor(name) // 부모의 constructor 실행시키기
}

Student.prototype.study = function study() {
  return `${this.name} is studying.`
}

Object.setPrototypeOf(Student.prototype, Person.prototype) // Student와 Person의 연결관계(상속) 생성

const me = new Student('Sein') // new를 통해 함수에 접근 시 함수는 생성자의 역할을 하게 됨
console.log(me) // Student { name: 'Sein' }
// 디버깅 시 me에 property가 잘 입력됨을 확인 가능
// me의 __proto__ > __proto__에서 Object임을 확인 가능
// 디버그 콘솔에서 me.으로 메서드들을 보면 다양한 메서드 확인 가능
// me.toString() : '[object Object]'
// me.name : 'Sein'

console.log(me.greet()) // Hi, Sein!
// 디버깅 시 me > prototype에 greet이 생성됨을 확인 가능
// Student 클래스의 내용이 없을 경우 Hi, undefined로 출력 - 부모(Person)의 constructor가 실행되지 않았기 때문

console.log(me.study())

console.log(me instanceof Student) // true
console.log(me instanceof Person) // true

const anotherPerson = new Person('Senny')
console.log(anotherPerson instanceof Student) // false - anotherPerson의 prototype체인을 타고 가도 Student클래스가 없음
console.log(anotherPerson instanceof Person) // true

// prototype 확인을 위한 instanceof는 주로 Array를 검사할 때 자주 사용된다
console.log([] instanceof Array, [] instanceof Object) // true true
