// import Arweave from 'arweave/web';

// const hostname = window && window.location && window.location.hostname;

// let arweave_config = null;

// // if(hostname === "localhost") {
//     arweave_config = {
//         host:'localhost',
//         port: 1984,
//         protocol: 'http'
//     }
// // } else {
    
// // }

// // arweave_config = {
// //     host: 'arweave.net',// Hostname or IP address for a Arweave node
// //     port: 443,           // Port, defaults to 1984
// //     protocol: 'https',  // Network protocol http or https, defaults to http
// //     timeout: 200000,     // Network request timeouts in milliseconds
// //     logging: false     // Enable network request logging
// // }



// export default arweave_config;

import Arweave from 'arweave/web';

const hostname = window && window.location && window.location.hostname;

let arweave_config = null;

if(hostname === "localhost") {
    // arweave_config = {
    //     host: '127.0.0.1',
    //     port: 1984
    // }
} else {
    
}

arweave_config = {
    host: 'arweave.net',// Hostname or IP address for a Arweave node
    port: 443,           // Port, defaults to 1984
    protocol: 'https',  // Network protocol http or https, defaults to http
    timeout: 200000,     // Network request timeouts in milliseconds
    logging: false     // Enable network request logging
}

const arweave = Arweave.init(arweave_config);

export default arweave;