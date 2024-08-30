import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { hasError, validate } from '../lib/validate'
import { ajax } from '../lib/ajax'
import { Input } from '../components/Input'

export const SignInPage: React.FC = () => {
  const { data, setData, error, setError } = useSignInStore()
  const nav = useNavigate()

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    /**
     * 表单校验
     * error = validate(form, rules)
     * error ex: [
     *  { email: ['请输入邮箱', '邮箱地址不正确'] },
     *  { code: ['请输入验证码', '验证码地址不正确'] },
     * ]
     */
    const newError = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码格式不正确' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      await ajax.post('/api/v1/session', data)
      nav('/home')
    }
  }

  const onClickCode = async () => {
    // Validate
    const newError = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      const response = await axios.post('http://152.32.233.140:3000/api/v1/validation_codes', {
        email: data.email,
      })
      console.log(`没有错误, 请求结果=${JSON.stringify(response)}`)
    }
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
        <Input label="邮箱地址：" placeholder="请输入邮箱，然后点击发送验证码" value={data.email}
          onChange={email => setData({ email })} error={error.email?.[0]} />
        <Input type='sms_code' label="验证码：" placeholder="请输入验证码" value={data.code}
           error={error.code?.[0]} onChange={code => setData({ code })} onClick={onClickCode} />
        <div mt-100px>
          <button g-btn type="submit">登陆</button>
        </div>
      </form>
    </div>
  )
}

