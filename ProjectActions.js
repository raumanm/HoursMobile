export const selectProject = selectedProject => ({
    type: 'SELECT_PROJECT',
    payload: selectedProject
});

export const selectRole = selectedRole => ({
    type: 'SELECT_ROLE',
    payload: selectedRole
});

export const selectDate = selectedDate => ({
    type: 'SELECT_DATE',
    payload: selectedDate
});

export const selectTime = selectedTime => ({
    type: 'SELECT_TIME',
    payload: selectedTime
});

export const selectComment = selectedComment => ({
    type: 'SELECT_COMMENT',
    payload: selectedComment
});

export const addHours = addedEntry => {
    return ({
    type: 'ADD_ENTRY',
    payload: addedEntry
})
};

export const removeHours = removedEntry => ({
    type: 'REMOVE_ENTRY',
    payload: removedEntry
});