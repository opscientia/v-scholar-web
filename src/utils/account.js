import Arweave from 'arweave'
import fs from 'fs'

const createAccount  = async () => {
    const instance = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    })
    const wallet = await instance.wallets.generate()
    // console.log(walletName);
    const walletName = "/Users/akshatam/v-scholar-web/wallet1.json"
    await instance.api.get('/mine')

    fs.writeFile(walletName, JSON.stringify(wallet), (err) => {
        console.log("err",err);
    })

    const pathArray = (walletName).split('/')
    const filePath = pathArray.slice(0, pathArray.length - 1 ).join('/')
    const address = await instance.wallets.getAddress(wallet)

    fs.appendFile(`${filePath}/address.txt`, `\n${address}\n`, (err) => {
        console.log("err",err);
    })


    console.log("file is successfully created.");
}

export default createAccount;
