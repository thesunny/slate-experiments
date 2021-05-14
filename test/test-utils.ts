import { createHyperscript } from "slate-hyperscript"
import { BaseEditor, Editor, Element, Node, Text, Transforms } from "slate"
import { ReactEditor, withReact } from "slate-react"
import { HistoryEditor, withHistory } from "slate-history"
import isEqual from "lodash/isEqual"
import stringify from "json-stringify-pretty-compact"

export const jsx = createHyperscript({
  elements: {
    div: { type: "div" },
    span: { type: "span" },
    void: { type: "void" },
  },
})

export function withEditor(editor: Editor): Editor {
  editor = withHistory(withReact(editor))
  editor.isVoid = (node) => node.type === "void"
  editor.isInline = (node) => node.type === "span"
  return editor
}

export function withNormalizedSpanEditor(editor: Editor): Editor {
  editor = withHistory(withReact(editor))
  editor.isVoid = (node) => node.type === "void"
  editor.isInline = (node) => node.type === "span"
  const originalNormalizeNode = editor.normalizeNode
  editor.normalizeNode = (nodeEntry) => {
    const [node, path] = nodeEntry
    if (Element.isElement(node) && editor.isInline(node)) {
      if (
        node.children.length === 1 &&
        Text.isText(node.children[0]) &&
        node.children[0].text === ""
      ) {
        Transforms.removeNodes(editor, { at: path })
        return
      }
    }
    originalNormalizeNode(nodeEntry)
  }
  return editor
}

type JSXFromElement<T extends Element> = Omit<T, "type" | "children">
type JSXFromText<T extends Text> = Omit<T, "text">

type Div = { type: "div"; id?: number | string; children: Array<Element> }
type Span = { type: "span"; id?: number | string; children: Array<Text | Span> }
type Void = { type: "void"; id?: number | string; children: Array<Text> }

/**
 * Extend Slate's Element and Text type with our CustomTypes
 */

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: Div | Span | Void
    Text: { id?: number | string; text: string }
  }
}

declare global {
  namespace jsx.JSX {
    interface IntrinsicElements {
      /* Nodes */
      editor: {}
      text: JSXFromText<Text>
      div: JSXFromElement<Div>
      span: JSXFromElement<Span>
      /**
       * Fragment
       */
      fragment: {}
      /**
       * Selection
       */
      cursor: {}
      anchor: {}
      focus: {}
    }
  }
}

export function log(...values: any[]) {
  for (const value of values) {
    console.log(stringify(value))
  }
}

/**
 * Logs the `children` and `selection` of the `Editor`
 */
export function logEditor(editor: Editor) {
  console.log("=== CHILDREN ===")
  console.log(stringify(editor.children, null, 2))
  console.log("=== SELECTION ===")
  console.log(stringify(editor.selection, null, 2))
}

/**
 * Logs a detailed output of the childrenn and selection of an `input` Editor
 * and an `output` Editor.
 *
 * Primarily used when the `input` and `output` are expected to match but
 * does not allowing us to view and compare the values.
 */
function logInputOuput(input: Editor, output: Editor) {
  console.log("=== INPUT CHILDREN ===")
  console.log(stringify(input.children, null, 2))
  console.log("=== OUTPUT CHILDREN ===")
  console.log(stringify(output.children, null, 2))
  console.log("=== INPUT SELECTION ===")
  console.log(stringify(input.selection, null, 2))
  console.log("=== OUTPUT SELECTION ===")
  console.log(stringify(output.selection, null, 2))
}

/**
 * An assertion that the `input` Editor and `output` Editor have deep equal
 * children and selection.
 *
 * If not, we log the `children` and `selection` of each and a Jest `expect`
 * failure will be thrown which includes a diff.
 */
export function shouldEqual(input: Editor, output: Editor) {
  if (!isEqual(input.children, output.children)) {
    console.error("The editor children are not equal")
    logInputOuput(input, output)
    expect(input.children).toEqual(output.children)
  }
  if (!isEqual(input.selection, output.selection)) {
    console.error("The editor selections are not equal")
    logInputOuput(input, output)
    expect(input.selection).toEqual(output.selection)
  }
}

export function assertInsertFragment(
  input: Editor,
  fragment: Node[],
  output: Editor
) {
  input = withEditor(input)
  Transforms.insertFragment(input, fragment)
  shouldEqual(input, output)
}

export function assertInsertFragmentWithSpanNormalizer(
  input: Editor,
  fragment: Node[],
  output: Editor
) {
  input = withNormalizedSpanEditor(input)
  Transforms.insertFragment(input, fragment)
  shouldEqual(input, output)
}
