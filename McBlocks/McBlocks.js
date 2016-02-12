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
        var blockDiv = $("<div/>").addClass("mainBlock").prop("id", mcBlock.id);
        blockDiv.append(headerDiv);
        blockDiv.append(contentDiv);
        if(href != undefined) {
            blockDiv.click(function () {
                document.location.href = href;
            });
        }
        if(mcBlock.color != undefined) {
            blockDiv.css("background-color", mcBlock.color);
        }
        return blockDiv;
    };
    return McBlocks;
})();
