export async function setOrganitation(_name, _from, miContrato) {
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

export function getOrganitation(miContrato) {
    //se puede usar asi o
    return miContrato.methods.getOrganitation()
        .call()
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.log(error);
            return '';
        });

}