const constants = {
  BRANCHES: [
    "Computer Engineering",
    "Information Technology",
    "Electronics",
    "EXTC",
    "Mechanical Engineering",
    "Civil Engineering",
    "Textile Engineering",
    "Production Engineering"
  ],
  DEGREE: ["BTech", "MTech", "MCA", "Diploma"],
  DOMAINS: ["Hackathon", "Competition", "Research Paper", "Other"],
  STEPS: {
    STUDENTS: [
      "Register yourself with your public key or generate a new key pair",
      "Create a new application for your achievement, submit a certificate for verification and select a faculty that will verify your application",
      "Receive VJ Coins as reward upon faculty approval. The coins will be transferred post mining",
      "Rewards can be spent in the Canteen, Library, etc",
      "View your pending/approved/rejected applications and check your balance in your profile"
    ],
    FACULTY: [
      "Register by creating an account",
      "Review student application details and view certificate of achievement",
      "Enter application title and date of achievement from the details to verify",
      "We provide verification check to confirm that the application hasn't already been rewarded by a different faculty",
      "Approve/reject application and reward appropriate amount of VJ Coins"
    ]
  },
  REWARDS: {
    HACKATHON: [
      { LABEL: "Winner (40 coins)", VALUE: 40 },
      { LABEL: "Top 3 (30 coins)", VALUE: 30 },
      { LABEL: "Top 10 (20 coins)", VALUE: 20 }
    ],
    COMPETITION: [
      { LABEL: "Winner (40 coins)", VALUE: 40 },
      { LABEL: "Top 3 (30 coins)", VALUE: 30 },
      { LABEL: "Top 10 (20 coins)", VALUE: 20 }
    ],
    RESEARCH_PAPER: [{ LABEL: "Paper Published (40 coins)", VALUE: 40 }],
    COMMITTEE_POSITION: [
      { LABEL: "Committee Head (40 coins)", VALUE: 40 },
      { LABEL: "Volunteer (20 coins)", VALUE: 20 }
    ]
  },
  LABELS: {
    HACKATHON: {
      TITLE: "Hackathon Name",
      DESCRIPTION: "Description",
      START_DATE: "Start Date",
      END_DATE: "End Date",
      ORGANISED_BY: "Organised By"
    },
    COMPETITION: {
      TITLE: "Competition Name",
      DESCRIPTION: "Description",
      START_DATE: "Start Date",
      END_DATE: "End Date",
      ORGANISED_BY: "Organised By"
    },
    RESEARCH_PAPER: {
      TITLE: "Research Paper Title",
      DESCRIPTION: "Abstract",
      START_DATE: "Published On",
      PUBLISHED_BY: "Published By",
      DOI: "DOI"
    },
    OTHER: {
      TITLE: "Event Name",
      DESCRIPTION: "Description",
      START_DATE: "Start Date",
      END_DATE: "End Date",
      ORGANISED_BY: "Organised By"
    }
  }
};

export default constants;
