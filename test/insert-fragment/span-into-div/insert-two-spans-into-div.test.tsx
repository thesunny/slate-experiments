/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

describe("insert span into div", () => {
  it("should insert a span in middle of a div", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="fragment-1">
            <text>a</text>
          </span>
          <text />
          <span id="fragment-2">
            <text>a</text>
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
          <span id="fragment-1">
            <text>a</text>
          </span>
          <text />
          <span id="fragment-2">
            <text>
              a<cursor />
            </text>
          </span>
          <text>2</text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })

  it("should insert a span at start of a div", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="fragment-1">
            <text>a</text>
          </span>
          <text />
          <span id="fragment-2">
            <text>a</text>
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
          <span id="fragment-1">
            <text>a</text>
          </span>
          <text />
          <span id="fragment-2">
            <text>
              a<cursor />
            </text>
          </span>
          <text>12</text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })

  it("should insert a span at end of a div", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="fragment-1">
            <text>a</text>
          </span>
          <text />
          <span id="fragment-2">
            <text>a</text>
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
          <span id="fragment-1">
            <text>a</text>
          </span>
          <text />
          <span id="fragment-2">
            <text>a</text>
          </span>
          {/* unexpectedly the cursor moves outside the span when inserted
           * at the end
           */}
          <text>
            <cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
