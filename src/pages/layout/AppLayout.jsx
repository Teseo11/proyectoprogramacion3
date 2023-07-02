import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Content from "../../components/Content";

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
