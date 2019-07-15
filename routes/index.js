import express from 'express';
import db from '../db/db';

const router = express.Router();

router.get('/api/todos', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      todos: db
    })
  });
  
  router.post('/api/todos', (req, res) => {
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
  
    router.get('/api/todos/:id', (req, res) => {
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
  
    router.delete('/api/todos/:id', (req, res) => {
      const id = parseInt(req.params.id, 10);
    
      db.map((todo, index) => {
        if (todo.id === id) {
           db.splice(index, 1);
           return res.status(204).send({
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
  
    router.put('/api/todos/:id', (req, res) => {
      const id = parseInt(req.params.id, 10);
      let todoFound;
      let itemIndex;
      db.map((todo, index) => {
        if (todo.id === id) {
          todoFound = todo;
          itemIndex = index;
        }
      });
      if (!todoFound) {
        return res.status(404).send({
          success: 'false',
          message: 'todo not found',
        });
      }
      if (!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required',
        });
      } else if (!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required',
        });
      }
    
      const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
      };
      db.splice(itemIndex, 1, updatedTodo);
    
      return res.status(200).send({
        success: 'true',
        message: 'todo updated successfully',
        updatedTodo,
      });
    });

    router.patch('/api/todos/:id', (req, res) => {
      const id = parseInt(req.params.id, 10);
      let todoFound;
      let itemIndex;
      db.map((todo, index) => {
        if (todo.id === id) {
          todoFound = todo;
          itemIndex = index;
        }
      });
      
      return res.status(200).send({
        success: 'true',
        message: 'todo updated successfully',
      });
    });

export default router;
