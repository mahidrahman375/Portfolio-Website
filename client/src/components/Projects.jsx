 
import { useEffect, useState } from "react"; import { getProjects } from "../api";
function Projects() {
const [projects, setProjects] = useState([]);
const [status, setStatus] = useState("loading"); const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    let active = true;
    getProjects()
      .then((data) => {
if (active) { setProjects(data); setStatus("success");
} })
      .catch((error) => {
        if (active) {
setErrorMessage(error.message);
setStatus("error"); }
});
    return () => {
      active = false;
};
}, []);
return (
<section className="section" id="projects">
<div className="container">
<p className="section-label">Projects</p> <div className="section-heading-row">
<h2>Selected work</h2>
<p>Project information is loaded from the Express backend.</p> </div>
{status === "loading" && (
<p className="notice" role="status">
            Loading projects...
                                          </p> )}
{status === "error" && (
<p className="notice notice-error" role="alert">
Could not load projects: {errorMessage} </p>
)}
{status === "success" && (
<div className="projects-grid">
{projects.map((project) => (
<article className="project-card" key={project.id}>
             
<p className="project-category">{project.category}</p> <h3>{project.title}</h3>
<p>{project.description}</p>
<div className="technology-list"> {project.technologies.map((technology) => (
<span key={technology}>{technology}</span> ))}
</div>
<div className="project-links"> <a
href={project.githubUrl} target="_blank" rel="noreferrer"
>
Source code
</a> <a
href={project.liveUrl} target="_blank" rel="noreferrer"
>
Live demo
</a> </div>
    </article>
  ))}
</div>
                             
)}
      </div>
    </section>
); }
export default Projects;
      