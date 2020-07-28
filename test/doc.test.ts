import app from '../src/server';
import {agent as request} from 'supertest';
import { expect } from 'chai';
import {DocFilterOptions} from "../src/models/doc-model";


it('should POST /api/public/filter-docs', async function () {
    let data: DocFilterOptions = {docType: "Fiscal Year Calendar", docNbr: 110, ranges: [{companyNbr: "C101", year: 2019}, {year: 2020}]};
    const res = await request(app).post('/api/public/filter-docs').send(data);
    expect(res.status).to.equal(200);
    expect(res.body.success, JSON.stringify(res.body.errorData)).to.be.true;
    expect(res.body.data).to.be.an("array");
    expect(res.body.data).to.be.length(1);
    expect(res.body.data[0].ranges).to.be.length(2);
});
