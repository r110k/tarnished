import { useEffect } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    console.log(data)
  }

  const { data, setData } = useSignInStore()

  return (
    <div>
      <Gradient>
        <TopNav title="褪色者啊" icon={
          <Icon name="back" />
        } />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="catLogo" className='w-64px h-64px' />
        <h1 text-32px font-bold text="#3B4130">tarnished...</h1>
      </div>
      <div>{JSON.stringify(data)}</div>
      <form g-form onSubmit={onSubmit}>
        <div>
          <span g-form-label>邮箱地址：</span>
          <input g-input-text type="text" placeholder='请输入邮箱，然后点击发送验证码'
            value={data.email} onChange={e => setData({ email: e.target.value })} />
        </div>
        <div>
          <span g-form-label>验证码：</span>
          <div flex gap-x-16px>
            <input g-input-text type="text" placeholder='请输入验证码'
              value={data.code} onChange={e => setData({ code: e.target.value })} />
            <button g-btn>发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button g-btn type="submit">登陆</button>
        </div>
      </form>
    </div>
  )
}
