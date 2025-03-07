import {
  ChainId,
  CHAIN_ID_ACALA,
  CHAIN_ID_ALGORAND,
  CHAIN_ID_APTOS,
  CHAIN_ID_ARBITRUM,
  CHAIN_ID_AURORA,
  CHAIN_ID_AVAX,
  CHAIN_ID_BASE,
  CHAIN_ID_BSC,
  CHAIN_ID_BTC,
  CHAIN_ID_CELO,
  CHAIN_ID_ETH,
  CHAIN_ID_FANTOM,
  CHAIN_ID_INJECTIVE,
  CHAIN_ID_KARURA,
  CHAIN_ID_KLAYTN,
  CHAIN_ID_MOONBEAM,
  CHAIN_ID_NEAR,
  CHAIN_ID_NEON,
  CHAIN_ID_OASIS,
  CHAIN_ID_OPTIMISM,
  CHAIN_ID_POLYGON,
  CHAIN_ID_SOLANA,
  CHAIN_ID_SUI,
  CHAIN_ID_TERRA,
  CHAIN_ID_TERRA2,
  CHAIN_ID_XPLA,
  CHAIN_ID_SEI,
  CONTRACTS,
  coalesceChainName,
  isEVMChain,
  isTerraChain,
  TerraChainId,
  hexToNativeString,
  ensureHexPrefix,
  uint8ArrayToHex,
  hexToNativeAssetString,
  cosmos,
} from "@certusone/wormhole-sdk";
import { clusterApiUrl } from "@solana/web3.js";
import { getAddress } from "ethers/lib/utils";
import seiIcon from "../icons/sei.svg";
import aptosIcon from "../icons/aptos.svg";
import acalaIcon from "../icons/acala.svg";
import algorandIcon from "../icons/algorand.svg";
import arbitrumIcon from "../icons/arbitrum.svg";
import auroraIcon from "../icons/aurora.svg";
import avaxIcon from "../icons/avax.svg";
import baseIcon from "../icons/base.svg";
import bscIcon from "../icons/bsc.svg";
import celoIcon from "../icons/celo.svg";
import ethIcon from "../icons/eth.svg";
import fantomIcon from "../icons/fantom.svg";
import karuraIcon from "../icons/karura.svg";
import klaytnIcon from "../icons/klaytn.svg";
import moonbeamIcon from "../icons/moonbeam.svg";
import neonIcon from "../icons/neon.svg";
import oasisIcon from "../icons/oasis-network-rose-logo.svg";
import optimismIcon from "../icons/optimism.svg";
import polygonIcon from "../icons/polygon.svg";
import solanaIcon from "../icons/solana.svg";
import suiIcon from "../icons/sui.svg";
import terraIcon from "../icons/terra.svg";
import terra2Icon from "../icons/terra2.svg";
import nearIcon from "../icons/near.svg";
import xplaIcon from "../icons/xpla.svg";
import injectiveIcon from "../icons/injective.svg";
import { ConnectConfig, keyStores } from "near-api-js";
import { AptosNetwork } from "./aptos";
import { getNetworkInfo, Network } from "@injectivelabs/networks";
import { ChainId as InjectiveChainId } from "@injectivelabs/ts-types";
import { ChainConfiguration } from "@sei-js/react";
import { Connection } from "@mysten/sui.js";

export type Cluster = "devnet" | "testnet" | "mainnet";
export const CLUSTER: Cluster =
  process.env.REACT_APP_CLUSTER === "mainnet"
    ? "mainnet"
    : process.env.REACT_APP_CLUSTER === "testnet"
    ? "testnet"
    : "devnet";

export interface ChainInfo {
  id: ChainId;
  name: string;
  logo: string;
}
export const CHAINS: ChainInfo[] =
  CLUSTER === "mainnet"
    ? [
        {
          id: CHAIN_ID_ACALA,
          name: "Acala",
          logo: acalaIcon,
        },
        {
          id: CHAIN_ID_ALGORAND,
          name: "Algorand",
          logo: algorandIcon,
        },
        {
          id: CHAIN_ID_APTOS,
          name: "Aptos",
          logo: aptosIcon,
        },
        {
          id: CHAIN_ID_ARBITRUM,
          name: "Arbitrum",
          logo: arbitrumIcon,
        },
        {
          id: CHAIN_ID_AURORA,
          name: "Aurora",
          logo: auroraIcon,
        },
        {
          id: CHAIN_ID_AVAX,
          name: "Avalanche",
          logo: avaxIcon,
        },
        {
          id: CHAIN_ID_BASE,
          name: "Base",
          logo: baseIcon,
        },
        {
          id: CHAIN_ID_BSC,
          name: "BNB Chain",
          logo: bscIcon,
        },
        {
          id: CHAIN_ID_CELO,
          name: "Celo",
          logo: celoIcon,
        },
        {
          id: CHAIN_ID_ETH,
          name: "Ethereum",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_FANTOM,
          name: "Fantom",
          logo: fantomIcon,
        },
        {
          id: CHAIN_ID_INJECTIVE,
          name: "Injective",
          logo: injectiveIcon,
        },
        {
          id: CHAIN_ID_KARURA,
          name: "Karura",
          logo: karuraIcon,
        },
        {
          id: CHAIN_ID_KLAYTN,
          name: "Klaytn",
          logo: klaytnIcon,
        },
        {
          id: CHAIN_ID_MOONBEAM,
          name: "Moonbeam",
          logo: moonbeamIcon,
        },
        {
          id: CHAIN_ID_NEAR,
          name: "Near",
          logo: nearIcon,
        },
        {
          id: CHAIN_ID_OASIS,
          name: "Oasis",
          logo: oasisIcon,
        },
        {
          id: CHAIN_ID_OPTIMISM,
          name: "Optimism",
          logo: optimismIcon,
        },
        {
          id: CHAIN_ID_POLYGON,
          name: "Polygon",
          logo: polygonIcon,
        },
        {
          id: CHAIN_ID_SEI,
          name: "Sei",
          logo: seiIcon,
        },
        {
          id: CHAIN_ID_SOLANA,
          name: "Solana",
          logo: solanaIcon,
        },
        {
          id: CHAIN_ID_SUI,
          name: "Sui",
          logo: suiIcon,
        },
        {
          id: CHAIN_ID_TERRA,
          name: "Terra Classic",
          logo: terraIcon,
        },
        {
          id: CHAIN_ID_TERRA2,
          name: "Terra",
          logo: terra2Icon,
        },
        {
          id: CHAIN_ID_XPLA,
          name: "XPLA",
          logo: xplaIcon,
        },
      ]
    : CLUSTER === "testnet"
    ? [
        {
          id: CHAIN_ID_ACALA,
          name: "Acala",
          logo: acalaIcon,
        },
        {
          id: CHAIN_ID_ALGORAND,
          name: "Algorand",
          logo: algorandIcon,
        },
        {
          id: CHAIN_ID_APTOS,
          name: "Aptos",
          logo: aptosIcon,
        },
        {
          id: CHAIN_ID_ARBITRUM,
          name: "Arbitrum",
          logo: arbitrumIcon,
        },
        {
          id: CHAIN_ID_AURORA,
          name: "Aurora",
          logo: auroraIcon,
        },
        {
          id: CHAIN_ID_AVAX,
          name: "Avalanche",
          logo: avaxIcon,
        },
        {
          id: CHAIN_ID_BASE,
          name: "Base (Goerli)",
          logo: baseIcon,
        },
        {
          id: CHAIN_ID_BSC,
          name: "BNB Chain",
          logo: bscIcon,
        },
        {
          id: CHAIN_ID_CELO,
          name: "Celo",
          logo: celoIcon,
        },
        {
          id: CHAIN_ID_ETH,
          name: "Ethereum (Goerli)",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_FANTOM,
          name: "Fantom",
          logo: fantomIcon,
        },
        {
          id: CHAIN_ID_INJECTIVE,
          name: "Injective",
          logo: injectiveIcon,
        },
        {
          id: CHAIN_ID_KARURA,
          name: "Karura",
          logo: karuraIcon,
        },
        {
          id: CHAIN_ID_KLAYTN,
          name: "Klaytn",
          logo: klaytnIcon,
        },
        {
          id: CHAIN_ID_NEAR,
          name: "Near",
          logo: nearIcon,
        },
        {
          id: CHAIN_ID_NEON,
          name: "Neon",
          logo: neonIcon,
        },
        {
          id: CHAIN_ID_OASIS,
          name: "Oasis",
          logo: oasisIcon,
        },
        {
          id: CHAIN_ID_OPTIMISM,
          name: "Optimism",
          logo: optimismIcon,
        },
        {
          id: CHAIN_ID_POLYGON,
          name: "Polygon",
          logo: polygonIcon,
        },
        {
          id: CHAIN_ID_SEI,
          name: "Sei",
          logo: seiIcon,
        },
        {
          id: CHAIN_ID_SOLANA,
          name: "Solana",
          logo: solanaIcon,
        },
        {
          id: CHAIN_ID_SUI,
          name: "Sui",
          logo: suiIcon,
        },
        {
          id: CHAIN_ID_TERRA,
          name: "Terra Classic",
          logo: terraIcon,
        },
        {
          id: CHAIN_ID_TERRA2,
          name: "Terra",
          logo: terra2Icon,
        },
        {
          id: CHAIN_ID_XPLA,
          name: "XPLA",
          logo: xplaIcon,
        },
      ]
    : [
        {
          id: CHAIN_ID_ALGORAND,
          name: "Algorand",
          logo: algorandIcon,
        },
        {
          id: CHAIN_ID_APTOS,
          name: "Aptos",
          logo: aptosIcon,
        },
        {
          id: CHAIN_ID_BSC,
          name: "BNB Chain",
          logo: bscIcon,
        },
        {
          id: CHAIN_ID_ETH,
          name: "Ethereum",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_NEAR,
          name: "Near",
          logo: nearIcon,
        },
        {
          id: CHAIN_ID_SOLANA,
          name: "Solana",
          logo: solanaIcon,
        },
        {
          id: CHAIN_ID_SUI,
          name: "Sui",
          logo: suiIcon,
        },
        {
          id: CHAIN_ID_TERRA,
          name: "Terra Classic",
          logo: terraIcon,
        },
        {
          id: CHAIN_ID_TERRA2,
          name: "Terra",
          logo: terra2Icon,
        },
      ];
export const BETA_CHAINS: ChainId[] = CLUSTER === "mainnet" ? [] : [];
export const CHAINS_WITH_NFT_SUPPORT = CHAINS.filter(
  ({ id }) =>
    id === CHAIN_ID_AVAX ||
    id === CHAIN_ID_BSC ||
    id === CHAIN_ID_ETH ||
    id === CHAIN_ID_POLYGON ||
    id === CHAIN_ID_OASIS ||
    id === CHAIN_ID_SOLANA ||
    id === CHAIN_ID_AURORA ||
    id === CHAIN_ID_FANTOM ||
    id === CHAIN_ID_KARURA ||
    id === CHAIN_ID_ACALA ||
    id === CHAIN_ID_KLAYTN ||
    id === CHAIN_ID_CELO ||
    id === CHAIN_ID_NEON ||
    id === CHAIN_ID_MOONBEAM ||
    id === CHAIN_ID_ARBITRUM ||
    id === CHAIN_ID_OPTIMISM ||
    id === CHAIN_ID_APTOS ||
    id === CHAIN_ID_BASE
);
export type ChainsById = { [key in ChainId]: ChainInfo };
export const CHAINS_BY_ID: ChainsById = CHAINS.reduce((obj, chain) => {
  obj[chain.id] = chain;
  return obj;
}, {} as ChainsById);

const THRESHOLD_GATEWAYS_MAINNET: any = {
  [CHAIN_ID_POLYGON]: "0x09959798B95d00a3183d20FaC298E4594E599eab",
  [CHAIN_ID_OPTIMISM]: "0x1293a54e160D1cd7075487898d65266081A15458",
  [CHAIN_ID_ARBITRUM]: "0x1293a54e160D1cd7075487898d65266081A15458",
  [CHAIN_ID_BASE]: "0x09959798B95d00a3183d20FaC298E4594E599eab",
  [CHAIN_ID_SOLANA]: "87MEvHZCXE3ML5rrmh5uX1FbShHmRXXS32xJDGbQ7h5t", // Solana TBTC Gateway Program
} as const;

const THRESHOLD_GATEWAYS_TESTNET: any = {
  [CHAIN_ID_POLYGON]: "0x91fe7128f74dbd4f031ea3d90fc5ea4dcfd81818",
  [CHAIN_ID_OPTIMISM]: "0x6449F4381f3d63bDfb36B3bDc375724aD3cD4621",
  [CHAIN_ID_ARBITRUM]: "0x31A15e213B59E230b45e8c5c99dAFAc3d1236Ee2",
  [CHAIN_ID_BASE]: "0xe3e0511EEbD87F08FbaE4486419cb5dFB06e1343",
  [CHAIN_ID_SOLANA]: "87MEvHZCXE3ML5rrmh5uX1FbShHmRXXS32xJDGbQ7h5t", // Solana TBTC Gateway Program
} as const;

export const THRESHOLD_GATEWAYS: any = {
  ...(CLUSTER === "mainnet"
    ? THRESHOLD_GATEWAYS_MAINNET
    : THRESHOLD_GATEWAYS_TESTNET),
} as const;

const THRESHOLD_TBTC_CONTRACTS_MAINNET: any = {
  [CHAIN_ID_ETH]: "0x18084fbA666a33d37592fA2633fD49a74DD93a88",
  [CHAIN_ID_POLYGON]: "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b",
  [CHAIN_ID_OPTIMISM]: "0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40",
  [CHAIN_ID_ARBITRUM]: "0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40",
  [CHAIN_ID_BASE]: "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b",
  [CHAIN_ID_SOLANA]: "6DNSN2BJsaPFdFFc1zP37kkeNe4Usc1Sqkzr9C9vPWcU", // Solana TBTC Mint
} as const;

const THRESHOLD_TBTC_CONTRACTS_TESTNET: any = {
  [CHAIN_ID_ETH]: "0x679874fBE6D4E7Cc54A59e315FF1eB266686a937",
  [CHAIN_ID_POLYGON]: "0xBcD7917282E529BAA6f232DdDc75F3901245A492",
  [CHAIN_ID_OPTIMISM]: "0x1a53759DE2eADf73bd0b05c07a4F1F5B7912dA3d",
  [CHAIN_ID_ARBITRUM]: "0x85727F4725A4B2834e00Db1AA8e1b843a188162F",
  [CHAIN_ID_BASE]: "0x783349cd20f26CE12e747b1a17bC38D252c9e119",
  [CHAIN_ID_SOLANA]: "6DNSN2BJsaPFdFFc1zP37kkeNe4Usc1Sqkzr9C9vPWcU", // Solana TBTC Mint
} as const;

const THRESHOLD_TBTC_SOLANA_PROGRAM_TESTNET =
  "Gj93RRt6QB7FjmyokAD5rcMAku7pq3Fk2Aa8y6nNbwsV";

// TODO update this when mainnet tbtc solana program is deployed
const THRESHOLD_TBTC_SOLANA_PROGRAM_MAINNET =
  "Gj93RRt6QB7FjmyokAD5rcMAku7pq3Fk2Aa8y6nNbwsV";

export const THRESHOLD_TBTC_SOLANA_PROGRAM: any =
  CLUSTER === "mainnet"
    ? THRESHOLD_TBTC_SOLANA_PROGRAM_MAINNET
    : THRESHOLD_TBTC_SOLANA_PROGRAM_TESTNET;

export const THRESHOLD_TBTC_CONTRACTS: any = {
  ...(CLUSTER === "mainnet"
    ? THRESHOLD_TBTC_CONTRACTS_MAINNET
    : THRESHOLD_TBTC_CONTRACTS_TESTNET),
} as const;

// prettier-ignore
export const TBTC_ASSET_ADDRESS = THRESHOLD_TBTC_CONTRACTS[CHAIN_ID_ETH].slice(2).padStart(64, "0");
export const THRESHOLD_ARBITER_FEE = 0;
export const THRESHOLD_NONCE = 0;

// TRM screening chain names map with wormhole chain ids
// https://documentation.trmlabs.com/tag/Supported-Blockchain-List
export const getTrmChainName = (chain: ChainId) => {
  const trm_chain_names: any = {
    [CHAIN_ID_ALGORAND]: "algorand",
    [CHAIN_ID_BTC]: "bitcoin",
    [CHAIN_ID_SOLANA]: "solana",
    [CHAIN_ID_AVAX]: "avalanche_c_chain",
    [CHAIN_ID_BSC]: "binance_smart_chain",
    [CHAIN_ID_CELO]: "celo",
    [CHAIN_ID_OPTIMISM]: "optimism",
    [CHAIN_ID_POLYGON]: "polygon",
    [CHAIN_ID_ARBITRUM]: "arbitrum",
  };

  if (trm_chain_names[chain]) return trm_chain_names[chain];
  if (isEVMChain(chain)) return "ethereum";

  return "";
};

export const COMING_SOON_CHAINS: ChainInfo[] = [];
export const getDefaultNativeCurrencySymbol = (chainId: ChainId) =>
  chainId === CHAIN_ID_SOLANA
    ? "SOL"
    : chainId === CHAIN_ID_ETH
    ? "ETH"
    : chainId === CHAIN_ID_BSC
    ? "BNB"
    : chainId === CHAIN_ID_TERRA
    ? "LUNC"
    : chainId === CHAIN_ID_TERRA2
    ? "LUNA"
    : chainId === CHAIN_ID_POLYGON
    ? "MATIC"
    : chainId === CHAIN_ID_AVAX
    ? "AVAX"
    : chainId === CHAIN_ID_OASIS
    ? "ROSE"
    : chainId === CHAIN_ID_OPTIMISM
    ? "ETH"
    : chainId === CHAIN_ID_ALGORAND
    ? "ALGO"
    : chainId === CHAIN_ID_AURORA
    ? "ETH"
    : chainId === CHAIN_ID_FANTOM
    ? "FTM"
    : chainId === CHAIN_ID_KARURA
    ? "KAR"
    : chainId === CHAIN_ID_ACALA
    ? "ACA"
    : chainId === CHAIN_ID_KLAYTN
    ? "KLAY"
    : chainId === CHAIN_ID_CELO
    ? "CELO"
    : chainId === CHAIN_ID_XPLA
    ? "XPLA"
    : chainId === CHAIN_ID_NEON
    ? "NEON"
    : chainId === CHAIN_ID_MOONBEAM
    ? "GLMR"
    : chainId === CHAIN_ID_BASE
    ? "ETH"
    : chainId === CHAIN_ID_APTOS
    ? "APTOS"
    : chainId === CHAIN_ID_ARBITRUM
    ? "ETH"
    : chainId === CHAIN_ID_INJECTIVE
    ? "INJ"
    : chainId === CHAIN_ID_SUI
    ? "SUI"
    : "";

export const getDefaultNativeCurrencyAddressEvm = (chainId: ChainId) => {
  return chainId === CHAIN_ID_ETH
    ? WETH_ADDRESS
    : chainId === CHAIN_ID_BSC
    ? WBNB_ADDRESS
    : chainId === CHAIN_ID_POLYGON
    ? WMATIC_ADDRESS
    : chainId === CHAIN_ID_AVAX
    ? WAVAX_ADDRESS
    : chainId === CHAIN_ID_OASIS
    ? WROSE_ADDRESS
    : chainId === CHAIN_ID_AURORA
    ? WETH_AURORA_ADDRESS
    : chainId === CHAIN_ID_FANTOM
    ? WFTM_ADDRESS
    : chainId === CHAIN_ID_KARURA
    ? KAR_ADDRESS
    : chainId === CHAIN_ID_ACALA
    ? ACA_ADDRESS
    : chainId === CHAIN_ID_KLAYTN
    ? WKLAY_ADDRESS
    : chainId === CHAIN_ID_CELO
    ? CELO_ADDRESS
    : chainId === CHAIN_ID_NEON
    ? WNEON_ADDRESS
    : chainId === CHAIN_ID_MOONBEAM
    ? WGLMR_ADDRESS
    : "";
};

export const getExplorerName = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? "Etherscan"
    : chainId === CHAIN_ID_BSC
    ? "BscScan"
    : isTerraChain(chainId)
    ? "Finder"
    : chainId === CHAIN_ID_POLYGON
    ? "Polygonscan"
    : chainId === CHAIN_ID_AVAX
    ? "Snowtrace"
    : chainId === CHAIN_ID_ALGORAND
    ? "AlgoExplorer"
    : chainId === CHAIN_ID_FANTOM
    ? "FTMScan"
    : chainId === CHAIN_ID_KLAYTN
    ? "Klaytnscope"
    : chainId === CHAIN_ID_SOLANA
    ? "Solscan"
    : chainId === CHAIN_ID_MOONBEAM
    ? "Moonscan"
    : chainId === CHAIN_ID_BASE
    ? "BaseScan"
    : chainId === CHAIN_ID_XPLA
    ? "XPLA Explorer"
    : chainId === CHAIN_ID_ARBITRUM
    ? "Arbiscan"
    : chainId === CHAIN_ID_OPTIMISM
    ? "Optimism Explorer"
    : "Explorer";
export const WORMHOLE_RPC_HOSTS =
  CLUSTER === "mainnet"
    ? [
        "https://wormhole-v2-mainnet-api.certus.one",
        "https://wormhole.inotel.ro",
        "https://wormhole-v2-mainnet-api.mcf.rocks",
        "https://wormhole-v2-mainnet-api.chainlayer.network",
        "https://wormhole-v2-mainnet-api.staking.fund",
        "https://wormhole-v2-mainnet.01node.com",
      ]
    : CLUSTER === "testnet"
    ? ["https://wormhole-v2-testnet-api.certus.one"]
    : ["http://localhost:7071"];
export const ETH_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1 : CLUSTER === "testnet" ? 5 : 1337;
export const ROPSTEN_ETH_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1 : CLUSTER === "testnet" ? 3 : 1337;
export const BSC_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 56 : CLUSTER === "testnet" ? 97 : 1397;
export const POLYGON_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 137 : CLUSTER === "testnet" ? 80001 : 1381;
export const AVAX_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 43114 : CLUSTER === "testnet" ? 43113 : 1381;
export const OASIS_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 42262 : CLUSTER === "testnet" ? 42261 : 1381;
export const AURORA_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet"
    ? 1313161554
    : CLUSTER === "testnet"
    ? 1313161555
    : 1381;
export const FANTOM_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 250 : CLUSTER === "testnet" ? 4002 : 1381;
export const KARURA_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 686 : CLUSTER === "testnet" ? 596 : 1381;
export const ACALA_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 787 : CLUSTER === "testnet" ? 597 : 1381;
export const KLAYTN_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 8217 : CLUSTER === "testnet" ? 1001 : 1381;
export const CELO_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 42220 : CLUSTER === "testnet" ? 44787 : 1381;
export const NEON_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 245022934 : CLUSTER === "testnet" ? 245022926 : 1381;
export const MOONBEAM_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1284 : CLUSTER === "testnet" ? 1287 : 1381;
export const ARBITRUM_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 42161 : CLUSTER === "testnet" ? 421613 : 1381;
export const OPTIMISM_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 10 : CLUSTER === "testnet" ? 420 : 1381;
export const BASE_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 8453 : CLUSTER === "testnet" ? 84531 : 1381;

export const getEvmChainId = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? ETH_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_BSC
    ? BSC_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_POLYGON
    ? POLYGON_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_AVAX
    ? AVAX_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_OASIS
    ? OASIS_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_AURORA
    ? AURORA_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_FANTOM
    ? FANTOM_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_KARURA
    ? KARURA_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_ACALA
    ? ACALA_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_KLAYTN
    ? KLAYTN_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_CELO
    ? CELO_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_NEON
    ? NEON_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_MOONBEAM
    ? MOONBEAM_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_ARBITRUM
    ? ARBITRUM_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_OPTIMISM
    ? OPTIMISM_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_BASE
    ? BASE_NETWORK_CHAIN_ID
    : undefined;
export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
  : CLUSTER === "mainnet"
  ? clusterApiUrl("mainnet-beta")
  : CLUSTER === "testnet"
  ? clusterApiUrl("devnet")
  : "http://localhost:8899";

export const getTerraConfig = (chainId: TerraChainId) => {
  const isClassic = false;
  return CLUSTER === "mainnet"
    ? {
        URL:
          chainId === CHAIN_ID_TERRA2
            ? "https://phoenix-lcd.terra.dev"
            : "https://terra-classic-lcd.publicnode.com",
        chainID: chainId === CHAIN_ID_TERRA2 ? "phoenix-1" : "columbus-5",
        name: "mainnet",
        isClassic,
      }
    : CLUSTER === "testnet"
    ? {
        URL:
          chainId === CHAIN_ID_TERRA2
            ? "https://pisco-lcd.terra.dev"
            : "https://bombay-lcd.terra.dev",
        chainID: chainId === CHAIN_ID_TERRA2 ? "pisco-1" : "bombay-12",
        name: "testnet",
        isClassic,
      }
    : {
        URL:
          chainId === CHAIN_ID_TERRA2
            ? "http://localhost:1318"
            : "http://localhost:1317",
        chainID: chainId === CHAIN_ID_TERRA2 ? "phoenix-1" : "columbus-5",
        name: "localterra",
        isClassic,
      };
};

export const XPLA_LCD_CLIENT_CONFIG =
  CLUSTER === "mainnet"
    ? { URL: "https://dimension-lcd.xpla.dev", chainID: "dimension_37-1" }
    : { URL: "https://cube-lcd.xpla.dev", chainID: "cube_47-5" };

export const XPLA_GAS_PRICES_URL =
  CLUSTER === "mainnet"
    ? "https://dimension-fcd.xpla.dev/v1/txs/gas_prices"
    : "https://cube-fcd.xpla.dev/v1/txs/gas_prices";

export const APTOS_URL =
  CLUSTER === "mainnet"
    ? "https://fullnode.mainnet.aptoslabs.com"
    : CLUSTER === "testnet"
    ? "https://testnet.aptoslabs.com"
    : "http://localhost:8080";

export const APTOS_INDEXER_URL =
  CLUSTER === "mainnet"
    ? "https://indexer.mainnet.aptoslabs.com/v1/graphql"
    : CLUSTER === "testnet"
    ? "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql"
    : "";

export const APTOS_NETWORK =
  CLUSTER === "mainnet"
    ? AptosNetwork.Mainnet
    : CLUSTER === "testnet"
    ? AptosNetwork.Testnet
    : AptosNetwork.Localhost;

export const APTOS_NATIVE_DECIMALS = 8;
export const APTOS_NATIVE_TOKEN_KEY = "0x1::aptos_coin::AptosCoin";

export const SEI_CHAIN_CONFIGURATION: ChainConfiguration =
  CLUSTER === "mainnet"
    ? {
        chainId: "pacific-1",
        restUrl: "https://sei-api.polkachu.com/",
        rpcUrl: "https://sei-rpc.polkachu.com/",
      }
    : {
        chainId: "atlantic-2",
        restUrl: "https://rest.atlantic-2.seinetwork.io/",
        rpcUrl: "https://rpc.atlantic-2.seinetwork.io/",
      };

export const SEI_TRANSLATOR =
  CLUSTER === "mainnet"
    ? "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l"
    : "sei1dkdwdvknx0qav5cp5kw68mkn3r99m3svkyjfvkztwh97dv2lm0ksj6xrak";
export const SEI_TRANSLATER_TARGET = cosmos.canonicalAddress(SEI_TRANSLATOR);
export const SEI_DECIMALS = 6;

export const getInjectiveNetworkName = () => {
  if (CLUSTER === "mainnet") {
    return Network.Mainnet;
  } else if (CLUSTER === "testnet") {
    return Network.TestnetK8s;
  }
  throw Error("Unsupported injective network");
};
export const getInjectiveNetwork = () => {
  if (CLUSTER === "mainnet") {
    return Network.Mainnet;
  } else if (CLUSTER === "testnet") {
    return Network.TestnetK8s;
  }
  throw Error("Unsupported injective network");
};

export const getInjectiveNetworkInfo = () => {
  if (CLUSTER === "mainnet") {
    return getNetworkInfo(Network.Mainnet);
  } else if (CLUSTER === "testnet") {
    return getNetworkInfo(Network.TestnetK8s);
  }
  throw Error("Unsupported injective network");
};

export const getInjectiveNetworkChainId = () => {
  if (CLUSTER === "mainnet") {
    return InjectiveChainId.Mainnet;
  } else if (CLUSTER === "testnet") {
    return InjectiveChainId.Testnet;
  }
  throw Error("Unsupported injective network");
};

export const SUI_CONNECTION =
  CLUSTER === "mainnet"
    ? new Connection({ fullnode: "https://fullnode.mainnet.sui.io:443" })
    : CLUSTER === "testnet"
    ? new Connection({ fullnode: "https://fullnode.testnet.sui.io:443" })
    : new Connection({ fullnode: "http://127.0.0.1:9000" });

export const SUI_NATIVE_DECIMALS = 9;
export const SUI_NATIVE_TOKEN_KEY = "0x2::sui::SUI";

export const ALGORAND_HOST =
  CLUSTER === "mainnet"
    ? {
        algodToken: "",
        algodServer: "https://mainnet-api.algonode.cloud",
        algodPort: "",
      }
    : CLUSTER === "testnet"
    ? {
        algodToken: "",
        algodServer: "https://testnet-api.algonode.cloud",
        algodPort: "",
      }
    : {
        algodToken:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        algodServer: "http://localhost",
        algodPort: "4001",
      };
export const ALGORAND_INDEXER =
  CLUSTER === "mainnet"
    ? {
        token: "",
        server: "https://mainnet-idx.algonode.cloud",
        port: "443",
      }
    : CLUSTER === "testnet"
    ? {
        token: "",
        server: "https://testnet-idx.algonode.cloud",
        port: "443",
      }
    : {
        token:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        server: "http://localhost",
        port: "8980",
      };
export const KARURA_HOST =
  CLUSTER === "mainnet"
    ? "https://eth-rpc-karura.aca-api.network/"
    : CLUSTER === "testnet"
    ? "https://karura-dev.aca-dev.network/eth/http"
    : "";
export const ACALA_HOST =
  CLUSTER === "mainnet"
    ? "https://eth-rpc-acala.aca-api.network/"
    : CLUSTER === "testnet"
    ? "https://acala-dev.aca-dev.network/eth/http"
    : "";
export const ETH_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B"
    : CLUSTER === "testnet"
    ? "0x706abc4E45D419950511e474C7B9Ed348A4a716c"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const ETH_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x6FFd7EdE62328b3Af38FCD61461Bbfc52F5651fE"
    : CLUSTER === "testnet"
    ? "0xD8E4C2DbDd2e2bd8F1336EA691dBFF6952B1a6eB"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const ETH_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x3ee18B2214AFF97000D974cf647E7C347E8fa585"
    : CLUSTER === "testnet"
    ? "0xF890982f9310df57d00f659cf4fd87e65adEd8d7"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const BSC_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B"
    : CLUSTER === "testnet"
    ? "0x68605AD7b15c732a30b1BbC62BE8F2A509D74b4D"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const BSC_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE"
    : CLUSTER === "testnet"
    ? "0xcD16E5613EF35599dc82B24Cb45B5A93D779f1EE"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const BSC_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xB6F6D86a8f9879A9c87f643768d9efc38c1Da6E7"
    : CLUSTER === "testnet"
    ? "0x9dcF9D205C9De35334D646BeE44b2D2859712A09"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const POLYGON_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x7A4B5a56256163F07b2C80A7cA55aBE66c4ec4d7"
    : CLUSTER === "testnet"
    ? "0x0CBE91CF822c73C2315FB05100C2F714765d5c20"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const POLYGON_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x90BBd86a6Fe93D3bc3ed6335935447E75fAb7fCf"
    : CLUSTER === "testnet"
    ? "0x51a02d0dcb5e52F5b92bdAA38FA013C91c7309A9"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const POLYGON_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE"
    : CLUSTER === "testnet"
    ? "0x377D55a7928c046E18eEbb61977e714d2a76472a"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const AVAX_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x54a8e5f9c4CbA08F9943965859F6c34eAF03E26c"
    : CLUSTER === "testnet"
    ? "0x7bbcE28e64B3F8b84d876Ab298393c38ad7aac4C"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const AVAX_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xf7B6737Ca9c4e08aE573F75A97B73D7a813f5De5"
    : CLUSTER === "testnet"
    ? "0xD601BAf2EEE3C028344471684F6b27E789D9075D"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const AVAX_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x0e082F06FF657D94310cB8cE8B0D9a04541d8052"
    : CLUSTER === "testnet"
    ? "0x61E44E506Ca5659E6c0bba9b678586fA2d729756"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const OASIS_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xfE8cD454b4A1CA468B57D79c0cc77Ef5B6f64585"
    : CLUSTER === "testnet"
    ? "0xc1C338397ffA53a2Eb12A7038b4eeb34791F8aCb"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const OASIS_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x04952D522Ff217f40B5Ef3cbF659EcA7b952a6c1"
    : CLUSTER === "testnet"
    ? "0xC5c25B41AB0b797571620F5204Afa116A44c0ebA"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const OASIS_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x5848C791e09901b40A9Ef749f2a6735b418d7564"
    : CLUSTER === "testnet"
    ? "0x88d8004A9BdbfD9D28090A02010C19897a29605c"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const AURORA_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xa321448d90d4e5b0A732867c18eA198e75CAC48E"
    : CLUSTER === "testnet"
    ? "0xBd07292de7b505a4E803CEe286184f7Acf908F5e"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const AURORA_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x6dcC0484472523ed9Cdc017F711Bcbf909789284"
    : CLUSTER === "testnet"
    ? "0x8F399607E9BA2405D87F5f3e1B78D950b44b2e24"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const AURORA_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x51b5123a7b0F9b2bA265f9c4C8de7D78D52f510F"
    : CLUSTER === "testnet"
    ? "0xD05eD3ad637b890D68a854d607eEAF11aF456fba"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const FANTOM_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x126783A6Cb203a3E35344528B26ca3a0489a1485"
    : CLUSTER === "testnet"
    ? "0x1BB3B4119b7BA9dfad76B0545fb3F531383c3bB7"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const FANTOM_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xA9c7119aBDa80d4a4E0C06C8F4d8cF5893234535"
    : CLUSTER === "testnet"
    ? "0x63eD9318628D26BdCB15df58B53BB27231D1B227"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const FANTOM_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x7C9Fc5741288cDFdD83CeB07f3ea7e22618D79D2"
    : CLUSTER === "testnet"
    ? "0x599CEa2204B4FaECd584Ab1F2b6aCA137a0afbE8"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const KARURA_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xa321448d90d4e5b0A732867c18eA198e75CAC48E"
    : CLUSTER === "testnet"
    ? "0xE4eacc10990ba3308DdCC72d985f2a27D20c7d03"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const KARURA_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xb91e3638F82A1fACb28690b37e3aAE45d2c33808"
    : CLUSTER === "testnet"
    ? "0x0A693c2D594292B6Eb89Cb50EFe4B0b63Dd2760D"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const KARURA_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xae9d7fe007b3327AA64A32824Aaac52C42a6E624"
    : CLUSTER === "testnet"
    ? "0xd11De1f930eA1F7Dd0290Fe3a2e35b9C91AEFb37"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const ACALA_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.acala.core
    : CLUSTER === "testnet"
    ? "0x4377B49d559c0a9466477195C6AdC3D433e265c0"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const ACALA_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.acala.nft_bridge
    : CLUSTER === "testnet"
    ? "0x96f1335e0AcAB3cfd9899B30b2374e25a2148a6E"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const ACALA_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.acala.token_bridge
    : CLUSTER === "testnet"
    ? "0xebA00cbe08992EdD08ed7793E07ad6063c807004"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const KLAYTN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x0C21603c4f3a6387e241c0091A7EA39E43E90bb7"
    : CLUSTER === "testnet"
    ? "0x1830CC6eE66c84D2F177B94D544967c774E624cA"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const KLAYTN_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x3c3c561757BAa0b78c5C025CdEAa4ee24C1dFfEf"
    : CLUSTER === "testnet"
    ? "0x94c994fC51c13101062958b567e743f1a04432dE"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const KLAYTN_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x5b08ac39EAED75c0439FC750d9FE7E1F9dD0193F"
    : CLUSTER === "testnet"
    ? "0xC7A13BE098720840dEa132D860fDfa030884b09A"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const CELO_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xa321448d90d4e5b0A732867c18eA198e75CAC48E"
    : CLUSTER === "testnet"
    ? "0x88505117CA88e7dd2eC6EA1E13f0948db2D50D56"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const CELO_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xA6A377d75ca5c9052c9a77ED1e865Cc25Bd97bf3"
    : CLUSTER === "testnet"
    ? "0xaCD8190F647a31E56A656748bC30F69259f245Db"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const CELO_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x796Dff6D74F3E27060B71255Fe517BFb23C93eed"
    : CLUSTER === "testnet"
    ? "0x05ca6037eC51F8b712eD2E6Fa72219FEaE74E153"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const NEON_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x0000000000000000000000000000000000000000"
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.neon.core
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const NEON_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x0000000000000000000000000000000000000000"
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.neon.nft_bridge
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const NEON_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x0000000000000000000000000000000000000000"
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.neon.token_bridge
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const MOONBEAM_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.moonbeam.core
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.moonbeam.core
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const MOONBEAM_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x453cfBe096C0f8D763E8C5F24B441097d577bdE2"
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.moonbeam.nft_bridge
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const MOONBEAM_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0xB1731c586ca89a23809861c6103F0b96B3F57D92"
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.moonbeam.token_bridge
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);
export const SOL_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? "worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth"
    : CLUSTER === "testnet"
    ? "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5"
    : "Bridge1p5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o";
export const SOL_NFT_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? "WnFt12ZrnzZrFZkt2xsNsaNWoQribnuQ5B5FrDbwDhD"
    : CLUSTER === "testnet"
    ? "2rHhojZ7hpu1zA91nvZmT8TqWWvMcKmmNBCr2mKTtMq4"
    : "NFTWqJR8YnRVqPDvTJrYuLrQDitTG5AScqbeghi4zSA";
export const SOL_TOKEN_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? "wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb"
    : CLUSTER === "testnet"
    ? "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe"
    : "B6RHG3mfcckmrYN1UhmJzyS1XX3fZKbkeUcpJe9Sy3FE";
export const ROPSTEN_ETH_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B"
    : CLUSTER === "testnet"
    ? "0x210c5F5e2AF958B4defFe715Dc621b7a3BA888c5"
    : "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550"
);
export const ROPSTEN_ETH_NFT_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x6FFd7EdE62328b3Af38FCD61461Bbfc52F5651fE"
    : CLUSTER === "testnet"
    ? "0x2b048Da40f69c8dc386a56705915f8E966fe1eba"
    : "0x26b4afb60d6c903165150c6f0aa14f8016be4aec"
);
export const ROPSTEN_ETH_TOKEN_BRIDGE_ADDRESS = getAddress(
  CLUSTER === "mainnet"
    ? "0x3ee18B2214AFF97000D974cf647E7C347E8fa585"
    : CLUSTER === "testnet"
    ? "0xF174F9A837536C449321df1Ca093Bb96948D5386"
    : "0x0290FB167208Af455bB137780163b7B7a9a10C16"
);

export const SOL_CUSTODY_ADDRESS =
  "GugU1tP7doLeTw9hQP51xRJyS8Da1fWxuiy2rVrnMD2m";
export const SOL_NFT_CUSTODY_ADDRESS =
  "D63bhHo634eXSj4Jq3xgu2fjB5XKc8DFHzDY9iZk7fv1";
export const TERRA_TEST_TOKEN_ADDRESS =
  "terra13nkgqrfymug724h8pprpexqj9h629sa3ncw7sh";
export const TERRA_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? "terra1dq03ugtd40zu9hcgdzrsq6z2z4hwhc9tqk2uy5"
    : CLUSTER === "testnet"
    ? "terra1pd65m0q9tl3v8znnz5f5ltsfegyzah7g42cx5v"
    : "terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5";
export const TERRA_TOKEN_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? "terra10nmmwe8r3g99a9newtqa7a75xfgs2e8z87r2sf"
    : CLUSTER === "testnet"
    ? "terra1pseddrv0yfsn76u4zxrjmtf45kdlmalswdv39a"
    : "terra10pyejy66429refv3g35g2t7am0was7ya7kz2a4";
export const TERRA2_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.terra2.core
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.terra2.core
    : "terra14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9ssrc8au";
export const TERRA2_TOKEN_BRIDGE_ADDRESS =
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.terra2.token_bridge
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.terra2.token_bridge
    : "terra1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrquka9l6";
export const ALGORAND_BRIDGE_ID = BigInt(
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.algorand.core
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.algorand.core
    : CONTRACTS.DEVNET.algorand.core
);
export const ALGORAND_TOKEN_BRIDGE_ID = BigInt(
  CLUSTER === "mainnet"
    ? CONTRACTS.MAINNET.algorand.token_bridge
    : CLUSTER === "testnet"
    ? CONTRACTS.TESTNET.algorand.token_bridge
    : CONTRACTS.DEVNET.algorand.token_bridge
);
export const ALGORAND_WAIT_FOR_CONFIRMATIONS =
  CLUSTER === "mainnet" ? 4 : CLUSTER === "testnet" ? 4 : 1;

export const NEAR_CORE_BRIDGE_ACCOUNT =
  CLUSTER === "mainnet"
    ? "contract.wormhole_crypto.near"
    : CLUSTER === "testnet"
    ? "wormhole.wormhole.testnet"
    : "wormhole.test.near";

export const NEAR_TOKEN_BRIDGE_ACCOUNT =
  CLUSTER === "mainnet"
    ? "contract.portalbridge.near"
    : CLUSTER === "testnet"
    ? "token.wormhole.testnet"
    : "token.test.near";

export const getBridgeAddressForChain = (chainId: ChainId) =>
  CLUSTER === "mainnet" && chainId === CHAIN_ID_SUI
    ? "0xaeab97f96cf9877fee2883315d459552b2b921edc16d7ceac6eab944dd88919c"
    : CONTRACTS[
        CLUSTER === "mainnet"
          ? "MAINNET"
          : CLUSTER === "testnet"
          ? "TESTNET"
          : "DEVNET"
      ][coalesceChainName(chainId)].core || "";
export const getNFTBridgeAddressForChain = (chainId: ChainId) =>
  CONTRACTS[
    CLUSTER === "mainnet"
      ? "MAINNET"
      : CLUSTER === "testnet"
      ? "TESTNET"
      : "DEVNET"
  ][coalesceChainName(chainId)].nft_bridge || "";
export const getTokenBridgeAddressForChain = (chainId: ChainId) =>
  CLUSTER === "mainnet" && chainId === CHAIN_ID_SUI
    ? "0xc57508ee0d4595e5a8728974a4a93a787d38f339757230d441e895422c07aba9"
    : CONTRACTS[
        CLUSTER === "mainnet"
          ? "MAINNET"
          : CLUSTER === "testnet"
          ? "TESTNET"
          : "DEVNET"
      ][coalesceChainName(chainId)].token_bridge || "";

export const COVALENT_API_KEY = process.env.REACT_APP_COVALENT_API_KEY
  ? process.env.REACT_APP_COVALENT_API_KEY
  : "";

export const COVALENT_ETHEREUM = 1; // Covalent only supports mainnet and Kovan
export const COVALENT_BSC = CLUSTER === "devnet" ? 56 : BSC_NETWORK_CHAIN_ID;
export const COVALENT_POLYGON =
  CLUSTER === "devnet" ? 137 : POLYGON_NETWORK_CHAIN_ID;
export const COVALENT_AVAX = CLUSTER === "devnet" ? 137 : AVAX_NETWORK_CHAIN_ID;
export const COVALENT_FANTOM =
  CLUSTER === "devnet" ? 250 : FANTOM_NETWORK_CHAIN_ID;
export const COVALENT_KLAYTN =
  CLUSTER === "mainnet" ? KLAYTN_NETWORK_CHAIN_ID : null; // Covalent only support mainnet
export const COVALENT_CELO = CLUSTER === "devnet" ? null : null;
export const COVALENT_NEON = CLUSTER === "devnet" ? null : null;
export const COVALENT_MOONBEAM =
  CLUSTER === "devnet" ? null : MOONBEAM_NETWORK_CHAIN_ID; // Covalent only supports mainnet
export const COVALENT_ARBITRUM =
  CLUSTER === "devnet" ? null : ARBITRUM_NETWORK_CHAIN_ID; // Covalent only supports mainnet
export const COVALENT_OPTIMISM =
  CLUSTER === "devnet" ? null : OPTIMISM_NETWORK_CHAIN_ID; // Covalent only supports mainnet

export const COVALENT_BASE =
  CLUSTER === "devnet" ? null : BASE_NETWORK_CHAIN_ID;

export type ChainIdMap = {
  [key in ChainId]?: number | string | null;
};

export const COVALENT_CHAIN_MAINNET: ChainIdMap = {
  [CHAIN_ID_ETH]: 1,
  [CHAIN_ID_BSC]: BSC_NETWORK_CHAIN_ID,
  [CHAIN_ID_POLYGON]: POLYGON_NETWORK_CHAIN_ID,
  [CHAIN_ID_AVAX]: AVAX_NETWORK_CHAIN_ID,
  [CHAIN_ID_KLAYTN]: null, // suspended network
  [CHAIN_ID_FANTOM]: FANTOM_NETWORK_CHAIN_ID,
  [CHAIN_ID_CELO]: null,
  [CHAIN_ID_NEON]: null,
  [CHAIN_ID_MOONBEAM]: COVALENT_MOONBEAM,
  [CHAIN_ID_BASE]: COVALENT_BASE,
  [CHAIN_ID_ARBITRUM]: COVALENT_ARBITRUM,
  [CHAIN_ID_OPTIMISM]: COVALENT_OPTIMISM,
} as const;

export const COVALENT_CHAIN_TESTNET: ChainIdMap = {
  [CHAIN_ID_ETH]: 5,
  [CHAIN_ID_BSC]: BSC_NETWORK_CHAIN_ID,
  [CHAIN_ID_POLYGON]: POLYGON_NETWORK_CHAIN_ID,
  [CHAIN_ID_AVAX]: AVAX_NETWORK_CHAIN_ID,
  [CHAIN_ID_KLAYTN]: null,
  [CHAIN_ID_FANTOM]: FANTOM_NETWORK_CHAIN_ID,
  [CHAIN_ID_CELO]: null,
  [CHAIN_ID_NEON]: null,
  [CHAIN_ID_MOONBEAM]: COVALENT_MOONBEAM,
  [CHAIN_ID_BASE]: COVALENT_BASE,
  [CHAIN_ID_ARBITRUM]: COVALENT_ARBITRUM,
  [CHAIN_ID_OPTIMISM]: COVALENT_OPTIMISM,
} as const;

export const COVALENT_CHAIN_DEVNET: ChainIdMap = {
  [CHAIN_ID_ETH]: 1,
  [CHAIN_ID_BSC]: 56,
  [CHAIN_ID_POLYGON]: 137,
  [CHAIN_ID_AVAX]: 137,
  [CHAIN_ID_KLAYTN]: null,
  [CHAIN_ID_FANTOM]: 250,
  [CHAIN_ID_CELO]: null,
  [CHAIN_ID_NEON]: null,
  [CHAIN_ID_MOONBEAM]: null,
  [CHAIN_ID_BASE]: null,
  [CHAIN_ID_ARBITRUM]: null,
  [CHAIN_ID_OPTIMISM]: null,
} as const;

export const COVALENT_GET_TOKENS_URL = (
  chainId: ChainId,
  walletAddress: string,
  nft?: boolean,
  noNftMetadata?: boolean
) => {
  let chainNum;
  if (CLUSTER === "mainnet") {
    chainNum = COVALENT_CHAIN_MAINNET[chainId];
  } else if (CLUSTER === "testnet") {
    chainNum = COVALENT_CHAIN_TESTNET[chainId];
  } else {
    chainNum = COVALENT_CHAIN_DEVNET[chainId];
  }
  // https://www.covalenthq.com/docs/api/#get-/v1/{chain_id}/address/{address}/balances_v2/
  return chainNum
    ? `https://api.covalenthq.com/v1/${chainNum}/address/${walletAddress}/balances_v2/?key=${COVALENT_API_KEY}${
        nft ? "&nft=true" : ""
      }${noNftMetadata ? "&no-nft-fetch=true" : ""}`
    : "";
};

export const BLOCKSCOUT_GET_TOKENS_URL = (
  chainId: ChainId,
  walletAddress: string
) => {
  const baseUrl =
    chainId === CHAIN_ID_OASIS
      ? CLUSTER === "mainnet"
        ? "https://explorer.emerald.oasis.dev"
        : CLUSTER === "testnet"
        ? "https://testnet.explorer.emerald.oasis.dev"
        : ""
      : chainId === CHAIN_ID_AURORA
      ? CLUSTER === "mainnet"
        ? "https://explorer.mainnet.aurora.dev"
        : CLUSTER === "testnet"
        ? "https://explorer.testnet.aurora.dev"
        : ""
      : chainId === CHAIN_ID_ACALA
      ? CLUSTER === "mainnet"
        ? "https://blockscout.acala.network"
        : CLUSTER === "testnet"
        ? "https://blockscout.acala-dev.aca-dev.network"
        : ""
      : chainId === CHAIN_ID_KARURA
      ? CLUSTER === "mainnet"
        ? "https://blockscout.karura.network"
        : CLUSTER === "testnet"
        ? "https://blockscout.karura-dev.aca-dev.network"
        : ""
      : chainId === CHAIN_ID_CELO
      ? CLUSTER === "mainnet"
        ? "https://explorer.celo.org"
        : CLUSTER === "testnet"
        ? "https://alfajores-blockscout.celo-testnet.org"
        : ""
      : "";
  return baseUrl
    ? `${baseUrl}/api?module=account&action=tokenlist&address=${walletAddress}`
    : "";
};

export const TVL_URL =
  "https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltvl";
export const TVL_CUMULATIVE_URL =
  "https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltvlcumulative?totalsOnly=true";
export const TERRA_SWAPRATE_URL =
  "https://fcd.terra.dev/v1/market/swaprate/uusd";

export const WETH_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    : CLUSTER === "testnet"
    ? "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WETH_DECIMALS = 18;

export const BASE_WETH_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x4200000000000000000000000000000000000006"
    : CLUSTER === "testnet"
    ? "0x4200000000000000000000000000000000000006"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const BASE_WETH_DECIMALS = 18;

export const WBNB_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    : CLUSTER === "testnet"
    ? "0xae13d989dac2f0debff460ac112a837c89baa7cd"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WBNB_DECIMALS = 18;

export const WMATIC_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
    : CLUSTER === "testnet"
    ? "0x9c3c9283d3e44854697cd22d3faa240cfb032889"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WMATIC_DECIMALS = 18;

export const ROPSTEN_WETH_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    : CLUSTER === "testnet"
    ? "0xc778417e063141139fce010982780140aa0cd5ab"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const ROPSTEN_WETH_DECIMALS = 18;

export const WAVAX_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
    : CLUSTER === "testnet"
    ? "0xd00ae08403b9bbb9124bb305c09058e32c39a48c"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WAVAX_DECIMALS = 18;

export const WROSE_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x21C718C22D52d0F3a789b752D4c2fD5908a8A733"
    : CLUSTER === "testnet"
    ? "0x792296e2a15e6Ceb5f5039DecaE7A1f25b00B0B0"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WROSE_DECIMALS = 18;

export const WETH_AURORA_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB"
    : CLUSTER === "testnet"
    ? "0x9D29f395524B3C817ed86e2987A14c1897aFF849"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WETH_AURORA_DECIMALS = 18;

export const WFTM_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
    : CLUSTER === "testnet"
    ? "0xf1277d1Ed8AD466beddF92ef448A132661956621"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WFTM_DECIMALS = 18;

export const KAR_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x0000000000000000000100000000000000000080"
    : CLUSTER === "testnet"
    ? "0x0000000000000000000100000000000000000080"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const KAR_DECIMALS = 12;

export const ACA_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x0000000000000000000100000000000000000000"
    : CLUSTER === "testnet"
    ? "0x0000000000000000000100000000000000000000"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const ACA_DECIMALS = 12;

export const WKLAY_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xe4f05a66ec68b54a58b17c22107b02e0232cc817"
    : CLUSTER === "testnet"
    ? "0x762ac6e8183db5a8e912a66fcc1a09f5a7ac96a9"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WKLAY_DECIMALS = 18;

export const CELO_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x471ece3750da237f93b8e339c536989b8978a438"
    : CLUSTER === "testnet"
    ? "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const CELO_DECIMALS = 18;

export const WNEON_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xf8ad328e98f85fccbf09e43b16dcbbda7e84beab"
    : CLUSTER === "testnet"
    ? "0xf8aD328E98f85fccbf09E43B16dcbbda7E84BEAB"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WNEON_DECIMALS = 18;

export const WGLMR_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xAcc15dC74880C9944775448304B263D191c6077F"
    : CLUSTER === "testnet"
    ? "0xD909178CC99d318e4D46e7E66a972955859670E1"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const WGLMR_DECIMALS = 18;

export const ARBWETH_ADDRESS =
  CLUSTER === "mainnet"
    ? "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
    : CLUSTER === "testnet"
    ? "0x0000000000000000000000000000000000000000"
    : "0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E";
export const ARBWETH_DECIMALS = 18;

export const ALGO_DECIMALS = 6;

export const WORMHOLE_V1_ETH_ADDRESS =
  CLUSTER === "mainnet"
    ? "0xf92cD566Ea4864356C5491c177A430C222d7e678"
    : CLUSTER === "testnet"
    ? "0xdae0Cba01eFc4bfEc1F7Fece73Fe8b8d2Eda65B0"
    : "0xf92cD566Ea4864356C5491c177A430C222d7e678"; //TODO something that doesn't explode in localhost
export const WORMHOLE_V1_SOLANA_ADDRESS =
  CLUSTER === "mainnet"
    ? "WormT3McKhFJ2RkiGpdw9GKvNCrB2aB54gb2uV9MfQC"
    : CLUSTER === "testnet"
    ? "BrdgiFmZN3BKkcY3danbPYyxPKwb8RhQzpM2VY5L97ED"
    : "";

export const TERRA_TOKEN_METADATA_URL =
  "https://assets.terra.money/cw20/tokens.json";

export const WORMHOLE_V1_MINT_AUTHORITY =
  CLUSTER === "mainnet"
    ? "9zyPU1mjgzaVyQsYwKJJ7AhVz5bgx5uc1NPABvAcUXsT"
    : CLUSTER === "testnet"
    ? "BJa7dq3bRP216zaTdw4cdcV71WkPc1HXvmnGeFVDi5DC"
    : "";

export const SOLLET_MINT_AUTHORITY =
  CLUSTER === "mainnet" ? "6krMGWgeqD4CySfMr94WcfcVbf2TrMzfshAk5DcZ7mbu" : "";

// hardcoded addresses for warnings
export const SOLANA_TOKENS_THAT_EXIST_ELSEWHERE = [
  "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt", //  SRM
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6", //  KIN
  "CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5", // renBTC
  "8wv2KAykQstNAj2oW6AHANGBiFKVFhvMiyyzzjhkmGvE", // renLUNA
  "G1a6jxYz3m8DVyMqYnuV7s86wD4fvuXYneWSpLJkmsXj", // renBCH
  "FKJvvVJ242tX7zFtzTmzqoA631LqHh4CdgcN8dcfFSju", // renDGB
  "ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU", // renDOGE
  "E99CQ2gFMmbiyK2bwiaFNWUUmwz4r8k2CVEFxwuvQ7ue", // renZEC
  "De2bU64vsXKU9jq4bCjeDxNRGPn8nr3euaTK8jBYmD3J", // renFIL
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
];
export const ETH_TOKENS_THAT_EXIST_ELSEWHERE = [
  getAddress("0x476c5E26a75bd202a9683ffD34359C0CC15be0fF"), // SRM
  getAddress("0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5"), // KIN
  getAddress("0xeb4c2781e4eba804ce9a9803c67d0893436bb27d"), // renBTC
  getAddress("0x52d87F22192131636F93c5AB18d0127Ea52CB641"), // renLUNA
  getAddress("0x459086f2376525bdceba5bdda135e4e9d3fef5bf"), // renBCH
  getAddress("0xe3cb486f3f5c639e98ccbaf57d95369375687f80"), // renDGB
  getAddress("0x3832d2F059E55934220881F831bE501D180671A7"), // renDOGE
  getAddress("0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2"), // renZEC
  getAddress("0xD5147bc8e386d91Cc5DBE72099DAC6C9b99276F5"), // renFIL
];
export const ETH_TOKENS_THAT_CAN_BE_SWAPPED_ON_SOLANA = [
  getAddress("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"), // USDC
  getAddress("0xdac17f958d2ee523a2206206994597c13d831ec7"), // USDT
];
export const BSC_MARKET_WARNINGS = [
  getAddress(WBNB_ADDRESS),
  getAddress("0xe9e7cea3dedca5984780bafc599bd69add087d56"), // BUSD
  getAddress("0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"), // USDC
  getAddress("0x55d398326f99059ff775485246999027b3197955"), // BSC-USD
];

export const MIGRATION_PROGRAM_ADDRESS =
  CLUSTER === "mainnet"
    ? "whmRZnmyxdr2TkHXcZoFdtvNYRLQ5Jtbkf6ZbGkJjdk"
    : CLUSTER === "testnet"
    ? ""
    : "Ex9bCdVMSfx7EzB3pgSi2R4UHwJAXvTw18rBQm5YQ8gK";

export const ETH_MIGRATION_ASSET_MAP = new Map<string, string>(
  CLUSTER === "mainnet"
    ? [
        [
          // LUNA
          getAddress("0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9"),
          getAddress("0xe76820F1DB773B1d62a3D22F47259705cC5fA4E6"),
        ],
        [
          // UST
          getAddress("0xa47c8bf37f92aBed4A126BDA807A7b7498661acD"),
          getAddress("0xF39C29d8f6851d87c40c83b61078EB7384f7Cb51"),
        ],
        [
          // CELO
          getAddress("0xE452E6Ea2dDeB012e20dB73bf5d3863A3Ac8d77a"),
          getAddress("0x857acfba0b2c4f4044b1d3a80972db1b3dceb1c4"),
        ],
      ]
    : CLUSTER === "testnet"
    ? []
    : [
        // [
        //   "0x2D8BE6BF0baA74e0A907016679CaE9190e80dD0A",
        //   "0xFcCeD5E997E7fb1D0594518D3eD57245bB8ed17E",
        // ],
      ]
);

export const BSC_MIGRATION_ASSET_MAP = new Map<string, string>(
  CLUSTER === "mainnet"
    ? [
        [
          // LUNA
          getAddress("0xECCF35F941Ab67FfcAA9A1265C2fF88865caA005"),
          getAddress("0x355A116ef1Cf566B12Ef3a8e409A64e303c53740"),
        ],
        [
          // UST
          getAddress("0x23396cF899Ca06c4472205fC903bDB4de249D6fC"),
          getAddress("0x0F98AB919D04a291838B3b075c57181057D4CF75"),
        ],
        [
          // ORION
          getAddress("0x5530ec23f4ee1521182bd158c09f4ca7efec1ef0"),
          getAddress("0x084fa354e65b521e6fb9d1602549cf8693cdb4f8"),
        ],
      ]
    : CLUSTER === "testnet"
    ? []
    : [
        // [
        //   "0x2D8BE6BF0baA74e0A907016679CaE9190e80dD0A",
        //   "0xFcCeD5E997E7fb1D0594518D3eD57245bB8ed17E",
        // ],
      ]
);

export const CELO_MIGRATION_ASSET_MAP = new Map<string, string>(
  CLUSTER === "mainnet"
    ? [
        [
          getAddress("0x122013fd7dF1C6F636a5bb8f03108E876548b455"), // WETH,
          getAddress("0xCC76FfF95d772C798eaDc6c7E6fA7E0e8b561F64"),
        ],
      ]
    : []
);

export const getMigrationAssetMap = (chainId: ChainId) => {
  if (chainId === CHAIN_ID_BSC) {
    return BSC_MIGRATION_ASSET_MAP;
  } else if (chainId === CHAIN_ID_ETH) {
    return ETH_MIGRATION_ASSET_MAP;
  } else if (chainId === CHAIN_ID_CELO) {
    return CELO_MIGRATION_ASSET_MAP;
  } else {
    return new Map<string, string>();
  }
};

export const SUPPORTED_TERRA_TOKENS = ["uluna", "uusd"];
export const TERRA_DEFAULT_FEE_DENOM = SUPPORTED_TERRA_TOKENS[0];

export const XPLA_NATIVE_DENOM = "axpla";
export const SEI_NATIVE_DENOM = "usei";

export const getTerraFCDBaseUrl = (chainId: TerraChainId) =>
  CLUSTER === "mainnet"
    ? chainId === CHAIN_ID_TERRA2
      ? "https://phoenix-fcd.terra.dev"
      : "https://columbus-fcd.terra.dev"
    : CLUSTER === "testnet"
    ? chainId === CHAIN_ID_TERRA2
      ? "https://pisco-fcd.terra.dev"
      : "https://bombay-fcd.terra.dev"
    : chainId === CHAIN_ID_TERRA2
    ? "http://localhost:3061"
    : "http://localhost:3060";
export const getTerraGasPricesUrl = (chainId: TerraChainId) =>
  `${getTerraFCDBaseUrl(chainId)}/v1/txs/gas_prices`;

export const nearKeyStore = new keyStores.BrowserLocalStorageKeyStore();

export const getNearConnectionConfig = (): ConnectConfig =>
  CLUSTER === "mainnet"
    ? {
        networkId: "mainnet",
        keyStore: nearKeyStore,
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        headers: {},
      }
    : CLUSTER === "testnet"
    ? {
        networkId: "testnet",
        keyStore: nearKeyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        headers: {},
      }
    : {
        networkId: "sandbox",
        keyStore: nearKeyStore,
        nodeUrl: "http://localhost:3030",
        helperUrl: "",
        headers: {},
      };

export const NATIVE_NEAR_DECIMALS = 24;
export const NATIVE_NEAR_PLACEHOLDER = "near";
export const NATIVE_NEAR_WH_ADDRESS =
  "0000000000000000000000000000000000000000000000000000000000000000";

export const TOTAL_TRANSACTIONS_WORMHOLE = `https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-totals?groupBy=address`;

export const RECENT_TRANSACTIONS_WORMHOLE = `https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-recent?groupBy=address&numRows=2`;

export const NOTIONAL_TRANSFERRED_URL =
  "https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltransferredfrom";

export const VAA_EMITTER_ADDRESSES = [
  `${CHAIN_ID_SOLANA}:ec7372995d5cc8732397fb0ad35c0121e0eaa90d26f828a534cab54391b3a4f5`, //SOLANA TOKEN
  `${CHAIN_ID_SOLANA}:0def15a24423e1edd1a5ab16f557b9060303ddbab8c803d2ee48f4b78a1cfd6b`, //SOLAN NFT
  `${CHAIN_ID_ETH}:0000000000000000000000003ee18b2214aff97000d974cf647e7c347e8fa585`, //ETH token
  `${CHAIN_ID_ETH}:0000000000000000000000006ffd7ede62328b3af38fcd61461bbfc52f5651fe`, //ETH NFT
  `${CHAIN_ID_TERRA}:0000000000000000000000007cf7b764e38a0a5e967972c1df77d432510564e2`, //terra
  `${CHAIN_ID_BSC}:000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7`, //bsc
  `${CHAIN_ID_BSC}:0000000000000000000000005a58505a96d1dbf8df91cb21b54419fc36e93fde`, //bsc nft
  `${CHAIN_ID_POLYGON}:0000000000000000000000005a58505a96d1dbf8df91cb21b54419fc36e93fde`, //Polygon
  `${CHAIN_ID_POLYGON}:00000000000000000000000090bbd86a6fe93d3bc3ed6335935447e75fab7fcf`, //Polygon nft
  `${CHAIN_ID_AVAX}:0000000000000000000000000e082f06ff657d94310cb8ce8b0d9a04541d8052`, //AVAX
  `${CHAIN_ID_AVAX}:000000000000000000000000f7b6737ca9c4e08ae573f75a97b73d7a813f5de5`, //AVAX nft
  `${CHAIN_ID_OASIS}:0000000000000000000000005848c791e09901b40a9ef749f2a6735b418d7564`, //Oasis
  `${CHAIN_ID_OASIS}:00000000000000000000000004952D522Ff217f40B5Ef3cbF659EcA7b952a6c1`, //Oasis nft
  `${CHAIN_ID_AURORA}:00000000000000000000000051b5123a7b0F9b2bA265f9c4C8de7D78D52f510F`, //Aurora
  `${CHAIN_ID_AURORA}:0000000000000000000000006dcC0484472523ed9Cdc017F711Bcbf909789284`, //Aurora nft
  `${CHAIN_ID_FANTOM}:0000000000000000000000007C9Fc5741288cDFdD83CeB07f3ea7e22618D79D2`, //Fantom
  `${CHAIN_ID_FANTOM}:000000000000000000000000A9c7119aBDa80d4a4E0C06C8F4d8cF5893234535`, //Fantom nft
  `${CHAIN_ID_KARURA}:000000000000000000000000ae9d7fe007b3327AA64A32824Aaac52C42a6E624`, //Karura
  `${CHAIN_ID_KARURA}:000000000000000000000000b91e3638F82A1fACb28690b37e3aAE45d2c33808`, //Karura nft
];

export const WORMHOLE_EXPLORER_BASE = "https://wormhole.com/explorer";

export type MultiChainInfo = {
  [key in ChainId]?: { [address: string]: string };
};
export const MULTI_CHAIN_TOKENS: MultiChainInfo =
  //EVM chains should format the addresses to all lowercase
  CLUSTER === "mainnet"
    ? ({
        [CHAIN_ID_SOLANA]: {
          EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
          Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT",
        },
        [CHAIN_ID_ETH]: {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC",
          "0xdac17f958d2ee523a2206206994597c13d831ec7": "USDT",
        },
        [CHAIN_ID_TERRA]: {},
        [CHAIN_ID_BSC]: {
          "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d": "USDC",
          "0x55d398326f99059ff775485246999027b3197955": "USDT",
        },
        [CHAIN_ID_POLYGON]: {
          "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": "USDC",
          "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": "USDT",
        },
      } as MultiChainInfo)
    : ({
        [CHAIN_ID_SOLANA]: {
          "2WDq7wSs9zYrpx2kbHDA4RUTRch2CCTP6ZWaH4GNfnQQ": "SOLT",
        },
        [CHAIN_ID_ETH]: {},
        [CHAIN_ID_TERRA]: {},
        [CHAIN_ID_BSC]: {},
        [CHAIN_ID_POLYGON]: {},
      } as MultiChainInfo);

export const AVAILABLE_MARKETS_URL = "docs/faqs/liquid-markets";

export const SOLANA_SYSTEM_PROGRAM_ADDRESS = "11111111111111111111111111111111";
export const FEATURED_MARKETS_JSON_URL =
  "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/src/markets.json";

export const logoOverrides = new Map<string, string>([
  [
    "0x727f064a78dc734d33eec18d5370aef32ffd46e4",
    "https://orion.money/assets/ORION-LOGO-2.1-GREEN@256x256.png",
  ],
]);

export const getHowToAddTokensToWalletUrl = (chainId: ChainId) => {
  if (isEVMChain(chainId)) {
    return "docs/video-tutorials/how-to-manually-add-tokens-to-your-wallet#metamask";
  } else if (isTerraChain(chainId)) {
    return "docs/video-tutorials/how-to-manually-add-tokens-to-your-wallet#terra-station";
  }
  return "";
};

export const getHowToAddToTokenListUrl = (chainId: ChainId) => {
  if (chainId === CHAIN_ID_SOLANA) {
    return "https://github.com/solana-labs/token-list";
  } else if (isTerraChain(chainId)) {
    return "https://github.com/terra-money/assets";
  }
  return "";
};

export const SOLANA_TOKEN_METADATA_PROGRAM_URL =
  "https://github.com/metaplex-foundation/metaplex-program-library/tree/master/token-metadata/program";
export const MAX_VAA_UPLOAD_RETRIES_SOLANA = 5;

export const POLYGON_TERRA_WRAPPED_TOKENS = [
  "0x692597b009d13c4049a947cab2239b7d6517875f", // Wrapped UST Token
  "0x24834bbec7e39ef42f4a75eaf8e5b6486d3f0e57", // Wrapped LUNA Token
];

export const ETH_POLYGON_WRAPPED_TOKENS = [
  "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", // Wrapped MATIC Token
];

export const JUPITER_SWAP_BASE_URL = "https://jup.ag/swap";

export const LUNA_ADDRESS = "uluna";
export const UST_ADDRESS = "uusd";

export type RelayerCompareAsset = {
  [key in ChainId]: string;
};
export const RELAYER_COMPARE_ASSET: RelayerCompareAsset = {
  [CHAIN_ID_SOLANA]: "solana",
  [CHAIN_ID_ETH]: "ethereum",
  [CHAIN_ID_TERRA]: "terra-luna",
  [CHAIN_ID_BSC]: "binancecoin",
  [CHAIN_ID_POLYGON]: "matic-network",
  [CHAIN_ID_AVAX]: "avalanche-2",
  [CHAIN_ID_OASIS]: "oasis-network",
  [CHAIN_ID_FANTOM]: "fantom",
  [CHAIN_ID_AURORA]: "ethereum", // Aurora uses bridged ether
  [CHAIN_ID_KLAYTN]: "klay-token",
  [CHAIN_ID_CELO]: "celo",
} as RelayerCompareAsset;
export const getCoinGeckoURL = (coinGeckoId: string) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`;

export const RELAYER_INFO_URL =
  CLUSTER === "mainnet"
    ? "empty-relayer-config.json"
    : CLUSTER === "testnet"
    ? "empty-relayer-config.json"
    : "/local-relayer-config.json";

export const RELAY_URL_EXTENSION = "/relayvaa/";

// also for karura
export const ACALA_RELAYER_URL =
  CLUSTER === "mainnet"
    ? "https://relayer.aca-api.network"
    : CLUSTER === "testnet"
    ? "https://relayer.aca-dev.network"
    : // ? "http://localhost:3111"
      "";

export const ACALA_RELAY_URL = `${ACALA_RELAYER_URL}/relay`;
export const ACALA_SHOULD_RELAY_URL = `${ACALA_RELAYER_URL}/shouldRelay`;

export const getChainShortName = (chainId: ChainId) => {
  return chainId === CHAIN_ID_BSC ? "BSC" : CHAINS_BY_ID[chainId]?.name;
};

export const COLOR_BY_CHAIN_ID: { [key in ChainId]?: string } = {
  [CHAIN_ID_SOLANA]: "#31D7BB",
  [CHAIN_ID_ETH]: "#8A92B2",
  [CHAIN_ID_TERRA]: "#5493F7",
  [CHAIN_ID_BSC]: "#F0B90B",
  [CHAIN_ID_POLYGON]: "#8247E5",
  [CHAIN_ID_AVAX]: "#E84142",
  [CHAIN_ID_OASIS]: "#0092F6",
  [CHAIN_ID_AURORA]: "#23685A",
  [CHAIN_ID_FANTOM]: "#1969FF",
  [CHAIN_ID_KARURA]: "#FF4B3B",
  [CHAIN_ID_ACALA]: "#E00F51",
};

export const DISABLED_TOKEN_TRANSFERS: {
  [key in ChainId]?: { [address: string]: ChainId[] };
} = {
  [CHAIN_ID_ACALA]: {
    "0x0000000000000000000100000000000000000001": [CHAIN_ID_KARURA], // aUSD
  },
  [CHAIN_ID_KARURA]: {
    "0x0000000000000000000100000000000000000081": [], // aUSD
  },
  [CHAIN_ID_ETH]: {
    "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30": [], // INJ
  },
  [CHAIN_ID_BSC]: {
    "0xa2B726B1145A4773F68593CF171187d8EBe4d495": [], // INJ
  },
  [CHAIN_ID_INJECTIVE]: {
    inj: [], // INJ
  },
};

export const getIsTokenTransferDisabled = (
  sourceChain: ChainId,
  targetChain: ChainId,
  tokenAddress: string
): boolean => {
  const disabledTransfers =
    DISABLED_TOKEN_TRANSFERS[sourceChain]?.[tokenAddress];
  return disabledTransfers !== undefined
    ? disabledTransfers.length === 0 || disabledTransfers.includes(targetChain)
    : false;
};

export interface DisabledTokenReasons {
  text: string;
  link?: {
    text: string;
    url: string;
  };
}

export const DISABLED_TOKEN_REASONS: {
  [key in ChainId]?: { [address: string]: DisabledTokenReasons };
} = {
  [CHAIN_ID_ETH]: {
    "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30": {
      text: "Transfers of INJ token can be made through the Injective Bridge.",
      link: {
        text: "Click here to go to Injective Bridge",
        url: "https://hub.injective.network/bridge/",
      },
    }, // INJ
  },
  [CHAIN_ID_BSC]: {
    "0xa2B726B1145A4773F68593CF171187d8EBe4d495": {
      text: "Transfers of INJ token can be made through the Injective Bridge.",
      link: {
        text: "Click here to go to Injective Bridge",
        url: "https://hub.injective.network/bridge/",
      },
    }, // INJ
  },
  [CHAIN_ID_INJECTIVE]: {
    inj: {
      text: "Transfers of INJ token can be made through the Injective Bridge.",
      link: {
        text: "Click here to go to Injective Bridge",
        url: "https://hub.injective.network/bridge/",
      },
    }, // INJ
  },
};

export const getIsTokenTransferDisabledReasons = (
  sourceChain: ChainId,
  tokenAddress: string
): DisabledTokenReasons | undefined => {
  return DISABLED_TOKEN_REASONS[sourceChain]?.[tokenAddress];
};

export const USD_NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const getWalletAddressNative = (
  hexAddress: string,
  chainId: ChainId
) => {
  if (chainId === CHAIN_ID_APTOS) {
    return ensureHexPrefix(hexAddress);
  }
  return hexToNativeString(hexAddress, chainId);
};

export const getAssetAddressNative = (
  address: Uint8Array,
  chainId: ChainId
) => {
  if (chainId === CHAIN_ID_APTOS) {
    return uint8ArrayToHex(address);
  }
  return hexToNativeAssetString(uint8ArrayToHex(address), chainId);
};

export const getWormholescanLink = (tx: string) => {
  return `https://wormholescan.io/#/tx/${tx}?network=${
    process.env.REACT_APP_CLUSTER === "mainnet" ? "MAINNET" : "TESTNET"
  }`;
};
