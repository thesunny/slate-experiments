/** @jsx jsx  */
import { Editor, Node, Transforms } from "slate"
import { assertInsertFragment, jsx } from "~/test/test-utils"

/**
 * When inserting a div, in all three scenarios, only the text makes it in.
 */

describe("insert div in div", () => {
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
            {/* only the text makes it in */}
            1abc
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
        <div id="fragment">
          <text>abc</text>
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
          <text>
            {/* only the text makes it in */}
            abc
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
        <div id="fragment">
          <text>abc</text>
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
          <text>
            {/* only the text makes it in */}
            12abc
            <cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
