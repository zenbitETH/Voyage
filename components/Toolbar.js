import home from '../assets/home.svg'
import feed from '../assets/feed.svg'
import voyage from '../assets/voyage.svg'
import act from '../assets/act.svg'
import past from '../assets/past.svg'
import Image from 'next/image'

function Toolbar() {
    
  return (
    <div className="bg-trip-900  fixed bottom-0 w-full grid grid-cols-5">
        <div className='px-5 py-3 cursor-pointer hover:bg-regen-500 text-center'>
            <Image
              src={home}
              width={35}
              height={35}
              className="hover:regen-100 cursor-pointer"
            />
        </div>
        <div className='px-5 py-3 cursor-pointer hover:bg-regen-500 text-center'>
            <Image
              src={feed}
              width={35}
              height={35}
              className="hover:regen-100 cursor-pointer"
            />
        </div>
        <div className='px-5 py-3 cursor-pointer hover:bg-regen-500 text-center'>
            <Image
              src={voyage}
              width={35}
              height={35}
              className="hover:regen-100 cursor-pointer"
            />
        </div>
        <div className='px-5 py-3 cursor-pointer hover:bg-regen-500 text-center'>
            <Image
              src={act}
              width={35}
              height={35}
              className="hover:regen-100 cursor-pointer"
            />
        </div>
        <div className='px-5 py-3 cursor-pointer hover:bg-regen-500 text-center'>
            <Image
              src={past}
              width={35}
              height={35}
              className="hover:regen-100 cursor-pointer"
            />
        </div>
    </div>
  )
}

export default Toolbar;