// @ts-check

const http = require('http')

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
            totalCount : posts.length,
        }

        res.statusCode = 200
        res.setHeader('Content-Type','application/json; charset=utf-8') 
        res.end(JSON.stringify(result))

    } else if (postIdRegexResult && req.method === 'GET') { 
        const postId = postIdRegexResult[1]        
        const post = posts.find(_post => _post.id === postId) 

        if (post) {
            res.statusCode = 200
            res.setHeader('Content-Type','application/json; charset=utf-8')
            res.end(JSON.stringify(post))
        } else {
            res.statusCode = 404
            res.end('Post not found')
        }

        res.statusCode = 200
        res.end('Reading a post')


    } else if (req.url === "/posts" && req.method === "POST") {
        req.setEncoding('utf-8') 

        req.on('data', (data) => {
            /** 
             * @typedef CreatePostBody
             * @property {string} title
             * @property {string} content
             */
            /** @type {CreatePostBody} */ 
            const body = JSON.parse(data) 
            console.log(body)
            posts.push({    
                id : body.title.toLowerCase().replace(/\s/g,'_'), 
                title : body.title,
                content : body.content
            })
        })
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

