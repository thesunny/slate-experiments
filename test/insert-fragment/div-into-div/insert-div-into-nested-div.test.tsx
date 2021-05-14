/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

/**
 * Behavior appears to be the same as insert div into div
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
        <div id="outer">
          <div id="inner">
            <text>
              1<cursor />2
            </text>
          </div>
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div id="outer">
          <div id="inner">
            <text>
              {/* only the text makes it in */}
              1abc
              <cursor />2
            </text>
          </div>
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
        <div id="outer">
          <div id="inner">
            <text>
              <cursor />
              12
            </text>
          </div>
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div id="outer">
          <div id="inner">
            <text>
              {/* only the text makes it in */}
              abc
              <cursor />
              12
            </text>
          </div>
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
        <div id="outer">
          <div id="inner">
            <text>
              12
              <cursor />
            </text>
          </div>
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div id="outer">
          <div id="inner">
            <text>
              {/* only the text makes it in */}
              12abc
              <cursor />
            </text>
          </div>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
