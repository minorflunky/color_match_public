import React, { useState } from "react";
import { Button, Select, ColorPicker, Form } from "antd";
import "./search.css";
import { SearchOutlined } from "@ant-design/icons";

const HextoCIELAB = (hex) => {
  var r = parseInt(hex.substring(1, 3), 16) / 255;
  var g = parseInt(hex.substring(3, 5), 16) / 255;
  var b = parseInt(hex.substring(5, 7), 16) / 255;

  // assuming sRGB (D65)
  r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // convert to XYZ
  var X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  var Y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  var Z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

  // D65 standard referent
  var ref_X = 0.95047;
  var ref_Y = 1.0;
  var ref_Z = 1.08883;

  // convert to Lab
  X = X / ref_X;
  Y = Y / ref_Y;
  Z = Z / ref_Z;

  X = X > 0.008856 ? Math.pow(X, 1 / 3) : 7.787 * X + 16 / 116;
  Y = Y > 0.008856 ? Math.pow(Y, 1 / 3) : 7.787 * Y + 16 / 116;
  Z = Z > 0.008856 ? Math.pow(Z, 1 / 3) : 7.787 * Z + 16 / 116;

  var L = 116 * Y - 16;
  var A = 500 * (X - Y);
  var B = 200 * (Y - Z);

  return { L: L, A: A, B: B };
};

function FormDisabledDemo({ handleResponse }) {
  const [form] = Form.useForm();
  const [value, setValue] = useState("#1677ff");
  const [text, setText] = useState("select make up");
  const onChange = (selectedOptions) => {
    setText(selectedOptions);
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          color: HextoCIELAB(value),
          type: text,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        handleResponse(resJson);
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 100,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="inline"
      >
        <Form.Item label="type" name="type">
          <Select
            defaultValue="make up type"
            style={{
              width: 200,
            }}
            onChange={onChange}
            options={[
              {
                label: <span>eyes</span>,
                title: "eyes",
                options: [
                  {
                    label: <span>eye-shadow</span>,
                    value: "eye-shadow",
                  },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <ColorPicker
            disabledAlpha="true"
            value={value}
            onChangeComplete={(color) => {
              setValue(color.toHexString());
              console.log(`The selected color is ${color.toHexString()}`);
            }}
            placement="bottom"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="submit"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormDisabledDemo;
