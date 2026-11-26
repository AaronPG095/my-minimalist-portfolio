# Portfolio Website

## Development process (every AI: Claude, Codex, Gemini/Antigravity, Cursor)

Non-trivial changes follow these six steps. Only trivial changes with at most 40 changed lines, no new files under `app/`, `components/`, `contexts/`, `data/`, `hooks/`, `lib/`, `types/`, and no managed workflow changes may skip them. Label those PRs `no-plan`.

1. **Plan.** Investigate read-only, propose a plan, wait for approval, and quote it under Notes (use `blueprint` for multi-PR initiatives).
2. **Plan doc.** Create `docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md` via `adw new "<Topic>"` (one PR per plan; split if larger).
3. **Ticket.** Run `adw create <plan> --agent <Claude|Codex|Gemini|Other>` (PW prefix, To Do, Development, stable `Dev Ticket Key` / `local://`). Preserve `devTicketKey` on rename; never run concurrent creates.
4. **Implement.** Branch, commit plan, run `adw start [<plan>]`. Use `prime`/`resume` on cold starts, `context-gatekeeper` (`run_compact` + `fetch_chunk`; `repo_map` → `symbol_outline` → `read_symbol`) for verbose output or large files, and `tick`/`defer` (never delete checkboxes). Progress stays in the plan; run `handoff` before stopping.
5. **Review.** Run `adw pack [<plan>] [--test]`, complete a mandatory independent review (`requireReview: true`, `allowSelfReview: false`) using `quick-review`, and stamp `review --agent <client> --reviewer-id <id> --verdict <pass|warn|block> --summary "..."`.
6. **Finish.** Run `adw check [<plan>]`, open/link PR (`pr` or `ship --pr <url>`), and `merge` (never mark Task Done pre-merge).

If `adw` fails, stop and report. Detailed flags: `dev-workflow` skill & `README.md`.
Pre-push guardrail: `adw hook install`. Universal CLI: `AI-Dev-Workflow`.
