import { Container, Row, Col } from "react-bootstrap";
import Author from "./Author";
import ImageRotate from "../components/ImageRotate";
const space: string = " ";

function LandingBanner() {
  return (
    <Container className={"mb-3"}>
      <Row>
        <Col xl={7} lg={7} md={5}>
          <div className={"mt-5 pt-5"}>
            <h1>
              Artificial Intelligence{space}
              <span className={"text-secondary"}>(AI)</span> / Machine Learning
              {space}
              <span className={"text-secondary"}>(ML)</span> based Poems.
            </h1>
            <p className="lead">
              An AI-Science/Art experiment containing <em>Poems</em> created by
              machine learning models trained & maintained by
              {space}
              <Author />!
            </p>
          </div>
        </Col>
        <Col xl={5} lg={5} md={7} className={"me-0 pe-0"}>
          <ImageRotate />
        </Col>
      </Row>
    </Container>
  );
}
export default LandingBanner;
