const db = require('../dbConfig.js');
// adding in required exports
module.exports = {
  getProjects,
  getResources,
  getTasks,
  addProject,
  addResource,
  addTask
};

function getProjects() {
  return db('projects'); 
}

function getResources() {
  return db('resources');
}

// when retrieving a list of tasks project name/project description should be included
// including description, notes and completed because that is part of tasks
function getTasks(id) {
  return db('tasks')
    .select(
      'projects.name', 
      'projects.description', 
      'tasks.description', 
      'tasks.notes', 
      'tasks.completed'
    )
    .join('projects', 'tasks.project_id', 'projects.id') // joining the projects table otherwise this function will not know where to get projects name and projects description from
    .where({ 'projects.id': id }) 
    .then(tasks => {  
      return tasks.map(task => { 
        // mapping through tasks. I have to map through because you have to check each individual task
        // spreading in the task and marking the completed as a true/false instead of number
        return { ...task, completed: Boolean(task.completed) }; 
        // found on w3schools that putting Boolean before () will return true/false of whatever is in ()
      })
    })
    
}

function addResource(newResource) {
  return db('resources')
    .insert(newResource)
    .then(ids => ({ id: ids[0] }));
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return { id: ids[0] }
    })
}

function addTask(id, task) {
  let newTask = { ...task, project_id: id };
  return db('tasks').insert(newTask);
}