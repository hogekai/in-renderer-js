import { BannerRenderApplicationService } from "@/BannerRenderApplicationService";
import { InvalidTargetElementException } from "@/exception";
import { InRenderer } from "@/InRenderer";
import { NativeRenderApplicationService } from "@/NativeRenderApplicationService";
import { VideoRenderApplicationService } from "@/VideoRenderApplicationService";

describe("InRenderer", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="target"></div>';
  });

  it("render banner ad by banner bid", async () => {
    const renderSpy = vi.spyOn(BannerRenderApplicationService.prototype, 'render');
    const sut = new InRenderer();
    const bid = {
      adUnitCode: "ad-unit",
      width: 300,
      height: 250,
      mediaType: "banner" as const,
      ad: "<div>ad</div>",
      cpm: 100,
    };

    await sut.render("target", bid);

    expect(renderSpy).toHaveBeenCalledOnce();
    expect(renderSpy).toHaveBeenCalledWith(document.getElementById('target'), bid, {});
  });

  it('render video ad by video bid', async () => {
    const renderSpy = vi.spyOn(VideoRenderApplicationService.prototype, 'render');
    const sut = new InRenderer();
    const bid = {
      adUnitCode: "ad-unit",
      playerWidth: 300,
      playerHeight: 250,
      mediaType: "video" as const,
      vastXml: '<VAST></VAST>',
      cpm: 100,
    };

    await sut.render("target", bid);

    expect(renderSpy).toHaveBeenCalledOnce();
    expect(renderSpy).toHaveBeenCalledWith(document.getElementById('target'), bid, {});
  });

  it('render native ad by native bid', async () => {
    const renderSpy = vi.spyOn(NativeRenderApplicationService.prototype, 'render');
    const sut = new InRenderer();
    const bid = {
      adUnitCode: "ad-unit",
      width: 300,
      height: 250,
      mediaType: "native" as const,
      native: {
        impressionTrackers: [],
        ortb: {
          assets: [
            {
              id: 1,
              title: {
                text: "title text",
              },
            },
          ],
          link: {
            url: "",
            clicktrackers: [],
            fallback: "",
          },
        },
        adTemplate: "<div>##hb_native_asset_id_1##</div>",
      },
      cpm: 100,
    };

    await sut.render("target", bid);

    expect(renderSpy).toHaveBeenCalledOnce();
    expect(renderSpy).toHaveBeenCalledWith(document.getElementById('target'), {
      adUnitCode: "ad-unit",
      width: 300,
      height: 250,
      mediaType: "native" as const,
      native: {
        impressionTrackers: [],
        ortb: {
          assets: [
            {
              id: 1,
              title: {
                text: "title text",
              },
            },
          ],
          link: {
            url: "",
            clicktrackers: [],
            fallback: "",
          },
        },
        adTemplate: "<div>##hb_native_asset_id_1##</div>",
      },
      cpm: 100,
    }, {});
  });

  it("throws error when target element is invalid", async () => {
    document.getElementById("target")?.remove();
    const sut = new InRenderer();

    await expect(() => sut.render("target", {} as any)).rejects.toThrow(
      InvalidTargetElementException
    );
  });
});
