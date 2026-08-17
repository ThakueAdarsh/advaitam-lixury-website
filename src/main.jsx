import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {ArrowRight, ChevronLeft, ChevronRight, Download, MapPin, Menu, Phone, Play, X} from "lucide-react";
import "./styles.css";

const images = {
  hero: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=2200&q=85",
  project1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  project2: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  project3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=85",
  life1: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
  life2: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85",
  life3: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=900&q=85",
  life4: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  destination: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=85"
};

const projects = [
  {name:"ADVAITAM 17", type:"Premium Residences", text:"Where nature meets contemporary living.", image:images.project1},
  {name:"ADVAITAM ENCLAVE", type:"Luxury Villas", text:"Private spaces. Timeless lifestyle.", image:images.project2},
  {name:"ADVAITAM RESORTS", type:"Resort Living", text:"Rejuvenate. Reconnect. Rediscover.", image:images.project3}
];

function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [slide,setSlide]=useState(0);
  const [modal,setModal]=useState(false);

  useEffect(()=>{
    const t=setInterval(()=>setSlide(s=>(s+1)%projects.length),5000);
    return ()=>clearInterval(t);
  },[]);

  const scrollTo=(id)=>{
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMenuOpen(false);
  };

  return <div className="site">
    <header className="header">
      <div className="nav-wrap">
        <a className="brand" href="#home" onClick={()=>scrollTo("home")}>
          <span>ADVAITAM</span><small>BUILDING DESTINATIONS</small>
        </a>
        <nav className={menuOpen ? "nav open":"nav"}>
          {["HOME","ABOUT US","PROJECTS","WHY ADVAITAM","DESTINATION","CONTACT"].map((item,i)=>{
            const ids=["home","about","projects","why","destination","contact"];
            return <button key={item} onClick={()=>scrollTo(ids[i])}>{item}</button>
          })}
          <button className="nav-cta" onClick={()=>setModal(true)}>BOOK A SITE VISIT</button>
        </nav>
        <button className="menu-btn" onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu">
          {menuOpen?<X size={21}/>:<Menu size={21}/>}
        </button>
      </div>
    </header>

    <main>
      <section id="home" className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,13,11,.76) 0%,rgba(5,13,11,.34) 52%,rgba(5,13,11,.12)),url(${images.hero})`}}>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">01</div>
            <h1>Building<br/><em>Nature-Inspired</em><br/>Luxury Destinations</h1>
            <p>Advaitam creates exceptional spaces that harmonize luxury, nature and timeless living.</p>
            <button className="text-link" onClick={()=>scrollTo("projects")}>EXPLORE OUR PROJECTS <ArrowRight size={17}/></button>
          </div>
          <div className="scroll">SCROLL<span></span></div>
        </div>
      </section>

      <section id="about" className="philosophy">
        <div className="section-label">OUR PHILOSOPHY</div>
        <h2>Beyond Real Estate. We Create Legacies.</h2>
        <div className="pillars">
          {[
            ["♧","Nature First","We design with nature, not against it."],
            ["⌁","Timeless Design","Thoughtful architecture that stands the test of time."],
            ["⌖","Prime Destinations","Carefully chosen locations with unmatched potential."],
            ["◇","Enduring Value","Spaces that deliver lifestyle enrichment and long-term value."]
          ].map(([icon,title,text])=><div className="pillar" key={title}>
            <div className="pillar-icon">{icon}</div><h3>{title}</h3><p>{text}</p>
          </div>)}
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="section-label">OUR PROJECTS</div>
        <h2>Three Distinct Experiences.<br/>One Philosophy.</h2>
        <div className="project-stage">
          <button className="slider-btn left" onClick={()=>setSlide((slide-1+3)%3)}><ChevronLeft/></button>
          <div className="project-grid">
            {[0,1,2].map((offset)=>
              <ProjectCard key={offset} project={projects[(slide+offset)%3]} />
            )}
          </div>
          <button className="slider-btn right" onClick={()=>setSlide((slide+1)%3)}><ChevronRight/></button>
        </div>
        <div className="dots">{projects.map((_,i)=><button key={i} className={i===slide?"active":""} onClick={()=>setSlide(i)} aria-label={`Slide ${i+1}`}/>)}</div>
      </section>

      <section id="why" className="lifestyle">
        <div className="life-intro">
          <div className="section-label">CRAFTED FOR LIFE</div>
          <h2>Spaces that inspire.<br/>Experiences that stay.</h2>
          <button className="text-link dark" onClick={()=>scrollTo("destination")}>VIEW LIFESTYLE <ArrowRight size={17}/></button>
        </div>
        <div className="life-gallery">
          {[images.life1,images.life2,images.life3,images.life4].map((src,i)=><img src={src} alt="Advaitam lifestyle" key={i}/>)}
        </div>
      </section>

      <section id="destination" className="destination" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.78),rgba(5,12,10,.28)),url(${images.destination})`}}>
        <div className="destination-copy">
          <div className="section-label">DESTINATION</div>
          <h2>Jim Corbett.<br/><em>Nature's Finest.</em></h2>
          <p>A land of breathtaking beauty, thriving wildlife, and rising opportunities.</p>
          <button className="text-link" onClick={()=>setModal(true)}>EXPLORE DESTINATION <ArrowRight size={17}/></button>
        </div>
        <button className="play" onClick={()=>alert("Destination film coming soon.")}><span><Play size={19} fill="currentColor"/></span><small>PLAY VIDEO</small></button>
      </section>

      <section className="cta">
        <h2>Begin your journey with Advaitam.</h2>
        <div className="cta-actions">
          <button className="gold-btn" onClick={()=>setModal(true)}>BOOK A SITE VISIT</button>
          <button className="outline-btn" onClick={()=>alert("Brochure download will be connected to your PDF.")}>DOWNLOAD BROCHURE <Download size={16}/></button>
        </div>
      </section>
    </main>

    <footer id="contact" className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="brand"><span>ADVAITAM</span><small>BUILDING DESTINATIONS</small></div>
          <p>Building nature-inspired luxury destinations that create lasting value for generations.</p>
          <div className="socials"><span>in</span><span>f</span><span>◎</span></div>
          <small>© 2026 Advaitam. All Rights Reserved.</small>
        </div>
        <div><h4>QUICK LINKS</h4><a onClick={()=>scrollTo("about")}>About Us</a><a onClick={()=>scrollTo("why")}>Why Advaitam</a><a onClick={()=>scrollTo("destination")}>Destination</a><a>Gallery</a><a onClick={()=>scrollTo("contact")}>Contact</a></div>
        <div><h4>PROJECTS</h4><a>Advaitam 17</a><a>Advaitam Enclave</a><a>Advaitam Resorts</a></div>
        <div><h4>CONTACT</h4><a><Phone size={13}/> +91 9999 999 999</a><a>✉ info@advaitam.com</a><a><MapPin size={13}/> Jim Corbett,<br/>Uttarakhand</a></div>
      </div>
      <div className="footer-bottom"><span>Privacy Policy</span><span>Terms & Conditions</span></div>
    </footer>

    {modal && <div className="modal-backdrop" onClick={()=>setModal(false)}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={()=>setModal(false)}><X/></button>
        <div className="section-label">ADV AITAM</div>
        <h2>Book a Site Visit</h2>
        <p>Tell us a little about yourself and our team will get back to you.</p>
        <form onSubmit={e=>{e.preventDefault();alert("Thank you! Our team will contact you shortly.");setModal(false)}}>
          <input required placeholder="Your name"/>
          <input required type="tel" placeholder="Phone number"/>
          <input required type="email" placeholder="Email address"/>
          <select defaultValue=""><option value="" disabled>Preferred project</option><option>Advaitam 17</option><option>Advaitam Enclave</option><option>Advaitam Resorts</option></select>
          <button className="gold-btn" type="submit">SUBMIT REQUEST</button>
        </form>
      </div>
    </div>}
  </div>
}

function ProjectCard({project}){
  return <article className="project-card" style={{backgroundImage:`linear-gradient(0deg,rgba(4,9,8,.88),rgba(4,9,8,.08) 65%),url(${project.image})`}}>
    <div className="card-copy"><h3>{project.name}</h3><strong>{project.type}</strong><p>{project.text}</p><button>EXPLORE PROJECT <ArrowRight size={15}/></button></div>
  </article>
}

createRoot(document.getElementById("root")).render(<App/>);