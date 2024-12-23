import React from "react";
import Navbar3 from "./Navbar3";
import Navbar2 from "./Navbar2";

const NavbarsPage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar3 />
      <Navbar2 />
    </div>
  );
};

export default NavbarsPage;
