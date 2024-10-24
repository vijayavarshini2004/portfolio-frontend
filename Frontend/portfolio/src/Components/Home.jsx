import axios from 'axios'; // For making API calls
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import profilePlaceholder from "./images/Component 29.png";
import facebook from "./images/facebook.png";
import gmail from "./images/gmail.png";
import insta from "./images/instagram.png";
import linkedin from "./images/linkedin.png";
import abtimg from "./images/Portfolio4.jpg";
import portprj from "./images/portfolioproject.jpg";

const Home = () => {
  const [profileData, setProfileData] = useState({});
  const [aboutData, setAboutData] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch profile, about, skills, and projects data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileResponse = await axios.get('https://vvarshini.pythonanywhere.com/api/profiles/');
        setProfileData(profileResponse.data[0] || {}); // Assuming the response is a list and we take the first item

        // Fetch about data
        const aboutResponse = await axios.get('https://vvarshini.pythonanywhere.com/api/about/');
        setAboutData(aboutResponse.data[0] || {}); // Assuming the response is a list and we take the first item

        // Fetch skills data
        const skillsResponse = await axios.get('https://vvarshini.pythonanywhere.com/api/skills/');
        setSkills(skillsResponse.data || []);

        // Fetch projects data
        const projectsResponse = await axios.get('https://vvarshini.pythonanywhere.com/api/homepage-projects/');
        setProjects(projectsResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="homepage-container">
        <div className="homepage-overlay"></div>

        {/* Navbar */}
        <div className="homepage-content">
          <nav className="navbar">
            <div className="navbar-left">
              <a href="#home"><h2>{profileData.name || 'Vijaya Varshini'}</h2></a>
            </div>
            <div className="navbar-right">
              <ul>
                <li><a href="#about-section"><h3>About</h3></a></li>
                <li><a href="#experience-section"><h3>Experience</h3></a></li>
                <li><a href="#projects-section"><h3>Projects</h3></a></li>
                <li><a href="#contact-section"><h3>Contact</h3></a></li>
              </ul>
            </div>
          </nav>

          {/* Profile Section */}
          <div className="profile-section">
            <img src={profilePlaceholder} alt="Profile Avatar" className="profile-avatar" />
            <div className="profile-intro">
              <h2>Hello I'm</h2>
              <h1>{profileData.name || 'Vijaya Varshini'}</h1>
              <h2>{profileData.designation || 'Frontend Developer'}</h2>
              <a href={profileData.resume || profileData.resume} className="download-resume-btn" target='_blank'>Download Resume</a>
            </div>
          </div>

          {/* About Section */}
          <div id="about-section" className="about-section">
            <h1 className="section-heading">About Me</h1>
            <div className="about-content">
              <div className="about-text">
                <p>{aboutData.point_1}</p>
                <p>{aboutData.point_2}</p>
                <p>{aboutData.point_3}</p>
                <p>{aboutData.point_4}</p>
              </div>
              <div className="about-image">
                <img src={abtimg} alt="About" />
              </div>
            </div>
          </div>

          {/* Experience Section */}
  <div id="experience-section" className="experience-section">
  <h1>My Experience</h1>
  <div className="skills">
    {skills.map(skill => (
      <div className="skill-item" key={skill.id}>
        <img src={skill.icon || './images/default-skill.png'} alt="Skill" />
      </div>
    ))}
  </div>
</div>


          {/* Projects Section */}
          <div id="projects-section" className="projects-section">
            <h1 className="projects-heading">My Projects</h1>
            <div className="project-cards">
              {projects.map(project => (
                <div className="project-card" key={project.id}>
                  <img src={project.project_image || portprj} alt={project.project_title} />
                  <h3>{project.project_title}</h3>
                  <Link to={`/projects/${project.id}`}>View</Link>
                  </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact-section" className="contact-section">
            <h2>Contact Me</h2>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={insta} alt="Instagram" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" /></a>
              <a href="mailto:example@gmail.com"><img src={gmail} alt="Gmail" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
