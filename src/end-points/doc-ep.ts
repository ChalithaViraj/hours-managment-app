import {DocDao} from "../dao/doc-dao";
import {Util} from "../common/util";
import {NextFunction, Request, Response} from "express";
import {body, check, validationResult} from "express-validator";
import {IDoc} from "../models/doc-model";

export namespace DocEp {

    export function docFilterValidationRules() {
        return [
            body('docType').isString().escape(),
            body('docNbr').isNumeric().escape(),
            body('ranges.*.companyNbr').optional({ checkFalsy: true }).escape(),
            body('ranges.*.year').optional({ checkFalsy: true }).isNumeric().escape(),
        ];
    }

    export function filterDoc(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Util.sendError(res, { errors: errors.array() });
        }
        DocDao.filter(req.body).then(docs => {
            Util.sendSuccess(res, docs.map((e: IDoc) => e.toJSON()));
        }).catch(next);
    }
}
