export async function getStatesAll(miContrato) {

    //se puede usar asi o
    let cantStates = await miContrato.methods.getLengthStates()
        .call((err, result) => result);
    let arrayState = [];
    let state = {};
    for (let i = 0; i < cantStates; i++) {
        state = await miContrato.methods.getState(i)
            .call((err, result) => result);
        state.value = state.id;
        arrayState.push(state);
    }

    return arrayState;
}