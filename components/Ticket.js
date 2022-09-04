import Image from 'next/image';
import plane from '../assets/plane.svg'

export function Ticket() {

  return (
    <div className="boleto">
			<div className='ticket-header'>Travel Pass</div>
			<div className='ticket-body'>
				<div className='orides'>
					<div>
						<div className='ori-city'>Mexico City</div>
						<div className='ori-short'>MEX</div>
					</div>	
					<div className='pt-3'>
						<Image src={plane}
							width={36}
							height={36}
						/>
							
					</div>
					<div>
						<div className='ori-city'>San Francisco</div>
						<div className='ori-short'>SFO</div>
					</div>
				</div>
				<div className='ticket-traveler'>traveler</div>
				<div className='ticket-date'>date</div>
			</div>
			<div className='ticket-footer'>
				<div className='ticket-no'>Trip no.</div>
				<div className='ticket-sp'></div>
				<div className='ticket-id'>#0015</div>
			</div>
		</div>
  )
}

