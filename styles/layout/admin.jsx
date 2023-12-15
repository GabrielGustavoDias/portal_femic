import { ReactNode } from 'react';
import AdminHeader from '../../components/Header/admin';
import AdminSideBar from '../../components/SideBar/admin';
import { ChildrenStyle, ContentHome, Container } from './styles';

// type Props = {
//   children: ReactNode,
//   title?: string,
// };

const AdminLayout = ({ children, title = '' }) => {
  return (
    <Container>
      <AdminSideBar />
      <ContentHome>
        <AdminHeader />
        <div id="spaceheader"></div>
        <ChildrenStyle>{children}</ChildrenStyle>
      </ContentHome>
    </Container>
  );
};

export default AdminLayout;
