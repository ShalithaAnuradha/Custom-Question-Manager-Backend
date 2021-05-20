/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-20
 **/

const assert = require('assert');
const question_dispatcher = require('../dist/api/question-dispatcher');
describe('Pagination', () => {
    it('should return sliced array', () => {
        const result = question_dispatcher.pagination(2,3,[0,1,2,3,4,5,6,7,8]);
        assert.strictEqual(JSON.stringify(result), JSON.stringify([3,4]));
    });
    it('Check whether unit test is working', () => {
        assert.strictEqual(3 * 3, 9);
    });
});
