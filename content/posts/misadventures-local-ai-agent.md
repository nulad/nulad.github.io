---
title: "My (mis)adventures of running local LLM for Agentic coding"
date: "2026-05-14"
description: "My (mis)adventures of running local LLM for Agentic coding"
tags: ["local-ai", "agentic-coding", "llm"]
---

# My (mis)adventures of running local LLM for Agentic coding.

## Backstory

It all started with a dream (and a GPU purchase I definitely made for productivity reasons, not games). I bought an RTX 4060 back in 2024, since my monitor was stuttering (see, definitely not for playing games :p). The Agentic Coding era was starting to kick in around that time, and like any other engineer, I got quite into it as well. I bought a subscription for Claude at the $20/month tier.

However, I quickly hit a wall. The usage wall. More often than not, I hit the wall of usage where I cannot continue working since my usage is already up. It is evident that agentic coding is a P2W scenario: more tokens, more productivity. Then I got an epiphany: what if I combine my lowly cloud quota with my local RTX 4060?

The grand plan: use a premium model (Opus) for planning and task breakdown, then hand off execution to a local model. The breakdown has to be thorough; it has to be atomic and simple enough that it could (a) run on a local LLM with a limited context window, and (b) be manually reviewed by me without cognitive surrender.

The grand plan is there, and what's next is to build it. Two things needed to be built: a task management tool for AI agents, and a competent local LLM setup. The tool is a story for another day. What *this* story is how I researched, stumbled, backtracked, and got thoroughly lost in the world of local AI agents.

## The Quest

The requirement was deceptively simple: get a local AI agentic coding setup running competently on my machine. To do this, I needed to make three decisions:

- The model,
- The runtime, and
- The harness

What follows is a story of stumbles, wrong turns, backtracks and overall journey on how to run a local agent.

## First Attempt: Take it easy approach.

My first attempt was admittedly lazy. I went to use the most straightforward and easiest way to do it. Gemma 4 was launched right around the corner. I was smitten with it at first. A quick search on the internet showed that it has the biggest bang for buck in regards to number of parameters to the capabilities. For the runtime, I grabbed ollama (easiest to install). And for the agentic coding harness, I picked up opencode since again, it should be the most straightforward and easiest to setup.

Stack:
- Gemma 4 E2B/E4B for the model,
- ollama for the runtime, and
- opencode for the agentic harness

### How it went

Well, you should be able to guess that it was not successful :p. I asked the agent to read a MD documents containing tasks in a repo, and plan how to implement it. **Instead, I got a complete refusal;** it just stated "in plan mode, ready for my questions." Moreover it was slooow as snail. What gives?

Debug mode engaged (my favorite pastime). First, I decided to switch the harness, from opencode to pi (https://github.com/earendil-works/pi/tree/main/packages/coding-agent). This is because pi should be barebones and lighter than opencode, at the cost of less handholding. The result: still the same issue. It **still refused to give me a plan** on how to implement the task. Right, the issue is not here then. However, I decided to keep using pi since it's lighter and I kinda liked the philosophy more.

I asked around in one of my community (shout out to the SWE Growth community, y'all da real boyz), someone pointed out the culprit: context size. Trivial I know, but I didn't know better. After increasing the context number, the prompt now goes through. It's still slooow though. I haven't really got out of the tunnel, more of a checkpoint.

## Second Attempt: Gettin' dirty with it

In this second attempt, I go hands on more, just like the old adage "Berani kotor itu baik". Here is the stack for the second attempt:
- Gemma 4 E2B/E4B for the model,
- ollama for the runtime, and
- pi for the agentic harness.

### How it went

Here comes a new challenger: Gemma 4 tool calling issue. For some reason it refuses to do tool calling. And it's still sloow. I decided to switch the model to Qwen 3.5 (bye Gemma 4), which has a stronger reputation for coding tasks.
While I was at it, I also changed ollama to llama.cpp. Ollama is just a llama.cpp wrapped in pretty lil package to make it easier to run. If you want to customize, it's better to get straight to the core.

## Third Attempt: Progress, at last.

I did say that this is the story where I keep getting lost right? Right, this was the third attempt.

The stack:
- Qwen 3.5 9B for the model,
- llama.cpp for the library, and
- pi for the agentic harness

At this round, I started to explore Hugging Face and unsloth to pick a model. Hugging Face has a nifty feature that if you fill out your PC spec, it can give you recommendation which model you can run. I ended up using Qwen3.5-9B-GGUF:Q4_K_M from unsloth. Did I nail it finally? No, not yet :DDD

### How it went

In this attempt, I finally standardized the prompt used. Here is the prompt:
```
review my commit 5e6878794e2da5ffa7841960657dcab7f5a0f31c compared to this task description: 
### T-041: Implement structured logging

**Description:**
Add structured JSON logging using Go's `log/slog` package (stdlib, available since Go 1.21). Create a request logging middleware that logs method, path, status code, duration, and request ID for every request. Generate a request ID using `crypto/rand` and inject it into the context and response headers.

**Definition of Done — Task:**
- A `slog.Logger` is created in `main()` with `slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: configuredLevel})`
- Request logging middleware logs: method, path, status code, duration_ms, request_id
- Request ID is generated as 8 hex characters, added to context and `X-Request-ID` response header
- All store and service errors include the request ID in log output via context
- Log level is configurable via `TASKAGENT_LOG_LEVEL` env var
- The logger is passed as a dependency (not a global) — handlers/services receive it via constructors

**Definition of Done — Learning Objective:**
- Understand `log/slog`: Go 1.21+ provides structured logging in the stdlib — `slog.Info("msg", "key", value)` produces JSON log entries; understand why structured logging (key-value pairs) is preferred over `log.Printf` string formatting for production services
- Practice wrapping `http.ResponseWriter` to capture status codes: create a `responseWriter` struct that embeds `http.ResponseWriter` and overrides `WriteHeader` to record the status code — this is the only way to log the status code in middleware since the stdlib writer doesn't expose it after writing
- Understand logger-as-dependency: passing `*slog.Logger` through constructors instead of using `slog.Default()` makes it possible to inject a test logger or a no-op logger in tests — avoid global loggers

---
```
This is run under the repo of https://github.com/nulad/taskagent, and the response should review my commit against the task objectives. The task objective was actually taken from the task breakdown documents verbatim. This is done because I was intentionally limiting the scope of the prompt.

The result: Breakthrough! It's now able to use tool calling! The agent now can properly review my changes. It correctly finds the issue of my commit against the task description. **I couldn't help but smile** with this result. Looks like I finally could get out of this local AI agent tunnel. However my smile flatlined when seeing the llama-server logs:

6-7 tok/s.

I was not at the end of the tunnel.

## Fourth Attempt: The GPU Was Sitting There Doing Nothing This Whole Time

In this round of attempt, I tried to figure out why it's so sloow. I asked Claude (the irony of using a cloud LLM to debug my local LLM setup is not lost on me) and here's their findings: the Homebrew-installed version of llama.cpp doesn't include CUDA support. I ran a quick check and confirmed it. My GPU was just... watching me stumbling around. Truly a 'Doh moment. To fix it, I needed to compile the llama.cpp myself with CUDA flag turned on.
Welp, let's go deeper then. After a series of small stumbles with CUDA version mismatches (nothing a good suffering and hints from my ol' buddy Claude can't fix), I got it compiled.

The result: 30-40 tok/s.

Dear reader, this is the part where I cheered (insert "Ode to Joy" from Beethoven here). This is truly "I can see the light" moment. Also bonus note: the Gemma 4 E2B/E4B model is fixed in this llama.cpp version, since now they can do tool calling! Well, E2B still sometimes stumbles, but nothing a good AGENTS.md instructions won't fix.

Here is my final stack for the local agent:

- Gemma E4B/Qwen 3.5 9B for the model. Still figuring out which one to use.
- llama.cpp compiled manually with CUDA flag on (-DGGML_CUDA=ON)
- pi for the agentic harness

## What's Next

The local agent is finally alive and running, and not embarrassingly slow. The next step is to decide which model is better for local agentic coding: Gemma E4B or Qwen 3.5 9B. The dream is not dead yet. It's been beaten black and blue but still standing. On to the next adventure!