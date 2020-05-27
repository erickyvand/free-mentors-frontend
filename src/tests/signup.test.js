import React from "react";
import { Provider } from "react-redux";
import Enzyme, { mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom'
import Adapter from "enzyme-adapter-react-16";
import Signup from "../components/Signup";
import configureStore from "../redux/store";

Enzyme.configure({ adapter: new Adapter() });

describe("Signup component", () => {
  it("It should render the component", (done) => {
    const store = configureStore;
    const wrapper = mount(
      <Provider store={store}>
        <Router><Signup /></Router>
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
    done();
  });
});