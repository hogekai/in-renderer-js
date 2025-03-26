import { VideoAdRender } from "@/core/VideoAdRender";
import { IVideoPlayer, IViewableTracker } from "@/type/interface";
import { mock } from "vitest-mock-extended";

describe("Video ad render", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="target"></div>';
  });

  // render video ad container
  it("render video ad container", async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    Object.defineProperty(target, "offsetWidth", {
      get: vi.fn().mockReturnValue(640),
    });
    const player = {
      play: vi.fn(),
      pause: vi.fn(),
    };
    const viewableTracker = mock<IViewableTracker>();
    const sut = new VideoAdRender(viewableTracker);

    sut.render(target, {
      mediaType: "video",
      playerWidth: 640,
      playerHeight: 480,
      vastUrl: "https://example.com/vasturl",
    }, player);

    expect(target.style.width).toBe("100%");
    expect(target.style.height).toBe("480px");
    expect(target.style.maxWidth).toBe("640px");
    expect(target.style.display).toBe("block");
  });

  it("render full click area", async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    Object.defineProperty(target, "offsetWidth", {
      get: vi.fn().mockReturnValue(640),
    });
    const player = {
      play: vi.fn(),
      pause: vi.fn(),
    };
    const viewableTracker = mock<IViewableTracker>();
    const sut = new VideoAdRender(viewableTracker);

    sut.render(target, {
      mediaType: "video",
      playerWidth: 640,
      playerHeight: 480,
      vastUrl: "https://example.com/vasturl",
    }, player, true);

    expect(target.classList.contains("full-click-area")).toBe(true);
  });

  it('play video ad when in viewport', async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    Object.defineProperty(target, "offsetWidth", {
      get: vi.fn().mockReturnValue(640),
    });
    const player = mock<IVideoPlayer>();
    const viewableTracker = mock<IViewableTracker>({
      trackViewable: (_, callback) => {
        callback();
      }
    });
    const sut = new VideoAdRender(viewableTracker);

    sut.render(target, {
      mediaType: "video",
      playerWidth: 640,
      playerHeight: 480,
      vastUrl: "https://example.com/vasturl",
    }, player);

    expect(player.play).toHaveBeenCalledOnce();
  });

  it('stop video ad when out of viewport', async () => {
    const target = document.getElementById("target") as HTMLDivElement;
    Object.defineProperty(target, "offsetWidth", {
      get: vi.fn().mockReturnValue(640),
    });
    const player = mock<IVideoPlayer>();
    const viewableTracker = mock<IViewableTracker>({
      trackViewableLost: (_, callback) => {
        callback();
      }
    });
    const sut = new VideoAdRender(viewableTracker);

    sut.render(target, {
      mediaType: "video",
      playerWidth: 640,
      playerHeight: 480,
      vastUrl: "https://example.com/vasturl",
    }, player);

    expect(player.pause).toHaveBeenCalledOnce();
  });
});
