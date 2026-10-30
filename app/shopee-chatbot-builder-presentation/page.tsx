"use client";
/* eslint-disable @next/next/no-img-element */

// Shopee Chatbot Builder — second-round interview case study.
// Standalone route. All styles are scoped to this file; no global tokens,
// shared components or other routes are touched.
// Evidence source: original Figma case-study file (file key nUTW4wl1S8bvch7LP4yXHA,
// page "Page 6", 27 frames) read live via the Figma MCP connector — content,
// quotes, metrics and product screenshots used here are taken directly from
// those frames. Two frames are intentionally excluded per author request:
// "Idea exploration: Unified interface vs. Modular mode" and "Thinking
// process" (raw sketches) — both are working-process artifacts, not
// case-study content.
// 15 slides, one fixed 1600×900 viewport each (no internal scrolling) —
// matching the single-screen-per-slide pattern used across the author's
// other case studies. Content that first shipped as six scrollable chapters
// has been split across more slides instead, grouped into the same six
// narrative sections (each slide's eyebrow tag names its section).
// Primary display language is Chinese; English is available via the L toggle.

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif';

// ── Tokens (neutral, page-scoped — same system as /growth-daily-presentation) ─
const INK = "#1d1d1f";
const BODY = "#424245";
const MUTED = "#86868b";
const LINE = "rgba(0,0,0,0.1)";
const WARM = "#f5f5f7";
const RED_BG = "#fdeceb";
const RED_BG_STRONG = "#f6a9a2";
const RED_TX = "#9c2b22";

const STAGE_W = 1600;
const STAGE_H = 900;
const IMG = "/images/shopee-presentation";

type Shot = { src: string; alt: string; caption?: string };
type OpenLightbox = (items: Shot[], index?: number) => void;

// ── Language (中文 primary / EN secondary) ───────────────────────────────────
type Lang = "en" | "zh";
const LangContext = createContext<Lang>("zh");
const ZH: Record<string, string> = {
  "Case study · Yue Yuwen": "案例研究 · Yue Yuwen",
  " · ← → to browse": " · ← → 浏览",
  " · Esc to close": " · Esc 关闭",

  // Chapters (used for the eyebrow tag + speaker-note headers; footer nav is dots)
  "Context": "背景",
  "Business problem": "业务挑战",
  "Interaction architecture": "交互架构",
  "UX research": "用户研究",
  "Design decisions": "设计取舍",
  "Impact & reflection": "结果与反思",

  // 01 · Context — hero
  "From complexity to clarity.": "将复杂，变为清晰。",
  "将复杂的客服对话逻辑，转化为运营团队可以自主构建和管理的可视化系统。": "将复杂的客服对话逻辑，转化为运营团队可以自主构建和管理的可视化系统。",
  "An internal platform supporting large-scale chatbot operations across multiple markets.": "一个支撑多市场大规模客服机器人运营的内部平台。",
  "Role": "角色",
  "Senior Product Designer · Sole designer on the project": "高级产品设计师 · 项目唯一设计师",
  "Collaboration": "协作",
  "1 business manager (SG) · 1 product manager (China) · 4 engineers": "1 位新加坡业务负责人 · 1 位中国产品经理 · 4 位工程师",
  "Duration": "周期",
  "2022–2023": "2022–2023",
  "Main users": "主要用户",
  "Operation teams in Southeast Asia and Brazil": "东南亚与巴西的运营团队",
  "Shopee Chatbot Builder — the drag-and-drop Flow Builder canvas": "Shopee Chatbot Builder · 可视化 Flow Builder 画布",
  "Welcome message": "欢迎语",
  "Clarification": "澄清",
  "Standard Node": "标准节点",
  "Conditions": "条件判断",
  "Custom Node": "自定义节点",
  "Answer · Option A": "回答 · 选项 A",
  "Preset Node": "预设节点",
  "Answer · Option B": "回答 · 选项 B",

  // 02 · Context — scale
  "545,226 conversations a day — all written by hand.": "每天 545,226 次对话，全部由人工撰写。",
  "At peak — during the 9.9 campaign — Shopee's chatbot handled 545,226 queries a day (2022).": "9.9 大促高峰期间，Shopee 机器人单日处理的咨询量达到 545,226 次（2022 年）。",
  "Behind the screen": "幕后",
  "Every one of those conversations was authored by operators — the platform's primary users — who define what the chatbot says, asks, and how it responds.": "每一条对话内容，都由运营团队（平台的主要用户）亲手撰写——由他们定义机器人说什么、问什么、如何应答。",
  "Queries per day, 9.9 campaign (2022)": "单日咨询量，9.9 大促（2022 年）",
  "At that volume, a manual, engineering-dependent workflow could not keep pace.": "面对这样的体量，依赖人工和工程排期的旧流程已经撑不住了。",

  // 03 · Business problem — the cycle
  "Freeing operators from daily engineering dependency.": "让运营团队摆脱对工程师的日常依赖。",
  "“9 weeks, dozens of emails, and countless back-and-forths, and the chatbot still wasn't live.”": "「9 周时间，几十封邮件，无数次往返确认，机器人还是没能上线。」",
  "— from internal operation staff": "——来自内部运营团队的反馈",
  "Draft spec (Excel / DrawIO)": "撰写需求（Excel / DrawIO）",
  "Dev & test": "开发与测试",
  "Raise requirement, email back-and-forth": "提需求，邮件反复确认",
  "~2 weeks": "约 2 周",
  "1–4 weeks": "1–4 周",
  "~7–9 weeks total": "全程约 7–9 周",
  "Before Flow Builder, every new conversation flow went through this cycle.": "在 Flow Builder 之前，每一条新对话流程都要走完这个循环。",
  "Before designing any screen, I mapped the full chatbot lifecycle.": "在设计任何界面之前，我先梳理了完整的机器人生命周期。",
  "Create": "创建",
  "Launch": "上线",
  "Monitor": "监控",
  "Modify": "调整",
  "Prioritized first — the immediate need was cutting the cost and time of releasing a new flow.": "优先解决 — 当前最迫切的需求，是降低发布新流程的时间和成本。",
  "Understand the full business chain first, then find the bottleneck most worth solving.": "先理解完整业务链路，再找到最值得优先解决的瓶颈。",

  // 04 · Business problem — JTBD
  "What each stage of the lifecycle needs to deliver.": "生命周期每个阶段，需要交付什么。",
  "Jobs to be done, mapped to the same four stages": "待完成的任务，对应同一套四阶段生命周期",
  "Situation": "情境",
  "Motivation": "动机",
  "Expected outcome": "期望结果",
  "What it took": "对应能力",
  "When I need to create a new chatbot conversation,": "当我需要创建一条新的对话流程时，",
  "I want to draft the structure and content visually,": "我希望能用可视化的方式搭建结构和内容，",
  "so I can build conversations without technical knowledge.": "这样我就能在不懂技术的情况下构建对话。",
  "Visual flow builder, ready-made templates.": "可视化流程编辑器，内置常用模板。",
  "Ready to launch,": "准备好上线时，",
  "I want to deploy with confidence and monitoring,": "我希望能有信心地发布并持续监控，",
  "so I can ensure proper market implementation.": "这样我就能确保在各市场正确落地。",
  "Staging & production environments, version control.": "预发布 / 生产环境，版本管理。",
  "Once my chatbot is live,": "机器人上线运行后，",
  "I want to track how it's performing in real time,": "我希望能实时追踪它的表现，",
  "so I can catch issues before users complain.": "这样我就能在用户投诉前发现并处理问题。",
  "Real-time analytics across Path / Node / System views.": "路径 / 节点 / 系统三个视角的实时数据。",
  "When something isn't working as expected,": "当某条流程表现不及预期时，",
  "I want to quickly find the issue and make targeted changes,": "我希望能快速定位问题并做针对性修改，",
  "so I can iterate faster, continuously.": "这样我就能持续、快速地迭代。",
  "In-place editing, with before/after comparison.": "原地编辑，支持修改前后对比。",
  "A clear job-to-be-done for every stage keeps scope honest.": "每个阶段都有清晰的待完成任务，范围才不会跑偏。",

  // 05 · Interaction architecture — why visual
  "Why a visual Flow Builder?": "为什么选择可视化 Flow Builder？",
  "Form-based": "表单式",
  "Script-based": "脚本式",
  "Drag-and-drop": "拖拽画布",
  "Too limited": "表达力有限",
  "Too technical": "门槛太高",
  "Chosen": "最终方案",
  "Simple interface, but hard to see the dialogue structure.": "界面简单，但难以看清对话结构。",
  "Flexible for technical users, steep learning curve for operators.": "技术用户够灵活，但运营团队学习成本太高。",
  "Visual structure, direct manipulation, real-time preview.": "结构可视、直接操作、实时预览。",
  "Visual node builder": "可视化节点编辑",
  "Create flows with intuitive blocks for Q&A and logic.": "用直观的问答与逻辑模块搭建流程。",
  "Lines as logic": "连线即逻辑",
  "Arrows connect nodes and define process flow instead of writing code.": "用箭头连接节点、定义流程走向，而不是写代码。",
  "Real-time preview": "实时预览",
  "The right panel instantly shows how the chat appears on mobile.": "右侧面板实时显示移动端的真实对话效果。",
  "7–9 weeks": "7–9 周",
  "2–4 weeks": "2–4 周",
  "Complex logic needs to be seen — not hidden inside code or forms.": "复杂逻辑需要被看见，而不是被隐藏在代码或表单里。",

  // 06 · Interaction architecture — evolution
  "Platform evolution, 0 → 1.6": "平台演进，从 0 到 1.6",
  "Sole designer across four phases, from a basic visual canvas to a 300+ component design system.": "作为项目唯一设计师，独立推进四个阶段——从基础可视化画布，演进到 300+ 组件的设计系统。",
  "Drag-and-drop canvas, basic node types, real-time preview.": "拖拽画布、基础节点类型、实时预览。",
  "Create & publish flow": "搭建与发布流程",
  "10+ high-frequency templates and complex multi-condition nodes, lifting scenario coverage by 60%.": "新增 10+ 高频模板与多条件复杂节点，场景覆盖率提升 60%。",
  "Troubleshooting": "问题排查",
  "Intelligent assistance and a more personalized experience.": "智能辅助能力，更个性化的使用体验。",
  "Design system, 300+ components": "设计系统，300+ 组件",
  "Standardized and scaled to 300+ business-specific components.": "标准化并扩展至 300+ 业务专属组件。",
  "200+ key screens shipped across six releases — 40+ features in v1.0, tapering to 10+ in v1.5–1.6 as the platform matured.": "六个版本累计上线 200+ 个关键界面——v1.0 阶段 40+ 项功能，到 v1.5–1.6 阶段随平台成熟收敛至 10+ 项。",
  "Scope grows in stages — ship the core job first, earn the rest.": "能力要分阶段生长——先交付核心任务，其余逐步赢得。",

  // 07 · UX research — the challenge
  "One complex system, different users need different ways to diagnose it.": "同一个复杂系统，不同用户需要不同的诊断方式。",
  "After Flow Builder shipped, a new problem surfaced: operators could publish conversations, but still struggled to diagnose why resolution was low.": "Flow Builder 上线后，新的问题出现了：运营团队能发布对话了，却依然很难判断解决率低的原因出在哪里。",
  "The next challenge: diagnosing low resolution rates.": "下一个挑战：诊断偏低的解决率。",
  "“Resolution rate is low, but we don't know what's the problem.”": "「解决率很低，但我们不知道问题出在哪。」",
  "“Spending too much time to fix issues.”": "「排查问题花费了太多时间。」",
  "~10 remote interviews and usability tests — Brazil, Indonesia, Singapore": "约 10 场远程访谈与可用性测试 — 巴西、印度尼西亚、新加坡",
  "Step 1 — assign a real task": "步骤一 — 分配真实任务",
  "Step 2 — record on-screen behavior": "步骤二 — 记录操作行为",
  "Step 3 — analyze the qualitative data": "步骤三 — 分析定性数据",
  "Users relied on a single metric, which wasn't enough for effective diagnosis.": "用户只依赖单一指标，不足以支撑有效的问题诊断。",
  "A single metric could tell operators something was wrong — never what, or where.": "单一指标只能告诉运营团队出了问题，却说不出哪里出了问题。",

  // 08 · UX research — resolution table + diagnostic tree
  "Where the single metric broke down.": "单一指标失灵的地方。",
  "Node": "节点",
  "Resolution rate": "解决率",
  "Sessions": "会话数",
  "(Users track conversation nodes with low resolution rates to optimize.)": "（用户通过追踪低解决率的节点来定位优化方向。）",
  "Solution-based bot · 3PL messages (to receive, after delivered)": "Solution-based bot · 3PL 消息（待收货，已送达）",
  "Solution-based bot · ACL2 exceeded > 24 hours": "Solution-based bot · ACL2 超时 > 24 小时",
  "Solution-based bot · Need additional help?": "Solution-based bot · 是否需要更多帮助？",
  "Solution-based bot · View proof of delivery": "Solution-based bot · 查看送达凭证",
  "System Diagnostics": "系统诊断",
  "Path Diagnostics": "路径诊断",
  "Node Diagnostics": "节点诊断",
  "Dependency · Content · Logic issues": "依赖问题 · 内容问题 · 逻辑问题",
  "Traffic · Loss rate · Resolution metrics": "流量 · 流失率 · 解决率指标",
  "Issue content · In-context view": "问题内容 · 上下文定位",
  "Node Diagnostics made the invisible node visible again.": "节点诊断，让原本看不见的问题节点重新被看见。",

  // 09 · UX research — personas
  "Across countries, languages and cultures, user behavior fell into three patterns.": "跨越不同国家、语言与文化，用户行为呈现出三种模式。",
  "Chatbot Local Customer Service Team · Brazil": "客服本地团队 · 巴西",
  "Part of the Local CS team since May 2020, moving to Chatbot Lead for Brazil in Jan 2022; tracks how the team can keep improving.": "自 2020 年 5 月加入本地客服团队，2022 年 1 月起负责巴西地区的 Chatbot Lead，持续跟进团队的改进方向。",
  "Needs": "需求",
  "Frustration": "困扰",
  "Quickly fix chatbot flows, and work more independently when creating new ones.": "能快速修复机器人流程，在创建新流程时更加独立。",
  "Some flows are much bigger than others — the biggest frustration is finding things inside the flow editor.": "有些流程比其他的大得多，最大的困扰是很难在流程编辑器里找到想要的东西。",
  "Chatbot Taskbot Product Manager · Singapore": "Chatbot Taskbot 产品经理 · 新加坡",
  "A Chatbot PM since March 2020; owns the Order Taskbot and all of its feature requirements.": "自 2020 年 3 月起担任 Chatbot PM，负责 Order Taskbot 及其所有相关功能需求。",
  "A quick way to implement flow improvements and track key order-bot metrics within a short timespan.": "希望能在较短时间内快速实现流程优化，并跟踪订单机器人的关键指标。",
  "Order taskbot flows have too many similar nodes — a lot of repetition when drawing them.": "订单机器人的流程里有太多相似节点，画图时需要大量重复操作。",
  "Chatbot Regional Customer Service · Singapore": "Chatbot 区域客服 · 新加坡",
  "Part of Regional CS since Aug 2020, moved onto chatbot work in Jul 2021; identifies user pain points and improves taskbots to better answer intent.": "自 2020 年 8 月加入区域客服团队，2021 年 7 月转向机器人相关工作，负责识别用户痛点并优化 Taskbot，以更好地理解用户意图。",
  "Make quick changes to taskbot flows on local teams' request, and eventually train them to do it themselves.": "能根据本地团队的请求快速调整 Taskbot 流程，并最终培训本地团队自主完成这些调整。",
  "*Visual content shown here is generic imagery, not real photographs — kept out to protect privacy.": "*出于隐私考虑，页面不呈现真实人物照片，形象信息均以文字呈现。",
  "Three roles, three very different relationships with the same tool.": "三种角色，与同一个工具有着完全不同的相处方式。",

  // 10 · UX research — pain points
  "Same platform, different pain points by role.": "同一个平台，不同角色有不同的困扰。",
  "Junior Customer Service Representatives": "初级客服代表",
  "Advanced Customer Service Representatives": "高级客服代表",
  "Technical Support Specialists": "技术支持专家",
  "Pain-point": "困扰",
  "Expectation": "期望",
  "1,000+ paths are shown on the same page — hard to find the issue node.": "同一页面要展示 1,000+ 条路径，很难找到出问题的节点。",
  "An easy-to-use, intuitive interface.": "简单直观、容易上手的界面。",
  "Relies on node metrics (loss rate / traffic) to diagnose low resolution, but can't use them well on the platform.": "依赖节点指标（流失率 / 流量）来诊断低解决率，但平台上这些指标并不好用。",
  "Visualize and analyze metrics systematically.": "系统化地可视化并分析指标。",
  "Hard to trace related nodes from a target node — too many paths.": "路径太多，很难从目标节点追溯到相关节点。",
  "Filter down to key information for analysis.": "筛选出关键信息进行分析。",
  "Different users need different levels of information and control — not one generic diagnostic view.": "不同用户需要不同层级的信息和控制力，而不是一个统一的通用诊断视图。",

  // 11 · Design decisions — triptych + A/B
  "Making complex diagnostics powerful, and genuinely usable.": "让复杂诊断既足够强大，也真正易用。",
  "System Diagnostics — dependency, content and logic issues": "系统诊断 — 依赖、内容与逻辑问题一览",
  "Senior User · Path Diagnostics — ranked conversation paths with traffic, loss rate and CSAT": "高级用户 · 路径诊断 — 按流量、流失率、CSAT 排序的对话路径",
  "Node Diagnostics — issue content, in context": "节点诊断 — 问题内容、上下文定位",
  "Decision A": "决策 A",
  "Unified panel → 3 focused modules": "统一面板 → 三个独立模块",
  "Pros: comprehensive data, suited to expert users.": "优点：信息集中，适合专家用户。",
  "Cons: confusing for new users; heavy loading on large flows.": "缺点：新用户难上手；大流程加载卡顿。",
  "Response: split into System, Path and Node diagnostics — each scoped to one task.": "应对：拆成系统、路径、节点三个独立模块，各自聚焦一类任务。",
  "Decision B": "决策 B",
  "Where should the entry point live?": "入口应该放在哪？",
  "Option 1 — a dedicated diagnostic entry screen.": "方案一 — 独立的诊断入口页面。",
  "Option 2 — a compact entry inside the canvas.": "方案二 — 嵌入画布内的轻量入口。",
  "Surprise: interviews showed users preferred staying inside the canvas, for a more continuous experience.": "意外发现：访谈显示用户更希望留在画布内操作，体验更连贯。",
  "Response: brought diagnostics closer to where operators already work.": "应对：把诊断能力放到运营团队本来就在操作的画布里。",
  "Three decisions, one goal: match the tool to the task.": "三个决策，一个目标：让工具匹配任务。",

  // 12 · Design decisions — user tiers
  "Matching diagnostic depth to the user.": "诊断深度，匹配用户层级。",
  "I focused on improving resolution rate by identifying the key metrics and steps that actually affect it.": "聚焦提升解决率，识别出真正影响它的关键指标和步骤。",
  "Senior User": "高级用户",
  "Junior User": "初级用户",
  "Expert User": "专家用户",
  "Good rate · Traffic · Loss rate": "解决率 · 流量 · 流失率",
  "Logic · Content · Dependency issues": "逻辑 · 内容 · 依赖问题",
  "Traffic of front-end nodes": "前端节点流量",
  "System complexity can stay — users shouldn't be forced to carry all of it.": "系统复杂性可以保留，但用户不应该被迫承担所有复杂性。",

  // 13 · Impact — stats
  "From build speed to continuously improving the support experience.": "从构建效率，到持续优化客服体验。",
  "higher than the original version.": "高于原始版本。",
  "Reported business savings": "项目口径的业务收益",
  "per quarter — a project-level reported result, not attributed to design alone.": "每季度 — 项目整体口径的结果，并非设计单独产生的指标。",
  "Delivery cycle": "交付周期",
  "down from 7–9 weeks after the self-service builder launched.": "自助式 Builder 上线后，较 7–9 周大幅缩短。",
  "Three numbers, one throughline: less time spent, more issues resolved.": "三个数字，同一条主线：花更少时间，解决更多问题。",

  // 14 · Impact — before/after + reflection
  "From chaos to order.": "从混乱到秩序。",
  "I transformed a messy, single-metric platform into a modular, intelligent diagnostic tool.": "我把一个杂乱、依赖单一指标的平台，转变成了模块化、智能化的诊断工具。",
  "From chaos to order — the flow canvas before, and the modular diagnostic workspace after": "从混乱到秩序 — 改版前的流程画布，与改版后的模块化诊断工作台",
  "What I learned: designing a complex B2B product means starting from real scenarios and business goals, then gradually building a system that can scale — and be understood.": "我学到的是：设计复杂 B2B 产品，需要从真实场景和业务目标出发，再逐步建立能够扩展、能够被理解的系统。",
  "Complex system design": "复杂系统设计",
  "Cross-team collaboration": "跨团队协作",
  "Data-driven design": "数据驱动设计",
  "continuous cycle — each release feeds the next": "持续循环 —— 每一次迭代都回到下一轮",
  "Conversation node": "对话节点",
  "Needs & goals": "诉求与目标",
  "Today": "现状",
  "Queries per day at peak — the 9.9 campaign, 2022.": "大促高峰期单日咨询量 —— 9.9 大促，2022 年。",
  "Each mark = 1,000 queries in a single day.": "每个点代表单日 1,000 次咨询。",
  "Raise requirement": "提出需求",
  "Operations → Engineering": "运营 → 工程",
  "Draft the flow": "绘制流程",
  "2 weeks": "2 周",
  "Operations · Excel / DrawIO": "运营 · Excel / DrawIO",
  "Engineering": "工程",
  "Back-and-forth edits": "反复修改确认",
  "by email": "通过邮件",
  "Operations ⇄ Engineering": "运营 ⇄ 工程",
  "Nine weeks to change what a bot says.": "改一句机器人说的话，要等九周。",
  "weeks from requirement to go-live, before Flow Builder.": "周 —— Flow Builder 之前，从提需求到上线的周期。",
  "Every wording change had to travel through an engineering queue before it reached a user.": "每一次文案改动，都要先排进工程队列，才能到达用户。",
  "draft and build a flow": "起草并搭建流程",
  "deploy to a market": "发布到具体市场",
  "watch it in production": "观察线上表现",
  "fix and iterate": "定位问题并迭代",
  "No one had mapped the lifecycle. So I did.": "当时没有人梳理过全链路，所以我自己做了。",
  "My framing — four stages, one owner per job": "我的拆解 —— 四个阶段，每个阶段一个明确的任务",
  "The business tracked requests one at a time. I reconstructed the whole lifecycle, then turned each stage into a job to be done.": "业务当时是一个需求一个需求地接。我把完整的生命周期重新梳理出来，再把每个阶段拆成一条 Job to be done。",
  "That framing is what let us argue for scope: Create was the costliest stage, so it shipped first — and the table below became how we prioritized everything after it.": "这个框架成了我们讨论范围的依据：创建是成本最高的阶段，所以先做；下面这张表也成了后续排优先级的标准。",
  "Three ways to author a flow. Only one fit the operators.": "三种搭建流程的方式，只有一种真正适合运营团队。",
  "Form-based builder": "表单式搭建",
  "Simple interface.": "界面简单。",
  "Limited visibility of the dialogue structure.": "看不清完整的对话结构。",
  "Script-based builder": "脚本式搭建",
  "Flexible for technical users.": "对技术用户足够灵活。",
  "High learning curve for non-technical teams.": "对非技术团队学习成本过高。",
  "Drag-and-drop builder": "拖拽式画布",
  "Visual, intuitive interface with a clear dialogue structure.": "可视化界面直观，对话结构一目了然。",
  "Real-time mobile preview reduces errors before launch.": "移动端实时预览，上线前就能减少错误。",
  "After v1.0 shipped, creating and releasing a conversation flow dropped from 7–9 weeks to 2–4.": "V1.0 上线后，对话流程的创建与发布周期从 7–9 周降到 2–4 周。",
  "v1.0 shipped — and flow creation dropped from 7–9 weeks to 2–4.": "V1.0 正式上线，流程创建周期从 7–9 周缩短到 2–4 周。",
  "Shipping the right interaction model paid back immediately, in cycle time.": "选对了交互方式，效率提升立刻体现在了交付周期上。",
  "key screens shipped": "个关键界面交付",
  "components in the design system": "个设计系统组件",
  "releases, 0 → 1.6": "个版本，0 → 1.6",
  "designer on the project": "名设计师（我）",
  "MVP": "MVP",
  "Drag-and-drop canvas, node types, real-time preview.": "拖拽画布、节点类型、实时预览。",
  "10+ high-frequency templates and multi-condition nodes, lifting scenario coverage by 60%.": "新增 10+ 高频模板与多条件复杂节点，场景覆盖率提升 60%。",
  "Design system": "设计系统",
  "From a blank canvas to a 300-component system, 0 → 1.6.": "从一块空白画布，到 300+ 组件的设计系统，0 → 1.6。",
  "Features shipped per release — scope tapering as the platform matured": "每个版本上线的功能数 —— 平台成熟后范围逐步收敛",
  "Operators could publish a flow. They still couldn't tell why it failed.": "运营能发布流程了，却依然说不出它为什么失败。",
  "All they had": "他们手上只有",
  "Which node is losing people?": "是哪个节点在流失用户？",
  "Is it the content, the logic, or a broken link?": "是内容问题、逻辑问题，还是链路断了？",
  "What changed since last week?": "和上周相比，变化出在哪里？",
  "How I investigated it": "我是怎么查的",
  "remote interviews & usability tests": "场远程访谈与可用性测试",
  "markets — Brazil, Indonesia, Singapore": "个市场 —— 巴西、印尼、新加坡",
  "Assigned each user a real task on the platform.": "给每位用户分配一个平台上的真实任务。",
  "Recorded their on-screen behavior end to end.": "完整记录他们的屏幕操作行为。",
  "Analyzed the qualitative data for shared patterns.": "分析定性数据，归纳共性模式。",
  "One number could point at the node. Never at the cause.": "一个数字只能指出是哪个节点，永远指不出原因。",
  "Node resolution rates, as operators saw them": "运营当时看到的节点解决率",
  "Operators tracked conversation nodes with low resolution rates to optimize.": "运营靠追踪低解决率的对话节点来做优化。",
  "One node resolved barely a tenth of its 2,307 sessions — six times worse than everything around it.": "这个节点 2,307 次会话里只解决了不到十分之一 —— 比周围所有节点差六倍。",
  "The list says which node. It never says whether the question was unclear, the condition was broken, or the upstream path sent the wrong people here.": "这张表只说得出是哪个节点，说不出到底是问法不清楚、条件写错了，还是上游把不该来的人导了过来。",
  "Brazil": "巴西",
  "Chatbot Local Customer Service Team": "Chatbot 本地客服团队",
  "Singapore": "新加坡",
  "Chatbot Taskbot Product Manager": "Chatbot Taskbot 产品经理",
  "Chatbot Regional Customer Service": "Chatbot 区域客服",
  "Portraits are drawn placeholders — participants' real photographs are kept out to protect privacy.": "头像为绘制的占位形象 —— 出于隐私保护，未使用受访者真实照片。",
  "What kind of issue is it? Logic, content or dependency.": "这是什么类型的问题？逻辑、内容，还是依赖。",
  "Which route is losing people? Traffic, loss rate and CSAT, ranked.": "是哪条路径在流失用户？按流量、流失率、CSAT 排序。",
  "What exactly is wrong here? The issue content, in context.": "这个节点具体错在哪？在上下文中直接看问题内容。",
  "Decision A — one unified panel, or three focused modules?": "取舍 A —— 一个统一面板，还是三个各司其职的模块？",
  "Option 1": "方案一",
  "One unified right-hand panel with every diagnostic in it": "所有诊断信息收进右侧一个统一面板",
  "Comprehensive data, suited to expert users.": "数据最全，适合专家用户。",
  "Confusing navigation for new users, and slow on large dialogue flows.": "新用户难以上手，大流程下加载还会卡顿。",
  "Option 2": "方案二",
  "Three independent modules, each scoped to one question": "拆成三个独立模块，每个只回答一个问题",
  "Each user segment lands directly in the view that answers their question.": "每类用户都能直接进入回答自己问题的那个视图。",
  "More surfaces to keep consistent — which is what the design system was for.": "需要维持一致的界面变多了 —— 这也正是后来做设计系统的原因。",
  "Split by the question being asked, not by the data available.": "按用户要问的问题来拆，而不是按手上有多少数据来拆。",
  "Decision B — where should diagnostics start?": "取舍 B —— 诊断的入口应该放在哪？",
  "A dedicated entry screen, made highly visible": "独立的诊断入口页面，做得足够显眼",
  "Clear guidance for the user's next operation.": "对用户的下一步操作有明确引导。",
  "Users can't act directly — it adds one more step before they reach the flow.": "用户没法直接操作 —— 回到流程前多了一步。",
  "A compact entry point inside the canvas": "画布内的轻量入口",
  "Users stay on the canvas and act where the flow already is.": "用户留在画布上，在流程本来的位置直接操作。",
  "Less obvious, and the canvas risks getting crowded with controls.": "不够显眼，画布也可能被功能堆得过满。",
  "The surprise": "意外发现",
  "Interviews flipped my assumption: users preferred to stay inside the canvas, for a more seamless experience.": "访谈推翻了我的预设：用户更希望留在画布里操作，体验更连贯。",
  "What I did": "我的处理",
  "Tested both as lo-fi prototypes, then brought diagnostics to where operators already work instead of giving it a destination of its own.": "两个方案都做了低保真原型验证，最后把诊断能力放回运营本来就在用的地方，而不是另起一个页面。",
  "The more visible option is not always the more usable one — the prototype settled it, not the argument.": "更显眼的方案不一定更好用 —— 最后是原型定的，不是讨论定的。",
  "Turning one business metric into three design targets.": "把一个业务指标，翻译成三组设计目标。",
  "Business goal": "业务目标",
  "I broke the metric down into the specific signals that move it, then handed each group to the user who can actually act on it.": "我把这个指标拆成真正能影响它的具体信号，再把每一组交给真正能动手改的那类用户。",
  "Design target, per user type": "按用户类型拆出的设计目标",
  "Senior user": "高级用户",
  "Good rate": "解决率",
  "Traffic": "流量",
  "Loss rate": "流失率",
  "Junior user": "初级用户",
  "Logic issues": "逻辑问题",
  "Content issues": "内容问题",
  "Dependency issues": "依赖问题",
  "Expert user": "专家用户",
  "Turning complex customer-service conversation logic into a visual system that operation teams can build and manage on their own.": "将复杂的客服对话逻辑，转化为运营团队可以自主构建和管理的可视化系统。",
  "What shipped — v1.0": "实际上线的 V1.0",
  "per day, at peak": "高峰期单日",
  "per hour": "每小时",
  "÷ 24 hours": "÷ 24 小时",
  "per minute": "每分钟",
  "÷ 60 minutes": "÷ 60 分钟",
  "per second": "每秒",
  "÷ 60 seconds": "÷ 60 秒",
  "About six conversations begin every second — and every one of them was written by a person, in advance.": "大约每秒就有六段对话开始 —— 而它们的每一句，都是人提前写好的。",
  "Peak day during the 9.9 campaign, 2022. Lower figures are that number divided by hours, minutes and seconds.": "数据为 2022 年 9.9 大促高峰单日咨询量；后面几个数字由它按小时、分钟、秒换算得出。",
  "Flows are built from blocks for Q&A and logic.": "用问答与逻辑模块直接搭出流程。",
  "Arrows connect nodes and define the process — no code.": "连线即逻辑，不用写代码。",
  "The right panel shows the chat exactly as mobile renders it.": "右侧面板实时呈现移动端的真实效果。",
  "comprehensive data for expert users, but confusing navigation for new ones and slow on large dialogue flows.": "数据最全，适合专家用户；但新用户难以上手，大流程下还会卡顿。",
  "each user segment lands directly in the view that answers their question.": "每类用户都能直接进入回答自己问题的那个视图。",
  "Shopee Chatbot: Managing Large-Scale Support Operations": "Shopee 聊天机器人：支撑大规模客服运营",
  "Shopee, as the largest e-commerce platform in Southeast Asia, handles a huge volume of queries. During the 9.9 campaign, Shopee's chatbot handled": "Shopee 作为东南亚最大的电商平台，每天要处理巨量的客服咨询。9.9 大促期间，Shopee 的聊天机器人单日处理了",
  "queries per day. (2022)": "次咨询。（2022）",
  "The conversations are crafted by operators (main users). These operators design the conversation flows, defining what the chatbot says, asks, and how it responds based on user input.": "这些对话内容由运营团队（平台的主要用户）亲手撰写。他们设计对话流程，定义机器人说什么、问什么，以及如何根据用户的输入作出回应。",
};
function translate(lang: Lang, s: string) {
  return lang === "zh" ? ZH[s] ?? s : s;
}
function useT() {
  const lang = useContext(LangContext);
  return (s: string) => translate(lang, s);
}

// ── Speaker notes (Chinese), one entry per slide ─────────────────────────────
const NOTES: { secs: number; text: string[] }[] = [
  { secs: 28, text: [
    "这是我在 Shopee 做的一个 2B 内部平台项目 —— Chatbot Builder。我是项目唯一的设计师，跨了 2022 到 2023 年，协作的是新加坡的一位业务负责人、中国的一位产品经理，和四位工程师。",
  ] },
  { secs: 26, text: [
    "先说规模——9.9 大促高峰期间，Shopee 机器人单日处理的咨询量能到 54 万多次。右边每一个点代表一千次咨询。而这些对话内容，全部是运营团队手工撰写的。这个体量，是后面所有问题的起点。",
  ] },
  { secs: 30, text: [
    "当时改一句机器人说的话，要走完这一整条链路：提需求两到四周，自己在 Excel 或 DrawIO 里画流程两周，工程师开发测试两周，中间还要靠邮件反复确认。有同事原话是——九周时间，几十封邮件，机器人还是没能上线。",
  ] },
  { secs: 32, text: [
    "这里要强调一点：这个「创建—上线—监控—调整」的生命周期，不是业务本来就有的，是我自己梳理出来的。当时团队是一个需求一个需求地接，没有人把全链路拼起来过。我把它拆成四个阶段，再给每个阶段写了一张 Jobs-to-be-done，这张表后来成了我们排功能优先级的依据。创建是成本最高的阶段，所以先做。",
  ] },
  { secs: 32, text: [
    "创建流程有三种可能的方式：表单式简单但看不清结构，脚本式灵活但对运营团队门槛太高，我们最终选了拖拽式可视化画布——节点直接摆放，连线即逻辑，右侧实时预览移动端效果。下面这张是 V1.0 真实上线的界面。上线后，流程的创建发布周期从 7 到 9 周，降到了 2 到 4 周。",
  ] },
  { secs: 30, text: [
    "这一页是我在这个项目上的交付量：200 多个关键界面，300 多个组件的设计系统，六个版本，全程只有我一个设计师。下面这四根柱子是每个版本上线的功能数——V1.0 四十多个，到 V1.5-1.6 收敛到十几个，平台成熟之后范围是在收的。",
  ] },
  { secs: 30, text: [
    "Flow Builder 解决了「创建」，但很快出现新挑战：运营团队能发布对话了，却不知道为什么解决率低。他们手上只有一个数字，左边这三个问号就是这个数字答不了的问题。我做了约十场远程访谈和可用性测试，覆盖巴西、印尼和新加坡：给真实任务、记录操作、再分析定性数据。",
  ] },
  { secs: 28, text: [
    "具体看这张表。这是运营当时能看到的全部——每个节点一个解决率。最下面这个节点只有 8.8%，是周围节点的六分之一，两千多次会话都没解决。问题是：这张表只能告诉你哪个节点坏了，不会告诉你是问法不清楚、条件写错了，还是上游把不该来的人导过来了。",
  ] },
  { secs: 24, text: [
    "访谈里梳理出三类典型用户——巴西的本地客服主管、新加坡的 Taskbot 产品经理、区域客服。他们的角色、诉求和困扰各不相同，这也是后面分层设计诊断深度的依据。",
  ] },
  { secs: 24, text: [
    "具体到困扰：初级客服面对的是上千条路径堆在一页里；高级客服有数据意识但用不好现有指标；技术支持专家很难从一个节点追溯到相关节点。不同用户需要的信息颗粒度完全不一样。",
  ] },
  { secs: 28, text: [
    "第一个关键取舍：诊断信息最初想放在一个统一面板里，信息全，但新用户难上手、大流程还卡顿。最后拆成系统、路径、节点三个独立模块，每个模块只回答一个问题——是什么类型的问题、哪条路径在流失、这个节点具体错在哪。这三张就是拆分后的真实界面。",
  ] },
  { secs: 26, text: [
    "第二个取舍是入口放哪。我做了两版低保真原型：一版是独立的诊断页面，入口很明显；一版是画布里的轻量入口。我原本以为独立页面更好，但访谈的意外发现是——用户更希望留在画布里操作，体验更连贯。所以我们把诊断能力放回了运营团队本来就在用的地方。",
  ] },
  { secs: 28, text: [
    "这一页是我怎么把业务目标翻译成设计目标的。业务要的是解决率提升，我把它拆成真正能影响它的那些指标，再按用户层级分组：高级用户看解决率、流量、流失率；初级用户看逻辑、内容、依赖这些具体问题；专家用户关注前端节点的流量。系统的复杂性可以保留，但不该让所有用户都背着它。",
  ] },
  { secs: 26, text: [
    "最后看结果。新版本的解决率比原始版本高了 6%，项目整体口径下大概每季度节省 300 万美元——这是项目层面的业务结果，不是我一个人设计贡献的数字。交付周期也稳定在了 2 到 4 周。",
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
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.09em]" style={{ color: MUTED }}>
      {children}
    </p>
  );
}
const SLIDE_HEADLINE = "mt-3 [text-wrap:balance] text-[38px] font-semibold leading-[1.08] tracking-[-0.022em]";

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 pl-5 text-[16px] font-semibold leading-[1.45] [text-wrap:balance]" style={{ color: INK, borderColor: INK }}>
      {children}
    </p>
  );
}

function StageLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[12px] font-semibold tracking-[0.08em]" style={{ color: MUTED }}>{children}</span>;
}

// ── Diagram primitives (page-scoped, drawn from the same tokens) ────────────

// Unit chart — one dot stands for 1,000 queries in a day, so the 545,226
// peak-day figure is something you feel rather than read.
function DotMatrix({ count, cols }: { count: number; cols: number }) {
  return (
    <div className="grid w-full gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block aspect-square rounded-[1.5px]" style={{ background: "rgba(29,29,31,0.42)" }} />
      ))}
    </div>
  );
}

// The old delivery cycle as one stacked bar. Segment widths are proportional to
// the durations the operations team quoted, and the hatched tail is the email
// rework that pushed a six-week sequence out to seven-to-nine weeks.
function StackedCycle({
  segments,
}: { segments: { label: string; sub: string; owner: string; w: number; rework?: boolean }[] }) {
  return (
    <div className="w-full">
      <div className="flex w-full gap-[3px]">
        {segments.map((s) => (
          <div key={s.label} className="flex flex-col gap-[10px]" style={{ flexGrow: s.w, flexBasis: 0 }}>
            <div
              className="h-[62px] rounded-[7px]"
              style={s.rework
                ? { border: `1px solid ${RED_BG_STRONG}`, background: `repeating-linear-gradient(135deg, ${RED_BG_STRONG} 0 2px, ${RED_BG} 2px 7px)` }
                : { background: INK }}
            />
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold leading-[1.3]" style={{ color: s.rework ? RED_TX : INK }}>{s.label}</p>
              <p className="mt-[2px] truncate text-[11.5px] leading-[1.3]" style={{ color: MUTED }}>{s.sub}</p>
              <p className="mt-[1px] truncate text-[11px] leading-[1.3]" style={{ color: MUTED }}>{s.owner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// A literal count of the "dozens of emails" in the quote — 36 envelope marks.
function EnvelopeRow({ n }: { n: number }) {
  return (
    <div className="flex flex-wrap gap-[5px]">
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="14" height="10" rx="1.5" stroke={RED_BG_STRONG} />
          <path d="M1.5 1.8 L7.5 6 L13.5 1.8" stroke={RED_BG_STRONG} strokeWidth="1" fill="none" />
        </svg>
      ))}
    </div>
  );
}

// The chatbot lifecycle as a closed loop — four stages with a return path, so
// it reads as an operating cycle rather than a one-way funnel.
function LifecycleLoop({ steps, activeIndex }: { steps: { label: string; note: string }[]; activeIndex: number }) {
  const t = useT();
  return (
    <div className="w-full">
      <div className="flex items-stretch gap-3">
        {steps.map((s, i) => {
          const on = i === activeIndex;
          return (
            <div key={s.label} className="flex flex-1 items-center gap-3">
              <div
                className="flex-1 rounded-[13px] px-5 py-[14px]"
                style={on ? { background: INK, color: "#fff" } : { border: `1px solid ${LINE}`, background: "#fff" }}
              >
                <p className="text-[15px] font-semibold leading-[1.25]" style={{ color: on ? "#fff" : INK }}>{s.label}</p>
                <p className="mt-[3px] text-[11.5px] leading-[1.35]" style={{ color: on ? "rgba(255,255,255,0.7)" : MUTED }}>{s.note}</p>
              </div>
              {i < steps.length - 1 && (
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden className="shrink-0">
                  <path d="M0 5h13M9.5 1l4 4-4 4" stroke={MUTED} strokeWidth="1.2" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mt-[6px] h-[30px]">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 30" fill="none" aria-hidden>
          <path d="M98 0 V22 H2 V0" stroke={LINE} strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          <path d="M2 0 l0 0" stroke={LINE} vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="absolute left-0 top-0" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
          <path d="M5 0 L9 6 H1 Z" fill={MUTED} />
        </svg>
        <span className="absolute left-1/2 top-[13px] -translate-x-1/2 bg-white px-3 text-[11.5px]" style={{ color: MUTED }}>
          {t("continuous cycle — each release feeds the next")}
        </span>
      </div>
    </div>
  );
}

// The three ways a conversation flow could be authored, drawn rather than
// described — the Figma deck compared them with illustrations, rebuilt here as
// diagrams in the deck's own visual system.
function BuilderArt({ kind }: { kind: "form" | "script" | "canvas" }) {
  const frame = { background: "#fbfbfc", border: `1px solid ${LINE}` };
  if (kind === "form") {
    return (
      <div className="flex h-[92px] flex-col justify-center gap-[9px] rounded-[12px] px-6" style={frame}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[10px]">
            <span className="h-[7px] w-[34px] rounded-full" style={{ background: "rgba(29,29,31,0.25)" }} />
            <span className="h-[22px] flex-1 rounded-[5px] border bg-white" style={{ borderColor: LINE }} />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "script") {
    return (
      <div className="flex h-[92px] flex-col justify-center gap-[5px] rounded-[12px] px-6" style={{ background: "#1d1d1f", border: "1px solid #1d1d1f" }}>
        {[64, 86, 46, 74, 54].map((w, i) => (
          <div key={i} className="flex items-center gap-[7px]">
            <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: "rgba(255,255,255,0.22)" }} />
            <span className="h-[6px] rounded-full" style={{ width: `${w}%`, background: i % 2 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.5)" }} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="relative h-[92px] overflow-hidden rounded-[12px]" style={{ ...frame, backgroundImage: "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 92" fill="none" aria-hidden>
        <path d="M140 26 V35" stroke={MUTED} strokeWidth="1.2" />
        <path d="M140 57 C140 66 86 66 86 71" stroke={MUTED} strokeWidth="1.2" />
        <path d="M140 57 C140 66 194 66 194 71" stroke={MUTED} strokeWidth="1.2" />
      </svg>
      <span className="absolute left-1/2 top-[10px] h-[18px] w-[84px] -translate-x-1/2 rounded-[6px]" style={{ background: INK }} />
      <span className="absolute left-1/2 top-[35px] h-[22px] w-[100px] -translate-x-1/2 rounded-[6px] border bg-white" style={{ borderColor: LINE }} />
      <span className="absolute left-[12%] top-[71px] h-[18px] w-[68px] rounded-[6px] border bg-white" style={{ borderColor: LINE }} />
      <span className="absolute right-[12%] top-[71px] h-[18px] w-[68px] rounded-[6px] border bg-white" style={{ borderColor: LINE }} />
    </div>
  );
}

function OptionCard({
  art, label, verdict, points, chosen,
}: { art: "form" | "script" | "canvas"; label: string; verdict: string; points: { ok: boolean; text: string }[]; chosen?: boolean }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[18px] p-5"
      style={chosen ? { background: "#fff", boxShadow: `0 0 0 1.5px ${INK}` } : { background: "#fff", border: `1px solid ${LINE}` }}
    >
      <BuilderArt kind={art} />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[16px] font-semibold leading-[1.25]" style={{ color: INK }}>{label}</h3>
        <span
          className="shrink-0 whitespace-nowrap rounded-full px-[10px] py-[3px] text-[11.5px] font-semibold"
          style={chosen ? { background: INK, color: "#fff" } : { background: WARM, color: MUTED }}
        >{verdict}</span>
      </div>
      <div className="flex flex-col gap-[7px]">
        {points.map((p) => (
          <div key={p.text} className="flex gap-[9px]">
            <span className="mt-[5px] shrink-0 text-[11px] font-semibold leading-none" style={{ color: p.ok ? INK : MUTED }}>{p.ok ? "+" : "−"}</span>
            <p className="text-[12.5px] leading-[1.45]" style={{ color: p.ok ? BODY : MUTED }}>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Release rail — four milestones, with the shipped-feature count drawn as a bar
// so the scope tapering as the platform matured is visible, not just stated.
function ReleaseRail({ stages }: { stages: { version: string; title: string; count: string; bar: number; detail: string }[] }) {
  const max = Math.max(...stages.map((s) => s.bar));
  return (
    <div className="grid grid-cols-4 gap-5">
      {stages.map((s, i) => (
        <div key={s.version} className="flex flex-col">
          <div className="flex h-[92px] items-end">
            <div className="w-full rounded-t-[7px]" style={{ height: `${(s.bar / max) * 100}%`, background: i === 0 ? INK : "rgba(29,29,31,0.22)" }} />
          </div>
          <div className="border-t pt-4" style={{ borderColor: INK }}>
            <div className="flex items-baseline gap-2">
              <p className="text-[26px] font-semibold leading-[1] tracking-[-0.02em]" style={{ color: INK }}>{s.count}</p>
              <p className="text-[12px]" style={{ color: MUTED }}>{s.version}</p>
            </div>
            <h3 className="mt-[10px] text-[14.5px] font-semibold leading-[1.3]" style={{ color: INK }}>{s.title}</h3>
            <p className="mt-[5px] text-[12px] leading-[1.5]" style={{ color: BODY }}>{s.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Numbered research steps.
function StepStrip({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col gap-[14px]">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-[13px]">
          <span
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
            style={{ border: `1px solid ${LINE}`, color: INK }}
          >{i + 1}</span>
          <p className="text-[13.5px] leading-[1.4]" style={{ color: BODY }}>{s}</p>
        </div>
      ))}
    </div>
  );
}

// What a single metric could not answer — rendered as blanks, so the gap in the
// old workflow is the thing you actually look at.
function UnknownCard({ q }: { q: string }) {
  return (
    <div className="flex items-center gap-[13px] rounded-[12px] bg-white px-[18px] py-[13px]" style={{ border: `1px solid ${LINE}` }}>
      <span className="text-[17px] font-semibold leading-none" style={{ color: RED_BG_STRONG }}>?</span>
      <p className="text-[13px] leading-[1.4]" style={{ color: MUTED }}>{q}</p>
    </div>
  );
}

// Node resolution rates with the value drawn as a bar — the one row that sits
// far below the rest becomes obvious without reading the numbers.
function ResolutionBars({ rows }: { rows: { node: string; rate: number; sessions: string; low?: boolean }[] }) {
  const t = useT();
  return (
    <div className="overflow-hidden rounded-[16px]" style={{ border: `1px solid ${LINE}` }}>
      <div className="grid grid-cols-[1fr_236px_104px] items-center px-5 py-[11px]" style={{ background: WARM }}>
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em]" style={{ color: MUTED }}>{t("Conversation node")}</span>
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em]" style={{ color: MUTED }}>{t("Resolution rate")}</span>
        <span className="text-right text-[11.5px] font-semibold uppercase tracking-[0.06em]" style={{ color: MUTED }}>{t("Sessions")}</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={`${r.node}-${i}`}
          className="grid grid-cols-[1fr_236px_104px] items-center px-5 py-[13px]"
          style={{ borderTop: `1px solid ${LINE}`, background: r.low ? RED_BG : "#fff" }}
        >
          <span className="truncate pr-6 text-[13px]" style={{ color: r.low ? RED_TX : BODY, fontWeight: r.low ? 600 : 400 }}>{r.node}</span>
          <span className="flex items-center gap-[10px]">
            <span className="h-[8px] flex-1 overflow-hidden rounded-full" style={{ background: r.low ? "rgba(156,43,34,0.16)" : "rgba(0,0,0,0.07)" }}>
              <span className="block h-full rounded-full" style={{ width: `${r.rate}%`, background: r.low ? RED_TX : INK }} />
            </span>
            <span className="w-[54px] shrink-0 text-right text-[13px] font-semibold tabular-nums" style={{ color: r.low ? RED_TX : INK }}>{r.rate.toFixed(2)}%</span>
          </span>
          <span className="text-right text-[13px] tabular-nums" style={{ color: MUTED }}>{r.sessions}</span>
        </div>
      ))}
    </div>
  );
}

// Persona portrait. Drawn, not photographed — the deck shows three real
// interviewees, and a designed portrait identifies them without putting an
// unrelated stranger's face on someone's research.
function Avatar({ variant }: { variant: 0 | 1 | 2 }) {
  const tint = ["#e4e8ef", "#efe9e4", "#e3ecea"][variant];
  const skin = "rgba(29,29,31,0.46)";
  const shoulder = ["rgba(29,29,31,0.74)", "rgba(29,29,31,0.62)", "rgba(29,29,31,0.82)"][variant];
  // Three silhouettes with clearly different hair, so the personas read as three
  // distinct people rather than one repeated icon.
  const hair: Record<number, React.ReactNode> = {
    // close-cropped, with a short beard line
    0: (
      <>
        <path d="M19 28 C19 16 45 16 45 28 C45 22 40 19 32 19 C24 19 19 22 19 28 Z" fill={INK} />
        <path d="M22 33 C22 43 27 46 32 46 C37 46 42 43 42 33 C42 40 37 42 32 42 C27 42 22 40 22 33 Z" fill={INK} opacity="0.35" />
      </>
    ),
    // long hair falling past the jaw, swept to one side
    1: (
      <path
        d="M18 30 C18 15 46 15 46 32 L46 45 L41 45 L41 27 C41 22 37 19 31 19 C25 19 22 23 22 29 L22 45 L18 45 Z"
        fill={INK}
      />
    ),
    // tied up, with a visible bun
    2: (
      <>
        <circle cx="32" cy="12" r="5" fill={INK} />
        <path d="M19 29 C19 17 45 17 45 29 C45 23 40 20 32 20 C24 20 19 23 19 29 Z" fill={INK} />
      </>
    ),
  };
  return (
    <svg width="62" height="62" viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <defs>
        <clipPath id={`scb-av-${variant}`}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="32" fill={tint} />
      <g clipPath={`url(#scb-av-${variant})`}>
        <path d="M10 62 C10 48 20 42 32 42 C44 42 54 48 54 62 Z" fill={shoulder} />
        <path d="M28 36 h8 v7 h-8 Z" fill={skin} />
        <circle cx="32" cy="29" r="12.5" fill={skin} />
        {hair[variant]}
      </g>
    </svg>
  );
}

function PersonaCard({
  variant, name, role, market, bio, needs, frustration,
}: { variant: 0 | 1 | 2; name: string; role: string; market: string; bio: string; needs: string; frustration?: string }) {
  const t = useT();
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[18px] p-6" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
      <div className="flex items-center gap-4">
        <Avatar variant={variant} />
        <div className="min-w-0">
          <h3 className="text-[16px] font-semibold leading-[1.25]" style={{ color: INK }}>{name}</h3>
          <p className="mt-[3px] text-[11.5px] leading-[1.35]" style={{ color: MUTED }}>{role}</p>
          <span className="mt-[6px] inline-block rounded-full px-[9px] py-[2px] text-[11px] font-medium" style={{ background: WARM, color: INK }}>{market}</span>
        </div>
      </div>
      <p className="text-[12.5px] leading-[1.5]" style={{ color: BODY }}>{bio}</p>
      <div className="mt-auto flex flex-col gap-[10px] border-t pt-4" style={{ borderColor: LINE }}>
        <div>
          <Eyebrow>{t("Needs & goals")}</Eyebrow>
          <p className="mt-[3px] text-[12.5px] leading-[1.45]" style={{ color: INK }}>{needs}</p>
        </div>
        {frustration && (
          <div>
            <Eyebrow>{t("Frustration")}</Eyebrow>
            <p className="mt-[3px] text-[12.5px] leading-[1.45]" style={{ color: BODY }}>{frustration}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// What each role actually faces on screen today, as a glyph: a canvas too dense
// to search, metrics with no shape, and a node whose upstream is untraceable.
function PainGlyph({ kind }: { kind: "crowded" | "metrics" | "trace" }) {
  const box = "h-[108px] w-full overflow-hidden rounded-[12px]";
  if (kind === "crowded") {
    const dots = Array.from({ length: 84 }, (_, i) => i);
    return (
      <div className={box} style={{ background: "#fbfbfc", border: `1px solid ${LINE}` }}>
        <div className="grid h-full content-center gap-[5px] px-4" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
          {dots.map((i) => (
            <span key={i} className="block h-[6px] rounded-full" style={{ background: "rgba(29,29,31,0.22)" }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "metrics") {
    return (
      <div className={box} style={{ background: "#fbfbfc", border: `1px solid ${LINE}` }}>
        <div className="flex h-full items-end gap-[10px] px-5 pb-5 pt-5">
          {[38, 70, 24, 56, 88, 44].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: "rgba(29,29,31,0.16)" }} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={box} style={{ background: "#fbfbfc", border: `1px solid ${LINE}` }}>
      <svg className="h-full w-full" viewBox="0 0 300 108" fill="none" aria-hidden>
        {[22, 44, 66, 88].map((y, i) => (
          <path key={i} d={`M24 ${y} C110 ${y} 120 54 196 54`} stroke="rgba(29,29,31,0.24)" strokeWidth="1.3" />
        ))}
        <circle cx="196" cy="54" r="11" fill={RED_BG} stroke={RED_BG_STRONG} />
        <path d="M207 54 H268" stroke="rgba(29,29,31,0.24)" strokeWidth="1.3" />
      </svg>
    </div>
  );
}

function PainPointCard({
  glyph, role, pain, expectation,
}: { glyph: "crowded" | "metrics" | "trace"; role: string; pain: string; expectation: string }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-4">
      <PainGlyph kind={glyph} />
      <h3 className="text-[15px] font-semibold leading-[1.3] [text-wrap:balance]" style={{ color: INK }}>{role}</h3>
      <div className="flex flex-col gap-[10px]">
        <div>
          <Eyebrow>{t("Today")}</Eyebrow>
          <p className="mt-[3px] text-[13px] leading-[1.5]" style={{ color: BODY }}>{pain}</p>
        </div>
        <div>
          <Eyebrow>{t("Expectation")}</Eyebrow>
          <p className="mt-[3px] text-[13px] font-medium leading-[1.5]" style={{ color: INK }}>{expectation}</p>
        </div>
      </div>
    </div>
  );
}

// Lo-fi wireframes of the two entry-point options tested in interviews.
function EntryOptionArt({ kind }: { kind: "dedicated" | "inline" }) {
  const shell = { background: "#fbfbfc", border: `1px solid ${LINE}` };
  if (kind === "dedicated") {
    return (
      <div className="relative h-[250px] overflow-hidden rounded-[14px]" style={shell}>
        <div className="flex h-[26px] items-center gap-[6px] border-b px-[14px]" style={{ borderColor: LINE }}>
          {[0, 1, 2].map((i) => <span key={i} className="h-[5px] w-[5px] rounded-full" style={{ background: "#d2d2d7" }} />)}
        </div>
        <div className="flex h-[calc(100%-26px)] items-center justify-center px-8">
          <div className="w-full rounded-[10px] border bg-white px-5 py-5" style={{ borderColor: LINE }}>
            <span className="block h-[7px] w-[46%] rounded-full" style={{ background: "rgba(29,29,31,0.22)" }} />
            <span className="mt-[9px] block h-[7px] w-[72%] rounded-full" style={{ background: "rgba(29,29,31,0.12)" }} />
            <span className="mt-[18px] flex h-[30px] w-[132px] items-center justify-center rounded-[7px] text-[11px] font-semibold text-white" style={{ background: INK }}>
              Diagnose
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-[250px] overflow-hidden rounded-[14px]" style={{ ...shell, backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)", backgroundSize: "15px 15px" }}>
      <div className="absolute inset-x-0 top-0 flex h-[26px] items-center gap-[6px] border-b bg-white px-[14px]" style={{ borderColor: LINE }}>
        {[0, 1, 2].map((i) => <span key={i} className="h-[5px] w-[5px] rounded-full" style={{ background: "#d2d2d7" }} />)}
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 250" fill="none" aria-hidden>
        <path d="M150 96 V118" stroke={LINE} strokeWidth="1.2" />
        <path d="M150 154 C150 176 104 176 104 194" stroke={LINE} strokeWidth="1.2" />
        <path d="M150 154 C150 176 196 176 196 194" stroke={LINE} strokeWidth="1.2" />
      </svg>
      <span className="absolute left-1/2 top-[72px] h-[24px] w-[88px] -translate-x-1/2 rounded-[5px]" style={{ background: INK }} />
      <span className="absolute left-1/2 top-[118px] h-[36px] w-[104px] -translate-x-1/2 rounded-[6px] border bg-white" style={{ borderColor: LINE }} />
      <span className="absolute left-[18%] top-[194px] h-[28px] w-[70px] rounded-[6px] border bg-white" style={{ borderColor: LINE }} />
      <span className="absolute right-[18%] top-[194px] h-[28px] w-[70px] rounded-[6px] border bg-white" style={{ borderColor: LINE }} />
      <span
        className="absolute right-[14px] top-[40px] flex h-[26px] items-center gap-[6px] rounded-full px-[11px] text-[10.5px] font-semibold"
        style={{ background: INK, color: "#fff" }}
      >
        <span className="h-[5px] w-[5px] rounded-full" style={{ background: RED_BG_STRONG }} />
        Diagnose
      </span>
    </div>
  );
}

function TradeoffColumn({
  tag, title, pros, cons, chosen,
}: { tag: string; title: string; pros: string; cons: string; chosen?: boolean }) {
  const t = useT();
  return (
    <div className="flex flex-1 flex-col gap-[10px]">
      <div className="flex items-baseline gap-3">
        <Eyebrow color={INK}>{tag}</Eyebrow>
        {chosen && (
          <span className="rounded-full px-[9px] py-[2px] text-[10.5px] font-semibold" style={{ background: INK, color: "#fff" }}>{t("Chosen")}</span>
        )}
      </div>
      <h3 className="text-[15px] font-semibold leading-[1.3] [text-wrap:balance]" style={{ color: INK }}>{title}</h3>
      <div className="flex flex-col gap-[6px]">
        <div className="flex gap-[9px]">
          <span className="mt-[4px] shrink-0 text-[11px] font-semibold leading-none" style={{ color: INK }}>+</span>
          <p className="text-[12.5px] leading-[1.45]" style={{ color: BODY }}>{pros}</p>
        </div>
        <div className="flex gap-[9px]">
          <span className="mt-[4px] shrink-0 text-[11px] font-semibold leading-none" style={{ color: MUTED }}>−</span>
          <p className="text-[12.5px] leading-[1.45]" style={{ color: MUTED }}>{cons}</p>
        </div>
      </div>
    </div>
  );
}

// Resolution rate, decomposed. Each ring cluster is one depth of diagnosis, and
// the metrics inside it are the ones that user type can actually act on —
// the step from a business metric to three concrete design targets.
function RingCluster({
  label, metrics, emphasis,
}: { label: string; metrics: string[]; emphasis?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="relative h-[190px] w-[190px]">
        {[190, 136, 96].map((d, i) => (
          <span
            key={d}
            className="absolute rounded-full"
            style={{
              width: d, height: d, left: (190 - d) / 2, top: (190 - d) / 2,
              border: `1px solid ${emphasis ? "rgba(29,29,31,0.3)" : LINE}`,
              background: emphasis ? `rgba(29,29,31,${0.03 + i * 0.03})` : `rgba(29,29,31,${0.015 + i * 0.02})`,
            }}
          />
        ))}
        <span className="absolute inset-0 flex items-center justify-center px-7 text-center text-[14px] font-semibold leading-[1.25]" style={{ color: INK }}>
          {label}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {metrics.map((m) => (
          <span key={m} className="rounded-full px-[11px] py-[5px] text-[12px] font-medium" style={{ background: WARM, color: INK }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

// Jobs-to-be-done table: Situation / Motivation / Expected outcome / What it took,
// one row per lifecycle stage (Create / Launch / Monitor / Modify).
function JTBDTable({
  cols, rows,
}: { cols: string[]; rows: { stage: string; cells: string[] }[] }) {
  return (
    <div className="overflow-hidden rounded-[16px]" style={{ border: `1px solid ${LINE}` }}>
      <div className="grid grid-cols-[96px_repeat(4,1fr)]" style={{ background: WARM }}>
        <div className="px-5 py-4" />
        {cols.map((c) => (
          <div key={c} className="border-l px-5 py-4 text-[12.5px] font-semibold uppercase tracking-[0.04em]" style={{ borderColor: LINE, color: MUTED }}>{c}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.stage} className="grid grid-cols-[96px_repeat(4,1fr)]" style={i > 0 ? { borderTop: `1px solid ${LINE}` } : undefined}>
          <div className="flex items-center px-5 py-5 text-[14px] font-semibold" style={{ color: INK }}>{r.stage}</div>
          {r.cells.map((c, j) => (
            <div key={j} className="border-l px-5 py-5 text-[13.5px] leading-[1.55]" style={{ borderColor: LINE, color: j === r.cells.length - 1 ? INK : BODY, fontWeight: j === r.cells.length - 1 ? 500 : 400 }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PanelShot({
  shot, onOpen, group, cropHeight, zoomWidth, fillHeight,
}: { shot: Shot; onOpen: OpenLightbox; group?: Shot[]; cropHeight?: number; zoomWidth?: number; fillHeight?: boolean }) {
  const items = group ?? [shot];
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onOpen(items, Math.max(0, items.indexOf(shot))); }}
      aria-label={`Enlarge: ${shot.alt}`}
      className={`block w-full cursor-zoom-in overflow-hidden rounded-[20px] text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black${fillHeight ? " h-full" : ""}`}
      style={{ background: "#0a0a0a", boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 24px 48px -28px rgba(0,0,0,0.35)" }}
    >
      {/* zoomWidth renders the image larger than its frame and anchors it top-left,
          so a screenshot whose meaningful content sits in one corner can be shown
          at readable scale instead of shrunk to fit around empty canvas. */}
      {zoomWidth ? (
        <span className="relative block overflow-hidden" style={{ height: cropHeight }}>
          <img src={shot.src} alt={shot.alt} className="absolute left-0 top-0 block max-w-none" style={{ width: zoomWidth }} draggable={false} />
        </span>
      ) : fillHeight ? (
        /* fills the button's actual (flex-stretched) height exactly, so there is
           no leftover gap above/below the image when the row is taller than any
           fixed crop height — unlike cropHeight, which can leave the button's own
           dark background visible as a band if the row grows taller than it. */
        <img src={shot.src} alt={shot.alt} className="block h-full w-full object-cover object-top" draggable={false} />
      ) : cropHeight ? (
        <img src={shot.src} alt={shot.alt} className="block w-full object-cover object-top" style={{ height: cropHeight }} draggable={false} />
      ) : (
        <img src={shot.src} alt={shot.alt} className="block h-auto w-full" draggable={false} />
      )}
    </button>
  );
}

// ── Project navigation (shared pattern with /growth-daily-presentation) ────
const PROJECTS: { name: string; href?: string }[] = [
  { name: "SeedFlow", href: "/seedflow-presentation" },
  { name: "Shopee AI Chatbot Builder" },
  { name: "AI Mascot Platform", href: "/seedflow-presentation" },
  { name: "Growth Daily", href: "/growth-daily-presentation" },
];

// ── Shots ─────────────────────────────────────────────────────────────────
const FLOW_BUILDER: Shot = { src: `${IMG}/scb-flowbuilder.webp`, alt: "Shopee Chatbot Admin, Flow Builder canvas with a node box panel open", caption: "Shopee Chatbot Builder — the drag-and-drop Flow Builder canvas" };
const CHAT_SHOT_A: Shot = { src: `${IMG}/scb-chat-1.webp`, alt: "Shopee in-app chatbot on mobile: greeting and a list of suggested questions", caption: "Shopee chatbot, in the buyer app — suggested questions" };
const CHAT_SHOT_B: Shot = { src: `${IMG}/scb-chat-2.webp`, alt: "Shopee in-app chatbot on mobile: an order-details conversation with order cards and delivery status", caption: "Shopee chatbot, in the buyer app — an order-details conversation" };
const SYSTEM_SHOT: Shot = { src: `${IMG}/scb-system-diagnostics.webp`, alt: "System Diagnostics view: dependency, content and logic issue breakdown", caption: "System Diagnostics — dependency, content and logic issues" };
const PATH_SHOT: Shot = { src: `${IMG}/scb-path-diagnostics.webp`, alt: "Path Diagnostics: ranked conversation paths with traffic, loss rate and CSAT", caption: "Senior User · Path Diagnostics — ranked conversation paths with traffic, loss rate and CSAT" };
const NODE_SHOT: Shot = { src: `${IMG}/scb-node-diagnostics.webp`, alt: "Node Diagnostics view: issue content shown in context for a single node", caption: "Node Diagnostics — issue content, in context" };
// ── Chapter map (6 narrative sections across 14 slides) ──────────────────────
const CHAPTERS = ["Context", "Business problem", "Interaction architecture", "UX research", "Design decisions", "Impact & reflection"] as const;
const SLIDE_CHAPTER = [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5];

// ── Cover visual ────────────────────────────────────────────────────────────
// The cover inverts the deck: one dark, full-bleed frame that the following
// thirteen white pages open out of. The node graph is the same Flow Builder
// structure used throughout (the node-type names are the product's real ones),
// rendered as a dark product panel and tilted in perspective so the canvas
// reads as an object rather than a flat diagram.
const COVER_BG = "#09090b";

function HeroNode({
  x, y, w, label, sub, tone = "default",
}: { x: number; y: number; w: number; label: string; sub?: string; tone?: "default" | "start" | "accent" }) {
  const base =
    tone === "start"
      ? { background: "#ffffff", color: "#09090b", border: "none", boxShadow: "0 18px 40px -22px rgba(255,255,255,0.5)" }
      : tone === "accent"
        ? { background: "rgba(238,77,45,0.16)", color: "#ffd9d0", border: "1px solid rgba(238,77,45,0.5)", boxShadow: "0 18px 44px -24px rgba(238,77,45,0.6)" }
        : { background: "rgba(255,255,255,0.055)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.13)", boxShadow: "0 18px 40px -26px rgba(0,0,0,0.9)" };
  return (
    <div
      className="absolute flex flex-col items-center justify-center rounded-[14px] px-5 text-center"
      style={{
        left: x, top: y, width: w,
        height: tone === "start" ? 48 : 68,
        transform: "translate(-50%, -50%)",
        backdropFilter: "blur(6px)",
        ...base,
      }}
    >
      <span className="text-[14.5px] font-semibold leading-[1.2]">{label}</span>
      {sub && (
        <span
          className="mt-[3px] text-[11.5px] leading-[1.2]"
          style={{ color: tone === "accent" ? "rgba(255,217,208,0.72)" : "rgba(255,255,255,0.46)" }}
        >{sub}</span>
      )}
    </div>
  );
}

function HeroCanvas() {
  const t = useT();
  const W = 760;
  const H = 476;
  return (
    <div
      className="relative w-[760px] shrink-0 overflow-hidden rounded-[26px]"
      style={{
        background: "linear-gradient(158deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.035) 42%, rgba(255,255,255,0.015) 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 60px 120px -50px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}
    >
      <div className="flex items-center gap-[11px] px-6 py-[17px]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="h-[17px] w-[17px] shrink-0 rounded-[5px]" style={{ background: "#ee4d2d" }} />
        <span className="text-[13.5px] font-medium text-white">Shopee Chatbot Admin</span>
        <span className="h-[3px] w-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
        <span className="text-[13.5px]" style={{ color: "rgba(255,255,255,0.45)" }}>Solution-based Bot</span>
        <span className="ml-auto flex gap-[6px]">
          {[0, 1, 2].map((i) => <span key={i} className="h-[6px] w-[6px] rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />)}
        </span>
      </div>

      <div
        className="relative"
        style={{
          height: H,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.075) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden>
          <defs>
            <linearGradient id="scb-hero-accent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(238,77,45,0.15)" />
              <stop offset="100%" stopColor="rgba(238,77,45,0.85)" />
            </linearGradient>
          </defs>
          <path d={`M${W / 2},66 L${W / 2},106`} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <path d={`M${W / 2},174 L${W / 2},214`} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <path d={`M${W / 2},282 C${W / 2},318 ${W * 0.265},318 ${W * 0.265},358`} stroke="url(#scb-hero-accent)" strokeWidth="1.8" />
          <path d={`M${W / 2},282 C${W / 2},318 ${W * 0.735},318 ${W * 0.735},358`} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="5 5" />
        </svg>
        <HeroNode x={W / 2} y={42} w={156} label={t("Welcome message")} tone="start" />
        <HeroNode x={W / 2} y={140} w={208} label={t("Clarification")} sub={t("Standard Node")} />
        <HeroNode x={W / 2} y={248} w={208} label={t("Conditions")} sub={t("Custom Node")} />
        <HeroNode x={W * 0.265} y={392} w={196} label={t("Answer · Option A")} sub={t("Preset Node")} tone="accent" />
        <HeroNode x={W * 0.735} y={392} w={196} label={t("Answer · Option B")} />
      </div>
    </div>
  );
}

// ── 01 · Context — cover ─────────────────────────────────────────────────────
function Slide01() {
  const t = useT();
  const meta = [
    { k: t("Role"), v: t("Senior Product Designer · Sole designer on the project") },
    { k: t("Collaboration"), v: t("1 business manager (SG) · 1 product manager (China) · 4 engineers") },
    { k: t("Duration"), v: t("2022–2023") },
    { k: t("Main users"), v: t("Operation teams in Southeast Asia and Brazil") },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: COVER_BG }}>
      {/* layered light: a warm key from the upper right, a cool fill from the lower left */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(66% 58% at 78% 22%, rgba(238,77,45,0.17) 0%, rgba(238,77,45,0.04) 40%, transparent 72%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 56% at 2% 94%, rgba(104,132,255,0.13) 0%, transparent 66%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* the canvas, tilted and bleeding off the right edge */}
      <div
        className="absolute"
        style={{ left: 908, top: 150, transformOrigin: "left center", transform: "perspective(2000px) rotateY(-15deg) rotateX(5deg) scale(1.04)" }}
      >
        <HeroCanvas />
      </div>

      <div className="absolute inset-y-0 left-0 flex w-[888px] flex-col justify-between pb-[100px] pl-[144px] pr-[60px] pt-[100px]">
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-[34px]" style={{ background: "rgba(255,255,255,0.3)" }} />
          <p className="text-[13px] font-medium tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.5)" }}>
            01 · {t("Context")}
          </p>
        </div>

        <div className="flex flex-col">
          <h1
            className="text-[80px] font-semibold leading-[1.0] tracking-[-0.038em] [text-wrap:balance]"
            style={{ color: "#fff" }}
          >
            {t("From complexity to clarity.")}
          </h1>
          <span className="mt-7 block h-[3px] w-[76px] rounded-full" style={{ background: "#ee4d2d" }} />
          <p className="mt-7 max-w-[620px] text-[18px] font-medium leading-[1.55]" style={{ color: "rgba(255,255,255,0.88)" }}>
            {t("Turning complex customer-service conversation logic into a visual system that operation teams can build and manage on their own.")}
          </p>
          <p className="mt-3 max-w-[600px] text-[14.5px] leading-[1.6] [text-wrap:balance]" style={{ color: "rgba(255,255,255,0.46)" }}>
            {t("An internal platform supporting large-scale chatbot operations across multiple markets.")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-5">
          {meta.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-[6px] border-t pt-[13px]" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.4)" }}>{k}</p>
              <p className="text-[13.5px] leading-[1.45]" style={{ color: "rgba(255,255,255,0.9)" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 02 · Context — scale ──────────────────────────────────────────────────────
// Composition follows the original Figma page: a text column on the left and two
// tall panels on the right. The panels are drawn conversation streams, not
// screenshots — they stand in for the sheer volume the paragraph describes, and
// fade out at the top so the stream reads as endless.
function Slide02({ onOpen }: { onOpen: OpenLightbox }) {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>02 · {t("Context")}</Tag>

      <div className="mt-7 grid flex-1 grid-cols-[1fr_584px] gap-14">
        <div className="flex flex-col">
          <h2 className="[text-wrap:balance] text-[38px] font-semibold leading-[1.12] tracking-[-0.022em]" style={{ color: INK }}>
            {t("Shopee Chatbot: Managing Large-Scale Support Operations")}
          </h2>

          <p className="mt-9 max-w-[660px] text-[17px] leading-[1.75]" style={{ color: BODY }}>
            {t("Shopee, as the largest e-commerce platform in Southeast Asia, handles a huge volume of queries. During the 9.9 campaign, Shopee's chatbot handled")}{" "}
            <span className="font-semibold tabular-nums" style={{ fontSize: 34, lineHeight: 1, color: INK }}>545,226</span>{" "}
            {t("queries per day. (2022)")}
          </p>

          <div className="mt-11 border-t pt-8" style={{ borderColor: LINE }}>
            <Eyebrow color={INK}>{t("Behind the screen")}</Eyebrow>
            <p className="mt-4 max-w-[660px] text-[16px] leading-[1.75]" style={{ color: BODY }}>
              {t("The conversations are crafted by operators (main users). These operators design the conversation flows, defining what the chatbot says, asks, and how it responds based on user input.")}
            </p>
          </div>
        </div>

        <div className="flex items-stretch gap-5">
          <PanelShot shot={CHAT_SHOT_A} onOpen={onOpen} group={[CHAT_SHOT_A, CHAT_SHOT_B]} fillHeight />
          <PanelShot shot={CHAT_SHOT_B} onOpen={onOpen} group={[CHAT_SHOT_A, CHAT_SHOT_B]} fillHeight />
        </div>
      </div>

      <Takeaway>{t("At that volume, a manual, engineering-dependent workflow could not keep pace.")}</Takeaway>
    </div>
  );
}

// ── 03 · Business problem — the old delivery cycle ───────────────────────────
function Slide03() {
  const t = useT();
  const segments = [
    { label: t("Raise requirement"), sub: t("2–4 weeks"), owner: t("Operations → Engineering"), w: 3 },
    { label: t("Draft the flow"), sub: t("2 weeks"), owner: t("Operations · Excel / DrawIO"), w: 2 },
    { label: t("Dev & test"), sub: t("2 weeks"), owner: t("Engineering"), w: 2 },
    { label: t("Back-and-forth edits"), sub: t("by email"), owner: t("Operations ⇄ Engineering"), w: 1.6, rework: true },
  ];
  return (
    <div className={FRAME}>
      <Tag>03 · {t("Business problem")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Nine weeks to change what a bot says.")}
      </h2>

      <div className="mt-7 flex flex-1 flex-col justify-center gap-8">
        <div className="grid grid-cols-[1fr_330px] items-center gap-14">
          <div>
            <div className="mb-4 flex items-baseline gap-4">
              <p className="text-[52px] font-semibold leading-[1] tracking-[-0.03em]" style={{ color: INK }}>7–9</p>
              <p className="text-[14px] leading-[1.45]" style={{ color: MUTED }}>
                {t("weeks from requirement to go-live, before Flow Builder.")}
              </p>
            </div>
            <StackedCycle segments={segments} />
          </div>

          <div className="flex flex-col gap-4 rounded-[18px] p-6" style={{ background: WARM }}>
            <p className="text-[17px] font-medium leading-[1.5] [text-wrap:balance]" style={{ color: INK }}>
              {t("“9 weeks, dozens of emails, and countless back-and-forths, and the chatbot still wasn't live.”")}
            </p>
            <p className="text-[12.5px]" style={{ color: MUTED }}>{t("— from internal operation staff")}</p>
            <div className="border-t pt-4" style={{ borderColor: LINE }}>
              <EnvelopeRow n={36} />
            </div>
          </div>
        </div>
      </div>

      <Takeaway>{t("Every wording change had to travel through an engineering queue before it reached a user.")}</Takeaway>
    </div>
  );
}

// ── 04 · Business problem — the lifecycle I mapped ───────────────────────────
function Slide04() {
  const t = useT();
  const lifecycle = [
    { label: t("Create"), note: t("draft and build a flow") },
    { label: t("Launch"), note: t("deploy to a market") },
    { label: t("Monitor"), note: t("watch it in production") },
    { label: t("Modify"), note: t("fix and iterate") },
  ];
  const jtbdCols = [t("Situation"), t("Motivation"), t("Expected outcome"), t("What it took")];
  const jtbdRows = [
    { stage: t("Create"), cells: [t("When I need to create a new chatbot conversation,"), t("I want to draft the structure and content visually,"), t("so I can build conversations without technical knowledge."), t("Visual flow builder, ready-made templates.")] },
    { stage: t("Launch"), cells: [t("Ready to launch,"), t("I want to deploy with confidence and monitoring,"), t("so I can ensure proper market implementation."), t("Staging & production environments, version control.")] },
    { stage: t("Monitor"), cells: [t("Once my chatbot is live,"), t("I want to track how it's performing in real time,"), t("so I can catch issues before users complain."), t("Real-time analytics across Path / Node / System views.")] },
    { stage: t("Modify"), cells: [t("When something isn't working as expected,"), t("I want to quickly find the issue and make targeted changes,"), t("so I can iterate faster, continuously."), t("In-place editing, with before/after comparison.")] },
  ];
  return (
    <div className={FRAME}>
      <Tag>04 · {t("Business problem")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("No one had mapped the lifecycle. So I did.")}
      </h2>

      <div className="mt-6 flex flex-1 flex-col justify-center gap-6">
        <div className="grid grid-cols-[1fr_356px] items-start gap-14">
          <div>
            <SectionLabel>{t("My framing — four stages, one owner per job")}</SectionLabel>
            <div className="mt-4">
              <LifecycleLoop steps={lifecycle} activeIndex={0} />
            </div>
          </div>
          <div className="flex flex-col gap-3 border-l-2 pl-6" style={{ borderColor: INK }}>
            <p className="text-[15px] font-medium leading-[1.55]" style={{ color: INK }}>
              {t("The business tracked requests one at a time. I reconstructed the whole lifecycle, then turned each stage into a job to be done.")}
            </p>
            <p className="text-[13px] leading-[1.55]" style={{ color: BODY }}>
              {t("That framing is what let us argue for scope: Create was the costliest stage, so it shipped first — and the table below became how we prioritized everything after it.")}
            </p>
          </div>
        </div>

        <JTBDTable cols={jtbdCols} rows={jtbdRows} />
      </div>

      <Takeaway>{t("Understand the full business chain first, then find the bottleneck most worth solving.")}</Takeaway>
    </div>
  );
}

// ── 05 · Interaction architecture — why visual ───────────────────────────────
// The decision on its own: three options, equal width, equal weight, one
// clearly chosen. What it shipped into moved to its own slide (06) so both
// get room to breathe instead of sharing one cramped frame.
function Slide05() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>05 · {t("Interaction architecture")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Three ways to author a flow. Only one fit the operators.")}
      </h2>

      <div className="flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-3 gap-6">
          <OptionCard
            art="form"
            label={t("Form-based builder")}
            verdict={t("Too limited")}
            points={[
              { ok: true, text: t("Simple interface.") },
              { ok: false, text: t("Limited visibility of the dialogue structure.") },
            ]}
          />
          <OptionCard
            art="script"
            label={t("Script-based builder")}
            verdict={t("Too technical")}
            points={[
              { ok: true, text: t("Flexible for technical users.") },
              { ok: false, text: t("High learning curve for non-technical teams.") },
            ]}
          />
          <OptionCard
            art="canvas"
            chosen
            label={t("Drag-and-drop builder")}
            verdict={t("Chosen")}
            points={[
              { ok: true, text: t("Visual, intuitive interface with a clear dialogue structure.") },
              { ok: true, text: t("Real-time mobile preview reduces errors before launch.") },
            ]}
          />
        </div>
      </div>

      <Takeaway>{t("Complex logic needs to be seen — not hidden inside code or forms.")}</Takeaway>
    </div>
  );
}

// ── 06 · Interaction architecture — what shipped from the decision ───────────
// The chosen builder, shown at real size, next to the cycle-time payoff the
// decision on the previous slide bought.
function Slide06({ onOpen }: { onOpen: OpenLightbox }) {
  const t = useT();
  const features = [
    { title: t("Visual node builder"), desc: t("Flows are built from blocks for Q&A and logic.") },
    { title: t("Lines as logic"), desc: t("Arrows connect nodes and define the process — no code.") },
    { title: t("Real-time preview"), desc: t("The right panel shows the chat exactly as mobile renders it.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>06 · {t("Interaction architecture")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("v1.0 shipped — and flow creation dropped from 7–9 weeks to 2–4.")}
      </h2>

      <div className="mt-9 grid flex-1 grid-cols-[860px_1fr] items-start gap-14">
        <div className="flex flex-col gap-[14px]">
          <SectionLabel>{t("What shipped — v1.0")}</SectionLabel>
          <PanelShot shot={FLOW_BUILDER} onOpen={onOpen} cropHeight={433} />
        </div>

        <div className="flex h-full flex-col">
          <SectionLabel>{t("Delivery cycle")}</SectionLabel>
          <div className="mt-[14px] flex items-baseline gap-4">
            <p className="text-[40px] font-semibold leading-[1] tracking-[-0.03em]" style={{ color: INK }}>{t("2–4 weeks")}</p>
            <p className="text-[15px] line-through" style={{ color: MUTED }}>{t("7–9 weeks")}</p>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.55]" style={{ color: BODY }}>
            {t("After v1.0 shipped, creating and releasing a conversation flow dropped from 7–9 weeks to 2–4.")}
          </p>
          <div className="mt-6 flex flex-col gap-[14px] border-t pt-6" style={{ borderColor: LINE }}>
            {features.map((f) => (
              <div key={f.title} className="flex gap-[13px]">
                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: INK }} />
                <div>
                  <h3 className="text-[14px] font-semibold leading-[1.3]" style={{ color: INK }}>{f.title}</h3>
                  <p className="mt-[2px] text-[12.5px] leading-[1.45]" style={{ color: BODY }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Takeaway>{t("Shipping the right interaction model paid back immediately, in cycle time.")}</Takeaway>
    </div>
  );
}

// ── 07 · Interaction architecture — what I shipped, 0 → 1.6 ──────────────────
function Slide07() {
  const t = useT();
  const headline = [
    { value: "200+", label: t("key screens shipped") },
    { value: "300+", label: t("components in the design system") },
    { value: "6", label: t("releases, 0 → 1.6") },
    { value: "1", label: t("designer on the project") },
  ];
  const stages = [
    { version: "v1.0", title: t("MVP"), count: "40+", bar: 40, detail: t("Drag-and-drop canvas, node types, real-time preview.") },
    { version: "v1.1–1.2", title: t("Create & publish flow"), count: "20+", bar: 20, detail: t("10+ high-frequency templates and multi-condition nodes, lifting scenario coverage by 60%.") },
    { version: "v1.3–1.4", title: t("Troubleshooting"), count: "20+", bar: 20, detail: t("Intelligent assistance and a more personalized experience.") },
    { version: "v1.5–1.6", title: t("Design system"), count: "10+", bar: 10, detail: t("Standardized and scaled to 300+ business-specific components.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>07 · {t("Interaction architecture")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("From a blank canvas to a 300-component system, 0 → 1.6.")}
      </h2>

      <div className="mt-8 flex flex-1 flex-col justify-center gap-10">
        <div className="grid grid-cols-4 gap-6">
          {headline.map((h) => (
            <div key={h.label} className="flex flex-col gap-2">
              <p className="text-[56px] font-semibold leading-[0.95] tracking-[-0.03em]" style={{ color: INK }}>{h.value}</p>
              <p className="text-[13.5px] leading-[1.45]" style={{ color: MUTED }}>{h.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-9" style={{ borderColor: LINE }}>
          <SectionLabel>{t("Features shipped per release — scope tapering as the platform matured")}</SectionLabel>
          <div className="mt-6">
            <ReleaseRail stages={stages} />
          </div>
        </div>
      </div>

      <Takeaway>{t("Scope grows in stages — ship the core job first, earn the rest.")}</Takeaway>
    </div>
  );
}

// ── 08 · UX research — the next challenge ────────────────────────────────────
function Slide08() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>08 · {t("UX research")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Operators could publish a flow. They still couldn't tell why it failed.")}
      </h2>

      <div className="mt-8 grid flex-1 grid-cols-[1fr_1fr] items-center gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6 rounded-[18px] px-7 py-6" style={{ background: WARM }}>
            <div className="shrink-0">
              <Eyebrow>{t("All they had")}</Eyebrow>
              <p className="mt-1 text-[44px] font-semibold leading-[1] tracking-[-0.03em]" style={{ color: INK }}>58.6%</p>
              <p className="text-[12px]" style={{ color: MUTED }}>{t("Resolution rate")}</p>
            </div>
            <div className="flex flex-1 flex-col gap-[9px]">
              <UnknownCard q={t("Which node is losing people?")} />
              <UnknownCard q={t("Is it the content, the logic, or a broken link?")} />
              <UnknownCard q={t("What changed since last week?")} />
            </div>
          </div>
          <div className="flex gap-8">
            <p className="flex-1 border-l-2 pl-5 text-[14px] font-medium leading-[1.5] [text-wrap:balance]" style={{ color: INK, borderColor: LINE }}>
              {t("“Resolution rate is low, but we don't know what's the problem.”")}
            </p>
            <p className="flex-1 border-l-2 pl-5 text-[14px] font-medium leading-[1.5] [text-wrap:balance]" style={{ color: INK, borderColor: LINE }}>
              {t("“Spending too much time to fix issues.”")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <SectionLabel>{t("How I investigated it")}</SectionLabel>
          <div className="flex gap-10">
            <div>
              <p className="text-[40px] font-semibold leading-[1] tracking-[-0.025em]" style={{ color: INK }}>~10</p>
              <p className="mt-1 text-[12.5px]" style={{ color: MUTED }}>{t("remote interviews & usability tests")}</p>
            </div>
            <div>
              <p className="text-[40px] font-semibold leading-[1] tracking-[-0.025em]" style={{ color: INK }}>3</p>
              <p className="mt-1 text-[12.5px]" style={{ color: MUTED }}>{t("markets — Brazil, Indonesia, Singapore")}</p>
            </div>
          </div>
          <div className="border-t pt-6" style={{ borderColor: LINE }}>
            <StepStrip steps={[
              t("Assigned each user a real task on the platform."),
              t("Recorded their on-screen behavior end to end."),
              t("Analyzed the qualitative data for shared patterns."),
            ]} />
          </div>
        </div>
      </div>

      <Takeaway>{t("Users relied on a single metric, which wasn't enough for effective diagnosis.")}</Takeaway>
    </div>
  );
}

// ── 09 · UX research — where the single metric broke down ────────────────────
function Slide09() {
  const t = useT();
  const rows = [
    { node: t("Solution-based bot · 3PL messages (to receive, after delivered)"), rate: 59.4, sessions: "7,973" },
    { node: t("Solution-based bot · Need additional help?"), rate: 59.79, sessions: "2,191" },
    { node: t("Solution-based bot · View proof of delivery"), rate: 55.73, sessions: "1,615" },
    { node: t("Solution-based bot · ACL2 exceeded > 24 hours"), rate: 8.8, sessions: "2,307", low: true },
  ];
  return (
    <div className={FRAME}>
      <Tag>09 · {t("UX research")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("One number could point at the node. Never at the cause.")}
      </h2>

      <div className="mt-8 grid flex-1 grid-cols-[1fr_340px] items-center gap-14">
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("Node resolution rates, as operators saw them")}</SectionLabel>
          <ResolutionBars rows={rows} />
          <p className="text-[12.5px]" style={{ color: MUTED }}>
            {t("Operators tracked conversation nodes with low resolution rates to optimize.")}
          </p>
        </div>

        <div className="flex flex-col gap-5 rounded-[18px] p-7" style={{ background: WARM }}>
          <div>
            <p className="text-[40px] font-semibold leading-[1] tracking-[-0.03em]" style={{ color: RED_TX }}>8.80%</p>
            <p className="mt-2 text-[13.5px] leading-[1.5]" style={{ color: INK }}>
              {t("One node resolved barely a tenth of its 2,307 sessions — six times worse than everything around it.")}
            </p>
          </div>
          <div className="border-t pt-5" style={{ borderColor: LINE }}>
            <p className="text-[13.5px] font-medium leading-[1.55]" style={{ color: INK }}>
              {t("The list says which node. It never says whether the question was unclear, the condition was broken, or the upstream path sent the wrong people here.")}
            </p>
          </div>
        </div>
      </div>

      <Takeaway>{t("A single metric could tell operators something was wrong — never what, or where.")}</Takeaway>
    </div>
  );
}

// ── 10 · UX research — personas ──────────────────────────────────────────────
function Slide10() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>10 · {t("UX research")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Across countries, languages and cultures, user behavior fell into three patterns.")}
      </h2>

      <div className="mt-8 flex flex-1 flex-col justify-center gap-4">
        <div className="flex gap-5">
          <PersonaCard
            variant={0}
            name="Ciro Sobral"
            market={t("Brazil")}
            role={t("Chatbot Local Customer Service Team")}
            bio={t("Part of the Local CS team since May 2020, moving to Chatbot Lead for Brazil in Jan 2022; tracks how the team can keep improving.")}
            needs={t("Quickly fix chatbot flows, and work more independently when creating new ones.")}
            frustration={t("Some flows are much bigger than others — the biggest frustration is finding things inside the flow editor.")}
          />
          <PersonaCard
            variant={1}
            name="Siew Hong Ma"
            market={t("Singapore")}
            role={t("Chatbot Taskbot Product Manager")}
            bio={t("A Chatbot PM since March 2020; owns the Order Taskbot and all of its feature requirements.")}
            needs={t("A quick way to implement flow improvements and track key order-bot metrics within a short timespan.")}
            frustration={t("Order taskbot flows have too many similar nodes — a lot of repetition when drawing them.")}
          />
          <PersonaCard
            variant={2}
            name="Gunn Wei Lim"
            market={t("Singapore")}
            role={t("Chatbot Regional Customer Service")}
            bio={t("Part of Regional CS since Aug 2020, moved onto chatbot work in Jul 2021; identifies user pain points and improves taskbots to better answer intent.")}
            needs={t("Make quick changes to taskbot flows on local teams' request, and eventually train them to do it themselves.")}
          />
        </div>
        <p className="text-[12px]" style={{ color: MUTED }}>
          {t("Portraits are drawn placeholders — participants' real photographs are kept out to protect privacy.")}
        </p>
      </div>

      <Takeaway>{t("Three roles, three very different relationships with the same tool.")}</Takeaway>
    </div>
  );
}

// ── 11 · UX research — pain points ───────────────────────────────────────────
function Slide11() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>11 · {t("UX research")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Same platform, different pain points by role.")}
      </h2>

      <div className="mt-9 grid flex-1 grid-cols-3 content-center gap-14">
        <PainPointCard
          glyph="crowded"
          role={t("Junior Customer Service Representatives")}
          pain={t("1,000+ paths are shown on the same page — hard to find the issue node.")}
          expectation={t("An easy-to-use, intuitive interface.")}
        />
        <PainPointCard
          glyph="metrics"
          role={t("Advanced Customer Service Representatives")}
          pain={t("Relies on node metrics (loss rate / traffic) to diagnose low resolution, but can't use them well on the platform.")}
          expectation={t("Visualize and analyze metrics systematically.")}
        />
        <PainPointCard
          glyph="trace"
          role={t("Technical Support Specialists")}
          pain={t("Hard to trace related nodes from a target node — too many paths.")}
          expectation={t("Filter down to key information for analysis.")}
        />
      </div>

      <Takeaway>{t("Different users need different levels of information and control — not one generic diagnostic view.")}</Takeaway>
    </div>
  );
}

// ── 12 · Design decisions — one panel became three modules ───────────────────
// The three modules are the page: shown as a cascade of large overlapping
// panels so the split reads as one composition instead of three thumbnails.
function ModuleCascade({ shots, labels, onOpen }: {
  shots: Shot[]; labels: { title: string; answers: string }[]; onOpen: OpenLightbox;
}) {
  const PANEL_W = 700;
  const STEP = 306;
  const PANEL_H = 390;
  // The first module sits in front, fully visible; the two behind it step back to
  // the right, so what stays uncovered is each one's right-hand side — the ranked
  // path list and the traffic annotations, which is where their content lives.
  return (
    <div className="relative w-full" style={{ height: PANEL_H + 26 }}>
      {shots.map((s, i) => (
        <button
          key={s.src}
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(shots, i); }}
          aria-label={`Enlarge: ${s.alt}`}
          className="absolute overflow-hidden rounded-[18px] text-left transition-transform duration-300 hover:-translate-y-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          style={{
            left: i * STEP,
            top: i * 13,
            width: PANEL_W,
            height: PANEL_H,
            zIndex: shots.length - i,
            background: "#0a0a0a",
            boxShadow: i === 0
              ? "0 0 0 1px rgba(0,0,0,0.08), 44px 34px 70px -34px rgba(0,0,0,0.55)"
              : "0 0 0 1px rgba(0,0,0,0.07), 30px 26px 56px -32px rgba(0,0,0,0.4)",
          }}
        >
          <img src={s.src} alt={s.alt} className="block w-full object-cover object-top" style={{ height: PANEL_H }} draggable={false} />
        </button>
      ))}
    </div>
  );
}

function ModuleLegend({ labels }: { labels: { title: string; answers: string }[] }) {
  return (
    <div className="grid gap-7" style={{ gridTemplateColumns: "700px 306px 1fr" }}>
      {labels.map((l, i) => (
        <div key={l.title} className="flex gap-[11px] pr-6">
          <span
            className="mt-[1px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
            style={{ background: INK }}
          >{i + 1}</span>
          <div>
            <h3 className="text-[14px] font-semibold leading-[1.3]" style={{ color: INK }}>{l.title}</h3>
            <p className="mt-[3px] text-[12.5px] leading-[1.45]" style={{ color: BODY }}>{l.answers}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Slide12({ onOpen }: { onOpen: OpenLightbox }) {
  const t = useT();
  const triptych: Shot[] = [SYSTEM_SHOT, PATH_SHOT, NODE_SHOT];
  const labels = [
    { title: t("System Diagnostics"), answers: t("What kind of issue is it? Logic, content or dependency.") },
    { title: t("Path Diagnostics"), answers: t("Which route is losing people? Traffic, loss rate and CSAT, ranked.") },
    { title: t("Node Diagnostics"), answers: t("What exactly is wrong here? The issue content, in context.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>12 · {t("Design decisions")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Decision A — one unified panel, or three focused modules?")}
      </h2>

      <div className="mt-6 shrink-0">
        <ModuleCascade shots={triptych} labels={labels} onOpen={onOpen} />
      </div>

      <div className="mt-5 shrink-0">
        <ModuleLegend labels={labels} />
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-2 gap-14 border-t pt-5" style={{ borderColor: LINE }}>
        <div className="flex gap-4">
          <span className="mt-[2px] shrink-0 rounded-full px-[9px] py-[3px] text-[10.5px] font-semibold" style={{ background: WARM, color: MUTED }}>
            {t("Option 1")}
          </span>
          <p className="text-[13px] leading-[1.5]" style={{ color: MUTED }}>
            <span className="font-semibold" style={{ color: INK }}>{t("One unified right-hand panel with every diagnostic in it")}</span>
            {" — "}
            {t("comprehensive data for expert users, but confusing navigation for new ones and slow on large dialogue flows.")}
          </p>
        </div>
        <div className="flex gap-4">
          <span className="mt-[2px] shrink-0 rounded-full px-[9px] py-[3px] text-[10.5px] font-semibold" style={{ background: INK, color: "#fff" }}>
            {t("Chosen")}
          </span>
          <p className="text-[13px] leading-[1.5]" style={{ color: BODY }}>
            <span className="font-semibold" style={{ color: INK }}>{t("Three independent modules, each scoped to one question")}</span>
            {" — "}
            {t("each user segment lands directly in the view that answers their question.")}
          </p>
        </div>
      </div>

      <div className="mt-5 shrink-0">
        <Takeaway>{t("Split by the question being asked, not by the data available.")}</Takeaway>
      </div>
    </div>
  );
}

// ── 13 · Design decisions — where the entry point lives ──────────────────────
function Slide13() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>13 · {t("Design decisions")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Decision B — where should diagnostics start?")}
      </h2>

      <div className="mt-7 grid flex-1 grid-cols-[1fr_1fr_320px] items-center gap-12">
        <div className="flex flex-col gap-5">
          <EntryOptionArt kind="dedicated" />
          <TradeoffColumn
            tag={t("Option 1")}
            title={t("A dedicated entry screen, made highly visible")}
            pros={t("Clear guidance for the user's next operation.")}
            cons={t("Users can't act directly — it adds one more step before they reach the flow.")}
          />
        </div>

        <div className="flex flex-col gap-5">
          <EntryOptionArt kind="inline" />
          <TradeoffColumn
            tag={t("Option 2")}
            chosen
            title={t("A compact entry point inside the canvas")}
            pros={t("Users stay on the canvas and act where the flow already is.")}
            cons={t("Less obvious, and the canvas risks getting crowded with controls.")}
          />
        </div>

        <div className="flex flex-col gap-6 rounded-[18px] p-7" style={{ background: WARM }}>
          <div>
            <Eyebrow color={INK}>{t("The surprise")}</Eyebrow>
            <p className="mt-3 text-[16px] font-medium leading-[1.5] [text-wrap:balance]" style={{ color: INK }}>
              {t("Interviews flipped my assumption: users preferred to stay inside the canvas, for a more seamless experience.")}
            </p>
          </div>
          <div className="border-t pt-5" style={{ borderColor: LINE }}>
            <Eyebrow>{t("What I did")}</Eyebrow>
            <p className="mt-2 text-[13px] leading-[1.55]" style={{ color: BODY }}>
              {t("Tested both as lo-fi prototypes, then brought diagnostics to where operators already work instead of giving it a destination of its own.")}
            </p>
          </div>
        </div>
      </div>

      <Takeaway>{t("The more visible option is not always the more usable one — the prototype settled it, not the argument.")}</Takeaway>
    </div>
  );
}

// ── 14 · Design decisions — business goal into design targets ────────────────
function Slide14() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>14 · {t("Design decisions")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("Turning one business metric into three design targets.")}
      </h2>

      <div className="mt-7 grid flex-1 grid-cols-[300px_1fr] items-center gap-14">
        <div className="flex flex-col gap-5">
          <Eyebrow>{t("Business goal")}</Eyebrow>
          <div className="flex items-baseline gap-3">
            <p className="text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] [text-wrap:balance]" style={{ color: INK }}>
              {t("Resolution rate")}
            </p>
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-hidden>
              <path d="M10 25V3M10 3 3 10M10 3l7 7" stroke={INK} strokeWidth="2" />
            </svg>
          </div>
          <p className="text-[14px] leading-[1.6]" style={{ color: BODY }}>
            {t("I broke the metric down into the specific signals that move it, then handed each group to the user who can actually act on it.")}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="mb-[10px] text-[12px] font-semibold uppercase tracking-[0.09em]" style={{ color: MUTED }}>
            {t("Design target, per user type")}
          </p>
          <svg className="h-[52px] w-full shrink-0" viewBox="0 0 300 52" preserveAspectRatio="none" fill="none" aria-hidden>
            <path d="M0 10 H300" stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            {[50, 150, 250].map((x) => (
              <path key={x} d={`M${x} 10 V44`} stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="-mt-[14px] flex gap-6">
            <RingCluster emphasis label={t("Senior user")} metrics={[t("Good rate"), t("Traffic"), t("Loss rate")]} />
            <RingCluster label={t("Junior user")} metrics={[t("Logic issues"), t("Content issues"), t("Dependency issues")]} />
            <RingCluster label={t("Expert user")} metrics={[t("Traffic of front-end nodes")]} />
          </div>
        </div>
      </div>

      <Takeaway>{t("System complexity can stay — users shouldn't be forced to carry all of it.")}</Takeaway>
    </div>
  );
}

// ── 15 · Impact — stats ──────────────────────────────────────────────────────
function Slide15() {
  const t = useT();
  const stats = [
    { value: "6%", label: t("Resolution rate"), desc: t("higher than the original version.") },
    { value: "$3M", label: t("Reported business savings"), desc: t("per quarter — a project-level reported result, not attributed to design alone.") },
    { value: t("2–4 weeks"), label: t("Delivery cycle"), desc: t("down from 7–9 weeks after the self-service builder launched.") },
  ];
  return (
    <div className={FRAME}>
      <Tag>15 · {t("Impact & reflection")}</Tag>
      <h2 className={SLIDE_HEADLINE} style={{ color: INK }}>
        {t("From build speed to continuously improving the support experience.")}
      </h2>

      <div className="mt-10 flex flex-1 flex-col justify-center gap-14">
        <div className="grid grid-cols-3 gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-3 border-l-2 pl-7" style={{ borderColor: LINE }}>
              <p className="text-[64px] font-semibold leading-[1] tracking-[-0.02em]" style={{ color: INK }}>{s.value}</p>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>{s.label}</p>
              <p className="text-[14px] leading-[1.5]" style={{ color: MUTED }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Takeaway>{t("Three numbers, one throughline: less time spent, more issues resolved.")}</Takeaway>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────
const TOTAL = SLIDE_CHAPTER.length;
function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function ShopeeChatbotBuilderPresentationPage() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState<number | null>(null);
  const [notes, setNotes] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: Shot[]; index: number } | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [lang, setLang] = useState<Lang>("zh");
  const t = (s: string) => translate(lang, s);
  const note = NOTES[index];
  const targetTotal = NOTES.reduce((a, n) => a + n.secs, 0);
  const chapterTitle = CHAPTERS[SLIDE_CHAPTER[index]];
  // Slide 1 is a full-bleed dark cover, so the nav and footer chrome that sits
  // above it inverts for that slide only; every other slide is untouched.
  const onDark = index === 0;
  const chrome = onDark
    ? { ink: "#ffffff", muted: "rgba(255,255,255,0.56)", idle: "rgba(255,255,255,0.38)", dot: "rgba(255,255,255,0.26)", sep: "rgba(255,255,255,0.25)" }
    : { ink: INK, muted: MUTED, idle: "#b0b0b5", dot: "#d2d2d7", sep: "#d2d2d7" };

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next: Lang = l === "en" ? "zh" : "en";
      try { window.localStorage.setItem("seedflow-presentation-lang", next); } catch { /* ignore */ }
      return next;
    });
  }, []);
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
    <Slide01 key="1" />,
    <Slide02 key="2" onOpen={openLightbox} />,
    <Slide03 key="3" />,
    <Slide04 key="4" />,
    <Slide05 key="5" />,
    <Slide06 key="6" onOpen={openLightbox} />,
    <Slide07 key="7" />,
    <Slide08 key="8" />,
    <Slide09 key="9" />,
    <Slide10 key="10" />,
    <Slide11 key="11" />,
    <Slide12 key="12" onOpen={openLightbox} />,
    <Slide13 key="13" />,
    <Slide14 key="14" />,
    <Slide15 key="15" />,
  ];

  return (
    <LangContext.Provider value={lang}>
    <main lang={lang === "zh" ? "zh-CN" : "en"} className="fixed inset-0 select-none overflow-hidden bg-white antialiased" style={{ color: INK, fontFamily: FONT }}>
      <div
        className={`absolute left-1/2 top-1/2 overflow-hidden transition-colors duration-300 ${lang === "zh" ? "[&_h1]:!tracking-[-0.03em] [&_h2]:!tracking-[-0.005em] [&_h2]:!leading-[1.18]" : ""}`}
        style={{
          width: STAGE_W, height: STAGE_H,
          background: onDark ? COVER_BG : "#ffffff",
          transform: `translate(-50%, -50%) scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${TOTAL}: ${t(chapterTitle)}`}
      >
        {/* Project navigation (default: SeedFlow elsewhere; this page is Shopee Chatbot Builder) */}
        <nav className="absolute left-0 right-0 top-0 z-20 flex h-[72px] items-center gap-8 px-[144px]" aria-label="Projects">
          {PROJECTS.map((p) => {
            const active = p.name === "Shopee AI Chatbot Builder";
            const style = { color: active ? chrome.ink : chrome.idle, fontWeight: active ? 600 : 400 } as const;
            return p.href ? (
              <Link key={p.name} href={p.href} className="text-[13px] transition-opacity hover:opacity-70" style={style}>{p.name}</Link>
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
          <div className="flex items-center gap-5 text-[12px]" style={{ color: chrome.muted }}>
            <span className="font-semibold" style={{ color: chrome.ink }}>Shopee Chatbot Builder</span>
            <span>{t("Case study · Yue Yuwen")}</span>
            <span className="hidden lg:inline" style={{ color: chrome.sep }}>·</span>
            <span className="hidden lg:inline">{t(chapterTitle)}</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-[7px]" aria-label="Slides">
              {SLIDE_CHAPTER.map((chapter, i) => (
                <button
                  key={i}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(i)}
                  aria-label={`${t(CHAPTERS[chapter])} · ${i + 1}`}
                  aria-current={i === index}
                  className="group flex h-6 w-4 items-center justify-center"
                  style={chapter > 0 && SLIDE_CHAPTER[i - 1] !== chapter ? { marginLeft: 5 } : undefined}
                >
                  <span
                    className="block rounded-full transition-all duration-200"
                    style={{
                      width: i === index ? 16 : 6,
                      height: 6,
                      background: i === index ? chrome.ink : chrome.dot,
                    }}
                  />
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? "切换到中文" : "Switch to English"}
              className="flex items-center gap-[6px] text-[12px] font-medium transition-opacity hover:opacity-60"
              style={{ color: chrome.ink }}
            >
              <span style={{ opacity: lang === "en" ? 1 : 0.35 }}>EN</span>
              <span style={{ opacity: 0.35 }}>/</span>
              <span style={{ opacity: lang === "zh" ? 1 : 0.35 }}>中文</span>
            </button>
            <span className="text-[12px] font-medium tabular-nums" style={{ color: chrome.muted }}>
              {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <div className="flex gap-1">
              <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" className={`flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors disabled:opacity-25 disabled:hover:bg-transparent ${onDark ? "hover:bg-white/10" : "hover:bg-[#f5f5f7]"}`} style={{ color: chrome.ink }}>←</button>
              <button type="button" onClick={() => go(index + 1)} disabled={index === TOTAL - 1} aria-label="Next slide" className={`flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors disabled:opacity-25 disabled:hover:bg-transparent ${onDark ? "hover:bg-white/10" : "hover:bg-[#f5f5f7]"}`} style={{ color: chrome.ink }}>→</button>
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
            <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: MUTED }}>
              <span>讲稿 · {String(index + 1).padStart(2, "0")} {t(chapterTitle)} · 约 {note.secs} 秒</span>
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
