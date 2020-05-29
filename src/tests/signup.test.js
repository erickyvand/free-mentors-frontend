import React from "react";
import { Provider } from "react-redux";
import Enzyme, { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import Signup, { handleDisable } from "../components/Signup";
import configureStore from "../redux/store";
import { Formik } from "formik";
import * as types from "../redux/actionType";
import { pending, fulfilled, rejected } from "../helpers/utils";
import signupReducer from "../redux/reducers/auth/signupReducer";

Enzyme.configure({ adapter: new Adapter() });

let store;
let wrapper;
describe("Signup component", () => {
  store = configureStore;
  wrapper = mount(
    <Provider store={store}>
      <Router>
        <Signup />
      </Router>
    </Provider>
  );
  it("It should render the component", (done) => {
    expect(wrapper.length).toEqual(1);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "",
          email: "",
          password: "",
          address: "",
          bio: "",
          occupation: "",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "",
          password: "",
          address: "",
          bio: "",
          occupation: "",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "",
          address: "",
          bio: "",
          occupation: "",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "john1234?",
          address: "",
          bio: "",
          occupation: "",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "john1234?",
          address: "Kigali",
          bio: "",
          occupation: "",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "john1234?",
          address: "Kigali",
          bio: "Freelancer",
          occupation: "",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "john1234?",
          address: "Kigali",
          bio: "Freelancer",
          occupation: "Web",
          expertise: "",
        },
      },
      { state: { loading: true } }
    );
    expect(disabled).toEqual(true);
    done();
  });

  it("Should not disable a button", (done) => {
    const disabled = handleDisable(
      {
        values: {
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "john1234?",
          address: "Kigali",
          bio: "Freelancer",
          occupation: "Web",
          expertise: "Frontend",
        },
      },
      { state: { loading: false } }
    );
    expect(disabled).toEqual(false);
    done();
  });

  it("Should signup", (done) => {
    const form = wrapper.find(Formik);
    const submit = jest.spyOn(form.props(), "onSubmit");
    form.props().onSubmit({
      first_name: "John",
      last_name: "Doe",
      email: "doe@gmail.com",
      password: "john1234?",
      address: "Kigali",
      bio: "Freelancer",
      occupation: "Web",
      expertise: "Frontend",
    });

    expect(submit).toBeCalled();
    done();
  });
});

describe("Testing functionality", () => {
  it("Should wait for an action to signup a user", (done) => {
    const action = {
      type: pending(types.SIGNUP),
    };

    const initialState = {
      loading: false,
      redirect: false,
      message: "",
      error: "",
    };

    const expectedState = {
      ...initialState,
      loading: true,
    };

    expect(signupReducer(initialState, action)).toEqual(expectedState);
    done();
  });

  it("Should signup a user when an action is success", (done) => {
    const action = {
      type: fulfilled(types.SIGNUP),
      payload: {
        data: {
          message: "User created successfully"
        }
      }
    };

    const expectedState = {
      error: "",
      loading: false,
      redirect: true,
      message: "User created successfully",
    };

    expect(signupReducer(undefined, action)).toEqual(expectedState);
    done();
  });

  it("Should throw an error when an action was rejected", (done) => {
    const action = {
      type: rejected(types.SIGNUP),
      payload: {
        response: {
          data: {
            error: "Email exists"
          }
        }
      }
    };

    const expectedState = {
      error: "Email exists",
      loading: false,
      redirect: false,
      message: "",
    };

    expect(signupReducer(undefined, action)).toEqual(expectedState);
    done();
  });
});
