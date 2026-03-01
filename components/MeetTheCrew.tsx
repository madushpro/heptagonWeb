import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Code2, Smartphone, BarChart3, HeartHandshake, Layers } from "lucide-react";
import { useTheme } from "./theme-provider";

gsap.registerPlugin(ScrollTrigger);

// ── Types ──────────────────────────────────────────────────────────────────
interface TeamMember {
    name: string;
    role: string;
    dept: string;
    image?: string;
    initials: string;
    color: string;
}

// ── Department config ──────────────────────────────────────────────────────
const DEPARTMENTS = [
    { id: "all", label: "All", Icon: Users, count: 15 },
    { id: "management", label: "Management", Icon: Layers, count: 3 },
    { id: "hr", label: "HR Team", Icon: HeartHandshake, count: 1 },
    { id: "business", label: "Business Analysis", Icon: BarChart3, count: 1 },
    { id: "technical", label: "Technical Team", Icon: Code2, count: 2 },
    { id: "mobile", label: "Mobile Team", Icon: Smartphone, count: 2 },
    { id: "software", label: "Software Engineering", Icon: Code2, count: 6 },
];

// ── Team data ──────────────────────────────────────────────────────────────
const TEAM: TeamMember[] = [
    // Technical
    { name: "Lakshan Bhanuka", role: "Head of Technical", dept: "technical", initials: "LB", color: "#f97316" },
    { name: "H.P Thilanka", role: "Technical Officer", dept: "technical", initials: "HT", color: "#ea580c" },
    // Management
    { name: "N.L Aluthge", role: "Director", dept: "management", initials: "NA", color: "#3b82f6" },
    { name: "A.M Priyantha Adhikaru", role: "Director", dept: "management", initials: "AP", color: "#2563eb" },
    { name: "Mindada Weerasiri", role: "Director", dept: "management", initials: "MW", color: "#1d4ed8" },
    // Mobile
    { name: "Mindada Weerasiri", role: "Head of Mobile", dept: "mobile", initials: "MW", color: "#8b5cf6" },
    { name: "Shenan Rathnayaka", role: "Associate Software Engineer", dept: "mobile", initials: "SR", color: "#7c3aed" },
    // Business Analysis
    { name: "Nirul Helitha", role: "Associate Business Analyst", dept: "business", initials: "NH", color: "#10b981" },
    // HR
    { name: "Hasitha Erandi", role: "Head of HR", dept: "hr", initials: "HE", color: "#ec4899" },
    // Software Engineering
    { name: "Yasas Wasala", role: "Senior Software Engineer", dept: "software", initials: "YW", color: "#f97316" },
    { name: "Avishka Ranasinha", role: "Software Engineer", dept: "software", initials: "AR", color: "#ea580c" },
    { name: "Pasindu Bhanuka", role: "Associate Software Engineer", dept: "software", initials: "PB", color: "#fb923c" },
    { name: "Madusha Thassara", role: "Associate Software Engineer", dept: "software", initials: "MT", color: "#f97316" },
    { name: "Malindu Sanchana", role: "Associate Software Engineer", dept: "software", initials: "MS", color: "#ea580c" },
    { name: "Minidu Tharinda", role: "Associate Software Engineer", dept: "software", initials: "MT", color: "#fb923c" },
];

const DEPT_LABELS: Record<string, string> = {
    technical: "Technical Team",
    management: "Management",
    mobile: "Mobile Team",
    business: "Business Analysis",
    hr: "HR Team",
    software: "Software Engineering",
};

// ── Avatar component ───────────────────────────────────────────────────────
const Avatar: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div
        className="w-full aspect-square rounded-2xl flex items-center justify-center text-white font-black text-3xl select-none shadow-lg"
        style={{
            background: `linear-gradient(135deg, ${member.color}cc 0%, ${member.color}44 100%)`,
            border: `2px solid ${member.color}55`,
        }}
    >
        {member.initials}
    </div>
);

// ── Card component ─────────────────────────────────────────────────────────
const MemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => (
    <div
        className="crew-card h-full dark:bg-zinc-900/80 bg-white rounded-2xl overflow-hidden border dark:border-white/5 border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center p-5 sm:p-6"
    >
        {/* Avatar */}
        <div className="mb-4 w-full">
            <Avatar member={member} />
        </div>

        {/* Name – orange */}
        <h3 className="font-bold text-sm leading-tight mb-1" style={{ color: "#f97316" }}>
            {member.name}
        </h3>

        {/* Designation – dark */}
        <p className="text-xs font-semibold dark:text-gray-300 text-gray-700 leading-snug">
            {member.role}
        </p>
    </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────
const MeetTheCrew: React.FC = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState("all");
    const pageRef = useRef<HTMLDivElement>(null);

    const filtered = activeTab === "all"
        ? TEAM
        : TEAM.filter((m) => m.dept === activeTab);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".crew-card",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", delay: 0.3, clearProps: "y,opacity" }
            );
        }, pageRef);
        return () => ctx.revert();
    }, []);

    // Re-animate cards on tab change
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".crew-card",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power2.out", clearProps: "y,opacity" }
            );
        }, pageRef);
        return () => ctx.revert();
    }, [activeTab]);

    return (
        <div
            ref={pageRef}
            className={`min-h-screen pt-28 ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-[#050505] text-white"}`}
        >
            {/* ── Hero Header ── */}
            <div className="pt-8 pb-10 px-4 md:px-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-orange-500/10 bg-orange-50 border dark:border-orange-500/20 border-orange-200 mb-5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Our People</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black dark:text-white text-gray-900 mb-4 leading-tight">
                    Meet the{" "}
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #f97316, #ea580c)" }}>
                        Crew
                    </span>
                </h1>
                <p className="dark:text-gray-400 text-gray-500 text-base md:text-lg max-w-xl mx-auto font-medium">
                    The talented people behind Heptagon — building digital excellence one line at a time.
                </p>
            </div>

            {/* ── Department Tab Nav ── */}
            <div className="px-4 md:px-12 mb-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {DEPARTMENTS.map(({ id, label, Icon }) => {
                            const active = activeTab === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${active
                                        ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
                                        : "dark:bg-white/5 bg-white dark:border-white/10 border-black/10 dark:text-gray-400 text-gray-600 hover:border-orange-500 hover:text-orange-500"
                                        }`}
                                >
                                    <Icon size={13} />
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Cards Grid ── */}
            <div className="px-4 md:px-12 pb-20">
                <div className="max-w-7xl mx-auto">

                    {/* Group by department when "all" is selected */}
                    {activeTab === "all" ? (
                        DEPARTMENTS.slice(1).map(({ id: dept }) => {
                            const members = TEAM.filter((m) => m.dept === dept);
                            if (members.length === 0) return null;
                            return (
                                <div key={dept} className="mb-14">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h2 className="text-sm font-black uppercase tracking-[0.2em] dark:text-white text-gray-900">
                                            {DEPT_LABELS[dept]}
                                        </h2>
                                        <div className="h-px flex-1 dark:bg-white/5 bg-black/5" />
                                    </div>
                                    <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-6">
                                        {members.map((member, i) => (
                                            <div key={`${dept}-${i}`} className="w-40 sm:w-48">
                                                <MemberCard member={member} index={i} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-6">
                            {filtered.map((member, i) => (
                                <div key={i} className="w-40 sm:w-48">
                                    <MemberCard member={member} index={i} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeetTheCrew;
