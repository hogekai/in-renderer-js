import { VideoRenderOptions } from "@/type";
import { InvalidTargetElementException } from "./exception/InvalidTargetElementException";
import { Bid } from "./type/bid";
import { DomainLogger } from "./DomainLogger";
import { Logger } from "./Logger";
import { VideoRenderApplicationService } from "./VideoRenderApplicationService";
import { InvalidBidException } from "./exception";
import { ViewableTracker } from "./core/ViewableTracker";

export class InVideoRenderer {
  public async render(
    targetId: string,
    bid: Bid,
    options: VideoRenderOptions = {}
  ) {
    const domainLogger = new DomainLogger(new Logger());

    const target = document.getElementById(targetId) as HTMLDivElement;

    if (!target) {
      throw new InvalidTargetElementException();
    }

    const viewableTracker = new ViewableTracker();

    if (bid.mediaType === "video") {
      const videoRenderApplicationService = new VideoRenderApplicationService(
        domainLogger, viewableTracker
      );
      videoRenderApplicationService.render(target, bid, options);
    } else {
      throw new InvalidBidException("Unsupported formats.");
    }
  }
}
