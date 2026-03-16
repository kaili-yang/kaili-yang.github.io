---
title: The "Micro" in Microservices is a Trap
description: Focus on Service Granularity and Reuse Patterns
---

A few months later, our newest tech lead, Taylen, came to me with a proposal to split our Notification service into three separate services: an SMS service, an Email service, and a Postal Letter service.

"Micro means small," Taylen argued. "We need to adhere to the **Single Responsibility Principle (SRP)**."

I had to explain that sizing a service purely by lines of code or a strict interpretation of "single purpose" is a trap. **Granularity** requires balancing specific drivers. We analyzed the **Code Volatility** of the notification methods. It turned out the Postal Letter code changed weekly, while SMS and Email code hadn't been touched in six months. Furthermore, SMS required a **Throughput** of 220,000 requests per minute, while Postal Letters processed exactly one per minute.

By analyzing these **Granularity Disintegrators** (**Code Volatility** and **Scalability**), we found the right boundaries. We didn't create three services; we created two: an **Electronic Notification Service** (handling stable, high-throughput Email/SMS) and a **Postal Letter Service** (handling highly volatile, low-throughput code).

This brought up the issue of **Shared Code**. Taylen wanted to take our common security authorization logic and deploy it as a standalone **Shared Service**. While a shared service allows you to deploy a change instantly without forcing other services to recompile, it introduces massive **Network Latency**, **Security Latency**, and a dangerous **Single Point of Failure** at runtime.

Instead, we chose the **Sidecar Pattern** to form a **Service Mesh**. We placed our **Operational Coupling** (logging, monitoring, circuit breakers) into a separate, attached component (the **Sidecar**) that runs alongside every microservice. This cleanly separated our **Domain Logic** from our **Infrastructure Plumbing**.

> **The Architect’s Insight:** "Reuse is abuse" is a common but flawed mantra in distributed systems. You must balance shared code carefully. Use compile-time **Shared Libraries** for stable, **Homogeneous Code**, but beware of **Dependency Management** nightmares. Use the **Sidecar Pattern** to enforce **Cross-Cutting Operational Consistency** without entangling your business logic.
