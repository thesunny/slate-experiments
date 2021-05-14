/** @jsx jsx  */
import { Editor, Node, Transforms } from "slate"
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
          {/* first div's segment survivs */}
          <text>a</text>
        </div>
        {/* the middle div survives */}
        <div id="fragment-2">
          <text>b</text>
        </div>
        <div>
          {/* last div's segment survivs */}
          <text>
            c<cursor />
          </text>
          <span>
            <text>2</text>
          </span>
          <text />
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
        <div id="fragment-3">
          <text>c</text>
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
        {/* The first two divs survive */}
        <div id="fragment-1">
          <text>a</text>
        </div>
        <div id="fragment-2">
          <text>b</text>
        </div>
        <div>
          {/*
           * The last segment from the last div gets merged
           */}
          <text>
            c<cursor />
          </text>
          <span>
            <text>12</text>
          </span>
          <text />
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
        <div id="fragment-3">
          <text>c</text>
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
          {/* first segment from the first div is merged */}
          <text>a</text>
        </div>
        {/*
         * the rest survive
         */}
        <div id="fragment-2">
          <text>b</text>
        </div>
        <div id="fragment-3">
          <text>
            c<cursor />
          </text>
        </div>
      </editor>
    )
    assertInsertFragment(input, fragment, output)
  })
})
