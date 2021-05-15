/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

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
        <div id="fragment-3">
          <text>c</text>
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
            {/* When three divs are inserted, the middle div is preserved
             * and the other divs are merged
             */}
            1a
          </text>
        </div>
        <div id="fragment-2">
          <text>b</text>
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
