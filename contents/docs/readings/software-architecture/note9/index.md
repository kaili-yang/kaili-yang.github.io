---
title: Who Owns the Data?
description: Focus on Data Ownership and Read Patterns
---

Once our services were separated, we hit the absolute hardest part of distributed systems: **Data Ownership**. The general rule is simple: the service that performs **Write Operations** to a table is the owner. However, we ran into a **Joint Ownership** scenario where both the Catalog and Inventory services needed to write to the Product table.

We resolved this using the **Delegate Technique**. We assigned the Catalog service as the **Single Source of Truth** (the owner), stripping the Inventory service of its direct write access and forcing it to use **Remote Access Protocols**. 

But this created a new problem: how to read data without crushing performance?
1.  **Inter-service Communication Pattern**: Synchronous remote calls introduced severe **Network Latency** and **Static Dependencies**.
2.  **Data Domain Pattern**: Sharing a **Database Schema** violates strict **Bounded Contexts** and makes changes risky.

We finally solved this using the **Replicated Caching Pattern**. We placed a read-only, **In-memory Replica** directly inside the consuming service. The data is continuously synchronized, giving us nanosecond read performance and excellent **Fault Tolerance**, with the only trade-off being a **Startup Dependency**.
