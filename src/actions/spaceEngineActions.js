import {
  MODIFY_ENGINE_PROP,
  FETCH_ENGINE_DATA,
  UPDATE_PLATEAU_STATE
} from "./types";

export const fetchEngineData = () => dispatch => {
  dispatch({
    type: FETCH_ENGINE_DATA,
    payload: {}
  });
};

export const updatePlateauState = (rovers, output) => dispatch => {
  dispatch({
    type: UPDATE_PLATEAU_STATE,
    payload: {
      output: output,
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
