/** @jsx jsx  */
import { assertInsertFragmentWithSpanNormalizer, jsx } from "../test-utils"

const NESTED_SPAN = (
  <span>
    <text />
    <span>
      <text>abc</text>
    </span>
    <text />
  </span>
)

describe("insert span into span", () => {
  it("should insert a span in middle of a span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          {NESTED_SPAN}
          <text />
        </div>
      </fragment>
    )
    const input = (
      <editor>
        <div>
          <text />
          <span>
            <text>
              1<cursor />2
            </text>
          </span>
          <text />
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div>
          <text />
          <span>
            <text>1</text>
          </span>
          <text />
          {NESTED_SPAN}
          <text>
            <cursor />
          </text>
          <span>
            <text>2</text>
          </span>
          <text />
        </div>
      </editor>
    )
    assertInsertFragmentWithSpanNormalizer(input, fragment, output)
  })

  it("should insert a span at start of a span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          {NESTED_SPAN}
          <text />
        </div>
      </fragment>
    )
    const input = (
      <editor>
        <div>
          <text />
          <span>
            <text>
              <cursor />
              12
            </text>
          </span>
          <text />
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div>
          <text />
          {NESTED_SPAN}
          <text>
            <cursor />
          </text>
          <span>
            <text>12</text>
          </span>
          <text></text>
        </div>
      </editor>
    )
    assertInsertFragmentWithSpanNormalizer(input, fragment, output)
  })

  it("should insert a span at end of a span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          {NESTED_SPAN}
          <text />
        </div>
      </fragment>
    )
    const input = (
      <editor>
        <div>
          <text />
          <span>
            <text>
              12
              <cursor />
            </text>
          </span>
          <text />
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div>
          <text />
          <span>
            <text>12</text>
          </span>
          <text />
          {NESTED_SPAN}
          <text>
            <cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragmentWithSpanNormalizer(input, fragment, output)
  })
})
