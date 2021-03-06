import UserActionTypes from "./user.types";
import axios from "../../helpers/axios-client";
import { trimUser } from "./user.helpers";

export const fetchPocsStart = () => ({
  type: UserActionTypes.FETCH_POCS_START,
});

export const fetchPocsSuccess = (users) => {
  const trimmedUsers = users.map((user) => ({
    ...trimUser(user),
    type: "poc",
    // whine color: marker
    mapUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  }));
  return {
    type: UserActionTypes.FETCH_POCS_SUCCESS,
    payload: trimmedUsers,
  };
};

export const fetchPocsFailure = (error) => ({
  type: UserActionTypes.FETCH_POCS_FAILURE,
  payload: error,
});

export const fetchPocs = () => {
  return async (dispatch) => {
    dispatch(fetchPocsStart());
    try {
      const response = await axios.get("/Poc");
      const { data } = response;
      dispatch(fetchPocsSuccess(data));
    } catch (error) {
      dispatch(fetchPocsFailure(error));
    }
  };
};

export const fetchDistributorsStart = () => ({
  type: UserActionTypes.FETCH_DISTRIBUTORS_START,
});

export const fetchDistributorsSuccess = (users) => {
  const trimmedUsers = users.map((user, i) => ({
    ...trimUser(user),
    type: "distributor",
    // color: black icon
    mapUrl: "https://static.thenounproject.com/png/462-200.png",
  }));
  
  return {
    type: UserActionTypes.FETCH_DISTRIBUTORS_SUCCESS,
    payload: trimmedUsers,
  };
};

export const fetchDistributorsFailure = (error) => ({
  type: UserActionTypes.FETCH_DISTRIBUTORS_FAILURE,
  payload: error,
});

export const fetchDistributors = () => {
  return async (dispatch) => {
    dispatch(fetchDistributorsStart());
    try {
      const response = await axios.get("/Distributor");
      const { data } = response;
      
      dispatch(fetchDistributorsSuccess(data));
    } catch (error) {
      dispatch(fetchDistributorsFailure(error));
    }
  };
};

export const fetchBulkBreakersStart = () => ({
  type: UserActionTypes.FETCH_BULK_BREAKERS_START,
});

export const fetchBulkBreakersSuccess = (users) => {
  const trimmedUsers = users.map((user, i) => ({
    ...trimUser(user),
    type: "bulkbreaker",
    // color: green color marker
    mapUrl:"https://iconsetc.com/icons-watermarks/simple-green/raphael/raphael_location/raphael_location_simple-green_512x512.png"
  }));
  return {
    type: UserActionTypes.FETCH_BULK_BREAKERS_SUCCESS,
    payload: trimmedUsers,
  };
};

export const fetchBulkBreakersFailure = (error) => ({
  type: UserActionTypes.FETCH_BULK_BREAKERS_FAILURE,
  payload: error,
});

export const fetchBulkBreakers = () => {
  return async (dispatch) => {
    dispatch(fetchBulkBreakersStart());
    try {
      const response = await axios.get("/Bulkbreaker");
      const { data } = response;
      dispatch(fetchBulkBreakersSuccess(data));
    } catch (error) {
      dispatch(fetchBulkBreakersFailure(error));
    }
  };
};

const updatePocStart = () => ({
  type: UserActionTypes.UPDATE_POCS_START,
});

const updateDistributorStart = () => ({
  type: UserActionTypes.UPDATE_DISTRIBUTORS_START,
});

const updateBulkbreakerStart = () => ({
  type: UserActionTypes.UPDATE_BULK_BREAKERS_START,
});

const updatePocSuccess = () => ({
  type: UserActionTypes.UPDATE_POCS_SUCCESS,
});

const updateDistributorSuccess = () => ({
  type: UserActionTypes.UPDATE_DISTRIBUTORS_SUCCESS,
});

const updateBulkbreakerSuccess = () => ({
  type: UserActionTypes.UPDATE_BULK_BREAKERS_SUCCESS,
});

const updatePocFailure = (error) => ({
  type: UserActionTypes.UPDATE_POCS_FAILURE,
  payload: error,
});

const updateDistributorFailure = (error) => ({
  type: UserActionTypes.UPDATE_DISTRIBUTORS_FAILURE,
  payload: error,
});

const updateBulkbreakerFailure = (error) => ({
  type: UserActionTypes.UPDATE_BULK_BREAKERS_FAILURE,
  payload: error,
});

export const updatePoc = (ID, details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updatePocStart());
      try {
        await axios.patch(`/Poc/${ID}`, details);
        dispatch(updatePocSuccess());
        resolve();
      } catch (error) {
        dispatch(updatePocFailure(error));
        reject(error);
      }
    });
  };
};

export const updateDistributor = (ID, details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updateDistributorStart());
      try {
        await axios.patch(`/Distributor/${ID}`, details);
        dispatch(updateDistributorSuccess());
        resolve();
      } catch (error) {
        dispatch(updateDistributorFailure(error));
        reject(error);
      }
    });
  };
};

export const updateBulkbreaker = (ID, details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(updateBulkbreakerStart());
      try {
        await axios.patch(`/Bulkbreaker/${ID}`, details);
        dispatch(updateBulkbreakerSuccess());
        resolve();
      } catch (error) {
        dispatch(updateBulkbreakerFailure(error));
        reject(error);
      }
    });
  };
};
