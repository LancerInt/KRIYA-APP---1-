import React, {useEffect, useState} from 'react';
import {runMigrations} from '@db/client/sqlite';
import {seedDatabase} from '@db/seed/seedLoader';
import {LoadingView} from '@shared/components/States';

export const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const bootstrap = async () => {
      await runMigrations();
      await seedDatabase();
      setReady(true);
    };
    bootstrap();
  }, []);

  if (!ready) return <LoadingView label="Bootstrapping BioDesk..." />;
  return <>{children}</>;
};
