import { ReactNode } from 'react';
import Header from '../../components/Header/feira';
import SideBar from '../../components/SideBar/feira';

import { Container, ContentHome, ChildrenStyle } from './styles';

// type Props = {
//   children: ReactNode,
//   title?: string,
// };

const LayoutBase = ({ children, title = '' }) => {
  return (
    <Container>
      <SideBar />
      <ContentHome>
        <Header title={title} />
        <div id="spaceheader"></div>
        <ChildrenStyle>{children}</ChildrenStyle>
      </ContentHome>
    </Container>
  );
};

export default LayoutBase;
