import {Express} from 'express';
import {DocEp} from "../end-points/doc-ep";

export function initBasicRoutes(app: Express) {

    /* AUTH ROUTES */
    app.post('/api/public/filter-docs', DocEp.docFilterValidationRules(), DocEp.filterDoc);

}
