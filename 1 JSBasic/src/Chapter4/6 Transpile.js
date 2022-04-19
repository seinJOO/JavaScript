// @ts-check

/*
    Transpile : 코드를 A 언어에서 B 언어로 변환하는 작업 - 구형 런타임에서 신규 문법적 언어를 활용하기 위해 사용
        예) 신규 언어 스펙에서 구형 언어 스펙으로 트랜스파일을 할 때 사용
    js에서의 트랜스파일러 : Babel, tsc(TypeScript Compiler), ESBuild
    
    * polyfill과는 달리 아예 존재하지 않는 새로운 문법을 사용하고자 할 때 transpile을 활용

    esbuild main.js --bundle --outfile=build/main.js --target=node10.4
*/

const obj = {
  foo: {
    bar: 1,
  },
}

const obj2 = [
  {
    foo: {
      bar: 1,
    },
  },
  {},
  {
    foo: {},
  },
]

console.log(obj.foo.bar) // bar를 가져오기
/* console.log(obj2.map((obj) => obj.foo.bar)) */
// TypeError: Cannot read properties of undefined (reading 'bar')
// obj.foo가 undefined일 경우가 있을 때, undefined에서 bar를 찾아서 오류가 남

console.log(
  // bar를 가져오기 -> [ 1, undefined, undefined ]
  obj2.map((obj) => {
    const { foo } = obj
    if (foo) {
      return foo.bar
    }
    return undefined
  })
)

// 깊이가 더 깊어진다면 ?? - baz를 가져오기
const obj3 = [
  {
    foo: {
      bar: {
        baz: 1,
      },
    },
  },
  {},
  {
    foo: {},
  },
]
console.log(
  // [ 1, undefined, undefined ]
  obj3.map((obj) => {
    const { foo } = obj
    if (foo) {
      const { bar } = foo // bar를 foo에서 가져오기
      if (bar) {
        return bar.baz
      }
    }
    return undefined
  })
)

console.log(obj3.map((obj) => obj.foo?.bar?.baz)) // [ 1, undefined, undefined ]
// ?.( = optional chaining) 를 통해 값이 있으면 더 실행하고, 없으면 실행하지 않게 설정

/* Transpile 사용해보기 =============================================================
    package.json의 scripts에 "build" : "esbuild src/main.js --bundle --outfile=build/main.js --target=node12.22" 설정 후
    터미널에 npm run build 명령어 실행

    const obj2 = [{ foo: { bar: 1 } },{}, { foo: {} }]
    console.log(obj3.map((obj) => obj.foo?.bar?.baz))
    -> 아래와 같이 구 버전 코드로 변경됨 !!!

(() => {
    // src/main.js
    console.log(obj3.map((obj) => {
      var _a, _b;
      return (_b = (_a = obj.foo) == null ? void 0 : _a.bar) == null ? void 0 : _b.baz;
    }));
  })();
  */
