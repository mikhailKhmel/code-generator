import { ENDPOINT_TYPE } from './enums';

type Lib = { name: string, otherParams?: string };
type Endpoint = { type: ENDPOINT_TYPE, route: string };


export {
    Lib,
    Endpoint
};
