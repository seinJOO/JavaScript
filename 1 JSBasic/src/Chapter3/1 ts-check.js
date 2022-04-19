// @ts-check
// TypeScript - Type Checking을 도와줌
// $ npm install --save-dev typescript
// $ npm install --save-dev @types/node
const someString = 'Hello'
const result = Math.log(someString) // => 문자열의 math.log계산 (말도안됨) => //@ts-check 만으로 오류 검출 가능(타입스크립트)
console.log(result) // => NaN

// 서버 생성하여 확인하기 - 타입 오류 시 TypeScript가 잘 잡아주는 것을 확인 가능
const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end('Hello!')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The servr is listening at port : ${PORT}.`)
})

// Formatting, Linting - 정적 분석 도구
// Formatting : prettier - 개인이 작성한 코드를 일정한 Code Format에 맞춰줌
//              $ npm i prettier -D -E
//              $ npm install --save-dev eslint-config-prettier => eslint가 prettier를 인식하도록 하는 플러그인
// Linting : ESLint - 잠재적 오류에 대한 코드를 분석하는 프로그램을 실행하는 프로세스
//           $ npm install --save-dev eslint
//           $ npm install --save-dev eslint-config-airbnb-base eslint-plugin-import

/* eslint-disable-next-line no-console */ //  => 다음 라인에서 console에 대해 eslint 기능을 끄기
console.log('hello world')
