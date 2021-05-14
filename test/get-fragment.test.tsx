/** @jsx jsx  */
import { jsx, withEditor, log } from "./test-utils"

/**
 * `getFragment` retrieves the selection and includes all ancestor nodes.
 *
 * For clarity, if you select a single character, the fragment includes all the
 * ancestor block nodes.
 */

describe("getting fragments from selections", () => {
  it("should grab the element even when only text is selected", async () => {
    const editor = withEditor(
      <editor>
        <div>
          <text>
            a<anchor />b<focus />c
          </text>
        </div>
      </editor>
    )
    const fragment = editor.getFragment()
    expect(fragment).toEqual([{ type: "div", children: [{ text: "b" }] }])
  })

  it("should grab the element all the way to the root even when only text is selected", async () => {
    const editor = withEditor(
      <editor>
        <div id={1}>
          <div id={2}>
            <text>
              a<anchor />b<focus />c
            </text>
          </div>
        </div>
      </editor>
    )
    const fragment = editor.getFragment()
    expect(fragment).toEqual([
      {
        type: "div",
        id: 1,
        children: [{ type: "div", id: 2, children: [{ text: "b" }] }],
      },
    ])
  })

  it("should grab up to the root across two divs", async () => {
    const editor = withEditor(
      <editor>
        <div id="parent">
          <div id="child-1">
            <text>
              a<anchor />b
            </text>
          </div>
          <div id="child-2">
            <text>
              c<focus />c
            </text>
          </div>
        </div>
      </editor>
    )
    const fragment = editor.getFragment()
    expect(fragment).toEqual([
      {
        type: "div",
        id: "parent",
        children: [
          { type: "div", id: "child-1", children: [{ text: "b" }] },
          { type: "div", id: "child-2", children: [{ text: "c" }] },
        ],
      },
    ])
  })
})
