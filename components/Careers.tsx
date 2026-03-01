import React, { useState, useRef, useEffect } from "react";
import { Briefcase, MapPin, Clock, Calendar, ChevronRight, Upload, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { useTheme } from "./theme-provider";

interface JobPost {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    date: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}

const JOBS: JobPost[] = [
    {
        id: "se-001",
        title: "Senior Software Engineer",
        department: "Software Engineering",
        location: "Colombo / Remote",
        type: "Full-time",
        date: "2024-03-01",
        description: "We are looking for a Senior Software Engineer with a passion for building scalable, high-quality digital solutions using modern web technologies.",
        responsibilities: [
            "Lead the design and development of complex features",
            "Mentor junior and associate developers",
            "Collaborate with multi-functional teams to define project requirements",
            "Ensure the technical feasibility of UI/UX designs"
        ],
        requirements: [
            "5+ years of experience in full-stack development",
            "Proficiency in React, Node.js, and TypeScript",
            "Strong understanding of system architecture and cloud services",
            "Excellent problem-solving and communication skills"
        ]
    },
    {
        id: "ma-002",
        title: "Mobile App Developer",
        department: "Mobile Team",
        location: "Colombo / Hybrid",
        type: "Full-time",
        date: "2024-03-01",
        description: "Join our Mobile Team to create high-performance, beautiful mobile applications for both iOS and Android platforms.",
        responsibilities: [
            "Develop cross-platform mobile apps using React Native or Flutter",
            "Optimize applications for maximum speed and scalability",
            "Implement pixel-perfect UI designs",
            "Integrate with backend services and APIs"
        ],
        requirements: [
            "3+ years of experience in mobile development",
            "Strong knowledge of React Native or Flutter",
            "Experience with native mobile development is a plus",
            "Familiarity with push notifications and mobile storage"
        ]
    },
    {
        id: "ba-003",
        title: "Associate Business Analyst",
        department: "Business Analysis",
        location: "Colombo",
        type: "Full-time",
        date: "2024-02-15",
        description: "We need a detail-oriented Business Analyst to bridge the gap between business needs and technical solutions.",
        responsibilities: [
            "Analyze business requirements and translate them into technical specs",
            "Design and document business processes",
            "Communicate insights and findings to stakeholders",
            "Assist in project planning and tracking"
        ],
        requirements: [
            "Degree in Business, IT, or related field",
            "Strong analytical and critical thinking skills",
            "Excellent documentation and presentation abilities",
            "Basic understanding of software development lifecycles"
        ]
    }
];

const Careers: React.FC = () => {
    const { theme } = useTheme();
    const [selectedJob, setSelectedJob] = useState<string>("");
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
    const formRef = useRef<HTMLFormElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".job-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".job-grid",
                    start: "top 80%"
                }
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const handleApply = (title: string) => {
        setSelectedJob(title);
        const formElement = document.getElementById("application-form");
        if (formElement) {
            const yOffset = -100; // Adjust for navbar
            const y = formElement.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        // Simulate API call
        // In a real scenario, you would use Formspree, EmailJS, or your own backend API
        // For example:
        // const formData = new FormData(formRef.current!);
        // await fetch('https://formspree.io/f/your-form-id', { method: 'POST', body: formData });

        setTimeout(() => {
            setFormStatus("success");
            if (formRef.current) formRef.current.reset();
            setTimeout(() => setFormStatus("idle"), 5000);
        }, 1500);
    };

    return (
        <div ref={pageRef} className={`min-h-screen pt-28 pb-20 ${theme === "light" ? "bg-gray-50" : "bg-[#050505] text-white"}`}>
            {/* --- Hero Header --- */}
            <div className="pt-8 pb-16 px-4 md:px-12 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-orange-500/10 bg-orange-50 border dark:border-orange-500/20 border-orange-200 mb-6 reveal">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Careers at Heptagon</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight reveal">
                    Build the Future <br />
                    <span className="text-orange-gradient">With Us</span>
                </h1>
                <p className="dark:text-gray-400 text-gray-500 text-lg md:text-xl font-medium leading-relaxed reveal">
                    We are always looking for passionate, curious, and talented individuals to join our crew.
                    If you love technology and want to make a real impact, check out our open positions.
                </p>
            </div>

            {/* --- Job Listings --- */}
            <div className="px-4 md:px-12 mb-24 job-grid">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {JOBS.map((job) => (
                        <div key={job.id} className="job-card group dark:bg-zinc-900/60 bg-white border dark:border-white/5 border-black/5 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 flex flex-col shadow-xl shadow-black/5 hover:shadow-orange-500/10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-orange-gradient text-white shadow-lg shadow-orange-500/20">
                                    <Briefcase size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                                    {job.type}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 dark:text-white text-gray-900 group-hover:text-orange-500 transition-colors">
                                {job.title}
                            </h3>

                            <div className="flex flex-wrap gap-4 mb-6 text-xs font-semibold dark:text-gray-400 text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-orange-500" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-orange-500" />
                                    {job.department}
                                </div>
                            </div>

                            <p className="dark:text-gray-400 text-gray-500 text-sm mb-8 leading-relaxed line-clamp-3">
                                {job.description}
                            </p>

                            <div className="mt-auto pt-6 border-t dark:border-white/5 border-black/5">
                                <button
                                    onClick={() => handleApply(job.title)}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-white/5 border dark:border-white/10 border-black/10 font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                                >
                                    Apply Now
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Application Form Section --- */}
            <div id="application-form" className="px-4 md:px-12">
                <div className="max-w-4xl mx-auto dark:bg-zinc-900/80 bg-white border dark:border-white/10 border-black/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] -z-1" />

                    <div className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 dark:text-white text-gray-900">
                            Send Your <span className="text-orange-gradient">Application</span>
                        </h2>
                        <p className="dark:text-gray-400 text-gray-600 font-medium">
                            Fill out the form below and our HR team (Hasitha) will get back to you soon.
                            You can also email us directly at <span className="text-orange-500">info@heptagon.lk</span>
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Your Name</label>
                            <input
                                required
                                type="text"
                                placeholder="E.g. Yasas Wasala"
                                className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-black/5 outline-none focus:border-orange-500 transition-colors dark:text-white"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-black/5 outline-none focus:border-orange-500 transition-colors dark:text-white"
                            />
                        </div>

                        {/* Job Title Field (Auto-filled) */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Desired Job Title</label>
                            <input
                                required
                                type="text"
                                value={selectedJob}
                                onChange={(e) => setSelectedJob(e.target.value)}
                                placeholder="E.g. Senior Software Engineer"
                                className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-black/5 outline-none focus:border-orange-500 transition-colors dark:text-white"
                            />
                        </div>

                        {/* CV Upload Mockup */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Attach CV / Resume</label>
                            <div className="relative group">
                                <input
                                    required
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-full px-6 py-10 rounded-2xl border-2 border-dashed dark:border-white/10 border-black/10 dark:bg-white/5 bg-gray-50 flex flex-col items-center justify-center gap-3 group-hover:border-orange-500/50 transition-all">
                                    <Upload className="text-orange-500" size={32} />
                                    <p className="text-sm font-bold dark:text-gray-400 text-gray-500">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        PDF, DOCX up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description / Message */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Cover Message (Optional)</label>
                            <textarea
                                rows={4}
                                placeholder="Tell us about yourself and why you'd be a great fit..."
                                className="w-full px-6 py-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-black/5 outline-none focus:border-orange-500 transition-colors dark:text-white resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 mt-4">
                            <button
                                type="submit"
                                disabled={formStatus !== "idle"}
                                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm shadow-xl transition-all duration-300 ${formStatus === "success"
                                        ? "bg-green-500 text-white shadow-green-500/20"
                                        : "bg-orange-gradient text-white shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                                    }`}
                            >
                                {formStatus === "idle" && (
                                    <>
                                        Submit Application
                                        <Send size={18} />
                                    </>
                                )}
                                {formStatus === "submitting" && (
                                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                )}
                                {formStatus === "success" && (
                                    <>
                                        Successfully Sent
                                        <CheckCircle2 size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Careers;
