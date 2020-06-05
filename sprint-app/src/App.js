import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import Card from './components/Card'
import './App.css';
import ProjectForm from './components/ProjectForm';

const initialList = [{
  id: 0,
  name: "Michael",
  description: "has stuff to do."
}]

function App() {
  const [projectList, setProjectList] = useState(initialList);

  const getProjectList = () => {
    axios
      .get('http://localhost:8000/projects')
      .then(res => setProjectList(res.data))
      .catch(err => console.log(err))
  };
  useEffect(() => {
    getProjectList();
  }, projectList);

  

  return (
    <div>
    <ProjectForm />
    <div className='cards'>
    {
      projectList.map(project => {
            return <Card props = {project} />
          })} 
    </div>
    </div>
  );
}

export default App;