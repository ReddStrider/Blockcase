






function playAudio(a) {
    a.pause();
    a.currentTime = 0;
    a.play()
}
var craft = new Audio('sounds/craft.wav');
var focus = new Audio('sounds/focus.wav');
var craftfail = new Audio('sounds/craftfail.wav');
var back = new Audio('sounds/back.wav');
var press = new Audio('sounds/press.wav');


class PanelData {
    constructor(p, h, s, t, so, to, saa, taa, saao, taao) {
        this.start = s;
        this.trail = t;
        this.startAA = saa;
        this.trailAA = taa;
        this.panel = p;
        this.container = h;
        this.startObject = so;
        this.trailObject = to;
        this.startAAObject = saa;
        this.trailAAObject = taa;

        this.soundscroll = new Audio('sounds/scroll.wav');

        //console.log(this.startObject);

        this.startObject.addEventListener('click', (e) => {
            this.updateStartObject();
            playAudio(this.soundscroll);
        });
        this.trailObject.addEventListener('click', (e) => {
            this.updateTrailObject();
            playAudio(this.soundscroll);
        });
    }

    updateStartObject(fftObject) {
        if (this.start == "impulse") {
            this.startObject.src = "assets/repeating.png"
            this.start = "repeating"
        } else if (this.start == "repeating") {
            this.startObject.src = "assets/impulse.png"
            this.start = "impulse"
        }
    }

    updateTrailObject(fftObject) {
        if (this.trail == "impulse") {
            this.trailObject.src = "assets/chain.png"
            this.trail = "chain"
        } else if (this.trail == "chain") {
            this.trailObject.src = "assets/repeating.png"
            this.trail = "repeating"
        } else if (this.trail == "repeating") {
            this.trailObject.src = "assets/impulse.png"
            this.trail = "impulse"
        }
    }
}


class Machine {
    constructor(b) {
        this.blocks = b;
    }
    toSingleStack() {
        let singleStackOutput = 'summon falling_block ~ ~1 ~ {BlockState:{Name:"minecraft:activator_rail"},Time:1'

        for (let i = 0; i < this.blocks.length; i++) {
            singleStackOutput += ',Passengers:[{id:"minecraft:command_block_minecart",Command:"' + this.blocks[i].toCommandForm(0, i + 1, 0) + '"'
        }

        singleStackOutput += ",Passengers:[{id:\"minecraft:command_block_minecart\",Command:\"kill @e[distance=..2,type=minecraft:command_block_minecart]\"";

        for (let i = 0; i < this.blocks.length + 1; i++) {
            singleStackOutput += '}]'
        }
        singleStackOutput += "}"
        return (singleStackOutput)
    }
}


class CommandBlock {
    constructor(c, t, a, d, f, l) {
        this.command = c;
        this.type = t;
        this.auto = a;
        this.conditional = d;
        this.facing = f;
        this.looping = l;
    }
    toCommandForm(x, y, z) {
        console.log(this.blockType("impulse"))
        return ('setblock ~' + x + ' ~' + y + ' ~' + z + ' ' + this.blockType(this.type) + '[facing=' + this.facing + ']{auto:' + this.toBool(this.auto) + ', Command: \\"' + this.command.replace(/\\/g, '\\\\\\\\').replace(/"/g, '\\\\\\"') + '\\" }');

    }
    toBool(b) {
        if (b == true) {
            return ("1b");
        } else {
            return ("0b");
        }
    }
    blockType(t) {
        if (t == "chain") {
            return ("chain_command_block")
        } else if (t == "repeating") {
            return ("repeating_command_block")
        } else {
            return ("command_block")
        }
    }
}


//summon falling_block ~ ~ ~ {BlockState:{Name:"minecraft:activator_rail"},Time:1,Passengers:[{id:"minecraft:command_block_minecart",Command:"e",Passengers:[{id:"minecraft:command_block_minecart"}]}]}

let panelsData = []
let commandHolder = document.getElementById("commandHolder")

function addScriptPanel() {
    var panelContainer = document.createElement("div");
    panelContainer.className = "panel-container";

    var newPanel = document.createElement("textarea");
    newPanel.className = 'box';


    var panelBreak = document.createElement("br");

    var panelStart = document.createElement("img");
    panelStart.className = "panel-buttonimg panel-start";
    panelStart.src = "assets/impulse.png"

    var panelTrail = document.createElement("img");
    panelTrail.className = "panel-buttonimg panel-trail";
    panelTrail.src = "assets/chain.png"



    panelContainer.appendChild(newPanel);
    panelContainer.appendChild(panelBreak);
    panelContainer.appendChild(panelStart);
    panelContainer.appendChild(panelTrail);

    commandHolder.appendChild(panelContainer);

    panelsData.push(new PanelData(newPanel, panelContainer, "impulse", "chain", panelStart, panelTrail))
    // const m = new Machine([new CommandBlock("/summon pig", "impulse", true, false, "up", false), new CommandBlock("/say summoned pig", "chain", true, false, "up", false)]);
    // console.log(m);
    // // for (let i = 0; i < m.blocks.length; i++) {
    // //     outputCommand += ',Passengers:[{id:"minecraft:command_block_minecart",Command:"' + m.blocks[i].toCommandForm(0, i + 1, 0) + '"'
    // // }
    // // for (let i = 0; i < m.blocks.length; i++) {
    // //     outputCommand += '}]'
    // // }
    // // outputCommand += "}"
    // console.log(m.toSingleStack());
    playAudio(craft);
    localStorage.setItem("createdScript", localStorage.getItem("createdScript")+1);
    if(localStorage.getItem("createdScript") == 10){
        displayToast('Achivement get!','Scripter: Create 10 scripts','bread.png');
    }
}

function addDataScriptPanel(textareainside, starttype, trailtype) {
    var panelContainer = document.createElement("div");
    panelContainer.className = "panel-container";

    var newPanel = document.createElement("textarea");
    newPanel.className = 'box';

    newPanel.value = textareainside;

    var panelBreak = document.createElement("br");

    var panelStart = document.createElement("img");
    panelStart.className = "panel-buttonimg panel-start";
    panelStart.src = "assets/" + starttype + ".png"

    var panelTrail = document.createElement("img");
    panelTrail.className = "panel-buttonimg panel-trail";
    panelTrail.src = "assets/" + trailtype + ".png"


    panelContainer.appendChild(newPanel);
    panelContainer.appendChild(panelBreak);
    panelContainer.appendChild(panelStart);
    panelContainer.appendChild(panelTrail);

    commandHolder.appendChild(panelContainer);

    panelsData.push(new PanelData(newPanel, panelContainer, starttype, trailtype, panelStart, panelTrail))
}

function removeScriptPanel() {
    commandHolder.removeChild(panelsData[panelsData.length - 1].container)
    panelsData.pop()
    playAudio(craftfail);
}

function clipboardChain() {
    copyChain()
    navigator.clipboard.writeText(machineOutput);
}


let commmandChains = [];
function copyChain() {
    commmandChains = [];
    for (let i = 0; i < panelsData.length; i++) {
        let chainCommands = textareaToArray(panelsData[i].panel)
        let chainBlocks = []
        chainBlocks.push(new CommandBlock(chainCommands[0], panelsData[i].start, true, false, "up", false))
        for (let ii = 1; ii < chainCommands.length; ii++) {
            chainBlocks.push(new CommandBlock(chainCommands[ii], panelsData[i].trail, true, false, "up", false))
        }
        commmandChains.push(new Machine(chainBlocks))
    }
    console.log(buildMachine(commmandChains));
    playAudio(press);
}


function machineHeight(m) {
    let machineHeight = 0;
    for (let ii = 0; ii < m.length; ii++) {
        if (m[ii].blocks.length > machineHeight) {
            machineHeight = m[ii].blocks.length
        }
    }
    return (machineHeight)
}

let machineOutput;
function buildMachine(m) {
    console.log(m)

    machineOutput = 'summon falling_block ~ ~1 ~ {BlockState:{Name:"minecraft:activator_rail"},Time:1'
    let machineBlockCount = 0;

    if (false) {
        machineBlockCount += 3;
        machineOutput += ',Passengers:[{id:"minecraft:command_block_minecart",Command:"fill ~' + (m.length - 3) + ' ~-1 ~2 ~2 ~' + (machineHeight(m)) + ' ~4 minecraft:light_blue_stained_glass outline"'
        machineOutput += ',Passengers:[{id:"minecraft:command_block_minecart",Command:"fill ~' + (m.length - 3) + ' ~-1 ~2 ~2 ~-1 ~4 minecraft:polished_andesite"'
        machineOutput += ',Passengers:[{id:"minecraft:command_block_minecart",Command:"/setblock ~ ~ ~1 minecraft:warped_wall_sign{Text1:\'{\\"text\\":\\"Built with\\"}\',Text2:\'{\\"text\\":\\"blockcase v-beta0.8\\"}\'} replace"'
    }

    for (let ii = 0; ii < m.length; ii++) {
        for (let i = 0; i < m[ii].blocks.length; i++) {
            //console.log(m[ii].blocks)
            machineBlockCount++;
            machineOutput += ',Passengers:[{id:"minecraft:command_block_minecart",Command:"' + m[ii].blocks[i].toCommandForm(ii, i, 3) + '"'
        }
    }

    machineOutput += ",Passengers:[{id:\"minecraft:command_block_minecart\",Command:\"kill @e[distance=..2,type=minecraft:command_block_minecart]\"";
    //console.log(machineBlockCount)
    for (let i = 0; i < machineBlockCount + 1; i++) {
        machineOutput += '}]'
    }
    machineOutput += "}"
    return (machineOutput)
}


function textareaToArray(t) {
    return (textareaInput = t.value.split("\n"));
}


const testJSON = JSON.parse('[{"blocks":[{"command":"susssss","type":"impulse","auto":true,"conditional":false,"facing":"up","looping":false}]}]');

function loadCommandJSON(json) {
    commandHolder.innerHTML = ''
    panelsData = []
    for (let i = 0; i < json.length; i++) {
        let chainBlocks = []
        let textareaInners = ''
        for (let ii = 0; ii < json[i].blocks.length; ii++) {
            chainBlocks.push(new CommandBlock(json[i].blocks[ii].command, json[i].blocks[ii].type, json[i].blocks[ii].auto, json[i].blocks[ii].conditional, json[i].blocks[ii].facing, json[i].blocks[ii].looping));
            if (ii != 0) {
                textareaInners += '\n' + json[i].blocks[ii].command
            } else {
                textareaInners += json[i].blocks[ii].command
            }

        }
        commmandChains.push(new Machine(chainBlocks))
        console.log(json[i].blocks.length)
        if (json[i].blocks.length > 1) {
            addDataScriptPanel(textareaInners, json[i].blocks[0].type, json[i].blocks[1].type)
        } else {
            addDataScriptPanel(textareaInners, json[i].blocks[0].type, json[i].blocks[0].type)
        }
    }
}

let JSONString = '';

function copyJSON() {
    copyChain()
    JSONString = JSON.stringify(commmandChains)
    navigator.clipboard.writeText(JSONString)
    playAudio(press)
    displayToast('JSON copied', 'paste it into a document to save it', 'excamation.png');
}


function exportJSON() {
    copyChain()
    //navigator.clipboard.writeText(JSON.stringify(commmandChains))
    return (JSON.parse(JSON.stringify(commmandChains)))
}

//I used chatgpt for the functions below because im small brain and regex and blobs are har

function downloadJsonFile(data, filename) {
    var jsonData = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function setURLParameter(url, param, value) {
    // Remove the parameter from the URL if it exists
    url = url.replace(new RegExp('([?&])' + param + '=.*?(&|$)', 'i'), '$1');

    // Add the parameter and its value to the URL
    var separator = url.indexOf('?') !== -1 ? '&' : '?';
    url += separator + param + '=' + value;

    return (url);
}


//this is mine now
function downloadJSON() {
    let filename = document.getElementById('command-name').value
    if (filename != null) {
        downloadJsonFile(exportJSON(), filename)
    } else {
        downloadJsonFile(exportJSON(), "new command creation")
    }
}

async function copyLink() {
    newURL = setURLParameter(setURLParameter(window.location.href, 'src', fixParameters(JSON.stringify(exportJSON()))), 'name', document.getElementById('command-name').value);
    //await navigator.clipboard.writeText(JSON.stringify(newURL));
    //playAudio(press)
    window.location.href = newURL;
}

function fixParameters(p) {
    return p.replace(/&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B').replace(/  /g, '%20');
}



function openJSONInput() {
    document.getElementById('json-input-holder').style = '';
    playAudio(press);
}

function closeJSONInput() {
    document.getElementById('json-input-holder').style = 'display:none;';
    playAudio(back);
    if(!localStorage.getItem("pressedCancel")){
        localStorage.setItem("pressedCancel", true);
        displayToast('Achivement get!','Nevermind... Cancel a JSON load','bread.png');
    }
}

function loadJSONInput() {
    try {
        loadCommandJSON(JSON.parse(document.getElementById('jsonText').value));
        closeJSONInput();
        displayToast('JSON loaded', 'Happy commanding!', 'excamation.png');
    }
    catch (err) {
        displayToast('Error in JSON', err, 'excamation.png');
    }

}








var wrapping = false;


addScriptPanel();

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
let linkJSON = params.get('src');
if (linkJSON != null) {
    console.log(linkJSON);
    loadCommandJSON(JSON.parse(linkJSON));
}
let linkName = params.get('name');
if (linkName != null) {
    //console.log(linkName);
    document.getElementById('command-name').value = linkName;
}
//loadCommandJSON(testJSON)


document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener("mouseover", (event) => {
            var butttonHover = new Audio('sounds/focus.wav');
            playAudio(butttonHover);
        });
    });
});


// var settingsIcon = document.getElementById('settings');
// settingsIcon.addEventListener("click", (event) => {
//     playAudio(press);
// });

var settingsIcon = document.getElementById('info');
settingsIcon.addEventListener("click", (event) => {
    playAudio(press);
    window.open("info.html", "Popup", "width=1280,height=768");
    if(!localStorage.getItem("pressedInfo")){
        localStorage.setItem("pressedInfo", true);
        displayToast('Achivement get!','Inspector: Press the info button.','bread.png');
    }
});