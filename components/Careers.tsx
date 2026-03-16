import React, { useState, useRef, useEffect } from "react";
import { Briefcase, MapPin, Clock, Calendar, ChevronRight, Upload, Send, CheckCircle2, X, AlertCircle } from "lucide-react";
import { gsap } from "gsap";
import { useTheme } from "./theme-provider";

interface JobPost {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    date: string;
    closingDate: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}

const JOBS: JobPost[] = [
    {
        id: "qa-001",
        title: "Quality Assurance (QA) Engineer",
        department: "Quality Assurance",
        location: "Colombo (On-site)",
        type: "Full-time",
        date: "2026-03-01",
        closingDate: "2026-03-31",
        description: "We are seeking a detail-oriented QA Engineer to join our team. You will be responsible for ensuring the quality and reliability of our enterprise software solutions, specifically focusing on .NET applications.",
        responsibilities: [
            "Develop and execute comprehensive test plans and test cases",
            "Identify, document, and track software defects and inconsistencies",
            "Perform rigorous regression, functional, and performance testing",
            "Collaborate closely with developers to resolve issues efficiently",
            "Provide detailed feedback on UI/UX and overall system usability"
        ],
        requirements: [
            "Degree in Computer Science, IT, or a related field",
            "Proven experience in manual and automated software testing",
            "Solid understanding of the .NET framework and C# environment",
            "Familiarity with QA methodologies, tools, and standard processes",
            "Excellent analytical and attention-to-detail skills"
        ]
    }
];

const Careers: React.FC = () => {
    const { theme } = useTheme();
    const [selectedJob, setSelectedJob] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [activeModalJob, setActiveModalJob] = useState<JobPost | null>(null);
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

    useEffect(() => {
        if (activeModalJob) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeModalJob]);

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

        // --- REAL EMAIL SUBMISSION (Web3Forms) ---
        const WEB3FORMS_ACCESS_KEY = "de6e0595-c062-43fa-b11d-7c2f0351df91";
        const formEndpoint = "https://api.web3forms.com/submit";

        try {
            const formData = new FormData(formRef.current!);

            // Add Web3Forms Access Key
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", `New Job Application: ${selectedJob} - from Heptagon Web`);
            formData.append("from_name", "Heptagon Careers");

            // Clean up empty file field
            const fileInput = formRef.current?.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput && (!fileInput.files || fileInput.files.length === 0)) {
                formData.delete("attachment");
            }

            const response = await fetch(formEndpoint, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setFormStatus("success");
                setFileName("");
                if (formRef.current) formRef.current.reset();
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                let errorMessage = "Submission failed";
                try {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const data = await response.json();
                        errorMessage = data.error || data.message || errorMessage;
                    }
                } catch (e) {
                    console.error("Could not parse error response", e);
                }
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error("Submission Error:", error);
            // If it's a rate limit error or something similar, it might show up here
            alert(`Oops! ${error.message || "There was a problem submitting your form."} Please try again later or email us directly.`);
            setFormStatus("idle");
        }
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
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-orange-500" />
                                    <span className="text-red-500">Closes: {job.closingDate}</span>
                                </div>
                            </div>

                            <p className="dark:text-gray-400 text-gray-500 text-sm mb-8 leading-relaxed line-clamp-3">
                                {job.description}
                            </p>

                            <div className="mt-auto pt-6 border-t dark:border-white/5 border-black/5 flex gap-3">
                                <button
                                    onClick={() => setActiveModalJob(job)}
                                    className="flex-1 py-4 rounded-2xl bg-white dark:bg-white/5 border dark:border-white/10 border-black/10 font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-800 dark:hover:bg-white/10 transition-all duration-300"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => handleApply(job.title)}
                                    className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-2xl bg-orange-gradient text-white font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/20"
                                >
                                    Apply
                                    <ChevronRight size={14} />
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
                            Fill out the form below and our HR team will get back to you soon.
                            You can also email us directly at <span className="text-orange-500">heptagon.madushaintern@gmail.com</span>
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Your Name</label>
                            <input
                                required
                                type="text"
                                name="name"
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
                                name="email"
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
                                name="job_title"
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
                                    type="file"
                                    name="attachment"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setFileName(file.name);
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-full px-6 py-10 rounded-2xl border-2 border-dashed dark:border-white/10 border-black/10 dark:bg-white/5 bg-gray-50 flex flex-col items-center justify-center gap-3 group-hover:border-orange-500/50 transition-all">
                                    {fileName ? (
                                        <>
                                            <CheckCircle2 className="text-green-500" size={32} />
                                            <p className="text-sm font-bold text-green-500">
                                                {fileName}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFileName("");
                                                    if (formRef.current) {
                                                        const fileInput = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
                                                        if (fileInput) fileInput.value = "";
                                                    }
                                                }}
                                                className="text-[10px] uppercase font-black text-gray-400 hover:text-orange-500 transition-colors"
                                            >
                                                Change File
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="text-orange-500" size={32} />
                                            <p className="text-sm font-bold dark:text-gray-400 text-gray-500">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-medium">
                                                PDF, DOCX up to 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description / Message */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 ml-2">Cover Message (Optional)</label>
                            <textarea
                                rows={4}
                                name="message"
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
            {/* --- Modal Overlays --- */}
            {activeModalJob && (
                <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center px-4 py-8 md:p-12 lg:p-20 pb-12 md:pb-12">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => setActiveModalJob(null)}
                    />
                    <div className="relative w-full max-w-4xl max-h-[85vh] dark:bg-zinc-900 bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-y-auto border dark:border-white/10 border-black/10 animate-in zoom-in-95 duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 p-5 md:p-8 flex justify-between items-center dark:bg-zinc-900 bg-white border-b dark:border-white/5 border-black/5">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-orange-gradient text-white shadow-lg">
                                    <Briefcase size={20} className="md:w-6 md:h-6" />
                                </div>
                                <h2 className="text-lg md:text-3xl font-black dark:text-white text-gray-900 leading-tight">
                                    {activeModalJob.title}
                                </h2>
                            </div>
                            <button
                                onClick={() => setActiveModalJob(null)}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
                                <div className="lg:col-span-2">
                                    <section className="mb-12">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-5 flex items-center gap-2">
                                            <span className="w-6 h-px bg-orange-500/30" />
                                            About the Role
                                        </h4>
                                        <p className="dark:text-gray-300 text-gray-600 text-base md:text-lg leading-relaxed">
                                            {activeModalJob.description}
                                        </p>
                                    </section>

                                    <section className="mb-12">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-6 flex items-center gap-2">
                                            <span className="w-6 h-px bg-orange-500/30" />
                                            Key Responsibilities
                                        </h4>
                                        <ul className="space-y-4">
                                            {activeModalJob.responsibilities.map((res, i) => (
                                                <li key={i} className="flex gap-4 dark:text-gray-400 text-gray-600">
                                                    <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0 mt-1" />
                                                    <span className="font-medium text-sm md:text-base">{res}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-6 flex items-center gap-2">
                                            <span className="w-6 h-px bg-orange-500/30" />
                                            What You Need
                                        </h4>
                                        <ul className="space-y-4">
                                            {activeModalJob.requirements.map((req, i) => (
                                                <li key={i} className="flex gap-4 dark:text-gray-400 text-gray-600">
                                                    <AlertCircle size={18} className="text-orange-500 flex-shrink-0 mt-1" />
                                                    <span className="font-medium text-sm md:text-base">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                {/* Sidebar Info */}
                                <div className="space-y-6">
                                    <div className="p-6 md:p-8 rounded-[2rem] dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-black/5">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Quick Facts</h4>
                                        <div className="space-y-5">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500/60 mb-1">Location</span>
                                                <span className="font-bold text-sm dark:text-zinc-300">{activeModalJob.location}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500/60 mb-1">Employment Type</span>
                                                <span className="font-bold text-sm dark:text-zinc-300">{activeModalJob.type}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500/60 mb-1">Department</span>
                                                <span className="font-bold text-sm dark:text-zinc-300">{activeModalJob.department}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500/60 mb-1">Posted On</span>
                                                <span className="font-bold text-sm dark:text-zinc-300">{activeModalJob.date}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500/60 mb-1">Closing Date</span>
                                                <span className="font-bold text-sm text-red-500">{activeModalJob.closingDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleApply(activeModalJob.title);
                                            setActiveModalJob(null);
                                        }}
                                        className="w-full py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] bg-orange-gradient text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                                    >
                                        Apply For This Job
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
