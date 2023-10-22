import React from "react";
import { Container } from "reactstrap";
import CreateCuesheetContent from "./CreateCuesheetContent";

const CreateCuesheet = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CreateCuesheetContent />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateCuesheet;
