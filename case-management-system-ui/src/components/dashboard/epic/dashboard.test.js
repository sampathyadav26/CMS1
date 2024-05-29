import { cleanup, fireEvent, render } from "@testing-library/react";
import Dashboard from "..";
import renderWithRedux from "../../../testUtil";

afterEach(cleanup);

describe("Dashboard container", () => {
  it("Render Dashboard ", () => {
    const container = renderWithRedux(<Dashboard />);
    expect(container).toMatchSnapshot();
  });
});
