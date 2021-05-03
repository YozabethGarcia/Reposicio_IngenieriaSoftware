import {ErrorField} from './App-Generated'

const ErrorMap = (errors: ErrorField[]) => {
    const map : Record<string, string> = {};
    errors.forEach(({field, message}) => {
        map[field] = message;
    })
    
    return map;
}

export default ErrorMap;