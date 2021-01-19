export async function setOrganitation(_name, _from,miContrato) {
    await miContrato.methods.setOrganitation(_name).send({
            from: _from
        }, function (error, transactionHash) {

        })
        .on('receipt', function (receipt) {
            // receipt example
            console.log('receipt: ' + receipt);
        });
    return await getOrganitation();
}

export async function getOrganitation(miContrato) {
    //se puede usar asi o
    return await miContrato.methods.getOrganitation()
        .call()
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.log(error);
            return '';
        });
    //asi
    // let organitation = miContrato.methods.getOrganitation()
    //     .call((err, result) => result);


}