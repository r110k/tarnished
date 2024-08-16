import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { validate } from '../lib/validate'

export const SignInPage: React.FC = () => {
  const { data, setData, error, setError } = useSignInStore()

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    /**
     * 表单校验
     * error = validate(form, rules)
     * error ex: [
     *  { email: ['请输入邮箱', '邮箱地址不正确'] },
     *  { code: ['请输入验证码', '验证码地址不正确'] },
     * ]
     */
    const error = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码格式不正确' },
    ])
    setError(error)
  }

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
      <form g-form onSubmit={onSubmit}>
        <div>
          <span g-form-label>邮箱地址：{ error.email?.[0] && <span text-red>{error.email[0]}</span>}</span>
          <input g-input-text type="text" placeholder='请输入邮箱，然后点击发送验证码'
            value={data.email} onChange={e => setData({ email: e.target.value })} />
        </div>
        <div>
          <span g-form-label>验证码：{ error.code?.[0] && <span text-red>{error.code[0]}</span>}</span>
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
