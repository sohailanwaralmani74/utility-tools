---
layout: main
---

<!-- Author Profile & Resume Template: insert inside <body> -->
<style>
  .pcontainer { max-width: 900px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; }
  .profile-header { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }
  .author-avatar { flex: 0 0 120px; width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }
  .author-info { flex: 1; }
  .author-info h1 { margin: 0; font-size: 2em; }
  .author-info p { margin: 5px 0; }
  .links a { margin-right: 10px; text-decoration: none; color: #1a0dab; }
  .section { margin-top: 30px; }
  .section h2 { border-bottom: 2px solid #eee; padding-bottom: 5px; font-size: 1.5em; margin-bottom: 15px; }
  ul { list-style: disc inside; padding-left: 0; }
  .flex-list { display: flex; flex-wrap: wrap; gap: 10px; }
  .flex-list li { background: #f5f5f5; padding: 8px 12px; border-radius: 5px; }
  article { margin-bottom: 20px; }
  @media (max-width: 600px) {
    .profile-header { flex-direction: column; align-items: flex-start; }
    .author-avatar { width: 100px; height: 100px; }
  }
</style>

<div class="pcontainer">
  <div class="profile-header">
    <img src="assets/img/sohail-anwar.png" alt="Sohail Anwar - Senior Software Engineer" class="author-avatar" />
    <div class="author-info">
      <h1>Sohail Anwar Almani</h1>
      <p>Senior Consultant, Java Applications at Systems LTD.</p>
      <div class="links">
        <a href="mailto:sohailanwaralmani74@gmail.com">sohailanwaralmani74@gmail.com</a>
        <a href="tel:+923010136029">+92 301 0136029</a>
        <a href="https://www.linkedin.com/in/sohail-anwar-a63063162/" target="_blank">LinkedIn</a>
        <a href="https://github.com/sohailanwaralmani74" target="_blank">GitHub</a>
      </div>
    </div>
  </div>

  <div class="section" id="objective">
    <h2>Objective</h2>
    <p>Seeking a challenging position in Software Development to utilize my technical and educational expertise along with professional growth and continuous learning.</p>
  </div>

  <div class="section" id="profile-summary">
    <h2>Profile</h2>
    <ul>
      <li>12+ years of experience in application development with Spring Boot, JSF, Struts, ATG JAX-RS, Microservices, Java, JSP, Servlets, AWT, and Swing.</li>
      <li>Excellent problem-solving and communication skills; adept at conveying technical concepts to non-technical audiences.</li>
      <li>Team player capable of building cohesive teams and driving high achievement.</li>
      <li>Skilled in project execution processes, quality assurance, and stakeholder collaboration.</li>
    </ul>
  </div>

  <div class="section" id="skills">
    <h2>Technical Skills</h2>
    <ul class="flex-list">
      <li>Spring Boot & Microservices</li>
      <li>ATG REST & JAX-RS</li>
      <li>Core Java, JSP, Servlets, AWT, Swing</li>
      <li>JSF, Struts, Angular</li>
      <li>Databases: Oracle, MongoDB, MySQL</li>
      <li>Servers: WebLogic, Tomcat, JBoss</li>
      <li>Tools: Eclipse, IntelliJ IDEA, JIRA, Android Studio, Postman</li>
      <li>Frameworks: Hibernate, Spring Data JPA, Spring Security</li>
      <li>DevOps: Docker, Jenkins, Pentaho Mondrian OLAP</li>
      <li>Web Services: REST, SOAP</li>
    </ul>
  </div>

  <div class="section" id="experience">
    <h2>Professional Experience</h2>
    <article>
      <h3>Consultant, Java Applications — Systems LTD.</h3>
      <time datetime="2021-11">Nov 2021 – Present</time>
      <p>Architected and maintained mortgage loan management systems, TRA Reporting Tool, Etisalat B2B Product with Spring Boot, Spring Security, Data JPA, ATG Commerce, and Angular for high-scale UAE AND USA clients.</p>
    </article>
    <article>
      <h3>Software Engineer — Best Bread PM</h3>
      <time datetime="2019-01">Jan 2019 – Mar 2020</time>
      <p>Developed SRS Product, integrating Spring Boot, OAuth2, PayPal/VISA payments, and Mondrian OLAP workflows to deliver a comprehensive project management tool.</p>
    </article>
    <article>
      <h3>Software Engineer — Skills Orbit Pvt Ltd.</h3>
      <time datetime="2017-09">Sep 2017 – Aug 2018</time>
      <p>Built Political Campaign Management Platform (Web & Mobile) using Spring Boot, Angular, and Android; managed voter management features and client integrations.</p>
    </article>
    <article>
      <h3>Java Developer — BEST Pvt. Ltd.</h3>
      <time datetime="2013-09">Sep 2013 – Aug 2016</time>
      <p>Developed ERP and desktop applications (Karachi Dock & Labor Board ICMS, OMTS, ECAP) with JSF, Hibernate, Jasper Reports, and Java Swing.</p>
    </article>
  </div>

  <div class="section" id="projects">
    <h2>Key Projects</h2>
    <ul>
      <li><strong>VisiClaims:</strong> Mortgage loan management system to claim loans. Technologies: Struts 1, Jersey, Java 17; later revamped into Spring Boot & Angular 15.</li>
      <li><strong>VisiRepurchase:</strong> Mortgage loan management system to repurchase loans. Technologies: Struts 1, Java 8.</li>
      <li><strong>TRA Reporting Tool:</strong> Telecom complaints reporting for Etisalat UAE (Spring Boot, Angular, Mockito).</li>
      <li><strong>Etisalat B2B Product:</strong> Large-scale commerce platform with ATG Commerce and JAX-RS.</li>
      <li><strong>SRS Product:</strong> Integrated project management with Jira, MS Project Server, OAuth2, and OLAP analytics.</li>
      <li><strong>igiveyou E-commerce:</strong> Electronics rental/purchase platform with Auth0 and custom payment flows.</li>
      <li><strong>Sukh App:</strong> Android data collection app for lady health workers (.NET backend).</li>
      <li><strong>Karachi Dock ICMS & OMTS:</strong> ERP solutions with modules for HR, finance, billing, and inventory.</li>
      <li><strong>ECAP Desktop:</strong> Swing app for image capture and barcode attendance printing.</li>
    </ul>
  </div>

  <div class="section" id="education">
    <h2>Education & Credentials</h2>
    <p>BS Software Engineering, University of Sindh — 2.72 CGPA (2012–2017)</p>
  </div>

  <div class="section" id="training">
    <h2>Training</h2>
    <ul>
      <li>J2EE Learning Program (1 year)</li>
      <li>ATG Commerce Learning Program (1 month)</li>
    </ul>
  </div>

  <div class="section" id="personal-details">
    <h2>Personal Details</h2>
    <p>Date of Birth: 06 March 1991</p>
    <p>Permanent Address: Post- Deparja, Taluka Moro, Sindh, Pakistan</p>
    <p>Alternate Mobile: +91 301 0136029</p>
    <p>Present Location: Karachi, Sindh, Pakistan</p>
  </div>

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Resume",
    "name":"Sohail Anwar Almani",
    "url":"https://reptilebirds.com/sohail-anwar",
    "email":"mailto:sohailanwaralmani74@gmail.com",
    "sameAs":[
      "https://www.linkedin.com/in/sohail-anwar-a63063162/",
      "https://github.com/sohailanwaralmani74"
    ],
    "hasOccupation":{
      "@type":"Occupation",
      "name":"Consultant, Java Applications",
      "hiringOrganization":{"@type":"Organization","name":"Systems LTD."}
    },
    "skills":["Spring Boot","Microservices","Java","Angular","Hibernate","ATG","DevOps"],
    "workExperience":[
      {"@type":"WorkExperience","roleName":"Consultant, Java Applications","startDate":"2021-11","endDate":"Present","description":"Architected mortgage loan management systems for Etisalat UAE clients."},
      {"@type":"WorkExperience","roleName":"Software Engineer","startDate":"2019-01","endDate":"2020-03","description":"Developed SRS project management tool with payment and analytics integrations."}
    ],
    "projects":[
      {"@type":"CreativeWork","name":"VisiClaims","description":"Mortgage loan management system to claim loans. Technologies: Struts 1, Jersey, Java 17; later revamped into Spring Boot & Angular 15."},
      {"@type":"CreativeWork","name":"VisiRepurchase","description":"Mortgage loan management system to repurchase loans. Technologies: Struts 1, Java 8."},
      {"@type":"CreativeWork","name":"TRA Reporting Tool","description":"Telecom complaints reporting platform for Etisalat UAE."},
      {"@type":"CreativeWork","name":"SRS Product","description":"Integrated project management application with Jira and OLAP analytics."}
    ],
    "alumniOf":{"@type":"CollegeOrUniversity","name":"University of Sindh"}
  }
  </script>
</div>
