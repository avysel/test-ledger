
import AppTezos from "@ledgerhq/hw-app-tezos"
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { useEffect, useState } from 'react';

function ConnectButton() {

    const [tezApp, setTezApp] = useState<AppTezos | undefined>();

    useEffect(() => {

    }, [])

    const connectLedger = () => {
        console.log(`Connect with ${tezApp}`)
        const initTezApp = async () => {
            try {
                if(!tezApp) {
                    const transport: any = await TransportWebUSB.create();
                    console.log(transport);
                    const app = new AppTezos(transport);
                    console.log(app);
                    setTezApp(app);
                    console.log(await app.getVersion());
                    const tezosAddress = await app.getAddress(
                        "44'/1729'/1'/0",
                        { verify: false }
                    );
            
                    console.log(tezosAddress);
                }
                else {
                    console.log("Already connected");
                }
            }
            catch(error) {
                console.error(error);
            }
        }

        initTezApp();
    }

    return (
        <>
            <button className="button" onClick={connectLedger}>Connect Ledger</button>
        </>

    );
}

export default ConnectButton;