# Home Page

We are PixelLab, a dedicated team of IT consultants undertaking our capstone project by partnering with [ACTS Achi & Ahia, Inc.](https://www.acts.com.ph/) We specialize in analyzing business processes and implementing targeted IT solutions. For this project, "System and Process Refinement of ACTS' Enrollment," we focused on identifying bottlenecks and optimizing their current enrollment system to improve efficiency, reduce operational costs, and enhance the experience for both ACTS staff and their students.

## The Challenge

[ACTS Achi & Ahia](https://www.acts.com.ph/), a respected review school, faces significant challenges with their current enrollment process. Inefficiencies in their system, built on Cognito Forms and multiple databases, lead to excessive overtime for IT and Customer Service Unit (CSU) staff, high operational costs (including overtime and inefficiency costs), data inaccuracies like empty database rows and incorrect slot counts, and potential impacts on staff morale and productivity.

## The Solution

Our project focuses on optimizing ACTS' current Cognito Forms setup and consolidating their databases. We aim to address the core issues by reconfiguring the forms for better data accuracy, automating data flows, and establishing a central database using Google Sheets integrated via tools like Google Apps Script. This approach minimizes disruption, leverages existing familiar technology, and stays within budget constraints.

## The Impact

Implementing these refinements is projected to deliver significant positive outcomes for [ACTS Achi & Ahia](https://www.acts.com.ph/). By streamlining the enrollment workflow, we anticipate a substantial reduction in staff overtime, directly contributing to significant annual cost savings. This improved efficiency will also minimize critical errors in slot counting and payment reconciliation, leading to greater operational accuracy. Furthermore, alleviating the burden of tedious manual tasks and reducing frustrating errors is expected to enhance staff morale and boost overall productivity. Ultimately, this optimized system creates a more stable and efficient foundation, better positioning ACTS to handle future growth and program expansion.

# Our Client

[ACTS Achi & Ahia Inc.](https://www.acts.com.ph/) is a premier review school specializing in entrance exam preparation (CET & SHAPE Reviews) and after-school tutorials for students aiming for top universities and academic excellence. Founded with a unique, supportive approach, ACTS creates a relaxed, family-centric environment where students are mentored by their "Achi and Ahia" (older sister and brother). They break away from formal classroom settings, using engaging methods like gamified "missions" within their programs.

## The Enrollment Challenge

Despite their success, ACTS' enrollment process suffers from significant inefficiencies stemming from their current system design (Cognito Forms, multiple databases, manual processes):

1. HIGH OPERATIONAL COSTS & OVERTIME
    - The current reliance on manual processes for enrollment tasks (like validating students, checking payments, adjusting slots) results in excessive staff overtime and significant annual operational costs.

2. SYSTEM LIMITATIONS & DATA INACCURACIES
    - Flaws in the Cognito Forms setup lead to inaccurate counts of available class slots (incomplete forms reserving spots) and data inconsistencies across databases, creating risks of underbooking and confusion for both staff and potential clients.

3. INEFFICIENT WORKFLOW DUE TO DISCONNECTED DATA
    - Manual validation and data transfer across multiple, non-synchronized databases (Cognito and Google Sheets) cause significant operational delays, bottlenecks, and reduce the overall efficiency and productivity of the enrollment process.

# Our Solution

## Optimizing the Current System

After careful analysis, we recommended enhancing ACTS' existing enrollment infrastructure rather than introducing entirely new software. This approach offers the best balance: it's the most cost-effective, fitting within their budget; it allows for fast implementation to meet project deadlines; and it utilizes tools (Cognito Forms and Google Sheets) that ACTS staff and customers are already familiar with, minimizing disruption and training time. Our goal is to make their current system work smarter, not harder.

(There is a video here that demos the system that we created)

## Key Improvements

1. Semi-Automated Data Management
    - Instead of juggling data across multiple databases in Cognito, we set up a consolidated enrollment database using Google Sheets. Crucially, we implemented automated connections so that information from the Cognito enrollment forms and payment portals flows directly into this central database and updates key details automatically. This significantly reduces manual data entry, speeds up the process, and lowers the chance of errors.

2. Accurate Class Slot Tracking
    - We modified the online enrollment forms so that class slots are only reserved by students who have fully completed the enrollment process. This prevents situations where slots appear full due to incomplete entries. We also added an automated process to release slots if payments aren't made within the 4-day window, reducing the cases of underbooking.


## How We Implemented IT?

We brought these improvements to life using a flexible method known as a hybrid iterative approach. The project is divided into focused two-week cycles (iterations). This allowed us to build, test, and get feedback on specific parts of the solution frequently, ensuring the final product truly meets ACTS' needs.

Each iteration starts by prioritizing features based on 'user stories', which are simple descriptions of what ACTS' employees and stakeholders need the system to do. These requirements are gathered collaboratively during planning. Our team then develops these prioritized features within the two-week cycle.

Before moving forward, the developed features undergo two important testing phases:
- System Testing: Our internal PixelLab team rigorously tests the functionality.
- User Acceptance Testing (UAT): Key ACTS employees and stakeholders use the updated features and provide direct feedback on usability and effectiveness.

Every two-week iteration concludes with an Stakeholder Review Meeting. Here, we present the progress made, discuss the UAT feedback, address any necessary changes, and plan the priorities for the next iteration together. This continuous cycle ensured that we stayed aligned and adapted to feedback quickly.

## The Iteration Roadmap

1. Iteration 1: Pre-registration Improvements
2. Iteration 2: Registration Improvements
3. Iteration 3: Database Enhancements
4. Iteration 4: Payment Portal Improvements
5. Final Iteration & Go Live

## Technologies Used

1. Cognito Forms
    - For the online enrollment forms.
2. Google Sheets
    - As the central hub for enrollment data.
3. Google Apps Script
    - Working behind the scenes to connect the forms and spreadsheets.

# The Team

Shanelle Dy
- Project Manager

Allen Aguilar
- Quality Assurance

Jovick Armada
- System Developer

Austin Imperial
- System Developer

Julia Villa
- Business Analyst