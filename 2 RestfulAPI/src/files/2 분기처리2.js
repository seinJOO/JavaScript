// @ts-check

const http = require('http')

/**
 * Post와 관련된 API 설계
 * 
 * GET /posts : 포스트 전체 조회 기능
 * GET /posts/:id - 해당 id를 가진 포스트 조회 기능
 * POST /posts - 새로운 포스트 작성(body에 들어갈 특정 인자 필요)
 */

// ** 정규표현식을 통해 Id가 포함된 경우의 분기처리하기 **

const server = http.createServer((req, res) => {
    const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/  
    // :id 부분을 정규표현식 변수로 대체하여 분기처리 
    // * (정규표현식) -> 캡쳐그룹(괄호)로 묶어준 것

    if (req.url === "/posts" && req.method === "GET") { 
        res.statusCode = 200
        res.end("List of posts")

    } else if (req.url && POSTS_ID_REGEX.test(req.url)) {
        // %%의 의미 : 왼쪽이 무조건 True여야 오른쪽 연산 실행
        const regexResult = POSTS_ID_REGEX.exec(req.url)
        // .test() : boolean으로 return ((method) RegExp.test(string: string): boolean)
        // .exec() : 값이 어떻게 일치하는지도 return ((method) RegExp.exec(string: string): RegExpExecArray)

        if (regexResult) {            
            console.log(regexResult[1]) // 캡쳐그룹 사용을 통해 id값만 추출 가능
        }
        /*  regexResult를 로그에 출력 시
            캡쳐그룹 사용 : [ '/posts/senny', 'senny', index: 0, input: '/posts/senny', groups: undefined ]         
            캡쳐그룹 미사용 : [ '/posts/senny', index: 0, input: '/posts/senny', groups: undefined ]  */

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

})