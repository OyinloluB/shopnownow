import React from "react";
import { Form } from "react-bootstrap";

const OrderDropdown = ({ updateOrderStatus, isProcessing, isInTransit }) => {
  const handleSelectChange = (e) => {
    if (e.target.value !== '' && (isProcessing || isInTransit)){
      updateOrderStatus(e.target.value);
    }
  };
  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label
          style={{
            paddingRight: "10px",
          }}
        >
          {" "}
          Mark all the items in this order as:
        </Form.Label>
        <Form.Control
          as="select"
          custom
          style={{
            width: "230px",
          }}
          onChange={handleSelectChange}
        >
          <option value="">Select</option>
          <option value="delivered">Delivered</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default OrderDropdown;
