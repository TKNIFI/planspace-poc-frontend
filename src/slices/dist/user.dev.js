"use strict";
require("dotenv").config();

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.setUserDetails =
  exports.register =
  exports.login =
  exports.reducer =
    void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("../network/axios"));

var _axios2 = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var initialState = {
  details: {},
};
var slice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: initialState,
  reducers: {
    login: function login(state, action) {
      state.details = action.payload;
    },
    setUserDetails: function setUserDetails(state, action) {
      state.details = action.payload;
    },
  },
});
var reducer = slice.reducer;
exports.reducer = reducer;

var login = function login(primary_email_id, password) {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(
              _axios["default"].post("api/auth/login/", {
                primary_email_id: primary_email_id,
                password: password,
              })
            );

          case 2:
            _ref = _context.sent;
            data = _ref.data;
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            dispatch(slice.actions.login(data.data));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.login = login;

var register = function register(formData) {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(
              _axios2["default"].post(
                `${process.env.REACT_APP_BASE_URL}api/auth/register/`,
                formData
              )
            );

          case 2:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch(slice.actions.login(data.data));
            localStorage.setItem("userInfo", JSON.stringify(data.data));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.register = register;

var setUserDetails = function setUserDetails(details) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.setUserDetails = setUserDetails;
