import React from "react";
import EachOrderContent from "../Layout/EachOrderContent";
import OrderIntro from "../Layout/OrderIntro";

const SentOrders = ({
  sentOrders,
  currentOrder,
  setCurrentOrder,
  switchSent,
  orderStatus,
  handleStatusUpdate,
}) => {
  const filterOrders = (order) => {
    if(orderStatus.status === "all"){
      return true;
    } else if (orderStatus.status === "delivered"){
      return order.status === "delivered" || order.status === "confirmed";
    } else {
      return orderStatus.status === order.status;
    }
  }
  return (
    <div className={switchSent}>
      {currentOrder.items.length > 0
        ? currentOrder.items.map((item) => {
            return (
              <OrderIntro key={item._id} item={item} status={currentOrder.status} />
            );
          })
        : sentOrders.length > 0
        ? sentOrders
            .filter((order) => filterOrders(order))
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
  );
};

export default React.memo(SentOrders);