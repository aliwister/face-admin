import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import { useAlert } from "react-alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import {useMutation} from "@apollo/react-hooks";
import gql from 'graphql-tag';
import {useHistory} from "react-router-dom";
import {MerchantLookup} from "../../../components/Merchant/MerchantsLookup";
const CREATE_PURCHASE = gql`
  mutation createPurchase($dto: PurchaseInput) {
    createPurchase(dto: $dto) {
      id
    }
  }
`;
export default function NewPurchaseDialog({onClose, open}) {
  const [createPurchaseMutation] = useMutation(CREATE_PURCHASE,{context: { clientName: "shopLink" }});
  const alert = useAlert();
  const [merchant, setMerchant] = React.useState(false);
  const history = useHistory();

  const handleCreatePurchase = async () => {
    // @ts-ignore
    const dto = {merchantId: merchant.id, currency: "omr"};
    const {
      data: { createPurchase },
    }: any = await createPurchaseMutation({
      variables: { dto: dto },
    });
    if(createPurchase)  {
      alert.success(createPurchase.id);
      history.push('/purchase-details/'+createPurchase.id);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Purchase</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select Merchant
        </DialogContentText>
        <MerchantLookup setMerchant={setMerchant} selected={{}}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreatePurchase} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}