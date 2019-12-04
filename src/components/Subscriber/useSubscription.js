import { useEffect } from "react";

import * as subscription from "./subscription";

const useSubscription = resourceId => {
  useEffect(() => {
    subscription.subscribe(resourceId);

    return () => subscription.cancelSubscription(resourceId);
  }, [resourceId]);
};

export default useSubscription;
