import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

app.get('/api/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

app.post('/api/todos', (req, res) => {
    if(!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }
   const todo = {
     id: db.length + 1,
     title: req.body.title,
     description: req.body.description
   }
   db.push(todo);
   return res.status(201).send({
     success: 'true',
     message: 'todo added successfully',
     todo
   })
  });

  app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'todo does not exist',
    });
  });

  app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    db.map((todo, index) => {
      if (todo.id === id) {
         db.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'Todo deleted successfuly',
         });
      }
    });
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
  });