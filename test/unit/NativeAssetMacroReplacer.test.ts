import { NativeAssetMacroReplacer } from "@/core/NativeAssetMacroReplacer";

describe("Native asset macro replacer", () => {
  it("replace title asset macro", () => {
    const ad = "<div>##hb_native_asset_id_1##</div>";
    const sut = new NativeAssetMacroReplacer();

    const result = sut.replace(ad, [
      {
        id: 1,
        title: {
          text: "title asset",
        },
      },
    ]);

    expect(result).toEqual("<div>title asset</div>");
  });

  it("replace image asset macro", () => {
    const ad = "<div>##hb_native_asset_id_1##</div>";
    const sut = new NativeAssetMacroReplacer();

    const result = sut.replace(ad, [
      {
        id: 1,
        img: {
          url: "https://example.com/url",
          width: "300",
          height: "250",
        },
      },
    ]);

    expect(result).toEqual("<div>https://example.com/url</div>");
  });

  // replace data asset macro
  it("データアセットマクロが置換される", () => {
    const ad = "<div>##hb_native_asset_id_1##</div>";
    const sut = new NativeAssetMacroReplacer();

    const result = sut.replace(ad, [
      {
        id: 1,
        data: {
          value: "data asset",
        },
      },
    ]);

    expect(result).toEqual("<div>data asset</div>");
  });

  // replace video asset macro
  it("動画アセットマクロが置換される", () => {
    const ad = "<div>##hb_native_asset_id_1##</div>";
    const sut = new NativeAssetMacroReplacer();

    const result = sut.replace(ad, [
      {
        id: 1,
        video: {
          vasttag: "<VAST></VAST>",
        },
      },
    ]);

    expect(result).toEqual("<div>%3CVAST%3E%3C%2FVAST%3E</div>");
  });

  it("replace multiple asset macros", () => {
    const ad =
      "<div>##hb_native_asset_id_1##</div><div>##hb_native_asset_id_2##</div>";
    const sut = new NativeAssetMacroReplacer();

    const result = sut.replace(ad, [
      {
        id: 1,
        title: {
          text: "title asset",
        },
      },
      {
        id: 2,
        img: {
          url: "https://example.com",
          width: "300",
          height: "250",
        },
      },
    ]);

    expect(result).toEqual(
      "<div>title asset</div><div>https://example.com</div>"
    );
  });
});
