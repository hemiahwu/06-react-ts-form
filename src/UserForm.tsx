import { FormWrapper } from "./FormWrapper";
type UserData = {
  name: string;
  email: string;
  wechat: string;
};
type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};
export function UserForm({ name, email, wechat, updateFields }: UserFormProps) {
  return (
    <FormWrapper title={"用户信息"}>
      <label>姓名: </label>
      <input
        type="text"
        autoFocus
        required
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />

      <label>邮箱: </label>
      <input
        type="email"
        autoFocus
        required
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <label>vx: </label>
      <input
        type="text"
        autoFocus
        required
        value={wechat}
        onChange={(e) => updateFields({ wechat: e.target.value })}
      />
    </FormWrapper>
  );
}
