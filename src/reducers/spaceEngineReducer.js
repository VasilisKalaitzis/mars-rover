import {
  MODIFY_ENGINE_PROP,
  FETCH_ENGINE_DATA,
  UPDATE_PLATEAU_STATE,
  MODIFY_VISUALS
} from "../actions/types";

const initialState = {
  plateauVisual: 0,
  plateauState: "",
  rovers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ENGINE_DATA:
      // set layout's property
      return state;
    case UPDATE_PLATEAU_STATE:
      // this could take place on the MODIFY_ENGINE_PROP, however I am trying to minimize
      // the code snipsets that the reviewers will have to care about
      return {
        ...state,
        plateauState: action.payload.plateauState,
        rovers: action.payload.rovers
      };
    case MODIFY_ENGINE_PROP:
      // set layout's property
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    case MODIFY_VISUALS:
      return {
        ...state,
        plateauVisual: action.payload.plateauVisual,
        plateauColumns: action.payload.plateauColumns,
        plateauRows: action.payload.plateauRows
      };
    default:
      return state;
  }
}
