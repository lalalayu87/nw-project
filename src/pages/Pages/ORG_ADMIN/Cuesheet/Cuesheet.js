import React from "react";
import { Container } from "reactstrap";
import CuesheetList from "./CuesheetList";

const Cuesheet = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CuesheetList />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Cuesheet;
