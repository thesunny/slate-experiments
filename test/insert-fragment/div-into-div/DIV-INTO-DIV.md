# Insert Div Fragment into Div

## Behavior

_Note: By **any** `<div>` we mean it can be a flat or nested `<div>`_

- When any `div` is inserted into any `div`, only the `text` is inserted
- When multiple `div` are inserted into any `div`
  - If the insertion is in the middle, only the first and last inserted div are merged into the text
  - If the insertion is at the start, and last inserted div is merged into the text
  - If the insertion is at the end, the first inserted div is merged into the text
