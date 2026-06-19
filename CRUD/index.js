import express from "express"
const app = express();

const port =  3000;

app.use(express.json());


const allTodos = [];

// create todo  

app.post('/todo', (req, res)=> {

    allTodos.push({
        title: req.body,
        id: Date.now()
    });

    res.status(201).json({
        message: "new todo created",
        todos: allTodos,
    })

})

// get all todo

app.get('/todo',(req, res)=>{

    res.status(201).json(
        {
             todos: allTodos,
        }
    )

})

// get single todo 

app.get('/todo/:id' , (req, res)=>{
    const {id} = req.params;
    const index = allTodos.findIndex((item) => item.id === +id)
    console.log(index, id);

    if(index === -1){
        return res.status(404).json({
            message: "todo not found",
        })
    }
    res.status(200).json({
        todo: allTodos[index]
    })
})


// Delete todo 

app.delete('/todo/:id' , (req, res)=>{
    const {id} = req.params;
    const index = allTodos.findIndex((item) => item.id === +id)
    console.log(index, id);

    if(index === -1){
        return res.status(404).json({
            message: "todo not found",
        })
    }
    allTodos.splice(index,1);

    res.status(200).json({
        message:"todo deleted",
        todo: allTodos
    })
})

// Edit todo 

app.put('/todo/:id', (req, res)=>{
    const {id} = req.params;
    const {title} = req.body;
    const index = allTodos.findIndex((item)=> item.id === +id)
    console.log(index, id )

    if(index === -1){
        return res.status(404).json({
            message: "todo not found",
        })
    }

    allTodos[index].title = title;

    
    res.status(200).json({
        message: "todo updated",
        todo: allTodos

    })

})


app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});






































// import express from "express"
// const app = express()
// const port = 3000
// app.use(express.urlencoded({extended:true}));

// app.post ('/form',(req,res)=>{
//     console.log(req.body)
//     res.send("form recived")
// });

// app.listen(port,()=>{
//     console.log(`app is listening on port ${port}`)
// })












