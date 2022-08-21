import React from "react";
import styled from "styled-components";
import { ellipseAddress, getChainData } from "../helpers/utilities";
import { transitions } from "../styles";


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
        <div>
          <SAddress connected={connected}>{ellipseAddress(address)}</SAddress>
          <div className="fixed
          top-5 right-5" connected={connected} onClick={killSession}>
            {"X"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
