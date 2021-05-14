/** @jsx jsx  */
import { Editor, Node, Transforms } from "slate"
import { assertInsertFragment, jsx } from "~/test/test-utils"

/**
 * `insertFragment` retrieves the selection and includes all ancestor nodes.
 *
 * - When you insert `Text`, the text gets inserted and the cursor is placed
 *   at the end of the `Text`. Then the normalizer is run so if the text have
 *   the same properties, they are merged.
 * - Insert span into text.
 *   - When a span is inserted, the cursor is at the end of the upper most span
 * - Insert span into span
 */

describe("getting fragments from selections", () => {
  describe("insert div into div", () => {
    it("insert div into middle of div", async () => {
      const fragment = (
        <fragment>
          <div id="fragment">
            <text>abc</text>
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              1<cursor />2
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text>
              1abc
              <cursor />2
            </text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })

    it("insert only the text part of the fragment if fragment spans a single div", async () => {
      const fragment = (
        <fragment>
          <div id="div-fragment">
            <text id="text-fragment">a</text>
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              1<cursor />2
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text>1</text>
            <text id="text-fragment">
              a<cursor />
            </text>
            <text>2</text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })

    it("insert only the text part of the fragment even if it's nested", async () => {
      const fragment = (
        <fragment>
          <div id="upper">
            <div id="lower">
              <text>abc</text>
            </div>
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              1<cursor />2
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text>
              1abc
              <cursor />2
            </text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })
  })

  describe("insert span in text", () => {
    it("should insert a span in the middle of text", async () => {
      const fragment = (
        <fragment>
          <div>
            <text />
            <span>
              <text>abc</text>
            </span>
            <text />
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              1<cursor />2
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text>1</text>
            <span>
              <text>
                abc
                <cursor />
              </text>
            </span>
            <text>2</text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })

    it("should insert a span at start of text", async () => {
      const fragment = (
        <fragment>
          <div>
            <text />
            <span>
              <text>abc</text>
            </span>
            <text />
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              <cursor />
              12
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text></text>
            <span>
              <text>
                abc
                <cursor />
              </text>
            </span>
            <text>12</text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })

    it("should insert a span at end of text", async () => {
      const fragment = (
        <fragment>
          <div>
            <text />
            <span>
              <text>abc</text>
            </span>
            <text />
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              12
              <cursor />
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text>12</text>
            <span>
              <text>abc</text>
            </span>
            <text>
              <cursor />
            </text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })
  })

  describe("should insert span at end of text", () => {
    it("should insert nested span in middle of text", async () => {
      const fragment = (
        <fragment>
          <div>
            <text />
            <span id="upper">
              <text />
              <span id="lower">
                <text>abc</text>
              </span>
              <text />
            </span>
            <text />
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text>
              1<cursor />2
            </text>
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text>1</text>
            <span id="upper">
              <text />
              <span id="lower">
                <text>abc</text>
              </span>
              <text>
                <cursor />
              </text>
            </span>
            <text>2</text>
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })
  })

  describe("should insert span into span", () => {
    it("should insert a nested span in a span as a sibling and leave the cursor just outside the span in the empty text between spans", async () => {
      const fragment = (
        <fragment>
          <div>
            <text />
            <span>
              <text>abc</text>
            </span>
            <text />
          </div>
        </fragment>
      )
      const input = (
        <editor>
          <div>
            <text />
            <span>
              <text>
                1<cursor />2
              </text>
            </span>
            <text />
          </div>
        </editor>
      )
      const output = (
        <editor>
          <div>
            <text />
            <span>
              <text>1</text>
            </span>
            <text />
            <span>
              <text>abc</text>
            </span>
            <text>
              <cursor />
            </text>
            <span>
              <text>2</text>
            </span>
            <text />
          </div>
        </editor>
      )
      assertInsertFragment(input, fragment, output)
    })
  })
})
