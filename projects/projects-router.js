const express = require('express');
const Projects = require('./projects-model.js');
const router = express.Router();

// get all projects
router.get('/projects', (req, res) => {
  Projects.getProjects() // running function from projects-model which just returns projects
   .then(project => { 
     res.status(200).json(              
       project.map(projects => {       // mapping through projects because I have to check the boolean in the object
         if (projects.completed === 0) {  // if completed = 0, return the projects with completed as FALSE
           return {
             ...projects,
             completed: false
           }
         } else { // if project shows anything but 0, then return the projects and the completed as TRUE
           return {
             ...projects,
             completed: true
           }
         }
       })
     )
   })
   .catch(error => {
     res.status(500).json({ errorMessage: 'Failed to retrieve the projects', error })
   })
})

// get all resources
router.get('/resources', (req, res) => {
  Projects.getResources()
    .then(resources => {
      res.status(200).json(resources)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error retrieving resources', error})
    })
})

// get tasks 
router.get('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  Projects.getTasks(id)
    .then(task => {
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({ errorMessage: 'Could not find task with the specified ID'})
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Failed to retrieve tasks', error})
    })
    
});

router.post('/resources', (req, res) => {
  const newResource = req.body;
  Projects.addResource(newResource)
    .then(resource => {
      res.status(201).json(resource)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Failed to add resource', error })
    });
});

// adding a new project 
router.post('/projects', (req, res) => {
  const projectData = req.body;

  Projects.addProject(projectData)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Failed to add project', error })
    })
})

router.post('/projects/:id/tasks', (req, res) => {
  const newTask = req.body;
  const { id } = req.params;

  Projects.getTasks(id)
    .then(project => {
      if (project) {
        Projects.addTask(id, newTask)
          .then(task => {
            res.status(201).json(task)
          })
      } else {
        res.status(404).json({ errorMessage: 'Could not find project with the specified ID' })
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to create a new task!', error })
    })
})

module.exports = router;