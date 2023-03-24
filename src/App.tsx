import { FormEvent, useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import { useMultistepForm } from "./useMultistepForm";
import { UserForm } from "./UserForm";

type FormData = {
  name: string;
  email: string;
  wechat: string;
  province: string;
  city: string;
  street: string;
  username: string;
  password: string;
};

// 初始化数据
const INITIAL_DATA: FormData = {
  name: "米斯特吴",
  email: "",
  wechat: "",
  province: "",
  city: "",
  street: "",
  username: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, steps, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    console.log(data);
  }
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        {/* 加入button 上一个和下一个 */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              上一个
            </button>
          )}
          <button type="submit">{!isLastStep ? "下一个" : "完成"}</button>
        </div>
      </form>
    </div>
  );
}

export default App;
