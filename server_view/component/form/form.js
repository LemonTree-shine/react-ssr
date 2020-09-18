"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Index = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Index, _React$Component);

  var _super = _createSuper(Index);

  function Index() {
    (0, _classCallCheck2["default"])(this, Index);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Index, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("form", {
        ref: function ref(el) {
          _this.form = el;
        }
      }, this.props.children));
    }
  }, {
    key: "value",
    get: function get() {
      var allInput = this.form.querySelectorAll("input");
      var formData = {};
      allInput.forEach(function (input) {
        if (input.type === "text" && input.name) {
          formData[input.name] = input.value;
        }

        if (input.type === "radio" && input.name && input.checked) {
          formData[input.name] = input.value;
        }

        if (input.type === "checkbox" && input.name && input.checked) {
          //formData[input.name] = input.value;
          if (formData[input.name]) {
            formData[input.name].push(input.value);
          } else {
            formData[input.name] = [input.value];
          }
        }
      });
      return formData;
    }
  }]);
  return Index;
}(_react["default"].Component);

exports["default"] = Index;