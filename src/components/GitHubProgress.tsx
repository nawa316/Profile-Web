"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { Flame, GitCommit, GitFork, Star, Calendar, ExternalLink, RefreshCw, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0 - 4
}

interface GitHubData {
  total: {
    lastYear: number;
    [key: string]: number;
  };
  contributions: ContributionDay[];
}

interface GitHubUserStats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
  login: string;
  html_url: string;
}

interface GitHubProgressProps {
  username?: string;
}

export default function GitHubProgress({ username = "nawa316" }: GitHubProgressProps) {
  const { t } = useLanguage();
  const [data, setData] = useState<GitHubData | null>(null);
  const [userStats, setUserStats] = useState<GitHubUserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Extract clean username in case a full URL is provided
  const cleanUsername = useMemo(() => {
    if (!username) return "nawa316";
    return username.replace(/https?:\/\/(www\.)?github\.com\//i, "").replace(/\/$/, "");
  }, [username]);

  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      // Fetch contribution activity
      const contribPromise = fetch(`https://github-contributions-api.jogruber.de/v4/${cleanUsername}?y=last`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch contributions");
          return res.json();
        });

      // Fetch user profile statistics
      const userPromise = fetch(`https://api.github.com/users/${cleanUsername}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .catch(() => null);

      const [contribResult, userResult] = await Promise.all([contribPromise, userPromise]);

      if (contribResult && contribResult.contributions) {
        setData(contribResult);
      } else {
        throw new Error("Invalid contributions format");
      }

      if (userResult) {
        setUserStats(userResult);
      }
    } catch (err) {
      console.warn("Could not fetch live GitHub data, using fallback representation:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cleanUsername]);

  // Calculate streaks and stats
  const stats = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) {
      return {
        totalContributions: data?.total?.lastYear || 0,
        currentStreak: 0,
        longestStreak: 0,
        activeDays: 0,
      };
    }

    const contributions = data.contributions;
    const total = data.total?.lastYear || contributions.reduce((acc, curr) => acc + curr.count, 0);
    const activeDays = contributions.filter(d => d.count > 0).length;

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort contributions by date ascending
    const sorted = [...contributions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    // Current streak (checking from latest backwards)
    for (let i = sorted.length - 1; i >= 0; i--) {
      // Check if today or yesterday had contributions
      if (i === sorted.length - 1 && sorted[i].count === 0) {
        // If today is 0, check yesterday before resetting
        continue;
      }
      if (sorted[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      totalContributions: total,
      currentStreak,
      longestStreak,
      activeDays,
    };
  }, [data]);

  // Organize contributions into weeks for the contribution calendar grid
  const { weeks, monthLabels } = useMemo(() => {
    if (!data?.contributions) return { weeks: [], monthLabels: [] };

    const days = data.contributions;
    const weeksList: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Group days by week
    days.forEach((day, index) => {
      currentWeek.push(day);
      const dayOfWeek = new Date(day.date).getDay(); // 0 is Sunday, 6 is Saturday
      // We cut weeks on Saturday (or every 7 items)
      if (dayOfWeek === 6 || index === days.length - 1) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    });

    // Generate Month Labels positioning
    const months: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeksList.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          const monthName = new Date(firstDay.date).toLocaleDateString("en-US", { month: "short" });
          months.push({ name: monthName, weekIndex });
          lastMonth = month;
        }
      }
    });

    return { weeks: weeksList, monthLabels: months };
  }, [data]);

  // Color mapper matching site's blue/slate palette
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-200 border-blue-300";
      case 2:
        return "bg-blue-400 border-blue-500";
      case 3:
        return "bg-[#6b8af6] border-[#5577e8]";
      case 4:
        return "bg-[#3356cf] border-[#2242b5]";
      default:
        return "bg-slate-100 border-slate-200/80";
    }
  };

  const formatTooltipDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-16 px-4 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 mb-2 px-3.5 py-1.5 rounded-full bg-[#6b8af6]/10 text-[#6b8af6] text-xs font-semibold uppercase tracking-wider">
            <AiFillGithub className="w-4 h-4" />
            <span>GitHub Activity</span>
          </div>
          <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800">
            {t("about.githubTitle") || "GitHub Progress & Activity"}
          </h2>
          <div className="w-12 h-1 bg-[#6b8af6] mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mt-3">
            {t("about.githubSubtitle") || "A live overview of my open source contributions, coding streaks, and repositories."}
          </p>
        </motion.div>

        {/* Top Profile & Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Total Contributions */}
          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {t("about.totalContributions") || "Total Contributions"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#6b8af6] flex items-center justify-center group-hover:scale-110 transition-transform">
                <GitCommit className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-slate-800">
                {isLoading ? "..." : stats.totalContributions.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {t("about.pastYear") || "past year"}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Current Streak */}
          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {t("about.currentStreak") || "Current Streak"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-slate-800">
                {isLoading ? "..." : `${stats.currentStreak} ${t("about.days") || "days"}`}
              </span>
            </div>
          </motion.div>

          {/* Card 3: Longest Streak */}
          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {t("about.longestStreak") || "Longest Streak"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-slate-800">
                {isLoading ? "..." : `${stats.longestStreak} ${t("about.days") || "days"}`}
              </span>
            </div>
          </motion.div>

          {/* Card 4: Public Repos & Profile Link */}
          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {t("about.publicRepos") || "Public Repos"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GitFork className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl md:text-3xl font-bold text-slate-800">
                {isLoading ? "..." : (userStats?.public_repos ?? "30+")}
              </span>
              <a
                href={`https://github.com/${cleanUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#6b8af6] hover:text-[#483D8B] font-semibold transition-colors group/link"
              >
                <span>@{cleanUsername}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* GitHub Heatmap Calendar Card */}
        <motion.div
          className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Card Top Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                <AiFillGithub className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {userStats?.name || "Muhammad Ade Dzakwan"}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span>@{cleanUsername}</span>
                  <span>•</span>
                  <span>{stats.activeDays} {t("about.activeDays") || "active days in last year"}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://github.com/${cleanUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#6b8af6] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <AiFillGithub className="w-4 h-4" />
                <span>{t("about.viewProfile") || "View on GitHub"}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Calendar Heatmap Container with custom scrollbar */}
          <div className="relative">
            {isLoading ? (
              <div className="h-40 flex flex-col items-center justify-center gap-3 animate-pulse">
                <RefreshCw className="w-6 h-6 text-[#6b8af6] animate-spin" />
                <p className="text-xs text-slate-400 font-medium">Loading GitHub contributions...</p>
              </div>
            ) : hasError || weeks.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-slate-500 text-sm mb-3">
                  {t("about.errorLoadingGithub") || "Unable to fetch live contributions directly from GitHub."}
                </p>
                <a
                  href={`https://github.com/${cleanUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6b8af6] text-white text-xs font-medium hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t("about.viewProfile") || "Visit GitHub Profile"}
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
                <div className="min-w-[760px] select-none">
                  {/* Month labels */}
                  <div className="flex text-[11px] text-slate-400 font-medium mb-2 pl-7">
                    {monthLabels.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: `${(weeks.length > 0 ? (100 / weeks.length) * 4.3 : 8)}%`,
                          minWidth: '42px',
                        }}
                      >
                        {m.name}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Matrix: 7 rows (Sun to Sat) */}
                  <div className="flex gap-[3px] items-start">
                    {/* Weekday indicators */}
                    <div className="flex flex-col justify-between text-[9px] font-medium text-slate-400 pr-2 h-[88px] shrink-0 py-0.5">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>

                    {/* Columns of weeks */}
                    <div className="flex gap-[3px] flex-1">
                      {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.map((day, dIdx) => (
                            <motion.div
                              key={dIdx}
                              whileHover={{ scale: 1.25 }}
                              className={`w-[11px] h-[11px] rounded-[2.5px] border cursor-pointer transition-colors duration-150 ${getLevelColor(
                                day.level
                              )}`}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setHoveredDay({
                                  date: day.date,
                                  count: day.count,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                });
                              }}
                              onMouseLeave={() => setHoveredDay(null)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hover Tooltip */}
            {hoveredDay && (
              <div
                className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 bg-slate-900/95 backdrop-blur-xs text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap"
                style={{
                  left: `${hoveredDay.x}px`,
                  top: `${hoveredDay.y - 8}px`,
                }}
              >
                <span className="font-semibold text-[#6b8af6]">
                  {hoveredDay.count === 0 ? "No" : hoveredDay.count}{" "}
                  {hoveredDay.count === 1 ? "contribution" : "contributions"}
                </span>{" "}
                on {formatTooltipDate(hoveredDay.date)}
              </div>
            )}
          </div>

          {/* Calendar Bottom Legend & Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {t("about.updatedDaily") || "Updated daily via GitHub API"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-400">{t("about.less") || "Less"}</span>
              <div className="w-[11px] h-[11px] rounded-[2px] bg-slate-100 border border-slate-200" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-blue-200 border border-blue-300" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-blue-400 border border-blue-500" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#6b8af6] border-[#5577e8]" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#3356cf] border-[#2242b5]" />
              <span className="text-slate-400">{t("about.more") || "More"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
