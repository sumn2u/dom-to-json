'use strict';

import Test from 'tape';
// eslint-disable-next-line no-undef
import * as jsdom from 'jsdom'
const { JSDOM } = jsdom;
import { toJSON, toDOM, outerHTML} from '../dist/lib';

Test('convet dom elements to JSON ', (t) => {
    t.test('plan', (t) => {
    const domElement = `<div class="list_item odd" itemscope="" itemtype="http://schema.org/Movie"> </div>`
    const { document } = (new JSDOM(domElement)).window;
    let jsonElement = toJSON(document.querySelector('div'));
        t.plan(1)
        t.equal(jsonElement.childNodes[0].nodeType, 3);
    });

});


Test('revert json to DOM element', (t) => {
    t.test('plan', (t) => {
        const dom = new JSDOM('<!DOCTYPE html>');
        // eslint-disable-next-line no-undef
        global.window = dom.window;
        global.document = dom.window.document;
        global.omg = dom.window.document;
        const domElement = `<div class="list_item odd" itemscope="" itemtype="http://schema.org/Movie"> </div>`
        const expectedResult = {
            nodeType: 1,
            tagName: 'div',
            attributes: [
                ['class', 'list_item odd'],
                ['itemscope', ''],
                ['itemtype', 'http://schema.org/Movie']
            ],
            childNodes: [{
                nodeType: 3,
                nodeName: '#text',
                nodeValue: ' ',
                childNodes: []
            }]
        };
        const domResult = outerHTML(toDOM(expectedResult))
        t.plan(1)
        t.equal(domElement, domResult)
    })
})
