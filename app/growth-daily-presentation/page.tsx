"use client";
/* eslint-disable @next/next/no-img-element */

// Growth Daily — second-round interview case study.
// Standalone route. All styles are scoped to this file; no global tokens,
// shared components or other routes are touched.
// Evidence source: Growth Daily feature reference + dev notes (Documents/Claude Code/GrowthDaily,
// Downloads/Growth Daily — 开发过程与思考完整记录.md), the "GrowthDaily — 项目完整回顾" retrospective
// Icey supplied, and real screenshots of the live app.
// Primary display language is Chinese; English is available via the L toggle.
// Structure follows Icey's own retrospective 1:1 — one slide per section, in that order.

import { createContext, Fragment, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif';

// ── Tokens (neutral, page-scoped — same system as /seedflow-presentation) ───
const INK = "#1d1d1f";
const BODY = "#424245";
const MUTED = "#86868b";
const LINE = "rgba(0,0,0,0.1)";
const WARM = "#f5f5f7";

const STAGE_W = 1600;
const STAGE_H = 900;
const IMG = "/images/growth-daily-presentation";
const GD_URL = "https://iceyue1995.github.io/growth-daily/"; // TODO Icey: confirm this is the current live link

type Shot = { src: string; alt: string; caption?: string };
type OpenLightbox = (items: Shot[], index?: number) => void;

// ── Language (中文 primary / EN secondary) ───────────────────────────────────
type Lang = "en" | "zh";
const LangContext = createContext<Lang>("zh");
const ZH: Record<string, string> = {
  "Case study · Yue Yuwen": "案例研究 · Yue Yuwen",
  " · ← → to browse": " · ← → 浏览",
  " · Esc to close": " · Esc 关闭",

  // Chapters (eyebrow tag + speaker-note headers; footer nav is dots)
  "Context": "背景",
  "Problem discovery": "问题发现",
  "Product vision": "产品理念",
  "Product architecture": "产品架构",
  "Personalization": "个性化设计",
  "Key iterations": "关键迭代",
  "Product thinking": "产品思考",
  "Timeline": "开发时间线",
  "AI-native execution": "AI 原生执行",
  "Takeaway": "总结",

  // 01 · Context
  "01 · Context": "01 · 背景",
  "Turning real language mistakes into personal learning.": "把自己真实犯过的语言错误，变成专属学习内容。",
  "An AI-assisted learning experiment I independently designed, built, and iterated.": "一个独立设计、开发并持续迭代的 AI 学习实验。",
  "Role": "角色",
  "Independent Product Designer & Builder": "独立产品设计师 / 开发者",
  "Type": "类型",
  "Personal AI product experiment": "个人 AI 产品实验",
  "Year": "年份",
  "2026": "2026",
  "Growth Daily · Launch screen (light)": "Growth Daily · 启动页（浅色）",
  "Growth Daily · Launch screen (dark)": "Growth Daily · 启动页（深色）",

  // 02 · Problem discovery
  "02 · Problem discovery": "02 · 问题发现",
  "Being corrected once doesn't mean you've actually learned it.": "被纠正一次，不代表真正掌握。",
  "I've tried many learning apps, including Duolingo — its gamification is excellent, but I still couldn't stick with it. The real problem wasn't a lack of content; it was the distance between that content and the English I actually use in ChatGPT chats, meetings, and daily conversations.": "我试过不少学习产品，包括多邻国——游戏化做得很好，但我还是很难长期坚持。真正的问题不是内容不够丰富，而是这些内容和我在 ChatGPT、会议、日常沟通里真实用到的英语，始终有距离。",
  "I've tried many learning apps, including Duolingo — its gamification is excellent, but I still couldn't stick with it.": "我试过不少学习产品，包括多邻国——游戏化做得很好，但我还是很难长期坚持。",
  "What I practiced": "我练习的内容",
  "Gamified drills, a preset curriculum": "游戏化题库、预设课程",
  "a persistent gap": "始终有距离",
  "What I actually use": "我真实用到的英语",
  "ChatGPT, meetings, daily conversation": "ChatGPT、会议、日常沟通",
  "I could communicate in English, but kept repeating similar grammar mistakes — even after understanding the AI's correction.": "我能用英语交流，但同样的语法错误一直在重复出现——哪怕我已经看懂了 AI 的纠正。",
  "Knowledge ≠ application": "知识 ≠ 应用",
  "Understanding a grammar point doesn't mean I can use it fluently in a real conversation.": "理解一个知识点，不代表能在真实场景里熟练用出来。",
  "Repeated mistakes": "反复出错",
  "AI corrects the mistake, but without reinforcement, the same mistake comes back.": "AI 纠正了错误，但缺少持续强化，同样的错误还会再出现。",
  "Generic learning": "内容泛化",
  "Most tools offer a preset curriculum, without using what I've actually said or written.": "大多数工具提供预设课程，却没有用上我自己真实说过、写过的内容。",
  "Lack of active recall": "缺少主动提取",
  "It's easy to rely on seeing the right answer, instead of retrieving an expression from memory myself.": "容易依赖看到正确答案，而缺少主动从记忆里提取表达的训练。",
  "Could my own real mistakes — not a preset curriculum — decide what to practice next?": "能不能让我自己真实的错误，而不是预设课程，来决定接下来该练什么？",

  // 03 · Product vision
  "03 · Product vision": "03 · 产品理念",
  "From passive learning to personalized, active practice.": "从被动学习，到个性化的主动练习。",
  "Conventional learning": "传统学习",
  "Predefined curriculum": "预设课程",
  "Practice": "练习",
  "Correction": "纠正",
  "Growth Daily": "Growth Daily",
  "Real-life expression": "真实表达",
  "Error diagnosis": "错误诊断",
  "Personalized practice": "个性化练习",
  "Spaced review": "间隔复习",
  "Re-application": "重新应用",
  "Active recall — not re-reading the right answer, but actively recalling and re-producing the expression myself.": "主动提取——不是重复阅读正确答案，而是主动回忆并重新组织表达。",
  "How well I remember something decides when I review it again — weak points come back sooner, mastered ones get more space.": "掌握程度决定下一次复习的时间——没记住的更快安排，已掌握的间隔逐渐拉长。",
  "Practice content comes from real work scenarios and real communication needs, not just a fixed textbook.": "练习内容来自真实的职场场景和沟通需求，而不只是固定教材。",
  "Not a static question bank — a system where real performance keeps shaping what to practice next.": "不是一个静态题库，而是一套让真实表现持续影响下一步练习的系统。",

  // 04 · Product architecture
  "04 · Product architecture": "04 · 产品架构",
  "One learning experience, four layers.": "一套学习体验，四层架构。",
  "A · Personal diagnosis": "A · 个人诊断",
  "Finds recurring issues in my real expression — verb forms, articles, prepositions, agreement, phrasing.": "识别我真实表达里反复出现的问题——动词形式、冠词、介词、主谓一致、不自然的表达。",
  "B · Personalized training": "B · 个性化训练",
  "Rewrite real mistakes into better sentences, then get AI feedback on grammar and expression.": "把真实错误改写成更好的句子，再获得 AI 在语法和表达上的反馈。",
  "Practice one sentence pattern across different real contexts.": "把一个句型迁移到不同的真实语境里反复练习。",
  "Scenario-based speaking and recording, with feedback that goes beyond grammar.": "情境口语和录音练习，反馈不只看语法。",
  "C · Retention & progress": "C · 巩固与进展",
  "Five rule-based review intervals — 1 / 3 / 7 / 14 / 30 days — modeled on the Leitner system, not AI-tuned.": "参考 Leitner System 的五级规则化间隔复习——1 / 3 / 7 / 14 / 30 天，可预测，而不是 AI 推荐的节奏。",
  "D · Real-world application": "D · 真实场景应用",
  "Real interviews, workplace discussion, industry reports, and TED talks — not synthetic scripts.": "真实访谈、职场讨论、行业报告和 TED 演讲——不是合成脚本。",
  "Grammar Repair · Old pattern vs. better pattern (sample data)": "Grammar Repair · 错误用法与更好的说法（示例数据）",
  "Spaced Review · Attempt, then reveal and grade (sample data)": "Spaced Review · 先自己尝试，再揭晓并自评（示例数据）",
  "Each layer answers one question: what to fix, how to practice, when to review, where to apply it.": "每一层回答一个问题：练什么、怎么练、什么时候复习、用在哪里。",

  // 05 · Personalization
  "05 · Personalization": "05 · 个性化设计",
  "Same word, four different logics.": "同样叫个性化，背后是四套不同的逻辑。",
  "Today's nine cards don't personalize the same way — some adapt to you, some just rotate.": "Today 页面九张卡片，个性化的方式并不一样——有的真的在适应你，有的只是按天轮换。",
  "From your mistake history": "来自你的错误历史",
  "Selects and paces content from your own AI-correction history, not a preset bank.": "选题和复习节奏都来自你真实的 AI 批改记录，不是预设题库。",
  "From your real background": "来自你的真实背景",
  "Content is your own work history and project stories — editable in Library, not a generic template.": "内容本身就是你的真实经历，可以在 Library 页编辑，不是通用模板。",
  "From how you express it": "来自你的表达方式",
  "A recorded answer gets extra feedback on how it sounded — filler words, pacing, naturalness; a typed one doesn't, because there's nothing to listen to.": "录音回答会多一段\"听起来怎么样\"的反馈——口头禅、节奏、自然度；纯打字没有，因为没有\"听起来\"这回事。",
  "Rotated by day, not by you": "按天轮换，不针对你",
  "Shows the same content to everyone, just rotated by day — that's variety, not personalization.": "对所有人展示一样的内容，只是按天轮换——是为了不重复，不是真正的个性化。",
  "Not everything labeled \"personalized\" is personalized to you — some of it is just a rotation rule for variety.": "不是所有\"个性化\"都来自你——有的来自你的历史和背景，有的只是为了不重复的轮换规则。",

  // 06 · Key iterations
  "06 · Key iterations": "06 · 关键迭代",
  "Growth Daily wasn't built once — it kept changing as I actually used it.": "Growth Daily 不是一次性做完的，而是在持续使用中不断调整。",
  "Iteration": "迭代",
  "Generic exercises → personal mistakes": "固定题库 → 真实错题",
  "Generic exercises": "固定题库",
  "Personal mistakes": "真实错题",
  "A fixed grammar bank didn't match what I actually got wrong — practice now starts from my real mistakes.": "固定语法题库未必是我真正该练的——改为优先用我自己真实犯过的错误。",
  "One-time correction → continuous learning": "一次纠正 → 持续学习",
  "One-time correction": "一次纠正",
  "Continuous learning": "持续学习",
  "Understanding a correction once wasn't enough, so Spaced Review turns past mistakes into future practice.": "理解一次纠正还不够，于是加入间隔复习，把过去的错误变成未来的练习任务。",
  "Synthetic content → real-world learning": "合成内容 → 真实素材",
  "Synthetic content": "合成内容",
  "Real-world learning": "真实素材",
  "Scripted audio felt different from real speech, so listening and talks moved to real interviews and TED videos.": "合成语音和真实交流有距离，于是听力和演讲素材换成真实访谈和 TED 演讲。",
  "Grammar accuracy → speaking quality": "语法正确 → 口语质量",
  "Grammar accuracy": "语法正确",
  "Speaking quality": "口语质量",
  "A grammatically correct sentence can still sound unnatural spoken aloud, so recordings get their own feedback.": "语法正确不代表说出来自然，于是给录音单独做口语表达反馈，和语法分开评估。",
  "More features → sustainable learning": "功能数量 → 可持续学习",
  "More features": "功能数量",
  "Sustainable learning": "可持续学习",
  "Too much daily content became a burden, so some modules became optional, built around realistic completion.": "每天内容太多反而增加负担，于是把部分模块设为可选，优先保证能长期坚持。",
  "AI-generated answers → trustworthy content": "AI 生成答案 → 可信内容",
  "AI-generated answers": "AI 生成答案",
  "Trustworthy content": "可信内容",
  "Without a verified transcript, AI couldn't fairly judge my retelling — scoring was replaced with sourced reference points.": "没有可靠转录时，AI 无法公正判断我的复述——放弃没有依据的评分，改用有来源的参考要点。",
  "Content quantity → content quality": "内容数量 → 内容质量",
  "Content quantity": "内容数量",
  "Content quality": "内容质量",
  "The content pool was too small and repeated, so I expanded it, verified sources, capped length — and reported honestly where it still fell short.": "内容池太小导致重复，于是扩充内容、核实来源、控制时长，并如实说明哪里还没达标。",
  "Each iteration answered the same question: is this actually trustworthy, sustainable, and personal enough?": "每一次迭代，都在回答同一个问题：这是否真的足够可信、可持续、够个人化？",
  "Select an iteration to see the problem, the adjustment, and the judgment behind it.": "选择左侧任意一项，查看完整的问题、调整和产品判断。",
  "Problem": "问题",
  "Adjustment": "调整",
  "Previous": "上一个",
  "Next": "下一个",
  "Grammar Repair started on a fixed question bank, but generic exercises didn't necessarily fix the mistakes I actually kept making.": "Grammar Repair 最初使用的是固定题库，但后来我发现，通用练习不一定能解决用户自己反复犯的错误。",
  "Now, once \"Check my answers with AI\" returns correction feedback, the system collects that real mistake and turns it into a future Grammar Repair exercise — prioritized by how recently it happened.": "现在当用户通过 Check my answers with AI 得到纠错反馈后，系统会收集这些真实错误，并优先按照最近犯错的顺序，将它们转化成后续的 Grammar Repair 练习。",
  "I see the reason for the mistake and a more natural phrasing, then have to write three of my own sentences to actually apply it.": "用户不仅能看到错误原因和更自然的表达，还需要自己造三个句子，完成主动练习，实现举一反三。",
  "For a new user with no error history yet, it falls back to the fixed question bank so the experience is never empty.": "另外，我也考虑了新用户的数据不足问题——如果还没有积累真实错题，系统就会回退到固定题库，避免出现空白状态。",
  "The point isn't how much practice content AI can generate — it's using the user's own mistake data to make that content targeted.": "这里的核心不是 AI 生成了多少练习内容，而是通过用户自己的错误数据，让学习内容更有针对性。",
  "Grammar Repair · From your own recent mistake": "Grammar Repair · 来自你最近的真实错误",
  "Even after understanding AI's correction, I could still make the same mistake again later.": "即使理解了 AI 的纠正反馈，之后仍然可能再犯同样的错误。",
  "Added Spaced Review, turning past mistakes into future review tasks.": "加入 Spaced Review，把过去的错误转化成未来的复习任务。",
  "Spaced Review turns every AI correction into an automatic review item.": "Spaced Review 把每一次 AI 纠错自动变成复习清单。",
  "Based on the Leitner system, each mistake gets one of five proficiency levels, mapped to 1/3/7/14/30-day intervals. Marking it as mastered moves it up a level and pushes the next review further out; marking it as not mastered sends it back to level one for practice again the next day.": "参考 Leitner System，把每个错误分成五个熟练等级，对应 1/3/7/14/30 天的复习间隔。标记为掌握就升一级、下次复习时间延长；标记为没掌握就回到第一级，第二天重新练习。",
  "Review timing isn't decided by an LLM — it runs on explicit rule-based logic, because this needed to be stable, predictable, and explainable.": "复习时间不是由 LLM 决定的，而是用明确的规则逻辑——因为这里需要的是一个稳定、可预测、可解释的机制。",
  "The most important part of this design is turning a one-time AI correction into a learning process that keeps getting tracked and reviewed.": "我觉得这个设计最重要的地方是，把一次性的 AI 纠错，转化成一个能够持续跟踪和复习的学习过程。",
  "Spaced Review · Recall quiz, due today": "Spaced Review · 复习测验，今日待复习",
  "Synthetic audio and scripted content were convenient, but different from real English conversation.": "合成语音和预设脚本虽然方便，但和真实的英语交流存在差距。",
  "Listening Lab moved to real interviews and videos; Perspective Reads moved from text and synthetic audio to real TED/TEDx talks.": "Listening Lab 逐渐换成真实访谈和视频；Perspective Reads 也从文字、合成语音转向真实 TED/TEDx 演讲。",
  "Learning content should be closer to real speaking pace, habits, and context.": "学习内容应该更贴近真实的语速、表达习惯和使用场景。",
  "A grammatically correct sentence doesn't mean it sounds natural when actually spoken.": "一句话语法正确，不代表说出来的时候自然流畅。",
  "Added transcription to recording practice, and separated grammar feedback from spoken-expression feedback.": "为录音练习加入语音转写，把语法反馈和口语表达反馈分开处理。",
  "Grammatical correctness and real communication ability need to be evaluated separately.": "语言正确性和真实沟通能力，需要分开评估。",
  "Too much daily practice content easily became a learning burden.": "每天的练习内容太多，容易变成学习负担。",
  "Made workplace scenarios and industry reports optional, and designed completion rules around how each module is actually used.": "把职场场景和行业报告这类模块设为可选，并按各模块的实际使用方式设计完成规则。",
  "Daily learning should prioritize whether I can keep it up long-term, not feature count.": "日常学习体验应该优先考虑能不能长期坚持，而不是功能数量。",
  "Without a reliable video transcript, AI couldn't accurately judge whether my retelling matched the source.": "没有可靠的视频转录时，AI 无法准确判断我的复述是否忠于原内容。",
  "Dropped auto-comprehension scoring that lacked sufficient evidence, and replaced it with sourced reference points, with content checked for authenticity.": "放弃依据不足的自动理解评分，改用有来源依据的参考要点，并对内容真实性做核验。",
  "Being technically able to generate an answer doesn't mean the product should treat it as a trustworthy score.": "技术上能生成答案，不代表产品应该把它当作可信的评分结果。",
  "The content pool was too small, causing repeats — plus some videos ran too long, and some sources weren't reliable.": "学习素材数量不够导致重复，部分视频太长，还有来源不可靠的问题。",
  "Expanded the content pool, verified official sources, capped video length, and checked how rotation actually performed.": "扩充内容池、核对官方来源、控制视频时长，并检查实际的轮换效果。",
  "A content system has to balance authenticity, sustainability, and real learning pace all at once.": "内容系统必须同时兼顾真实性、可持续性和用户实际的学习节奏。",

  // 06 · Product thinking
  "07 · Product thinking": "07 · 产品思考",
  "What I paid attention to, beyond the interface.": "我关注的不只是界面，而是每个机制背后的目的和取舍。",
  "Prioritize the real problem": "优先解决真问题",
  "Not a general English app — a tool focused on my real workplace expression gap.": "不是面向所有英语学习需求的通用 App，而是优先解决职场的真实表达问题。",
  "Design the loop, not isolated features": "设计学习闭环，而不是孤立功能",
  "Diagnosis, practice, and review all answer one question: how should past data change what's next.": "诊断、练习、复习，都在回答同一个问题：过去的数据应该如何影响接下来的练习。",
  "Know when to use AI, and when to use rules": "知道什么时候用 AI，什么时候用规则",
  "AI judges language and context; stable, predictable behavior — like review timing — follows fixed rules.": "AI 负责语言和语境判断；像复习间隔这类需要稳定可预测的行为，交给确定性规则。",
  "Balance UX and technical constraints": "平衡体验与技术限制",
  "When a technical limit hit — video embedding, speech recognition — I simplified the task, not added complexity.": "遇到视频内嵌、语音识别这类技术限制时，选择简化任务，而不是堆更多复杂功能。",
  "Build for real usage": "为真实使用而做",
  "I kept checking whether I'd actually use it daily — time needed, friction, repetition, mobile usability.": "持续检查自己是否真的愿意每天使用——练习时长、操作负担、内容是否重复、移动端是否好用。",

  // 07 · Timeline
  "08 · Timeline": "08 · 开发时间线",
  "Three months, in small, verifiable steps.": "三个月，一步步可验证的推进。",
  "Aug 2026 and earlier": "2026 年 8 月及之前",
  "Set the product direction: personal language history, AI error analysis, personalized learning mechanisms.": "围绕个人历史语言记录、AI 错误分析和个性化学习机制，确定产品方向。",
  "Aug 24": "8 月 24 日",
  "Weak Spot Drill, Spaced Review, Sentence Network, and interview training in place; fixed correction-context and listening-accuracy issues.": "完成 Weak Spot Drill、Spaced Review、Sentence Network 和面试训练相关功能；修复纠错上下文和听力内容准确性问题。",
  "Aug 30": "8 月 30 日",
  "Established the Obsidian Journal design system, based on a Stitch visual reference.": "根据 Stitch 视觉参考，建立 Obsidian Journal 设计系统。",
  "Sept 2": "9 月 2 日",
  "Replaced Listening Lab's early material wholesale, moving toward real English videos.": "Listening Lab 整批替换早期素材，转向真实英语视频。",
  "Sept 8": "9 月 8 日",
  "Expanded the listening content pool to 13 items.": "听力内容池扩充至 13 条。",
  "Sept 9": "9 月 9 日",
  "Moved Perspective Reads from text and synthetic audio to real TED/TEDx videos.": "Perspective Reads 从文字及合成语音调整为真实 TED/TEDx 视频。",
  "Sept 16": "9 月 16 日",
  "Noticed listening content repeating — expanded Listening Lab to 21 items.": "发现听力素材循环重复，Listening Lab 扩充至 21 条。",
  "Sept 23 · Content": "9 月 23 日 · 内容",
  "Expanded AI Industry Reports from 8 to 30 articles, and Perspective Reads from 5 to 30 talks.": "AI Industry Reports 从 8 篇扩充至 30 篇；Perspective Reads 从 5 个演讲扩充至 30 个。",
  "Sept 23 · Process": "9 月 23 日 · 流程",
  "Tightened release verification — started checking GitHub commit history directly.": "强化发布验证，开始直接检查 GitHub Commit History。",
  "Sept 25 · Repo": "9 月 25 日 · 仓库",
  "Cleaned up duplicate HTML files, keeping only the live index.html.": "清理仓库中重复的 HTML 文件，只保留线上使用的 index.html。",
  "Sept 25 · Bug": "9 月 25 日 · 问题",
  "Traced an outdated-version display issue to iPad Safari caching.": "排查 iPad Safari 缓存造成的旧版本显示问题。",
  "Sept 29": "9 月 29 日",
  "Replaced 6 listening videos over 30 minutes, to keep real study time realistic.": "更换 6 条超过 30 分钟的听力视频，优化实际学习时长。",
  "Sept 30": "9 月 30 日",
  "Wrote up the full development record — a systematic review of product logic, technical issues, and key decisions.": "整理完整开发记录，系统回顾产品逻辑、技术问题和重要决策。",

  // 08 · AI-native execution
  "09 · AI-native execution": "09 · AI 原生执行",
  "From product definition to shipped, working code.": "从产品定义，到亲手把代码跑起来。",
  "My responsibilities": "我的职责",
  "Product definition": "产品定义",
  "Identify the real problem, target scenarios, and feature priorities.": "识别真实问题、目标场景，定义功能优先级。",
  "Experience & system design": "体验与系统设计",
  "Design learning tasks, error categories, review rules, and the design system.": "设计学习任务、错误分类、复习规则和设计系统。",
  "AI implementation direction": "AI 实现方向",
  "Decide what fits an LLM vs. a fixed rule, and define clear requirements for AI coding.": "判断哪些功能适合 LLM，哪些适合固定规则，为 AI Coding 定义清晰需求。",
  "Testing & iteration": "测试与迭代",
  "Verify on real browsers and devices, trace issues, and keep adjusting.": "在真实浏览器和设备上验证，排查问题并持续调整。",
  "Technical implementation": "技术实现",
  "Frontend — HTML/CSS/JS, single file": "前端 — HTML/CSS/JS 单文件",
  "AI — Anthropic API": "AI — Anthropic API",
  "Learning logic — rules + personal error data": "学习逻辑 — 规则 + 个人错误数据",
  "Voice — browser recording + SpeechRecognition": "语音 — 浏览器录音 + SpeechRecognition",
  "Content — static pool, date rotation, source checks": "内容 — 静态内容池、日期轮换、来源核验",
  "Deployment — GitHub Pages + Cowork Artifact": "部署 — GitHub Pages + Cowork Artifact",
  "Cross-device — sync code": "跨设备 — 同步密语",
  "Data storage — local by default (localStorage, key growthDaily_v1), cleared with cache; synced to Supabase only with a sync passcode": "数据存储 — 默认只存在本机浏览器 localStorage（growthDaily_v1），清缓存即丢失；填了同步口令才会同步到 Supabase",
  "Real engineering challenges": "真实工程挑战",
  "API integration": "API 集成",
  "Handled Anthropic API key workspace misconfiguration and mobile key-entry friction.": "处理 Anthropic API Key workspace 配置错误，以及移动端 API Key 输入体验问题。",
  "Browser compatibility": "浏览器兼容性",
  "iOS Safari interaction issues, and the real limits of browser speech recognition.": "iOS Safari 的交互问题，以及浏览器语音识别功能的真实兼容性限制。",
  "Updated learning content still appeared duplicated on iPad Safari — traced to browser caching, not a failed deploy.": "更新后的学习内容在 iPad Safari 上仍显示重复——排查后是浏览器缓存问题，不是部署没生效。",
  "Content validation": "内容校验",
  "Checked real video sources, length, and repetition to avoid unreliable material.": "核查真实视频来源、时长和内容重复，避免不可靠的学习素材。",
  "AI accelerated implementation, but product judgment, prioritization, and validation remained my responsibility.": "AI 加速了实现，但产品判断、优先级排序和验证，始终是我的责任。",

  // 09 · Takeaway
  "10 · Takeaway": "10 · 总结",
  "The value of AI isn't just generating more content — it's making past information useful for future decisions.": "AI 的价值，不只是生成更多内容，而是让过去的信息，为未来的决策和行动创造价值。",
  "Not just an English app, or a demo of how fast AI can generate an interface — but connecting personal history, AI feedback, and real application, and personally driving it from idea to a working, improvable system.": "这不只是一个英语学习 App，也不是展示 AI 能多快生成界面——而是把个人历史、AI 反馈和真实应用连接起来，并亲自把它从想法推进到一个可以运行、持续改进的系统。",
  "Product judgment": "产品判断力",
  "Systems thinking": "系统思维",
  "Personal product experiment. Primarily validated through personal use.": "个人产品实验，目前主要通过个人使用来验证。",
  "Open Growth Daily": "打开 Growth Daily",
  "Growth Daily · Everyday practice, nine cards": "Growth Daily · 每日练习，九张卡片",
};
function translate(lang: Lang, s: string) {
  return lang === "zh" ? ZH[s] ?? s : s;
}
function useT() {
  const lang = useContext(LangContext);
  return (s: string) => translate(lang, s);
}

// ── Speaker notes (Chinese) ──────────────────────────────────────────────────
const NOTES: { secs: number; text: string[] }[] = [
  { secs: 45, text: [
    "Growth Daily 是我最近自己通过 AI Coding 设计和开发的一个个性化英语学习工具，不是商业产品，是为了准备新加坡的 AI/PM 面试，我自己每天在用的实验。",
    "它的结构我按自己写的完整项目回顾来讲：先说问题怎么发现的，再讲产品理念和架构，然后是几次关键迭代、我的产品思考、开发时间线，最后是我在这个项目里具体承担的 AI 原生执行工作。",
  ] },
  { secs: 40, text: [
    "我之前试过不少英语学习产品，包括多邻国——游戏化做得很好，但还是很难长期坚持。真正的问题不是内容不够丰富，而是内容和我真实需要用英语的场景之间始终有距离。",
    "具体来说有四类问题：知识不等于应用、错误会反复出现、内容太泛化没用上我自己的真实表达、还有缺少主动提取记忆的训练。所以我想：能不能让我自己真实犯过的错误，而不是预设课程，来决定接下来该练什么？这就是 Growth Daily 的出发点。",
  ] },
  { secs: 45, text: [
    "这一页讲产品理念。传统学习通常是预设课程→练习→纠正，是一条到头就结束的路；我想建立的是真实表达→错误诊断→个性化练习→间隔复习→重新应用，是一个会反过来影响下一轮练习的循环。",
    "这个循环背后是三个学习机制：主动提取练习——不是看答案，而是自己重新组织表达；间隔重复——掌握程度决定下次复习的时间；情境学习——练习内容来自真实职场场景，不是固定教材。",
  ] },
  { secs: 110, text: [
    "产品架构我分成四层，Today 页面九张卡片就是按这四层组织的。A 层是个人诊断，Weak Spot Drill，识别我真实表达里反复出现的问题——动词形式、冠词、介词、主谓一致这些，不是泛泛的语法练习。",
    "B 层是个性化训练，三张卡片。Grammar Repair 最近改过——现在优先从我自己真实犯过的错里选题：只要我用过批改功能、AI 真挑出过错句，这些错句就会按最近犯的错优先排队，每天轮一条；新用户还没攒够真实错题时才退回固定题库保底，两种情况卡片上会标出来。Sentence Network 是攒一批句子开头的固定用法，分两层轮换——大类每天换，8 天一轮，但同一大类下的具体内容要轮满整整一圈、也就是 16 天才真正换一次，既保证新鲜感又不会太快重复。Speaking Gym 是限时口语小练习，7 种类型，按天轮流。",
    "C 层是巩固与进展，Spaced Review 这张卡片比较特殊，完全没有固定题库，100% 来自我自己过去的批改记录。核心是莱特纳盒子机制：AI 每挑出一个错误，就给它分配一个 1 到 5 级的熟练度，1 级第二天就再考，5 级隔 30 天；我自己判断记住了就升一级、没记住直接打回 1 级明天再考。这个复习节奏我特意设计成规则化的，不让 AI 来决定间隔。",
    "D 层是真实场景应用，Listening Lab 用的是真实语速的创投播客片段，不是为学习特意录的慢速材料，练的是真实语速下抓重点再复述的能力；Workplace Scenarios 和 AI Industry Reports 标记为可选；Mock Interview Log 是最完整的一张，把我真实的项目故事和面试题自动拼成一段指令，我自己拿去跟支持语音对话的 AI App 做 30 分钟真人式对答，App 本身不负责语音，只负责把指令准备好。",
  ] },
  { secs: 40, text: [
    "这一页我想专门讲清楚\"个性化\"这三个字——九张卡片不是用同一套逻辑个性化的，我分成了四类。第一类是来自我真实的错误历史，Weak Spot Drill、Grammar Repair、Spaced Review 这三张，选题和复习节奏都来自我自己的 AI 批改记录。第二类是来自我真实的背景，Core Answers Drill 和 Mock Interview Log，内容本身就是我自己的真实经历，不是通用模板。",
    "第三类是来自表达方式本身——只要是录音回答，AI 会额外给一段\"听起来怎么样\"的反馈，纯打字的卡片就没有，因为不存在\"听起来\"这回事。第四类我想特别说清楚：Listening Lab、Sentence Network、Speaking Gym 这些，其实是对所有人展示一样的内容，只是按第几天轮换，目的是避免重复，不是真正意义上的个性化——这一点我觉得诚实地区分出来，比笼统地说\"全部都是个性化\"更重要。",
  ] },
  { secs: 50, text: [
    "Growth Daily 不是一次做完的，这一页我挑几个比较有代表性的迭代来讲。比如最早 Grammar Repair 用的是固定语法题库，后来发现题库里的问题未必是我真正该练的，就改成优先用我自己真实的错误记录。",
    "再比如 Listening Lab，最初想让 AI 根据我的复述打分，但当时没法可靠核实完整的源视频内容——如果 AI 根据不完整信息判断我复述得对不对，反而可能给出误导性的反馈，所以我放弃了没有依据的评分，改成先复述、再给参考要点。",
    "还有最近一次，是内容系统本身的严谨度问题：内容池太小会重复，我扩充内容、核实来源、控制时长，但也如实说明——比如 Listening Lab 扩到 21 条，离我自己定的 30 天不重复的目标还有差距，这个我没有隐瞒。",
  ] },
  { secs: 35, text: [
    "这一页是我在这个项目里真正关注的几个产品判断原则：优先解决真问题，而不是做一个大而全的学习 App；把诊断、练习、复习设计成一个闭环，而不是几个孤立功能；清楚什么时候该用 AI、什么时候该用确定性规则；遇到技术限制时选择简化任务；最后也是最重要的——持续检查自己是否真的愿意每天用它。",
  ] },
  { secs: 25, text: [
    "这是过去三个月的开发时间线，从 8 月的产品方向确定，到逐步替换真实素材、扩充内容池、强化发布验证，一直到 9 月底整理完整的开发记录。我不细讲每一条，主要想说明这是一个持续三个月、一步步验证推进的过程，不是一次性完成的。",
  ] },
  { secs: 45, text: [
    "这一页讲我在项目里具体做了什么。产品定义、体验与系统设计、AI 实现方向的判断、测试与迭代，这四块都是我自己负责的；技术实现上前端是单文件的 HTML/CSS/JS，AI 用 Anthropic API，复习逻辑是规则化的。",
    "举一个真实的工程问题：有一次代码和内容都更新了，但 iPad Safari 上还是显示旧版本、内容重复，排查后发现是浏览器缓存的问题，不是部署没生效。这提醒我，代码部署成功，不代表用户真的看到了最新版本。AI 确实加速了实现，但产品判断、优先级排序和验证，始终是我自己的责任。",
  ] },
  { secs: 35, text: [
    "最后总结：Growth Daily 对我最大的意义，不是做了一个英语学习 App，也不是展示 AI Coding 能多快生成界面，而是把个人历史、AI 反馈和真实应用连接起来，并亲自把它从想法推进到一个可以运行、持续改进的系统。",
    "我相信 AI 的价值，不只是生成更多内容，而是让过去的信息，为未来的决策和行动创造价值。Growth Daily 目前还是一个个人产品实验，主要靠我自己每天用来验证，这点我想说清楚。",
  ] },
];

// ── Shared primitives (page-scoped) ─────────────────────────────────────────
const FRAME = "absolute inset-0 flex flex-col px-[144px] pb-[108px] pt-[88px]";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="self-start whitespace-nowrap text-[14px] font-medium tracking-[0.01em]" style={{ color: MUTED }}>
      {children}
    </p>
  );
}
function Eyebrow({ children, color = MUTED }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[13px] font-medium tracking-[0.01em]" style={{ color }}>
      {children}
    </p>
  );
}
const SLIDE_HEADLINE = "mt-3 [text-wrap:balance] text-[38px] font-semibold leading-[1.08] tracking-[-0.022em]";

// One bold, left-bordered line that states a slide's central conclusion —
// used wherever a slide closes its main argument in a single sentence.
function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 pl-5 text-[16px] font-semibold leading-[1.45] [text-wrap:balance]" style={{ color: INK, borderColor: INK }}>
      {children}
    </p>
  );
}

// Compact outlined chip — used for feature/tech-stack names that don't need an arrow flow.
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-3 py-[5px] text-[13px] font-medium leading-none" style={{ borderColor: LINE, color: INK }}>
      {children}
    </span>
  );
}

// Shared enumeration mark — a numbered or lettered badge used wherever a slide
// lists discrete items (problems, principles, iterations, steps), so ordered
// content reads the same way across the whole deck.
function NumberBadge({ children, active = true, size = "md" }: { children: React.ReactNode; active?: boolean; size?: "md" | "sm" }) {
  return (
    <span
      className={
        size === "sm"
          ? "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold tabular-nums"
          : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold tabular-nums"
      }
      style={{ borderColor: active ? INK : LINE, color: active ? INK : MUTED }}
    >
      {children}
    </span>
  );
}

// Visualizes a before → after transformation as two pills instead of a plain
// arrow sentence — used wherever the deck states "X became Y".
function BeforeAfter({ before, after, size = "md", active = true }: { before: string; after: string; size?: "md" | "sm"; active?: boolean }) {
  const t = useT();
  const compact = size === "sm";
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        className={compact ? "min-w-0 truncate rounded-full px-2.5 py-1 text-[12px] font-medium" : "rounded-full px-4 py-[7px] text-[15px] font-medium [text-wrap:balance]"}
        style={{ background: active ? WARM : "transparent", color: MUTED }}
      >
        {t(before)}
      </span>
      <span className="shrink-0" style={{ color: MUTED, fontSize: compact ? 11 : 15 }}>→</span>
      <span
        className={compact ? "min-w-0 truncate rounded-full px-2.5 py-1 text-[12px] font-semibold" : "rounded-full px-4 py-[7px] text-[15px] font-semibold [text-wrap:balance]"}
        style={active ? { background: INK, color: "#fff" } : { background: "transparent", border: `1px solid ${LINE}`, color: BODY }}
      >
        {t(after)}
      </span>
    </div>
  );
}

// Small geometric marks for Slide06's principles — each sketches the actual
// mechanism the principle describes (focus, a loop, a binary choice, a
// trade-off, repeated use), built from the same primitives as the deck's
// other diagrams rather than a borrowed icon set.
function PrincipleGlyph({ kind }: { kind: 0 | 1 | 2 | 3 | 4 }) {
  const box = "relative flex h-[26px] w-[26px] shrink-0 items-center justify-center";
  if (kind === 0) {
    return (
      <div className={box}>
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: INK }} />
        <div className="h-[8px] w-[8px] rounded-full" style={{ background: INK }} />
      </div>
    );
  }
  if (kind === 1) {
    return (
      <div className={box}>
        <div className="absolute inset-0 rounded-full border-[1.6px] border-dashed" style={{ borderColor: INK }} />
      </div>
    );
  }
  if (kind === 2) {
    return (
      <div className={box}>
        <div className="flex items-center gap-[3px]">
          <div className="h-[11px] w-[11px] rounded-full" style={{ background: INK }} />
          <div className="h-px w-[7px]" style={{ background: MUTED }} />
          <div className="h-[11px] w-[11px] rounded-full border" style={{ borderColor: INK }} />
        </div>
      </div>
    );
  }
  if (kind === 3) {
    return (
      <div className={`${box} items-end gap-[3px]`}>
        <div className="w-[5px] rounded-t-[1.5px]" style={{ height: 10, background: MUTED }} />
        <div className="w-[5px] rounded-t-[1.5px]" style={{ height: 22, background: INK }} />
        <div className="w-[5px] rounded-t-[1.5px]" style={{ height: 15, background: MUTED }} />
      </div>
    );
  }
  return (
    <div className={`${box} gap-[3px]`}>
      {[0.3, 0.55, 0.8, 1].map((o, i) => (
        <div key={i} className="h-[7px] w-[7px] rounded-full" style={{ background: INK, opacity: o }} />
      ))}
    </div>
  );
}

// Review-interval ladder: dots are placed proportionally on a 1→30 day axis, so the
// widening gaps are the point.
function IntervalLadder({ days, unit }: { days: number[]; unit: string }) {
  const max = days[days.length - 1];
  const min = days[0];
  return (
    <div className="relative h-[34px]">
      <div className="absolute left-0 right-0 top-[7px] h-px" style={{ background: LINE }} />
      {days.map((d, i) => {
        const left = ((d - min) / (max - min)) * 100;
        const last = i === days.length - 1;
        return (
          <div key={d} className="absolute top-0" style={{ left: `${left}%`, transform: last ? "translateX(-100%)" : i === 0 ? "none" : "translateX(-50%)" }}>
            <div className={`h-[14px] w-[14px] rounded-full ${last ? "ml-auto" : i === 0 ? "" : "mx-auto"}`} style={{ background: INK, opacity: 0.25 + (i / (days.length - 1)) * 0.75 }} />
            <p className="mt-[3px] whitespace-nowrap text-[12px] font-medium leading-none" style={{ color: MUTED }}>{d}{last ? ` ${unit}` : ""}</p>
          </div>
        );
      })}
    </div>
  );
}

// Conventional (one-way, ends) vs. Growth Daily (loops back into itself) —
// a generic two-pipeline contrast, reused wherever the deck states this shift.
function ContrastDiagram({
  leftLabel, leftSteps, rightLabel, rightSteps,
}: { leftLabel: string; leftSteps: string[]; rightLabel: string; rightSteps: string[] }) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-1 flex-col gap-3 rounded-[24px] p-7" style={{ background: WARM }}>
        <Eyebrow>{leftLabel}</Eyebrow>
        <div className="w-fit">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px] font-medium" style={{ color: BODY }}>
            {leftSteps.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: MUTED }}>→</span>}
                <span>{s}</span>
              </span>
            ))}
          </div>
          {/* one-way: the path simply ends */}
          <div className="relative mx-6 mt-3 h-4">
            <div className="absolute left-0 right-0 top-[8px] h-px" style={{ background: "rgba(0,0,0,0.25)" }} />
            <div className="absolute right-0 top-[3px] h-[11px] w-px" style={{ background: "rgba(0,0,0,0.45)" }} />
          </div>
        </div>
      </div>
      <div className="flex flex-[1.8] flex-col gap-3 rounded-[24px] p-7" style={{ background: INK }}>
        <Eyebrow color="rgba(255,255,255,0.6)">{rightLabel}</Eyebrow>
        <div className="w-fit">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-semibold" style={{ color: "#fff" }}>
            {rightSteps.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.4)" }}>→</span>}
                <span>{s}</span>
              </span>
            ))}
          </div>
          {/* return path: the last step feeds back into the first */}
          <div className="relative mx-6 mt-3 h-4 rounded-b-[10px] border-b border-l border-r" style={{ borderColor: "rgba(255,255,255,0.35)" }}>
            <span className="absolute -left-[5px] -top-[7px] text-[11px] leading-none" style={{ color: "rgba(255,255,255,0.55)" }}>▲</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({
  shot, width, onOpen, group,
}: { shot: Shot; width: number; onOpen: OpenLightbox; group?: Shot[] }) {
  const items = group ?? [shot];
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onOpen(items, Math.max(0, items.indexOf(shot))); }}
      aria-label={`Enlarge: ${shot.alt}`}
      className="block shrink-0 cursor-zoom-in overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      style={{ width, background: "#0a0a0a", boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 30px 60px -30px rgba(0,0,0,0.35)" }}
    >
      <img src={shot.src} alt={shot.alt} className="block h-auto w-full" draggable={false} />
    </button>
  );
}

// ── Project navigation (shared pattern with /seedflow-presentation) ────────
const PROJECTS: { name: string; href?: string }[] = [
  { name: "SeedFlow", href: "/seedflow-presentation" },
  { name: "Shopee AI Chatbot Builder", href: "/seedflow-presentation" },
  { name: "AI Mascot Platform", href: "/seedflow-presentation" },
  { name: "Growth Daily" },
];

// ── Slide 01 · Context ───────────────────────────────────────────────────────
const HERO_LIGHT: Shot = { src: `${IMG}/gd-cover-light.webp`, alt: "Growth Daily launch screen, light mode — streak, day count, and a daily quote", caption: "Growth Daily · Launch screen (light)" };
const HERO_DARK: Shot = { src: `${IMG}/gd-cover-dark.webp`, alt: "Growth Daily launch screen, dark mode — streak, day count, and a daily quote", caption: "Growth Daily · Launch screen (dark)" };

function Slide01({ onOpen }: { onOpen: OpenLightbox }) {
  const t = useT();
  const meta = [
    { k: t("Role"), v: t("Independent Product Designer & Builder") },
    { k: t("Type"), v: t("Personal AI product experiment") },
    { k: t("Year"), v: t("2026") },
  ];
  return (
    <div className="absolute inset-0 flex">
      <div className="flex w-[820px] flex-col justify-between pb-[112px] pl-[144px] pr-[72px] pt-[88px]">
        <Tag>{t("01 · Context")}</Tag>
        <div className="flex flex-col">
          <h1 className="text-[88px] font-semibold leading-[0.95] tracking-[-0.04em]" style={{ color: INK }}>Growth Daily</h1>
          <p className="mt-9 text-[27px] font-semibold leading-[1.2] tracking-[-0.018em] [text-wrap:balance]" style={{ color: INK }}>
            {t("Turning real language mistakes into personal learning.")}
          </p>
          <p className="mt-6 text-[17px] leading-[1.5]" style={{ color: BODY }}>
            {t("An AI-assisted learning experiment I independently designed, built, and iterated.")}
          </p>
        </div>
        <div className="flex gap-12">
          {meta.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-[6px]">
              <Eyebrow>{k}</Eyebrow>
              <p className="text-[16px] leading-[1.35]" style={{ color: INK }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center gap-6 overflow-hidden"
        style={{ background: "radial-gradient(120% 90% at 50% 42%, #ffffff 0%, #f5f5f7 58%, #ececf0 100%)" }}
      >
        <PhoneFrame shot={HERO_LIGHT} width={220} onOpen={onOpen} group={[HERO_LIGHT, HERO_DARK]} />
        <PhoneFrame shot={HERO_DARK} width={220} onOpen={onOpen} group={[HERO_LIGHT, HERO_DARK]} />
      </div>
    </div>
  );
}

// ── Slide 02 · Problem discovery ─────────────────────────────────────────────
function Slide02() {
  const t = useT();
  const problems = [
    { title: t("Knowledge ≠ application"), desc: t("Understanding a grammar point doesn't mean I can use it fluently in a real conversation.") },
    { title: t("Repeated mistakes"), desc: t("AI corrects the mistake, but without reinforcement, the same mistake comes back.") },
    { title: t("Generic learning"), desc: t("Most tools offer a preset curriculum, without using what I've actually said or written.") },
    { title: t("Lack of active recall"), desc: t("It's easy to rely on seeing the right answer, instead of retrieving an expression from memory myself.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("02 · Problem discovery")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Being corrected once doesn't mean you've actually learned it.")}
      </h2>
      <div className="mt-8 flex flex-1 min-h-0 items-stretch gap-16">
        <div className="flex w-[460px] shrink-0 flex-col justify-center gap-7">
          <p className="text-[14px] leading-[1.6] [text-wrap:pretty]" style={{ color: MUTED }}>
            {t("I've tried many learning apps, including Duolingo — its gamification is excellent, but I still couldn't stick with it.")}
          </p>

          <div className="flex flex-col">
            <div className="flex items-baseline justify-between gap-6 py-3.5">
              <Eyebrow>{t("What I practiced")}</Eyebrow>
              <p className="text-right text-[16px] font-medium" style={{ color: MUTED }}>
                {t("Gamified drills, a preset curriculum")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: LINE }} />
              <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                {t("a persistent gap")}
              </span>
              <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: LINE }} />
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t py-3.5" style={{ borderColor: LINE }}>
              <Eyebrow color={INK}>{t("What I actually use")}</Eyebrow>
              <p className="text-right text-[16px] font-semibold" style={{ color: INK }}>
                {t("ChatGPT, meetings, daily conversation")}
              </p>
            </div>
          </div>

          <p className="text-[16px] font-semibold leading-[1.45] [text-wrap:balance]" style={{ color: INK }}>
            {t("I could communicate in English, but kept repeating similar grammar mistakes — even after understanding the AI's correction.")}
          </p>

          <Takeaway>{t("Could my own real mistakes — not a preset curriculum — decide what to practice next?")}</Takeaway>
        </div>
        <div className="flex-1 self-stretch border-l pl-16" style={{ borderColor: LINE }}>
          <div className="grid h-full grid-cols-2 content-center">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className="flex flex-col gap-2.5 py-6"
                style={{
                  borderRight: i % 2 === 0 ? `1px solid ${LINE}` : undefined,
                  borderBottom: i < 2 ? `1px solid ${LINE}` : undefined,
                  paddingRight: i % 2 === 0 ? 36 : 0,
                  paddingLeft: i % 2 === 1 ? 36 : 0,
                }}
              >
                <NumberBadge>0{i + 1}</NumberBadge>
                <p className="text-[16px] font-semibold leading-[1.3] [text-wrap:balance]" style={{ color: INK }}>{p.title}</p>
                <p className="text-[13px] leading-[1.55]" style={{ color: BODY }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 03 · Product vision ────────────────────────────────────────────────
function Slide03() {
  const t = useT();
  const mechanisms = [
    { name: "Retrieval Practice", desc: t("Active recall — not re-reading the right answer, but actively recalling and re-producing the expression myself.") },
    { name: "Spaced Repetition", desc: t("How well I remember something decides when I review it again — weak points come back sooner, mastered ones get more space.") },
    { name: "Contextual Learning", desc: t("Practice content comes from real work scenarios and real communication needs, not just a fixed textbook.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("03 · Product vision")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("From passive learning to personalized, active practice.")}
      </h2>
      <div className="mt-9 flex flex-1 flex-col min-h-0 justify-center gap-10">
        <ContrastDiagram
          leftLabel={t("Conventional learning")}
          leftSteps={[t("Predefined curriculum"), t("Practice"), t("Correction")]}
          rightLabel={t("Growth Daily")}
          rightSteps={[t("Real-life expression"), t("Error diagnosis"), t("Personalized practice"), t("Spaced review"), t("Re-application")]}
        />
        <div className="grid grid-cols-3 gap-8">
          {mechanisms.map((m) => (
            <div key={m.name} className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: LINE }}>
              <Eyebrow color={INK}>{m.name}</Eyebrow>
              <p className="text-[14px] leading-[1.55]" style={{ color: BODY }}>{m.desc}</p>
            </div>
          ))}
        </div>
        <Takeaway>{t("Not a static question bank — a system where real performance keeps shaping what to practice next.")}</Takeaway>
      </div>
    </div>
  );
}

// ── Slide 04 · Product architecture ──────────────────────────────────────────
function Slide04() {
  const t = useT();
  const layers: { key: string; label: string; chips: string[]; desc: string; grow: number; ladder?: boolean }[] = [
    {
      key: "A",
      label: t("A · Personal diagnosis"),
      chips: ["Weak Spot Drill"],
      desc: t("Finds recurring issues in my real expression — verb forms, articles, prepositions, agreement, phrasing."),
      grow: 0.85,
    },
    {
      key: "B",
      label: t("B · Personalized training"),
      chips: ["Grammar Repair", "Sentence Network", "Speaking Gym"],
      desc: t("Rewrite real mistakes into better sentences, then get AI feedback on grammar and expression."),
      grow: 1.25,
    },
    {
      key: "C",
      label: t("C · Retention & progress"),
      chips: ["Spaced Review"],
      desc: t("Five rule-based review intervals — 1 / 3 / 7 / 14 / 30 days — modeled on the Leitner system, not AI-tuned."),
      grow: 1.05,
      ladder: true,
    },
    {
      key: "D",
      label: t("D · Real-world application"),
      chips: ["Listening Lab", "Workplace Scenarios", "AI Industry Reports", "Perspective Reads", "Mock Interview Log"],
      desc: t("Real interviews, workplace discussion, industry reports, and TED talks — not synthetic scripts."),
      grow: 1.25,
    },
  ];

  return (
    <div className={FRAME}>
      <Tag>{t("04 · Product architecture")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("One learning experience, four layers.")}
      </h2>

      <div className="mt-9 flex flex-1 min-h-0 flex-col justify-center gap-10">
        <div className="flex items-stretch gap-3">
          {layers.map((l, i) => (
            <Fragment key={l.key}>
              {i > 0 && (
                <div className="flex shrink-0 self-center text-[16px]" style={{ color: MUTED }}>→</div>
              )}
              <div
                className="flex flex-col gap-4 rounded-[24px] p-7"
                style={{ background: WARM, flexGrow: l.grow, flexBasis: 0 }}
              >
                <Eyebrow color={INK}>{l.label}</Eyebrow>
                <div className="flex min-h-[46px] flex-wrap items-start gap-1.5">
                  {l.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                </div>
                <p className="text-[13px] leading-[1.6]" style={{ color: BODY }}>{l.desc}</p>
                {l.ladder && (
                  <div className="mt-1">
                    <IntervalLadder days={[1, 3, 7, 14, 30]} unit="d" />
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>
        <Takeaway>{t("Each layer answers one question: what to fix, how to practice, when to review, where to apply it.")}</Takeaway>
      </div>
    </div>
  );
}

// ── Slide 05 · Personalization ───────────────────────────────────────────────
function SlidePersonalization() {
  const t = useT();
  const groups = [
    {
      title: t("From your mistake history"),
      desc: t("Selects and paces content from your own AI-correction history, not a preset bank."),
      chips: ["Weak Spot Drill", "Grammar Repair", "Spaced Review"],
    },
    {
      title: t("From your real background"),
      desc: t("Content is your own work history and project stories — editable in Library, not a generic template."),
      chips: ["Core Answers Drill", "Mock Interview Log"],
    },
    {
      title: t("From how you express it"),
      desc: t("A recorded answer gets extra feedback on how it sounded — filler words, pacing, naturalness; a typed one doesn't, because there's nothing to listen to."),
      chips: ["Voice recordings, any card"],
    },
    {
      title: t("Rotated by day, not by you"),
      desc: t("Shows the same content to everyone, just rotated by day — that's variety, not personalization."),
      chips: ["Listening Lab", "Sentence Network", "Speaking Gym", "Workplace Scenarios", "AI Industry Reports"],
    },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("05 · Personalization")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Same word, four different logics.")}
      </h2>
      <p className="mt-3 text-[14px] font-medium" style={{ color: MUTED }}>
        {t("Today's nine cards don't personalize the same way — some adapt to you, some just rotate.")}
      </p>
      <div className="mt-8 flex flex-1 min-h-0 flex-col justify-center gap-10">
        <div className="grid grid-cols-2">
          {groups.map((g, i) => (
            <div
              key={g.title}
              className="flex flex-col gap-3 py-7"
              style={{
                borderRight: i % 2 === 0 ? `1px solid ${LINE}` : undefined,
                borderBottom: i < 2 ? `1px solid ${LINE}` : undefined,
                paddingRight: i % 2 === 0 ? 56 : 0,
                paddingLeft: i % 2 === 1 ? 56 : 0,
              }}
            >
              <NumberBadge>0{i + 1}</NumberBadge>
              <p className="text-[16px] font-semibold leading-[1.3] [text-wrap:balance]" style={{ color: INK }}>{g.title}</p>
              <p className="text-[13px] leading-[1.55]" style={{ color: BODY }}>{g.desc}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {g.chips.map((c) => <Chip key={c}>{c}</Chip>)}
              </div>
            </div>
          ))}
        </div>
        <Takeaway>{t("Not everything labeled \"personalized\" is personalized to you — some of it is just a rotation rule for variety.")}</Takeaway>
      </div>
    </div>
  );
}

// ── Slide 06 · Key iterations ────────────────────────────────────────────────
const ITERATIONS: { title: string; before: string; after: string; line: string; problem: string; adjustment: string | string[]; judgment: string; shot?: Shot; link?: string }[] = [
  {
    title: "Synthetic content → real-world learning",
    before: "Synthetic content", after: "Real-world learning",
    line: "Scripted audio felt different from real speech, so listening and talks moved to real interviews and TED videos.",
    problem: "Synthetic audio and scripted content were convenient, but different from real English conversation.",
    adjustment: "Listening Lab moved to real interviews and videos; Perspective Reads moved from text and synthetic audio to real TED/TEDx talks.",
    judgment: "Learning content should be closer to real speaking pace, habits, and context.",
  },
  {
    title: "Grammar accuracy → speaking quality",
    before: "Grammar accuracy", after: "Speaking quality",
    line: "A grammatically correct sentence can still sound unnatural spoken aloud, so recordings get their own feedback.",
    problem: "A grammatically correct sentence doesn't mean it sounds natural when actually spoken.",
    adjustment: "Added transcription to recording practice, and separated grammar feedback from spoken-expression feedback.",
    judgment: "Grammatical correctness and real communication ability need to be evaluated separately.",
  },
  {
    title: "Generic exercises → personal mistakes",
    before: "Generic exercises", after: "Personal mistakes",
    line: "A fixed grammar bank didn't match what I actually got wrong — practice now starts from my real mistakes.",
    problem: "Grammar Repair started on a fixed question bank, but generic exercises didn't necessarily fix the mistakes I actually kept making.",
    adjustment: [
      "Now, once \"Check my answers with AI\" returns correction feedback, the system collects that real mistake and turns it into a future Grammar Repair exercise — prioritized by how recently it happened.",
      "I see the reason for the mistake and a more natural phrasing, then have to write three of my own sentences to actually apply it.",
      "For a new user with no error history yet, it falls back to the fixed question bank so the experience is never empty.",
    ],
    judgment: "The point isn't how much practice content AI can generate — it's using the user's own mistake data to make that content targeted.",
    shot: { src: `${IMG}/gd4-grammar-repair.webp`, alt: "Grammar Repair task built from the user's own recent mistake, with a repair-and-practice prompt", caption: "Grammar Repair · From your own recent mistake" },
  },
  {
    title: "One-time correction → continuous learning",
    before: "One-time correction", after: "Continuous learning",
    line: "Understanding a correction once wasn't enough, so Spaced Review turns past mistakes into future practice.",
    problem: "Even after understanding AI's correction, I could still make the same mistake again later.",
    adjustment: [
      "Spaced Review turns every AI correction into an automatic review item.",
      "Based on the Leitner system, each mistake gets one of five proficiency levels, mapped to 1/3/7/14/30-day intervals. Marking it as mastered moves it up a level and pushes the next review further out; marking it as not mastered sends it back to level one for practice again the next day.",
      "Review timing isn't decided by an LLM — it runs on explicit rule-based logic, because this needed to be stable, predictable, and explainable.",
    ],
    judgment: "The most important part of this design is turning a one-time AI correction into a learning process that keeps getting tracked and reviewed.",
    shot: { src: `${IMG}/gd5-spaced-review.webp`, alt: "Spaced Review recall quiz, items due today pulled from real AI-correction history", caption: "Spaced Review · Recall quiz, due today" },
  },
  {
    title: "More features → sustainable learning",
    before: "More features", after: "Sustainable learning",
    line: "Too much daily content became a burden, so some modules became optional, built around realistic completion.",
    problem: "Too much daily practice content easily became a learning burden.",
    adjustment: "Made workplace scenarios and industry reports optional, and designed completion rules around how each module is actually used.",
    judgment: "Daily learning should prioritize whether I can keep it up long-term, not feature count.",
  },
  {
    title: "Content quantity → content quality",
    before: "Content quantity", after: "Content quality",
    line: "The content pool was too small and repeated, so I expanded it, verified sources, capped length — and reported honestly where it still fell short.",
    problem: "The content pool was too small, causing repeats — plus some videos ran too long, and some sources weren't reliable.",
    adjustment: "Expanded the content pool, verified official sources, capped video length, and checked how rotation actually performed.",
    judgment: "A content system has to balance authenticity, sustainability, and real learning pace all at once.",
  },
  {
    title: "AI-generated answers → trustworthy content",
    before: "AI-generated answers", after: "Trustworthy content",
    line: "Without a verified transcript, AI couldn't fairly judge my retelling — scoring was replaced with sourced reference points.",
    problem: "Without a reliable video transcript, AI couldn't accurately judge whether my retelling matched the source.",
    adjustment: "Dropped auto-comprehension scoring that lacked sufficient evidence, and replaced it with sourced reference points, with content checked for authenticity.",
    judgment: "Being technically able to generate an answer doesn't mean the product should treat it as a trustworthy score.",
    link: "https://career-builder-theta.vercel.app/for-you",
  },
];

function Slide05({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const t = useT();
  const item = ITERATIONS[active];
  return (
    <div className={FRAME}>
      <Tag>{t("06 · Key iterations")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Growth Daily wasn't built once — it kept changing as I actually used it.")}
      </h2>
      <p className="mt-3 text-[14px] font-medium" style={{ color: MUTED }}>{t("Select an iteration to see the problem, the adjustment, and the judgment behind it.")}</p>
      <div className="mt-7 flex flex-1 min-h-0 items-center gap-14">
        <div className="flex w-[420px] shrink-0 flex-col gap-1.5">
          {ITERATIONS.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.title}
                type="button"
                onClick={() => onSelect(i)}
                className="flex items-center gap-3 rounded-[12px] py-2 pl-4 pr-3 text-left transition-colors duration-150"
                style={{ background: isActive ? WARM : "transparent" }}
              >
                <NumberBadge size="sm" active={isActive}>0{i + 1}</NumberBadge>
                <BeforeAfter before={it.before} after={it.after} size="sm" active={isActive} />
              </button>
            );
          })}
        </div>
        <div className="flex-1 self-stretch border-l pl-14" style={{ borderColor: LINE }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="flex h-full flex-col justify-center gap-7"
            >
              <div className="flex flex-col gap-3">
                <Eyebrow color={INK}>{t("Iteration")} {active + 1} / {ITERATIONS.length}</Eyebrow>
                <BeforeAfter before={item.before} after={item.after} />
              </div>
              <div className="grid grid-cols-3 gap-8 border-t pt-5" style={{ borderColor: LINE }}>
                <div className="flex flex-col gap-2">
                  <Eyebrow color={INK}>{t("Problem")}</Eyebrow>
                  <p className="text-[13px] leading-[1.6]" style={{ color: BODY }}>{t(item.problem)}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Eyebrow color={INK}>{t("Adjustment")}</Eyebrow>
                  <div className="flex flex-col gap-2.5">
                    {(Array.isArray(item.adjustment) ? item.adjustment : [item.adjustment]).map((para) => (
                      <p key={para} className="text-[13px] leading-[1.6]" style={{ color: BODY }}>{t(para)}</p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Eyebrow color={INK}>{t("Product judgment")}</Eyebrow>
                  <p className="text-[13px] leading-[1.6]" style={{ color: BODY }}>{t(item.judgment)}</p>
                </div>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#0066cc" }}
                >
                  {item.link} ↗
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Slide 06 · Product thinking ──────────────────────────────────────────────
function Slide06() {
  const t = useT();
  const principles = [
    { title: t("Prioritize the real problem"), desc: t("Not a general English app — a tool focused on my real workplace expression gap.") },
    { title: t("Design the loop, not isolated features"), desc: t("Diagnosis, practice, and review all answer one question: how should past data change what's next.") },
    { title: t("Know when to use AI, and when to use rules"), desc: t("AI judges language and context; stable, predictable behavior — like review timing — follows fixed rules.") },
    { title: t("Balance UX and technical constraints"), desc: t("When a technical limit hit — video embedding, speech recognition — I simplified the task, not added complexity.") },
    { title: t("Build for real usage"), desc: t("I kept checking whether I'd actually use it daily — time needed, friction, repetition, mobile usability.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("07 · Product thinking")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("What I paid attention to, beyond the interface.")}
      </h2>
      <div className="mt-9 flex flex-1 flex-col min-h-0 justify-center gap-8">
        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
          {principles.slice(0, 3).map((p, i) => (
            <div key={p.title} className="flex flex-col gap-3">
              <PrincipleGlyph kind={i as 0 | 1 | 2} />
              <p className="text-[16px] font-semibold leading-[1.3] [text-wrap:balance]" style={{ color: INK }}>{p.title}</p>
              <p className="text-[13px] leading-[1.55]" style={{ color: BODY }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: LINE }}>
          {principles.slice(3).map((p, i) => (
            <div key={p.title} className="flex flex-col gap-3">
              <PrincipleGlyph kind={(i + 3) as 3 | 4} />
              <p className="text-[16px] font-semibold leading-[1.3] [text-wrap:balance]" style={{ color: INK }}>{p.title}</p>
              <p className="text-[13px] leading-[1.55]" style={{ color: BODY }}>{p.desc}</p>
            </div>
          ))}
          <div />
        </div>
      </div>
    </div>
  );
}

// ── Slide 07 · Timeline ──────────────────────────────────────────────────────
function Slide07() {
  const t = useT();
  const rows = [
    { date: t("Aug 2026 and earlier"), text: t("Set the product direction: personal language history, AI error analysis, personalized learning mechanisms.") },
    { date: t("Aug 24"), text: t("Weak Spot Drill, Spaced Review, Sentence Network, and interview training in place; fixed correction-context and listening-accuracy issues.") },
    { date: t("Aug 30"), text: t("Established the Obsidian Journal design system, based on a Stitch visual reference.") },
    { date: t("Sept 2"), text: t("Replaced Listening Lab's early material wholesale, moving toward real English videos.") },
    { date: t("Sept 8"), text: t("Expanded the listening content pool to 13 items.") },
    { date: t("Sept 9"), text: t("Moved Perspective Reads from text and synthetic audio to real TED/TEDx videos.") },
    { date: t("Sept 16"), text: t("Noticed listening content repeating — expanded Listening Lab to 21 items.") },
    { date: t("Sept 23 · Content"), text: t("Expanded AI Industry Reports from 8 to 30 articles, and Perspective Reads from 5 to 30 talks.") },
    { date: t("Sept 23 · Process"), text: t("Tightened release verification — started checking GitHub commit history directly.") },
    { date: t("Sept 25 · Repo"), text: t("Cleaned up duplicate HTML files, keeping only the live index.html.") },
    { date: t("Sept 25 · Bug"), text: t("Traced an outdated-version display issue to iPad Safari caching.") },
    { date: t("Sept 29"), text: t("Replaced 6 listening videos over 30 minutes, to keep real study time realistic.") },
    { date: t("Sept 30"), text: t("Wrote up the full development record — a systematic review of product logic, technical issues, and key decisions.") },
  ];
  const mid = Math.ceil(rows.length / 2);
  const cols = [rows.slice(0, mid), rows.slice(mid)];
  return (
    <div className={FRAME}>
      <Tag>{t("08 · Timeline")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Three months, in small, verifiable steps.")}
      </h2>
      <div className="mt-8 grid content-start flex-1 min-h-0 grid-cols-2 gap-x-14">
        {cols.map((col, ci) => (
          <div key={ci} className="relative flex flex-col gap-6">
            <div className="absolute left-[3px] top-[7px] bottom-[7px] w-px" style={{ background: LINE }} />
            {col.map((r) => (
              <div key={r.date} className="relative flex gap-5 pl-6">
                <span className="absolute left-0 top-[6px] h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: INK }} />
                <p className="w-[100px] shrink-0 text-[13px] font-semibold tracking-[0.02em]" style={{ color: MUTED }}>{r.date}</p>
                <p className="text-[13px] leading-[1.6]" style={{ color: BODY }}>{r.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Slide 08 · AI-native execution ───────────────────────────────────────────
function Slide08() {
  const t = useT();
  const responsibilities = [
    { title: t("Product definition"), desc: t("Identify the real problem, target scenarios, and feature priorities.") },
    { title: t("Experience & system design"), desc: t("Design learning tasks, error categories, review rules, and the design system.") },
    { title: t("AI implementation direction"), desc: t("Decide what fits an LLM vs. a fixed rule, and define clear requirements for AI coding.") },
    { title: t("Testing & iteration"), desc: t("Verify on real browsers and devices, trace issues, and keep adjusting.") },
  ];
  const stack = [
    t("Frontend — HTML/CSS/JS, single file"), t("AI — Anthropic API"), t("Learning logic — rules + personal error data"),
    t("Voice — browser recording + SpeechRecognition"), t("Content — static pool, date rotation, source checks"),
    t("Deployment — GitHub Pages + Cowork Artifact"), t("Cross-device — sync code"),
    t("Data storage — local by default (localStorage, key growthDaily_v1), cleared with cache; synced to Supabase only with a sync passcode"),
  ];
  const challenges = [
    { label: t("API integration"), text: t("Handled Anthropic API key workspace misconfiguration and mobile key-entry friction.") },
    { label: t("Browser compatibility"), text: t("iOS Safari interaction issues, and the real limits of browser speech recognition.") + " " + t("Updated learning content still appeared duplicated on iPad Safari — traced to browser caching, not a failed deploy.") },
    { label: t("Content validation"), text: t("Checked real video sources, length, and repetition to avoid unreliable material.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("09 · AI-native execution")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("From product definition to shipped, working code.")}
      </h2>

      <div className="mt-7 flex flex-1 flex-col min-h-0 justify-center gap-10">
        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-5">
            <Eyebrow color={INK}>{t("My responsibilities")}</Eyebrow>
            <div className="relative flex flex-col gap-5">
              <div className="absolute bottom-[11px] left-[11px] top-[11px] w-px" style={{ background: LINE }} />
              {responsibilities.map((r, i) => (
                <div key={r.title} className="relative flex gap-3">
                  <div className="relative z-10 rounded-full bg-white">
                    <NumberBadge size="sm">0{i + 1}</NumberBadge>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold leading-[1.3]" style={{ color: INK }}>{r.title}</p>
                    <p className="mt-0.5 text-[13px] leading-[1.5]" style={{ color: BODY }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 border-l pl-10" style={{ borderColor: LINE }}>
            <Eyebrow color={INK}>{t("Technical implementation")}</Eyebrow>
            <div className="flex flex-col gap-2">
              {stack.map((s) => (
                <p key={s} className="text-[13px] leading-[1.5]" style={{ color: BODY }}>
                  <span style={{ color: INK, fontWeight: 600 }}>{s.split(" — ")[0]}</span>
                  {" — " + s.split(" — ").slice(1).join(" — ")}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 border-l pl-10" style={{ borderColor: LINE }}>
            <Eyebrow color={INK}>{t("Real engineering challenges")}</Eyebrow>
            <div className="flex flex-col gap-4">
              {challenges.map((c) => (
                <div key={c.label} className="flex gap-2.5">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: MUTED }} />
                  <div>
                    <p className="text-[13px] font-semibold leading-[1.3]" style={{ color: INK }}>{c.label}</p>
                    <p className="text-[13px] leading-[1.5]" style={{ color: BODY }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Takeaway>{t("AI accelerated implementation, but product judgment, prioritization, and validation remained my responsibility.")}</Takeaway>
      </div>
    </div>
  );
}

// ── Slide 09 · Takeaway ──────────────────────────────────────────────────────
function Slide09() {
  const t = useT();
  const anchors = [t("Product judgment"), t("Systems thinking"), t("AI-native execution")];
  return (
    <div className={FRAME}>
      <Tag>{t("10 · Takeaway")}</Tag>
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-8 text-center">
        <h2 className="max-w-[860px] [text-wrap:balance] text-[38px] font-semibold leading-[1.16] tracking-[-0.022em]" style={{ color: INK }}>
          {t("The value of AI isn't just generating more content — it's making past information useful for future decisions.")}
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.65]" style={{ color: BODY }}>
          {t("Not just an English app, or a demo of how fast AI can generate an interface — but connecting personal history, AI feedback, and real application, and personally driving it from idea to a working, improvable system.")}
        </p>
        <div className="mt-2 flex gap-3">
          {anchors.map((a) => (
            <span key={a} className="rounded-full px-4 py-[9px] text-[14px] font-medium" style={{ background: WARM, color: INK }}>{a}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-7" style={{ borderColor: LINE }}>
        <p className="max-w-[560px] text-[14px] leading-[1.5]" style={{ color: MUTED }}>
          {t("Personal product experiment. Primarily validated through personal use.")}
        </p>
        <a
          href={GD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[14px] font-medium transition-opacity hover:opacity-70"
          style={{ color: "#0066cc" }}
        >
          {t("Open Growth Daily")} ↗
        </a>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────
const TITLES = [
  "Context", "Problem discovery", "Product vision", "Product architecture", "Personalization",
  "Key iterations", "Product thinking", "Timeline", "AI-native execution", "Takeaway",
];
const TOTAL = TITLES.length;
function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function GrowthDailyPresentationPage() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState<number | null>(null);
  const [notes, setNotes] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: Shot[]; index: number } | null>(null);
  const [iterActive, setIterActive] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [lang, setLang] = useState<Lang>("zh");
  const t = (s: string) => translate(lang, s);
  const note = NOTES[index];
  const targetTotal = NOTES.reduce((a, n) => a + n.secs, 0);

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next: Lang = l === "en" ? "zh" : "en";
      try { window.localStorage.setItem("seedflow-presentation-lang", next); } catch { /* ignore */ }
      return next;
    });
  }, []);
  // Chinese is the primary language for this page; only switch to English if
  // that was explicitly saved (shared toggle state with /seedflow-presentation).
  useEffect(() => {
    try {
      if (window.localStorage.getItem("seedflow-presentation-lang") === "en") setLang("en");
    } catch { /* ignore */ }
  }, []);

  const go = useCallback((n: number) => {
    setIndex((cur) => {
      const next = Math.max(0, Math.min(TOTAL - 1, n));
      if (next !== cur) setStartedAt((s) => s ?? Date.now());
      return next;
    });
  }, []);
  const openLightbox: OpenLightbox = useCallback((items, i = 0) => setLightbox({ items, index: i }), []);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const n = parseInt(window.location.hash.replace("#", ""), 10);
    if (n >= 1 && n <= TOTAL) setIndex(n - 1);
  }, []);
  useEffect(() => {
    try { window.history.replaceState(null, "", `#${index + 1}`); } catch { /* ignore */ }
  }, [index]);

  useEffect(() => {
    if (startedAt === null) return;
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (lightbox) {
        if (k === "Escape") setLightbox(null);
        else if (k === "ArrowRight") setLightbox((l) => l && { ...l, index: (l.index + 1) % l.items.length });
        else if (k === "ArrowLeft") setLightbox((l) => l && { ...l, index: (l.index - 1 + l.items.length) % l.items.length });
        e.preventDefault();
        return;
      }
      if (k === "ArrowRight" || k === "PageDown" || k === " " || k === "Enter") { e.preventDefault(); go(index + 1); }
      else if (k === "ArrowLeft" || k === "PageUp" || k === "Backspace") { e.preventDefault(); go(index - 1); }
      else if (k === "Home") go(0);
      else if (k === "End") go(TOTAL - 1);
      else if (/^[0-9]$/.test(k)) go((k === "0" ? 10 : parseInt(k, 10)) - 1);
      else if (k === "n" || k === "N") setNotes((v) => !v);
      else if (k === "l" || k === "L") toggleLang();
      else if (k === "r" || k === "R") { setStartedAt(null); setElapsed(0); }
      else if (k === "f" || k === "F") {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      } else if (k === "Escape") setNotes(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, lightbox, toggleLang]);

  const slides = [
    <Slide01 key="1" onOpen={openLightbox} />,
    <Slide02 key="2" />,
    <Slide03 key="3" />,
    <Slide04 key="4" />,
    <SlidePersonalization key="4b" />,
    <Slide05 key="5" active={iterActive} onSelect={setIterActive} />,
    <Slide06 key="6" />,
    <Slide07 key="7" />,
    <Slide08 key="8" />,
    <Slide09 key="9" />,
  ];

  return (
    <LangContext.Provider value={lang}>
    <main lang={lang === "zh" ? "zh-CN" : "en"} className="fixed inset-0 select-none overflow-hidden bg-white antialiased" style={{ color: INK, fontFamily: FONT }}>
      <div
        className={`absolute left-1/2 top-1/2 overflow-hidden bg-white ${lang === "zh" ? "[&_h1]:!tracking-[-0.03em] [&_h2]:!tracking-[-0.005em] [&_h2]:!leading-[1.18]" : ""}`}
        style={{
          width: STAGE_W, height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${TOTAL}: ${t(TITLES[index])}`}
      >
        {/* Project navigation (default: SeedFlow elsewhere; this page is Growth Daily) */}
        <nav className="absolute left-0 right-0 top-0 z-20 flex h-[72px] items-center gap-8 px-[144px]" aria-label="Projects">
          {PROJECTS.map((p) => {
            const active = p.name === "Growth Daily";
            const style = { color: active ? INK : "#b0b0b5", fontWeight: active ? 600 : 400 } as const;
            return p.href ? (
              <Link key={p.name} href={p.href} className="text-[13px] transition-colors hover:text-black" style={style}>{p.name}</Link>
            ) : (
              <span key={p.name} className="text-[13px]" style={style}>{p.name}</span>
            );
          })}
        </nav>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.12 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>

        {/* Footer chrome */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[64px] items-center justify-between px-[144px]">
          <div className="flex items-center gap-5 text-[13px]" style={{ color: MUTED }}>
            <span className="font-semibold" style={{ color: INK }}>Growth Daily</span>
            <span>{t("Case study · Yue Yuwen")}</span>
            <span style={{ color: LINE }}>·</span>
            <span>{t(TITLES[index])}</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-[7px]" aria-label="Chapters">
              {TITLES.map((title, i) => (
                <button
                  key={title}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(i)}
                  aria-label={`${t(title)} · ${i + 1}`}
                  aria-current={i === index}
                  className="flex h-6 w-4 items-center justify-center"
                >
                  <span
                    className="block rounded-full transition-all duration-200"
                    style={{ width: i === index ? 16 : 6, height: 6, background: i === index ? INK : "#d8d8dc" }}
                  />
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? "切换到中文" : "Switch to English"}
              className="flex items-center gap-[6px] text-[13px] font-medium transition-opacity hover:opacity-60"
              style={{ color: INK }}
            >
              <span style={{ opacity: lang === "en" ? 1 : 0.35 }}>EN</span>
              <span style={{ opacity: 0.35 }}>/</span>
              <span style={{ opacity: lang === "zh" ? 1 : 0.35 }}>中文</span>
            </button>
            <span className="text-[13px] font-medium tabular-nums" style={{ color: MUTED }}>
              {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <div className="flex gap-1">
              <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" className="flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors hover:bg-[#f5f5f7] disabled:opacity-25 disabled:hover:bg-transparent">←</button>
              <button type="button" onClick={() => go(index + 1)} disabled={index === TOTAL - 1} aria-label="Next slide" className="flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors hover:bg-[#f5f5f7] disabled:opacity-25 disabled:hover:bg-transparent">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker notes (Chinese), toggled with N */}
      {notes && (
        <aside
          lang="zh-CN"
          className="fixed bottom-0 left-0 right-0 z-40 select-text bg-white"
          style={{ borderTop: `1px solid ${LINE}`, boxShadow: "0 -24px 60px -30px rgba(0,0,0,0.2)", maxHeight: "44vh", overflowY: "auto" }}
        >
          <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-8 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] font-medium uppercase tracking-[0.08em]" style={{ color: MUTED }}>
              <span>讲稿 · {String(index + 1).padStart(2, "0")} {t(TITLES[index])} · 约 {note.secs} 秒</span>
              <span className="tabular-nums">已用 {fmt(elapsed)} / 目标 {fmt(targetTotal)} · R 重置 · N 关闭</span>
            </div>
            {note.text.map((p) => (
              <p key={p} className="text-[17px] leading-[1.75]" style={{ color: INK }}>{p}</p>
            ))}
          </div>
        </aside>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.items[lightbox.index].alt}
          className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-4 p-8"
          style={{ background: "rgba(0,0,0,0.88)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.items[lightbox.index].src}
            alt={lightbox.items[lightbox.index].alt}
            className="max-h-[86vh] max-w-[92vw] rounded-[18px] bg-white object-contain"
          />
          <p className="text-[13px] text-white/75">
            {t(lightbox.items[lightbox.index].caption ?? lightbox.items[lightbox.index].alt)}
            {lightbox.items.length > 1 ? t(" · ← → to browse") : ""}{t(" · Esc to close")}
          </p>
        </div>
      )}
    </main>
    </LangContext.Provider>
  );
}
