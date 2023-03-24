import { FormWrapper } from "./FormWrapper";

type AccountData = {
  username: string;
  password: string;
};

type AddressFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};
export function AccountForm({
  username,
  password,
  updateFields,
}: AddressFormProps) {
  return (
    <FormWrapper title={"账户信息"}>
      <label>账号: </label>
      <input
        type="text"
        autoFocus
        required
        value={username}
        onChange={(e) => updateFields({ username: e.target.value })}
      />
      <label>密码: </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => updateFields({ password: e.target.value })}
      />
    </FormWrapper>
  );
}
