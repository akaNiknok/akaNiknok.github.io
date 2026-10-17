// Project data for the Selected Work section.
// Pareto entries are drawn from src/ (gitignored); keep them anonymized per CLAUDE.md.
// `featured: true` rows show in the editorial list before "see all" is expanded.
// `reality` = the "what it actually took" layer: short fragments compressed from
// the body copy below, revealed on hover/focus and in the modal.
window.PROJECTS = [
  {
    id: "pm-data-tool",
    title: "Tools and pipelines for a VIP project",
    impact: "1,700+ submissions pulled in under 2 minutes, about 200 tasks a week delivered, every payout closed with 0 pending",
    reality: [
      "Every data pull went through me, so I rebuilt it for PMs who don't code",
      "One gate before delivery",
      "Completion checked in the task platform before any payment",
      "Real-user pilot came last, should have come first"
    ],
    tags: ["Internal tools", "Project management", "Python"],
    year: "2026",
    role: "Weekend PM and weekend technical lead support",
    featured: true,
    body: [
      "Pareto's VIP project at the time: experts wrote legal tasks with grading guidelines for the client. Three problems kept coming back, and I built a fix for each.",
      "<strong>Getting the data out.</strong> The client's task platform answers questions one item at a time, about 30 seconds each. A script I wrote for myself grew into a toolkit, and soon every PM's data pull went through me. So I rebuilt it for people who don't code: common questions as cards, a glossary of the platform's terms, a one-command install, and a confirmation screen before any write. It pulls all 1,700+ submissions in under two minutes, about 14 hours by hand. (Screenshots use placeholder names.)",
      { src: "assets/img/projects/pm_data_tool_after.webp", alt: "After the redesign: the home page asks \"What do you need?\" and shows six common questions as cards, with a 60-second primer on the platform's terms open below. Internal names replaced with placeholders." },
      { src: "assets/img/projects/pm_data_tool_before.webp", alt: "Before the redesign: one long form with an environment picker, a problem ID box for each group and feature checkboxes. Internal names replaced with placeholders." },
      "<strong>Getting tasks delivered.</strong> Cleanup had no agreed path, and its owner changed with every priority shift. I designed one path with a single gate, protected checked rows from the automated sync, and wrote a handbook other PMs ran without me. Throughput rose to about 200 tasks a week.",
      {
        flow: ["PM Cleaning", "PM Checked", "Ready for Delivery", "Delivered"],
        gate: 1,
        caption: "A task reaches delivery only after a PM runs the quality checklist."
      },
      "<strong>Paying people correctly.</strong> Two near-misses (two QAs approved on one problem, and about $110 paid for labels with no record) showed the payout sheet could not be trusted alone. Now each label is confirmed in the task platform before payment. A pivot-table fix restored about $16,000 experts would have been short.",
      {
        bars: [["Flagged by query", 298, 298, "298"], ["Real cases", 69, 298, "69"]],
        caption: "An edge case sized before leadership decided: about $690 in real exposure."
      }
    ],
    tech: ["Python", "FastAPI", "htmx", "Jinja", "SQLite", "GitHub Actions", "Claude Code", "Google Sheets", "Google Apps Script", "Linear"]
  },

  {
    id: "lead-pm",
    title: "Sole Lead PM on an expert evaluation project",
    impact: "Cold start to billing sign-off, with completions up from 4 of 12 to 11 of 12 in one week",
    reality: [
      "First project as lead, and the only PM",
      "A client platform bug wiped expert progress",
      "Logged in as a participant to read the real instructions",
      "Every budget line closed within budget"
    ],
    tags: ["Project management", "Recruitment"],
    year: "2026",
    role: "Lead PM, sole PM on the project",
    featured: true,
    visual: {
      bars: [["Start of week", 4, 12, "4 of 12"], ["End of week", 11, 12, "11 of 12"]],
      goal: [10, "Goal: 10"],
      caption: "Expert completions in production, out of 12 invited."
    },
    body: [
      "Three months in, I became Lead PM, and the only PM, on a client project that needed about 10 licensed mental-health and social-research practitioners to evaluate wellbeing frameworks. I ran it from setup and recruitment through pilot, production, payouts, billing and closeout.",
      "In production, a client platform bug wiped expert progress, and the client's 2-hour estimate clashed with the platform's 5-hour minimum. I logged in as a participant to read the real instructions, proposed a 4-hour pay cap, and moved blocked seats to fast responders the same day. The client approved billing, and every budget line closed within budget."
    ]
  },


  {
    id: "tracker-redesign",
    title: "Production tracker redesign",
    impact: "Rebuilt a 24/7 progress tracker and cut over live in a one-hour window",
    reality: [
      "Five redundant columns merged into one",
      "Window picked from edit-history data",
      "Every change logged during cutover"
    ],
    tags: ["Project management", "Change management"],
    year: "2026",
    role: "Support PM, then core PM",
    featured: true,
    visual: {
      // Illustration only: placeholder books, initials and column names.
      sheet: {
        cols: ["Assignee", "Worker", "Claimed by", "Owner", "Transcriber"],
        key: "Complex queue",
        rows: [
          ["Book 07", "AR", [0, 3], "In Progress", "Transcribing"],
          ["Book 12", "BL", [2], "Pending", "Complex queue"],
          ["Book 03", "CM", [1, 4], "Done", "In QA"],
          ["Book 21", "DT", [3], "In Progress", "Approved"],
          ["Book 09", "EV", [4, 2], "Open", "Transcribing"]
        ]
      },
      caption: "An illustration, not the real sheet: five columns become one, and generic statuses become stages."
    },
    body: [
      "In my third month I joined a math transcription project that ran on one shared tracker. It used five columns for one job, generic statuses, and had no clear handoff between regular and complex-problem transcribers. My redesign merged the columns, gave each stage its own status, and added a Complex Work Queue.",
      "Experts worked around the clock, so I staged the layout hidden in the live sheet, used version history to find the quietest hour (after 7 PM Pacific), and cut over in a one-hour window announced 11 hours ahead, logging every change."
    ],
    tech: ["Google Sheets", "Google Apps Script"]
  },
  {
    id: "recruitment-pipeline",
    title: "Expert recruitment pipeline",
    impact: "Helped hit a quarterly delivery target at 106%",
    reality: [
      "Interest form, QA vetting, onboarding, trial, main",
      "A P0 bug filed with full evidence, fixed in about a week",
      "Closed the form at the first signs of applicant fraud"
    ],
    tags: ["Project management", "Recruitment"],
    year: "2026",
    role: "PM, owner of expert recruitment",
    featured: false,
    visual: {
      bars: [["Long-document", 1585, 1700, "1,585"]],
      goal: [1500, "Target: 1,500"],
      caption: "The quarter's long-document submissions, 106% of target. A team result."
    },
    body: [
      "I own expert recruitment on a long-document and multimodal project. When a platform bug stopped trial work from reaching review, I filed it as P0 with every affected submission, and it was fixed in about a week. When applications showed signs of fraud, I closed the form and gave recruiters QA's red flags.",
      "With the pipeline clear, trial workers with access went from 6 to 16 in one day."
    ],
    tech: ["Python", "Google Sheets"]
  },
  {
    id: "memento-mori",
    title: "Memento Mori personal finance system",
    impact: "Telegram, a web app, and bank emails write to one ledger, at no monthly cost",
    reality: [
      "Three versions in twelve weeks",
      "Sheets + Apps Script → Worker + D1",
      "Gemini structured output reads messages and emails",
      "87 tagged releases, zero runtime dependencies"
    ],
    tags: ["Full stack", "AI"],
    year: "2025–present",
    role: "Personal project",
    featured: true,
    body: [
      "The finance system I use every day, and the codebase I learn the most from. I send “coffee 120 maya” to a Telegram bot, type into an installable web app, or do nothing and let it read my bank's emails. All three write to one SQL database through the same handlers. It is <a href='https://github.com/akaNiknok/memento-mori' target='_blank' rel='noopener'>public on GitHub</a>, and every screenshot uses invented data.",
      "It started in November 2025 as an n8n workflow on my laptop that sent each message through Gemini into Google Sheets. Then it had three lives in twelve weeks: Apps Script and Sheets in v1, a Cloudflare Worker and D1 as the whole backend in v2, and a full redesign in v3. Each version replaced the part that hurt the most, and each one removed infrastructure.",
      "Most of what I know about production came from its failures. Telegram kept resending the same message because Apps Script answered with a redirect, so a 15-line Worker answered first; that Worker grew into the backend. A slow Gemini call let Telegram send a message twice, so the webhook now claims the update ID on its first line. A daily interest job disagreed with the bank by 1.33 pesos, so I deleted it. A calculation that disagrees with the bank is worse than none.",
      "Gemini reads free text and bank emails with structured output, and every receipt has an Undo button and a link to the source email, because a model can misread. An MCP server lets AI clients such as Claude read the ledger with a read-only token. Money is stored as integer millionths, a retry never makes a second row, and 156 offline tests (110 of them on a real SQLite database) cover the handlers. More than 1,200 transactions so far, at no monthly cost."
    ],
    tech: ["Cloudflare Workers", "Cloudflare D1", "Gemini", "Telegram Bot API", "Google Apps Script", "MCP", "JavaScript"],
    images: [
      { src: "assets/img/projects/memento_mori_dashboard.webp", alt: "The Summary screen: net worth, money left to spend this month, the net worth history, the time to financial independence and the emergency runway. Invented data." },
      { src: "assets/img/projects/memento_mori_phone.webp", alt: "The Activity screen on a phone: a list of recent transactions grouped by day. Invented data." },
      { src: "assets/img/projects/memento_mori_evolution.gif", alt: "The Summary screen in v1, v2 and v3, one after the other, with the same invented data." }
    ]
  },
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
      "As the system developer and assistant to the project manager, I helped lead both the technical implementation and the project coordination. We identified process bottlenecks and optimized the enrollment system using Cognito Forms, Google Sheets, and Google Apps Script, building a semi-automated, integrated solution that improved data accuracy and removed repetitive manual work.",
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
    featured: false,
    body: [
      "A practicum project under the Ateneo Arete Sandbox program, focused on building a public geospatial tool for visualizing blue carbon ecosystems (particularly mangrove restoration sites) for climate-change mitigation.",
      "I led backend development, managing the flow of data from QGIS into the database and onto an interactive Mapbox map embedded on the site. Our small team analyzed requirements, technical constraints, and stakeholder needs to land on a cost-effective, scalable stack (choosing Firebase for hosting).",
      "I also co-led deployment, working through integration issues with unfamiliar frontend frameworks and Firebase hosting to ship a functional live product. The work deepened my grasp of geospatial data systems and real-world resource and stakeholder management."
    ],
    tech: ["Mapbox", "Firebase", "QGIS", "Geospatial databases"],
    images: [
      { src: "assets/img/projects/bluemap.webp", alt: "The live Blue Map site: an interactive Mapbox map of the Philippines with pins marking submitted blue-carbon restoration projects, and an instructions panel explaining the mangrove-cover data." }
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
    featured: false,
    body: [
      "A classification model that evaluates red-wine quality from physicochemical test attributes. I implemented and compared four supervised algorithms (Decision Tree, Support Vector Machines, Nearest Neighbors, and Naive Bayes) to classify quality accurately.",
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
      "Built from the ground up with Python and Django on the backend and HTML/Bootstrap on the frontend, with SQL handling the database. As lead developer I ensured clean integration between backend and frontend and produced essential documentation (data-flow and entity-relationship diagrams) across the software development lifecycle."
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
      { src: "assets/img/projects/raman_spectrometer_1.webp", alt: "The Kivy app running on an Android phone: a camera preview with Activate Camera and Capture buttons above the RGB histogram generated from the captured image." },
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
      "For a Business Intelligence course, we built a clustering model to segment and classify consumer complaints using a Bank of America dataset. The project involved planning and implementing a full data pipeline (cleaning, transformation, and analysis) to improve complaint management through a streamlined, data-driven approach."
    ],
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"],
    images: [
      { src: "assets/img/projects/clustering_techniques_1.jpg", alt: "Data pipeline slide: the raw complaint dataset of 62,516 rows by 12 columns reduced to 61,022 rows by 5 columns of product, issue, company response and timeliness." },
      { src: "assets/img/projects/clustering_techniques_2.jpg", alt: "Final dataset slide: categorical fields one-hot encoded into 61,022 rows by 86 columns to avoid implying ordinality." },
      { src: "assets/img/projects/clustering_techniques_3.jpg", alt: "Dimensionality reduction slide: PCA loadings for the first two components, an elbow plot picking four clusters, and the resulting complaint clusters plotted on PCA axes." },
      { src: "assets/img/projects/clustering_techniques_4.jpg", alt: "Analysis slide interpreting the four clusters (credit card concerns, comprehensive engagement, low engagement and account management concerns) beside the cluster scatter plot." }
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
      "A Python 3D-animation script for a Linear Algebra course, processing and animating 3D objects using perspective projection, turning mathematical models into a moving visual."
    ],
    tech: ["Python", "NumPy", "Matplotlib"],
    images: [
      { src: "assets/img/projects/3d_animation.gif", alt: "Animated 3D object rendered with perspective projection in Matplotlib." }
    ]
  }
];
