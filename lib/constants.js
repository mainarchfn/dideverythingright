const CATEGORIES = [
  "veterans",
  "sudden-expenses",
  "injuries",
  "health",
  "cancer"
];

const CATEGORY_LABELS = {
  veterans: "Veterans",
  "sudden-expenses": "Sudden Expenses",
  injuries: "Injuries",
  health: "Health",
  cancer: "Cancer"
};

const CATEGORY_ICON_META = {
  veterans: {
    title: "Veterans shield icon",
    accent: "#2f5f8a"
  },
  "sudden-expenses": {
    title: "Sudden expenses wallet icon",
    accent: "#8a5f2f"
  },
  injuries: {
    title: "Injuries support cross icon",
    accent: "#87513f"
  },
  health: {
    title: "Health heart icon",
    accent: "#2d7b5f"
  },
  cancer: {
    title: "Cancer care ribbon icon",
    accent: "#5f4e94"
  }
};

const CATEGORY_DETAILS = {
  veterans: {
    intro:
      "Benefits, claims, and care coordination guidance for veterans and military families in retirement.",
    whatToFind: "VA appointment prep, claims checklists, caregiver support options, and records organization.",
    urgent: {
      title: "Tax filing deadline is approaching",
      dateLabel: "April 15, 2026",
      body:
        "Most retirees must file 2025 federal taxes by April 15, 2026. If you receive VA or Social Security income, gather statements now to avoid last-minute stress."
    },
    tools: [
      {
        title: "VA visit question planner",
        description: "Bring focused questions so appointments end with clear next steps.",
        href: "/article/veterans-benefits-checklist"
      },
      {
        title: "Benefit records tracker",
        description: "Keep one running log of calls, claim numbers, and promised follow-ups.",
        href: "/membership"
      }
    ]
  },
  "sudden-expenses": {
    intro:
      "Clear financial triage for surprise bills so essentials stay protected while you stabilize cash flow.",
    whatToFind: "Priority bill plans, negotiation scripts, and one-page monthly budget snapshots.",
    urgent: {
      title: "IRS filing due date can affect cash planning",
      dateLabel: "April 15, 2026",
      body:
        "Federal tax returns for 2025 are due April 15, 2026 in most states. Plan payment options early if a tax bill could collide with medical or housing costs."
    },
    tools: [
      {
        title: "Essential-spending split tool",
        description: "Use a quick spending view to protect housing, food, medication, and utilities first.",
        href: "/article/handling-a-sudden-expense"
      },
      {
        title: "Bill negotiation starter",
        description: "A plain-language call script to ask for hardship plans before you miss a due date.",
        href: "/article/handling-a-sudden-expense"
      }
    ]
  },
  injuries: {
    intro:
      "Recovery planning after falls or mobility setbacks, with practical checklists for home and appointments.",
    whatToFind: "First-week recovery plans, home safety adjustments, and caregiver coordination tips.",
    urgent: {
      title: "Medicare General Enrollment closes soon",
      dateLabel: "March 31, 2026",
      body:
        "If you missed Medicare Part B enrollment, the General Enrollment Period ends March 31, 2026. Missing it can delay coverage and increase costs."
    },
    tools: [
      {
        title: "Home safety quick scan",
        description: "Identify high-risk rooms and simple upgrades that reduce fall risk this week.",
        href: "/article/after-a-fall-first-week-plan"
      },
      {
        title: "Recovery support scheduler",
        description: "Map rides, medication pickup, meals, and follow-up visits in one place.",
        href: "/membership"
      }
    ]
  },
  health: {
    intro:
      "Preventive care and appointment prep that help retirees stay informed, organized, and confident.",
    whatToFind: "Annual review checklists, medication lists, and symptom-tracking templates.",
    urgent: {
      title: "Last weeks for Medicare General Enrollment",
      dateLabel: "March 31, 2026",
      body:
        "Medicare's General Enrollment Period runs through March 31, 2026. Confirm your status now if you need Part B to avoid a longer uninsured gap."
    },
    tools: [
      {
        title: "Visit prep checklist",
        description: "Collect concerns, medications, and recent changes before your next clinician visit.",
        href: "/article/annual-health-review-made-simple"
      },
      {
        title: "Medication change tracker",
        description: "Log updates and side effects so care teams can review trends quickly.",
        href: "/membership"
      }
    ]
  },
  cancer: {
    intro:
      "Care-navigation support for treatment decisions, symptom tracking, and family communication.",
    whatToFind: "Question planners, appointment preparation, and support-resource guides.",
    urgent: {
      title: "Medicare enrollment deadline impacts oncology access",
      dateLabel: "March 31, 2026",
      body:
        "For retirees who need to adjust Part B status, Medicare General Enrollment ends March 31, 2026. Coverage timing can affect specialist and infusion scheduling."
    },
    tools: [
      {
        title: "Treatment question list",
        description: "Keep a running list for each visit so you leave with answers and action items.",
        href: "/article/cancer-care-question-planner"
      },
      {
        title: "Caregiver update template",
        description: "Share concise weekly updates with family without repeating details each day.",
        href: "/membership"
      }
    ]
  }
};

module.exports = {
  CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_ICON_META,
  CATEGORY_DETAILS
};
