import type { ReactNode } from 'react';

const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="">{children}</h1>;
};

export default Heading;
