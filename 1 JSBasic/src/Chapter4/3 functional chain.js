// @ts-check
/* eslint-disable no-restricted-syntax */

/**
 * @typedef Person
 *
 * @property {number} age
 * @property {string} city
 * @property {string | string[]} [pet]
 */

// 간이로 데이터 만들기
/** @type {Person[]} */
const people = [
  {
    age: 20,
    city: '서울',
    pet: ['cat', 'dog'],
  },
  {
    age: 40,
    city: '부산',
  },
  {
    age: 31,
    city: '대구',
    pet: ['cat', 'dog'],
  },
  {
    age: 36,
    city: '서울',
  },
  {
    age: 27,
    city: '부산',
    pet: 'cat',
  },
  {
    age: 24,
    city: '서울',
    pet: 'dog',
  },
]
// A. 30대 미만이 한 명이라도 사는 모든 도시

// 1) for로 풀기
function solveA() {
  /** @type {String[]} */
  const cities = []

  for (const person of people) {
    // people 데이터에서 하나씩 끌어오기
    if (person.age < 30) {
      if (!cities.find((city) => person.city === city)) {
        // 찾은 city값이 => person.city === city 가 아니라면 (중복제거)
        cities.push(person.city)
      }
    }
  }
  return cities
}

// 2) functional approach로 풀기 - 데이터를 한 줄씩으로 변형하는 절차가 없어서 더 간단함 !
// Array 메서드만 가지고 풀이 가능
function solveAModern() {
  // filter() : 조건에 맞는 값만 배열로 반환
  // map() : 기존의 값을 다시 정의하거나 새로운 형태의 값을 정의 (객체를 직접 사용하거나 변형시키지는 않으나, callbackfn을 통해 수정 가능 - 문제 발생 원인)
  // const allCities = people.filter((person) => person.age < 30).map((person) => person.city)
  const allCities = people.filter(({ age }) => age < 30).map(({ city }) => city)
  // 구조 분해 할당(object distructuring)을 활용하여 깔끔하게 !
  const set = new Set(allCities) // 중복이 불허되는 Set객체로 만들어주기
  return Array.from(set)
}

console.log(solveA())
console.log(solveAModern())

//  B. 각 도시별로 개와 고양이를 키우는 사람의 수    {서울 : { dog : 2, cat : 1}, ....}

// 1) for로 풀기
/** @typedef {Object.<string, Object.<string, number>>} PetsOfCities */

function solveB() {
  /** @type {PetsOfCities} */
  const result = {}

  for (const person of people) {
    const { city, pet: petOrPets } = person

    if (petOrPets) {
      const petsOfCity = result[city] || {} // [문제1해결1] - 먼저 pet값이 없으면 city값도 없애준다

      if (typeof petOrPets === 'string') {
        const pet = petOrPets // 여러개일 경우 배열로 묶기

        // result[city][pet] = result[city][pet] + 1 // [문제1] city가 없거나, pet이 없거나 등의 문제 발생 가능
        // PetsOfCity[pet] = PetsOfCity[pet] ? +1 : 1 // [문제1해결2] pet이 있는 경우의 값만 가져오기 때문에, result[city]를 petsOfCity로 대체 !!

        // [문제1 해결3] 한번 더 값 검증! city에 pet값이 없으면 0으로 대체
        const origNumPetsOfCity = petsOfCity[pet] || 0
        petsOfCity[pet] = origNumPetsOfCity + 1
      } else {
        for (const pet of petOrPets) {
          const origNumPetsOfCity = petsOfCity[pet] || 0
          petsOfCity[pet] = origNumPetsOfCity + 1
        }
      }

      result[city] = petsOfCity
    }
  }

  return result
}

function solveBModern() {
  return people
    .map(({ pet: petOrPets, city }) => {
      // 문자열이나 배열로 들어올 pet을 배열로 통일하여 처리하기
      const pets =
        (typeof petOrPets === 'string' ? [petOrPets] : petOrPets) || [] // undefined일 경우 비어있는 []로 묶임

      return {
        city,
        pets,
      }
      /* [
        { city: '서울', pets: [ 'cat', 'dog' ] },
        { city: '부산', pets: [] },
        { city: '대구', pets: [ 'cat', 'dog' ] },
        { city: '서울', pets: [] },
        { city: '부산', pets: [ 'cat' ] },
        { city: '서울', pets: [ 'dog' ] }
        ] */

    }) 
    .flatMap(({ city, pets }) => pets.map((pet) => [city, pet]))  // flat() : 여러 겹으로 싸여진 배열을 꺼내서 이쁘게 만들어줌
    /** [
        [ '서울', 'cat' ],
        [ '서울', 'dog' ],
        [ '대구', 'cat' ],
        [ '대구', 'dog' ],
        [ '부산', 'cat' ],
        [ '서울', 'dog' ]
        ] */
    .reduce(( /** @type {PetsOfCities} */ result, [city, pet]) => { 
        // reduce(result, 각 array의 값) => {시작인자},{끝인자}: array를 한 바퀴 돌면서 연산하여 새로운 형태의 값을 정의
        if (!city || !pet) {
            return result
        }

        return {     // 원하는 모양을 만든 후 return
            ...result,      // result 안에 있는 property를 해체하여 레퍼런스가 다른 새로운 object 생성
            [city] : {
                ...result[city],
                [pet] : (result[city]?.[pet] || 0) + 1     // ?. : 앞이 undefined / null이 아닐 경우 이어서 연산하는 오퍼레이션
            }
        }
    }, {})
    
}

console.log(solveB())
console.log(solveBModern())
