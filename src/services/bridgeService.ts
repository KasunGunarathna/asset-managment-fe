import {
  deleteBridgesById,
  getBridges,
  getBridgesById,
  getSearchBridges,
  insertBridges,
  updateBridges,
} from "../api/bridgeApis";
import {
  getBridgeSuccess,
  getBridgesStart,
  getBridgesSuccess,
  setSuccess,
  getFailure,
} from "../store/bridgeSlice";
import { AppDispatch } from "../store/store";
import { Bridge } from "../types/types";

export const fetchBridges = () => async (dispatch: AppDispatch) => {
  dispatch(getBridgesStart());
  try {
    const res = await getBridges();
    dispatch(getBridgesSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const fetchSearchBridges =
  (query: any) => async (dispatch: AppDispatch) => {
    dispatch(getBridgesStart());
    try {
      const res = await getSearchBridges(query);
      dispatch(getBridgesSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const fetchBridgeById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getBridgesStart());
  try {
    const res = await getBridgesById(id);
    dispatch(getBridgeSuccess(res));
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};

export const addBridge =
  (bridge: Bridge | null) => async (dispatch: AppDispatch) => {
    dispatch(getBridgesStart());
    try {
      await insertBridges(bridge);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const editBridge =
  (id: any, bridge: Bridge | null) => async (dispatch: AppDispatch) => {
    dispatch(getBridgesStart());
    try {
      await updateBridges(id, bridge);
      dispatch(setSuccess());
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };

export const removeBridgeById = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(getBridgesStart());
  try {
    await deleteBridgesById(id);
    dispatch(setSuccess());
  } catch (error: any) {
    dispatch(getFailure(error.response?.data?.message || error.message));
  }
};
