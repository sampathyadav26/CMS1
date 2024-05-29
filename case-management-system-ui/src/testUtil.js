/* istanbul ignore file*/
import React from "react";
import { Provider } from "react-redux";
import {
  render,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "./store";
const confStore = setupStore();

export const renderWithOutRouter = (component, { store = confStore } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const renderWithRedux = (component, { store = confStore } = {}) => {
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
    store,
  };
};
export default renderWithRedux;

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

//selectMaterialUiSelectOption
export const selectMaterialUiSelectOption = async (element, optionText) =>
  new Promise((resolve) => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector("[role=button]");

    // Open the select dropdown
    UserEvent.click(selectButton);

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox = document.body.querySelector("ul[role=listbox]");

    // Click the list item
    const listItem = within(listbox).getByText(optionText);
    UserEvent.click(listItem);

    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    waitForElementToBeRemoved(() =>
      document.body.querySelector("ul[role=listbox]")
    ).then(resolve);
  });
