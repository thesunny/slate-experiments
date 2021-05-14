/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

/**
 * Inserted a nested div behaves identically to inserting a non-nested div.
 */

describe("insert div in div", () => {
  it("insert div into middle of div", async () => {
    const fragment = (
      <fragment>
        <div id="outer">
          <div id="inner">
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
          {/*
           * Only the text is inserted
           */}
          <text>
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
        <div id="outer">
          <div id="inner">
            <text>abc</text>
          </div>
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
            {/*
             * Only the text is inserted
             */}
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
            {/*
             * Only the text is inserted
             */}
            12abc
            <cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
