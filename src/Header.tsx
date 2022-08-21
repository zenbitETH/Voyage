import React from "react";
import styled from "styled-components";
import Blockie from "../src/components/Blockie";
import { ellipseAddress, getChainData } from "./helpers/utilities";
import { transitions } from "./styles";

const SBlockie = styled(Blockie as any)`
  margin-right: 10px;
`;

interface IHeaderStyle {
  connected: boolean;
}

const SAddress = styled.p<IHeaderStyle>`
  transition: ${transitions.base};
  font-weight: bold;
  margin: ${({ connected }) => (connected ? "-2px auto 0.7em" : "0")};
`;

const SUnsupportedChain = styled.div`
  transition: ${transitions.base};
  font-weight: bold;
  color: red;
`;

const SDisconnect = styled.div<IHeaderStyle>`
  transition: ${transitions.button};
  font-size: 12px;
  font-family: monospace;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;

  opacity: ${({ connected }) => (connected ? 1 : 0)};
  visibility: ${({ connected }) => (connected ? "visible" : "hidden")};
  pointer-events: ${({ connected }) => (connected ? "auto" : "none")};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;

interface IHeaderProps {
  killSession: () => void;
  connected: boolean;
  address: string;
  chainId: number;
}

const Header = ({ connected, address, chainId, killSession }: IHeaderProps) => {
  let activeChain = null;

  try {
    activeChain = chainId ? getChainData(chainId).name : null;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      {connected && (
        <div>
          {activeChain ? (
            <>
              <p>{activeChain}</p>
            </>
          ) : (
            <SUnsupportedChain>
              <p>Chain not supported.</p>
              <p>Please switch to a supported chain in your wallet.</p>
            </SUnsupportedChain>
          )}
        </div>
      )}
      {address && (
        <SActiveAccount>
          <SBlockie address={address} />
          <SAddress connected={connected}>{ellipseAddress(address)}</SAddress>
          <SDisconnect connected={connected} onClick={killSession}>
            {"Disconnect"}
          </SDisconnect>
        </SActiveAccount>
      )}
    </div>
  );
};

export default Header;
