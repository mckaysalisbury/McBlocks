///<reference path="../McBlocks/McBlocks.ts" />

var content : IMcBlock[] = [
    { header: "art", image: "images/Untitled.png" },
    { header: "Wikipedia", image: "https://en.wikipedia.org/static/images/project-logos/enwiki.png", href: "https://en.wikipedia.org/", id: "wp" },
    { header: "big art", image: "images/UntitledDeluxe.png", color: "lime" },
    { header: "This is a long message. So long that it doesn't fit", color: "#ff0000" },
    { header: "text", contentText: "This is the content. This is where you could make some text. Text that is so big it more than fills the entire block isn't currently supported." }
];
McBlocks.Add("#start", content);
