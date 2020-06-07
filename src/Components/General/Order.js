import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import CancelIcon from "@material-ui/icons/Cancel";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import Container from "@material-ui/core/Container";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DoneIcon from "@material-ui/icons/Done";
import CachedIcon from "@material-ui/icons/Cached";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

import { SelectDropdown } from "../Layout/SelectDropdown";
import OrderIntro from "../Layout/OrderIntro";
import EachOrderContent from "../Layout/EachOrderContent";
import Spinner from "../Loaders/Spinner";

import {
  fetchReceivedOrders,
  fetchSentOrders,
  updateOrderStatus,
} from "../../redux/order/order.actions";

export default function Order() {
  const { user, receivedOrders, sentOrders } = useSelector((state) => {
    return {
      user: state.auth.user,
      receivedOrders: state.order.receivedOrders,
      sentOrders: state.order.sentOrders,
    };
  });
  const dispatch = useDispatch();

  const [currentOrder, setCurrentOrder] = useState({ items: [] });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    type: "Newly Received",
    status: "new",
  });
  const [switchReceived, setSwitchReceived] = useState("d-block");
  const [switchSent, setSwitchSent] = useState("d-none");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (user.type === "distributor") {
      dispatch(fetchReceivedOrders());
    } else {
      dispatch(fetchReceivedOrders());
      dispatch(fetchSentOrders());
    }
  }, [user, dispatch]);

  const handleStatusUpdate = (status) => {
    dispatch(updateOrderStatus(currentOrder._id, status))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // handling button switch order
  const switchOrder = (x) => {
    switch (x) {
      case "received":
        setSwitchReceived("d-block");
        setSwitchSent("d-none");
        setOrderStatus({ type: "Newly Received", status: "new" });
        break;

      case "sent":
        setSwitchReceived("d-none");
        setSwitchSent("d-block");
        setOrderStatus({ type: "Newly Sent", status: "new" });
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Container
        className="container"
        maxWidth="sm"
        style={{
          overflow: "auto",
          margin: "5vh auto 0vh auto",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {currentOrder.items.length > 0 ? null : (
            <button
              className={`btn btn-info col-md-${
                user.type !== "distributor" ? "6" : "12"
              }`}
              onClick={() => switchOrder("received")}
            >
              <GetAppIcon /> Received Orders
            </button>
          )}
          {user.type !== "distributor" ? (
            <button
              className="btn btn-warning col-md-6"
              onClick={() => switchOrder("sent")}
            >
              <PublishIcon /> Sent Orders
            </button>
          ) : null}
        </div>
        <br />
        {switchSent === 'd-none' && currentOrder.items.length > 0 ? (
          <Row>
            <Col
              xs={12}
              md={12}
              lg={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <CancelIcon
                style={{ color: "#b11917", cursor: "pointer" }}
                onClick={() => setCurrentOrder({ items: [] })}
              />
              <p
                style={{
                  marginBottom: "0px",
                }}
              >
                {currentOrder.user.name}
              </p>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <SelectDropdown />
            </Col>
          </Row>
        ) : null}

        {currentOrder.items.length > 0 ? null : (
          <div
            className="row text-justify"
            style={{
              marginTop: ".8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div className="col-8  font-weight-bold">{orderStatus.type}</div>

            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                style={{
                  background: "white",
                }}
              >
                <FilterListIcon style={{ color: "#b11017" }} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header className="font-weight-bold">
                  <FilterListIcon style={{ color: "#b11017" }} /> Filter{" "}
                  {`${switchSent === "d-none" ? "Received" : "Sent"}`}
                  Orders by:
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({
                      type: `Newly ${switchSent === "d-none" ? "Received" : "Sent"}`,
                      status: "new",
                    })
                  }
                >
                  <ReceiptIcon className="mr-3" />
                  {`Newly ${switchSent === "d-none" ? "Received" : "Sent"}`}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Delivered", status: "delivered" })
                  }
                >
                  <DoneIcon className="mr-3" />
                  Delivered
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Processing", status: "processing" })
                  }
                >
                  <CachedIcon className="mr-3" />
                  Processing
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "Declined", status: "declined" })
                  }
                >
                  <NotInterestedIcon className="mr-3" />
                  Declined
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() =>
                    setOrderStatus({ type: "All Received", status: "all" })
                  }
                >
                  <FilterListIcon className="mr-3" />
                  {`All ${switchSent === "d-none" ? "Received" : "Sent"}`}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        <hr
          style={{
            border: "1px solid rgb(223, 223, 223)",
          }}
        />
        <div className={switchReceived}>
          {currentOrder.items.length > 0
            ? currentOrder.items.map((item) => {
                return <OrderIntro key={item._id} item={item} />;
              })
            : receivedOrders.length > 0
            ? receivedOrders
                .filter((order) =>
                  orderStatus.status === "all"
                    ? true
                    : orderStatus.status === order.status
                )
                .map((order) => {
                  return (
                    <EachOrderContent
                      key={order._id}
                      order={order}
                      setOrder={setCurrentOrder}
                    />
                  );
                })
            : null}
          {currentOrder.items.length > 0 && currentOrder.status === "new" ? (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
                marginBottom: "35px",
              }}
            >
              <button
                onClick={() => handleStatusUpdate("processing")}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  marginTop: "20px",
                  width: "40%",
                  border: "none",
                  background: "green",
                }}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate("declined")}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  marginTop: "20px",
                  width: "40%",
                  border: "none",
                  background: "#b11917",
                }}
              >
                Decline
              </button>
            </div>
          ) : null}
        </div>
        <div className={switchSent}>
          {currentOrder.items.length > 0
            ? currentOrder.items.map((item) => {
                return <OrderIntro key={item._id} item={item} />;
              })
            : sentOrders.length > 0
            ? sentOrders
                .filter((order) =>
                  orderStatus.status === "all"
                    ? true
                    : orderStatus.status === order.status
                )
                .map((order) => {
                  return (
                    <EachOrderContent
                      key={order._id}
                      order={order}
                      setOrder={setCurrentOrder}
                    />
                  );
                })
            : null}
          {currentOrder.items.length > 0 && currentOrder.status === "new" ? (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
                marginBottom: "35px",
              }}
            >
              <button
                onClick={() => handleStatusUpdate("cancelled")}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px",
                  marginTop: "20px",
                  width: "100%",
                  border: "none",
                  background: "#b11917",
                }}
              >
                Cancel Order
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
}
