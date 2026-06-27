import express from 'express';
import cors from 'cors'

const app = express();

const port = 3000;

app.use(express.json())
app.use(cors());

const allTodos = [];
// Add todo 

app.post("/todo", (req, res)=>{
    const {title} = req.body

    if(!title){
        return  res.status(400).json({
            message: "Title is required"
        })
    }

    else{
        allTodos.push({
        title,
        id:Date.now()
    });

    res.status(201).json({
        message: "new todo created",
        todo: allTodos,
    })
    }
   
})

// get all todo 

app.get("/todo", (req, res)=>{
    res.status(200).json(
        {
            todos:allTodos,
        }
    )
})

// get single todo 

app.get('/todo/:id', (req, res)=>{
    const {id} = req.params;
    
    const index = allTodos.findIndex((item)=> item.id === +id);

    console.log(index, id)

    if(index === -1)
    {
        return res.status(404).json({
            message: "Todo not found"
        })
    }
    res.status(200).json({
        todo: allTodos[index]
    })

})

// delete todo 
app.delete("/todo/:id", (req, res)=>{
    const {id} = req.params
   const index = allTodos.findIndex((item)=> item.id === +id);

    console.log(index, id)

    if(index === -1)
    {
        return res.status(404).json({
            message: "Todo not found"
        })
    }
    allTodos.splice(index,1);
    res.status(200).json({
        message: "Todo deleted",
        todo: allTodos
    })


})

// edit todo 

app.put("/todo/:id", (req, res)=>{
    const {id} = req.params
    const{title} = req.body;

   const index = allTodos.findIndex((item)=> item.id === +id);

    console.log(index, id)

    if(index === -1)
    {
        return res.status(404).json({
            message: "Todo not found"
        })
    }

    if(!title){
        return res.status(400).json({
            message:"title is required",
        })
    }
    allTodos[index].title = title;
    
    res.status(204).json({
        message: "Todo edit",
        todo: allTodos[index]
    })


})


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})


























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












