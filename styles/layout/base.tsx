import { ReactNode } from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

import { Container, ContentHome, ChildrenStyle } from "./styles";

type Props = {
  children: ReactNode;
  title?: string;
};

const LayoutBase = ({ children , title = "" }: Props) => {
  return (
    <Container>
      <SideBar />
      <Header title={title} />
      <ContentHome>
        <div id="spaceheader"></div>
        <ChildrenStyle>
          {children}
        </ChildrenStyle>
      </ContentHome>
    </Container>
  )
}

export default LayoutBase;
