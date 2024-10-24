import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pdf from './images/pdf.svg';
import { useParams, Link } from 'react-router-dom';
import './project.css';  // Ensure you have a corresponding CSS file

const Project = () => {
  const [project, setProject] = useState({});
  const { id } = useParams(); // Get project ID from the URL

useEffect(() => {
  const fetchProject = async () => {
    try {
      const response = await axios.get(`https://vvarshini.pythonanywhere.com/api/projects/${id}/`);
      console.log('Fetched project:', response.data); // Log fetched data
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  fetchProject();
}, [id]);


  return (
    <div className="project-container">
      <div className='project-page-overlay'>
      <nav className="project-navbar">
        <Link to="/" className="back-button">
          <span className="back-icon">←</span> Go Back
        </Link>
      </nav>

      <section className="project-details">
        {/* Display project title */}
        <h1 className="project-title">{project.title || "Project Title Not Available"}</h1>
        
        {/* Display project caption */}
        <p className="caption">{project.caption || "No caption provided for this project."}</p>

        {/* Display project demo video */}
        <div className="demo-video">
          {project.demo_video ? (
            <video width="1200" height="550" controls autoPlay loop muted>
              <source src={project.demo_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No demo video available.</p>
          )}
        </div>

        {/* Display various project details */}
        <div className="project-info">
          <h2>Project Overview</h2>
          <p className='project_container'>{project.project_overview || "Project overview is not available."}</p>

          <h2>Tech Stack Used</h2>
          <p className='project_container'>{project.tech_stack_used || "Tech stack details are not available."}</p>

          <h2>Key Features</h2>
          <p className='project_container'>{project.key_features || "No key features provided."}</p>

          <h2>Challenges Faced</h2>
          <p className='project_container'>{project.challenges_faced || "No challenges mentioned."}</p>

          <h2>Use Cases</h2>
          <p className='project_container'>{project.use_cases || "Use cases are not specified."}</p>

          <h2>Future Enhancements</h2>
          <p className='project_container'>{project.future_enhancements || "No future enhancements listed."}</p>

          {/* Display repository link */}
          <h2>Repository Link</h2>
          {project.repository_link ? (
            <a href={project.repository_link} target="_blank" rel="noopener noreferrer">
              View Repository
            </a>
          ) : (
            <p>Repository link not available.</p>
          )}

          {/* Display downloadable documentation if available */}
          <h2 >Documentation</h2>
          <div className='project_documentation'>
          {project.documentation ? (
            <a className='documentation' href={project.documentation} download>
              <img src={pdf} alt="Documentation PDF" />
            </a>
          ) : (
            <p>No documentation available for download.</p>
          )}
          </div>
          
        </div>
      </section>
      </div>
    </div>
  );
};

export default Project;
