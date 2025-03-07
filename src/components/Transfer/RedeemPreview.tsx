import { makeStyles, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTransferRedeemTx,
  selectTransferTargetChain,
} from "../../store/selectors";
import { reset } from "../../store/transferSlice";
import ButtonWithLoader from "../ButtonWithLoader";
import ShowTx from "../ShowTx";
import AddToMetamask from "./AddToMetamask";
import FeaturedMarkets from "./FeaturedMarkets";

const useStyles = makeStyles((theme) => ({
  description: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}));

export default function RedeemPreview({
  overrideExplainerString,
}: {
  overrideExplainerString?: string;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const targetChain = useSelector(selectTransferTargetChain);
  const redeemTx = useSelector(selectTransferRedeemTx);
  const handleResetClick = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const explainerString =
    overrideExplainerString ||
    "Success! The redeem transaction was submitted. The tokens will become available once the transaction confirms.";

  return (
    <>
      <Typography
        component="div"
        variant="subtitle1"
        className={classes.description}
      >
        {explainerString}
      </Typography>
      {redeemTx ? (
        <ShowTx chainId={targetChain} tx={redeemTx} showWormscanLink={false} />
      ) : null}
      <AddToMetamask />
      <FeaturedMarkets />
      <ButtonWithLoader onClick={handleResetClick}>
        Transfer More Tokens!
      </ButtonWithLoader>
    </>
  );
}
