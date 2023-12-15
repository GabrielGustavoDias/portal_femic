import { ReactNode } from 'react';
import { Aside, Division, FormDiv } from './styles';

// type Props = {
//   children: ReactNode,
//   color1: string,
//   color2: string,
// };

const LayoutForm = ({ children, color1, color2 }) => {
  return (
    <Division>
      <FormDiv>{children}</FormDiv>
      <Aside color1={color1} color2={color2} />
    </Division>
  );
};

export default LayoutForm;
