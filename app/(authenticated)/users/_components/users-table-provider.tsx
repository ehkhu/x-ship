'use client';

import * as React from 'react';

import { dataTableConfig, type DataTableConfig } from '@/config/data-table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type FeatureFlagValue = DataTableConfig['featureFlags'][number]['value'];

interface UsersTableContextProps {
  featureFlags: FeatureFlagValue[];
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>;
}

const UsersTableContext = React.createContext<UsersTableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {},
});

export function useUsersTable() {
  const context = React.useContext(UsersTableContext);
  if (!context) {
    throw new Error('useUsersTable must be used within a UsersTableProvider');
  }
  return context;
}

export function UsersTableProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlagValue[]>(
    []
  );

  return (
    <UsersTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}
    >
      {children}
    </UsersTableContext.Provider>
  );
}
