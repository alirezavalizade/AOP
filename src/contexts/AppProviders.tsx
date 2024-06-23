import { SWRConfig, SWRConfiguration } from "swr";
import { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

const config: SWRConfiguration = {
  dedupingInterval: 3 * 60 * 1000,
  focusThrottleInterval: 10_000,
  loadingTimeout: 1_200,
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return <SWRConfig value={config}>{children}</SWRConfig>;
};

export default AppProviders;
