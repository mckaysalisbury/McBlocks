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

var McBlocks = (function () {
    function McBlocks() { }
    McBlocks.addFunc = function addFunc(selector) {
        var selected = $(selector);
        return function (mcBlock) {
            selected.append(McBlocks.createDom(mcBlock));
        };
    };
    McBlocks.Add = function Add(jquerySelector, content) {
        $(document).ready(function () {
            content.map(McBlocks.addFunc(jquerySelector));
        });
    };
    McBlocks.createDom = function createDom(mcBlock) {
        var headerDiv = $("<div/>", {
            text: mcBlock.header
        }).addClass("mainBlockHeader");
        var contentDiv = $("<div/>").addClass("blockContent");
        var href = mcBlock.href;
        if(mcBlock.image != undefined) {
            var imageDiv = $("<img />", {
                src: mcBlock.image
            });
            imageDiv.addClass("blockContentImage");
            if(href == undefined) {
                href = mcBlock.image;
            }
            contentDiv.append(imageDiv);
        } else if(mcBlock.contentText != undefined) {
            var textDiv = $("<p/>", {
                text: mcBlock.contentText
            }).addClass("blockContentText");
            contentDiv.append(textDiv);
        } else {
            var dummyDiv = $("<img />", {
                src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
            });
            dummyDiv.addClass("blockContentDummy");
            contentDiv.append(dummyDiv);
        }
        var outerBlock = $("<div/>");
        if(href != undefined) {
            outerBlock = $("<a/>", {
                href: href
            });
        }
        outerBlock.addClass("mainBlock").prop("id", mcBlock.id);
        outerBlock.append(headerDiv);
        outerBlock.append(contentDiv);
        if(mcBlock.color != undefined) {
            outerBlock.css("background-color", mcBlock.color);
        }
        return outerBlock;
    };
    return McBlocks;
})();
