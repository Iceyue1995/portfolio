"use client";
/* eslint-disable @next/next/no-img-element */

// SeedFlow — Founder interview presentation.
// Standalone route. All styles are scoped to this file; no global tokens,
// shared components or other routes are touched.
// Evidence source: Documents/Seedflow/research-presentation/ (verified package).

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// System font stack, scoped to this page: SF Pro and PingFang SC on Apple devices.
const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif';

// ── Tokens (neutral, page-scoped) ────────────────────────────────────────────
const INK = "#1d1d1f";
const BODY = "#424245";
const MUTED = "#86868b";
const LINE = "rgba(0,0,0,0.1)";
const LINE_SOFT = "rgba(0,0,0,0.06)";
const WARM = "#f5f5f7";

const STAGE_W = 1600;
const STAGE_H = 900;
const IMG = "/images/seedflow-presentation";

type Shot = { src: string; alt: string; caption?: string };
type OpenLightbox = (items: Shot[], index?: number) => void;

// ── Verified numbers (data/summary-numbers.json in the evidence package) ─────
const STATUS = [
  { label: "Active", sub: "posted within 1 month", n: 29, fill: INK },
  { label: "Slowing", sub: "1–3 months", n: 9, fill: "#86868b" },
  { label: "Stopped", sub: "over 3 months", n: 11, fill: "#c7c7cc" },
  { label: "No public posts", sub: "", n: 3, fill: "hatch" },
];
const LIKES = [
  { label: "<1", n: 9, low: true },
  { label: "1–3", n: 13, low: true },
  { label: "3–5", n: 11, low: true },
  { label: "5–10", n: 9, low: false },
  { label: "10–20", n: 4, low: false },
  { label: "20+", n: 3, low: false },
];
// ── Language (EN / 中文). English strings are the keys; Chinese lives in ZH. ──
type Lang = "en" | "zh";
const LangContext = createContext<Lang>("en");
const ZH: Record<string, string> = {
  "To be added": "待补充",
  "Testing": "测试",
  "03 · Testing": "03 · 测试",
  "I put the first version in front of real people, and their response pushed me to keep going.": "第一版做完，我拿给很多人试用，反馈推着我继续做。",
  "Testers": "试用者",
  "“This is genuinely helpful.”": "“这个对我真的有帮助。”",
  "Creators and KOLs": "创作者与 KOL",
  "“It saves me a lot of time working out what to write.”": "“省了我很多想文案的时间。”",
  "Potential users": "潜在用户",
  "“I like how the copy reads.”": "“文案的质量我很认可。”",
  "That was enough to keep building. It also carried a warning.": "这足以让我继续做下去。但其中也藏着一个警告。",
  "Paraphrased from tester conversations, not verbatim.": "根据与试用者的交流转述，非原话。",
  "Case study · Yue Yuwen": "案例研究 · Yue Yuwen",
  "Full case study": "完整案例",
  " · ← → to browse": " · ← → 浏览",
  " · Esc to close": " · Esc 关闭",
  "Context": "背景",
  "First version": "第一版",
  "Turning point": "转折",
  "Evidence": "证据",
  "Product": "产品",
  "Decisions": "决策",
  "Next": "下一步",
  "01 · Context": "01 · 背景",
  "This is the story of how it changed from a content generator into a growth workflow.": "接下来讲的，是它如何从一个内容生成器，变成一套增长工作流。",
  "Role": "角色",
  "Founder, designer and builder (solo)": "创始人，设计与开发（独立完成）",
  "Timeline": "时间",
  "August – October 2026": "2026 年 8 月 – 10 月",
  "Stage": "阶段",
  "V2.0 in development": "V2.0 开发中",
  "SeedFlow · Welcome screen": "SeedFlow · 欢迎页",
  "02 · First version": "02 · 第一版",
  "I started with a simple bet: turn photos into a post that fits Xiaohongshu.": "我从一个简单的判断开始：把照片变成一篇适合小红书的笔记。",
  "The problem I saw": "我看到的问题",
  "Writing a post that fits the platform is slow, and harder still for non-native users.": "写出符合平台习惯的笔记很慢，对非中文母语的用户更难。",
  "My bet": "我的判断",
  "Upload images, let AI read them with the account, and get a note that is ready to post.": "上传图片，让 AI 结合账号读懂画面，得到一篇可以直接发布的笔记。",
  "What I shipped": "我做出了什么",
  "A mobile web MVP, built solo, live on a real model.": "一个人做出的移动端网页 MVP，接入真实模型上线。",
  "First release · Account context": "第一版 · 账号信息",
  "First release · Landing": "第一版 · 首页",
  "First release · Recommended post": "第一版 · 推荐笔记",
  "04 · Turning point": "04 · 转折",
  "05 · Evidence": "05 · 证据",
  "So I went to look: how do local businesses actually use Xiaohongshu?": "于是我去看了：本地商家到底是怎么用小红书的？",
  "public Xiaohongshu accounts across two Singapore business-related categories": "个公开小红书账号，来自两个与新加坡本地生意相关的类别",
  "29 of 52": "52 个中 29 个",
  "posted within the last month": "在近一个月内发布过",
  "33 of 49": "49 个中 33 个",
  "averaged fewer than 5 visible likes per recent post": "近期单篇可见点赞均值低于 5",
  "Active": "活跃",
  "Slowing": "放缓",
  "Stopped": "停更",
  "No public posts": "无公开笔记",
  "no data": "无数据",
  "My reading: most were already posting, so the useful question is what to do next, not how to start.": "我的解读：多数账号已经在发，所以更有用的问题是“下一步做什么”，而不是“怎么开始”。",
  "Public profiles, one-day snapshot, 24 September 2026. It shows what is happening, not why.": "公开主页，2026 年 9 月 24 日单日快照。它说明发生了什么，不说明为什么。",
  "07 · Product": "07 · 产品",
  "Diagnose": "诊断",
  "Decide": "决定",
  "Create": "生成",
  "Publish": "发布",
  "One finished post at a time": "一次一篇成品",
  "Diagnose · Checklist with copy-ready fixes (sample data)": "诊断 · 带可复制修改的清单（示例数据）",
  "Decide · Audit gaps carried into the brief (sample data)": "决定 · 诊断缺口带入表单（示例数据）",
  "Create · One finished post at a time (sample data)": "生成 · 一次一篇成品（示例数据）",
  "Publish · Copy, shot list, reasoning (sample data)": "发布 · 复制、拍摄清单、理由（示例数据）",
  "09 · Decisions": "09 · 决策",
  ",": "，",
  "Screenshot onboarding": "上传截图就能用",
  "not account connection": "不做账号授权",
  "Actionable checklist": "给能照着改的清单",
  "not a numerical score": "不打一个分数",
  "Publish-ready content": "直接给能发的成品",
  "not a content editor": "不做复杂编辑器",
  "Problem": "用户痛点",
  "Constraint": "现实约束",
  "Trade-off": "取舍",
  "A diagnosis should not require login or account authorisation.": "只是想做个诊断，不该让商家先把账号授权出去。",
  "The earlier profile-link fetch failed whenever Xiaohongshu asked for login or verification.": "上一版直接抓主页链接，一碰到小红书的登录验证就失败。",
  "One manual step, and the audit only sees what is in the screenshot.": "用户要多一步上传截图；AI 也只能看到截图里的信息。",
  "A score says how good or bad. It does not say what to change.": "分数只告诉你“做得不好”，没告诉你“该改哪里”。",
  "The early score dashboard was mostly hardcoded. There was no validated scoring model.": "早期的评分大多是写死的，背后没有靠谱的评分模型。",
  "No single number to track over time. Each item gets a status and a copy-ready fix.": "少了一个能长期追踪的指标；换来每一项都有状态，和可以直接复制的改法。",
  "The goal is a post that goes live. A complex editor adds a task before that.": "商家要的是一篇能发出去的笔记，不是又一个要学的编辑器。",
  "Solo build. The first-release editor, AI Studio, took heavy state and sync debugging.": "我一个人开发，第一版的编辑器（AI Studio）光调状态同步就耗了很多时间。",
  "Less control inside the app. Generation quality has to carry the weight.": "用户在产品里能改的变少了，所以生成质量必须过硬。",
  "10 · Next": "10 · 下一步",
  "What I built": "我做出了什么",
  "A first version on a real model, live for testing.": "接入真实模型的第一版，已上线测试。",
  "V2.0 of the app, in development: the full flow and two account paths.": "开发中的 V2.0 应用：全流程可用，含两条账号路径。",
  "In the demo build, the AI steps run on sample data.": "演示版里，AI 的两步使用示例数据。",
  "Build quickly. Question assumptions. Validate what matters.": "快速构建。质疑假设。验证真正重要的事。",
  "That became the product: from the account to a post ready to publish.": "这就成了现在的产品：从账号出发，到一篇可发布的笔记。",
  "An AI tool I designed and built to help small businesses in Southeast Asia grow on Xiaohongshu.": "我独立设计并开发的 AI 工具，帮助东南亚的小商家把小红书做起来。",
  "Market": "市场",
  "Southeast Asia, starting in Singapore": "东南亚，从新加坡开始",
  "But one piece of feedback I could not ignore: they already did this with ChatGPT.": "但有一条反馈让我没法忽视：这件事，他们本来就在用 ChatGPT 做。",
  "What potential users told me": "潜在用户告诉我的",
  "They used to do this with ChatGPT. SeedFlow was simply more convenient.": "以前他们用 ChatGPT 做这件事，SeedFlow 只是更方便。",
  "They wanted the copy to feel less like AI.": "他们希望文案少一点“AI 味”。",
  "Paraphrased from conversations with potential users.": "根据与潜在用户的交流转述。",
  "The question I asked myself": "我问自己的问题",
  "“If ChatGPT can do this too, why should SeedFlow exist?”": "“如果 ChatGPT 也能做，SeedFlow 凭什么存在？”",
  "General AI tools were the real competitor.": "通用 AI 工具，才是真正的对手。",
  "Content tool: one good post at a time": "内容工具：一次生成一篇好笔记",
  "Growth workflow: know the account, decide the next move": "增长工作流：理解账号，决定下一步",
  "Repositioned in August 2026": "2026 年 8 月重新定位",
  "Open the latest build": "打开最新版本",
  "Start": "开始",
  "Upload": "上传",
  "Existing account or a new one": "老账号，还是新账号",
  "A profile screenshot, no login": "上传主页截图，无需登录",
  "What is missing, and the fix": "缺什么，怎么改",
  "Gaps carry into the next step": "缺口带入下一步",
  "Copy, shoot, post": "复制、拍摄、发布",
  "Start · Existing account or a new one": "开始 · 老账号，还是新账号",
  "Upload · A profile screenshot, no login": "上传 · 主页截图，无需登录",
  "Latest V2.0 design, real screens. Content shown is sample data. Click a screen to enlarge.": "最新 V2.0 设计，真实界面。其中内容为示例数据，点击可放大。",
  "Along the way, three design decisions shaped it.": "过程中，我做了三个关键的产品取舍。",
  "Early feedback is encouraging. Next: launch, and get it to real users.": "早期反馈是积极的。下一步：正式上线，做真实的用户推广。",
  "Early signals": "早期信号",
  "Potential users found it more convenient than using ChatGPT directly.": "潜在用户觉得，它比直接用 ChatGPT 更方便。",
  "They liked the quality of the copy.": "他们认可文案的质量。",
  "A first group of potential users to launch with.": "已经有第一批潜在用户，可以一起上线。",
  "What comes next": "接下来做什么",
  "Launch the app.": "正式上线。",
  "Promote it to real users.": "面向真实用户做推广。",
  "Track what they publish, whether they return, and whether they pay.": "用真实数据看：发了多少、是否回来、是否付费。",
  "How it works": "背后逻辑",
  "08 · How it works": "08 · 背后逻辑",
  "Current version": "现在这一版",
  "Before it writes, it works out the market and the account.": "动笔之前，先搞清楚市场和账号。",
  "A 12-step growth-analysis framework I wrote as a skill.": "我写成 skill 的一套 12 步增长分析框架。",
  "Local research done first, then built into the product.": "先把本地市场调研做完，再把结论写进产品。",
  "Framework": "分析框架",
  "Research": "前期调研",
  "In product": "产品内",
  "Which market are you in?": "你在哪个市场？",
  "Map the markets: where you are based, where you shoot, where you want to grow.": "先画市场地图：你在哪里、内容拍在哪里、想进入哪里。",
  "Who is doing well there?": "同类里谁做得好？",
  "Profile comparable accounts one by one. Note what to borrow and what not to copy.": "逐个拆对标账号，写清哪些能借鉴、哪些不该照抄。",
  "Why do top posts work?": "爆款为什么能火？",
  "Break down top posts: cover hook, searchable title, reasons to save.": "拆爆款笔记：封面钩子、标题里的搜索词、值得收藏的理由。",
  "Where is this account stuck?": "这个账号卡在哪？",
  "From screenshots: account stage, the main bottleneck, the label to build first.": "看截图判断：账号阶段、最大的瓶颈、先立哪个标签。",
  "Then it writes.": "然后才动笔。",
  "A post in the creator's voice, then a second pass to strip the AI tone.": "写一篇像本人口吻的笔记，再过一遍去“AI 味”的复审。",
  "What does the local market look like?": "本地市场长什么样？",
  "I first studied 52 public accounts of Singapore businesses.": "我先调研了 52 个新加坡本地商家的公开账号。",
  "What tends to fit here?": "什么内容更适合这里？",
  "Four working content rules from that research, written into the product.": "从调研里提炼出四条内容规则，写进产品。",
  "What is this account missing?": "这个账号缺什么？",
  "Checks a profile screenshot for what a local business needs: address, booking, hours, verification, visuals.": "读主页截图，检查本地商家必备的信息：地址、预约、营业时间、认证、视觉。",
  "Which situation is it?": "你是哪种情况？",
  "Existing or new account, plus your area and what sets you apart.": "老账号还是新账号，再加上所在区域和与同行的不同。",
  "Finished posts for that business. Each one states the rule behind it.": "为这家商家写的成品笔记，每篇都注明依据的规则。",
  "ChatGPT starts from a blank prompt. SeedFlow starts from the market and the account.": "ChatGPT 从一句空白指令开始，SeedFlow 从市场和账号开始。",
  "The first version did not fetch competitors live. The four rules are working assumptions. The demo build shows sample data.": "第一版并不实时抓取竞品；四条规则是工作假设；演示版展示的是示例数据。",
  "Vision": "愿景",
  "Digital marketing that small businesses in Southeast Asia can afford.": "让东南亚的中小商家，也用得起数字营销。",
  "Today: an AI tool I designed and built to help them grow on Xiaohongshu.": "今天的第一步：我独立设计并开发的 AI 工具，帮他们把小红书做起来。",
  "Open the first version": "打开第一版",
  "Open the demo": "打开演示版",
  "Open the live app": "打开真实可用版",
  "Research detail": "调研细节",
  "06 · Research detail": "06 · 调研细节",
  "How I collected it, and what else it showed.": "数据是怎么来的，还看到了什么。",
  "Method": "方法",
  "Where": "在哪里找",
  "Xiaohongshu search by category keyword. Only accounts run by Singapore businesses were kept.": "在小红书按品类关键词搜索，只保留新加坡本地商家自己运营的账号。",
  "What I recorded": "记录了什么",
  "Followers, number of posts, dates and visible likes of the latest 5 posts, and whether the bio gives an address or contact.": "粉丝数、笔记数、最近 5 篇的发布日期和可见点赞，以及简介里有没有地址和联系方式。",
  "How I labelled activity": "活跃度怎么判定",
  "Active: posted within 1 month. Slowing: 1–3 months. Stopped: longer.": "活跃：1 个月内发过。放缓：1–3 个月。停更：更久。",
  "AI-assisted collection; activity labels re-checked against post dates. One-day snapshot, 24 September 2026.": "AI 辅助采集，活跃状态按发布日期重新核对。2026 年 9 月 24 日单日快照。",
  "By category": "分品类",
  "Pilates / Yoga": "普拉提 / 瑜伽",
  "Education": "教育",
  "Accounts": "账号数",
  "Median followers": "粉丝中位数",
  "Median posts": "笔记数中位数",
  "Median likes per recent post": "近期单篇点赞中位数",
  "Under 5 likes": "均值低于 5 个赞",
  "Profile information": "主页信息",
  "21 of 52": "52 个中 21 个",
  "had a bio missing an address or a way to make contact": "简介里缺地址或联系方式",
  "Local details present": "本地信息齐全",
  "Partly present": "部分具备",
  "No bio": "没有简介",
  "Limits: two categories, not a random sample, and only businesses that already have an account. About 48 distinct businesses (three brands run more than one account). Likes are the counts visible on the profile; saves, comments and reach were not recorded. Observed publicly; nobody was interviewed.": "局限：只有两个品类，非随机抽样，且只包含已经开了账号的商家。约 48 个独立主体（三个品牌各有多个账号）。点赞为主页可见数；收藏、评论和曝光没有采集。全部为公开观察，没有访谈任何人。",
  "From data to design": "从数据到设计",
  "06 · From data to design": "06 · 从数据到设计",
  "What the data showed, and what I designed from it.": "数据说明了什么，我据此设计了什么。",
  "Most are already posting, with little response.": "多数已经在发，但几乎没有反应。",
  "38 of 52 posted in the last 3 months. 33 of 49 average under 5 likes per recent post.": "52 个里 38 个近三个月内发过；49 个里 33 个，近期单篇点赞均值低于 5。",
  "Help decide the next move, not help them start. Built for businesses that already have an account.": "不做“帮你开始”，而是帮你判断下一步。面向已经有账号的商家。",
  "Many profiles are missing the basics.": "很多主页连基本信息都没放全。",
  "21 of 52 have a bio missing an address or a way to make contact. 24 have full local details.": "52 个里 21 个，简介缺地址或联系方式；本地信息齐全的只有 24 个。",
  "The flow starts with a profile check, with a fix to paste for each gap.": "流程第一步先做主页诊断，每个缺口都给一段可直接粘贴的修改。",
  "Accounts are at different stages.": "账号处在不同阶段。",
  "29 active, 9 slowing, 11 stopped, 3 with no public posts.": "29 个活跃，9 个放缓，11 个停更，3 个没有公开笔记。",
  "Two paths: revive an existing account, or launch a new one.": "分两条路径：盘活老账号，或启动新账号。",
  "So I designed": "所以我这样设计",
  "Method: Xiaohongshu keyword search, accounts run by Singapore businesses only, latest 5 posts each, one-day snapshot on 24 September 2026. Two categories, not a random sample; about 48 distinct businesses; observed publicly, nobody interviewed. The data does not show why likes are low or which content works. Those are questions for after launch.": "方法：在小红书按关键词搜索，只保留新加坡本地商家自己运营的账号，每个账号看最近 5 篇，2026 年 9 月 24 日单日快照。只有两个品类，非随机抽样；约 48 个独立主体；全部为公开观察，没有访谈任何人。数据不能说明点赞为什么低、哪种内容更有效，这些留到上线后验证。",
  "Insights": "洞察",
  "Screen recording of the first version": "第一版的屏幕录制",
  "Screen recording of the first version. File-picker steps and waiting time are cut. Click to pause.": "第一版的屏幕录制，剪掉了选文件和等待的片段。点击可暂停。",
  "Tech stack": "技术栈",
  "Appendix · Tech stack": "附录 · 技术栈",
  "How the two versions are built.": "两个版本分别是怎么搭的。",
  "V2.0, in development": "V2.0（开发中）",
  "Form": "形态",
  "Mobile web app": "移动端网页",
  "Mobile app (the same code also exports to web)": "手机 App（同一套代码也能导出网页版）",
  "Front end": "前端",
  "Language": "语言",
  "TypeScript (app) · JavaScript (server)": "TypeScript（App）· JavaScript（后端）",
  "Back end": "后端",
  "Next.js API routes, in the same project": "Next.js 的 API 路由，和前端在同一个项目里",
  "A separate Node.js + Express service with two endpoints": "独立的 Node.js + Express 服务，两个接口",
  "Qwen qwen-vl-plus (vision)": "通义千问 qwen-vl-plus（多模态）",
  "Qwen qwen3.8-flash (vision)": "通义千问 qwen3.8-flash（多模态）",
  "Can switch to": "可切换到",
  "OpenAI gpt-4.1 · Gemini 2.5 Flash, by one setting": "OpenAI gpt-4.1 · Gemini 2.5 Flash，改一个配置即可",
  "Database": "数据库",
  "Cloudflare D1 (SQLite) with Drizzle ORM": "Cloudflare D1（SQLite）+ Drizzle ORM",
  "None. Every request is stateless.": "没有。每次请求无状态。",
  "Sign-up and login": "注册和登录",
  "No login. Upload a screenshot to start.": "没有登录，上传截图即可使用。",
  "Deployment": "部署",
  "Cloudflare Workers, live": "Cloudflare Workers，已上线",
  "Server code complete, not deployed yet": "后端代码已完成，尚未部署",
  "Model calls return strict JSON and fail loudly: an error is shown, never filler content. API keys stay on the server. Designed and built solo with AI coding tools.": "模型调用要求返回严格的 JSON，失败就直接报错，不用假内容顶替。API Key 只放在后端。全部由我一个人用 AI 编程工具设计和开发。",
  "Model": "模型",
  "Login": "登录",
};
function translate(lang: Lang, s: string) {
  return lang === "zh" ? ZH[s] ?? s : s;
}
function useT() {
  const lang = useContext(LangContext);
  return (s: string) => translate(lang, s);
}

// ── Speaker notes (conversational Chinese, about 7 minutes in total) ───────
const NOTES: { secs: number; text: string[] }[] = [
  {
    secs: 45,
    text: [
      "先说我做这件事的愿景：我希望 SeedFlow 能成为东南亚中小商家负担得起的数字营销工具。小红书是我选的第一个切入点。",
      "SeedFlow 是我今年八月到十月独立设计、独立开发的一个 AI 工具，面向东南亚的小商家，从新加坡开始，帮他们把小红书做起来。从产品定位、交互设计到前后端，都是我一个人用 AI 编程工具完成的，现在已经在开发 V2.0。",
      "我今天想讲的不是功能清单，而是它怎么从一个“内容生成器”，一步步变成一套“增长工作流”，以及中间我做的几个判断。",
    ],
  },
  {
    secs: 45,
    text: [
      "故事从一个很简单的判断开始。我自己发小红书的时候，有照片却不知道怎么写，标题、正文、标签都要想很久；对非中文母语的用户来说，这道门槛更高。",
      "所以第一版只做一件事：上传图片，AI 结合账号信息看懂画面，生成一篇可以直接发的笔记。右边是当时的真实录屏，接上了真实的模型，从上传到出稿能完整跑通。",
      "不过要坦白一点：这个问题当时只是我自己的体会，没有向别人求证过。这也引出了后面的转折。",
    ],
  },
  {
    secs: 40,
    text: [
      "第一版做出来之后，我没有自己闷头改，而是拿给很多人去试，有潜在用户，也有做内容的 KOL。",
      "反馈比我预期的要好。很多人说这个真的有帮助；有 KOL 说，它省掉了自己大量想文案的时间；也有人说文案写得不错。这些反馈是推着我继续往下做的直接原因。",
      "但在这些正面反馈里，有一句话让我停了下来。",
    ],
  },
  {
    secs: 55,
    text: [
      "有人说：这件事我以前是用 ChatGPT 做的，你这个更方便。还有人希望文案再少一点 AI 味。",
      "前一句听起来是夸奖，但我听到的是另一层意思：通用 AI 就是我们真正的对手，用户完全可以用别的产品完成同样的事。所以我问自己：如果 ChatGPT 也能做，SeedFlow 凭什么存在？",
      "我的判断是，单次生成谁都能做，不是护城河；能积累下来的，是对一个账号的持续理解。于是八月，我把方向从“内容工具”改成了“增长工作流”。这一步有用户反馈做依据，但还没有系统的市场数据，所以下一步我去看了市场。",
    ],
  },
  {
    secs: 55,
    text: [
      "九月二十四号，我用 AI 工具整理了 52 个公开的小红书账号，来自两个和新加坡本地生意相关的类别：普拉提瑜伽和教育兴趣班。这些是公开观察，没有访谈任何人。",
      "有两个数字影响了我。第一，52 个里有 29 个一个月内还在更新，完全没有公开内容的只有 3 个。第二，49 个有数据的账号里，33 个近期平均可见点赞不到 5。",
      "我的解读是：这批账号多数已经在发了，所以更有用的问题不是“怎么开始”，而是“下一步做什么”。边界也要说清楚：这是一天的公开快照，样本小，它说明发生了什么，说明不了为什么，更不能说人家内容做得不好。这个解读，直接决定了产品现在的样子。",
    ],
  },
  {
    secs: 60,
    text: [
      "数据不是摆出来看的，它要推出结论。这一页是我从调研里得到的三个判断，以及每一个对应的设计。",
      "第一，多数商家已经在发，但几乎没有反应：52 个里 38 个近三个月都发过，可 49 个里有 33 个，单篇点赞均值不到 5。所以我没有做“帮你开始”，而是做“帮你判断下一步”，面向已经有账号的商家。",
      "第二，很多主页连基本信息都没放全：52 个里 21 个，简介缺地址或联系方式。对本地生意来说，这意味着就算被刷到，也不知道店在哪、怎么约。所以流程第一步先做主页诊断，每个缺口直接给一段能粘贴的修改。",
      "第三，账号处在不同阶段：活跃、放缓、停更、没发过，需要的东西不一样。所以入口分两条路径，盘活老账号，或者启动新账号。",
      "也要说清楚数据回答不了什么：它不能说明点赞为什么低，也不能说明哪种内容更有效，而且全部是公开观察，没有访谈。这些是上线之后要验证的。",
    ],
  },
  {
    secs: 50,
    text: [
      "这就是现在的产品，六张都是最新设计的真实界面，里面是示例数据。右上角可以直接打开最新版本。",
      "用户先选自己是老账号还是新账号；上传一张主页截图，不需要登录；得到一份诊断清单，哪一项缺失、哪一项不完整，旁边直接给可以复制的修改文案；诊断出的缺口会带进下一步，只需要再补几项关键信息；然后一次给一篇可以直接发的成品；最后附拍摄清单和这样写的理由，用户复制、拍几张图、自己去发。",
      "整个过程不需要登录小红书，也不需要授权。那界面背后，到底在做什么？",
    ],
  },
  {
    secs: 60,
    text: [
      "很多人会以为这类产品就是把照片丢给大模型。其实在动笔之前，它要先回答几个问题。",
      "第一版，我把自己做小红书增长的方法，写成了一套 12 步的分析框架，也就是一个 skill。它先问三件事：你在哪个市场——不只看你所在的城市，还看你的内容拍在哪里、想进入哪里；同类里谁做得好——逐个拆对标账号，写清哪些能借鉴、哪些不该照抄；爆款为什么能火——拆封面、标题里的搜索词、值得收藏的理由。产品里用的是这套框架的判断方式：看截图判断账号处在哪个阶段、最大的瓶颈是什么，然后才写，写完再过一遍去 AI 味的复审。",
      "现在这一版，我把顺序换了：不是每次现场分析，而是先把本地市场调研做完。我调研了 52 个新加坡本地商家的公开账号，提炼成四条内容规则写进产品。用户进来之后，产品先查这个账号缺什么本地商家必备的信息，再判断是老账号还是新账号，结合所在区域和与同行的不同，最后才写，而且每一篇都注明依据的是哪条规则。",
      "所以它和 ChatGPT 的区别是：ChatGPT 从一句空白指令开始，SeedFlow 从市场和账号开始。要说明的是，第一版并不实时抓竞品，那部分是用框架做的研究；四条规则还是工作假设；演示版展示的是示例数据。做这些的过程中，我做了三个产品取舍。",
    ],
  },
  {
    secs: 75,
    text: [
      "每一个取舍，我都按用户痛点、现实约束、取舍来讲。",
      "第一，上传截图就能用，不做账号授权。只是想做个诊断，不该让商家先把账号授权出去；而且上一版直接抓主页链接，一碰到登录验证就失败。代价是用户多一步上传，AI 也只能看到截图里的信息。",
      "第二，给能照着改的清单，不打分。分数只告诉你做得不好，没告诉你该改哪里；而且早期那个评分大多是写死的，背后没有靠谱的评分模型，我不想展示一个没有依据的数字。代价是少了一个能长期追踪的指标。",
      "第三，直接给能发的成品，不做复杂编辑器。商家要的是一篇能发出去的笔记，不是又一个要学的编辑器；而且第一版的 AI Studio 光调状态同步就耗了我很多时间。代价是用户在产品里能改的变少了，所以生成质量必须过硬。",
      "这一版刻意没做的还有自动发布、图片生成和效果追踪，都留到上线之后。",
    ],
  },
  {
    secs: 50,
    text: [
      "最后说现状和下一步。产品已经能完整走通；要说明的是，演示版里 AI 的两步用的是示例数据。",
      "早期拿给潜在用户看，反馈是积极的：他们觉得比直接用 ChatGPT 方便，也认可文案的质量，现在已经有第一批潜在用户。",
      "所以下一步很明确：正式上线，面向真实用户做推广，然后用真实数据看三件事——他们发了多少、会不会回来、愿不愿意付费。快速做，质疑假设，验证真正重要的事。谢谢。",
    ],
  },
  {
    secs: 40,
    text: [
      "这一页是附录，对方问技术的时候再翻。",
      "第一版是 Next.js 做的移动端网页，部署在 Cloudflare 上，有登录和数据库。V2.0 改成了用 Expo 和 React Native 写的 App，后端是一个独立的 Node.js 加 Express 服务，只有诊断和生成两个接口。",
      "模型两版都用通义千问的多模态模型，后端做了适配，改一个配置就能切到 OpenAI 或 Gemini。",
      "V2.0 没有数据库，是因为这个阶段没有登录、不存历史，每次请求都是无状态的；代价是现在还量不了用户用了几次、发没发，上线做推广的时候就要补上。另外要照实说：V2.0 的后端代码已经完成，但还没有部署。",
    ],
  },
];

// ── Small building blocks ────────────────────────────────────────────────────
// Slide frame: generous margins, nothing touches the edges.
const FRAME = "absolute inset-0 flex flex-col px-[144px] pb-[128px] pt-[100px]";
const TILE = "rounded-[32px]";

function Tag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className="self-start whitespace-nowrap text-[14px] font-medium tracking-[0.01em]" style={{ color: dark ? "rgba(255,255,255,0.7)" : MUTED }}>
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

function Phone({
  shot, width, onOpen, group, radius = 28, height,
}: { shot: Shot; width: number; onOpen: OpenLightbox; group?: Shot[]; radius?: number; height?: number }) {
  const items = group ?? [shot];
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onOpen(items, Math.max(0, items.indexOf(shot))); }}
      aria-label={`Enlarge: ${shot.alt}`}
      className="block shrink-0 cursor-zoom-in overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      style={{
        width, height, borderRadius: radius, background: "#fff",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 30px 60px -30px rgba(0,0,0,0.25)",
      }}
    >
      <img src={shot.src} alt={shot.alt} className="block h-auto w-full" draggable={false} />
    </button>
  );
}

const HATCH = "repeating-linear-gradient(135deg, rgba(134,134,139,0.6) 0 1.5px, transparent 1.5px 7px)";

// Shared headline style: one first-person sentence per slide.
const HEADLINE = "mt-5 max-w-[1240px] [text-wrap:balance] text-[42px] font-semibold leading-[1.12] tracking-[-0.018em]";

// ── Slide 01 · Context ───────────────────────────────────────────────────────

const V1_URL = "https://seedflow-live-test.yuwen1.chatgpt.site/";
const EARLY: Shot[] = [
  { src: "/images/sf-early-landing.webp", alt: "First release: landing screen, Let your assets grow into content", caption: "First release · Landing" },
  { src: "/images/sf-early-upload.webp", alt: "First release: upload profile screenshots so SeedFlow can understand the account", caption: "First release · Account context" },
  { src: "/images/sf-early-output-v2.webp", alt: "First release: recommended post with Generate Post Package", caption: "First release · Recommended post" },
];

function Slide01({ onOpen }: { onOpen: OpenLightbox }) {
  const t = useT();
  const meta = [
    { k: t("Role"), v: t("Founder, designer and builder (solo)") },
    { k: t("Timeline"), v: t("August – October 2026") },
    { k: t("Market"), v: t("Southeast Asia, starting in Singapore") },
    { k: t("Stage"), v: t("V2.0 in development") },
  ];
  return (
    <div className="absolute inset-0 flex">
      <div className="flex w-[820px] flex-col justify-between pb-[128px] pl-[144px] pr-[72px] pt-[100px]">
        <Tag>{t("01 · Context")}</Tag>
        <div className="flex flex-col">
          <h1 className="text-[92px] font-semibold leading-[0.95] tracking-[-0.04em]" style={{ color: INK }}>SeedFlow</h1>
          <div className="mt-9 flex flex-col gap-2">
            <Eyebrow>{t("Vision")}</Eyebrow>
            <p className="text-[27px] font-semibold leading-[1.18] tracking-[-0.018em] [text-wrap:balance]" style={{ color: INK }}>
              {t("Digital marketing that small businesses in Southeast Asia can afford.")}
            </p>
          </div>
          <p className="mt-6 text-[17px] leading-[1.5]" style={{ color: BODY }}>
            {t("Today: an AI tool I designed and built to help them grow on Xiaohongshu.")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {meta.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-[6px]">
              <Eyebrow>{k}</Eyebrow>
              <p className="text-[16px] leading-[1.35]" style={{ color: INK }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        style={{ background: "radial-gradient(120% 90% at 50% 42%, #ffffff 0%, #f5f5f7 58%, #ececf0 100%)" }}
      >
        <div className="-mt-[28px] flex items-center gap-7">
          {EARLY.map((shot) => (
            <Phone key={shot.src} shot={shot} group={EARLY} width={212} radius={28} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 02 · First version ─────────────────────────────────────────────────

function Slide02() {
  const t = useT();
  const rows = [
    { k: t("The problem I saw"), v: t("Writing a post that fits the platform is slow, and harder still for non-native users.") },
    { k: t("My bet"), v: t("Upload images, let AI read them with the account, and get a note that is ready to post.") },
    { k: t("What I shipped"), v: t("A mobile web MVP, built solo, live on a real model.") },
  ];
  return (
    <div className="absolute inset-0 flex">
      <div className="flex w-[900px] flex-col pb-[128px] pl-[144px] pr-[88px] pt-[100px]">
        <div className="flex items-baseline justify-between">
          <Tag>{t("02 · First version")}</Tag>
          <a
            href={V1_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "#0066cc" }}
          >
            {t("Open the first version")} ↗
          </a>
        </div>
        <h2 className={HEADLINE} style={{ color: INK }}>
          {t("I started with a simple bet: turn photos into a post that fits Xiaohongshu.")}
        </h2>
        <div className="flex flex-1 flex-col justify-center gap-9">
          {rows.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-2">
              <Eyebrow>{k}</Eyebrow>
              <p className="text-[20px] leading-[1.38] tracking-[-0.005em]" style={{ color: INK }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative flex flex-1 flex-col items-center justify-center gap-5 overflow-hidden pb-[36px]"
        style={{ background: "radial-gradient(120% 90% at 50% 42%, #ffffff 0%, #f5f5f7 58%, #ececf0 100%)" }}
      >
        <video
          src="/videos/seedflow-v1-demo.mp4?v=5"
          poster={`${IMG}/v1-demo-poster.webp?v=5`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={t("Screen recording of the first version")}
          onClick={(e) => { e.stopPropagation(); const v = e.currentTarget; if (v.paused) void v.play(); else v.pause(); }}
          className="block cursor-pointer"
          style={{ width: 318, height: 669, objectFit: "cover", borderRadius: 46, boxShadow: "0 30px 60px -30px rgba(0,0,0,0.3)" }}
        />
      </div>
    </div>
  );
}

// ── Slide 03 · Testing ───────────────────────────────────────────────────────
function Slide03() {
  const t = useT();
  const voices = [
    { who: t("Testers"), said: t("“This is genuinely helpful.”") },
    { who: t("Creators and KOLs"), said: t("“It saves me a lot of time working out what to write.”") },
    { who: t("Potential users"), said: t("“I like how the copy reads.”") },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("03 · Testing")}</Tag>
      <h2 className={HEADLINE} style={{ color: INK }}>
        {t("I put the first version in front of real people, and their response pushed me to keep going.")}
      </h2>

      <div className="mt-14 grid max-h-[330px] min-h-0 flex-1 grid-cols-3 gap-6">
        {voices.map(({ who, said }) => (
          <div key={who} className={`flex flex-col justify-between p-10 ${TILE}`} style={{ background: WARM }}>
            <Eyebrow>{who}</Eyebrow>
            <p className="text-[27px] font-semibold leading-[1.14] tracking-[-0.02em]" style={{ color: INK }}>{said}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex shrink-0 items-baseline justify-between gap-10">
        <p className="text-[18px] leading-[1.45]" style={{ color: INK }}>
          {t("That was enough to keep building. It also carried a warning.")}
        </p>
      </div>
    </div>
  );
}

// ── Slide 04 · Turning point ─────────────────────────────────────────────────
function Slide04() {
  const t = useT();
  return (
    <div className={FRAME}>
      <Tag>{t("04 · Turning point")}</Tag>
      <h2 className={HEADLINE} style={{ color: INK }}>
        {t("But one piece of feedback I could not ignore: they already did this with ChatGPT.")}
      </h2>

      <div className="mt-14 grid max-h-[380px] min-h-0 flex-1 grid-cols-2 items-stretch gap-6">
        <div className={`flex flex-col justify-between p-11 ${TILE}`} style={{ background: WARM }}>
          <Eyebrow>{t("What potential users told me")}</Eyebrow>
          <div className="flex flex-col gap-6">
            <p className="text-[22px] font-semibold leading-[1.26] tracking-[-0.012em]" style={{ color: INK }}>
              {t("They used to do this with ChatGPT. SeedFlow was simply more convenient.")}
            </p>
            <p className="text-[22px] font-semibold leading-[1.26] tracking-[-0.012em]" style={{ color: INK }}>
              {t("They wanted the copy to feel less like AI.")}
            </p>
          </div>
          <p className="text-[13px]" style={{ color: MUTED }}>{t("Paraphrased from conversations with potential users.")}</p>
        </div>
        <div className={`flex flex-col justify-between p-11 text-white ${TILE}`} style={{ background: INK }}>
          <Eyebrow color="rgba(255,255,255,0.6)">{t("The question I asked myself")}</Eyebrow>
          <p className="text-[32px] font-semibold leading-[1.1] tracking-[-0.024em]">
            {t("“If ChatGPT can do this too, why should SeedFlow exist?”")}
          </p>
          <p className="text-[17px] leading-[1.4] text-white/70">{t("General AI tools were the real competitor.")}</p>
        </div>
      </div>

      <div className="mt-7 flex shrink-0 items-baseline gap-4 text-[17px]">
        <span style={{ color: MUTED }}>{t("Content tool: one good post at a time")}</span>
        <span aria-hidden="true" style={{ color: MUTED }}>→</span>
        <span className="font-semibold" style={{ color: INK }}>{t("Growth workflow: know the account, decide the next move")}</span>
        <span className="ml-auto text-[13px]" style={{ color: MUTED }}>{t("Repositioned in August 2026")}</span>
      </div>
    </div>
  );
}

// ── Slide 05 · Evidence ──────────────────────────────────────────────────────
function Slide05() {
  const t = useT();
  const maxStatus = 29;
  const maxLikes = 13;
  return (
    <div className={FRAME}>
      <Tag>{t("05 · Evidence")}</Tag>
      <h2 className={HEADLINE} style={{ color: INK }}>
        {t("So I went to look: how do local businesses actually use Xiaohongshu?")}
      </h2>

      <div className="mt-12 grid min-h-0 flex-1 grid-cols-[250px_1fr_1fr] gap-6">
        <div className="flex flex-col justify-center pr-6">
          <p className="text-[128px] font-semibold leading-[0.82] tracking-[-0.05em]" style={{ color: INK }}>52</p>
          <p className="mt-6 text-[17px] leading-[1.42]" style={{ color: BODY }}>
            {t("public Xiaohongshu accounts across two Singapore business-related categories")}
          </p>
        </div>

        <div className={`flex flex-col px-10 py-9 ${TILE}`} style={{ background: WARM }}>
          <p className="text-[36px] font-semibold leading-none tracking-[-0.025em]" style={{ color: INK }}>{t("29 of 52")}</p>
          <p className="mt-2 text-[17px] leading-[1.35]" style={{ color: BODY }}>{t("posted within the last month")}</p>
          <div className="mt-5 flex flex-1 flex-col justify-around">
            {STATUS.map(({ label, n, fill }) => (
              <div key={label} className="grid grid-cols-[136px_1fr] items-center gap-4">
                <span className="text-[14px] font-medium" style={{ color: INK }}>{t(label)}</span>
                <div className="flex items-center gap-3">
                  <div
                    className="h-[18px] rounded-full"
                    style={{
                      width: `${(n / maxStatus) * 78}%`,
                      ...(fill === "hatch" ? { backgroundImage: HATCH, boxShadow: "inset 0 0 0 1px rgba(134,134,139,0.6)" } : { background: fill }),
                    }}
                  />
                  <span className="text-[18px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-col px-10 py-9 ${TILE}`} style={{ background: WARM }}>
          <p className="text-[36px] font-semibold leading-none tracking-[-0.025em]" style={{ color: INK }}>{t("33 of 49")}</p>
          <p className="mt-2 text-[17px] leading-[1.35]" style={{ color: BODY }}>{t("averaged fewer than 5 visible likes per recent post")}</p>
          <div className="mt-5 flex flex-1 items-end gap-3">
            {LIKES.map(({ label, n, low }) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[15px] font-semibold" style={{ color: INK }}>{n}</span>
                <div className="w-full rounded-t-[8px]" style={{ height: (n / maxLikes) * 104, background: low ? INK : "#c7c7cc" }} />
                <span className="text-[13px]" style={{ color: MUTED }}>{label}</span>
              </div>
            ))}
            <div className="ml-3 flex flex-1 flex-col items-center gap-2">
              <span className="text-[15px] font-semibold" style={{ color: INK }}>3</span>
              <div className="w-full rounded-t-[8px]" style={{ height: (3 / maxLikes) * 104, backgroundImage: HATCH, boxShadow: "inset 0 0 0 1px rgba(134,134,139,0.6)" }} />
              <span className="whitespace-nowrap text-[13px]" style={{ color: MUTED }}>{t("no data")}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-7 text-[18px] font-medium leading-[1.4]" style={{ color: INK }}>
        {t("My reading: most were already posting, so the useful question is what to do next, not how to start.")}
      </p>
      <p className="mt-2 text-[13px] leading-[1.5]" style={{ color: MUTED }}>
        {t("Public profiles, one-day snapshot, 24 September 2026. It shows what is happening, not why.")}
      </p>
    </div>
  );
}

// ── Slide 06 · From data to design ───────────────────────────────────────────
function Slide05b() {
  const t = useT();
  const insights = [
    {
      n: "33 / 49",
      finding: t("Most are already posting, with little response."),
      proof: t("38 of 52 posted in the last 3 months. 33 of 49 average under 5 likes per recent post."),
      design: t("Help decide the next move, not help them start. Built for businesses that already have an account."),
    },
    {
      n: "21 / 52",
      finding: t("Many profiles are missing the basics."),
      proof: t("21 of 52 have a bio missing an address or a way to make contact. 24 have full local details."),
      design: t("The flow starts with a profile check, with a fix to paste for each gap."),
    },
    {
      n: "29 · 9 · 11 · 3",
      finding: t("Accounts are at different stages."),
      proof: t("29 active, 9 slowing, 11 stopped, 3 with no public posts."),
      design: t("Two paths: revive an existing account, or launch a new one."),
    },
  ];
  const cols = [t("Accounts"), t("Active"), t("Slowing"), t("Stopped"), t("Median followers"), t("Median posts"), t("Median likes per recent post"), t("Local details present")];
  const rows: [string, string[]][] = [
    [t("Pilates / Yoga"), ["22", "12", "6", "3", "368.5", "56.5", "2.8", "13"]],
    [t("Education"), ["30", "17", "3", "8", "431", "80", "3.9", "11"]],
  ];
  const GRID = "grid grid-cols-[150px_repeat(8,1fr)] items-baseline gap-x-4";
  return (
    <div className="absolute inset-0 flex flex-col px-[144px] pb-[112px] pt-[84px]">
      <Tag>{t("06 · From data to design")}</Tag>
      <h2 className="mt-3 [text-wrap:balance] text-[38px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: INK }}>
        {t("What the data showed, and what I designed from it.")}
      </h2>

      <div className="mt-9 grid min-h-0 flex-1 grid-cols-3 gap-6">
        {insights.map(({ n, finding, proof, design }) => (
          <div key={n} className={`flex flex-col px-9 py-8 ${TILE}`} style={{ background: WARM }}>
            <p className="text-[34px] font-semibold leading-none tracking-[-0.025em]" style={{ color: INK }}>{n}</p>
            <p className="mt-4 text-[20px] font-semibold leading-[1.25] tracking-[-0.012em]" style={{ color: INK }}>{finding}</p>
            <p className="mt-2 text-[14px] leading-[1.45]" style={{ color: BODY }}>{proof}</p>
            <div className="mt-auto rounded-[18px] bg-white px-5 py-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 14px 30px -20px rgba(0,0,0,0.16)" }}>
              <span className="text-[12px] font-medium" style={{ color: MUTED }}>{t("So I designed")}</span>
              <p className="mt-[5px] text-[15px] font-medium leading-[1.4]" style={{ color: INK }}>{design}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 shrink-0 rounded-[24px] px-9 py-5" style={{ background: WARM }}>
        <div className={GRID}>
          <span className="text-[12px] font-medium" style={{ color: MUTED }}>{t("By category")}</span>
          {cols.map((c) => <span key={c} className="text-right text-[12px] leading-[1.3]" style={{ color: MUTED }}>{c}</span>)}
        </div>
        {rows.map(([name, vals]) => (
          <div key={name} className={`${GRID} mt-[10px]`}>
            <span className="text-[14px] font-semibold" style={{ color: INK }}>{name}</span>
            {vals.map((v, i) => <span key={i} className="text-right text-[16px] font-semibold tabular-nums" style={{ color: INK }}>{v}</span>)}
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] leading-[1.5]" style={{ color: MUTED }}>
        {t("Method: Xiaohongshu keyword search, accounts run by Singapore businesses only, latest 5 posts each, one-day snapshot on 24 September 2026. Two categories, not a random sample; about 48 distinct businesses; observed publicly, nobody interviewed. The data does not show why likes are low or which content works. Those are questions for after launch.")}
      </p>
    </div>
  );
}

// ── Slide 07 · Product ───────────────────────────────────────────────────────
const APP_URL = "https://claude.ai/artifact/Fyg3Td1oyL26qYEskSyU3B";
const MVP_SHOTS: Shot[] = [
  { src: `${IMG}/app-start.webp`, alt: "Latest MVP design: choose an existing account or a new one", caption: "Start · Existing account or a new one" },
  { src: `${IMG}/app-upload.webp`, alt: "Latest MVP design: upload a profile screenshot for the audit", caption: "Upload · A profile screenshot, no login" },
  { src: `${IMG}/app-diagnosis.webp`, alt: "Latest MVP design: diagnostic result as a checklist with copy-ready fixes (sample data)", caption: "Diagnose · Checklist with copy-ready fixes (sample data)" },
  { src: `${IMG}/app-details.webp`, alt: "Latest MVP design: additional details, with the audit gaps carried into the brief (sample data)", caption: "Decide · Audit gaps carried into the brief (sample data)" },
  { src: `${IMG}/app-post.webp`, alt: "Latest MVP design: one finished post with a copy button (sample data)", caption: "Create · One finished post at a time (sample data)" },
  { src: `${IMG}/app-shotlist.webp`, alt: "Latest MVP design: shot list and reasoning below the post (sample data)", caption: "Publish · Copy, shot list, reasoning (sample data)" },
];

function Slide06({ onOpen }: { onOpen: OpenLightbox }) {
  const t = useT();
  const steps = [
    { n: "01", s: t("Start"), d: t("Existing account or a new one") },
    { n: "02", s: t("Upload"), d: t("A profile screenshot, no login") },
    { n: "03", s: t("Diagnose"), d: t("What is missing, and the fix") },
    { n: "04", s: t("Decide"), d: t("Gaps carry into the next step") },
    { n: "05", s: t("Create"), d: t("One finished post at a time") },
    { n: "06", s: t("Publish"), d: t("Copy, shoot, post") },
  ];
  return (
    <div className="absolute inset-0 flex flex-col px-[144px] pb-[92px] pt-[76px]">
      <div className="flex items-baseline justify-between">
        <Tag>{t("07 · Product")}</Tag>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-medium transition-opacity hover:opacity-70"
          style={{ color: "#0066cc" }}
        >
          {t("Open the live app")} ↗
        </a>
      </div>
      <h2 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-0.022em]" style={{ color: INK }}>
        {t("That became the product: from the account to a post ready to publish.")}
      </h2>

      <div className="mt-8 flex flex-1 items-start justify-between">
        {steps.map(({ n, s, d }, i) => (
          <div key={n} className="flex flex-col gap-4">
            <div className="flex flex-col gap-[3px]">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] font-medium" style={{ color: MUTED }}>{n}</span>
                <span className="text-[18px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{s}</span>
              </div>
              <span className="whitespace-nowrap text-[13px]" style={{ color: BODY }}>{d}</span>
            </div>
            <Phone shot={MVP_SHOTS[i]} group={MVP_SHOTS} width={196} radius={24} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}


// ── Slide 07 · How it works ──────────────────────────────────────────────────
type Step = { stage: string; q: string; a: string; write?: boolean };
function Pipeline({ label, sub, steps }: { label: string; sub: string; steps: Step[] }) {
  const t = useT();
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-baseline gap-4">
        <span className="text-[16px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{label}</span>
        <span className="text-[14px]" style={{ color: MUTED }}>{sub}</span>
      </div>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-5 gap-3">
        {steps.map(({ stage, q, a, write }, i) => (
          <div key={q + i} className="flex flex-col rounded-[24px] px-[22px] py-5" style={{ background: write ? INK : WARM }}>
            <span className="text-[12px] font-medium" style={{ color: write ? "rgba(255,255,255,0.55)" : MUTED }}>
              {String(i + 1).padStart(2, "0")} · {t(stage)}
            </span>
            <p className="mt-[10px] text-[18px] font-semibold leading-[1.18] tracking-[-0.015em]" style={{ color: write ? "#fff" : INK }}>{q}</p>
            <p className="mt-2 text-[14px] leading-[1.42]" style={{ color: write ? "rgba(255,255,255,0.72)" : BODY }}>{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide07() {
  const t = useT();
  const first: Step[] = [
    { stage: "Framework", q: t("Which market are you in?"), a: t("Map the markets: where you are based, where you shoot, where you want to grow.") },
    { stage: "Framework", q: t("Who is doing well there?"), a: t("Profile comparable accounts one by one. Note what to borrow and what not to copy.") },
    { stage: "Framework", q: t("Why do top posts work?"), a: t("Break down top posts: cover hook, searchable title, reasons to save.") },
    { stage: "In product", q: t("Where is this account stuck?"), a: t("From screenshots: account stage, the main bottleneck, the label to build first.") },
    { stage: "In product", q: t("Then it writes."), a: t("A post in the creator's voice, then a second pass to strip the AI tone."), write: true },
  ];
  const current: Step[] = [
    { stage: "Research", q: t("What does the local market look like?"), a: t("I first studied 52 public accounts of Singapore businesses.") },
    { stage: "Research", q: t("What tends to fit here?"), a: t("Four working content rules from that research, written into the product.") },
    { stage: "In product", q: t("What is this account missing?"), a: t("Checks a profile screenshot for what a local business needs: address, booking, hours, verification, visuals.") },
    { stage: "In product", q: t("Which situation is it?"), a: t("Existing or new account, plus your area and what sets you apart.") },
    { stage: "In product", q: t("Then it writes."), a: t("Finished posts for that business. Each one states the rule behind it."), write: true },
  ];
  return (
    <div className="absolute inset-0 flex flex-col px-[144px] pb-[112px] pt-[84px]">
      <Tag>{t("08 · How it works")}</Tag>
      <h2 className="mt-3 [text-wrap:balance] text-[38px] font-semibold leading-[1.08] tracking-[-0.022em]" style={{ color: INK }}>
        {t("Before it writes, it works out the market and the account.")}
      </h2>

      <div className="mt-8 flex min-h-0 flex-1 flex-col gap-6">
        <Pipeline label={t("First version")} sub={t("A 12-step growth-analysis framework I wrote as a skill.")} steps={first} />
        <Pipeline label={t("Current version")} sub={t("Local research done first, then built into the product.")} steps={current} />
      </div>

      <div className="mt-5 flex shrink-0 items-baseline justify-between gap-10">
        <p className="text-[17px] font-medium leading-[1.4]" style={{ color: INK }}>
          {t("ChatGPT starts from a blank prompt. SeedFlow starts from the market and the account.")}
        </p>
        <p className="max-w-[520px] text-right text-[13px] leading-[1.4]" style={{ color: MUTED }}>
          {t("The first version did not fetch competitors live. The four rules are working assumptions. The demo build shows sample data.")}
        </p>
      </div>
    </div>
  );
}

// Small schematic for each decision: what was chosen (left, solid) and what
// was left out (right, dashed and faded). Drawn in code, no text to translate.
const G1 = "#e5e5ea";
const G2 = "#c7c7cc";
function Sketch({ kind }: { kind: 0 | 1 | 2 }) {
  const Bar = ({ w, c = G1, h = 6 }: { w: number | string; c?: string; h?: number }) => (
    <div className="rounded-full" style={{ width: w, height: h, background: c }} />
  );
  const chosen = [
    // 0 · a profile screenshot, uploaded
    <div key="c0" className="relative flex h-full flex-col gap-[9px]">
      <div className="flex items-center gap-2">
        <div className="h-[22px] w-[22px] rounded-full" style={{ background: INK }} />
        <div className="flex flex-col gap-[5px]"><Bar w={62} c={G2} /><Bar w={40} /></div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-[5px]">
        {[0, 1, 2].map((i) => <div key={i} className="rounded-[6px]" style={{ background: G1 }} />)}
      </div>
      <div className="absolute -bottom-[6px] -right-[6px] flex h-[26px] w-[26px] items-center justify-center rounded-full text-[13px] text-white" style={{ background: INK }}>↑</div>
    </div>,
    // 1 · a checklist: status and a fix per item
    <div key="c1" className="flex h-full flex-col justify-between">
      {[{ fill: INK, w: 78, fix: true }, { fill: "half", w: 60, fix: true }, { fill: "none", w: 70, fix: false }].map(({ fill, w, fix }, i) => (
        <div key={i} className="flex items-center gap-[9px]">
          <div
            className="h-[16px] w-[16px] shrink-0 rounded-full"
            style={fill === "none" ? { boxShadow: `inset 0 0 0 2px ${G2}` } : fill === "half" ? { background: `linear-gradient(90deg, ${INK} 50%, transparent 50%)`, boxShadow: `inset 0 0 0 2px ${INK}` } : { background: INK }}
          />
          <Bar w={w} c={G2} />
          {fix && <div className="ml-auto h-[14px] w-[30px] rounded-full" style={{ background: G1 }} />}
        </div>
      ))}
    </div>,
    // 2 · one finished post with a copy button
    <div key="c2" className="flex h-full flex-col gap-[8px]">
      <div className="flex-1 rounded-[8px]" style={{ background: G1 }} />
      <Bar w="86%" c={G2} />
      <Bar w="58%" />
      <div className="h-[16px] w-[58px] rounded-full" style={{ background: INK }} />
    </div>,
  ];
  const skipped = [
    // 0 · a login / authorisation form
    <div key="s0" className="flex h-full flex-col items-center justify-between">
      <div className="h-[18px] w-[18px] rounded-full" style={{ boxShadow: `inset 0 0 0 2px ${G2}` }} />
      <div className="h-[18px] w-full rounded-[6px]" style={{ boxShadow: `inset 0 0 0 1.5px ${G2}` }} />
      <div className="h-[18px] w-full rounded-[6px]" style={{ boxShadow: `inset 0 0 0 1.5px ${G2}` }} />
      <div className="h-[16px] w-[70%] rounded-full" style={{ background: G2 }} />
    </div>,
    // 1 · a single score
    <div key="s1" className="flex h-full items-center justify-center">
      <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full text-[21px] font-semibold tracking-[-0.02em]" style={{ boxShadow: `inset 0 0 0 6px ${G1}`, color: G2 }}>72</div>
    </div>,
    // 2 · an editor with tools
    <div key="s2" className="flex h-full flex-col justify-between">
      <div className="flex gap-[5px]">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-[14px] w-[14px] rounded-[4px]" style={{ boxShadow: `inset 0 0 0 1.5px ${G2}` }} />)}
      </div>
      {[34, 62].map((x) => (
        <div key={x} className="relative h-[3px] rounded-full" style={{ background: G1 }}>
          <div className="absolute top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full" style={{ left: `${x}%`, background: G2 }} />
        </div>
      ))}
      <Bar w="90%" />
      <Bar w="64%" />
    </div>,
  ];
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="h-[116px] flex-1 rounded-[18px] bg-white p-[16px]" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 14px 30px -18px rgba(0,0,0,0.18)" }}>
        {chosen[kind]}
      </div>
      <div className="h-[116px] flex-1 rounded-[18px] p-[16px]" style={{ border: `1.5px dashed ${G2}`, opacity: 0.9 }}>
        {skipped[kind]}
      </div>
    </div>
  );
}

// ── Slide 08 · Decisions ─────────────────────────────────────────────────────
function Slide08() {
  const t = useT();
  const decisions = [
    {
      chose: t("Screenshot onboarding"),
      over: t("not account connection"),
      problem: t("A diagnosis should not require login or account authorisation."),
      constraint: t("The earlier profile-link fetch failed whenever Xiaohongshu asked for login or verification."),
      tradeoff: t("One manual step, and the audit only sees what is in the screenshot."),
    },
    {
      chose: t("Actionable checklist"),
      over: t("not a numerical score"),
      problem: t("A score says how good or bad. It does not say what to change."),
      constraint: t("The early score dashboard was mostly hardcoded. There was no validated scoring model."),
      tradeoff: t("No single number to track over time. Each item gets a status and a copy-ready fix."),
    },
    {
      chose: t("Publish-ready content"),
      over: t("not a content editor"),
      problem: t("The goal is a post that goes live. A complex editor adds a task before that."),
      constraint: t("Solo build. The first-release editor, AI Studio, took heavy state and sync debugging."),
      tradeoff: t("Less control inside the app. Generation quality has to carry the weight."),
    },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("09 · Decisions")}</Tag>
      <h2 className={HEADLINE} style={{ color: INK }}>
        {t("Along the way, three design decisions shaped it.")}
      </h2>

      <div className="mt-12 grid min-h-0 flex-1 grid-cols-3 gap-6">
        {decisions.map(({ chose, over, problem, constraint, tradeoff }, i) => (
          <div key={chose} className={`flex flex-col px-9 py-9 ${TILE}`} style={{ background: WARM }}>
            <p className="text-[23px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: INK }}>{chose}{t(",")}</p>
            <p className="text-[23px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: "#a1a1a6" }}>{over}</p>
            <div className="flex flex-1 flex-col justify-center py-5">
              <Sketch kind={i as 0 | 1 | 2} />
            </div>
            <div className="flex flex-col gap-[16px]">
              {[
                { k: t("Problem"), v: problem },
                { k: t("Constraint"), v: constraint },
                { k: t("Trade-off"), v: tradeoff },
              ].map(({ k, v }) => (
                <div key={k} className="flex flex-col gap-[3px]">
                  <span className="text-[13px] font-medium" style={{ color: MUTED }}>{k}</span>
                  <span className="text-[16px] leading-[1.4]" style={{ color: INK }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Slide 09 · Next ──────────────────────────────────────────────────────────
function Slide09() {
  const t = useT();
  const cols = [
    {
      k: t("What I built"),
      items: [
        t("A first version on a real model, live for testing."),
        t("V2.0 of the app, in development: the full flow and two account paths."),
        t("In the demo build, the AI steps run on sample data."),
      ],
    },
    {
      k: t("Early signals"),
      items: [
        t("Potential users found it more convenient than using ChatGPT directly."),
        t("They liked the quality of the copy."),
        t("A first group of potential users to launch with."),
      ],
    },
    {
      k: t("What comes next"),
      items: [
        t("Launch the app."),
        t("Promote it to real users."),
        t("Track what they publish, whether they return, and whether they pay."),
      ],
    },
  ];
  return (
    <div className={FRAME}>
      <Tag>{t("10 · Next")}</Tag>
      <h2 className={HEADLINE} style={{ color: INK }}>
        {t("Early feedback is encouraging. Next: launch, and get it to real users.")}
      </h2>

      <div className="mt-14 grid min-h-0 flex-1 grid-cols-3 gap-20">
        {cols.map(({ k, items }) => (
          <div key={k} className="flex flex-col">
            <Eyebrow>{k}</Eyebrow>
            <ul className="mt-4 flex flex-col gap-4">
              {items.map((it) => (
                <li key={it} className="text-[18px] leading-[1.38]" style={{ color: INK }}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`mt-6 shrink-0 px-11 py-8 text-white ${TILE}`} style={{ background: INK }}>
        <p className="text-[30px] font-semibold leading-[1.15] tracking-[-0.018em]">
          {t("Build quickly. Question assumptions. Validate what matters.")}
        </p>
      </div>
    </div>
  );
}

// ── Slide 11 · Appendix: tech stack ──────────────────────────────────────────
function Slide11() {
  const t = useT();
  const rows: [string, string, string][] = [
    [t("Form"), t("Mobile web app"), t("Mobile app (the same code also exports to web)")],
    [t("Front end"), "Next.js 16 · React 19 · Tailwind CSS", "Expo 57 · React Native 0.86 · React 19 · Expo Router"],
    [t("Language"), "TypeScript", t("TypeScript (app) · JavaScript (server)")],
    [t("Back end"), t("Next.js API routes, in the same project"), t("A separate Node.js + Express service with two endpoints")],
    [t("Model"), t("Qwen qwen-vl-plus (vision)"), t("Qwen qwen3.8-flash (vision)")],
    [t("Can switch to"), "OpenAI gpt-4.1 · Gemini 2.5 Flash", t("OpenAI gpt-4.1 · Gemini 2.5 Flash, by one setting")],
    [t("Database"), t("Cloudflare D1 (SQLite) with Drizzle ORM"), t("None. Every request is stateless.")],
    [t("Login"), t("Sign-up and login"), t("No login. Upload a screenshot to start.")],
    [t("Deployment"), t("Cloudflare Workers, live"), t("Server code complete, not deployed yet")],
  ];
  const GRID = "grid grid-cols-[190px_1fr_1fr] gap-x-10";
  return (
    <div className="absolute inset-0 flex flex-col px-[144px] pb-[112px] pt-[84px]">
      <Tag>{t("Appendix · Tech stack")}</Tag>
      <h2 className="mt-3 [text-wrap:balance] text-[38px] font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: INK }}>
        {t("How the two versions are built.")}
      </h2>

      <div className={`mt-9 flex min-h-0 flex-1 flex-col px-10 py-8 ${TILE}`} style={{ background: WARM }}>
        <div className={GRID}>
          <span />
          <span className="text-[17px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{t("First version")}</span>
          <span className="text-[17px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{t("V2.0, in development")}</span>
        </div>
        <div className="mt-4 flex flex-1 flex-col justify-between">
          {rows.map(([k, a, b]) => (
            <div key={k} className={`${GRID} items-baseline`}>
              <span className="text-[13px] font-medium" style={{ color: MUTED }}>{k}</span>
              <span className="text-[16px] leading-[1.35]" style={{ color: INK }}>{a}</span>
              <span className="text-[16px] leading-[1.35]" style={{ color: INK }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-[1.5]" style={{ color: MUTED }}>
        {t("Model calls return strict JSON and fail loudly: an error is shown, never filler content. API keys stay on the server. Designed and built solo with AI coding tools.")}
      </p>
    </div>
  );
}

// ── Deck shell ───────────────────────────────────────────────────────────────
const TITLES = ["Context", "First version", "Testing", "Turning point", "Evidence", "Insights", "Product", "How it works", "Decisions", "Next", "Tech stack"];
const TOTAL = TITLES.length;
// Project navigation. SeedFlow is the default; the others are placeholders until their content is added.
const PROJECTS: { name: string; href?: string }[] = [
  { name: "SeedFlow" },
  { name: "Shopee AI Chatbot Builder", href: "/shopee-chatbot-builder-presentation" },
  { name: "AI Mascot Platform" },
  { name: "Growth Daily", href: "/growth-daily-presentation" },
];

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function SeedFlowPresentationPage() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [project, setProject] = useState(0);
  const [scale, setScale] = useState<number | null>(null);
  const [notes, setNotes] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: Shot[]; index: number } | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const t = (s: string) => translate(lang, s);
  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next: Lang = l === "en" ? "zh" : "en";
      try { window.localStorage.setItem("seedflow-presentation-lang", next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // Restore the last language used on this page.
  useEffect(() => {
    try {
      if (window.localStorage.getItem("seedflow-presentation-lang") === "zh") setLang("zh");
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

  // Fit the fixed 1600×900 stage to the viewport.
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Start on the slide named in the URL hash, and keep the hash in sync.
  useEffect(() => {
    const n = parseInt(window.location.hash.replace("#", ""), 10);
    if (n >= 1 && n <= TOTAL) setIndex(n - 1);
  }, []);
  useEffect(() => {
    try { window.history.replaceState(null, "", `#${index + 1}`); } catch { /* ignore */ }
  }, [index]);

  // Elapsed timer for rehearsal (shown in the notes panel).
  useEffect(() => {
    if (startedAt === null) return;
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  // Keyboard navigation.
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
      else if (/^[1-9]$/.test(k)) go(parseInt(k, 10) - 1);
      else if (k === "0") go(9);
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
    <Slide05 key="5" />,
    <Slide05b key="6" />,
    <Slide06 key="7" onOpen={openLightbox} />,
    <Slide07 key="8" />,
    <Slide08 key="9" />,
    <Slide09 key="10" />,
    <Slide11 key="11" />,
  ];
  const note = NOTES[index];
  const targetTotal = NOTES.reduce((a, n) => a + n.secs, 0);

  return (
    <LangContext.Provider value={lang}>
    <main lang={lang === "zh" ? "zh-CN" : "en"} className="fixed inset-0 select-none overflow-hidden bg-white antialiased" style={{ color: INK, fontFamily: FONT }}>
      {/* 16:9 stage */}
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

        {/* Project navigation (default: SeedFlow) */}
        <nav className="absolute left-0 right-0 top-0 z-20 flex h-[72px] items-center gap-8 px-[144px]" aria-label="Projects">
          {PROJECTS.map((p, i) => {
            const style = { color: i === project ? INK : "#b0b0b5", fontWeight: i === project ? 600 : 400 } as const;
            return p.href ? (
              <Link key={p.name} href={p.href} className="text-[13px] transition-colors hover:text-black" style={style}>{p.name}</Link>
            ) : (
              <button
                key={p.name}
                type="button"
                tabIndex={-1}
                onClick={() => setProject(i)}
                className="text-[13px] transition-colors hover:text-black"
                style={style}
              >
                {p.name}
              </button>
            );
          })}
        </nav>
        {project !== 0 && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
            <h2 className="text-[56px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{PROJECTS[project].name}</h2>
            <p className="mt-4 text-[20px]" style={{ color: MUTED }}>{t("To be added")}</p>
          </div>
        )}

        {/* Footer chrome */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[64px] items-center justify-between px-[144px]">
          <div className="flex items-center gap-5 text-[12px]" style={{ color: MUTED }}>
            {project === 0 && <Link href="/seedflow" className="transition-colors hover:text-black">{t("Full case study")}</Link>}
          </div>
          <div className="flex items-center gap-6">
            {project === 0 && <nav className="flex items-center gap-4" aria-label="Chapters">
              {TITLES.map((title, i) => (
                <button
                  key={title}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(i)}
                  className="text-[12px] transition-colors hover:text-black"
                  style={{ color: i === index ? INK : "#b0b0b5", fontWeight: i === index ? 600 : 400 }}
                >
                  {t(title)}
                </button>
              ))}
            </nav>}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? "切换到中文" : "Switch to English"}
              className="flex items-center gap-[6px] text-[12px] font-medium transition-opacity hover:opacity-60"
              style={{ color: INK }}
            >
              <span style={{ opacity: lang === "en" ? 1 : 0.35 }}>EN</span>
              <span style={{ opacity: 0.35 }}>/</span>
              <span style={{ opacity: lang === "zh" ? 1 : 0.35 }}>中文</span>
            </button>
            {project === 0 && <><span className="text-[12px] font-medium tabular-nums" style={{ color: MUTED }}>
              {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <div className="flex gap-1">
              <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" className="flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors hover:bg-[#f5f5f7] disabled:opacity-25 disabled:hover:bg-transparent">←</button>
              <button type="button" onClick={() => go(index + 1)} disabled={index === TOTAL - 1} aria-label="Next slide" className="flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors hover:bg-[#f5f5f7] disabled:opacity-25 disabled:hover:bg-transparent">→</button>
            </div></>}
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
              <span>
                讲稿 · {String(index + 1).padStart(2, "0")} {t(TITLES[index])} · 约 {note.secs} 秒
              </span>
              <span className="tabular-nums">
                已用 {fmt(elapsed)} / 目标 {fmt(targetTotal)} · R 重置 · N 关闭
              </span>
            </div>
            {note.text.map((p) => (
              <p key={p} className="text-[17px] leading-[1.75]" style={{ color: INK }}>{p}</p>
            ))}
          </div>
        </aside>
      )}

      {/* Lightbox for screenshots and source charts */}
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
