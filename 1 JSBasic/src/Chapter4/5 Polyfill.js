// @ts-check
/* Polyfill : JS standard library에 표준으로 등록되어 있으나 아직 브라우저나 Node.js에서 구현되지 않은 기능을
              미리 써볼 수 있도록 만들어진 구현체 (core.js 등..)
              * 원본 코드는 그대로 두고 함수를 추가하여, 함수가 호출될 때 문제가 없도록 작동함
              npm install core-js

    ** es버전 관리는 jsconfig.json 의 compilerOptions - lib 에서 설정 가능
*/

require('core-js')

const complicatedArray = [1, [2, 3]]
const flattenedArray = complicatedArray.flat()
// flat() : subArray를 바깥으로 빼주어서 평평하게 만드는 함수 (깊이 통일 !!)

console.log(flattenedArray)

const original = 'abcabc123'
const changed = original.replace('abc', '123') // 123abc123
const changed2 = original.replaceAll('abc', '123') // 123123123
console.log(changed)
console.log(changed2)

/**
 * @param {number} duration
 * @returns */

function sleep(duration) {
  return new Promise((resolve) => {
    console.log('sleep start')

    setTimeout(() => {
      console.log('sleep done', duration)
      resolve(duration)
    }, 1000)
  })
}

// Promise.all() ==================================================================

Promise.all([sleep(1000), sleep(1500), sleep(2000)]).then((value) => {
  console.log('Promise.all done!', value)
  // sleep이 동시에 실행된 후 제일 먼저 완료 된 동작부터 출력됨
})

function alwaysReject() {
  return new Promise((resolve, reject) => {
    reject()
  })
}

// Promise.all()에서 reject가 실행될 경우 ------------------------------------------

// Promise.all([sleep(1000), sleep(1500), sleep(2000), alwaysReject()]).then(
//     () => {
//       console.log('Promise.all done!') // 에러 발생
//       // Promise.all은 모든 동작이 완료되어야 다음 동작으로 넘어갈 수 있음 !
//     }
//   )

// Promise.allSettled() =========================================================
Promise.allSettled([
  // allSettled는 resolve가 되었든, reject가 되었든 then으로 넘어가게 됨!
  sleep(1000),
  sleep(1500),
  sleep(2000),
  alwaysReject(),
]).then((value) => {
  console.log('Promise.all done!', value)
  //   Promise.all done! [
  //     { status: 'fulfilled', value: 1000 },
  //     { status: 'fulfilled', value: 1500 },
  //     { status: 'fulfilled', value: 2000 },
  //     { status: 'rejected', reason: undefined }
  //   ]
})
