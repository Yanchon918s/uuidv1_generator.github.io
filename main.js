function generateUUIDv1() {
    const now = Date.now();
    const timestamp = ((now + 12219292800000) * 10000) % 0x10000000000000000;
    const timeLow = timestamp & 0xffffffff;
    const timeMid = (timestamp & 0x1000000000000) >> 32;
    const timeHigh = (timestamp & 0xfff0000000000000) >> 48;
    const clockSeq = Math.floor(Math.random() * 0x3fff) | 0x8000;
    const node = Math.floor(Math.random() * 0x1000000000000);

    return (
        ("00000000" + timeLow.toString(16)).slice(-8) +
        "-" +
        ("0000" + timeMid.toString(16)).slice(-4) +
        "-" +
        ("1" + ("000" + timeHigh.toString(16)).slice(-3)) +
        "-" +
        ("0000" + clockSeq.toString(16)).slice(-4) +
        "-" +
        ("000000000000" + node.toString(16)).slice(-12)
    );
}

function copyToClipboard(text) {
    const tempElem = document.createElement('textarea');
    tempElem.value = text;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');

    document.body.removeChild(tempElem);
}

document.getElementById('generateButton').addEventListener('click', function() {
    const uuid = generateUUIDv1();

    if (document.getElementById('copyCheckbox').checked) {
        copyToClipboard(uuid);
    }

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = uuid;
    li.appendChild(span);

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.classList.add('copyButton');
    copyButton.addEventListener('click', function() {
        copyToClipboard(uuid);
    });
    li.appendChild(copyButton);

    const uuidList = document.getElementById('uuidList');
    uuidList.insertBefore(li, uuidList.firstChild);

    if (uuidList.childElementCount > 10) {
        uuidList.removeChild(uuidList.lastChild);
    }
});