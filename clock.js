const clockPageChange = (buffer, pointer, page) => {
    while (true) {
        if (buffer[pointer][0] === -1 || buffer[pointer][0] === 0) {
            buffer[pointer] = [1, page];
            pointer = (pointer + 1) % buffer.length;
            break;
        }
        if (buffer[pointer][0] === 1) {
            buffer[pointer][0] = 0;
            pointer = (pointer + 1) % buffer.length;
        }
    }
}

const printHitsAndFaults = (reference_string, bufferPages) => {
    let pointer = 0;
    let pageFaultCount = 0;

    const buffer = new Array(bufferPages).fill([-1, undefined]);
    const pagesRequested = reference_string.split(' ');

    pagesRequested.forEach(page => {
        const pageFounded = buffer.find(bufferPage => bufferPage[1] === page);
        if (!pageFounded) {
            pageFaultCount++;   
            clockPageChange(buffer, pointer, page);
        }
    });

    console.log("Total page faults were " + pageFaultCount);
}

const reference_string = "1 2 2";
const bufferPages = 2;
printHitsAndFaults(reference_string, bufferPages);
