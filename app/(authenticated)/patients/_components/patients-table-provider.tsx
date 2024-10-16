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

interface PatientsTableContextProps {
  featureFlags: FeatureFlagValue[];
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>;
}

const PatientsTableContext = React.createContext<PatientsTableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {},
});

export function usePatientsTable() {
  const context = React.useContext(PatientsTableContext);
  if (!context) {
    throw new Error(
      'usePatientsTable must be used within a PatientsTableProvider'
    );
  }
  return context;
}

export function PatientsTableProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlagValue[]>(
    []
  );

  return (
    <PatientsTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}
    >
      {children}
    </PatientsTableContext.Provider>
  );
}
