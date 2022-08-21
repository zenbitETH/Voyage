import * as React from "react";
import Icon from "./Icon";
import ERC20Icon from "./ERC20Icon";
import eth from "../assets/eth.svg";
import xdai from "../assets/xdai.png";
import { handleSignificantDecimals, convertAmountFromRawNumber } from "../helpers/bignumber";


const AssetRow = (props: any) => {
  const { asset } = props;
  const nativeCurrencyIcon =
    asset.symbol && asset.symbol.toLowerCase() === "eth"
      ? eth
      : asset.symbol && asset.symbol.toLowerCase() === "xdai"
      ? xdai
      : null;
  return (
    <div {...props}>
      <div>
        {nativeCurrencyIcon ? (
          <Icon src={nativeCurrencyIcon} />
        ) : (
          <ERC20Icon contractAddress={asset.contractAddress.toLowerCase()} />
        )}
        <div>{asset.name}</div>
      </div>
      <div>
        <div>
          {`${handleSignificantDecimals(convertAmountFromRawNumber(asset.balance), 8)} ${
            asset.symbol
          }`}
        </div>
      </div>
    </div>
  );
};

export default AssetRow;
