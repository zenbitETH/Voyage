import { css } from '@emotion/css'
import { PINK } from '../theme'

export function Button({
  buttonText,
  onClick
}) {
  return (
    <button
      className='bg-regen-500 p-3 rounded-2xl text-white hover:bg-degen-500 '
      onClick={onClick}
    >{buttonText}</button>
  )
}

