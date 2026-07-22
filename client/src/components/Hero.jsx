 function Hero() {
  return (
<section className="hero section" id="top"> <div className="container hero-grid">
<div className="hero-copy">
<p className="eyebrow">Hello, my name is</p> <h1>
Yeamin Rahman Mahid
<span>I build useful web experiences.</span> </h1>
<p className="hero-text">
I am an undergraduate computer science student and junior full-stack developer who enjoys turning ideas into responsive, accessible applications.
</p>
<div className="hero-actions">
<a className="button button-primary" href="#projects">
              View my projects
            </a>
<a className="button button-secondary" href="#contact"> Contact me
</a> </div>
<div className="social-links" aria-label="Social profiles"> <a
href="https://github.com/mahidrahman375" target="_blank"
rel="noreferrer"
>
GitHub
</a> <a
href="https://www.linkedin.com/in/yeamin-rahman-mahid-957a551a9/" target="_blank"
rel="noreferrer"
>
LinkedIn
</a> </div>
                                        </div> 
<div className="hero-card" aria-label="Developer profile summary"> <div className="avatar" aria-hidden="true">
YA </div>
<p>Available for internships and junior opportunities</p> <ul>
<li>Responsive frontend development</li> <li>REST API development</li>
<li>Git and GitHub collaboration</li>
</ul> </div>
      </div>
    </section>
); }
export default Hero;