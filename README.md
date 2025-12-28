# ArchFlow — AI-Powered Architecture Decision Platform

> **Live Production Demo** • Architecture Analysis • Hybrid AI / Deterministic Workflows

🔗 **Live Demo:** [https://archflow-sigma.vercel.app/](https://archflow-sigma.vercel.app/)

ArchFlow is an AI-assisted platform for **architecture analysis and decision support**.
It demonstrates how modern engineering teams can automate documentation, detect architectural risk, and generate traceable recommendations—while keeping AI **observable, auditable, and constrained to the right parts of the workflow**.

---

## ✨ Key Capabilities

* **Architecture Decision Support**
  AI-assisted recommendations with clear rationale, trade-offs, and context.

* **Hybrid Analysis Pipeline**
  Deterministic static analysis combined with AI synthesis—no black boxes.

* **Traceable & Auditable Workflows**
  Every insight maps back to source code and deterministic rules.

* **Repository Insights Dashboard**
  Live metrics for tech debt, dependency risk, security signals, and performance.

* **Enterprise-Ready Design**
  Built with observability, compliance, and scalability in mind.

---

## 🧠 Design Philosophy

ArchFlow is built around a simple principle:

> **AI should augment engineering judgment, not replace it.**

Deterministic analysis is used wherever possible.
AI is applied only for higher-order reasoning—such as pattern recognition, synthesis, and recommendation generation—and its outputs remain fully traceable.

---

## 🏗️ Architecture Overview

**Analysis Pipeline**

1. **Code Ingest** — Repository sync and parsing
2. **Static Analysis** — Dependency mapping and signal extraction
3. **AI Reasoning** — Pattern recognition and insight synthesis
4. **Rule Validation** — Deterministic compliance and sanity checks
5. **Output Generation** — Reports, insights, and actionable recommendations

Each stage is observable, isolated, and designed for auditability.

---

## 🧰 Tech Stack

* **Frontend:** Next.js 14 (App Router), TypeScript
* **Styling:** Tailwind CSS
* **UI:** Lucide React
* **Deployment:** Vercel
* **Architecture:** Monorepo, component-driven design

---

## 🚀 Getting Started (Local Development)

```bash
git clone https://github.com/QuisTech/archflow
cd archflow/packages/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
to view the dashboard.

---

## 📁 Repository Structure

```
archflow/
├── packages/
│   ├── web/          # Next.js 14 dashboard
│   ├── api/          # (Planned) Backend services
│   └── docs/         # (Planned) Documentation
└── infrastructure/  # (Planned) Deployment & IaC
```

---

## 📊 What This Project Demonstrates

* End-to-end system design with a long-term architecture vision
* Practical application of LLMs in production-style workflows
* Clear separation between AI reasoning and deterministic logic
* Enterprise-grade thinking around observability and compliance
* Polished UX for complex technical insights

---

## 🔗 Links

* **Live Demo:** [https://archflow-sigma.vercel.app/](https://archflow-sigma.vercel.app/)
* **Source Code:** [https://github.com/QuisTech/archflow](https://github.com/QuisTech/archflow)

---

## 📄 License

MIT License — see LICENSE for details.

ArchFlow explores the intersection of AI-assisted tooling, software architecture, and production-grade engineering practices.
