/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

describe("insert span into span", () => {
  it("should insert a span in middle of a nested span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="outer-fragment">
            <text />
            <span id="inner-fragment">
              <text>fragment</text>
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
          <text />
          <span id="outer">
            <text />
            <span id="inner">
              <text>
                1<cursor />2
              </text>
            </span>
            <text />
          </span>
          <text />
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div>
          <text />
          <span id="outer">
            <text />
            <span id="inner">
              <text>1</text>
            </span>
            <text />
          </span>
          <text />
          <span id="outer-fragment">
            <text />
            <span id="inner-fragment">
              <text>fragment</text>
            </span>
            <text />
          </span>
          <text>
            <cursor />
          </text>
          <span id="outer">
            <text />
            <span id="inner">
              <text>2</text>
            </span>
            <text />
          </span>
          <text />
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })

  it("should insert a span at start of a nested span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="outer-fragment">
            <text />
            <span id="inner-fragment">
              <text>fragment</text>
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
          <text />
          <span id="outer">
            <text />
            <span id="inner">
              <text>
                <cursor />
                12
              </text>
            </span>
            <text />
          </span>
          <text />
        </div>
      </editor>
    )
    /**
     * Unexpectedly, part of the nested span remains before the inserted
     * span segment.
     */
    const output = (
      <editor>
        <div>
          <text />
          <span id="outer">
            <text />
            {/* <span id="inner">
              <text></text>
            </span>
            <text /> */}
          </span>
          <text />
          <span id="outer-fragment">
            <text />
            <span id="inner-fragment">
              <text>fragment</text>
            </span>
            <text />
          </span>
          <text>
            <cursor />
          </text>
          <span id="outer">
            <text />
            <span id="inner">
              <text>12</text>
            </span>
            <text />
          </span>
          <text />
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })

  it("should insert a span at end of a nested span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="outer-fragment">
            <text />
            <span id="inner-fragment">
              <text>fragment</text>
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
          <text />
          <span id="outer">
            <text />
            <span id="inner">
              <text>
                12
                <cursor />
              </text>
            </span>
            <text />
          </span>
          <text />
        </div>
      </editor>
    )
    /**
     * Unexpectedly, part of the nested span remains before the inserted
     * span segment.
     */
    const output = (
      <editor>
        <div>
          <text />
          <span id="outer">
            <text />
            <span id="inner">
              <text>12</text>
            </span>
            <text />
          </span>
          <text />
          <span id="outer-fragment">
            <text />
            <span id="inner-fragment">
              <text>fragment</text>
            </span>
            <text />
          </span>
          <text>
            <cursor />
          </text>
          <span id="outer">
            <text />
            {/* <span id="inner">
              <text></text>
            </span>
            <text /> */}
          </span>
          <text />
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
