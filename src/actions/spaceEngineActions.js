import {
  MODIFY_ENGINE_PROP,
  FETCH_ENGINE_DATA,
  UPDATE_PLATEAU_STATE,
  MODIFY_VISUALS
} from "./types";

export const fetchEngineData = () => dispatch => {
  dispatch({
    type: FETCH_ENGINE_DATA,
    payload: {}
  });
};

export const updatePlateauState = (rovers, plateauState) => dispatch => {
  dispatch({
    type: UPDATE_PLATEAU_STATE,
    payload: {
      plateauState: plateauState,
      rovers: rovers
    }
  });
};

export const modifyEngineProp = (property, value) => dispatch => {
  dispatch({
    type: MODIFY_ENGINE_PROP,
    payload: {
      property: property,
      value: value
    }
  });
};

export const activateVisuals = (plateauColumns, plateauRows) => dispatch => {
  dispatch({
    type: MODIFY_VISUALS,
    payload: {
      plateauColumns: plateauColumns,
      plateauRows: plateauRows,
      plateauVisual: 1
    }
  });
};

export const deactivateVisuals = () => dispatch => {
  dispatch({
    type: MODIFY_VISUALS,
    payload: {
      plateauColumns: 0,
      plateauRows: 0,
      plateauVisual: 0
    }
  });
};
