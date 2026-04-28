const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle,
  Header, Footer, PageNumber
} = require('docx');
const fs = require('fs');

const today = "April 28, 2026";
const filename = "GenAI-News-2026-04-28.docx";

// Helper: section heading
function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: "Arial" })],
    spacing: { before: 360, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E75B6", space: 1 } }
  });
}

// Helper: sub-heading
function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, font: "Arial" })],
    spacing: { before: 200, after: 80 }
  });
}

// Helper: bullet with optional hyperlink source
function bullet(text, sourceLabel, sourceUrl) {
  const children = [new TextRun({ text, font: "Arial", size: 22 })];
  if (sourceLabel && sourceUrl) {
    children.push(new TextRun({ text: " — Source: ", font: "Arial", size: 22 }));
    children.push(new ExternalHyperlink({
      link: sourceUrl,
      children: [new TextRun({ text: sourceLabel, style: "Hyperlink", font: "Arial", size: 22 })]
    }));
  }
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children,
    spacing: { after: 100 }
  });
}

// Helper: normal paragraph
function para(text, bold = false) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Arial", size: 22, bold })],
    spacing: { after: 120 }
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Daily GenAI & AI Agents News", font: "Arial", size: 18, color: "666666" }),
            new TextRun({ text: `  |  ${today}`, font: "Arial", size: 18, color: "666666" })
          ],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 1 } }
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", font: "Arial", size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "888888" }),
            new TextRun({ text: " | Automated GenAI News Summary", font: "Arial", size: 18, color: "888888" })
          ]
        })]
      })
    },
    children: [
      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `Daily GenAI & AI Agents News`, font: "Arial", size: 48, bold: true, color: "1F4E79" })],
        spacing: { before: 0, after: 80 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: today, font: "Arial", size: 28, color: "2E75B6", italics: true })],
        spacing: { before: 0, after: 400 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2E75B6", space: 4 } }
      }),

      // ── TOP STORY ──────────────────────────────────────────────────────────
      sectionHeading("🏆 Top Story"),
      para("GPT-5 Turbo & Claude Opus 4 Land in the Same Week — Kicking Off the Biggest AI Month Yet", true),
      para(
        "April 2026 has been dubbed the densest model-release month in AI history. OpenAI shipped GPT-5 Turbo on April 7 with native image and audio generation baked into a single model, while Anthropic's Claude Opus 4 debuted with a 200K-token context window and a 72.1% SWE-bench score — topping all public coding benchmarks. Six production-grade models from six organisations shipped between April 1–10, signalling a new era of rapid-cycle capability competition."
      ),
      new Paragraph({
        children: [
          new TextRun({ text: "Sources: ", font: "Arial", size: 22, bold: true }),
          new ExternalHyperlink({ link: "https://fazm.ai/blog/new-llm-releases-april-2026", children: [new TextRun({ text: "fazm.ai LLM Releases", style: "Hyperlink", font: "Arial", size: 22 })] }),
          new TextRun({ text: "  |  ", font: "Arial", size: 22 }),
          new ExternalHyperlink({ link: "https://llm-stats.com/llm-updates", children: [new TextRun({ text: "llm-stats.com", style: "Hyperlink", font: "Arial", size: 22 })] })
        ],
        spacing: { after: 200 }
      }),

      // ── MODEL RELEASES ─────────────────────────────────────────────────────
      sectionHeading("🤖 Model Releases & Updates"),

      subHeading("Anthropic"),
      bullet(
        "Claude Opus 4 & Sonnet 4 (released April 2): Opus 4 features a 200K-token context window and tops SWE-bench Verified at 72.1%. Sonnet 4 brings balanced speed and capability for everyday tasks.",
        "fazm.ai", "https://fazm.ai/blog/new-llm-releases-april-2026"
      ),
      bullet(
        "Claude Mythos Preview (April 7): Exclusively available to ~50 partners via Project Glasswing, focused on cybersecurity vulnerability detection and advanced reasoning — described as a \"step change\" above Opus 4.6.",
        "whatllm.org", "https://whatllm.org/blog/new-ai-models-april-2026"
      ),

      subHeading("OpenAI"),
      bullet(
        "GPT-5 Turbo (April 7): Native image and audio generation within a single unified model — a significant step toward true multimodal intelligence. OpenAI surpassed $25 billion in annualised revenue.",
        "fazm.ai", "https://fazm.ai/blog/new-llm-releases-april-2026"
      ),

      subHeading("Google"),
      bullet(
        "Gemini 3.1 Pro leads 13 of 16 benchmarks (77.1% on ARC-AGI-2). Gemini 3.1 Flash-Lite delivers 2.5× faster responses and 45% faster output generation for efficiency-focused deployments.",
        "AI & News", "https://www.aiandnews.com/blog/april-2026-ai-news/"
      ),
      bullet(
        "Gemma 4 family (April 2, Apache 2.0): Four open-weight models for varied deployment scenarios; Gemma 4 31B Dense is the flagship. Full Apache 2.0 licence permits commercial use.",
        "llm-stats.com", "https://llm-stats.com/llm-updates"
      ),

      subHeading("Meta & Open Source"),
      bullet(
        "Meta debuted a major new model following its $14 billion deal with Scale AI's Alexandr Wang, competing directly with Google and OpenAI on frontier capabilities.",
        "CNBC", "https://www.cnbc.com/2026/04/08/meta-debuts-first-major-ai-model-since-14-billion-deal-to-bring-in-alexandr-wang.html"
      ),
      bullet(
        "Arcee AI Trinity: A 400B-parameter open model under Apache 2.0, designed for enterprises needing a large, modifiable model without licensing restrictions.",
        "fazm.ai", "https://fazm.ai/blog/new-open-source-llm-releases-april-2026"
      ),

      // ── RESEARCH ───────────────────────────────────────────────────────────
      sectionHeading("🔬 Research Highlights"),
      bullet(
        "Neuro-Symbolic VLA for Robotics (Tufts, April 5): A new Visual-Language-Action system combining symbolic reasoning with deep learning cuts AI energy use by up to 100× while improving accuracy — a major efficiency breakthrough for embodied AI.",
        "ScienceDaily", "https://www.sciencedaily.com/releases/2026/04/260405003952.htm"
      ),
      bullet(
        "Anthropic Emotion Interpretability (April 2): A paper titled \"Emotion Concepts and their Function in a Large Language Model\" identified 171 distinct emotion activation patterns inside Claude Sonnet 4.5, advancing the science of model interpretability.",
        "crescendo.ai", "https://www.crescendo.ai/news/latest-ai-news-and-updates"
      ),
      bullet(
        "Physics-Informed ML (Univ. of Hawaiʻi): A new algorithm published in AIP Advances allows AI to adhere to physical laws while processing complex datasets, delivering improved accuracy in fluid dynamics and climate modelling.",
        "devflokers.com", "https://www.devflokers.com/blog/new-ai-papers-arxiv-last-24-hours-april-2026"
      ),
      bullet(
        "TurboQuant at ICLR 2026 (Google): A new quantisation algorithm addressing memory overhead in vector quantisation, enabling more efficient model compression without accuracy degradation.",
        "crescendo.ai", "https://www.crescendo.ai/news/latest-ai-news-and-updates"
      ),
      bullet(
        "Stanford 2026 AI Index: AI agents jumped from 12% to 66% success on real computer tasks in one year; AI now navigates software almost as well as humans — a milestone the report calls \"crossing the chasm\".",
        "Stanford HAI", "https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report"
      ),

      // ── AGENTS ─────────────────────────────────────────────────────────────
      sectionHeading("🕵️ AI Agents & Agentic Frameworks"),
      bullet(
        "Mosaic Singularity launches HeartBeatAgents 1.0 (April 28): A production-grade substrate for enterprise autonomous AI agents that complete real business workflows end-to-end, announced today.",
        "The Manila Times", "https://www.manilatimes.net/2026/04/28/tmt-newswire/globenewswire/own-your-intelligence-mosaic-singularity-launches-heartbeatagents-10-the-production-substrate-for-enterprise-autonomous-ai-agents/2330414"
      ),
      bullet(
        "ServiceNow + Google Cloud (April 22): Joint AI agent solutions targeting autonomous enterprise operations across 5G networking, retail, and IT systems — unveiled at Google Cloud Next.",
        "Google Cloud Press", "https://www.googlecloudpresscorner.com/2026-04-22-ServiceNow-and-Google-Cloud-Unite-AI-Agents-for-Autonomous-Enterprise-Operations"
      ),
      bullet(
        "Mizuho \"Agent Factory\": Japan's Mizuho Financial Group cut AI agent development time by 70% (from two weeks to days), mass-producing autonomous agents across banking operations.",
        "AI Agent Store", "https://aiagentstore.ai/ai-agent-news/2026-april"
      ),
      bullet(
        "Novita AI Sandbox: Delivers system-level isolation with sub-200ms startup for safe, scalable deployment of autonomous agents including OpenClaw and Hermes Agent.",
        "PR Newswire", "https://www.prnewswire.com/news-releases/novita-ai-launches-sandbox-to-secure-openclaw-hermes-agent-and-autonomous-systems-302755870.html"
      ),
      bullet(
        "Agent traffic surge: Autonomous AI agent web traffic grew 7,851% in the past year; machine-to-machine exchanges now dominate web activity, reshaping how the internet functions.",
        "Epsilla Blog", "https://www.epsilla.com/blogs/ai-agent-developments-april-18-2026"
      ),
      bullet(
        "Deloitte + Google Cloud: Deloitte launched a dedicated Agentic AI Transformation Practice built on Gemini Enterprise to accelerate Fortune 500 AI transformation programmes.",
        "Google Cloud Press", "https://www.googlecloudpresscorner.com/2026-04-22-Deloitte-Accelerates-AI-Transformation-on-Gemini-Enterprise-With-Dedicated-Google-Cloud-Agentic-Transformation-Practice"
      ),

      // ── TRAINING & INFERENCE ───────────────────────────────────────────────
      sectionHeading("⚙️ Training & Inference"),
      bullet(
        "Google TPU 8 split (April 22): Google separated training and inference into distinct 8th-gen TPUs. The training chip delivers 2.8× the performance of Ironwood for the same cost; the inference chip (TPU 8i) carries 384 MB of SRAM — triple Ironwood — and 80% better inference performance.",
        "CNBC", "https://www.cnbc.com/2026/04/22/google-launches-training-and-inference-tpus-in-latest-shot-at-nvidia.html"
      ),
      bullet(
        "Meta + AWS Graviton (April 24): Meta signed a deal to use millions of AWS Graviton CPUs for AI inference workloads, reflecting a structural shift from GPU-dominated training toward CPU/heterogeneous inference for agentic pipelines.",
        "TechCrunch", "https://techcrunch.com/2026/04/24/in-another-wild-turn-for-ai-chips-meta-signs-deal-for-millions-of-amazon-ai-cpus/"
      ),
      bullet(
        "Intel + SambaNova heterogeneous inference: A joint initiative signals movement away from GPU-centric architectures toward workload-optimised, mixed-compute inference, with Intel betting on inference as its largest growth market.",
        "The Register", "https://www.theregister.com/2026/04/24/intel_expects_ai_inference_to/"
      ),
      bullet(
        "NVIDIA Rubin platform: NVIDIA unveiled six new Rubin chips and a new AI supercomputer architecture, continuing its cadence of next-gen accelerators ahead of competition from custom silicon.",
        "NVIDIA Newsroom", "https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer"
      ),

      // ── INDUSTRY ──────────────────────────────────────────────────────────
      sectionHeading("💼 Industry & Business"),
      bullet(
        "Q1 2026 venture records shattered: Global VC hit $300B in Q1, up 150%+ YoY. Four mega-deals — OpenAI, Anthropic, xAI, Waymo — accounted for $188B (65% of all global VC). AI now represents 81% of all global venture funding.",
        "Crunchbase News", "https://news.crunchbase.com/venture/record-breaking-funding-ai-global-q1-2026/"
      ),
      bullet(
        "Cognition AI at $25B valuation: The AI coding firm (Devin) is in early talks for a new round that would more than double its valuation to $25 billion.",
        "Bloomberg", "https://www.bloomberg.com/news/articles/2026-04-23/ai-coding-firm-cognition-in-funding-talks-at-25-billion-value"
      ),
      bullet(
        "Ineffable Intelligence raises $1.1B seed: The London-based AI startup secured $1.1B at a $5.1B valuation (led by Sequoia + Lightspeed) — one of the largest seed rounds ever recorded.",
        "AI Funding Tracker", "https://aifundingtracker.com/ai-startup-funding-news-today/"
      ),
      bullet(
        "Merck + Google Cloud ($1B partnership): Merck and Google Cloud announced up to $1B to deploy Gemini Enterprise across R&D, manufacturing, and commercial functions — a landmark pharma-AI deal.",
        "Merck.com", "https://www.merck.com/news/merck-and-google-cloud-partner-to-accelerate-agentic-ai-enterprise-transformation/"
      ),
      bullet(
        "OpenAI acquires Hiro Finance: OpenAI's seventh known acquisition of 2026 brings a personal finance AI startup into the fold, signalling moves into consumer financial applications.",
        "crescendo.ai", "https://www.crescendo.ai/news/latest-ai-news-and-updates"
      ),
      bullet(
        "UN & AI governance pressure: Former industry pioneers are calling for concrete policy measures on job displacement, cybersecurity, and energy allocation as AI capability outpaces regulation.",
        "UN News", "https://news.un.org/en/story/2026/04/1167361"
      ),

      // ── WORTH WATCHING ────────────────────────────────────────────────────
      sectionHeading("👀 Worth Watching"),
      bullet(
        "Claude Mythos rollout: Anthropic's restricted partner preview suggests a new top-of-market model is coming. Watch for general availability announcements and benchmark comparisons with GPT-5 Turbo.",
        "whatllm.org", "https://whatllm.org/blog/new-ai-models-april-2026"
      ),
      bullet(
        "Agent-driven internet: With autonomous agent web traffic up 7,851% YoY, web infrastructure, security, and monetisation models are being tested. Expect emerging standards (e.g., agent authentication, rate limiting) to move fast.",
        "ISACA", "https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2026/agentic-ai-evolution-and-the-security-claw"
      ),
      bullet(
        "CPU vs GPU inference war: Meta's AWS Graviton deal and the Intel/SambaNova alliance suggest the inference layer is fracturing away from GPU dominance. Monitor how Nvidia responds and what this means for inference cost curves.",
        "TechCrunch", "https://techcrunch.com/2026/04/24/in-another-wild-turn-for-ai-chips-meta-signs-deal-for-millions-of-amazon-ai-cpus/"
      ),

      // closing
      new Paragraph({
        children: [new TextRun({ text: " ", font: "Arial", size: 22 })],
        spacing: { before: 400 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— End of Report —", font: "Arial", size: 20, italics: true, color: "888888" })],
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } }
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(`/sessions/adoring-gifted-feynman/mnt/outputs/${filename}`, buffer);
  console.log(`Created: ${filename}`);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
