/* eslint-disable */
/* Spread Syntax (...)
    - ES2015에서 새로 추가된 syntax
    - 병합 구조, 분배 할당(destructuring) 등에 다양하게 활용 가능
*/

const { arrayBuffer } = require('stream/consumers')
const { createImportSpecifier } = require('typescript')

// Object Merge 1 =================================================================

const personalData = {
  nickname: 'JH',
  email: 'jh12@email.com',
}

const publicData = {
  age: 22,
}

const user = {
  ...personalData, // 변수 내에 있는 데이터를 흩뿌려서(spread) 대입한다 !
  ...publicData,
}
// { nickname: 'JH', email: 'jh12@email.com', age: 22 }     // user 출력결과

// Object Merge 2 =================================================================
const overrides = {
  DATABASE_HOST: 'myhost.com',
  DATABASE_PASSWORD: 'mypassword',
}

const config = {
  // ...overrides,  -> spread syntax를 앞에 쓰면 overrides에 중복되는 값이 config값으로 덮어씌워짐
  DATABASE_HOST: 'default.host.com',
  DATABASE_PASSWORD: '****',
  DATABASE_USERNAME: 'myuser',
  ...overrides, // 기존에 overrides에 있던 값을 덮어쓰기 가능 !!!
}

/* {                                // config 출력결과
  DATABASE_HOST: 'myhost.com',
  DATABASE_PASSWORD: 'mypassword',
  DATABASE_USERNAME: 'myuser'
} */

// [예시]
const shouldOverride = true
const user2 = {
  ...{
    email: 'abc@def.com',
    password: '****',
  },
  ...{
    nickname: 'foo',
  },
  ...(shouldOverride
    ? {
        email: 'aa@bbb.com', // true일 때 email의 value값을 aa@bbb.com으로 override
      }
    : null),
}
console.log(user2) // false -> { email: 'abc@def.com', password: '****', nickname: 'foo' }
console.log(user2) // true ->  { email: 'aa@bbb.com', password: '****', nickname: 'foo' }

// Object rest =================================================================
const user1 = {
  nickname: 'JH',
  age: 22,
  email: 'jh12@email.com',
}

const { nickname, ...personalData1 } = user1 // user1에서 nickname을 제외한 데이터들을 personalData1 변수로 빼옴
console.log(personalData1) // { age: 22, email: 'jh12@email.com' }

// Array Merge =================================================================
const pets = ['dog', 'cat']
const predators = ['wolf', 'cougar']
const animals = [...pets, ...predators] // 두 배열을 손쉽게 합칠 수 있음 !!!
console.log(animals) //  [ 'dog', 'cat', 'wolf', 'cougar' ]

const [head, ...rest] = [1, 2, 3]
console.log(head) // 1
console.log(rest) // [ 2, 3 ]

// [예시 1]
const ary = [1, 2, 3, 4, 5]
const [head, ...rest] = ary
console.log(head, ...rest) // 1 2 3 4 5

// [예시 2]
function foo(head, ...rest) {       // 인자값을 자동으로 묶어서 처리 가능
    console.log(head)       // 1
    console.log(rest)       // [ 2, 3, 4 ]
}
foo(1,2,3,4)
