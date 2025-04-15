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

interface IMcBlock {
    id? : string;
    header: string;
    image?: string;
    contentText?: string;
    href?: string;
    color?: string;
    alt?: string;
}

class McBlocks {
    
    // Use this method
    static Add(id: string, content: IMcBlock[]) {
        this.simpleReady(() => {
            content.map(McBlocks.addFunc(id));
        });
    }
    
    // Private methods

    private static simpleReady(func : () => void) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            func()
        } else {
            document.addEventListener("DOMContentLoaded", func);
        }
    }

    private static addFunc(id: string) : (mcBlock: IMcBlock) => void {
        var element = document.getElementById(id);
        return function(mcBlock: IMcBlock) {
            element.append(McBlocks.createDom(mcBlock));
        };
    }

    private static createDom(mcBlock: IMcBlock): HTMLElement {
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
            imageDiv.loading = "lazy";
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
        
        var outerBlock : HTMLDivElement | HTMLAnchorElement = document.createElement('div');
        
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
    }
}
