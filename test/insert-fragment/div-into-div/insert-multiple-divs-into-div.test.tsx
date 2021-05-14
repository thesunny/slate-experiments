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

describe("insert div in div", () => {
  it("insert multiple div into middle of div", async () => {
    const fragment = (
      <fragment>
        <div id="fragment-1">
          <text>a</text>
        </div>
        <div id="fragment-2">
          <text>b</text>
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
            1ab
            <cursor />2
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })

  it("insert div into start of div", async () => {
    const fragment = (
      <fragment>
        <div id="fragment-1">
          <text>a</text>
        </div>
        <div id="fragment-2">
          <text>b</text>
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
        {/*
         * Crazy! The first div survives and...
         */}
        <div id="fragment-1">
          <text>a</text>
        </div>
        <div>
          {/*
           * The second gets merged!
           */}
          <text>
            b
            <cursor />
            12
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })

  it("insert div into end of div", async () => {
    const fragment = (
      <fragment>
        <div id="fragment-1">
          <text>a</text>
        </div>
        <div id="fragment-2">
          <text>b</text>
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
          {/*
           * At the end, the first div gets merged and...
           */}
          <text>12a</text>
        </div>
        {/*
         * the second survives!
         */}
        <div id="fragment-2">
          <text>
            b<cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
