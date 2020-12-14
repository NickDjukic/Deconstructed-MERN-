const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Task = require('../../models/Task');

router.get('/:userId', (req, res) => { // /api/tasks/:userId
  const { userId } = req.params;
  
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: 'User not found' })
      } else {
          Task.find().all('userId', user._id )
            .then(tasks => res.json(tasks))
            .catch(err => res.json(err))
      }
    })
})

router.get('/:taskId', (req, res) => {
  const { taskId } = req.params;

  Task.findById(taskId)
    .then(task => {
      if (!task) {
        return res.status(400).json({ msg: 'Task not found' })
      } else {
        return res.json(task)
      }
    })
})

router.patch('/:userId', (req, res) => {

    const { userId } = req.params
    const questionsAnswered = JSON.parse(req.body.questionsAnswered)
    User.findById(userId)
        .then(user => { 
            if (!user) {
                return res.status(400).json({ msg: 'User not found' })
            } else { 
                user.questionsAnswered = questionsAnswered
                debugger
                questionsAnswered.forEach(questionId => {
                    Task.findOne({ userId: user._id, questionId })
                        .then(task => {
                            debugger
                            if (!task) {
                                const newTask = new Task({
                                    questionId,
                                    userId: user._id
                                })
                                newTask.save()
                                debugger
                                user.taskIds.push(newTask._id)
                            } else {
                                res.json(user)
                            }
                        })
                    })
                }
                user.save()
                    .then(resp => res.json(resp))
        })
})

router.delete('/:taskId', (req, res) => { // /api/tasks/:taskId
  const { taskId } = req.params;
  debugger
  Task.findByIdAndRemove(taskId) 
    .then(task => {
      debugger
      if(!task) {
        res.status(404).json({msg: 'Not found'})
      } else {
        res.json(task)
      }
    })
})

module.exports = router;