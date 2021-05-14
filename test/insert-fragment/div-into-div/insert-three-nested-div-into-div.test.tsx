/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

/**
 * Inserted a nested div behaves identically to inserting a non-nested div.
 */

describe("insert div in div", () => {
  it("insert div into middle of div", async () => {
    const fragment = (
      <fragment>
        <div id="outer-1">
          <div id="inner-1">
            <text>a</text>
          </div>
        </div>
        <div id="outer-2">
          <div id="inner-2">
            <text>b</text>
          </div>
        </div>
        <div id="outer-3">
          <div id="inner-3">
            <text>c</text>
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
          <text>1a</text>
        </div>
        <div id="outer-2">
          <div id="inner-2">
            <text>b</text>
          </div>
        </div>
        <div>
          <text>
            c
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
        <div id="outer-1">
          <div id="inner-1">
            <text>a</text>
          </div>
        </div>
        <div id="outer-2">
          <div id="inner-2">
            <text>b</text>
          </div>
        </div>
        <div id="outer-3">
          <div id="inner-3">
            <text>c</text>
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
        <div id="outer-1">
          <div id="inner-1">
            <text>a</text>
          </div>
        </div>
        <div id="outer-2">
          <div id="inner-2">
            <text>b</text>
          </div>
        </div>
        <div>
          <text>
            c
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
        <div id="outer-1">
          <div id="inner-1">
            <text>a</text>
          </div>
        </div>
        <div id="outer-2">
          <div id="inner-2">
            <text>b</text>
          </div>
        </div>
        <div id="outer-3">
          <div id="inner-3">
            <text>c</text>
          </div>
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
          <text>12a</text>
        </div>
        <div id="outer-2">
          <div id="inner-2">
            <text>b</text>
          </div>
        </div>
        <div id="outer-3">
          <div id="inner-3">
            <text>
              c<cursor />
            </text>
          </div>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
