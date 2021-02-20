import { Nav } from "./Nav";

const Layout = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
