// @ts-check

const http = require('http')

/**
 * Post와 관련된 API 설계
 * 
 * GET /posts : 포스트 전체 목록 조회 기능
 * GET /posts/:id - 해당 id를 가진 포스트 조회 기능
 * POST /posts - 새로운 포스트 작성(body에 들어갈 특정 인자 필요)
 */

// ** 포스트 목록 가져오기, 하나의 포스트 읽기, 포스트 추가하기 API 구현 **

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
        title : '나의 두번째 포스트',
        content : 'Hiroo ~'
    },
]

const server = http.createServer((req, res) => {
    const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/ 
    const postIdRegexResult = req.url && POSTS_ID_REGEX.exec(req.url) || undefined

    if (req.url === "/posts" && req.method === "GET") { 
        
        const result = {
            posts : posts.map(post => ({
                id : post.id,
                title : post.title,
            })),
            // map() : 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
            totalCount : posts.length,
        }

        res.statusCode = 200
        res.setHeader('Content-Type','application/json; charset=utf-8') 
        // setHeader() : 전송한 데이터를 타입에 맞게 이쁘게 출력하도록 response의 Header에 타입을 알려줌
        // 헤더에 Content-Type: application/json; charset=utf-8로 추가되어서 나옴
        res.end(JSON.stringify(result)) // 배열을 문자열인 JSON 문서로 변환하여 출력하기

    } else if (postIdRegexResult && req.method === 'GET') { 
        const postId = postIdRegexResult[1]        
        const post = posts.find(_post => _post.id === postId) 
        // _post : 그냥 post로 설정하면 shadowing error(eslint(no-shadow)) -> 변수명과 겹치기 때문에 안 겹치게 바꿔줌~
        
        if (post) { // post값이 있다면
            res.statusCode = 200
            res.setHeader('Content-Type','application/json; charset=utf-8')
            res.end(JSON.stringify(post))
        } else {
            res.statusCode = 404
            res.end('Post not found')
        }

        res.statusCode = 200
        res.end('Reading a post')

    // http POST localhost:4000/posts title=foo content=bar --print=hHbB
    // --print의 값에서 h와 b는 각 응답의 헤더와 바디, H와 B는 각 요청의 헤더와 바디를 의미함
    // 요청의 헤더와 바디만 보려면 --print=HB   응답의 헤더와 바디만 보려면 --pring=hb
    // http POST localhost:4000/posts title=foo content=bar

    } else if (req.url === "/posts" && req.method === "POST") {
        req.setEncoding('utf-8') // buffer가 binary값으로 출력되는 걸 방지하기 위한 코드

        req.on('data', (data) => {
            /** 
             * @typedef CreatePostBody
             * @property {string} title
             * @property {string} content
             */
            /** @type {CreatePostBody} */ // body가 any타입으로 지정되었기 때문에, 항목 분리 시 편의를 위해 type을 지정해줌
            const body = JSON.parse(data) // data를 JSON으로 parsing해서 원래 데이터 형태로 변환
            console.log(body)
            posts.push({    // js객체를 만들어놓았기 때문에 편리하게 push ~!
                id : body.title.toLowerCase().replace(/\s/g,'_'), // 모든 공백 문자를 찾아서 언더바로 변환
                // "\s" : 공백 문자     "g" : 전체 문자열을 탐색해서 모든 일치를 반환하도록 지정
                // id : body.title.toLowerCase().replace(' ','_'), // 소문자로 변경하고 공백을 언더바로 변환 -> 첫 공백 하나만 변환됨
                title : body.title,
                content : body.content
            })
        })
        // data 이벤트에 대한 listen
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

