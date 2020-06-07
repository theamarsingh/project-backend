const express = require('express');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded());

const employees = [
  {id: 1, name: "Amar", surveys: [{id: 1, surveys: "Survey1"}, {id: 2, surveys: "Survey2"},{id: 3, surveys: "Survey3"},{id: 4, surveys: "Survey4"},{id: 5, surveys: "Survey5"}  ], completedSurveys: []},
  {id: 2, name: "Zeeshan", surveys: [{id: 1, surveys: "Survey1"}, {id: 2, surveys: "Survey2"},{id: 3, surveys: "Survey3"},{id: 4, surveys: "Survey4"}], completedSurveys: []},
  {id: 3, name: "Dixit", surveys: [{id: 1, surveys: "Survey1"}, {id: 2, surveys: "Survey2"},{id: 3, surveys: "Survey3"}], completedSurveys: []},
];

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employee/:id', (req, res) => {
  res.json(employees.find(employee => employee.id === +req.params.id).surveys);
});

app.put('/complete-survey/:employeeId/:surveyId', (req, res) => {
  console.log(+req.params.employeeId, +req.params.surveyId);
  const employee = employees.find(employee => employee.id === +req.params.employeeId);
  const survey = employee.surveys.find(item => item.id === +req.params.surveyId);
  employees.find(employee => employee.id === +req.params.employeeId).completedSurveys.push(survey);
  employees.find(employee => employee.id === +req.params.employeeId).surveys.filter(item => item.id === +req.params.surveyId)
  res.json(employees);
});

app.post('/employee',(req,res)=>{
  console.log(req.body);
  res.status(200).send({message:'successful post request'})
})

const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
