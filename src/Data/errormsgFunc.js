export const getResponseError = (error) => {
    if (error === null || error === undefined){
      return null;
    } 
  
    if (error.response) {
      if (error.response.status === 400 && error.response.data) {
        const responseErrors = error.response.data.error;
        if (responseErrors && Array.isArray(responseErrors)) {
          const errorData = {};
          for (const errorItem of responseErrors) {
            errorData[errorItem.path] =  errorItem.msg;
          }
  
          return errorData;
        } 
  
        return error.response.data.error;
      }

      else if (error.response.status === 409 && error.response.data) {
        console.log(error.response.data.message);

       return error.response.data.message; 
      }
    }
  }