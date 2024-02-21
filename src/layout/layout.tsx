import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import { Breadcrumb, Spin } from "antd";
import { StyledLayout } from "./styled";

type PropType = {
  children: ReactNode;
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
  loading?: boolean;
};

function Layout({ children, breadcrumbs, loading }: PropType) {
  return (
    <StyledLayout>
      <Sidebar />
      <div className="content">
        <Spin spinning={loading}>
          <Breadcrumb items={breadcrumbs} />
          <div className="content-children">{children}</div>
        </Spin>
      </div>
    </StyledLayout>
  );
}

export default Layout;
