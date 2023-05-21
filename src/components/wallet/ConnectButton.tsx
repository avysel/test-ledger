
import Tezos from "@ledgerhq/hw-app-tezos"
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { useEffect, useState } from 'react';

function ConnectButton() {

    const disclaimer = "<h1>Connect your Ledger and open the Tezos app. Click anywhere to start...</h1>";

    const [tezApp, setTezApp] = useState<Tezos | undefined>();

    const initScreen = async () => {
        const tezosAddress = await tezApp.getAddress(
            "44'/0'/0'/0/0",
            { verify: false,}
          );

          console.log(tezosAddress);
    }

    useEffect(() => {

        const initTezApp = async () => {
            const transport = await TransportWebUSB.create();
            setTezApp(new Tezos(transport));
        }
    
        initTezApp().then( () => initScreen());

    }, [])

    return (
        <>
        {disclaimer}
        <button className="button">Connect Ledger</button>
        </>
        
    );
}

export default ConnectButton;