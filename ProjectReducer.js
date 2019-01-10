import { combineReducers } from 'redux';

const roles_obj = ['Backend SW', 'Frontend SW', 'UX Design', 'Debugging', 'Project Management'].map((el, idx) => { return ({ key: idx, value: el, label: el })});
const project_names = [ 'IoT Experiment2', 'Client number 1', 'Big software company project', 'Very secret project', 'Testing my puns' ]
const possible_obj = [...Array(5).keys()].map(el => {
  return ({ key: el, label: project_names[el], value: 'project' + String(el), roles: roles_obj })}
  );

const INITIAL_STATE = {
  selected: possible_obj[0],
  possible: possible_obj,
  creating: {},
  hours: []
}

const projectReducer = (state = INITIAL_STATE, action ) => {
  const { selected, possible, creating, hours } = state ;

  switch (action.type) {
    case 'SELECT_PROJECT':
      const current = possible.find(el => el.value === action.payload );

      if ( current === undefined ) {
        console.log("Possible data fragmentation?");
        return state;
      } else {
        
        // Reset role on changing projects, if needed
        if ( creating.hasOwnProperty('role') && undefined === current.roles.find(el => el.value === creating.role)) {
          creating.role = current.roles[0].value;
        }
        return { selected: current, possible, creating, hours };
      }
    case 'SELECT_ROLE':
      creating.role = action.payload;
      return { selected, possible, creating, hours };
    case 'SELECT_DATE':
      creating.date = action.payload;
      return { selected, possible, creating, hours };
    case 'SELECT_TIME':
      creating.time = action.payload;
      return { selected, possible, creating, hours };
    case 'SELECT_COMMENT':
      creating.comment = action.payload;
      return { selected, possible, creating, hours };
    case 'ADD_ENTRY':
      hours.push({...action.payload, key: action.payload.project + (new Date()).getTime() });
      return { selected, possible, creating, hours };
    case 'REMOVE_ENTRY':
      const newHours = hours.filter(el => el.key !== action.payload );
      console.log("NEW", newHours);
      return { selected, possible, creating, hours: newHours };
    default:
      return state;
  }
}

export default combineReducers({
  projects: projectReducer
});