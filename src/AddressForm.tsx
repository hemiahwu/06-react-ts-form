import { FormWrapper } from "./FormWrapper";

type AddressData = {
  province: string;
  city: string;
  street: string;
};
type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};
export function AddressForm({
  province,
  city,
  street,
  updateFields,
}: AddressFormProps) {
  return (
    <FormWrapper title={"地址信息"}>
      <label>省份: </label>
      <input
        type="text"
        autoFocus
        required
        value={province}
        onChange={(e) => updateFields({ province: e.target.value })}
      />
      <label>城市: </label>
      <input
        type="text"
        autoFocus
        required
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />
      <label>街道: </label>
      <input
        type="text"
        autoFocus
        required
        value={street}
        onChange={(e) => updateFields({ street: e.target.value })}
      />
    </FormWrapper>
  );
}
