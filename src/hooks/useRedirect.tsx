import { useHistory } from 'react-router';
import { useMemo } from 'react';

export const useRedirect = (path: string) => {
  const history = useHistory();

  return useMemo(() => {
    return () => history.push(path);
  }, [history, path]);
};
