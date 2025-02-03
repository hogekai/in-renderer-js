import { NativeEventTracker } from "@/core/NativeEventTracker";
import { IViewableTracker } from "@/type/interface";
import { EventTrackingMethod, EventType } from "@/type/native";
import { mock } from "vitest-mock-extended";

describe("Native event tracker", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="target"></div>';
  });

  it("script tracking with impression when js method is specified", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>();
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.IMPRESSION,
        method: EventTrackingMethod.JS,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<script src="https://example.com/url" async=""></script>'
    );
  });

  it("image tracking with impression when imag method is specified", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>();
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.IMPRESSION,
        method: EventTrackingMethod.IMG,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<img width="1" height="1" src="https://example.com/url" style="display: none;">'
    );
  });

  it("track iewability with script when event is specified mrc50", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>({
      trackViewableMrc50: (_, callback) => {
        callback();
      },
    });
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.VIEWABLE_MRC50,
        method: EventTrackingMethod.JS,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<script src="https://example.com/url" async=""></script>'
    );
  });

  it("track view ability with image when event is specified mrc50", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>({
      trackViewableMrc50: (_, callback) => {
        callback();
      },
    });
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.VIEWABLE_MRC50,
        method: EventTrackingMethod.IMG,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<img width="1" height="1" src="https://example.com/url" style="display: none;">'
    );
  });

  it("track view ability with script when event is specified mrc100", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>({
      trackViewableMrc100: (_, callback) => {
        callback();
      },
    });
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.VIEWABLE_MRC100,
        method: EventTrackingMethod.JS,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<script src="https://example.com/url" async=""></script>'
    );
  });

  it("track view ability with image when event is specified mrc100", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>({
      trackViewableVideo50: (_, callback) => {
        callback();
      },
    });
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.VIEWABLE_VIDEO50,
        method: EventTrackingMethod.IMG,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<img width="1" height="1" src="https://example.com/url" style="display: none;">'
    );
  });

  it("track video view ability with script when event is specified video50", () => {
    const targetElement = document.getElementById("target") as HTMLDivElement;
    const viewableTracker = mock<IViewableTracker>({
      trackViewableVideo50: (_, callback) => {
        callback();
      },
    });
    const sut = new NativeEventTracker(viewableTracker);

    sut.track(targetElement, [
      {
        event: EventType.VIEWABLE_VIDEO50,
        method: EventTrackingMethod.IMG,
        url: "https://example.com/url",
      },
    ]);

    expect(targetElement.innerHTML).toBe(
      '<img width="1" height="1" src="https://example.com/url" style="display: none;">'
    );
  });
});
