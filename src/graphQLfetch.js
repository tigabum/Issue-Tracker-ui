const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if(dateRegex.test(value)) return new Date(value);
    return value;
}

export default async function graphQLFetch(query, variables = {}, showError = null ){
    try{
        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({query, variables})
        });
        const body = await response.text();
        // console.log(body);
        const result = JSON.parse(body, jsonDateReviver);
        // console.log(result);
       if (result.errors) {
             const error = result.errors[0];
                    if (error.extensions.code == 'BAD_USER_INPUT') {
                    const details = error.extensions.exception.errors.join('\n ');
                    // console.log(details);
                    // alert(`${error.message}:\n ${details}`);
                    if (showError) showError(`${error.message}:\n ${details}`);
                    // showError(`${error.extensions.code}: ${error.message}`);
                }
                    else if (showError){ showError(`Error in sending data to server: ${error.message}`);}
                         
                            }
        
            return result.data;
        }
         catch (e) {
                if (showError) showError(`Error in sending data to server: ${e.message}`);
                return null;
            }
    }       