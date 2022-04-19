/* eslint-disable */
/*
    TC39위원회에서 JS 표준을 만듬
    node.green 에서 node 버전 별 기능 및 개발 진행 상황 확인 가능 - 새로운 기능 반영 가능 유무 체크 !

*/
// <JS에서 최근의 큰 변화>
// let, const : ES6에 추가된 변수 선언 키워드
// - hosting 규칙이 없고, block scoping을 지원 -> var보다 훨씬 예측 가능한 코드 설계 가능

/* let vs const ============================================================= */
let x = 1
x = 2
console.log(x) // 2 -> let은 레퍼런스가 바뀔 수 있다

const y = 1 // const = 상수
// y = 2   TypeError: Assignment to constant variable.

/* let & const vs var ======================================================= */
// 1) var는 같은 scope 내에서 같은 변수를 두 번 이상 정의할 수 있으나,
//    let과 const는 불가능하다
var a = 1
var a = 2
console.log(a) // 2 -> var는 같은 scope 내에서 같은 변수를 두 번 이상 정의 가능

let b = 1
// let b = 2    SyntaxError: Identifier 'b' has already been declared
// => let과 const는 불가 !!!

// 2) var는 변수 선언 라인 전에 변수에 접근은 가능하나, let과 const는 불가능하다.

console.log(c) // undefined => 선언 라인 전에 변수에 접근은 가능하다
var c = 0

// console.log(d)   ReferenceError: Cannot access 'c' before initialization
const d = 0

/* Block scoping ============================================================= */
// 1) var는 scoping rule이 없음
//    -> 위에서 변수 선언을 하고 block 안에서 재정의를 할 때 블럭 바깥의 변수를 가져오는 것 
//       (블럭 바깥의 변수와 안의 변수는 같은 것 !)
//   하지만, let과 const는 모두 같은 scoping rule을 따름
//    -> 블럭 밖에서 선언한 변수와 블럭 안에서 선언한 변수는 서로 다른 변수 !!!
var e = 1
{
  var e = 2
  console.log(e) // 2
}
console.log(e)   // 2

const f = 1
{
    const f = 2
    console.log(f)  // 2
}
console.log(f)      // 1

// ========== 정리 ============
/*
    let과 const의 예측 가능성과 유지보수성이 var보다 훨씬 뛰어남
    가능하다면 const만 쓰고, 
    필요한 경우(레퍼런스가 바뀌어야만 하는 경우)에 let을,
    var는 쓰지 않는 게 best practice !!
*/
