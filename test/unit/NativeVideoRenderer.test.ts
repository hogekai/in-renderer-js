import { NativeVideoRender } from "@/core/NativeVideoRender";
import { InvalidNativeVideoContainerException } from "@/exception";
import fluidPlayer from "fluid-player";

vi.mock("fluid-player");

describe("Native video renderer", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="target"></div>';
  });

  it("render video asset", async () => {
    const fluidPlayerMock = vi.mocked(fluidPlayer);
    const target = document.getElementById("target") as HTMLDivElement;
    target.innerHTML =
      '<div class="in-renderer-native-video" data-asset-id="1" data-player-width="640" data-player-height="480"></div>';
    const sut = new NativeVideoRender();

    await sut.render(target, [
      {
        id: 1,
        video: {
          vasttag: "<VAST></VAST>",
        },
      },
    ]);

    expect(fluidPlayerMock).toHaveBeenCalledOnce();
  });

  it("throws error when player width is not specified in target video element", async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    target.innerHTML =
      '<div class="in-renderer-native-video" data-asset-id="1" data-player-height="480"></div>';
    const sut = new NativeVideoRender();

    await expect(() =>
      sut.render(target, [
        {
          id: 1,
          video: {
            vasttag: "<VAST></VAST>",
          },
        },
      ])
    ).rejects.toThrow(InvalidNativeVideoContainerException);
  });

  it("throws error when player height is not specified in target video element", async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    target.innerHTML =
      '<div class="in-renderer-native-video" data-asset-id="1" data-player-width="640"></div>';
    const sut = new NativeVideoRender();

    await expect(() =>
      sut.render(target, [
        {
          id: 1,
          video: {
            vasttag: "<VAST></VAST>",
          },
        },
      ])
    ).rejects.toThrow(InvalidNativeVideoContainerException);
  });

  it("throws error when asset id is not specified in target video element", async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    target.innerHTML =
      '<div class="in-renderer-native-video" data-player-width="640"></div>';
    const sut = new NativeVideoRender();

    await expect(() =>
      sut.render(target, [
        {
          id: 1,
          video: {
            vasttag: "<VAST></VAST>",
          },
        },
      ])
    ).rejects.toThrow(InvalidNativeVideoContainerException);
  });
});
