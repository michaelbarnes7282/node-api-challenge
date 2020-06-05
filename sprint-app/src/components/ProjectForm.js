import React, { useState, useEffect } from "react";
import axios from 'axios';

const initialProject = {
    name: "",
    description: ""
}

const ProjectForm = () => {
    const [project, setProject] = useState(initialProject);
    
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
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
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
    )
}

export default ProjectForm;