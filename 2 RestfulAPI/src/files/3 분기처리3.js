// @ts-check

const http = require('http')

/**
 * Post와 관련된 API 설계
 * 
 * GET /posts : 포스트 전체 조회 기능
 * GET /posts/:id - 해당 id를 가진 포스트 조회 기능
 * POST /posts - 새로운 포스트 작성(body에 들어갈 특정 인자 필요)
 */

// ** 어떤 postId 인지 알아내기 **

const server = http.createServer((req, res) => {
    const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/  
    // :id 부분을 정규표현식 변수로 대체하여 분기처리 
    // * (정규표현식) -> 캡쳐그룹(괄호)로 묶어준 것
    const postIdRegexResult = req.url && POSTS_ID_REGEX.exec(req.url) || undefined
    // ||의 의미 : 왼쪽이 무조건 False여야 오른쪽 연산 무조건 실행 -> null인 경우 undefined로 처리

    if (req.url === "/posts" && req.method === "GET") { 
        res.statusCode = 200
        res.end("List of posts")

    } else if (postIdRegexResult) { // GET /posts/:id가 존재하는 경우
        const postId = postIdRegexResult[1]
        console.log(`postId: ${postId}`)
        res.statusCode = 200
        res.end('Reading a post')

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

})

