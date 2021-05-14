/** @jsx jsx  */
import { Editor, Node, Transforms } from "slate"
import { assertInsertFragment, jsx } from "~/test/test-utils"

/**
 * When inserting two divs, only the text makes it in if inserting in the
 * middle but at the edges, we get the outer fragment as it's own div.
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
            {/* Despite multiple divs, only the text makes it in.
             * Through more testing, this unusual behavior (at least compared
             * to the other divs in this test) is because the left and right
             * div are merged into the text. There are no more divs left
             * so it looks like this operation only inserts text.
             *
             * This feels like a bug though from a user perspective.
             */}
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
