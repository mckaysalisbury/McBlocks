// The MIT License (MIT)
// 
// Copyright (c) 2016 McKay Salisbury
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
var McBlocks = /** @class */ (function () {
    function McBlocks() {
    }
    // Use this method
    McBlocks.Add = function (id, content) {
        this.simpleReady(function () {
            content.map(McBlocks.addFunc(id));
        });
    };
    // Private methods
    McBlocks.simpleReady = function (func) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            func();
        }
        else {
            document.addEventListener("DOMContentLoaded", func);
        }
    };
    McBlocks.addFunc = function (id) {
        var element = document.getElementById(id);
        return function (mcBlock) {
            element.append(McBlocks.createDom(mcBlock));
        };
    };
    McBlocks.createDom = function (mcBlock) {
        var headerDiv = document.createElement('div');
        headerDiv.innerText = mcBlock.header;
        headerDiv.className = 'mainBlockHeader';
        var contentDiv = document.createElement('div');
        contentDiv.className = 'blockContent';
        var alignerDiv = document.createElement('div');
        alignerDiv.className = 'mainBlockAligner';
        var href = mcBlock.href;
        if (mcBlock.image !== undefined) {
            var imageDiv = document.createElement('img');
            imageDiv.src = mcBlock.image;
            imageDiv.alt = mcBlock.alt;
            imageDiv.className = 'blockContentImage';
            if (href == undefined) {
                href = mcBlock.image;
            }
            contentDiv.append(imageDiv);
        }
        else if (mcBlock.contentText !== undefined) {
            var textDiv = document.createElement('p');
            textDiv.textContent = mcBlock.contentText;
            textDiv.className = 'blockContentText';
            contentDiv.append(textDiv);
        }
        else {
            var dummyDiv = document.createElement('img');
            dummyDiv.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            dummyDiv.className = "blockContentDummy";
            contentDiv.append(dummyDiv);
        }
        var outerBlock = document.createElement('div');
        if (href !== undefined) {
            outerBlock = document.createElement('a');
            outerBlock.href = href;
        }
        outerBlock.className = "mainBlock";
        outerBlock.id = mcBlock.id;
        outerBlock.append(headerDiv);
        outerBlock.append(alignerDiv);
        outerBlock.append(contentDiv);
        if (mcBlock.color !== undefined) {
            outerBlock.style.backgroundColor = mcBlock.color;
        }
        return outerBlock;
    };
    return McBlocks;
}());
//# sourceMappingURL=McBlocks.js.map