/** @jsx jsx  */
import { assertInsertFragment, jsx } from "~/test/test-utils"

describe("insert span into div", () => {
  it("should insert a span in middle of a div", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span>
            <text />
            <span>
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
          <span>
            <text />
            <span>
              <text>
                abc
                <cursor />
              </text>
            </span>
            <text>
              {/* cursor is inside last text at the top level of inserted nested span */}
              <cursor />
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
          <span>
            <text />
            <span>
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
            <text />
            <span>
              <text>abc</text>
            </span>
            <text>
              {/* cursor is inside last text at the top level of inserted nested span */}
              <cursor />
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
          <span>
            <text />
            <span>
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
            <text />
            <span>
              <text>abc</text>
            </span>
            <text />
          </span>
          <text>
            {/* unexpectedly the cursor moves outside the span when inserted
             * at the end
             */}
            <cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
