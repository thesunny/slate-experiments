/** @jsx jsx  */
import { assertInsertFragmentWithSpanNormalizer, jsx } from "~/test/test-utils"

describe("insert span into span", () => {
  it("should insert a span in middle of a nested span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="fragment">
            <text>fragment</text>
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
          <span id="fragment">
            <text>fragment</text>
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
    assertInsertFragmentWithSpanNormalizer(input, fragment, output)
  })

  it("should insert a span at start of a nested span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="fragment">
            <text>fragment</text>
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
          <span id="fragment">
            <text>fragment</text>
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
    assertInsertFragmentWithSpanNormalizer(input, fragment, output)
  })

  it("should insert a span at end of a nested span", async () => {
    const fragment = (
      <fragment>
        <div>
          <text />
          <span id="fragment">
            <text>fragment</text>
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
     * Part of the nested span usually remains but the normalizer
     * removes it for us. But we are left with an unexpected cursor placement.
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
          <span id="fragment">
            <text>
              fragment
              <cursor />
            </text>
          </span>
          <text>
            {/*
             * Normally the cursor goes here but (I think) because the normalizer
             * removes the trailing <span> that is empty, the selection gets
             * adjusted as some part of algorithm (selection normalization maybe?)
             * and it ends up in the inserted fragment.
             */}
          </text>
        </div>
      </editor>
    )
    assertInsertFragmentWithSpanNormalizer(input, fragment, output)
  })
})
