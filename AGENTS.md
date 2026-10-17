<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Agent logic lives in src/lib/agent.ts (runAgent) as an isolated mock; replace it with Qloo/LLM server-function calls without touching UI.
- runAgent requires an explicit supported destination and rejects missing or unknown cities instead of substituting another dataset, so recommendations never silently use a default city.
- Keep city photograph references centralized in src/lib/photos.ts so destination imagery changes consistently without changing the mock agent.
- Use shared Button, NeighborhoodCard and Timeline presentation for landing previews and chat so both experiences retain consistent controls and checklist storage.
- Resolve unsupported destinations from a local GeoNames city-coordinate index (CC BY 4.0) before geographic snapping; unrecognized text must remain unselected rather than use an arbitrary destination.
