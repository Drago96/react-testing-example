import { renderHook, act } from "@testing-library/react-hooks";
import { expect, sinon } from "test";

import useSubscription from "components/Subscriber/useSubscription";
import * as subscription from "components/Subscriber/subscription";

describe("<Subscriber />", () => {
  let hook;

  let sandbox;
  const resourceId = 1;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(subscription, "subscribe");
    sandbox.stub(subscription, "cancelSubscription");

    hook = renderHook(id => useSubscription(id), { initialProps: resourceId });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("on initial render", () => {
    it("subscribes to resource with resourceId", () => {
      expect(subscription.subscribe).to.have.been.calledWith(resourceId);
    });
  });

  describe("on update", () => {
    describe("when resource id does not change", () => {
      beforeEach(() => {
        act(() => hook.rerender(resourceId));
      });

      it("does not subscribe to the same resource again", () => {
        expect(subscription.subscribe).to.have.been.calledOnce;
      });

      it("does not cancel current subscription", () => {
        expect(subscription.cancelSubscription).not.to.have.been.called;
      });
    });

    describe("when resource id changes", () => {
      const newResourceId = 2;

      beforeEach(() => {
        act(() => hook.rerender(newResourceId));
      });

      it("subscribes to new resource id", () => {
        expect(subscription.subscribe).to.have.been.calledWith(newResourceId);
      });

      it("cancels current subscription", () => {
        expect(subscription.cancelSubscription).to.have.been.calledWith(
          resourceId
        );
      });
    });

    describe("when hook unmounts", () => {
      beforeEach(() => {
        act(() => hook.unmount());
      });

      it("cancels current subscription", () => {
        expect(subscription.cancelSubscription).to.have.been.calledWith(
          resourceId
        );
      });
    });
  });
});
