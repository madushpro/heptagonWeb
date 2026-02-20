import { ProjectItem } from "@/types/projectTypes";

export const projects: ProjectItem[] = [
  {
    id: "financial-dashboard-sme",
    title: "Financial Dashboard SME",
    cat: "Software Development",
    year: "2025",
    featured: true,
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",

    problem:
      "SMEs struggled with fragmented financial reporting across multiple spreadsheets and disconnected accounting tools.",

    solution:
      "Built a centralized financial dashboard using React, RTK Query, and MSSQL with real-time reporting, payroll integration, and automated reconciliation.",

    impact:
      "Reduced manual reporting time by 65% and improved financial visibility for decision-makers.",

    metrics: [
      { value: "65%", label: "Time Saved" },
      { value: "3x", label: "Faster Reporting" },
      { value: "99.9%", label: "System Uptime" },
      { value: "5k+", label: "Monthly Users" },
    ],

    stack: ["React", "RTK Query", "Node.js", "MSSQL", "Azure"],
    live: "#",
  },

  {
    id: "e-commerce-cloud-engine",
    title: "E-Commerce Cloud Engine",
    cat: "Web Platform",
    year: "2024",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",

    problem:
      "Client needed a scalable e-commerce engine capable of handling seasonal traffic spikes.",

    solution:
      "Designed cloud-native architecture with microservices, optimized checkout flow, and integrated secure payment gateways.",

    impact:
      "Handled 10x traffic surge during peak campaigns with zero downtime.",

    metrics: [
      { value: "10x", label: "Traffic Scalability" },
      { value: "40%", label: "Faster Checkout" },
      { value: "25%", label: "Revenue Growth" },
      { value: "0", label: "Downtime Events" },
    ],

    stack: ["Next.js", "Node.js", "Stripe", "AWS"],
    live: "#",
  },

  {
    id: "ai-analytics-pro",
    title: "AI Analytics Pro",
    cat: "Mobile App",
    year: "2025",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",

    problem:
      "Businesses lacked predictive insights and relied only on historical reports.",

    solution:
      "Developed AI-powered analytics engine with forecasting models and real-time KPI monitoring.",

    impact: "Enabled predictive decision-making with 87% model accuracy.",

    metrics: [
      { value: "87%", label: "Prediction Accuracy" },
      { value: "50%", label: "Decision Speed Increase" },
      { value: "30%", label: "Cost Optimization" },
      { value: "2M+", label: "Data Points Analyzed" },
    ],

    stack: ["React Native", "Python", "TensorFlow", "Firebase"],
    live: "#",
  },

  {
    id: "healthtech-portal",
    title: "HealthTech Portal",
    cat: "Software System",
    year: "2024",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",

    problem:
      "Hospitals faced inefficient patient record management and appointment scheduling.",

    solution:
      "Created secure health portal with role-based access, patient dashboards, and integrated appointment system.",

    impact:
      "Improved operational efficiency and reduced administrative workload by 45%.",

    metrics: [
      { value: "45%", label: "Admin Work Reduced" },
      { value: "99.99%", label: "Data Security" },
      { value: "12k+", label: "Active Patients" },
      { value: "24/7", label: "System Availability" },
    ],

    stack: ["React", ".NET", "SQL Server", "Azure"],
    live: "#",
  },

  {
    id: "smart-city-logistics",
    title: "Smart City Logistics",
    cat: "Infrastructure",
    year: "2023",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",

    problem:
      "Urban logistics operations lacked route optimization and real-time fleet tracking.",

    solution:
      "Implemented IoT-based tracking system with AI-driven route optimization.",

    impact: "Reduced fuel costs by 28% and improved delivery time by 35%.",

    metrics: [
      { value: "28%", label: "Fuel Cost Reduction" },
      { value: "35%", label: "Delivery Speed Increase" },
      { value: "1k+", label: "Vehicles Managed" },
      { value: "99%", label: "Tracking Accuracy" },
    ],

    stack: ["React", "Node.js", "IoT", "AWS"],
    live: "#",
  },

  {
    id: "cybersec-guardian",
    title: "CyberSec Guardian",
    cat: "Security",
    year: "2024",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",

    problem:
      "Organizations faced increasing cyber threats and lacked proactive monitoring systems.",

    solution:
      "Developed real-time threat detection platform with anomaly detection algorithms and automated alerts.",

    impact:
      "Prevented critical security breaches and reduced incident response time by 60%.",

    metrics: [
      { value: "60%", label: "Faster Response" },
      { value: "24/7", label: "Monitoring" },
      { value: "100%", label: "Threat Detection Coverage" },
      { value: "0", label: "Critical Breaches" },
    ],

    stack: ["React", "Python", "AI Models", "Cloud Security"],
    live: "#",
  },
];
