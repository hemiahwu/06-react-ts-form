## 06-ReactTypescript-Multistep Form Custom

## 第一章 课程代码

Git仓库地址: https://github.com/hemiahwu/06-react-ts-form

百度网盘链接: https://pan.baidu.com/s/1aQrkp8OiQMAkm9nkotomzg?pwd=gxym 提取码: gxym



课程答疑微信: 

web1024b

### 1. 创建项目

* npm create vite
* react-ts-form
* 选择 react react-ts
* npm i

清理项目

* src下只留下
* App.tsx
* main.tsx 
* Vite-env.d.ts 
* 其他的都删掉



* App.tsx

``````react
function App(){
  return <h1>Hi</h1>
}

export default App
``````



### 2. 创建form组件

* src/useMultistepForm.ts

``````react
import { ReactElement, useState } from "react"

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps
  }
}
``````

* App.tsx

``````react
// 1.导入组件
import { useMultistepForm } from "./useMultistepForm";

function App() {
  // 2. 解构内容
  const { currentStepIndex, step,steps } = useMultistepForm([
    <div>这是第一个组件内容</div>,
    <div>这是第二个组件内容</div>,
  ]);
  return (
    // 3.定义结构
    <form>
      <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
					{currentStepIndex + 1} / {steps.length}
      </div>
      {/* 4. 渲染DOM */}
      {step}
    </form>
  );
}

export default App;
``````

### 3. 加入样式和button

* 设置容器边框样式

``````html
<div
  style={{
    position: "relative",
    background: "white",
    border: "1px solid black",
    padding: "2rem",
    margin: "1rem",
    borderRadius: ".5rem",
    fontFamily: "Arial"
  }}
> 
  <form> .... </form>
</div>
``````

* 配置上一个和下一个按钮

``````jsx
{/* {step} */}

<div
  style={{
    marginTop: "1rem",
    display: "flex",
    gap: ".5rem",
    justifyContent: "flex-end",
  }}
>
  <button type="button">上一个</button>
  <button type="button">下一个</button>
</div>
``````

* useMultistepForm.ts

``````ts
// const [currentStepIndex, setCurrentStepIndex] = useState(0)

function next() {
  setCurrentStepIndex(i => {
    console.log(i)
    if (i >= steps.length - 1) return i
    return i + 1
  })
}

function back() {
  setCurrentStepIndex(i => {
    if (i <= 0) return i
    return i - 1
  })
}

return {
  ...
  // 返回
  next,
  back,
}
``````

* App.tsx

``````tsx
<button type="button" onClick={back}>上一个</button>
<button type="button" onClick={next}>下一个</button>
``````

* App.tsx 优化按钮显示

``````jsx
{currentStepIndex !== 0 && 
  <button type="button" onClick={back}>上一个</button>}

{currentStepIndex !== steps.length - 1 && 
  <button type="button" onClick={next}>下一个</button>}
``````

* useMultistepForm.ts 抽离判断条件

``````tsx
return {
  ...
  isFirstStep: currentStepIndex === 0,
  isLastStep: currentStepIndex === steps.length - 1,
  ...
}
``````

* App.tsx 优化判断条件

``````tsx
const { isFirstStep, isLastStep } = useMultistepForm()

{!isFirstStep && 
  <button type="button" onClick={back}>上一个</button>}

<button type="button" onClick={next}>
  {isLastStep ? "完成" : "下一个" }
</button>
``````

### 4. 定义和使用表单组件

* UserForm.tsx

`````tsx
export function UserForm() {
  return (
    <>
        <label>姓名: </label>
        <input type="text" autoFocus required />
        <label>邮箱: </label>
        <input type="email" autoFocus required />
        <label>vx: </label>
        <input type="text" autoFocus required />
    </>
  )
}
`````

* AddressForm.tsx

``````tsx
export function AddressForm() {
  return (
    <>
        <label>省份: </label>
        <input type="text" autoFocus required />
        <label>城市: </label>
        <input type="text" autoFocus required />
        <label>街道: </label>
        <input type="text" autoFocus required />
    </>
  )
}
``````

* AccountForm.tsx

`````tsx
export function AccountForm() {
  return (
    <>
        <label>账号: </label>
        <input type="text" autoFocus required />
        <label>密码: </label>
        <input type="password" required />
    </>
  )
}
`````

* App.tsx 引入和使用组件

``````tsx
const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
  <UserForm/>,
  <AddressForm/>,
  <AccountForm/>
]);
``````

### 5. 组件容器封装

* FormWrapper.tsx

``````jsx
import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gap: "1rem .5rem",
          justifyContent: "center",
          gridTemplateColumns: "auto minmax(auto, 400px)",
        }}
      >
        {children}
      </div>
    </>
  );
}
``````

### 6. 包裹组件

* UserForm.tsx

``````tsx
import { FormWrapper } from "./FormWrapper";
export function UserForm() {
  return (
    <FormWrapper title={"用户信息"}>
      ...
    </FormWrapper>
  );
}
``````

* AddressForm.tsx

``````jsx
import { FormWrapper } from './FormWrapper'

export function AddressForm() {
  return (
    <FormWrapper title={"地址信息"}>
        ...
    </FormWrapper>
  )
}
``````

* AccountForm.tsx

```````jsx
import { FormWrapper } from "./FormWrapper";

export function AccountForm() {
  return (
    <FormWrapper title={"账户信息"}>
      
    </FormWrapper>
  );
}
```````

### 7. 实现submit方法

* App.tsx实现submit

``````tsx
<form onSubmit={onSubmit}>
  ....
  <button type="submit" onClick={next}>{isLastStep ? "完成" : "下一个" }</button>
</form>
``````

* App.tsx实现submit方法

``````tsx
function onSubmit(e: FormEvent){
  e.preventDefault()
  next()
}
``````

* App.tsx定义初始化数据

``````tsx
// 3
type FormData = { 
  name: string
  email: string 
  street: string
  province: string
  city: string
  password: string
  wechat: string
}

// 2
const INITIAL_DATA:FormData = {
  name: "",
  email: "",
  street: "",
  province: "",
  city: "",
  password: "",
  wechat: ""
}

function App() {
  // 1
  const [data,setData] = useState(INITIAL_DATA)
  ...
}
``````

### 8. 传递数据属性

* App.tsx

`````tsx
const { ... } = useMultistepForm([
  <UserForm {...data}/>,
  <AddressForm {...data}/>,
  <AccountForm {...data}/>
]);
`````

* UserForm.tsx 

``````tsx
import { FormWrapper } from "./FormWrapper";

// 2. 定义类型
type UserFormProps = {
  name: string
  email: string
  wechat: string
}

// 1. 解构参数
export function UserForm({name,email,wechat}: UserFormProps) {
  return (
    <FormWrapper title={"用户信息"}>
      <label>姓名: </label>
      																			<!--3. 赋值 -->
      <input type="text" autoFocus required value={name} />
      <label>邮箱: </label>
      <input type="email" autoFocus required value={email}/>
      <label>vx: </label>
      <input type="text" autoFocus required value={wechat}/>
    </FormWrapper>
  );
}

``````

* AddressForm.tsx

``````tsx
import {FormWrapper} from './FormWrapper'

type AddressFormProps = {
  province: string
  city: string
  street: string
}
export function AddressForm({province,city,street}:AddressFormProps) {
  return (
    <FormWrapper title={"地址信息"}>
        <label>省份: </label>
        <input type="text" autoFocus required value={province} />
        <label>城市: </label>
        <input type="text" autoFocus required value={city}/>
        <label>街道: </label>
        <input type="text" autoFocus required value={street}/>
    </FormWrapper>
  )
}
``````

* AccountForm.tsx

``````tsx
import { FormWrapper } from "./FormWrapper";

type AccountFormProps = {
    email: string
    password: string
}

export function AccountForm({email,password}: AccountFormProps) {
  return (
    <FormWrapper title={"账户信息"}>
      <label>邮箱: </label>
      <input type="email" autoFocus required value={email}/>
      <label>密码: </label>
      <input type="password" required value={password}/>
    </FormWrapper>
  );
}
``````

### 9. 更新参数信息

* App.tsx 定义更新方法

``````tsx
function App() {
  const [data,setData] = useState(INITIAL_DATA)
	// 1. 定义方法
  function updateFields(fields: Partial<FormData>){
    setData(prev => {
      return {...prev,...fields}
    })
  }

  const { ... } = useMultistepForm([
    // 2. 传递方法
    <UserForm {...data} updateFields={updateFields}/>,
    <AddressForm {...data} updateFields={updateFields}/>,
    <AccountForm {...data} updateFields={updateFields}/>
  ]);
  
}
``````

* UserForm.tsx 接收方法

``````tsx
import { FormWrapper } from "./FormWrapper";

// 3. 抽离类型
type UserData = {
  name: string
  email: string
  wechat: string
}
// 2. 定义类型
type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}
// 1. 解构updateFields
export function UserForm({name,email,wechat,updateFields}: UserFormProps) {
  return (
    <FormWrapper title={"用户信息"}>
      <label>姓名: </label>
      <input type="text" autoFocus required value={name} 
        <!--4. 实现数据更新 -->
      onChange={e => updateFields({name: e.target.value})}/>
      <label>邮箱: </label>
      <input type="email" autoFocus required value={email}
       onChange={e => updateFields({email: e.target.value})}/>
      <label>vx: </label>
      <input type="text" autoFocus required value={wechat} 
      onChange={e => updateFields({wechat: e.target.value})}/>
    </FormWrapper>
  );
}
``````

* AddressForm.tsx

``````tsx
import {FormWrapper} from './FormWrapper'

type AddressData = {
  province: string
  city: string
  street: string
}
type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void
}
export function AddressForm({province,city,street,updateFields}:AddressFormProps) {
  return (
    <FormWrapper title={"地址信息"}>
        <label>省份: </label>
        <input type="text" autoFocus required value={province} 
        onChange={e => updateFields({province: e.target.value})}/>
        <label>城市: </label>
        <input type="text" autoFocus required value={city}
        onChange={e => updateFields({city: e.target.value})}/>
        <label>街道: </label>
        <input type="text" autoFocus required value={street}
        onChange={e => updateFields({street: e.target.value})}/>
    </FormWrapper>
  )
}
``````

* AccountForm.tsx

``````tsx
import { FormWrapper } from "./FormWrapper";

type AccountData = {
   email: string
   password: string
}
type AccountFormProps = AccountData & {
    updateFields: (fields: Partial<AccountData>) => void
}

export function AccountForm({email,password,updateFields}: AccountFormProps) {
  return (
    <FormWrapper title={"账户信息"}>
      <label>邮箱: </label>
      <input type="email" autoFocus required value={email}
      onChange={e => updateFields({email: e.target.value})}/>
      <label>密码: </label>
      <input type="password" required value={password}
      onChange={e => updateFields({password: e.target.value})}/>
    </FormWrapper>
  );
}
``````

* App.tsx 处理完成的submit

`````tsx
function onSubmit(e: FormEvent){
  e.preventDefault()

  if(!isLastStep) return next()

  alert("已完成所有注册表单,做你自己的业务逻辑")
}
`````



