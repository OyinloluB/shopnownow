import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import { ViewBasket } from "./ViewBasket";
import axios from "../../axios-client";
import Logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  appbar: {
    backgroundColor: "#b11917",
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Navbar() {
  const history = useHistory();
  const [viewBasket, setViewBasket] = useState(false);
  const { isAuthenticated, user, cartItemsCount, receivedOrdersCount } = useSelector(
    (state) => {
      return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        cartItemsCount: state.cart.items.reduce((accumulator, item) => {
          return accumulator + item.quantity;
        }, 0),
        receivedOrdersCount: state.order.receivedOrders.filter(
          (order) => order.status === "new"
        ).length,
      };
    }
  );

  const logOut = () => {
    if (
      window.confirm(
        "Do you want Customers to still see your store open after login out?"
      )
    ) {
      if (user.type === "distributor") {
        axios
          .patch(`/Distributor/${user._id}`, { confirmed: true })
          .then((list) => {});
      } else if (user.type === "bulkbreaker") {
        axios
          .patch(`/BulkBreaker/${user._id}`, { confirmed: true })
          .then((list) => {});
      } else if (user.type === "poc") {
        axios.patch(`/Poc/${user._id}`, { confirmed: true }).then((list) => {});
      }
    } else {
      if (user.type === "distributor") {
        axios
          .patch(`/Distributor/${user._id}`, { confirmed: false })
          .then((list) => {});
      } else if (user.type === "bulkbreaker") {
        axios
          .patch(`/BulkBreaker/${user._id}`, { confirmed: false })
          .then((list) => {});
      } else if (user.type === "poc") {
        axios.patch(`/Poc/${user._id}`, { confirmed: false }).then((list) => {});
      }
    }

    localStorage.clear();
    window.location.reload();
  };

  const classes = useStyles();
  return (
    <>
      <ViewBasket show={viewBasket} setViewBasket={setViewBasket} />
      {isAuthenticated ? (
        <div className={classes.grow}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                className={classes.title}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={Logo}
                  alt="ibplc-logo"
                  style={{ cursor: "pointer" }}
                  width="100"
                  onClick={() => history.push("/")}
                />
                <p
                  style={{
                    paddingLeft: "10px",
                    marginBottom: "0rem",
                    fontSize: "14px",
                  }}
                >
                  {user.name}
                </p>
              </Typography>
              <div style={{ display: "flex" }}>
                {user.type !== "distributor" ? (
                  <IconButton
                    aria-label="shopping"
                    color="inherit"
                    onClick={() => setViewBasket(true)}
                  >
                    <Badge badgeContent={cartItemsCount} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                ) : null}
                <IconButton aria-label="delivery" color="inherit">
                  <Badge badgeContent={receivedOrdersCount} color="secondary">
                    <LocalShippingIcon
                      onClick={() => history.push("/orders")}
                    />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={logOut}>
                  <IconButton
                    edge="end"
                    aria-label="chatting"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.menuButton}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                  Logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>
                <img
                  src={Logo}
                  alt="ibplc-logo"
                  style={{ cursor: "pointer" }}
                  width="100"
                />
              </Typography>
              <Button color="inherit" onClick={() => history.push("/signin")}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <ExitToAppIcon />
                </IconButton>
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </>
  );
}
