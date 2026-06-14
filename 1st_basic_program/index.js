// import express from "express";

// // App create ->> Express application bna rahi ha  ->> app server ko control karega

// const app = express();

// //Server kis port par chalega

// const port = 3000;

// //Route

// app.get('/',(req, res)=>{
//     res.send("I am home!")
// })

// app.get('/about',(req, res)=>{
//     // //  res.json() or res.send() main koi fark nhi dono 1 jasa han

//     // res.send("I am about !")  //->> sirf HTML bhej sakta hai
    
//     //res.json()automatically content -type : application/josn set karta hai aur object serialize karta hai 
//     // res.json({
//     //     name:'Ali',
//     //     city: 'karachi'

//     // })
    
//     res.status(200).json({
//         message: 'sab theek!'
//     })

// })


// app.get('/contact',(req, res)=>{
//     res.send("I am contact!")
// })

// app.get('/services',(req, res)=>{
//     res.send("I am services!")
// })

// //1: req.params test 

// // app.get('/users/:id',(req,res)=>{
// //     const userId = req.params.id 
// //     res.json({userId})
// // })


// app.get('/posts/:postId/commets/:commetId',(req,res) => {
//     res.json(
//         {
//             postId: req.params.postId,
//             commetId: req.params.commetId
//         }
//     )
// })

// 2:  req.query test 

// // app.get('/search',(req,res)=>{
// //     res.json({ 
// //      query: req.query.q, 
// //      limit: req.query.limit})
// // })

// // localhost:3000/search?q=express&limit=5


//3: dono ek saath params or query

// app.get('/posts/:postId/comments',(req, res)=>{
//     res.json({
//         postId:req.params.postId,
//         sort: req.query.sort || 'latest'
//     })
// })

// // localhost:3000/posts/3/comments?sort=oldest


// // req.query

// // app.get('/search',(req, res)=>{
// //     const {q, limit} = req.query
// //     res.json({
// //         searchTerm: q, limit: limit || 20
// //     })
// // })

// // app.get('/api/notes', (req, res)=>{
// //     const{category, sort} = req.query
// //     res.json({
// //         category,sort
// //     })
// // })



// ........................ Express.Routes .........................

// const router = express.Router() // GET /api/notes
//  router.get('/', (req, res) => { 
//     res.json([{ 
//         id: 1,
//          title: 'Pehli note'
//          }]) 
//         })

// module.exports = router

// //Server start ->> SERVER ko start karta hai aur port 3000 par listen karwata hai 
// app.listen(port, ()=>{
//     console.log(`app is listening on port ${port}`)
// })

// Browser request bhejta hai.
// Express routes check karta hai.
// /contact route match ho jata hai.
// Callback function execute hota hai.
// res.send() response browser ko bhej deta hai.
// Browser us response ko display kar deta hai.




// import express from "express";

// const app = express();
// const port = 3000;

// 1: req.params
// jab URL ka andar data bhejna ho 

// app.get('/user/:id/:idn', (req, res) => {
//     console.log(req.params);
//     console.log(req.params.id);
//     res.send("User route");
// });

// 2: req.query 

// jab URL ka end ma ? laga kar data bheja jaya 

// app.get('/search', (req, res)=>{
//     console.log(req.query);
//     res.send("seraching...")
//     console.log(req.query.name);
//     console.log(req.query.age)
// })

// 3: req.body ->

// jab frontend ya postman request body ma data bheje 

// pehla middleware ->

// app.use(express.json());

// route ->

// app.post('/register', (req, res)=>{
//     console.log(req.body);
//     res.send("registered");
// })

// const checkmiddleware = (req, res, next)=>{
//     console.log("check middleware")
//     next();
// };

// app.get("/", checkmiddleware, (req,res)=>{
//     res.send("hello world")
// })



// app.listen(port, ()=>{
//     console.log(`app is listning on port ${port}`)
// })

 
import express from "express";

const app = express()
const port = 3000;

app.use(express.json()); //-> middleware parsec json into  javescript object

const allTodos = [];

// create a new todo 
app.post('/todo', (req, res)=>{
    const {title} = req.body;
    allTodos.push({
        title,
        id:Date.now(),
    });

    res.status(201).json({
        message: "new todo created",
        todos: allTodos,
    })

});

// get all todo 

app.get('/todo',(req,res) =>{
    res.status(200).json(
        {
            todos: allTodos,
        }
    )
})

// get single todo 

app.get('/todo/:id',(req, res)=>{
    const {id} = req.params;
   const  index = allTodos.findIndex((item)=> item.id === +id)
   console.log(index, id );

    if(index === -1){
        return res.status(404).json({
            message: "todo not found",
        })
    }
    res.status(200).json({
        todo: allTodos[index],
    })

})

// delete todo 

app.delete('/todo/:id',(req, res)=>{
    const {id} = req.params;

   const  index = allTodos.findIndex(
    (item)=> item.id === +id
    )
   console.log(index, id );

    if(index === -1){
        return res.status(404).json({
            message: "todo not found..!",
        })
    }
    allTodos.splice(index,1);

    res.status(204).json({
        message: "todo deleted",
        todos: allTodos
    })

})

// edit todo 

app.put('/todo/:id',(req, res)=>{

    const {id} = req.params;
    const {title} = req.body

   const  index = allTodos.findIndex(
    (item)=> item.id === +id
    )
   console.log(index, id );

    if(index === -1){
        return res.status(404).json({
            message: "todo not found..!",
        })
    }
   allTodos[index].title = title;

   res.status(200).json({
        message: "todo updated",
        todo: allTodos[index]
   });

});



app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})

















