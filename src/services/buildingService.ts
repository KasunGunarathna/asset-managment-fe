import {
    deleteBuildingById,
    getBuildings,
    getBuildingById,
    getSearchBuildings,
    insertBuilding,
    updateBuilding,
    uploadBulkBuilding,
  } from "../api/buildingsApis"; // Import your building API functions
  import {
    getBuildingSuccess,
    getBuildingsStart,
    getBuildingsSuccess,
    getFailure,
    setSuccess,
  } from "../store/buildingSlice"; // Import your Redux slice actions
  import { AppDispatch } from "../store/store";
  import { Building } from "../types/types"; // Import your Building type
  
  // Fetch all buildings
  export const fetchBuildings = () => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      const res = await getBuildings();
      dispatch(getBuildingsSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };
  
  // Search buildings
  export const fetchSearchBuildings =
    (data: any) => async (dispatch: AppDispatch) => {
      dispatch(getBuildingsStart());
      try {
        const res = await getSearchBuildings(data);
        dispatch(getBuildingsSuccess(res));
      } catch (error: any) {
        dispatch(getFailure(error.response?.data?.message || error.message));
      }
    };
  
  // Fetch a building by ID
  export const fetchBuildingById = (id: any) => async (dispatch: AppDispatch) => {
    dispatch(getBuildingsStart());
    try {
      const res = await getBuildingById(id);
      dispatch(getBuildingSuccess(res));
    } catch (error: any) {
      dispatch(getFailure(error.response?.data?.message || error.message));
    }
  };
  
  // Add a new building
  export const addBuilding =
    (building: Building | null) => async (dispatch: AppDispatch) => {
      dispatch(getBuildingsStart());
      try {
        await insertBuilding(building);
        dispatch(setSuccess());
      } catch (error: any) {
        dispatch(getFailure(error.response?.data?.message || error.message));
      }
    };
  
  // Edit a building by ID
  export const editBuilding =
    (id: any, building: Building | null) => async (dispatch: AppDispatch) => {
      dispatch(getBuildingsStart());
      try {
        await updateBuilding(id, building);
        dispatch(setSuccess());
      } catch (error: any) {
        dispatch(getFailure(error.response?.data?.message || error.message));
      }
    };
  
  // Remove a building by ID
  export const removeBuildingById =
    (id: any) => async (dispatch: AppDispatch) => {
      dispatch(getBuildingsStart());
      try {
        await deleteBuildingById(id);
        dispatch(setSuccess());
      } catch (error: any) {
        dispatch(getFailure(error.response?.data?.message || error.message));
      }
    };
  
  // Bulk upload buildings
  export const bulkUploadBuilding =
    (data: any) => async (dispatch: AppDispatch) => {
      dispatch(getBuildingsStart());
      try {
        await uploadBulkBuilding(data);
        dispatch(setSuccess());
      } catch (error: any) {
        dispatch(getFailure(error.response?.data?.message || error.message));
        throw error;
      }
    };
  
    