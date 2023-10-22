import React from "react";
import { Container } from "reactstrap";
import CuesheetTemplateList from "./CuesheetTemplateList";

const CuesheetTemplate = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CuesheetTemplateList />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CuesheetTemplate;
