/** @jsx jsx  */
import { assertRun, jsx, log } from "~/test/test-utils"

describe("delete in div", () => {
  it("delete in empty div", async () => {
    const input = (
      <editor>
        <div>
          <div id="first">
            <text>a</text>
          </div>
          <div id="middle">
            <text>
              <cursor />
            </text>
          </div>
          <div id="last">
            <text>b</text>
          </div>
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div>
          <div id="first">
            <text>
              {/* cursor moves into previous div */}
              a<cursor />
            </text>
          </div>
          {/* removes the middle div */}
          <div id="last">
            <text>b</text>
          </div>
        </div>
      </editor>
    )
    assertRun(input, output, (editor) => {
      editor.deleteBackward("character")
    })
  })

  it("delete in nested div", async () => {
    const input = (
      <editor>
        <div>
          <div id="first">
            <text />
          </div>
          <div id="outer">
            <div id="inner">
              <text>
                <cursor />
              </text>
            </div>
          </div>
          <div id="last">
            <text />
          </div>
        </div>
      </editor>
    )
    const output = (
      <editor>
        <div>
          {/* SURPRISING:
           * deletes the first div AND unwraps the outer div.
           * This only happens when the surrounding divs are empty.
           */}
          <div id="inner">
            <text>
              {/* cursor stays in inner div */}
              <cursor />
            </text>
          </div>
          <div id="last">
            <text />
          </div>
        </div>
      </editor>
    )
    assertRun(input, output, (editor) => {
      editor.deleteBackward("character")
    })
  })

  it("delete in nested div", async () => {
    const input = (
      <editor>
        <div>
          <div id="first">
            <text>a</text>
          </div>
          <div id="outer">
            <div id="inner">
              <text>
                <cursor />
              </text>
            </div>
          </div>
          <div id="last">
            <text>b</text>
          </div>
        </div>
      </editor>
    )
    {
      /* works the same even if we are in a nested div */
    }
    const output = (
      <editor>
        <div>
          <div id="first">
            <text>
              {/* cursor in text of div before */}
              a<cursor />
            </text>
          </div>
          {/* Removes the inner/outer div */}
          <div id="last">
            <text>b</text>
          </div>
        </div>
      </editor>
    )
    assertRun(input, output, (editor) => {
      editor.deleteBackward("character")
    })
  })
})
