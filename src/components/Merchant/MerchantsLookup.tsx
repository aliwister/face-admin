import {useQuery} from "@apollo/react-hooks";
import {useMerchantsQuery} from "../../codegen/generated/_graphql";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {DialogContent} from "@material-ui/core";
import React from "react";
import Loader from "../Loader/Loader";
import {STORES} from "../../containers/Shipments/components/Constants";

export const MerchantLookup = ({setMerchant, selected, label="Merchant Name", onlyStores=false}) => {
  const { data, loading} = useMerchantsQuery({context: { clientName: "shopLink" }});
  if(loading)
    return <Loader/>

  if(onlyStores)
  return (
    <Autocomplete
      id="combo-box-demo"
      options={STORES}
      getOptionLabel={(option: any) => option.name}
      style={{width: 300}}
      defaultValue={selected}
      onChange={(event, value) => setMerchant(value)}
      renderInput={params => <TextField {...params} label={label} variant="outlined"/>}
    />
  )

  return (
    <Autocomplete
      id="combo-box-demo"
      options={data.merchants}
      getOptionLabel={(option: any) => option.name}
      style={{width: 300}}
      defaultValue={selected}
      onChange={(event, value) => setMerchant(value)}
      renderInput={params => <TextField {...params} label={label} variant="outlined"/>}
    />
  )
}
