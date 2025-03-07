import {
  ChainId,
  CHAIN_ID_ACALA,
  CHAIN_ID_ALGORAND,
  CHAIN_ID_APTOS,
  CHAIN_ID_INJECTIVE,
  CHAIN_ID_KARURA,
  CHAIN_ID_NEAR,
  CHAIN_ID_SOLANA,
  CHAIN_ID_TERRA2,
  CHAIN_ID_XPLA,
  CHAIN_ID_SEI,
  getEmitterAddressAlgorand,
  getEmitterAddressEth,
  getEmitterAddressInjective,
  getEmitterAddressSolana,
  getEmitterAddressTerra,
  getEmitterAddressXpla,
  hexToNativeAssetString,
  hexToNativeString,
  hexToUint8Array,
  isEVMChain,
  isTerraChain,
  ParsedVaa,
  parseNFTPayload,
  parseSequenceFromLogAlgorand,
  parseSequenceFromLogEth,
  parseSequenceFromLogInjective,
  parseSequenceFromLogSolana,
  parseSequenceFromLogTerra,
  parseSequenceFromLogXpla,
  parseTransferPayload,
  parseVaa,
  queryExternalId,
  queryExternalIdInjective,
  TerraChainId,
  uint8ArrayToHex,
  CHAIN_ID_SUI,
  getForeignAssetSui,
} from "@certusone/wormhole-sdk";
import { repairVaa } from "@certusone/wormhole-sdk/lib/esm/utils/repairVaa";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CircularProgress,
  Container,
  Divider,
  Link,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Connection } from "@solana/web3.js";
import { LCDClient } from "@terra-money/terra.js";
import algosdk from "algosdk";
import axios from "axios";
import { ethers } from "ethers";
import { base58 } from "ethers/lib/utils";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useEthereumProvider } from "../contexts/EthereumProviderContext";
import { useNearContext } from "../contexts/NearWalletContext";
import { useAcalaRelayerInfo } from "../hooks/useAcalaRelayerInfo";
import useIsWalletReady from "../hooks/useIsWalletReady";
import useRelayersAvailable, { Relayer } from "../hooks/useRelayersAvailable";
import { COLORS } from "../muiTheme";
import { setRecoveryVaa as setRecoveryNFTVaa } from "../store/nftSlice";
import { setRecoveryVaa } from "../store/transferSlice";
import {
  ALGORAND_TOKEN_BRIDGE_ID,
  CHAINS,
  CHAINS_BY_ID,
  CHAINS_WITH_NFT_SUPPORT,
  getBridgeAddressForChain,
  getNFTBridgeAddressForChain,
  getTokenBridgeAddressForChain,
  RELAY_URL_EXTENSION,
  SOLANA_HOST,
  SOL_NFT_BRIDGE_ADDRESS,
  SOL_TOKEN_BRIDGE_ADDRESS,
  getTerraConfig,
  WORMHOLE_RPC_HOSTS,
  NEAR_TOKEN_BRIDGE_ACCOUNT,
  XPLA_LCD_CLIENT_CONFIG,
  getWalletAddressNative,
  CLUSTER,
  ALGORAND_INDEXER,
} from "../utils/consts";
import { getSignedVAAWithRetry } from "../utils/getSignedVAAWithRetry";
import {
  getEmitterAddressNear,
  makeNearAccount,
  parseSequenceFromLogNear,
} from "../utils/near";
import parseError from "../utils/parseError";
import ButtonWithLoader from "./ButtonWithLoader";
import ChainSelect from "./ChainSelect";
import KeyAndBalance from "./KeyAndBalance";
import RelaySelector from "./RelaySelector";
import PendingVAAWarning from "./Transfer/PendingVAAWarning";
import { LCDClient as XplaLCDClient } from "@xpla/xpla.js";
import {
  getAptosClient,
  getEmitterAddressAndSequenceFromResult,
} from "../utils/aptos";
import { Types } from "aptos";
import {
  getInjectiveTxClient,
  getInjectiveWasmClient,
} from "../utils/injective";
import { getSuiProvider } from "../utils/sui";
import {
  getEmitterAddressAndSequenceFromResponseSui,
  getOriginalPackageId,
} from "@certusone/wormhole-sdk/lib/cjs/sui";
import { getSeiWasmClient, parseRawLog, searchInLogs } from "../utils/sei";
import { useVaaVerifier } from "../hooks/useVaaVerifier";
import ChainWarningMessage from "./ChainWarningMessage";
import { useDeepLinkRecoveryParams } from "../hooks/useDeepLinkRecoveryParams";

const NOT_SUPPORTED_VAA_WARNING_MESSAGE = (
  <>
    This VAA was not generated from Token Bridge, or the type is not supported
    yet. If you have any questions or believe this is a mistake, please open a
    support ticket on{" "}
    <Link href="https://discord.gg/wormholecrypto" target="_blank">
      Discord
    </Link>
    .
  </>
);

const useStyles = makeStyles((theme) => ({
  mainCard: {
    padding: "32px 32px 16px",
    backgroundColor: COLORS.whiteWithTransparency,
  },
  advancedContainer: {
    padding: theme.spacing(2, 0),
  },
  relayAlert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "& > .MuiAlert-message": {
      width: "100%",
    },
  },
}));

async function fetchSignedVAA(
  chainId: ChainId,
  emitterAddress: string,
  sequence: string
) {
  const { vaaBytes, isPending } = await getSignedVAAWithRetry(
    chainId,
    emitterAddress,
    sequence,
    WORMHOLE_RPC_HOSTS.length
  );

  const gs3 =
    CLUSTER === "mainnet"
      ? {
          index: 3,
          keys: [
            "0x58CC3AE5C097b213cE3c81979e1B9f9570746AA5",
            "0xfF6CB952589BDE862c25Ef4392132fb9D4A42157",
            "0x114De8460193bdf3A2fCf81f86a09765F4762fD1",
            "0x107A0086b32d7A0977926A205131d8731D39cbEB",
            "0x8C82B2fd82FaeD2711d59AF0F2499D16e726f6b2",
            "0x11b39756C042441BE6D8650b69b54EbE715E2343",
            "0x54Ce5B4D348fb74B958e8966e2ec3dBd4958a7cd",
            "0x15e7cAF07C4e3DC8e7C469f92C8Cd88FB8005a20",
            "0x74a3bf913953D695260D88BC1aA25A4eeE363ef0",
            "0x000aC0076727b35FBea2dAc28fEE5cCB0fEA768e",
            "0xAF45Ced136b9D9e24903464AE889F5C8a723FC14",
            "0xf93124b7c738843CBB89E864c862c38cddCccF95",
            "0xD2CC37A4dc036a8D232b48f62cDD4731412f4890",
            "0xDA798F6896A3331F64b48c12D1D57Fd9cbe70811",
            "0x71AA1BE1D36CaFE3867910F99C09e347899C19C3",
            "0x8192b6E7387CCd768277c17DAb1b7a5027c0b3Cf",
            "0x178e21ad2E77AE06711549CFBB1f9c7a9d8096e8",
            "0x5E1487F35515d02A92753504a8D75471b9f49EdB",
            "0x6FbEBc898F403E4773E95feB15E80C9A99c8348d",
          ],
          expiry: 0,
        }
      : {
          index: 0,
          keys: ["0x13947Bd48b18E53fdAeEe77F3473391aC727C638"],
          expiry: 0,
        };

  const vaa = vaaBytes ? repairVaa(uint8ArrayToHex(vaaBytes), gs3) : undefined;
  return {
    vaa,
    isPending,
    error: null,
  };
}

function handleError(e: any, enqueueSnackbar: any) {
  console.error(e);
  enqueueSnackbar(null, {
    content: <Alert severity="error">{parseError(e)}</Alert>,
  });
  return { vaa: null, isPending: false, error: parseError(e) };
}

async function algo(tx: string, enqueueSnackbar: any) {
  try {
    const algoIndexer = new algosdk.Indexer(
      ALGORAND_INDEXER.token,
      ALGORAND_INDEXER.server,
      ALGORAND_INDEXER.port
    );
    const txnInfo = await algoIndexer.lookupTransactionByID(tx).do();
    let confirmedTxInfo: Record<string, any> | undefined = undefined;
    // This is the code from waitForConfirmation
    if (txnInfo?.transaction !== undefined) {
      if (
        txnInfo?.transaction["confirmed-round"] !== null &&
        txnInfo?.transaction["confirmed-round"] > 0
      ) {
        //Got the completed Transaction
        confirmedTxInfo = txnInfo.transaction;
      }
    }
    if (!confirmedTxInfo) {
      throw new Error("Transaction not found or not confirmed");
    }
    if (!confirmedTxInfo["inner-txns"]) {
      throw new Error("Source Tx does not refer to a valid bridge transaction");
    }
    // transform the object to match the format expected by parseSequenceFromLogAlgorand
    confirmedTxInfo["inner-txns"] = confirmedTxInfo["inner-txns"].map(
      (innerTxn: any) => {
        return {
          ...innerTxn,
          logs: innerTxn["logs"]?.[0]
            ? [Buffer.from(innerTxn["logs"][0], "base64")]
            : undefined,
        };
      }
    );
    const sequence = parseSequenceFromLogAlgorand(confirmedTxInfo);
    if (!sequence) {
      throw new Error("Sequence not found");
    }
    const emitterAddress = getEmitterAddressAlgorand(ALGORAND_TOKEN_BRIDGE_ID);
    return await fetchSignedVAA(CHAIN_ID_ALGORAND, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function aptos(tx: string, enqueueSnackbar: any) {
  try {
    const result = (await getAptosClient().waitForTransactionWithResult(
      tx
    )) as Types.UserTransaction;
    if (!result) {
      throw new Error("Transaction not found");
    }
    const { emitterAddress, sequence } =
      getEmitterAddressAndSequenceFromResult(result);
    if (!sequence) {
      throw new Error("Sequence not found");
    }
    return await fetchSignedVAA(CHAIN_ID_APTOS, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function evm(
  provider: ethers.providers.Web3Provider,
  tx: string,
  enqueueSnackbar: any,
  chainId: ChainId,
  nft: boolean
) {
  try {
    const receipt = await provider.getTransactionReceipt(tx);
    const sequence = parseSequenceFromLogEth(
      receipt,
      getBridgeAddressForChain(chainId)
    );
    const emitterAddress = getEmitterAddressEth(
      nft
        ? getNFTBridgeAddressForChain(chainId)
        : getTokenBridgeAddressForChain(chainId)
    );
    return await fetchSignedVAA(chainId, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function near(tx: string, enqueueSnackbar: any, nearAccountId: string) {
  try {
    const account = await makeNearAccount(nearAccountId);
    const receipt = await account.connection.provider.txStatusReceipts(
      base58.decode(tx),
      nearAccountId
    );
    const sequence = parseSequenceFromLogNear(receipt);
    if (!sequence) {
      throw new Error("Sequence not found");
    }
    const emitterAddress = getEmitterAddressNear(NEAR_TOKEN_BRIDGE_ACCOUNT);
    return await fetchSignedVAA(CHAIN_ID_NEAR, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function solana(tx: string, enqueueSnackbar: any, nft: boolean) {
  try {
    const connection = new Connection(SOLANA_HOST, "confirmed");
    const info = await connection.getTransaction(tx);
    if (!info) {
      throw new Error("An error occurred while fetching the transaction info");
    }
    const sequence = parseSequenceFromLogSolana(info);
    const emitterAddress = await getEmitterAddressSolana(
      nft ? SOL_NFT_BRIDGE_ADDRESS : SOL_TOKEN_BRIDGE_ADDRESS
    );
    return await fetchSignedVAA(CHAIN_ID_SOLANA, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function terra(tx: string, enqueueSnackbar: any, chainId: TerraChainId) {
  try {
    const lcd = new LCDClient(getTerraConfig(chainId));
    const info = await lcd.tx.txInfo(tx);
    const sequence = parseSequenceFromLogTerra(info);
    if (!sequence) {
      throw new Error("Sequence not found");
    }
    const emitterAddress = await getEmitterAddressTerra(
      getTokenBridgeAddressForChain(chainId)
    );
    return await fetchSignedVAA(chainId, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function xpla(tx: string, enqueueSnackbar: any) {
  try {
    const lcd = new XplaLCDClient(XPLA_LCD_CLIENT_CONFIG);
    const info = await lcd.tx.txInfo(tx);
    const sequence = parseSequenceFromLogXpla(info);
    if (!sequence) {
      throw new Error("Sequence not found");
    }
    const emitterAddress = await getEmitterAddressXpla(
      getTokenBridgeAddressForChain(CHAIN_ID_XPLA)
    );
    return await fetchSignedVAA(CHAIN_ID_XPLA, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function injective(txHash: string, enqueueSnackbar: any) {
  try {
    const client = getInjectiveTxClient();
    const tx = await client.fetchTx(txHash);
    if (!tx) {
      throw new Error("Unable to fetch transaction");
    }
    const sequence = parseSequenceFromLogInjective(tx);
    if (!sequence) {
      throw new Error("Sequence not found");
    }
    const emitterAddress = await getEmitterAddressInjective(
      getTokenBridgeAddressForChain(CHAIN_ID_INJECTIVE)
    );
    return await fetchSignedVAA(CHAIN_ID_INJECTIVE, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function sui(digest: string, enqueueSnackbar: any) {
  try {
    const provider = getSuiProvider();
    const tx = await provider.getTransactionBlock({
      digest,
      options: { showEvents: true },
    });
    const coreBridgePackageId = await getOriginalPackageId(
      provider,
      getBridgeAddressForChain(CHAIN_ID_SUI)
    );
    if (!coreBridgePackageId)
      throw new Error("Unable to retrieve original package id");
    const { sequence, emitterAddress } =
      getEmitterAddressAndSequenceFromResponseSui(coreBridgePackageId, tx);
    return await fetchSignedVAA(CHAIN_ID_SUI, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

async function sei(hash: string, enqueueSnackbar: any) {
  try {
    const client = await getSeiWasmClient();
    const tx = await client.getTx(hash);
    if (!tx) throw new Error("Unable to fetch transaction");

    const parsedLogs = parseRawLog(tx.rawLog);
    const sequence = searchInLogs("message.sequence", parsedLogs);
    const emitterAddress = searchInLogs("message.sender", parsedLogs);

    if (!sequence || !emitterAddress) {
      throw new Error("Sequence or emitter address not found");
    }

    return await fetchSignedVAA(CHAIN_ID_SEI, emitterAddress, sequence);
  } catch (e) {
    return handleError(e, enqueueSnackbar);
  }
}

function RelayerRecovery({
  parsedPayload,
  signedVaa,
  onClick,
}: {
  parsedPayload: any;
  signedVaa: string;
  onClick: () => void;
}) {
  const classes = useStyles();
  const relayerInfo = useRelayersAvailable(true);
  const [selectedRelayer, setSelectedRelayer] = useState<Relayer | null>(null);
  const [isAttemptingToSchedule, setIsAttemptingToSchedule] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fee =
    (parsedPayload && parsedPayload.fee && parseInt(parsedPayload.fee)) || null;
  //This check is probably more sophisticated in the future. Possibly a net call.
  const isEligible =
    fee &&
    fee > 0 &&
    relayerInfo?.data?.relayers?.length &&
    relayerInfo?.data?.relayers?.length > 0;

  const handleRelayerChange = useCallback(
    (relayer: Relayer | null) => {
      setSelectedRelayer(relayer);
    },
    [setSelectedRelayer]
  );

  const handleGo = useCallback(async () => {
    if (!(selectedRelayer && selectedRelayer.url)) {
      return;
    }

    setIsAttemptingToSchedule(true);
    axios
      .get(
        selectedRelayer.url +
          RELAY_URL_EXTENSION +
          encodeURIComponent(
            Buffer.from(hexToUint8Array(signedVaa)).toString("base64")
          )
      )
      .then(
        () => {
          setIsAttemptingToSchedule(false);
          onClick();
        },
        (error) => {
          setIsAttemptingToSchedule(false);
          enqueueSnackbar(null, {
            content: (
              <Alert severity="error">
                {"Relay request rejected. Error: " + error.message}
              </Alert>
            ),
          });
        }
      );
  }, [selectedRelayer, enqueueSnackbar, onClick, signedVaa]);

  if (!isEligible) {
    return null;
  }

  return (
    <Alert variant="outlined" severity="info" className={classes.relayAlert}>
      <Typography>{"This transaction is eligible to be relayed"}</Typography>
      <RelaySelector
        selectedValue={selectedRelayer}
        onChange={handleRelayerChange}
      />
      <ButtonWithLoader
        disabled={!selectedRelayer}
        onClick={handleGo}
        showLoader={isAttemptingToSchedule}
      >
        Request Relay
      </ButtonWithLoader>
    </Alert>
  );
}

function AcalaRelayerRecovery({
  parsedPayload,
  signedVaa,
  onClick,
  isNFT,
}: {
  parsedPayload: any;
  signedVaa: string;
  onClick: () => void;
  isNFT: boolean;
}) {
  const classes = useStyles();
  const originChain: ChainId = parsedPayload?.originChain;
  const originAsset = parsedPayload?.originAddress;
  const targetChain: ChainId = parsedPayload?.targetChain;
  const amount =
    parsedPayload && "amount" in parsedPayload
      ? parsedPayload.amount.toString()
      : "";
  const shouldCheck =
    parsedPayload &&
    originChain &&
    originAsset &&
    signedVaa &&
    targetChain &&
    !isNFT &&
    (targetChain === CHAIN_ID_ACALA || targetChain === CHAIN_ID_KARURA);
  const acalaRelayerInfo = useAcalaRelayerInfo(
    targetChain,
    amount,
    hexToNativeAssetString(originAsset, originChain),
    false
  );
  const enabled = shouldCheck && acalaRelayerInfo.data?.shouldRelay;

  return enabled ? (
    <Alert variant="outlined" severity="info" className={classes.relayAlert}>
      <Typography>
        This transaction is eligible to be relayed by{" "}
        {CHAINS_BY_ID[targetChain].name} &#127881;
      </Typography>
      <ButtonWithLoader onClick={onClick}>Request Relay</ButtonWithLoader>
    </Alert>
  ) : null;
}

export default function Recovery() {
  const classes = useStyles();
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [recoverySourceChain, setRecoverySourceChain] =
    useState<ChainId>(CHAIN_ID_SOLANA);
  const { provider } = useEthereumProvider(recoverySourceChain as any);
  const [type, setType] = useState<"Token" | "NFT">("Token");
  const isNFT = useMemo(() => type === "NFT", [type]);
  const [recoverySourceTx, setRecoverySourceTx] = useState("");
  const [recoverySourceTxIsLoading, setRecoverySourceTxIsLoading] =
    useState(false);
  const [recoverySourceTxError, setRecoverySourceTxError] = useState("");
  const [recoverySignedVAA, setRecoverySignedVAA] = useState("");
  const { isNFTTransfer, isTokenBridgeTransfer } =
    useVaaVerifier(recoverySignedVAA);
  const [recoveryParsedVAA, setRecoveryParsedVAA] = useState<ParsedVaa | null>(
    null
  );
  const [isVAAPending, setIsVAAPending] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const { accountId: nearAccountId } = useNearContext();
  const { isReady, statusMessage } = useIsWalletReady(recoverySourceChain);
  const walletConnectError =
    (isEVMChain(recoverySourceChain) ||
      recoverySourceChain === CHAIN_ID_NEAR) &&
    !isReady
      ? statusMessage
      : "";
  const parsedPayload = useMemo(() => {
    try {
      return recoveryParsedVAA?.payload
        ? isNFT
          ? parseNFTPayload(
              Buffer.from(new Uint8Array(recoveryParsedVAA.payload))
            )
          : parseTransferPayload(
              Buffer.from(new Uint8Array(recoveryParsedVAA.payload))
            )
        : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [recoveryParsedVAA, isNFT]);

  useEffect(() => {
    let cancelled = false;
    if (
      parsedPayload &&
      (parsedPayload.targetChain === CHAIN_ID_TERRA2 ||
        parsedPayload.targetChain === CHAIN_ID_XPLA)
    ) {
      (async () => {
        const lcd =
          parsedPayload.targetChain === CHAIN_ID_TERRA2
            ? new LCDClient(getTerraConfig(CHAIN_ID_TERRA2))
            : new XplaLCDClient(XPLA_LCD_CLIENT_CONFIG);
        const tokenBridgeAddress = getTokenBridgeAddressForChain(
          parsedPayload.targetChain as ChainId
        );
        const tokenId = await queryExternalId(
          lcd,
          tokenBridgeAddress,
          parsedPayload.originAddress
        );
        if (!cancelled) {
          setTokenId(tokenId || "");
        }
      })();
    }
    if (parsedPayload && parsedPayload.targetChain === CHAIN_ID_INJECTIVE) {
      (async () => {
        const client = getInjectiveWasmClient();
        const tokenBridgeAddress =
          getTokenBridgeAddressForChain(CHAIN_ID_INJECTIVE);
        const tokenId = await queryExternalIdInjective(
          client as any,
          tokenBridgeAddress,
          parsedPayload.originAddress
        );
        if (!cancelled) {
          setTokenId(tokenId || "");
        }
      })();
    }

    if (parsedPayload && parsedPayload.targetChain === CHAIN_ID_SUI) {
      (async () => {
        const tokenId = await getForeignAssetSui(
          getSuiProvider(),
          getTokenBridgeAddressForChain(CHAIN_ID_SUI),
          parsedPayload.originChain as ChainId,
          hexToUint8Array(parsedPayload.originAddress)
        );
        if (!cancelled) {
          setTokenId(tokenId || "");
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [parsedPayload]);

  const { search } = useLocation();
  const { sourceChain, transactionId, vaaHex } =
    useDeepLinkRecoveryParams(search);
  //This effect initializes the state based on the path params.
  useEffect(() => {
    try {
      if (sourceChain && transactionId) {
        setRecoverySourceChain(sourceChain);
        setRecoverySourceTx(transactionId);
      } else if (vaaHex) {
        setRecoverySignedVAA(vaaHex);
      }
    } catch (e) {
      console.error(e);
      console.error("Invalid path params specified.");
    }
  }, [sourceChain, transactionId, vaaHex]);

  useEffect(() => {
    if (recoverySourceTx && (!isEVMChain(recoverySourceChain) || isReady)) {
      let cancelled = false;
      if (isEVMChain(recoverySourceChain) && provider) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        (async () => {
          const { vaa, isPending, error } = await evm(
            provider,
            recoverySourceTx,
            enqueueSnackbar,
            recoverySourceChain,
            isNFT
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_SOLANA) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        (async () => {
          const { vaa, isPending, error } = await solana(
            recoverySourceTx,
            enqueueSnackbar,
            isNFT
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (isTerraChain(recoverySourceChain)) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        setTokenId("");
        (async () => {
          const { vaa, isPending, error } = await terra(
            recoverySourceTx,
            enqueueSnackbar,
            recoverySourceChain
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_ALGORAND) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        (async () => {
          const { vaa, isPending, error } = await algo(
            recoverySourceTx,
            enqueueSnackbar
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_NEAR && nearAccountId) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        (async () => {
          const { vaa, isPending, error } = await near(
            recoverySourceTx,
            enqueueSnackbar,
            nearAccountId
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_XPLA) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        setTokenId("");
        (async () => {
          const { vaa, isPending, error } = await xpla(
            recoverySourceTx,
            enqueueSnackbar
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_APTOS) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        (async () => {
          const { vaa, isPending, error } = await aptos(
            recoverySourceTx,
            enqueueSnackbar
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_INJECTIVE) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        setTokenId("");
        (async () => {
          const { vaa, isPending, error } = await injective(
            recoverySourceTx,
            enqueueSnackbar
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_SUI) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        setTokenId("");
        (async () => {
          const { vaa, isPending, error } = await sui(
            recoverySourceTx,
            enqueueSnackbar
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      } else if (recoverySourceChain === CHAIN_ID_SEI) {
        setRecoverySourceTxError("");
        setRecoverySourceTxIsLoading(true);
        setTokenId("");
        (async () => {
          const { vaa, isPending, error } = await sei(
            recoverySourceTx,
            enqueueSnackbar
          );
          if (!cancelled) {
            setRecoverySourceTxIsLoading(false);
            if (vaa) {
              setRecoverySignedVAA(vaa);
            }
            if (error) {
              setRecoverySourceTxError(error);
            }
            setIsVAAPending(isPending);
          }
        })();
      }
      return () => {
        cancelled = true;
      };
    }
  }, [
    recoverySourceChain,
    recoverySourceTx,
    provider,
    enqueueSnackbar,
    isNFT,
    isReady,
    nearAccountId,
  ]);
  const handleTypeChange = useCallback((event) => {
    setRecoverySourceChain((prevChain) =>
      event.target.value === "NFT" &&
      !CHAINS_WITH_NFT_SUPPORT.find((chain) => chain.id === prevChain)
        ? CHAIN_ID_SOLANA
        : prevChain
    );
    setType(event.target.value);
  }, []);
  const handleSourceChainChange = useCallback((event) => {
    setRecoverySourceTx("");
    setRecoverySourceChain(event.target.value);
  }, []);
  const handleSourceTxChange = useCallback((event) => {
    setRecoverySourceTx(event.target.value.trim());
  }, []);
  const handleSignedVAAChange = useCallback((event) => {
    setRecoverySignedVAA(event.target.value.trim());
  }, []);
  useEffect(() => {
    if (recoverySignedVAA) {
      try {
        const parsedVAA = parseVaa(hexToUint8Array(recoverySignedVAA));
        setRecoveryParsedVAA(parsedVAA);
      } catch (e) {
        console.error(e);
        setRecoveryParsedVAA(null);
      }
    }
  }, [recoverySignedVAA]);
  const parsedPayloadTargetChain = parsedPayload?.targetChain;
  const enableRecovery = recoverySignedVAA && parsedPayloadTargetChain;
  //&& (isNFTTransfer || isTokenBridgeTransfer);

  const handleRecoverClickBase = useCallback(
    (useRelayer: boolean) => {
      if (enableRecovery && recoverySignedVAA && parsedPayloadTargetChain) {
        // TODO: make recovery reducer
        if (isNFT) {
          dispatch(
            setRecoveryNFTVaa({
              vaa: recoverySignedVAA,
              parsedPayload: {
                targetChain: parsedPayload.targetChain as ChainId,
                targetAddress: parsedPayload.targetAddress,
                originChain: parsedPayload.originChain as ChainId,
                originAddress: parsedPayload.originAddress,
              },
            })
          );
          push("/nft");
        } else {
          dispatch(
            setRecoveryVaa({
              vaa: recoverySignedVAA,
              useRelayer,
              parsedPayload: {
                targetChain: parsedPayload.targetChain as ChainId,
                targetAddress: parsedPayload.targetAddress,
                originChain: parsedPayload.originChain as ChainId,
                originAddress: parsedPayload.originAddress,
                amount:
                  "amount" in parsedPayload
                    ? parsedPayload.amount.toString()
                    : "",
              },
            })
          );
          push("/transfer");
        }
      }
    },
    [
      dispatch,
      enableRecovery,
      recoverySignedVAA,
      parsedPayloadTargetChain,
      parsedPayload,
      isNFT,
      push,
    ]
  );

  const handleRecoverClick = useCallback(() => {
    handleRecoverClickBase(false);
  }, [handleRecoverClickBase]);

  const handleRecoverWithRelayerClick = useCallback(() => {
    handleRecoverClickBase(true);
  }, [handleRecoverClickBase]);

  return (
    <Container maxWidth="md">
      <Card className={classes.mainCard}>
        <Alert severity="info" variant="outlined">
          If you have sent your tokens but have not redeemed them, you may paste
          in the Source Transaction ID (from Step 3) to resume your transfer.
        </Alert>
        <TextField
          select
          variant="outlined"
          label="Type"
          disabled={!!recoverySignedVAA}
          value={type}
          onChange={handleTypeChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Token">Token</MenuItem>
          <MenuItem value="NFT">NFT</MenuItem>
        </TextField>
        <ChainSelect
          select
          variant="outlined"
          label="Source Chain"
          disabled={!!recoverySignedVAA}
          value={recoverySourceChain}
          onChange={handleSourceChainChange}
          fullWidth
          margin="normal"
          chains={isNFT ? CHAINS_WITH_NFT_SUPPORT : CHAINS}
        />
        {isEVMChain(recoverySourceChain) ||
        recoverySourceChain === CHAIN_ID_NEAR ? (
          <KeyAndBalance chainId={recoverySourceChain} />
        ) : null}
        <TextField
          variant="outlined"
          label="Source Tx (paste here)"
          disabled={
            !!recoverySignedVAA ||
            recoverySourceTxIsLoading ||
            !!walletConnectError
          }
          value={recoverySourceTx}
          onChange={handleSourceTxChange}
          error={!!recoverySourceTxError || !!walletConnectError}
          helperText={recoverySourceTxError || walletConnectError}
          fullWidth
          margin="normal"
        />
        {enableRecovery && (
          <>
            <RelayerRecovery
              parsedPayload={parsedPayload}
              signedVaa={recoverySignedVAA}
              onClick={handleRecoverWithRelayerClick}
            />
            <AcalaRelayerRecovery
              parsedPayload={parsedPayload}
              signedVaa={recoverySignedVAA}
              onClick={handleRecoverWithRelayerClick}
              isNFT={isNFT}
            />
          </>
        )}
        {recoverySignedVAA !== "" &&
          !(isNFTTransfer || isTokenBridgeTransfer) && (
            <ChainWarningMessage>
              {NOT_SUPPORTED_VAA_WARNING_MESSAGE}
            </ChainWarningMessage>
          )}
        <ButtonWithLoader
          onClick={handleRecoverClick}
          disabled={!enableRecovery}
          showLoader={recoverySourceTxIsLoading}
        >
          Recover
        </ButtonWithLoader>
        {isVAAPending && (
          <PendingVAAWarning sourceChain={recoverySourceChain} />
        )}
        <div className={classes.advancedContainer}>
          <Accordion defaultExpanded={!!vaaHex}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Advanced
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Box position="relative">
                  <TextField
                    variant="outlined"
                    label="Signed VAA (Hex)"
                    disabled={recoverySourceTxIsLoading}
                    value={recoverySignedVAA || ""}
                    onChange={handleSignedVAAChange}
                    fullWidth
                    margin="normal"
                  />
                  {recoverySourceTxIsLoading ? (
                    <Box
                      position="absolute"
                      style={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : null}
                </Box>
                <Box my={4}>
                  <Divider />
                </Box>
                <TextField
                  variant="outlined"
                  label="Emitter Chain"
                  disabled
                  value={recoveryParsedVAA?.emitterChain || ""}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Emitter Address"
                  disabled
                  value={
                    (recoveryParsedVAA &&
                      hexToNativeString(
                        recoveryParsedVAA.emitterAddress.toString("hex"),
                        recoveryParsedVAA.emitterChain as ChainId
                      )) ||
                    ""
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Sequence"
                  disabled
                  value={recoveryParsedVAA?.sequence?.toString() || ""}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Timestamp"
                  disabled
                  value={
                    (recoveryParsedVAA &&
                      new Date(
                        recoveryParsedVAA.timestamp * 1000
                      ).toLocaleString()) ||
                    ""
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Guardian Set"
                  disabled
                  value={recoveryParsedVAA?.guardianSetIndex?.toString() || ""}
                  fullWidth
                  margin="normal"
                />
                <Box my={4}>
                  <Divider />
                </Box>
                <TextField
                  variant="outlined"
                  label="Origin Chain"
                  disabled
                  value={parsedPayload?.originChain.toString() || ""}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Origin Token Address"
                  disabled
                  value={
                    parsedPayload
                      ? parsedPayload.targetChain === CHAIN_ID_TERRA2 ||
                        parsedPayload.targetChain === CHAIN_ID_XPLA ||
                        parsedPayload.targetChain === CHAIN_ID_INJECTIVE
                        ? tokenId
                        : hexToNativeAssetString(
                            parsedPayload.originAddress,
                            parsedPayload.originChain as ChainId
                          ) || ""
                      : ""
                  }
                  fullWidth
                  margin="normal"
                />
                {isNFT ? (
                  <TextField
                    variant="outlined"
                    label="Origin Token ID"
                    disabled
                    // @ts-ignore
                    value={parsedPayload?.tokenId || ""}
                    fullWidth
                    margin="normal"
                  />
                ) : null}
                <TextField
                  variant="outlined"
                  label="Target Chain"
                  disabled
                  value={parsedPayload?.targetChain.toString() || ""}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  label="Target Address"
                  disabled
                  value={
                    (parsedPayload &&
                      getWalletAddressNative(
                        parsedPayload.targetAddress,
                        parsedPayload.targetChain as ChainId
                      )) ||
                    ""
                  }
                  fullWidth
                  margin="normal"
                />
                {isNFT ? null : (
                  <>
                    <TextField
                      variant="outlined"
                      label="Amount"
                      disabled
                      value={
                        parsedPayload && "amount" in parsedPayload
                          ? parsedPayload.amount.toString()
                          : ""
                      }
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      variant="outlined"
                      label="Relayer Fee"
                      disabled
                      value={
                        (parsedPayload &&
                          "fee" in parsedPayload &&
                          parsedPayload?.fee?.toString()) ||
                        ""
                      }
                      fullWidth
                      margin="normal"
                    />
                  </>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Card>
    </Container>
  );
}
