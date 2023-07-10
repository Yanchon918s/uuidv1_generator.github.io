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

document.getElementById('generateButton').addEventListener('click', function() {
    document.getElementById('uuidOutput').textContent = generateUUIDv1();
});