const db = require('../dbConfig.js');

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

function getTasks(id) {
  return db('tasks')
    .select(
      'projects.name', 
      'projects.description', 
      'tasks.description', 
      'tasks.notes', 
      'tasks.completed'
    )
    .join('projects', 'tasks.project_id', 'projects.id')
    .where({ 'projects.id': id })
    
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