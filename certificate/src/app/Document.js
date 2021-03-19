export async function addDocuments(arrayHash, _event_id, _state_id, _reasonState, miContrato) {

    // const _startDate = new Date(startDate,'yyy/m/d H:m:s');
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(arrayHash);
    console.log('array');
    
        await miContrato.methods
            .addAllDocumentsEvent(
                arrayHash,
                _event_id,
                _state_id,
                _reasonState
            )
            .send({
                    from: account,
                },
                function (error, transactionHash) {
                    console.log(error);
                }
            );
    return true;
}