import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import Card from './components/Card'
import './App.css';


const initialList = [{
  id: 0,
  name: "Michael",
  description: "has stuff to do."
}]

const initialProject = {
  name: "",
  description: ""
}

function App() {
  const [projectList, setProjectList] = useState(initialList);
  const [project, setProject] = useState(initialProject);

  const getProjectList = () => {
    axios
      .get('http://localhost:8000/projects')
      .then(res => setProjectList(res.data))
      .catch(err => console.log(err))
  };
  useEffect(() => {
    getProjectList();
  }, []);
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    setProject({
        ...project,
        [e.target.name]: value
    })
}

const handleSubmit = e => {
    e.preventDefault();
    axios
        .post("http://localhost:8000/projects", project)
        .then(res => {
            console.log(res)
            getProjectList();
        })
        .catch(err => {
            console.log(err)
        })
}


  

  return (
    <div>
            <div className="form">
            <h2>Add a project</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="name"
                    value={project.title}
                    />

                <input
                    type="text"
                    name="description"
                    onChange={changeHandler}
                    placeholder="description"
                    value={project.description}
                    />
                    <button>Add</button>
            </form>
        </div>
    <div className='cards'>
    {
      projectList.map(project => {
            return <Card props = {project} getProjectList={getProjectList}/>
          })} 
    </div>
    </div>
  );
}

export default App;