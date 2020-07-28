import {AppLogger} from "../common/logging";
import Doc from "../schemas/doc-schema";
import {DocFilterOptions, IDoc} from "../models/doc-model";

export namespace DocDao {

    export async function filter(options: DocFilterOptions): Promise<IDoc[]> {
        const conditions: { [key: string]: any } = {docType: options.docType, docNbr: options.docNbr};
        if (options.ranges.length) {
            const rangeConditions = [];
            for (let range of options.ranges) {
                const rangeCondition: { [key: string]: any } = {};
                if (range.companyNbr) {
                    rangeCondition['companyNbr'] = range.companyNbr;
                }
                if (range.year) {
                    rangeCondition['year'] = range.year;
                }
                rangeConditions.push(rangeCondition);
            }
            conditions['ranges'] = {'$elemMatch': {'$or': rangeConditions}};
        }

        // {'ranges': {'$elemMatch': {'$or': [{'year': 2019}]}}}
        console.log(conditions);
        let docs: IDoc[] = await Doc.find(conditions).select("-_id -ranges._id -ranges.dates._id");
        AppLogger.info(`Get docs for options: ${options}`);
        return docs;
    }
}
