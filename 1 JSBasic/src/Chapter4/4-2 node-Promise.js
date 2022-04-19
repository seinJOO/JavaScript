// @ts-check

// [예제] Promise로 오류 처리하며 파일 읽어오기
const fs = require('fs')

/** @param {string} fileName */

function readFileInPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}

readFileInPromise('README.md').then((value) => console.log(value))

fs.promises.readFile('README.md', 'utf-8').then((value) => console.log('promiseAPI',value))
// 매번 Promise 객체를 생성하여 감싸주지 않아도 promise API가 제공되고 있기 때문에 사용 가능

// ====================================================================================

/* async function : Promise를 돌려주는 함수
    Promise를 return하는 함수는 async function으로 만들 수 있고,
    async function은 다른 async function 안에서 await할 수 있음 !
 */    
// async-await를 쓰지 않았을 때 코드 ============================

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, duration) 
  })
}

sleep()
  .then((value) => {
      console.log(value)
      return sleep()      // then으로 구현하면 필연적으로 return을 넣어줘야 하기 때문에 복잡함
  })
  .then((value) => {      
      console.log(value)
      return sleep()
  }).then((value) => {
      console.log(value)
      return sleep()
  }).then((value) => {
      console.log(value)
      return sleep()
  })

// async-await를 썼을 때 코드 ============================

/** @param {number} duration */

async function sleep(duration) {
return new Promise((resolve) => {
  setTimeout(() => {
    resolve(undefined)
  }, duration) // 시간이 지나고 나서야만 다음 함수 실행
})
}

async function main() {     // async-await 함수를 사용하면 깔끔하게 가능!
console.log('first')
await sleep(1000)
console.log('second')
await sleep(1000)
console.log('third')
await sleep(1000)
console.log('finish!')
}

main()

// async-await으로 파일 불러오기 예제 구현 ====================================================

async function main() {
  try {                 // async-await 구문 안에서 try-catch로 오류 핸들링 가능 !!
      const result = await fs.promises.readFile('README.md', 'utf-8')
      console.log('async await', result)
  } catch(error) {
      console.log('error', error)
  }  
}
main()
