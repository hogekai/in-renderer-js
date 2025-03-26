import 'intersection-observer';
import '@/style/InRenderer.css';
import { VideoBid } from "@/type/bid";
import { IVideoPlayer, IViewableTracker } from "@/type/interface";

export class VideoAdRender {
  private viewableTracker: IViewableTracker;

  public constructor(viewableTracker: IViewableTracker) {
    this.viewableTracker = viewableTracker;
  }

  public render(
    targetElement: HTMLDivElement,
    bid: VideoBid,
    videoPlayer: IVideoPlayer,
    fullClickArea?: boolean
  ) {
    this.renderContainer(targetElement, bid, fullClickArea);

    this.viewableTracker.trackViewable(targetElement, () => {
      videoPlayer.play();
    });

    this.viewableTracker.trackViewableLost(targetElement, () => {
      videoPlayer.pause();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
    });
  }

  private renderContainer(targetElement: HTMLDivElement, bid: VideoBid, fullClickArea?: boolean) {
    const aspectRatio = bid.playerHeight / bid.playerWidth;

    targetElement.style.display = "block";
    targetElement.style.maxWidth = `${bid.playerWidth}px`;
    targetElement.style.width = "100%";

    if (fullClickArea) {
      targetElement.classList.add("full-click-area");
    }

    const containerWidth = targetElement.offsetWidth;
    const height = containerWidth * aspectRatio;
    targetElement.style.height = height + "px";

    window.addEventListener("resize", () => {
      const newWidth = targetElement.offsetWidth;
      const newHeight = newWidth * aspectRatio;
      targetElement.style.height = newHeight + "px";
    });
  }
}
