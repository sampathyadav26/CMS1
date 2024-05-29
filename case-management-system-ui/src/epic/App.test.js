import App from "../App";
import { renderWithOutRouter } from "../testUtil";
import { cleanup } from "@testing-library/react";
import "../router";

afterEach(cleanup);

test("Render App container", () => {
  const container = renderWithOutRouter(<App />, {});
  expect(container).toMatchSnapshot();
});
