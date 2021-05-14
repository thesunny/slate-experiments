# Insert span fragment into span

If we add a normalizer, Slate will mostly do the right thing. After insertion, the normalizer removes the extraneous empty spans and this makes the exact cursor position unusual; however, the cursor is always after the inserted fragment although at an unusual level in the document tree.

## Behavior

_Note: By **any** `<span>` we mean it can be a flat or nested `<span>`_

- When any `<span>` is inserted into any other `<span>`
  - The cursor ends up in the `<text>` after the inserted `<span>`
  - The inserted `<span>` is always inserted under the `<div>` regardless of the depth of the target span
- When any `<span>` is inserted into a nested `<span>`
  - It behaves as expected when in the middle, splitting the target `<span>` as one would expect up to the level under the target `<div>` (as per above)
  - When inserted at the beginning or end
- When we add a normalizer that removes empty `<span>`s
  - The leading `<span>` is removed when inserting at start of `<span>`
  - The trailing `<span>` is removed when inserting at end of `<span>`
    - A side effect of removing the trailing `<span>` is that it moves the cursor into the inserted `<span>` and out of the trailing `<text>`
