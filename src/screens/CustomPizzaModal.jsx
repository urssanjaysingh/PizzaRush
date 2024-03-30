import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { addToCart } from "../actions/cartAction";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Styled components for custom styles
const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CustomPizzaModal = ({ show, handleClose, customPizzaData }) => {
  const [pizzaBase, setPizzaBase] = useState("");
  const [pizzaSauce, setPizzaSauce] = useState("");
  const [cheeseType, setCheeseType] = useState("");
  const [selectedVeggies, setSelectedVeggies] = useState([]);

  const dispatch = useDispatch();

  const handleCheckboxChange = (option) => {
    const index = selectedVeggies.indexOf(option);
    if (index === -1) {
      setSelectedVeggies([...selectedVeggies, option]);
    } else {
      setSelectedVeggies(selectedVeggies.filter((item) => item !== option));
    }
  };

  const handleAddToCart = () => {
    // Formulate the custom pizza object
    const customPizza = {
      name: "Custom Pizza",
      category: "custom",
      price: 199,
      image: "/images/pizza_logo.png",
      description: `Custom pizza with the following toppings:
  - Base: ${pizzaBase}
  - Sauce: ${pizzaSauce}
  - Cheese: ${cheeseType}
  - Veggies: 
    - ${selectedVeggies.join(", ")}`,
    };

    // Dispatch action to add to cart
    dispatch(addToCart(customPizza));
    // Close the modal
    handleClose();
  };

  return (
    <StyledModal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Your Own Customized Pizza</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formPizzaBase">
            <Form.Label column sm="4">
              Pizza Base
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                value={pizzaBase}
                onChange={(e) => setPizzaBase(e.target.value)}
                style={{ marginBottom: "10px" }}
              >
                <option value="" hidden>
                  Select Base
                </option>
                {/* Map over pizza bases from CustomPizza data */}
                {customPizzaData.pizzaBases.map((base, index) => (
                  <option key={index} value={base}>
                    {base}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPizzaSauce">
            <Form.Label column sm="4">
              Pizza Sauce
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                value={pizzaSauce}
                onChange={(e) => setPizzaSauce(e.target.value)}
                style={{ marginBottom: "10px" }}
              >
                <option value="" hidden>
                  Select Sauce
                </option>
                {/* Map over pizza sauces from CustomPizza data */}
                {customPizzaData.pizzaSauces.map((sauce, index) => (
                  <option key={index} value={sauce}>
                    {sauce}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCheeseType">
            <Form.Label column sm="4">
              Cheese Type
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                value={cheeseType}
                onChange={(e) => setCheeseType(e.target.value)}
                style={{ marginBottom: "10px" }}
              >
                <option value="" hidden>
                  Select Cheese
                </option>
                {/* Map over cheese types from CustomPizza data */}
                {customPizzaData.cheeseTypes.map((cheese, index) => (
                  <option key={index} value={cheese}>
                    {cheese}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formVeggies">
            <Form.Label column sm="4">
              Veggies
            </Form.Label>
            <Col sm="8">
              {/* Map over veggie options from CustomPizza data */}
              {customPizzaData.veggiesOptions.map((veggie, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={veggie}
                  checked={selectedVeggies.includes(veggie)}
                  onChange={() => handleCheckboxChange(veggie)}
                  style={{ marginBottom: "10px" }}
                />
              ))}
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default CustomPizzaModal;
