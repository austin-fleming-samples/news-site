// customBodyPortableText.js

import React from "react";
import { BlockEditor } from "part:@sanity/form-builder";

// should probably extract this into its own file
export const BlockWithSpellCheck = (props) => {
  const ref = React.forwardRef();

  React.useEffect(() => {
    const containerEl = ref.current;
    if (!containerEl) return;

    const editor = containerEl.querySelector('[data-slate-editor="true"]');

    editor && editor.setAttribute("spellcheck", true);
  }, [ref]);

  return (
    <div ref={ref}>
      <BlockEditor {...props} />
    </div>
  );
};
