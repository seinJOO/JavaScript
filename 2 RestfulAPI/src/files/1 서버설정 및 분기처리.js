// @ts-check
// 프레임워크 없이(외부 dependency) 간단한 토이프로젝트 웹서버 만들어보기

/* 블로그 포스팅 서비스
    - 로컬 파일을 데이터베이스로 활용 (JSON)
    - 인증 로직은 넣지 않는다
    - RESTful API를 사용 : http의 작은 subset만을 사용할 예정 - get() / post() 등등..., 테스트도 편리하고 구조가 사용자 입장에서 직관적임
 */

// 기본적인 서버 생성
const http = require('http')

// 매번 서버를 가동시키지 않아도 자동으로 해주는 툴 nodemon 설치 : npm install --save-dev nodemon
// package.json에 scripts -> server 설정 변경 =>  npm run server로 구동

/**
 * Post와 관련된 API 설계
 * 
 * GET /posts : 포스트 전체 조회 기능
 * GET /posts/:id - 해당 id를 가진 포스트 조회 기능
 * POST /posts - 새로운 포스트 작성(body에 들어갈 특정 인자 필요)
 */

// url에 따른 분기 처리 설정
const server = http.createServer((req, res) => {
    if (req.url === "/posts" && req.method === "GET") { 
        res.statusCode = 200
        res.end("List of posts")
    } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) {  
        // id가 일치할 때만 블록이 동작하게 함 (정규표현식 -> ^:시작, \:escape, $:끝)
        // req.url이 존재하고 && req.url 뒤의 /_ 이 정규표현식을 만족할 때 아래 코드 실행
        res.statusCode = 200
        res.end("Some content of the post")
    } else if (req.url === "/posts" && req.method === "POST") {
        res.statusCode = 200
        res.end('Creating post')
    } else {
        res.statusCode = 404
        res.end('Not found...')
    }
})

const PORT = 4000

server.listen(PORT, () => {
    console.log(`The server is listening at port: ${PORT}`)
    // 서버 테스트를 위한 툴 : HTTPie => pip install --upgrade httpie
// http localhost:4000 으로 위에 생성한 서버 테스트
})
/*
    PS C:\Users\sein1\CLASS\JavaScript> http localhost:4000
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 6
    Date: Sun, 17 Apr 2022 10:06:45 GMT
    Keep-Alive: timeout=5

    Hello!
*/

