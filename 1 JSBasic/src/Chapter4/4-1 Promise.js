/* 비동기 처리를 할때 js에서는 callback방식의 작업을 주로 함
    작업을 web이나 node API에 맡기고 결과가 돌아왔을 때 어떤 작업을 해야한다는 것을 callback으로 명시하는데,
    보통 이 경우 callback hell이라는 활 모양의 방식으로 동작하게 됨
    -> 가독성의 문제, callback hell로 인해 너무 많은 변수들이 외부에 보이게 됨
    이 경우 Promise객체를 사용

    Promise : 프로미스가 생성될 때 꼭 알 수 있지는 않은 값을 위한 대리자
            비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위한 처리기를 연결하게 함
            프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환
            다만, 최종 결과를 반환하지는 않고, 프로미스를 반환해서 미래의 어떤 시점에 결과를 제공    
*/

// @ts-check
/* eslint-disable no-new */
/* eslint-disable no-console */

new Promise((resolve, reject) => {
  console.log('Inside Promise') // 출력됨
  reject(new Error('First reject'))
  resolve('First resolve') // resolve가 실행되고 나면 프로미스는 다음 단계를 거치게 됨
})
  .then((value) => {
    console.log('Inside first then') // 출력됨
    console.log('value', value) // value = resolve를 실행한 값
  })
  .catch((error) => {
    console.log('error', error) // resolve가 실행되기 전 reject가 실행되어 오류 발생
    // -> then()이 실행되지 않고 catch로 바로 넘어감
  })

// -------------------------------------------------------------------------------
console.log('catch를 먼저 쓰게 된다면 ? ==============')

new Promise((resolve, reject) => {
  console.log('Inside Promise') // 출력됨
  reject(new Error('First reject'))
  resolve('First resolve')
})
  .catch((error) => {
    console.log('error', error) // error를 catch로 잡은 후 then()이 실행됨!!!
  })
  .then((value) => {
    console.log('Inside first then')
    console.log('value', value) //  하지만, resolve가 실행되지 않았기 때문에 value = undefined
  })

// => Promise는 어떤 상태로 결정되면 변하지 않는다 !!!

// -------------------------------------------------------------------------------
console.log(
  '그럼 콜스택에서 reject와 resolve가 각자 실행되고 있을까 ? yes !! =============='
)

new Promise((resolve, reject) => {
  console.log('Inside Promise') // 출력됨
  reject(new Error('First reject'))
  console.log('before resolve') // 출력됨
  resolve('First resolve')
  console.log('after resolve') // 출력됨
})
  .catch((error) => {
    console.log('error', error) // error를 catch로 잡은 후 then()이 실행됨
  })
  .then((value) => {
    console.log('Inside first then')
    console.log('value', value) //  하지만, resolve가 실행되지 않았기 때문에 value = undefined
  })

// -------------------------------------------------------------------------------
console.log(
  '콜스택에서 resolve가 먼저 실행 완료된다면 ? Promise = resolve 로 정해짐 ! =============='
)

new Promise((resolve, reject) => {
  console.log('Inside Promise') // 출력됨
  console.log('before resolve') // 출력됨
  resolve('First resolve')
  console.log('after resolve') // 출력됨
  reject(new Error('First reject'))
})
  .catch((error) => {
    console.log('error', error) // resolve가 먼저 실행 완료되었기 때문에 Promise값이 resolve실행값으로 바뀌고, 변하지 않음
    // = 에러가 발생하지 않음
  })
  .then((value) => {
    console.log('Inside first then') // 출력됨
    console.log('value', value) // 출력됨
  })

// ===============================================================================
console.log('Promise를 유용하게 써보기 !!!!!!!!!!!!!')

new Promise((resolve, reject) => {
  console.log('Before Timeout') // Timeout 전에 출력됨
  setTimeout(() => {
    resolve(Math.random())
    console.log('After Timeout') // 출력됨
  }, 1000)
})
  .then((value) => {
                            // Timeout 후에 모두 순차적으로 출력됨
    console.log('then 1')
    console.log('value', value)
  })
  .then(() => {
    console.log('then 2')
  })
  .then(() => {
    console.log('then 3')
  })

// -------------------------------------------------------------------------------
console.log('then을 활용한 응용')

function returnPromiseForTimeout() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Math.random())
          }, 1000)
        })
}

returnPromiseForTimeout()
    .then((value) => {
        console.log(value)
        return returnPromiseForTimeout()    // 새로운 Promise를 return
    })
    .then((value) => {      // 새로운 Promise가 resolve 된 후에야 다시 실행
        console.log(value)
        return returnPromiseForTimeout()
    }).then((value) => {
        console.log(value)
        return returnPromiseForTimeout()
    }).then((value) => {
        console.log(value)
        return returnPromiseForTimeout()
    })

returnPromiseForTimeout()
// Promise가 chain을 타고 순차적으로 실행됨
// 비동기코드임에도 불구하고 시간 순으로 어떻게 진행되는지 순차적으로 잘 보임!!
// 더불어 모든 코드가 scope를 잘 이루기 때문에 상호참조에 관한 문제는 없음

// 하지만 아래 코드는 .... 
console.log('위 코드를 promise 없이 짜보기') // => Callback Hell : 활 모양의 코드

setTimeout(() => {
    const value1 = Math.random()
    console.log(value1)
    setTimeout(() => {
        const value2 = Math.random()
        console.log(value2)
        setTimeout(() => {
            const value3 = Math.random()
            console.log(value3)    
            setTimeout(() => {
                const value4 = Math.random()
// 이러한 코드는 내부에서 value1, value2, value3에 접근 가능하기 때문에 디버깅이 힘들다 ㅠ
                console.log(value4)                
            }, 1000)            
        }, 1000)
    }, 1000)
}, 1000)

