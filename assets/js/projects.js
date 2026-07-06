// Project data for the Selected Work section.
// Sourced/adapted from texts.md and capstone.md. Keep this in sync with those.
// `featured: true` rows show in the editorial list before "see all" is expanded.
window.PROJECTS = [
  {
    id: "acts",
    title: "ACTS enrollment refinement",
    impact: "Cut staff overtime ~80% and saved ₱625,540 a year",
    tags: ["Project management", "Apps Script"],
    year: "2024–2025",
    role: "Assistant Project Manager & System Developer",
    featured: true,
    body: [
      "Recognized as one of the best capstone projects by our defense panel, this ground-up IT solution was built for <a href='https://www.acts.com.ph/' target='_blank' rel='noopener'>ACTS Achi &amp; Ahia, Inc.</a>, a review center struggling with inefficient enrollment workflows.",
      "As the system developer and assistant to the project manager, I helped lead both the technical implementation and the project coordination. We identified process bottlenecks and optimized the enrollment system using Cognito Forms, Google Sheets, and Google Apps Script — a semi-automated, integrated solution that improved data accuracy and removed repetitive manual work.",
      "We ran the project as a hybrid-iterative effort: focused two-week sprints with continuous stakeholder feedback, system testing, and user acceptance testing, closing each iteration with a stakeholder review. The result was a substantial reduction in staff overtime (1,144 → 208 hours/year, ~80%) and roughly ₱625,540 in annual savings."
    ],
    tech: ["Cognito Forms", "Google Sheets", "Google Apps Script", "Excel Macros", "Trello"]
  },
  {
    id: "bluemap",
    title: "BlueMap carbon restoration database",
    impact: "Geospatial restoration map: QGIS → Firebase → Mapbox",
    tags: ["Backend", "GIS"],
    year: "2023–2024",
    role: "Database & Web Development Consultant / Lead Backend Developer",
    featured: true,
    body: [
      "A practicum project under the Ateneo Arete Sandbox program, focused on building a public geospatial tool for visualizing blue carbon ecosystems — particularly mangrove restoration sites — for climate-change mitigation.",
      "I led backend development, managing the flow of data from QGIS into the database and onto an interactive Mapbox map embedded on the site. Our small team analyzed requirements, technical constraints, and stakeholder needs to land on a cost-effective, scalable stack (choosing Firebase for hosting).",
      "I also co-led deployment, working through integration issues with unfamiliar frontend frameworks and Firebase hosting to ship a functional live product. The work deepened my grasp of geospatial data systems and real-world resource and stakeholder management."
    ],
    tech: ["Mapbox", "Firebase", "QGIS", "Geospatial databases"]
  },
  {
    id: "wine",
    title: "Wine quality prediction",
    impact: "Compared four ML classifiers on physicochemical data",
    tags: ["Data science"],
    year: "",
    role: "Developer",
    featured: true,
    body: [
      "A classification model that evaluates red-wine quality from physicochemical test attributes. I implemented and compared four supervised algorithms — Decision Tree, Support Vector Machines, Nearest Neighbors, and Naive Bayes — to classify quality accurately.",
      "The project exercised the full data-analysis and model-building loop: preparation, training, evaluation, and comparison across models."
    ],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"]
  },
  {
    id: "pm-app",
    title: "Project Manager App",
    impact: "Web app to streamline PM task organization",
    tags: ["Full-stack"],
    year: "",
    role: "Lead Developer",
    featured: false,
    body: [
      "Led development of a web application for a company in our Business Applications Development course, designed to streamline project management and task organization for project managers.",
      "Built from the ground up with Python and Django on the backend and HTML/Bootstrap on the frontend, with SQL handling the database. As lead developer I ensured clean integration between backend and frontend and produced essential documentation — data-flow and entity-relationship diagrams — across the software development lifecycle."
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap", "SQL"]
  },
  {
    id: "lazapee",
    title: "Lazapee payroll app",
    impact: "Payroll web app praised for clean, readable code",
    tags: ["Full-stack"],
    year: "",
    role: "Lead Developer",
    featured: false,
    body: [
      "Led development of Lazapee, a payroll web application built from scratch with Python and Django. I emphasized team collaboration around code quality and documentation, and the project earned strong comments for its clean, readable code."
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap", "SQL"]
  },
  {
    id: "reactbook",
    title: "ReactBook",
    impact: "A social-media app built to learn React.js",
    tags: ["Front-end"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "A personal project I built to learn React.js: a basic social-media web application with account creation, login, posting, and friend management. Simple by design, it shows how quickly I pick up and apply new technologies."
    ],
    tech: ["React.js", "HTML", "CSS", "Bootstrap"]
  },
  {
    id: "raman",
    title: "Mobile Raman spectrometer app",
    impact: "Image-to-histogram tool for award-winning research",
    tags: ["Software"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "A straightforward Python mobile app that captures images and generates histograms for analyzing color-intensity changes. Its simple, function-first UI enabled clear visual data comparison for our award-winning high-school research paper on an improvised Raman spectrometer. Python also extracted pixel color values from the images for deeper statistical analysis in Excel."
    ],
    tech: ["Python", "Kivy"]
  },
  {
    id: "complaints",
    title: "Financial consumer-complaint clustering",
    impact: "Clustering model to segment and triage complaints",
    tags: ["Data science"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "For a Business Intelligence course, we built a clustering model to segment and classify consumer complaints using a Bank of America dataset. The project involved planning and implementing a full data pipeline — cleaning, transformation, and analysis — to improve complaint management through a streamlined, data-driven approach."
    ],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"]
  },
  {
    id: "3d-anim",
    title: "3D animation in Python",
    impact: "Perspective-projection animation for linear algebra",
    tags: ["Software"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "A Python 3D-animation script for a Linear Algebra course, processing and animating 3D objects using perspective projection — turning mathematical models into a dynamic visual tool. A demonstration of mathematical modeling, data handling, and visualization."
    ],
    tech: ["Python", "NumPy", "Matplotlib"]
  }
];
