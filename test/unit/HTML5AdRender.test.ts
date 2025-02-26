import { HTML5AdRender } from "@/core/HTML5AdRender";
import { InlineFrameRender } from "@/core/InlineFrameRender";

describe("HTML5 Ad Render", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="target"></div>';
  });

  it("render to html5", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const inlineFrameRender = new InlineFrameRender();
    const sut = new HTML5AdRender();
    const bid = {
      adUnitCode: "ad-unit",
      width: 300,
      height: 250,
      mediaType: "banner" as const,
      ad: `<div>ad</div>`,
      cpm: 100,
    };
    const inlineFrame = inlineFrameRender.render(targetElement, bid);
    const ad = "<div>ad</div>";

    sut.render(inlineFrame, ad);

    expect(inlineFrame.contentWindow?.document.body.innerHTML).toEqual(
      "<div>ad</div>"
    );
  });

  it("sets the reset css", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const inlineFrameRender = new InlineFrameRender();
    const sut = new HTML5AdRender();
    const bid = {
      adUnitCode: "ad-unit",
      width: 300,
      height: 250,
      mediaType: "banner" as const,
      ad: `<div>ad</div>`,
      cpm: 100,
    };
    const inlineFrame = inlineFrameRender.render(targetElement, bid);
    const ad = "<div>ad</div>";

    sut.render(inlineFrame, ad);

    expect(inlineFrame.contentWindow?.document.head.innerHTML).toContain(
      "<style>"
    );
    expect(inlineFrame.contentWindow?.document.head.innerHTML).toContain(
      "</style>"
    );
  });
});
