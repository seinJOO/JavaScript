// @ts-check

const http = require('http')

/**
 * Post와 관련된 API 설계
 * 
 * GET /posts : 포스트 전체 조회 기능
 * GET /posts/:id - 해당 id를 가진 포스트 조회 기능
 * POST /posts - 새로운 포스트 작성(body에 들어갈 특정 인자 필요)
 */

// ** 테스트를 위한 간이 포스트 데이터를 JSDoc으로 만들어보기 ** 
// JSDoc : 함수나 변수가 어떤 파라미터를 받고, 어떤 변수를 리턴하고, 그 파라미터는 어떤 의미를 가지는지 등을 
//         주석으로 남기는 표준화된 방법 중 하나 -> TypeScript가 자동으로 parsing을 해서 type정보로 만들어줌

// 항목 중 한 가지가 빠지거나, 자료형이 맞지 않으면 vscode 자체에서 경고를 얻을 수 있게 type을 지정하기
// => TypeScript가 JSDoc을 알아서 parsing해서 에러를 알려주기 때문에 미리 에러를 캐치하며 코딩 가능 !!
// But, 일종의 주석이기 때문에 없어도 무관하며, JS 자체가 타입을 지정하는 정적 구조는 아니기 때문에 무관하다~

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */
/** @type {Post[]} */
const posts = [ 
    {
        id : 'my_first_post',
        title : 'My first post',
        content : 'Hello !'
    },
    {
        id : 'my_second_post',
        title : 'My second post',
        content : 'Hiroo ~'
    },
]

const server = http.createServer((req, res) => {
    const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/ 
    const postIdRegexResult = req.url && POSTS_ID_REGEX.exec(req.url) || undefined

    if (req.url === "/posts" && req.method === "GET") { 
        res.statusCode = 200
        res.end("List of posts")

    } else if (postIdRegexResult) { 
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

