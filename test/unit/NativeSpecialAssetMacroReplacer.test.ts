import { NativeSpecialAssetMacroReplacer } from "@/core/NativeSpecialAssetMacroReplacer";

describe("Native special asset macro replacer", () => {
  it("replace native url macro", () => {
    const ad = "<div>##hb_native_linkurl##</div>";
    const sut = new NativeSpecialAssetMacroReplacer();

    const result = sut.replace(ad, {
      url: "https://example.com/linkurl",
      clicktrackers: [],
      fallback: "",
    });

    expect(result).toEqual("<div>https://example.com/linkurl</div>");
  });

  it("replace native privacy macro", () => {
    const ad = "<div>##hb_native_privacy##</div>";
    const sut = new NativeSpecialAssetMacroReplacer();

    const result = sut.replace(ad, {
      url: "https://example.com/linkurl",
      clicktrackers: [],
      fallback: "",
    }, 'https://example.com/privacy');

    expect(result).toEqual("<div>https://example.com/privacy</div>");
  });
});
