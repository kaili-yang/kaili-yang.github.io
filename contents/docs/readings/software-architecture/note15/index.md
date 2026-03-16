---
title: The Evangelist's Trap
description: Focus on Architectural Rigor and Trade-off Frameworks
---

Nine months after we began tearing apart our **Monolithic Ticketing System**, the system was highly **Scalable**, **Fault-Tolerant**, and the stakeholders were thrilled. However, during the retrospective, a junior developer declared we should use **Asynchronous Publish-and-Subscribe Messaging** for every single integration moving forward. 

I smiled, but I cringed internally. We were falling into the most dangerous psychological pitfall in software engineering: **Evangelism**.

### The "Out of Context" Trap
When engineers find a pattern that works, they tend to evangelize it, ignoring its fatal flaws. I call this the **"Out of Context" Trap**. For example, a single **Pub/Sub Topic** looks great for **Extensibility**, but if consumers require different **Data Contracts**, it leads to **Stamp Coupling**, creating massive, brittle contracts and **PII (Personally Identifiable Information)** security vulnerabilities.

There is no **Silver Bullet**. You must perform **Trade-off Analysis** constantly.

### The Framework for Sanity
To stop the team from blindly applying patterns, we standardized a three-step framework for making **Architectural Decisions**:

1.  **Identify Entanglement**: Map your **Static Coupling** (compile-time/deployment) and **Dynamic Coupling** (runtime communication).
2.  **Analyze Coupling Points**: Identify the forces causing friction—**Communication** (Sync vs. Async), **Consistency** (Atomic vs. Eventual), or **Coordination** (**Orchestrated** vs. **Choreographed**).
3.  **Assess the Trade-offs**: Use **Qualitative Analysis** rather than generic numeric scores to compare solutions objectively.

To ensure we weren't missing alternatives, we forced teams to build **MECE (Mutually Exclusive, Combinatorially Exhaustive) Lists** to cover the entire **Capability Space** without overlaps. Finally, we learned to **Model Relevant Domain Cases**—diagramming how a pattern reacts if a database crashes or a transaction is declined.

> **The Architect’s Final Insight:** Do not allow yourself to be forced into evangelizing a specific **Technology Stack**. An architect adds value by becoming the **Objective Arbiter of Trade-offs**. Stop searching for the "perfect" design. Embrace the friction, analyze the **Constraints**, and confidently build the **Least Worst Architecture** possible for your specific reality.
