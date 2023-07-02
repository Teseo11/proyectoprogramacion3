import Navbar from "./Navbar";
import Header from "./Header";
import Content from "./Content";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />

      <div className="main-content">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default AppLayout;
