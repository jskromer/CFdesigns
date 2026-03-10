# IPMVP Core Concepts — Internal Inconsistencies & Critical Ambiguities

*Source: IPMVP Five-Year Statutory Review Working Document (Reference Copy for Public Comments)*  
*Analysis prepared for CFdesigns training — IPMVP Explainer module*

---

## Part 1: Inconsistencies in the Document

### 1. "Adjusted Baseline Energy" Definition Contradicts Its Use in Equations *(High Severity)*

**Definition (Glossary):**
> "The Baseline Period Energy Consumption modified as part of Routine **and Non-Routine** Adjustments to account for changes in the Reporting Period."

**Equation 4 (Section 4.4.1):**
> `Avoided Energy Consumption = Adjusted Baseline Energy – Reporting Period Energy ± Non-Routine Adjustments`

The explanatory text confirms: *"adjusted baseline energy is the baseline period energy plus any **routine** adjustments needed."*

**The problem:** The definition absorbs NRAs into Adjusted Baseline Energy; the equation excludes them from it. These are contradictory. A practitioner building a calculation would produce different results depending on which they follow.

---

### 2. "Building Automation System (BAS)" Is Defined as a "Measure" *(Formal Error)*

**Definition:**
> "A **measure** using the buildings control system to trend data…"

A BAS is a **system/tool**, not an Energy Conservation Measure (ECM). This confuses the instrument with an intervention — particularly notable given the document's otherwise careful distinction between ECMs and measurement infrastructure.

---

### 3. "Savings" Definition Requires Measurement, But Option D Allows Simulation to Replace It *(High Severity)*

**Savings definition:**
> "…determined by comparing **measured** energy values before and after implementation of an ECM."

**Section 4.1 (Option D):**
> "If the Baseline Period or Reporting Period data are unreliable or unavailable, energy data from a **calibrated simulation program** can take the place of the missing data."

Option D savings are technically not "Savings" as defined in the glossary. This isn't merely philosophical — it affects adherence claims and contractual language.

---

### 4. "Savings" Definition Uses "in energy units" but Includes Water *(Terminological)*

> "Value, **in energy units**, of energy consumption, **water** or demand reduction…"

Water is measured in volume units (m³, gallons), not energy units. The preamble contradicts the inclusion of water. The document acknowledges the method applies equally to water but doesn't correct the formal definition.

---

### 5. "Key Parameter" Definition Conflates Savings with Energy Consumption *(Medium Severity)*

**Glossary definition:**
> "Critical variable identified to have a significant impact on the **energy savings** associated with the installation of an ECM."

**Table 2 (Option A description):**
> "key parameter(s), which define the **energy consumption and demand** of the ECM's affected system(s)"

These are not equivalent. A variable can have a large effect on energy consumption while having little effect on *savings* if it shifts baseline and reporting period energy equally. The Table 2 wording is technically correct; the glossary definition is not.

---

### 6. Option D Mis-classified as Retrofit-Isolation *(Structural)*

**Section 5.1:**
> "if only the performance of the ECM itself is of concern, a retrofit-isolation technique may be more suitable (Option **A, B, or D**)."

Option D is Calibrated Simulation and models whole-facility energy use. Calling it a "retrofit-isolation technique" in the same breath as Options A and B is inconsistent with its own description in Section 4.1, where it is described as a whole-facility or partial-facility simulation approach used when data are unavailable.

---

### 7. "Conservative" and "Accurate" Principles Are in Unacknowledged Tension *(Conceptual)*

**Accurate principle:**
> "Accuracy trade-offs should be accompanied by **increased conservativeness**…"

**Conservative principle:**
> "M&V procedures should be designed to responsibly estimate savings such that they are **not overstated**."

Systematically under-reporting savings is not "accurate" — it introduces a directional bias. The document never acknowledges or resolves this tension. From a competent counterfactuals perspective, conservatism is presented as a virtue without recognizing it is a form of inaccuracy in the opposite direction.

---

### 8. Typographic Error in Section 4.4.4 *(Minor)*

> "the level of reported savings depends upon the actual weather **once** and are not changed."

"Once" should read "since" — a word-level editing error that changes the meaning of the sentence.

---

## Part 2: Option B and the Continuous Measurement Question

This is one of the most commercially consequential ambiguities in the document, as Option B typically underpins ESCO performance guarantees where variable loads are involved.

### The Four Relevant Passages

**Passage 1 — Table 2, Definition Column:**
> "Measurement frequency ranges from **short-term to continuous**, depending on the expected variations in savings and length of the reporting period."

Short-term measurement is explicitly permitted. Not continuous by requirement.

**Passage 2 — Table 2, "How Savings are Calculated" Column:**
> "**Short term or continuous** measurements of baseline and reporting period energy, or engineering computations using measurements of proxies of energy consumption and demand."

Again — either/or. Short-term is offered as sufficient.

**Passage 3 — Table 2, Typical Application Example:**
> "In the **baseline period this meter is in place for a week** to verify constant loading. The meter is **in place throughout the reporting period** to measure power consumption and demand."

The example shows an *asymmetric* approach: only one week in the baseline (short-term), but continuous throughout the reporting period. The example implies continuous reporting-period measurement is the operational norm — even though the definition doesn't require it.

**Passage 4 — Section 5.2 (shared Options A & B section):**
> "Parameters may be continuously measured or periodically measured for short periods. The expected amount of variation in the parameter will govern the decision of whether to measure continuously or periodically."

This section sits under "Options A & B: Retrofit-Isolation" and applies to both options without differentiating between them. No higher standard is applied to Option B.

---

### The Core Problem

The document uses **identical measurement frequency language** for both Option A and Option B:

| | Option A | Option B |
|---|---|---|
| **Definition** | "short-term to continuous, depending on variations in the **measured parameter**" | "short-term to continuous, depending on variations in **savings**" |
| **Savings calc** | "short-term or continuous measurements" | "short-term or continuous measurements" |

Historically, the industry distinction between A and B has never been purely about *which* parameters are measured — it has also been about the **rigor of measurement coverage**, with Option B understood to require continuous or near-continuous metering to capture variability in all parameters.

The document erases that distinction in its formal language, then reinstates it implicitly through the typical application example (which shows continuous reporting-period metering) and through Section 5.4.3:

> "Option B is best applied where: Savings or operations within the measurement boundary are **variable**."

If loads are variable — the explicitly stated best use case for Option B — short-term metering cannot adequately characterize them. The best-applications guidance implicitly assumes continuous measurement is needed, while the definition explicitly says it isn't required.

---

### Practical Implication

A practitioner reading only the **definition and How Savings are Calculated column** would conclude short-term metering is fully IPMVP-adherent for Option B.

A practitioner reading the **typical application example and best-applications guidance** would conclude continuous reporting-period metering is expected.

Neither reading is wrong given the document as written. For an option that frequently governs ESCO payment calculations, this is a significant unresolved gap.

---

*End of analysis*
