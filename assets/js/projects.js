// Project data for the Selected Work section.
// Sourced/adapted from texts.md and capstone.md. Keep this in sync with those.
// `featured: true` rows show in the editorial list before "see all" is expanded.
// `reality` = the "what it actually took" layer: short fragments compressed from
// the body copy below, revealed on hover/focus and in the modal.
window.PROJECTS = [
  {
    id: "acts",
    title: "ACTS enrollment refinement",
    impact: "Cut staff overtime ~80% and saved ₱625,540 a year",
    reality: [
      "1,144 → 208 overtime hrs/year",
      "Two-week sprints, stakeholder review each close",
      "System testing + user-acceptance testing",
      "Cognito + Sheets + Apps Script, no new software"
    ],
    tags: ["Project management", "Apps Script"],
    year: "2024–2025",
    role: "Assistant Project Manager & System Developer",
    featured: true,
    body: [
      "Recognized as one of the best capstone projects by our defense panel, this ground-up IT solution was built for <a href='https://www.acts.com.ph/' target='_blank' rel='noopener'>ACTS Achi &amp; Ahia, Inc.</a>, a review center struggling with inefficient enrollment workflows.",
      "As the system developer and assistant to the project manager, I helped lead both the technical implementation and the project coordination. We identified process bottlenecks and optimized the enrollment system using Cognito Forms, Google Sheets, and Google Apps Script — a semi-automated, integrated solution that improved data accuracy and removed repetitive manual work.",
      "We ran the project as a hybrid-iterative effort: focused two-week sprints with continuous stakeholder feedback, system testing, and user acceptance testing, closing each iteration with a stakeholder review. The result was a substantial reduction in staff overtime (1,144 → 208 hours/year, ~80%) and roughly ₱625,540 in annual savings."
    ],
    tech: ["Cognito Forms", "Google Sheets", "Google Apps Script", "Excel Macros", "Trello"],
    images: [
      { src: "assets/img/projects/acts_system_design.png", alt: "System design diagram of the ACTS enrollment flow: client moves through pre-registration and registration forms to payment channels, with Google Apps Script writing to a Google Sheets enrollment database." }
    ]
  },
  {
    id: "bluemap",
    title: "BlueMap carbon restoration database",
    impact: "Geospatial restoration map: QGIS → Firebase → Mapbox",
    reality: [
      "QGIS → Firebase → Mapbox pipeline",
      "Cost vs. scale trade-off on the stack",
      "Unfamiliar frontend frameworks",
      "Co-led deployment + integration"
    ],
    tags: ["Backend", "GIS"],
    year: "2023–2024",
    role: "Database & Web Development Consultant / Lead Backend Developer",
    featured: true,
    body: [
      "A practicum project under the Ateneo Arete Sandbox program, focused on building a public geospatial tool for visualizing blue carbon ecosystems — particularly mangrove restoration sites — for climate-change mitigation.",
      "I led backend development, managing the flow of data from QGIS into the database and onto an interactive Mapbox map embedded on the site. Our small team analyzed requirements, technical constraints, and stakeholder needs to land on a cost-effective, scalable stack (choosing Firebase for hosting).",
      "I also co-led deployment, working through integration issues with unfamiliar frontend frameworks and Firebase hosting to ship a functional live product. The work deepened my grasp of geospatial data systems and real-world resource and stakeholder management."
    ],
    tech: ["Mapbox", "Firebase", "QGIS", "Geospatial databases"],
    images: [
      { src: "assets/img/projects/bluemap.png", alt: "The live Blue Map site: an interactive Mapbox map of the Philippines with pins marking submitted blue-carbon restoration projects, and an instructions panel explaining the mangrove-cover data." }
    ]
  },
  {
    id: "wine",
    title: "Wine quality prediction",
    impact: "Compared four ML classifiers on physicochemical data",
    reality: [
      "Decision Tree · SVM · kNN · Naive Bayes",
      "Prep → train → evaluate → compare",
      "Physicochemical attributes only"
    ],
    tags: ["Data science"],
    year: "",
    role: "Developer",
    featured: true,
    body: [
      "A classification model that evaluates red-wine quality from physicochemical test attributes. I implemented and compared four supervised algorithms — Decision Tree, Support Vector Machines, Nearest Neighbors, and Naive Bayes — to classify quality accurately.",
      "The project exercised the full data-analysis and model-building loop: preparation, training, evaluation, and comparison across models."
    ],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"],
    images: [
      { src: "assets/img/projects/wine_quality.png", alt: "Notebook output comparing Decision Tree, SVM, Nearest Neighbors and Naive Bayes accuracy on the red-wine dataset, with a Naive Bayes confusion matrix." }
    ]
  },
  {
    id: "pm-app",
    title: "Project Manager App",
    impact: "Web app to streamline PM task organization",
    reality: [
      "Django + SQL, HTML/Bootstrap front",
      "Built ground-up as lead developer",
      "Data-flow + entity-relationship diagrams"
    ],
    tags: ["Full-stack"],
    year: "",
    role: "Lead Developer",
    featured: false,
    body: [
      "Led development of a web application for a company in our Business Applications Development course, designed to streamline project management and task organization for project managers.",
      "Built from the ground up with Python and Django on the backend and HTML/Bootstrap on the frontend, with SQL handling the database. As lead developer I ensured clean integration between backend and frontend and produced essential documentation — data-flow and entity-relationship diagrams — across the software development lifecycle."
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap", "SQL"],
    images: [
      { src: "assets/img/projects/project_manager_app.png", alt: "Project dashboard for the EcoHarvest project showing task cards with status, priority, notes and assignees beside a list of logged expenses." }
    ]
  },
  {
    id: "lazapee",
    title: "Lazapee payroll app",
    impact: "Payroll web app praised for clean, readable code",
    reality: [
      "Django + SQL, built from scratch",
      "Team focus on code quality + docs",
      "Praised for clean, readable code"
    ],
    tags: ["Full-stack"],
    year: "",
    role: "Lead Developer",
    featured: false,
    body: [
      "Led development of Lazapee, a payroll web application built from scratch with Python and Django. I emphasized team collaboration around code quality and documentation, and the project earned strong comments for its clean, readable code."
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap", "SQL"],
    images: [
      { src: "assets/img/projects/lazapee.png", alt: "Lazapee Payroll web app: a payslip creation form above a payslips summary table listing ID number, date, cycle and total pay." }
    ]
  },
  {
    id: "reactbook",
    title: "ReactBook",
    impact: "A social-media app built to learn React.js",
    reality: [
      "Auth · posting · friend management",
      "Learned React.js on the fly",
      "Simple by design"
    ],
    tags: ["Front-end"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "A personal project I built to learn React.js: a basic social-media web application with account creation, login, posting, and friend management. Simple by design, it shows how quickly I pick up and apply new technologies."
    ],
    tech: ["React.js", "HTML", "CSS", "Bootstrap"],
    images: [
      { src: "assets/img/projects/reactbook.png", alt: "ReactBook home page: a friends list on the left, a post composer, and a feed of dated posts." }
    ]
  },
  {
    id: "raman",
    title: "Mobile Raman spectrometer app",
    impact: "Image-to-histogram tool for award-winning research",
    reality: [
      "Image → histogram in Kivy",
      "Pixel color extraction for stats",
      "Fed an award-winning research paper"
    ],
    tags: ["Software"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "A straightforward Python mobile app that captures images and generates histograms for analyzing color-intensity changes. Its simple, function-first UI enabled clear visual data comparison for our award-winning high-school research paper on an improvised Raman spectrometer. Python also extracted pixel color values from the images for deeper statistical analysis in Excel."
    ],
    tech: ["Python", "Kivy"],
    images: [
      { src: "assets/img/projects/raman_spectrometer_1.png", alt: "The Kivy app running on an Android phone: a camera preview with Activate Camera and Capture buttons above the RGB histogram generated from the captured image." },
      { src: "assets/img/projects/raman_spectrometer_2.png", alt: "Spreadsheet analysis of RGB pixel differentials across low-intensity UV, high-intensity UV, low-intensity ambient and near-UV light experiments, with a grouped bar chart of the averages." }
    ]
  },
  {
    id: "complaints",
    title: "Financial consumer-complaint clustering",
    impact: "Clustering model to segment and triage complaints",
    reality: [
      "Bank of America complaint dataset",
      "Clean → transform → cluster pipeline",
      "Segment + triage complaints"
    ],
    tags: ["Data science"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "For a Business Intelligence course, we built a clustering model to segment and classify consumer complaints using a Bank of America dataset. The project involved planning and implementing a full data pipeline — cleaning, transformation, and analysis — to improve complaint management through a streamlined, data-driven approach."
    ],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"],
    images: [
      { src: "assets/img/projects/clustering_techniques_1.jpg", alt: "Data pipeline slide: the raw complaint dataset of 62,516 rows by 12 columns reduced to 61,022 rows by 5 columns of product, issue, company response and timeliness." },
      { src: "assets/img/projects/clustering_techniques_2.jpg", alt: "Final dataset slide: categorical fields one-hot encoded into 61,022 rows by 86 columns to avoid implying ordinality." },
      { src: "assets/img/projects/clustering_techniques_3.jpg", alt: "Dimensionality reduction slide: PCA loadings for the first two components, an elbow plot picking four clusters, and the resulting complaint clusters plotted on PCA axes." },
      { src: "assets/img/projects/clustering_techniques_4.jpg", alt: "Analysis slide interpreting the four clusters — credit card concerns, comprehensive engagement, low engagement and account management concerns — beside the cluster scatter plot." }
    ]
  },
  {
    id: "3d-anim",
    title: "3D animation in Python",
    impact: "Perspective-projection animation for linear algebra",
    reality: [
      "Perspective-projection math",
      "3D objects animated in NumPy/Matplotlib",
      "For a Linear Algebra course"
    ],
    tags: ["Software"],
    year: "",
    role: "Developer",
    featured: false,
    body: [
      "A Python 3D-animation script for a Linear Algebra course, processing and animating 3D objects using perspective projection — turning mathematical models into a dynamic visual tool. A demonstration of mathematical modeling, data handling, and visualization."
    ],
    tech: ["Python", "NumPy", "Matplotlib"],
    images: [
      { src: "assets/img/projects/3d_animation.gif", alt: "Animated 3D object rendered with perspective projection in Matplotlib." }
    ]
  }
];
