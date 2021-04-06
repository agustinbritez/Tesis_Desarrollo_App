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

export async function checkDocuments(arrayHash, arrayDocument, miContrato) {

    //array de boolean en la misma posicion devuelve si existe o no
    let arrayChecks = await miContrato.methods.checkDocuments(arrayHash)
        .call((err, result) => result);
    for (let i = 0; i < arrayHash.length(); i++) {
        arrayDocument[i].exist = arrayChecks[i];
    }

    return arrayDocument;
}

export async function getCantDocumentEvent(event_id,miContrato) {

    //array de boolean en la misma posicion devuelve si existe o no
    return await miContrato.methods.getCantDocumentEvent(event_id)
        .call((err, result) => result);

}

//quede aca
export async function getAllDocumentsEvent(_event_id, _from, _to, miContrato) {
    //se puede usar asi o
    let cantDocumentOfEvent = 0;
    let idDocuments = [];
    if (_event_id > 0) {
        idDocuments = await miContrato.methods.getDocumentsOfEvent(_event_id)
            .call((err, result) => result);
        cantDocumentOfEvent = idDocuments.length;

    } else {
        // tarda mucho saber cuantos documentos existen prque el array documento es un mapping
        return [];
    }
 

    if(cantDocumentOfEvent == 0 ){
        return [];
    }
 

    let _to_fin = _from + _to;

    _to_fin = (_to_fin > (cantDocumentOfEvent)) ? cantDocumentOfEvent : _to_fin;

    let documents = [];
    let document = {};


    for (let index = _from; index < _to_fin; index++) {


        if (idDocuments[index].length > 0) {

            document = await miContrato.methods.getDocument(idDocuments[index])
                .call((err, result) => result);
                document.state = await miContrato.methods.getState(document.state_id)
                    .call((err, result) => result);
            
                documents.push(document);

            
        }

    }
    return documents;

}