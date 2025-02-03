import { MacroReplacer } from "@/core/MacroReplacer";

describe("Macro replacer", () => {
  it("replace auction price macro", () => {
    const sut = new MacroReplacer({
      cpm: 1,
    });
    const ad = "<div>${AUCTION_PRICE}</div>";

    const result = sut.replace(ad);

    expect(result).toEqual("<div>1</div>");
  });

  it("replace click throw macro", () => {
    const sut = new MacroReplacer({
      clickThrough: "https://example.com/clickThrough",
      cpm: 0,
    });
    const ad = "<div>${CLICKTHROUGH}</div>";

    const result = sut.replace(ad);

    expect(result).toEqual("<div>https://example.com/clickThrough</div>");
  });

  it("replace multiple macros", () => {
    const sut = new MacroReplacer({
      clickThrough: "https://example.com/clickThrough",
      cpm: 1,
    });
    const ad = "<div>${CLICKTHROUGH}, ${AUCTION_PRICE}</div>";

    const result = sut.replace(ad);

    expect(result).toEqual("<div>https://example.com/clickThrough, 1</div>");
  });

  it("returns normal ad markup when macro is not placed", () => {
    const sut = new MacroReplacer({
      cpm: 0,
    });
    const ad = "<div>ad</div>";

    const result = sut.replace(ad);

    expect(result).toEqual("<div>ad</div>");
  });
});
