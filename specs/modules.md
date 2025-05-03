Triage-to-Solution System: Module Architecture

This document defines a minimal modular system to process raw user input, perform triage, and generate contextual solutions using LLMs.

---

1. triage_message

Purpose

Classify a raw message into structured metadata (type, priority, status) to guide downstream processing.

Function Signature

triage_message({ message: string }) => {  
  type: string,  
  priority: string,  
  status: string,  
  needs_clarification: boolean  
}  

Inputs  

message: Raw user-submitted string (e.g., a GitHub issue body).  

Outputs  

Structured labels to apply (e.g., type/concept, priority/now)  
Flag if clarification is needed.

---

2. generate_clarification_prompt

Purpose

Generate a prompt asking for missing information using a predefined template.

Function Signature

generate_clarification_prompt({ message: string }) => {  
  prompt: string  
}  

Inputs  

message: Same message passed to triage module.

Outputs  

A markdown-formatted message or issue comment asking the user for more detail using the clarification template.

---

3. generate_solution

Purpose

Use LLM to propose a practical next step based on complete user input.

Function Signature

generate_solution({ message: string, context?: object }) => { summary: string, steps: string[], references?: string[] }
  summary: string,  
  steps: string[],  
  references?: string[]  
}  

Inputs  

message: Full user input (with clarifications if available)  
context: Optional structured context  

Outputs  

A human-readable solution: summary, ordered steps, optional reference links

---

4. post_response_comment

Purpose

Deliver the result from generate_solution back to the issue/thread via API or CLI.

Function Signature

post_response_comment({ issue_id: string, content: string }) => void

Inputs  

issue_id: GitHub issue ID or URL  
content: Rendered markdown of the response

Outputs  

None (writes back to the issue via GitHub API or action)

---

Development Rules

- Use snake_case for all function names.  
- Every function takes a single object argument.  
- All prompt logic and templates live in a separate templates/ folder.  
- This document should be versioned and reviewed before module refactoring.
