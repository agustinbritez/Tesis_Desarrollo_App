export async function addDocuments(arrayDocuments,_event_id, miContrato) {

    // const _startDate = new Date(startDate,'yyy/m/d H:m:s');
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(startDate);
    arrayDocuments.forEach(element => {
        await miContrato.methods
            .addDocument(element.hash,
                _event_id,
                element.state_id,
                element.reasonState,
            )
            .send({
                    from: account,
                },
                function (error, transactionHash) {}
            );
    });
}