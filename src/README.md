The src/ folder contains source files for any custom CSS (e.g., Sass files) and
JS (e.g., Babel).

Pros:

- Source protection: Keeps source files separate from compiled/distributed
  files.
- Build process integration: Easier to integrate with preprocessors, bundlers,
  and minifiers.
- Organization: Clear separation between source code and public assets.

Cons:

- Complexity: Requires a build step to move processed files to a public
  directory.
- Additional setup: Needs configuration for development servers to serve files
  correctly.
