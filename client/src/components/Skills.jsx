 
const skillGroups = [
  {
    title: "Frontend",
skills: ["HTML5", "CSS3", "JavaScript", "React", "Vite"], },
{
title: "Backend",
skills: ["Node.js", "Express", "REST APIs", "JSON", "Validation"],
}, {
skills: ["Git", "GitHub", "VS Code", "Render", "Vercel"], },
];
function Skills() {
  return (
<section className="section section-muted" id="skills"> <div className="container">
<p className="section-label">Skills</p> <h2>Technologies I use</h2> 
<div className="skills-grid"> {skillGroups.map((group) => (
<article className="skill-card" key={group.title}> <h3>{group.title}</h3>
<div className="skill-list">
{group.skills.map((skill) => ( <span key={skill}>{skill}</span>
))} </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Skills;